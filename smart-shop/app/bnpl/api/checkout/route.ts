import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

interface Item {
  price: number;
  // add other properties if needed
}

export async function POST(req: Request) {
  try {
    const { userId, bnplItems, nonBnplItems, upfrontPercentage } =
      await req.json();

    const bnplTotal = bnplItems.reduce((acc: number, p: Item) => acc + p.price, 0);
    const nonBnplTotal = nonBnplItems.reduce((acc: number, p: Item) => acc + p.price, 0);

    const upfront = bnplTotal * (upfrontPercentage / 100);

    // Record BNPL order
    await supabase.from("bnpl_orders").insert({
      user_id: userId,
      total_amount: bnplTotal,
      upfront_paid: upfront,
    });

    return NextResponse.json({
      message: "Checkout processed",
      payNowAmount: nonBnplTotal + upfront,
      bnplOutstanding: bnplTotal - upfront,
    });
  } catch (error) {
    return NextResponse.json({ error: "Checkout error" }, { status: 500 });
  }
}
