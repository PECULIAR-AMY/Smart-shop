import { supabase } from "@/lib/supabaseClient";
import { calculateBnlp } from "../services/calculateInstallments";


export async function applyBnpl(userId: string, orderId: string, total: number) {
    const { upfront, installment, schedule } = calculateBnlp(total);

    const {data: plan } = await supabase
    .from ("bnpl_plans")
    .insert ({
       user_id: userId,
      order_id: orderId,
      total_amount: total,
      upfront_paid: upfront,
      remaining_balance: total - upfront,
      installments: 3,
      interval_days: 30,
      status: "active"
    })
    .select()
    .single();

    
  // create installment schedule
  for (const s of schedule) {
    await supabase.from("bnpl_payments").insert({
      bnpl_plan_id: plan.id,
      amount: s.amount,
      due_date: new Date(Date.now() + s.daysFromNow * 86400000)
    });
}

return plan;
}