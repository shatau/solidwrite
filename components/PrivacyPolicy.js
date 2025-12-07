"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          currentSection = section.getAttribute("id");
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const sections = [
    { id: "info-collect", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Your Information" },
    { id: "sharing", title: "How We Share Your Information" },
    { id: "data-retention", title: "Data Retention" },
    { id: "third-party", title: "Third-Party Links" },
    { id: "security", title: "Security" },
    { id: "your-choices", title: "Your Choices" },
    { id: "children", title: "Children's Privacy" },
    { id: "international", title: "International Transfers" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "marketing", title: "Marketing Communications" },
    { id: "gdpr", title: "GDPR Rights (EU Users)" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-base-200 border-b border-base-content/10">
        <div className="max-w-7xl mx-auto px-8 py-12">
        <div className=" text-start  pt-6">
                        <Link href="/" className="btn btn-ghost gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Privacy Policy
          </h1>
          <p className="text-base-content/70 text-lg">
            Last Updated: December 3, 2024
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
              <nav className="space-y-1">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-primary-content font-semibold"
                        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                    }`}
                  >
                    {index + 1}. {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-12 p-6 bg-base-200 rounded-lg border border-base-content/10">
              <p className="text-base leading-relaxed">
                Elite Systems s.r.o., operating as SolidWrite ("we," "us," or
                "our") operates the SolidWrite website and services (the
                "Services"). This Privacy Policy describes how we collect, use,
                and share information about you when you use our Services.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Please read this policy carefully. By accessing or using our
                Services, you agree to this Privacy Policy. If you do not agree,
                please do not use our Services.
              </p>
            </div>

            {/* Section 1 */}
            <section id="info-collect" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                1. Information We Collect
              </h2>
              
              <h3 className="text-xl font-bold mb-3">
                Information You Provide Directly:
              </h3>
              <ul>
                <li>
                  <strong>Account Information:</strong> Name, email address, and
                  password when you register for an account.
                </li>
                <li>
                  <strong>Payment Information:</strong> Billing details and
                  payment card information (processed securely through our payment
                  processor, Stripe).
                </li>
                <li>
                  <strong>Usage Data:</strong> Content you submit for processing,
                  such as text you check for AI detection or submit for
                  humanization.
                </li>
                <li>
                  <strong>Communications:</strong> Any messages you send through
                  support forms, feedback channels, or email correspondence.
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-3 mt-6">
                Information We Collect Automatically:
              </h3>
              <ul>
                <li>
                  <strong>Device & Browser Data:</strong> IP address, browser
                  type, operating system, device identifiers, and language
                  preferences.
                </li>
                <li>
                  <strong>Usage Metrics:</strong> Pages viewed, features used,
                  time spent on the Services, clickstream data, and interaction
                  patterns.
                </li>
                <li>
                  <strong>Cookies & Similar Technologies:</strong> We use cookies,
                  web beacons, and similar tracking technologies to enhance your
                  experience and analyze usage patterns.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="how-we-use" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>
                  <strong>Provide and Maintain Services:</strong> Process your
                  requests, deliver features, and ensure the Services function
                  properly.
                </li>
                <li>
                  <strong>Process Payments:</strong> Handle billing, process
                  subscription payments, and manage your account credits.
                </li>
                <li>
                  <strong>Improve Our Services:</strong> Analyze usage patterns,
                  performance metrics, and user feedback to optimize the user
                  experience and develop new features.
                </li>
                <li>
                  <strong>Communicate with You:</strong> Send service
                  announcements, updates, security alerts, billing notifications,
                  and respond to your inquiries.
                </li>
                <li>
                  <strong>Marketing:</strong> Send promotional emails, newsletters,
                  and product updates (you can opt out at any time).
                </li>
                <li>
                  <strong>For Compliance:</strong> Enforce our Terms of Service,
                  detect and prevent fraud or abuse, and comply with legal
                  obligations.
                </li>
                <li>
                  <strong>Analytics:</strong> Use aggregated, anonymized data to
                  understand usage trends and improve our AI models.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="sharing" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                3. How We Share Your Information
              </h2>
              <p>
                We do not sell your personal information. We may share your
                information in the following circumstances:
              </p>
              
              <div className="space-y-4">
                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Service Providers:</h3>
                  <p className="text-sm">
                    We share information with third-party service providers who
                    perform services on our behalf, such as:
                  </p>
                  <ul className="text-sm mt-2">
                    <li>Payment processing (Stripe)</li>
                    <li>AI text processing (Undetectable.ai)</li>
                    <li>Cloud hosting and infrastructure providers</li>
                    <li>Email delivery services</li>
                    <li>Analytics and monitoring tools</li>
                  </ul>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Legal Requirements:</h3>
                  <p className="text-sm">
                    We may disclose your information if required by law, court
                    order, or governmental authority, or to protect our rights,
                    property, or safety.
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Business Transfers:</h3>
                  <p className="text-sm">
                    In the event of a merger, acquisition, or sale of assets, your
                    information may be transferred to the acquiring entity.
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">With Your Consent:</h3>
                  <p className="text-sm">
                    We may share your information for other purposes with your
                    explicit consent.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="data-retention" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">4. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to
                provide our Services and fulfill the purposes described in this
                Privacy Policy. Specifically:
              </p>
              <ul>
                <li>
                  <strong>Account Information:</strong> Retained while your
                  account is active and for a reasonable period thereafter to
                  comply with legal obligations.
                </li>
                <li>
                  <strong>Text Submissions:</strong> We maintain submitted text
                  for the purpose of operating the Services and improving our AI
                  models. We may retain aggregated, anonymized data indefinitely
                  for analytics purposes.
                </li>
                <li>
                  <strong>Payment Information:</strong> Billing records are
                  retained as required by law and for accounting purposes.
                </li>
              </ul>
              <p className="mt-4">
                You may request deletion of your account and associated data by
                contacting us at support@solidwrite.com. Note that some
                information may be retained as required by law or for legitimate
                business purposes.
              </p>
            </section>

            {/* Section 5 */}
            <section id="third-party" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">5. Third-Party Links</h2>
              <p>
                Our Services may contain links to third-party websites, plugins,
                or services. We are not responsible for the privacy practices of
                those third parties. Visiting those sites is at your own risk, and
                we encourage you to read their privacy policies.
              </p>
            </section>

            {/* Section 6 */}
            <section id="security" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">6. Security</h2>
              <p>
                We implement industry-standard security measures to protect your
                information, including:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and password protection</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and employee training</li>
              </ul>
              <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  <strong>Important:</strong> However, no method of transmission
                  over the Internet or method of electronic storage is 100%
                  secure. While we strive to protect your information, we cannot
                  guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="your-choices" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">7. Your Choices</h2>
              <p>You have several choices regarding your information:</p>
              
              <div className="space-y-4 mt-4">
                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Account Information:</h3>
                  <p className="text-sm">
                    You can access, update, or delete your account information at
                    any time by logging into your account settings.
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Marketing Emails:</h3>
                  <p className="text-sm">
                    You may unsubscribe from marketing emails via the link in
                    those emails or by adjusting your email preferences in your
                    account. Note that you cannot unsubscribe from essential
                    service-related emails.
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Cookies:</h3>
                  <p className="text-sm">
                    You can disable cookies in your browser settings, though some
                    features of the Services may not work properly if you do so.
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Account Deletion:</h3>
                  <p className="text-sm">
                    You can request deletion of your account by contacting us at
                    support@solidwrite.com. We will delete your account and
                    associated data, subject to legal retention requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="children" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
              <p>
                Our Services are not directed to children under 18. We do not
                knowingly collect personal data from minors. If you believe we
                have collected information from a child under 18, please contact
                us at support@solidwrite.com and we will promptly delete it.
              </p>
            </section>

            {/* Section 9 */}
            <section id="international" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                9. International Transfers
              </h2>
              <p>
                Your information may be transferred to and processed in countries
                outside your country of residence, including the United States and
                other countries where our service providers operate. These
                countries may have different data protection laws than your
                country.
              </p>
              <p className="mt-4">
                By using our Services, you consent to such transfers. We take
                appropriate measures to ensure that your information receives
                adequate protection in accordance with this Privacy Policy and
                applicable data protection laws, including the GDPR where
                applicable.
              </p>
            </section>

            {/* Section 10 */}
            <section id="changes" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology, legal requirements, or other
                factors. We will post the updated date at the top of this policy.
              </p>
              <p className="mt-4">
                Continued use of the Services after changes constitutes acceptance
                of the updated Privacy Policy. We encourage you to review this
                policy periodically to stay informed about how we protect your
                information.
              </p>
              <p className="mt-4">
                If we make material changes, we may provide additional notice,
                such as by email or through a prominent notice on our website.
              </p>
            </section>

            {/* Section 11 */}
            <section id="marketing" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                11. Marketing Communications
              </h2>
              <p>
                By creating an account or providing your email, you consent to
                receive marketing communications from SolidWrite, including
                newsletters, promotions, and product updates.
              </p>
              <p className="mt-4">
                You may opt out of these communications at any time by:
              </p>
              <ul>
                <li>
                  Clicking the "unsubscribe" link in any marketing email
                </li>
                <li>
                  Adjusting your email preferences in your account settings
                </li>
                <li>Contacting us at support@solidwrite.com</li>
              </ul>
              <p className="mt-4">
                Please note that you will still receive essential service-related
                emails that are necessary for the operation of your account,
                including account verification, billing confirmations, and
                security notifications.
              </p>
            </section>

            {/* Section 12 */}
            <section id="gdpr" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                12. GDPR Rights (EU Users)
              </h2>
              <p>
                If you are located in the European Union, you have certain rights
                under the General Data Protection Regulation (GDPR):
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Right to Access</h3>
                  <p className="text-sm">
                    Request a copy of the personal data we hold about you.
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Right to Rectification</h3>
                  <p className="text-sm">
                    Request correction of inaccurate or incomplete personal data.
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Right to Erasure</h3>
                  <p className="text-sm">
                    Request deletion of your personal data ("right to be
                    forgotten").
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Right to Restrict Processing</h3>
                  <p className="text-sm">
                    Request that we limit how we use your personal data.
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Right to Data Portability</h3>
                  <p className="text-sm">
                    Request a copy of your data in a structured, machine-readable
                    format.
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Right to Object</h3>
                  <p className="text-sm">
                    Object to processing of your personal data for certain
                    purposes.
                  </p>
                </div>
              </div>

              <p className="mt-4">
                To exercise any of these rights, please contact us at
                support@solidwrite.com. We will respond to your request within one
                month, as required by GDPR.
              </p>

              <p className="mt-4">
                You also have the right to lodge a complaint with your local data
                protection authority if you believe we have not complied with
                applicable data protection laws.
              </p>
            </section>

            {/* Section 13 */}
            <section id="contact" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
              <div className="bg-base-200 p-6 rounded-lg">
                <p className="mb-4">
                  If you have questions or concerns about this Privacy Policy or
                  our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="font-bold">
                    Elite Systems s.r.o. (SolidWrite)
                  </p>
                  <p>
                    <strong>Email:</strong> support@solidwrite.com
                  </p>
                  <p>
                    <strong>Website:</strong> https://solidwrite.com
                  </p>
                </div>
                <p className="mt-4 text-sm text-base-content/70">
                  We will respond to your inquiry as promptly as possible.
                </p>
              </div>
            </section>

            {/* Data Controller Information */}
            <div className="mt-12 p-6 bg-primary/10 border border-primary/30 rounded-lg">
              <h3 className="font-bold mb-2">Data Controller:</h3>
              <p className="text-sm">
                Elite Systems s.r.o. is the data controller responsible for your
                personal information collected through the SolidWrite Services.
                We are registered in the Czech Republic.
              </p>
            </div>

            {/* Final Statement */}
            <div className="mt-8 p-6 bg-base-200 border border-base-content/20 rounded-lg">
              <p className="text-center font-bold">
                By using SolidWrite, you acknowledge that you have read and
                understood this Privacy Policy.
              </p>
            </div>

            {/* Related Documents */}
            <div className="mt-8 p-4 bg-base-200 rounded-lg">
              <p className="text-sm text-base-content/70 mb-2">
                Related Documents:
              </p>
              <div className="flex gap-4">
                <Link
                  href="/tos"
                  className="link link-primary text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;