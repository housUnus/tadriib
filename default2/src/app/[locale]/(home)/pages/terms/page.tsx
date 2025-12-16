import Link from "next/link"

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for our educational platform",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center text-sm text-[#635bff] hover:underline mb-8">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-slate-600 mb-8">Last updated: December 12, 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              By accessing and using this educational platform, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Use License</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Permission is granted to temporarily access the materials (courses, quizzes, and information) on our
              platform for personal, non-commercial educational use only. This is the grant of a license, not a transfer
              of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on our platform</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. User Accounts</h2>
            <p className="text-slate-700 leading-relaxed">
              When you create an account with us, you must provide accurate, complete, and current information at all
              times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
              your account. You are responsible for safeguarding the password and for all activities that occur under
              your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Course Access and Enrollment</h2>
            <p className="text-slate-700 leading-relaxed">
              Upon enrollment in a course, you will be granted access to course materials for the duration specified at
              the time of purchase. We reserve the right to modify course content, discontinue courses, or restrict
              access in accordance with our policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Certification and Credentials</h2>
            <p className="text-slate-700 leading-relaxed">
              Certificates and credentials are awarded upon successful completion of course requirements. These
              certifications are issued by our platform and represent completion of our training programs. The value and
              recognition of these certifications by third parties is not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Payment and Refunds</h2>
            <p className="text-slate-700 leading-relaxed">
              All fees are stated in the currency displayed at checkout. Payment is required at the time of enrollment.
              Refund requests must be submitted within 30 days of purchase and are subject to our refund policy. Access
              to course materials will be revoked upon successful refund processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Intellectual Property</h2>
            <p className="text-slate-700 leading-relaxed">
              All course content, including but not limited to text, graphics, logos, videos, and software, is the
              property of our platform or its content suppliers and is protected by copyright and intellectual property
              laws. Unauthorized use of any materials may violate copyright, trademark, and other laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Prohibited Conduct</h2>
            <p className="text-slate-700 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Share your account credentials with others</li>
              <li>Download or attempt to download course content for redistribution</li>
              <li>Engage in any conduct that disrupts or interferes with the platform</li>
              <li>Use the platform for any illegal or unauthorized purpose</li>
              <li>Harass, abuse, or harm other users or instructors</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Disclaimer</h2>
            <p className="text-slate-700 leading-relaxed">
              The materials on our platform are provided on an 'as is' basis. We make no warranties, expressed or
              implied, and hereby disclaim and negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Limitations of Liability</h2>
            <p className="text-slate-700 leading-relaxed">
              In no event shall our platform or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use our platform, even if we have been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Changes to Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via
              email or through a notice on our platform. Your continued use of the platform after such modifications
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Contact Information</h2>
            <p className="text-slate-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at support@example.com
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-[#635bff] hover:underline">
              Privacy Policy
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
