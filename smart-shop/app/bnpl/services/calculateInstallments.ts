export function calculateBnlp(total: number, months = 3) {
    const upfront = total * 0.25;
    const balance = total - upfront;
    const installment = balance / months;

    const schedule = Array.from({ length: months }, (_, i) => {
       const dueDate = new Date();
       dueDate.setDate(dueDate.getDate() + (i + 1) * 30);
       return { installmentNumber: i + 1, amount: parseFloat(installment.toFixed(2)), dueDate };
    });

    return { upfront: parseFloat(upfront.toFixed(2)), installment: parseFloat(installment.toFixed(2)), schedule };

}
