import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"
import { checkBnplEligibility } from "@/lib/bnlpRules"

export async function Post(req: Request ){
    try {
        const { userId, productIds } = await req.json();

        // fetch user
        const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // fetch products
        const { data: products } = await supabase
            .from("products")
            .select("*")
            .in("id", productIds);

        if (!products) {
            return NextResponse.json({ error: "Products not found" }, { status: 404 });
        }

        // fetch policy 
        const { data: policy } = await supabase
            .from("bnpl_policies")
            .select("*")
            .limit(1)
            .single();

        if (!policy) {
            return NextResponse.json({ error: "Policy not found" }, { status: 500 });
        }

        const result = checkBnplEligibility(user, products, policy);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}