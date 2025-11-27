"use client";

import { useState } from "react";

export default function BNPLPolicies() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">BNPL (Buy Now, Pay Later) Policy</h1>

      <p className="text-gray-700 mb-6">
        Our Buy Now, Pay Later plan allows customers to split payments into three
        installments over 30 days, starting with an upfront deposit. Please read
        all terms and regulations carefully before using this service.
      </p>

      {/* Installment Plan */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Installment Breakdown</h2>

        <div className="space-y-3">
          {/* Upfront Deposit */}
          <div
            onClick={() => toggle(1)}
            className="border rounded-lg p-4 cursor-pointer"
          >
            <h3 className="font-semibold">1️⃣ Upfront Deposit (Paid Immediately)</h3>
            {open === 1 && (
              <p className="mt-2 text-gray-600 text-sm">
                You pay the first installment upfront to secure your order.  
                This deposit is non-refundable once the order is confirmed.
              </p>
            )}
          </div>

          {/* Second Payment */}
          <div
            onClick={() => toggle(2)}
            className="border rounded-lg p-4 cursor-pointer"
          >
            <h3 className="font-semibold">2️⃣ Second Installment (Day 15)</h3>
            {open === 2 && (
              <p className="mt-2 text-gray-600 text-sm">
                The second installment is due 15 days after your initial deposit.
                Automated reminders will be sent via email/SMS.
              </p>
            )}
          </div>

          {/* Final Payment */}
          <div
            onClick={() => toggle(3)}
            className="border rounded-lg p-4 cursor-pointer"
          >
            <h3 className="font-semibold">3️⃣ Final Installment (Day 30)</h3>
            {open === 3 && (
              <p className="mt-2 text-gray-600 text-sm">
                Your final installment is due on Day 30.  
                Completion of this payment marks your BNPL order as fully settled.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Regulations & Warnings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Warnings & Regulations</h2>

        <div className="space-y-3 text-gray-700 text-sm">
          <p className="border-l-4 border-red-500 pl-3">
            ⚠️ **Late payments attract a penalty fee of 5% per day after the due date.**
          </p>

          <p className="border-l-4 border-yellow-500 pl-3">
            ⚠️ **Failure to complete payments within 30 days may lead to account suspension
            and collection actions.**
          </p>

          <p className="border-l-4 border-gray-500 pl-3">
            • All BNPL orders require valid identification and contact information.  
          </p>

          <p className="border-l-4 border-gray-500 pl-3">
            • The BNPL service is available only to verified customers with consistent order history.  
          </p>

          <p className="border-l-4 border-gray-500 pl-3">
            • Customers must ensure sufficient funds in their accounts on due dates.
          </p>

          <p className="border-l-4 border-gray-500 pl-3">
            • Non-payment will restrict customers from future BNPL usage.
          </p>

          <p className="border-l-4 border-gray-500 pl-3">
            • By using BNPL, you agree that your details may be used for verification and credit assessment.
          </p>
        </div>
      </section>

      <footer className="mt-10 text-gray-600 text-xs">
        Last updated: {new Date().toLocaleDateString()}
      </footer>
    </div>
  );
}
