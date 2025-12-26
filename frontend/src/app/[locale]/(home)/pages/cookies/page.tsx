import Link from "next/link"

export const metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for our educational platform",
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center text-sm text-[#635bff] hover:underline mb-8">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: December 12, 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. What Are Cookies</h2>
            <p className="text-slate-700 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit our
              platform. They are widely used to make websites work more efficiently, provide information to website
              owners, and enhance user experience. This Cookie Policy explains what cookies are, how we use them, and
              your choices regarding their use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use cookies for several important reasons to improve your learning experience and platform
              functionality:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Keeping you signed in to your account</li>
              <li>Remembering your preferences and settings</li>
              <li>Understanding how you use our platform to improve services</li>
              <li>Providing personalized course recommendations</li>
              <li>Ensuring platform security and preventing fraud</li>
              <li>Analyzing site performance and user behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Types of Cookies We Use</h2>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3.1 Essential Cookies</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              These cookies are necessary for the platform to function and cannot be disabled in our systems. They are
              usually only set in response to actions you make, such as setting privacy preferences, logging in, or
              filling in forms.
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">
                <strong>Examples:</strong>
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Authentication cookies (session management)</li>
                <li>• Security cookies (fraud prevention)</li>
                <li>• Load balancing cookies (platform stability)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3.2 Functional Cookies</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              These cookies enable enhanced functionality and personalization. They may be set by us or by third-party
              providers whose services we have added to our pages. If you do not allow these cookies, some or all of
              these services may not function properly.
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">
                <strong>Examples:</strong>
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Remembering language preferences</li>
                <li>• Saving course progress and bookmarks</li>
                <li>• Remembering video playback settings</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3.3 Analytics and Performance Cookies</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              These cookies allow us to count visits and traffic sources so we can measure and improve platform
              performance. They help us understand which pages are most popular, how users navigate the site, and
              identify technical issues.
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">
                <strong>Examples:</strong>
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Google Analytics cookies</li>
                <li>• Page view tracking</li>
                <li>• Error tracking and reporting</li>
                <li>• A/B testing cookies</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">3.4 Advertising and Marketing Cookies</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              These cookies may be set through our site by advertising partners. They may be used to build a profile of
              your interests and show you relevant content on other sites. If you do not allow these cookies, you will
              experience less targeted advertising.
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">
                <strong>Examples:</strong>
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Retargeting cookies</li>
                <li>• Social media advertising pixels</li>
                <li>• Campaign tracking cookies</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              In addition to our own cookies, we may use various third-party cookies to report usage statistics, deliver
              advertisements, and more.
            </p>
            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Google Analytics</p>
                <p className="text-sm text-slate-600">Used to understand how users interact with our platform</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Payment Processors</p>
                <p className="text-sm text-slate-600">Used to process secure payments (Stripe, PayPal, etc.)</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Video Hosting</p>
                <p className="text-sm text-slate-600">Used to embed and track video content</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Social Media Platforms</p>
                <p className="text-sm text-slate-600">Used for social sharing and authentication</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Cookie Duration</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Cookies can be either session cookies or persistent cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser
              </li>
              <li>
                <strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete
                them
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Your Cookie Choices</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You have several options to manage or disable cookies:
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">6.1 Browser Settings</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Most web browsers allow you to control cookies through their settings. You can set your browser to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Block all cookies</li>
              <li>Accept only first-party cookies</li>
              <li>Clear cookies when you close your browser</li>
              <li>Receive notifications when cookies are being set</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">6.2 Opt-Out Tools</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              You can opt out of certain third-party cookies through:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Google Analytics Opt-out Browser Add-on</li>
              <li>Network Advertising Initiative opt-out page</li>
              <li>Digital Advertising Alliance opt-out page</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">6.3 Important Note</h3>
            <p className="text-slate-700 leading-relaxed bg-amber-50 border border-amber-200 p-4 rounded-lg">
              Please note that disabling certain cookies may affect the functionality of our platform. Essential cookies
              cannot be disabled as they are necessary for the platform to work properly. If you disable functional or
              analytics cookies, you may experience reduced functionality or a less personalized experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Do Not Track Signals</h2>
            <p className="text-slate-700 leading-relaxed">
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not
              want to have your online activity tracked. Currently, there is no industry standard for how to respond to
              DNT signals. At this time, our platform does not respond to DNT browser signals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Updates to This Cookie Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our
              business practices. We will notify you of any material changes by posting the updated policy on this page
              with a new "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at
              cookies@example.com
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="text-[#635bff] hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-[#635bff] hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
