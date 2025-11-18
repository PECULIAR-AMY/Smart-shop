// pages/api/checkout.js
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Server-side Supabase client using service role key (keep this on server only)
const supabaseServer = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { userId, cartItems, paymentMethod } = req.body;

    if (!userId || !cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ error: 'userId and cartItems required' });
    }

    // compute totals
    const total = cartItems.reduce((acc, i) => acc + Number(i.price) * (i.quantity || 1), 0);
    const bnplItems = cartItems.filter(i => i.is_bnpl);
    const regularItems = cartItems.filter(i => !i.is_bnpl);
    const regularTotal = regularItems.reduce((acc, i) => acc + Number(i.price) * (i.quantity || 1), 0);

    // 1) Create order and order_items atomically via RPC
    const rpcPayload = {
      p_user_id: userId,
      p_total_amount: total,
      p_items: JSON.stringify(cartItems)
    };

    const { data: createOrderData, error: createOrderErr } = await supabaseServer.rpc('create_order_with_items', rpcPayload);

    if (createOrderErr) {
      console.error('RPC create_order_with_items error', createOrderErr);
      return res.status(500).json({ error: 'Failed to create order', details: createOrderErr.message });
    }

    const orderId = createOrderData.order_id;

    // 2) Process regular items payment (you must integrate your payment gateway here)
    // Placeholder: Simulate a successful payment for regularTotal
    // Replace this with real payment gateway call (Stripe, Paystack, etc.)
    const regularPaymentResult = { success: true, reference: 'SIMULATED-TXN-REG-123' };
    
    // If regularTotal > 0, process payment
    if (regularTotal > 0) {
      // TODO: integrate real payment gateway
      // Example (pseudo):
      // const gatewayRes = await chargeCustomer({ amount: regularTotal, paymentMethodDetails... })
      // if (!gatewayRes.ok) throw new Error('payment failed');
      // regularPaymentResult = { success: true, reference: gatewayRes.id }
    }

    // 3) Update DB for regular payments: mark order_items paid and insert transaction
    if (regularPaymentResult.success && regularTotal > 0) {
      // mark non-bnpl items as paid
      const { data: markPaid, error: markPaidErr } = await supabaseServer
        .from('order_items')
        .update({ status: 'paid' })
        .eq('order_id', orderId)
        .eq('is_bnpl', false);

      if (markPaidErr) console.error('markPaidErr', markPaidErr);

      // update orders payment_status to partially_paid (if bnpl exists) or paid
      const newOrderStatus = bnplItems.length > 0 ? 'partially_paid' : 'paid';
      await supabaseServer.from('orders').update({ payment_status: newOrderStatus }).eq('id', orderId);

      // insert transaction record
      await supabaseServer.from('transactions').insert([{
        user_id: userId,
        order_id: orderId,
        amount: regularTotal,
        payment_method: paymentMethod || 'gateway',
        type: 'regular',
        status: 'success',
        reference: regularPaymentResult.reference
      }]);
    }

    // 4) For each BNPL order_item, call RPC to create bnpl_contract and payment schedule
    const bnplContracts = [];
    if (bnplItems.length > 0) {
      // create mapping from product_id -> created order_item id returned by RPC
      // createOrderData.items is JSON array of inserted items
      const insertedItems = createOrderData.items as Array<{ product_id: string; order_item_id: string }>; // array of objects
      // make a quick lookup product_id -> order_item_id (string)
      const lookup: Record<string, string> = {};
      for (const it of insertedItems) {
        lookup[String(it.product_id)] = String(it.order_item_id);
      }

      for (const item of bnplItems) {
        const orderItemId = lookup[item.product_id];
        if (!orderItemId) {
          console.warn('No matching order_item found for bnpl item', item);
          continue;
        }

        // Example BNPL policy - you can compute per item or per order
        const installments = item.installments || 3;
        const interest_rate = item.interest_rate || 0; // percent
        const start_date = item.start_date || new Date().toISOString().slice(0,10);

        const rpcRes = await supabaseServer.rpc('create_bnpl_contract_and_schedule', {
          p_order_item_id: orderItemId,
          p_user_id: userId,
          p_total_amount: Number(item.price) * (item.quantity || 1),
          p_installments: installments,
          p_interest_rate: interest_rate,
          p_start_date: start_date
        });

        if (rpcRes.error) {
          console.error('create_bnpl_contract error', rpcRes.error);
        } else {
          bnplContracts.push(rpcRes.data);
        }

        // mark order_item as bnpl_active
        await supabaseServer.from('order_items').update({ status: 'bnpl_active' }).eq('id', orderItemId);
      }
    }

    return res.status(200).json({
      ok: true,
      order: { orderId, total, regularTotal },
      bnplContracts,
      regularPaymentResult
    });

  } catch (err: unknown) {
    console.error(err);
    const message =
      err instanceof Error ? err.message :
      typeof err === 'string' ? err :
      JSON.stringify(err) || 'Unknown error';
    return res.status(500).json({ error: 'internal_server_error', message });
  }
}
