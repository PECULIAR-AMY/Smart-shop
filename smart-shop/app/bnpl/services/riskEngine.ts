
// Type definitions
export interface CustomerProfile {
  total_orders: number;
  successful_payments: number;
  failed_payments: number;
  account_age_days: number;
  order_amount: number;
  last_payment_status?: string;
}

export interface RiskConfig {
  max_default_rate: number;           // % of allowed failed payments
  max_order_value: number;            // Maximum allowed order for low risk
  min_account_age_days: number;       // Minimum age for account
  penalty_for_failed_payments: number;
  penalty_for_new_account: number;
  penalty_for_high_order_amount: number;
}

// Result type
export interface RiskResult {
  score: number;
  riskLevel: "low" | "medium" | "high";
}

// Calculate risk score
export function calculateRiskScore(
  profile: CustomerProfile,
  config: RiskConfig
): number {
  let score = 0;

  // Failed payments penalty
  score += profile.failed_payments * config.penalty_for_failed_payments;

  // New account penalty
  if (profile.account_age_days < config.min_account_age_days) {
    score += config.penalty_for_new_account;
  }

  // High order amount penalty
  if (profile.order_amount > config.max_order_value) {
    score += config.penalty_for_high_order_amount;
  }

  return score;
}

// Determine risk level based on score
export function determineRiskLevel(score: number): "low" | "medium" | "high" {
  if (score < 30) return "low";
  if (score < 60) return "medium";
  return "high";
}

// Combine calculation and risk level
export function evaluateRisk(
  profile: CustomerProfile,
  config: RiskConfig
): RiskResult {
  const score = calculateRiskScore(profile, config);
  const riskLevel = determineRiskLevel(score);

  return {
    score,
    riskLevel,
  };
}
