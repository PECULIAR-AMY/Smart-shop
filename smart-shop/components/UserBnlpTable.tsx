"use client";
export default function UserBnplTable({ plans, onApprove, onReject }: any) {
  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          <th className="border px-2">User ID</th>
          <th className="border px-2">Order ID</th>
          <th className="border px-2">Amount</th>
          <th className="border px-2">Status</th>
          <th className="border px-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {plans.map((plan: any) => (
          <tr key={plan.id}>
            <td className="border px-2">{plan.user_id}</td>
            <td className="border px-2">{plan.order_id}</td>
            <td className="border px-2">₦{plan.total_amount}</td>
            <td className="border px-2">{plan.status}</td>
            <td className="border px-2">
              <button
                className="bg-green-600 text-white px-2 rounded mr-2"
                onClick={() => onApprove(plan.id)}
              >
                Approve
              </button>
              <button
                className="bg-red-600 text-white px-2 rounded"
                onClick={() => onReject(plan.id)}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
