import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, contractId, amount, paymentMethod } = req.body;

    if (!userId || !contractId || !amount) {
      return res.status(400).json({ error: 'userId, contractId, and amount are required' });
    }

    // Fetch the BNPL contract to verify it exists and is active
    const { data: contract, error: contractErr } = await supabaseServer
      .from('bnpl_contracts')
      .select('*')
      .eq('id', contractId)
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (contractErr || !contract) {
      return res.status(404).json({ error: 'BNPL contract not found or not active' });
    }

    // Fetch the next due payment from bnpl_payments
    const { data: duePayment, error: dueErr } = await supabaseServer
      .from('bnpl_payments')
      .select('*')
      .eq('contract_id', contractId)
      .eq('status', 'pending')
      .order('due_date', { ascending: true })
      .limit(1)
      .single();

    if (dueErr || !duePayment) {
      return res.status(400).json({ error: 'No pending payment found for this contract' });
    }

    // Check if the amount matches the due amount (or allow partial? For simplicity, exact match)
    if (Number(amount) !== Number(duePayment.amount)) {
      return res.status(400).json({ error: 'Payment amount does not match the due amount' });
    }

    // Simulate payment processing (replace with real gateway integration)
    const paymentResult = { success: true, reference: `SIMULATED-BNPL-PAY-${Date.now()}` };

    // If payment successful, update the bnpl_payment status to 'paid'
    if (paymentResult.success) {
      const { error: updateErr } = await supabaseServer
        .from('bnpl_payments')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('id', duePayment.id);

      if (updateErr) {
        console.error('Update bnpl_payment error', updateErr);
        return res.status(500).json({ error: 'Failed to update payment status' });
      }

      // Insert transaction record
      const { error: transErr } = await supabaseServer
        .from('transactions')
        .insert([{
          user_id: userId,
          order_id: contract.order_id, // Assuming contract has order_id
          amount: amount,
          payment_method: paymentMethod || 'gateway',
          type: 'bnpl',
          status: 'success',
          reference: paymentResult.reference
        }]);

      if (transErr) {
        console.error('Insert transaction error', transErr);
        // Note: In production, consider rollback or compensation
      }

      // Check if all payments are paid, and update contract status if fully paid
      const { data: remainingPayments, error: checkErr } = await supabaseServer
        .from('bnpl_payments')
        .select('id')
        .eq('contract_id', contractId)
        .eq('status', 'pending');

      if (!checkErr && remainingPayments.length === 0) {
        await supabaseServer
          .from('bnpl_contracts')
          .update({ status: 'completed' })
          .eq('id', contractId);
      }
    }

    return res.status(200).json({
      ok: true,
      paymentResult,
      contractId,
      amount
    });

  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: 'internal_server_error', message });
  }
}
