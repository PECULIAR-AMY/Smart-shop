"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BnplPlanCard from "@/components/BnlpPlanCard";

interface BnplPlan {
  id: string;
  total_amount: number;
  remaining_balance: number;
  status: string;
}

interface Payment {
  id: string;
  bnpl_plan_id: string;
  amount: number;
  due_date: string;
  paid: boolean;
}

export default function UserDashboard() {
  const [plans, setPlans] = useState<BnplPlan[]>([]);
  const [payments, setPayments] = useState<Record<string, Payment[]>>({});

  useEffect(() => {
    const fetchPlans = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      const userId = user.id;

      const { data: planData } = await supabase
        .from("bnpl_plans")
        .select("*")
        .eq("user_id", userId);

      setPlans(planData || []);

      // Fetch payments for each plan
      const planPayments: Record<string, Payment[]> = {};
      for (const plan of planData || []) {
        const { data: payData } = await supabase
          .from("bnpl_payments")
          .select("*")
          .eq("bnpl_plan_id", plan.id);

        planPayments[plan.id] = payData || [];
      }
      setPayments(planPayments);
    };

    fetchPlans();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My BNPL Plans</h1>
      {plans.length === 0 && <p>You have no BNPL plans yet.</p>}
      {plans.map((plan) => (
        <BnplPlanCard key={plan.id} plan={plan} payments={payments[plan.id] || []} />
      ))}
    </div>
  );
}
