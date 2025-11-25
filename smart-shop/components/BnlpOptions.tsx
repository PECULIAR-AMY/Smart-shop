"use client"

import {useState} from "react";

function calculateBnlp(total: number) {
    // Example calculation: 20% upfront, remaining split into 3 equal installments
    const upfront = total * 0.2;
    const installment = (total - upfront) / 3;
    return { upfront, installment };
}

export default function BnplOption({total}: {total: number}) {
    const [open, setOpen] = useState(false);
    const { upfront, installment } = calculateBnlp(total);

    return (
        <div>
            <button onClick={() => setOpen(!open)} >
                Bnpl-pay ₦{upfront.toFixed(2)} now
            </button>

            {open && (
                <div className="mt-3 p-3 border rounded">
                   <p>upfront payment: ₦{upfront.toFixed(2)}</p>
                   <p>3 installments: ₦{installment.toFixed(2)} every 10 Days</p>
                </div>
            )}
        </div>
    )
}