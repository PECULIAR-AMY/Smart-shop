"use client";

type Schedule = { installmentNumber : number; amount: number; dueDate: Date};

export default function BnlpBreakdown({schedule}: {schedule: Schedule[]}) {
 return (
    <table className="table-auto w-full mt-3 border">
       <thead>
        <tr>
            <th className="border px-2">Installment</th>
            <th className="border px-2">Amount</th>
            <th className="border px-2">Due Date </th>
        </tr>
       </thead>
       <tbody>
        {schedule.map((s) => (
            <tr key={s.installmentNumber}>
            <td className="border px-2">{s.installmentNumber}</td>
            <td className="border px-2">₦{s.amount}</td>
            <td className="border px-2">{s.dueDate.toDateString()}</td>
            </tr>
        ))}
       </tbody>
    </table>
 )   
}