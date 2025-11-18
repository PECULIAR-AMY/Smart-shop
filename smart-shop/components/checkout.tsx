// components/Checkout.jsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // optional: to get current user

type CartItem = {
  product_id: string;
  name?: string;
  price: number;
  quantity?: number;
  is_bnpl?: boolean;
  installments?: number;
  interest_rate?: number;
  start_date?: string;
};

export default function Checkout({ cart }: { cart: CartItem[] }) {
  // cart = [{ product_id, name, price, quantity, is_bnpl }]
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleCheckout() {
    setLoading(true);

    // get current user id from supabase auth (using supabase-js v2)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('You must be signed in');
      setLoading(false);
      return;
    }

    // prepare items: send product_id, price, quantity, is_bnpl, optional installments/interest
    const payloadItems = cart.map(i => ({
      product_id: i.product_id,
      quantity: i.quantity || 1,
      price: String(i.price),
      is_bnpl: !!i.is_bnpl,
      installments: i.installments || 3,
      interest_rate: i.interest_rate || 0,
      start_date: i.start_date || new Date().toISOString().slice(0,10)
    }));

    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, cartItems: payloadItems, paymentMethod: 'card' })
      });

      const json = await r.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Checkout</h3>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Proceed to Checkout'}
      </button>

      {result && <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
