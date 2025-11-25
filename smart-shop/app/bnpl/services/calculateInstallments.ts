export function calculateBnlp(total: number) {
    const upfront = total * 0.25;
    const balance = total - upfront;
    const installment = balance / 3;

    return {
        upfront,
        installment,
        schedule: [
            {installment: 1, amount:installment, daysFromNow: 10 },
            {installment: 2, amount:installment, daysFromNow: 20 },
            {installment: 3, amount:installment, daysFromNow: 30 }
        ]
    };
}
