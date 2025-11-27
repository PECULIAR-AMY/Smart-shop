"use client";
import { useState } from "react";
import { calculateInstallments } from "../app/bnpl/services/calculateInstallments";

export default function BnplOption({ total }: { total: number }) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { upfront, schedule } = calculateInstallments(total);

  return (
    <div className="border p-3 rounded my-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowBreakdown(!showBreakdown)}
      >
        Buy Now Pay Later (₦{upfront})
      </button>
      {showBreakdown && (
        <ul className="mt-3 space-y-1">
          {schedule.map((s) => (
            <li key={s.installmentNumber}>
              Installment {s.installmentNumber}: ₦{s.amount} — Due {s.dueDate.toDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
