import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { evaluateRisk, CustomerProfile, RiskConfig } from "@/lib/riskEngine";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId, orderAmount } = await req.json();

    if (!userId || !orderAmount) {
      return NextResponse.json({ error: "Missing userId or orderAmount" }, { status: 400 });
    }

    const { data: profileData, error: profileError } = await supabase
      .from("customer_risk_profile")
      .select("*")
      .eq("user_id", userId)
      .single();

    const { data: configData, error: configError } = await supabase
      .from("risk_config")
      .select("*")
      .eq("id", 1)
      .single();

    if (!profileData || profileError) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    if (!configData || configError) return NextResponse.json({ error: "Config not found" }, { status: 404 });

    const profile: CustomerProfile = { ...profileData, order_amount: orderAmount };
    const config: RiskConfig = configData;

    const result = evaluateRisk(profile, config);

    return NextResponse.json({
      allowed: result.riskLevel !== "high",
      score: result.score,
      riskLevel: result.riskLevel,
      message:
        result.riskLevel === "high"
          ? "BNPL not allowed due to high risk score."
          : "BNPL allowed for this order.",
    });
  } catch (err) {
    console.error("Risk check error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
