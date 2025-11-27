"use client";
import { Payment } from "@/types";

export default function PaymentHistory({ payments }: { payments: Payment[] }) {
  return (
    <div>
      <h4 className="font-semibold">Payment History</h4>
      <ul>
        {payments.map((p) => (
          <li key={p.id}>
            ₦{p.amount} — {p.paid ? "Paid" : "Pending"} ({new Date(p.due_date).toDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
