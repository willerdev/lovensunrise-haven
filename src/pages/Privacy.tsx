import React from "react";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none">
        <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including when you create an account, make a booking, or contact us for support.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services, to process your bookings, and to communicate with you.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">3. Information Sharing</h2>
        <p>
          We do not share your personal information with third parties except as described in this privacy policy or with your consent.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect the security of your personal information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
};

export default Privacy;