"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Shield, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

// Fallback UI Components if shadcn/ui isn't installed
type ElementProps = { children?: ReactNode; className?: string } & Record<string, unknown>;

export const Card = ({ children, className = "", ...props }: ElementProps) => (
  <div className={`rounded-xl border p-4 bg-white shadow ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }: ElementProps) => (
  <div className={`mb-2 ${className}`} {...props}>{children}</div>
);

export const CardTitle = ({ children, className = "", ...props }: ElementProps) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props}>{children}</h3>
);

export const CardDescription = ({ children, className = "", ...props }: ElementProps) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>{children}</p>
);

export const CardContent = ({ children, className = "", ...props }: ElementProps) => (
  <div className={`space-y-4 ${className}`} {...props}>{children}</div>
);

type BadgeProps = { children?: ReactNode; className?: string };
const Badge = ({ children, className = "" }: BadgeProps) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
    {children}
  </span>
);

interface BNPLPolicy {
  id: string;
  name: string;
  provider: string;
  minPurchase: number;
  maxPurchase: number;
  interestRate: number;
  terms: string[];
  fees: string[];
  eligibilityScore: number;
  processingTime: string;
  riskLevel: "low" | "medium" | "high";
}

interface BNPLPolicyCardProps {
  policy: BNPLPolicy;
  recommended?: boolean;
}

export const BNPLPolicyCard = ({ policy, recommended }: BNPLPolicyCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "high":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  return (
    <Card className={`relative transition-all ${recommended ? "border-yellow-400 shadow-lg" : ""}`}>
      {recommended && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-white px-3 py-1 text-xs font-bold">
          AI RECOMMENDED
        </div>
      )}

      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-yellow-500" />
              {policy.name}
            </CardTitle>
            <CardDescription>by {policy.provider}</CardDescription>
          </div>
          <Badge className={`${getRiskColor(policy.riskLevel)}`}>
            <Shield className="w-3 h-3 mr-1" />
            {policy.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Purchase Range</p>
            <p className="font-semibold">
              {formatCurrency(policy.minPurchase)} - {formatCurrency(policy.maxPurchase)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
            <p className="font-semibold text-yellow-600">{policy.interestRate}% APR</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-yellow-600" />
            <span className="font-medium">Key Terms</span>
          </div>
          <ul className="ml-6 list-disc text-sm text-gray-600">
            {policy.terms.map((term, i) => <li key={i}>{term}</li>)}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">Fees & Conditions</span>
          </div>
          <ul className="ml-6 list-disc text-sm text-gray-600">
            {policy.fees.map((fee, i) => <li key={i}>{fee}</li>)}
          </ul>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            <div>
              <p className="text-xs text-gray-500">Processing Time</p>
              <p className="font-semibold">{policy.processingTime}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Eligibility Score</p>
            <p className="text-2xl font-bold text-yellow-500">{policy.eligibilityScore}%</p>
          </div>
        </div>

        <Button
          variant={recommended ? "default" : "outline"}
          className={`w-full ${recommended ? "bg-yellow-500 text-white hover:bg-yellow-400" : ""}`}
        >
          {recommended ? "Apply Now (Recommended)" : "Learn More"}
        </Button>
      </CardContent>
    </Card>
  );
};
