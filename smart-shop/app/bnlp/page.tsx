import { BNPLPolicyCard } from "@/components/BNPLPolicyCard";

export default function Page() {
  const samplePolicy = {
    id: "1",
    name: "SmartPay Installments",
    provider: "SmartBuy",
    minPurchase: 100,
    maxPurchase: 2500,
    interestRate: 2.9,
    terms: ["Flexible 3–6 month plan", "No hidden charges", "Instant approval"],
    fees: ["Late payment fee: $10", "Service fee: 1%"],
    eligibilityScore: 85,
    processingTime: "Instant",
    riskLevel: "medium" as const,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <BNPLPolicyCard policy={samplePolicy} recommended />
    </div>
  );
}
