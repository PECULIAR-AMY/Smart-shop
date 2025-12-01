import { User, Product, BnplPolicy } from "@/.next/types/bnpl"

export function checkBnplEligibility(
    user: User,
    products: Product[],
    policy: BnplPolicy
){
    const bnplItems = products.filter(p => p.is_bnpl_enabled);
    const nonBnplItems = products.filter(p => !p.is_bnpl_enabled);

//  Rule 1: User must be verified 
if (!user.is_verified){
    return {eligible: false, reason: "User not verified"}
}


// RULE 2: must have a payment method
if (!user.has_payment_method){
    return {eligibel: false, reason: "Add payment Method"    }

};

// Rule 3: User must not exceed BNPL debt limit 
    if (user.bnpl_outstanding > policy.max_user_outstanding){
        return {eligible: false, reason: "outstanding BNPL debt too high" }
    };

//    Rule 4: Ensure BNPL items qualify

for (const item of bnplItems){
    if (item.price <  policy.min_price){

     return {
        eligibility: false,
        reason : `${item.name} does not meet the minimum price`
     }   

    }
};

//  Rule 5 : cart contains BNPL and non-BNPL items 

const splitCheckout = bnplItems.length > 0 && nonBnplItems.length > 0;

return {
    eligible: true,
    splitCheckout,
    bnplItems,
    nonBnplItems,
    requiredUpfront: policy.min_upfront_percentage,
    maxInstallments: policy.max_installments, 
    
}
}

