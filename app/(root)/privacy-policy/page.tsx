import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Trip Squad",
  description:
    "Understand how Trip Squad collects, uses, and protects your personal information. Read our privacy policy to learn about your data rights and privacy measures.",
}

const PrivacyPolicy = () => {
  return (
    <div className="container">
      <div className="p-6 rounded-lg bg-background">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: May 29, 2024
          </p>
        </div>

        <p className="mb-4">
          Welcome to Trip Squad. We value your privacy and are committed to
          protecting your personal data. This privacy policy will inform you how
          we handle your personal data, your privacy rights, and how the law
          protects you.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect, use, store, and transfer different kinds of personal
          data about you, including:
        </p>
        <ul className="list-disc pl-4 mb-4 space-y-2">
          <li>
            <strong>Identity Data:</strong> Includes your name, username, and
            date of birth.
          </li>
          <li>
            <strong>Contact Data:</strong> Includes your email address, postal
            address, and telephone numbers.
          </li>
          <li>
            <strong>Profile Data:</strong> Includes your profile photo, bio, and
            trip details.
          </li>
          <li>
            <strong>Technical Data:</strong> Includes internet protocol (IP)
            address, browser type and version, time zone setting, browser
            plug-in types and versions, operating system and platform, and other
            technology on the devices you use to access this website.
          </li>
          <li>
            <strong>Usage Data:</strong> Includes information about how you use
            our website, products, and services.
          </li>
          <li>
            <strong>Marketing and Communications Data:</strong> Includes your
            preferences in receiving marketing from us and your communication
            preferences.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We will only use your personal data when the law allows us to. Most
          commonly, we will use your personal data in the following
          circumstances:
        </p>
        <ul className="list-disc pl-4 mb-4 space-y-2">
          <li>To register you as a new user.</li>
          <li>To manage your account and provide our services to you.</li>
          <li>
            To manage our relationship with you, including notifying you about
            changes to our terms or privacy policy.
          </li>
          <li>
            To enable you to partake in a prize draw, competition, or complete a
            survey.
          </li>
          <li>To administer and protect our business and this website.</li>
          <li>
            To deliver relevant website content and advertisements to you and
            measure or understand the effectiveness of the advertising we serve
            to you.
          </li>
          <li>
            To use data analytics to improve our website, products/services,
            marketing, customer relationships, and experiences.
          </li>
          <li>
            To make suggestions and recommendations to you about goods or
            services that may be of interest to you.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          3. How We Share Your Information
        </h2>
        <p className="mb-4">
          We may share your personal data with third parties in the following
          circumstances:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            Service providers who provide IT and system administration services.
          </li>
          <li>
            Professional advisers including lawyers, bankers, auditors, and
            insurers who provide consultancy, banking, legal, insurance, and
            accounting services.
          </li>
          <li>
            Government bodies that require us to report processing activities.
          </li>
          <li>
            Third parties to whom we may choose to sell, transfer, or merge
            parts of our business or our assets.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
        <p className="mb-4">
          We have put in place appropriate security measures to prevent your
          personal data from being accidentally lost, used, or accessed in an
          unauthorized way, altered, or disclosed. In addition, we limit access
          to your personal data to those employees, agents, contractors, and
          other third parties who have a business need to know.
        </p>

        <h2 className="text-2xl font-semibold mb-2">5. Your Legal Rights</h2>
        <p className="mb-4">
          Under certain circumstances, you have rights under data protection
          laws in relation to your personal data, including the right to:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Request access to your personal data.</li>
          <li>Request correction of your personal data.</li>
          <li>Request erasure of your personal data.</li>
          <li>Object to processing of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Request transfer of your personal data.</li>
          <li>
            Withdraw consent at any time where we are relying on consent to
            process your personal data.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          6. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new privacy policy on this page. You
          are advised to review this privacy policy periodically for any
          changes.
        </p>

        <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this privacy policy, please contact us
          at:
        </p>
        <p className="mb-4">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:support@tripsquad.com"
            className="text-blue-600 hover:underline"
          >
            support@tripsquad.com
          </a>
        </p>
        <p className="mb-4">
          <strong>Address:</strong> 12/A Raynagar, Sylhet-3100, Bangladesh
        </p>
      </div>
    </div>
  )
}
export default PrivacyPolicy
