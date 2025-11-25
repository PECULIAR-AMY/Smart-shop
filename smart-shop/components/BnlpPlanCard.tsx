import React from "react";

const BnplTerms = () => {
  return (
    <div className="p-6 text-gray-800 bg-white rounded-2xl shadow-md max-w-3xl mx-auto leading-relaxed">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🇳🇬 Buy Now, Pay Later (BNPL) – Terms and Conditions
      </h2>

      <section className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg">1. Overview</h3>
          <p>
            The Buy Now, Pay Later (BNPL) option allows you to buy items or
            services immediately and pay for them later in fixed installments.
            By using this service, you agree to these terms and conditions in
            line with CBN consumer credit guidelines.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">2. Eligibility</h3>
          <ul className="list-disc ml-6">
            <li>You must be at least 18 years old.</li>
            <li>
              You must have a valid means of identification (NIN, Driver’s
              License, Voter’s Card, or International Passport).
            </li>
            <li>
              You must have a verifiable source of income and an active payment
              method (bank account, card, or wallet).
            </li>
            <li>
              Approval for BNPL is based on credit or risk assessment carried
              out by our system or credit partners.
            </li>
            <li>
              Users with outstanding or defaulted payments may not be eligible
              for new BNPL transactions until balances are cleared.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">3. Payment Terms</h3>
          <ul className="list-disc ml-6">
            <li>Payments are made in equal installments over a set period.</li>
            <li>The first payment may be required at checkout.</li>
            <li>
              Subsequent payments will be automatically deducted from your
              linked payment method on the scheduled due dates.
            </li>
            <li>
              Late or missed payments may attract penalties or temporary
              suspension of your BNPL access.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">4. Fees and Interest</h3>
          <ul className="list-disc ml-6">
            <li>BNPL plans are generally interest-free, except where stated.</li>
            <li>
              Any applicable service fee or interest will be clearly displayed
              before checkout.
            </li>
            <li>
              Late payments may attract penalty fees as shown in your payment
              plan.
            </li>
            <li>
              You will always be able to view your repayment schedule before
              confirming any BNPL transaction.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">5. Returns and Refunds</h3>
          <ul className="list-disc ml-6">
            <li>
              If you return a product, the refund will be applied to reduce or
              clear your BNPL balance.
            </li>
            <li>
              If a full refund is processed, any paid installments will be
              refunded to your original payment method.
            </li>
            <li>
              Refund timelines may vary depending on your merchant or financial
              partner.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">6. User Responsibilities</h3>
          <ul className="list-disc ml-6">
            <li>
              Ensure your linked account or card has sufficient funds for
              scheduled deductions.
            </li>
            <li>Update your payment details if your bank or card changes.</li>
            <li>You are responsible for all transactions on your account.</li>
            <li>
              Failure to make payments on time may affect your credit record and
              future access to BNPL or other credit services.
            </li>
            <li>
              Misuse or fraudulent activity will result in suspension and
              possible legal action.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">7. Default and Recovery</h3>
          <ul className="list-disc ml-6">
            <li>
              Your account may be suspended if payments are missed or delayed.
            </li>
            <li>
              You may receive reminders and recovery notices via SMS, email, or
              phone.
            </li>
            <li>
              Your information may be shared with credit bureaus in line with
              CBN guidelines.
            </li>
            <li>
              Authorized debt recovery partners may be engaged to recover
              overdue payments.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">8. Data Privacy and Security</h3>
          <p>
            Your data will be used strictly for identity verification, credit
            assessment, and fraud prevention. We comply with the Nigeria Data
            Protection Regulation (NDPR) and CBN data protection guidelines.
            Your information will not be shared with unauthorized third parties.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">9. Updates to Terms</h3>
          <p>
            We may update these BNPL Terms and Conditions from time to time to
            reflect changes in law or policy. You will be notified of any
            significant updates before they take effect.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">10. Contact and Support</h3>
          <p>
            For any questions or issues regarding BNPL, please contact our
            support team:
          </p>
          <ul className="list-none ml-2 mt-2">
            <li>📩 Email: support@[yourappname].com</li>
            <li>📞 Phone: [Your customer support number]</li>
            <li>🏢 Address: [Your registered business address]</li>
          </ul>
        </div>

        <div className="mt-6 flex items-center space-x-2">
          <input type="checkbox" id="agree" className="w-4 h-4" />
          <label htmlFor="agree" className="text-sm">
            I have read and agree to the Buy Now, Pay Later (BNPL) Terms and
            Conditions.
          </label>
        </div>
      </section>
    </div>
  );
};

export default BnplTerms;
