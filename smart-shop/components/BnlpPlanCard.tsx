
"use client";

import { payment } from "@/app/bnplpolicies/page"

export default function BnpCard({ plan, payments }: {plan: any; payments: payment[]}){
  return (
    <div className="border rounded p-4 my-2">
    <h3 className="font-semibold text-lg">plan ID: {plan.id}</h3>
    <p>Total: ₦{plan.total_amount}</p>
    <p>Remaining: ₦{plan.remaining_balance}</p>
      <p>Status: {plan.status}</p>
       <ul className="mt-2">
        {payments.map((p) => (
          <li key={p.id}>
            Installment ₦{p.amount} — {p.paid ? "Paid" : "Due"} on {new Date(p.due_date).toDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}