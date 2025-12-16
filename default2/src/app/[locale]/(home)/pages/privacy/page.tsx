import Link from "next/link"

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for our educational platform",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center text-sm text-[#635bff] hover:underline mb-8">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: December 12, 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed">
              This Privacy Policy describes how we collect, use, and protect your personal information when you use our
              educational platform. We are committed to protecting your privacy and ensuring you understand how your
              data is used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.1 Information You Provide</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Name, email address, and contact information when you create an account</li>
              <li>Payment information when you enroll in courses</li>
              <li>Profile information such as educational background and interests</li>
              <li>Communications with us, including support requests and feedback</li>
              <li>Quiz responses, assignments, and course progress data</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you access our platform, we automatically collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Device information (browser type, operating system, device identifiers)</li>
              <li>Usage data (pages visited, time spent, courses accessed)</li>
              <li>Log data (IP address, access times, referring URLs)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Providing, maintaining, and improving our educational services</li>
              <li>Processing enrollments and managing your account</li>
              <li>Sending course updates, certificates, and administrative messages</li>
              <li>Personalizing your learning experience and course recommendations</li>
              <li>Analyzing usage patterns to improve platform functionality</li>
              <li>Preventing fraud and ensuring platform security</li>
              <li>Complying with legal obligations</li>
              <li>Sending marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">4.1 Service Providers</h3>
            <p className="text-slate-700 leading-relaxed">
              We share information with third-party service providers who perform services on our behalf, such as
              payment processing, email delivery, hosting, analytics, and customer support.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">4.2 Course Instructors</h3>
            <p className="text-slate-700 leading-relaxed">
              When you enroll in a course, we share relevant information with the course instructor, including your
              name, email, and course performance data.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">4.3 Legal Requirements</h3>
            <p className="text-slate-700 leading-relaxed">
              We may disclose your information if required by law or in response to valid requests by public
              authorities.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">4.4 Business Transfers</h3>
            <p className="text-slate-700 leading-relaxed">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the
              acquiring entity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Retention</h2>
            <p className="text-slate-700 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              policy, unless a longer retention period is required or permitted by law. When you close your account, we
              will delete or anonymize your data, except where we are required to retain it for legal or regulatory
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Your Rights and Choices</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Access:</strong> You can request a copy of your personal data
              </li>
              <li>
                <strong>Correction:</strong> You can update or correct inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> You can request deletion of your personal data
              </li>
              <li>
                <strong>Opt-out:</strong> You can unsubscribe from marketing communications
              </li>
              <li>
                <strong>Data Portability:</strong> You can request your data in a portable format
              </li>
              <li>
                <strong>Object:</strong> You can object to certain processing of your data
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@example.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Security</h2>
            <p className="text-slate-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal
              information. However, no method of transmission over the Internet or electronic storage is 100% secure.
              While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-slate-700 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
              sent. For more information, please see our{" "}
              <Link href="/cookies" className="text-[#635bff] hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Third-Party Links</h2>
            <p className="text-slate-700 leading-relaxed">
              Our platform may contain links to third-party websites. We are not responsible for the privacy practices
              of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Children's Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Our platform is not intended for users under the age of 16. We do not knowingly collect personal
              information from children under 16. If you become aware that a child has provided us with personal
              information, please contact us so we can delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. International Data Transfers</h2>
            <p className="text-slate-700 leading-relaxed">
              Your information may be transferred to and maintained on computers located outside of your jurisdiction
              where data protection laws may differ. By using our platform, you consent to this transfer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              policy on this page and updating the "Last updated" date. You are advised to review this policy
              periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@example.com
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="text-[#635bff] hover:underline">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-[#635bff] hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
