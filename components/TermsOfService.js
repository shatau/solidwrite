"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const TermsOfService = () => {
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
        { id: "services", title: "Our Services" },
        { id: "ip-rights", title: "Intellectual Property Rights" },
        { id: "user-reps", title: "User Representations" },
        { id: "registration", title: "User Registration" },
        { id: "purchases", title: "Purchases and Payment" },
        { id: "subscription-plans", title: "Subscription Plans" },
        { id: "cancellation", title: "Cancellation and Refunds" },
        { id: "subscription-term", title: "Subscription Term and Termination" },
        { id: "prohibited", title: "Prohibited Activities" },
        { id: "contributions", title: "User Generated Contributions" },
        { id: "contribution-license", title: "Contribution License" },
        { id: "text-processing", title: "Text Processing and Data Usage" },
        { id: "third-party", title: "Third-Party Websites and Content" },
        { id: "advertisers", title: "Advertisers" },
        { id: "services-mgmt", title: "Services Management" },
        { id: "privacy", title: "Privacy Policy" },
        { id: "copyright", title: "Copyright Infringements" },
        { id: "term-termination", title: "Term and Termination" },
        { id: "modifications", title: "Modifications and Interruptions" },
        { id: "governing-law", title: "Governing Law" },
        { id: "dispute", title: "Dispute Resolution" },
        { id: "corrections", title: "Corrections" },
        { id: "disclaimer", title: "Disclaimer" },
        { id: "liability", title: "Limitations of Liability" },
        { id: "indemnification", title: "Indemnification" },
        { id: "user-data", title: "User Data" },
        { id: "electronic", title: "Electronic Communications" },
        { id: "marketing", title: "Marketing Communications" },
        { id: "eu-users", title: "European Union Users" },
        { id: "misc", title: "Miscellaneous" },
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
                        Terms of Service
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
                                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === section.id
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
                                This Terms of Service agreement is entered into by you (&quot;you&quot; or
                                &quot;your&quot;) and Elite Systems s.r.o., operating as SolidWrite
                                (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Legal Terms govern your
                                access to and use of our website at solidwrite.com and any related
                                products or services provided by SolidWrite (collectively, the
                                &quot;Services&quot;).
                            </p>
                            <p className="text-base leading-relaxed mt-4">
                                By accessing or using our Services, you agree that you have read,
                                understood, and accepted these Legal Terms. If you do not agree
                                with all of these Legal Terms, you are expressly prohibited from
                                using our Services and must discontinue use immediately.
                            </p>
                            <p className="text-base leading-relaxed mt-4">
                                <strong>The Services are intended for users who are at least 18
                                    years old.</strong> Persons under 18 are not permitted to use or
                                register for our Services.
                            </p>
                        </div>

                        {/* Section 1 */}
                        <section id="services" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">1. Our Services</h2>
                            <p>
                                The information provided when using our Services is not intended
                                for distribution or use by any person or entity in any
                                jurisdiction where such distribution or use is contrary to
                                applicable law or regulation. Those who access our Services from
                                locations where local laws differ do so on their own initiative
                                and are solely responsible for compliance with local laws.
                            </p>
                            <p>
                                The Services are not specifically tailored to comply with any
                                industry‑specific regulations (for example, those applicable to
                                healthcare or financial services); if your interactions would be
                                subject to such laws, you may not use the Services.
                            </p>
                            <p>
                                SolidWrite provides AI-powered text humanization and detection
                                services designed to transform AI-generated content into natural,
                                human-like writing. Our Services are intended for legitimate
                                purposes such as content improvement, style enhancement, and
                                quality assurance.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section id="ip-rights" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                2. Intellectual Property Rights
                            </h2>
                            <p>
                                We are the owner or licensee of all intellectual property rights
                                in our Services, including all source code, databases, software,
                                website designs, audio, video, text, photographs, and graphics
                                (collectively, the &quot;Content&quot;), as well as the trademarks, service
                                marks, and logos (the &quot;Marks&quot;).
                            </p>
                            <p>
                                Subject to your compliance with these Legal Terms, we grant you a
                                limited, non‑exclusive, non‑transferable, revocable license to
                                access our Services and download or print a copy of any portion of
                                the Content to which you have gained lawful access, solely for
                                your personal, non‑commercial use or internal business purposes.
                            </p>
                            <p>
                                Unauthorized use of any Content or Marks will constitute a
                                material breach of these Legal Terms and may result in immediate
                                termination of your right to use our Services.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section id="user-reps" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">3. User Representations</h2>
                            <p>By using our Services, you represent and warrant that:</p>
                            <ul>
                                <li>
                                    All information provided during registration or through use of
                                    the Services is true, accurate, current, and complete.
                                </li>
                                <li>
                                    You will maintain and promptly update such information as
                                    necessary.
                                </li>
                                <li>
                                    You have the legal capacity and agree to comply with these Legal
                                    Terms.
                                </li>
                                <li>You are not a minor in your jurisdiction of residence.</li>
                                <li>
                                    You will not use any automated or non‑human methods to access
                                    the Services.
                                </li>
                                <li>
                                    Your use of the Services is for lawful purposes only and will
                                    not breach any applicable law or regulation.
                                </li>
                                <li>
                                    You will not use the Services to engage in academic dishonesty,
                                    plagiarism, or any form of deception.
                                </li>
                            </ul>
                            <p>
                                If any information you provide is untrue, inaccurate, or
                                incomplete, we reserve the right to suspend or terminate your
                                account and refuse any current or future use of our Services.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section id="registration" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">4. User Registration</h2>
                            <p>
                                Registration may be required to access certain Services. You are
                                responsible for safeguarding your password and for all activities
                                that occur under your account. We reserve the right to remove,
                                reclaim, or change any username you choose if, in our sole
                                discretion, the username is deemed inappropriate, obscene, or
                                objectionable.
                            </p>
                            <p>You agree to:</p>
                            <ul>
                                <li>Provide accurate registration information</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Notify us immediately of any unauthorized access</li>
                                <li>Accept responsibility for all activities under your account</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section id="purchases" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                5. Purchases and Payment
                            </h2>
                            <p>
                                For any transactions made via the Services, you agree to provide
                                current, complete, and accurate purchase and account information.
                                All payments shall be made in the currency specified at the time
                                of purchase. Value-added tax (VAT) or other applicable taxes may
                                be added as required by law.
                            </p>
                            <p>
                                You authorize us to charge your payment provider for any charges
                                incurred at the prices then in effect. For subscriptions with
                                recurring charges, you consent to such charges until you cancel
                                the subscription in accordance with these terms.
                            </p>
                            <div className="bg-base-200 p-4 rounded-lg mt-4">
                                <h3 className="font-bold mb-2">Credit-Based System:</h3>
                                <ul>
                                    <li>Our Services operate on a credit-based system where 1 word = 1 credit</li>
                                    <li>Credits are allocated based on your subscription tier</li>
                                    <li>Credits reset monthly on your billing anniversary date</li>
                                    <li>Unused credits do not roll over to the next billing period</li>
                                    <li>New users receive 500 free credits upon registration (one-time only)</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section id="subscription-plans" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">6. Subscription Plans</h2>
                            <p>SolidWrite offers the following subscription tiers:</p>

                            <div className="grid md:grid-cols-3 gap-4 my-6">
                                <div className="border border-base-content/20 rounded-lg p-4">
                                    <h3 className="font-bold text-lg mb-2">Basic Plan</h3>
                                    <ul className="text-sm space-y-1">
                                        <li>• 5,000 credits per month</li>
                                        <li>• Basic AI Humanizer</li>
                                        <li>• Unlimited AI Detection</li>
                                        <li>• 500 words per request</li>
                                    </ul>
                                </div>
                                <div className="border border-primary rounded-lg p-4 bg-primary/5">
                                    <h3 className="font-bold text-lg mb-2">Pro Plan</h3>
                                    <ul className="text-sm space-y-1">
                                        <li>• 15,000 credits per month</li>
                                        <li>• Advanced AI Humanizer</li>
                                        <li>• Unlimited AI Detection</li>
                                        <li>• 1,500 words per request</li>
                                    </ul>
                                </div>
                                <div className="border border-base-content/20 rounded-lg p-4">
                                    <h3 className="font-bold text-lg mb-2">Ultra Plan</h3>
                                    <ul className="text-sm space-y-1">
                                        <li>• 30,000 credits per month</li>
                                        <li>• Advanced AI Humanizer</li>
                                        <li>• Unlimited AI Detection</li>
                                        <li>• 3,000 words per request</li>
                                        <li>• Priority support</li>
                                    </ul>
                                </div>
                            </div>

                            <p>
                                All plans include multilingual support and the &quot;My Writing Style&quot;
                                feature. Annual subscriptions receive a 50% discount compared to
                                monthly pricing and are billed once per year.
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section id="cancellation" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                7. Cancellation and Refunds
                            </h2>

                            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-4">
                                <h3 className="font-bold mb-2">Cancellation:</h3>
                                <p className="text-sm">
                                    You can cancel your subscription at any time by logging into
                                    your account settings. Upon cancellation, your subscription will
                                    remain active until the end of your current billing period.
                                </p>
                            </div>

                            <div className="bg-error/10 border border-error/30 rounded-lg p-4">
                                <h3 className="font-bold mb-2">Refund Policy:</h3>
                                <p className="text-sm">
                                    By subscribing to our services, you acknowledge that SolidWrite
                                    gives you instant access to digital features and that usage
                                    begins immediately after purchase. Due to the high costs of
                                    running AI models and server resources, <strong>all payments are
                                        non-refundable</strong>, as resources are allocated and costs are
                                    incurred the moment you begin using the service.
                                </p>
                            </div>
                        </section>

                        {/* Section 8 */}
                        <section id="subscription-term" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                8. Subscription Term and Termination
                            </h2>
                            <p>
                                Your subscription to our Services is valid only for the period
                                during which our operations remain active. We do not guarantee
                                that your subscription will last for a full year or for any
                                specified period.
                            </p>
                            <p>
                                SolidWrite operates on a subscription model, available on a
                                monthly or yearly basis. Subscriptions renew automatically for the
                                same period unless you cancel before the renewal date. You can
                                manage or cancel your subscription at any time via your account
                                dashboard.
                            </p>
                            <p>
                                We reserve the right to adjust pricing, features, or service
                                offerings at any time. Price changes for subscription plans will
                                only take effect at your next renewal.
                            </p>
                        </section>

                        {/* Section 9 */}
                        <section id="prohibited" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">9. Prohibited Activities</h2>
                            <p>
                                You may not use the Services for any purpose other than as
                                provided by SolidWrite. Prohibited conduct includes, but is not
                                limited to:
                            </p>
                            <ul>
                                <li>
                                    Using the Services to engage in academic dishonesty, plagiarism,
                                    or to circumvent academic integrity policies
                                </li>
                                <li>
                                    Submitting content for humanization that you do not have the
                                    right to modify or use
                                </li>
                                <li>
                                    Creating multiple accounts to abuse free-tier usage or
                                    promotional offers
                                </li>
                                <li>
                                    Circumventing or disabling security features of our Services
                                </li>
                                <li>
                                    Engaging in automated use of the system, such as using bots,
                                    scripts, or data mining tools
                                </li>
                                <li>
                                    Uploading or transmitting viruses, malware, or other harmful
                                    materials
                                </li>
                                <li>
                                    Using the Services to generate content that is unlawful,
                                    harmful, threatening, abusive, defamatory, or obscene
                                </li>
                                <li>
                                    Any other activity that SolidWrite deems to be harmful, illegal,
                                    or inappropriate
                                </li>
                            </ul>
                        </section>

                        {/* Section 10 */}
                        <section id="contributions" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                10. User Generated Contributions
                            </h2>
                            <p>
                                Our Services may allow you to post or submit content, comments,
                                reviews, or other materials (&quot;Contributions&quot;). By submitting
                                Contributions, you agree that:
                            </p>
                            <ul>
                                <li>
                                    Your Contributions are non‑confidential and may be used by
                                    SolidWrite for improvement of our Services
                                </li>
                                <li>
                                    You are solely responsible for your Contributions and the
                                    consequences of posting them
                                </li>
                                <li>
                                    Contributions must not infringe upon any third party&apos;s
                                    intellectual property or other rights
                                </li>
                                <li>
                                    SolidWrite reserves the right to remove, edit, or relocate any
                                    Contribution that it deems harmful or in breach of these Legal
                                    Terms
                                </li>
                            </ul>
                        </section>

                        {/* Section 11 */}
                        <section id="contribution-license" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                11. Contribution License
                            </h2>
                            <p>
                                By posting any Contributions to our Services, you grant SolidWrite
                                an unrestricted, perpetual, irrevocable, worldwide, non‑exclusive,
                                royalty‑free, transferable license to use, reproduce, modify,
                                publish, distribute, translate, display, and perform your
                                Contributions in any media and for any purpose, including service
                                improvement.
                            </p>
                            <p>
                                SolidWrite does not claim ownership of your Contributions; you
                                retain ownership but grant us this extensive license for the
                                purpose of operating and improving the Services.
                            </p>
                        </section>

                        {/* Section 12 */}
                        <section id="text-processing" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                12. Text Processing and Data Usage
                            </h2>
                            <p>When you submit text to our Services for humanization or detection:</p>
                            <ul>
                                <li>
                                    Your text is processed through our AI systems and third-party AI
                                    service providers
                                </li>
                                <li>
                                    We maintain submitted data for the purpose of managing and
                                    operating the Services and for analytics purposes
                                </li>
                                <li>
                                    We do not sell or share your submitted text with third parties
                                    for their marketing purposes
                                </li>
                                <li>
                                    We may use aggregated, anonymized data to improve our Services
                                </li>
                                <li>
                                    SolidWrite shall not be liable for any loss or corruption of
                                    your data
                                </li>
                            </ul>
                        </section>

                        {/* Section 13 */}
                        <section id="third-party" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                13. Third-Party Websites and Content
                            </h2>
                            <p>
                                Our Services may include links to third‑party websites or display
                                content from third parties. SolidWrite does not control or endorse
                                any third‑party websites or content, and we are not responsible
                                for their accuracy, legality, or content.
                            </p>
                        </section>

                        {/* Section 14 */}
                        <section id="advertisers" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">14. Advertisers</h2>
                            <p>
                                Advertisers may display their advertisements within our Services.
                                SolidWrite provides the space for such advertisements and does not
                                have any responsibility for the content or practices of the
                                advertisers.
                            </p>
                        </section>

                        {/* Section 15 */}
                        <section id="services-mgmt" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">15. Services Management</h2>
                            <p>SolidWrite reserves the right to:</p>
                            <ul>
                                <li>Monitor the Services for violations of these Legal Terms</li>
                                <li>
                                    Take appropriate legal action against any user who violates
                                    these Legal Terms
                                </li>
                                <li>
                                    Refuse, restrict, or disable access to any portion of the
                                    Services at our sole discretion
                                </li>
                                <li>
                                    Remove or disable any content that is excessively large or
                                    burdensome to our systems
                                </li>
                                <li>
                                    Impose rate limits or usage restrictions to maintain service
                                    quality
                                </li>
                            </ul>
                        </section>

                        {/* Section 16 */}
                        <section id="privacy" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">16. Privacy Policy</h2>
                            <p>
                                Your privacy is important to us. Please review our{" "}
                                <Link href="/privacy-policy" className="link link-primary">
                                    Privacy Policy
                                </Link>
                                , which describes how we collect, use, store, and share your
                                information. By using our Services, you agree that our Privacy
                                Policy governs our use of your personal data.
                            </p>
                        </section>

                        {/* Section 17 */}
                        <section id="copyright" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                17. Copyright Infringements
                            </h2>
                            <p>
                                We respect the intellectual property rights of others. If you
                                believe that any material provided through our Services infringes
                                upon a copyright that you own or control, please notify us
                                immediately at support@solidwrite.com.
                            </p>
                        </section>

                        {/* Section 18 */}
                        <section id="term-termination" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                18. Term and Termination
                            </h2>
                            <p>
                                These Legal Terms will remain in full force and effect while you
                                use our Services. SolidWrite reserves the right to deny access or
                                terminate your account if you breach any provision of these Legal
                                Terms.
                            </p>
                            <p>Grounds for termination include:</p>
                            <ul>
                                <li>Violation of these Legal Terms</li>
                                <li>Fraudulent, abusive, or illegal activity</li>
                                <li>Creating multiple accounts to abuse free credits</li>
                                <li>Excessive or abusive use of support services</li>
                            </ul>
                        </section>

                        {/* Section 19 */}
                        <section id="modifications" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                19. Modifications and Interruptions
                            </h2>
                            <p>
                                SolidWrite may change, modify, or remove the contents of the
                                Services at any time without notice. We do not guarantee that our
                                Services will be available at all times, and we may experience
                                interruptions, delays, or errors from time to time.
                            </p>
                        </section>

                        {/* Section 20 */}
                        <section id="governing-law" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">20. Governing Law</h2>
                            <p>
                                These Legal Terms and your use of the Services are governed by and
                                construed in accordance with the laws of the Czech Republic. The
                                Company is registered in the Czech Republic as Elite Systems
                                s.r.o.
                            </p>
                        </section>

                        {/* Section 21 */}
                        <section id="dispute" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">21. Dispute Resolution</h2>
                            <h3 className="font-bold mb-2">Informal Negotiations:</h3>
                            <p>
                                Before initiating any formal dispute resolution process, you and
                                SolidWrite agree to attempt to resolve any disputes informally for
                                a period of at least thirty (30) days following written notice.
                            </p>
                            <h3 className="font-bold mb-2 mt-4">Binding Arbitration:</h3>
                            <p>
                                If a dispute cannot be resolved informally, any unresolved dispute
                                shall be resolved through binding arbitration conducted under the
                                rules of the Arbitration Court attached to the Czech Chamber of
                                Commerce and the Agricultural Chamber of the Czech Republic.
                            </p>
                            <p>
                                Any claim must be brought within two (2) years of the date the
                                cause of action arose.
                            </p>
                        </section>

                        {/* Section 22 */}
                        <section id="corrections" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">22. Corrections</h2>
                            <p>
                                There may be errors, inaccuracies, or omissions in the information
                                provided through our Services. SolidWrite reserves the right to
                                correct any errors or update any information at its sole
                                discretion without prior notice.
                            </p>
                        </section>

                        {/* Section 23 */}
                        <section id="disclaimer" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">23. Disclaimer</h2>
                            <div className="bg-base-200 p-4 rounded-lg border border-base-content/20">
                                <p className="font-bold uppercase">
                                    THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
                                    BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES IS AT YOUR SOLE
                                    RISK.
                                </p>
                                <p className="mt-4">
                                    TO THE FULLEST EXTENT PERMITTED BY LAW, SOLIDWRITE DISCLAIMS ALL
                                    WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES
                                    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                                    NON-INFRINGEMENT.
                                </p>
                                <p className="mt-4">
                                    SOLIDWRITE MAKES NO GUARANTEES REGARDING THE EFFECTIVENESS OF
                                    TEXT HUMANIZATION OR THE ABILITY TO BYPASS SPECIFIC AI DETECTION
                                    SYSTEMS. AI DETECTION TECHNOLOGY IS CONSTANTLY EVOLVING, AND
                                    RESULTS MAY VARY.
                                </p>
                            </div>
                        </section>

                        {/* Section 24 */}
                        <section id="liability" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                24. Limitations of Liability
                            </h2>
                            <p>
                                IN NO EVENT SHALL SOLIDWRITE, ELITE SYSTEMS S.R.O., ITS OFFICERS,
                                EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
                                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
                                ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES.
                            </p>
                            <p className="mt-4">
                                YOUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR
                                ACCESSING THE SERVICES DURING THE TWELVE (12) MONTHS PRIOR TO THE
                                EVENT GIVING RISE TO THE LIABILITY.
                            </p>
                        </section>

                        {/* Section 25 */}
                        <section id="indemnification" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">25. Indemnification</h2>
                            <p>
                                You agree to defend, indemnify, and hold harmless SolidWrite,
                                Elite Systems s.r.o., and its employees from any claims,
                                liabilities, damages, losses, and expenses arising out of:
                            </p>
                            <ul>
                                <li>Your access to or use of the Services</li>
                                <li>Your violation of these Legal Terms</li>
                                <li>Your infringement of any rights of a third party</li>
                                <li>
                                    Your use of humanized text in violation of academic integrity
                                    policies
                                </li>
                            </ul>
                        </section>

                        {/* Section 26 */}
                        <section id="user-data" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">26. User Data</h2>
                            <p>
                                SolidWrite will maintain data that you transmit through our
                                Services solely for managing and operating the Services and for
                                analytics purposes. While we regularly perform routine data
                                backups, you are responsible for any data you provide. SolidWrite
                                shall not be liable for any loss or corruption of your data.
                            </p>
                        </section>

                        {/* Section 27 */}
                        <section id="electronic" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                27. Electronic Communications, Transactions, and Signatures
                            </h2>
                            <p>
                                All communications, transactions, and signatures exchanged between
                                you and SolidWrite electronically shall be treated as if they were
                                in writing. By using our Services, you consent to receive
                                electronic communications.
                            </p>
                        </section>

                        {/* Section 28 */}
                        <section id="marketing" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">
                                28. Marketing Communications
                            </h2>
                            <p>
                                By creating an account or providing your email, you consent to
                                receive marketing communications from SolidWrite, including
                                newsletters, promotions, and product updates.
                            </p>
                            <p>You may opt out by:</p>
                            <ul>
                                <li>Clicking the &quot;unsubscribe&quot; link in any marketing email</li>
                                <li>Adjusting your email preferences in your account settings</li>
                                <li>Contacting us at support@solidwrite.com</li>
                            </ul>
                        </section>

                        {/* Section 29 */}
                        <section id="eu-users" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">29. European Union Users</h2>
                            <p>
                                If you are a user in the European Union, you have certain rights
                                under the GDPR, including:
                            </p>
                            <ul>
                                <li>The right to access your personal data</li>
                                <li>The right to rectification of inaccurate data</li>
                                <li>The right to erasure (&quot;right to be forgotten&quot;)</li>
                                <li>The right to restrict processing</li>
                                <li>The right to data portability</li>
                                <li>The right to object to processing</li>
                            </ul>
                            <p>
                                To exercise these rights, please contact us at
                                support@solidwrite.com.
                            </p>
                        </section>

                        {/* Section 30 */}
                        <section id="misc" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">30. Miscellaneous</h2>
                            <p>
                                These Legal Terms, along with any additional policies we post on
                                the Services, constitute the entire agreement between you and
                                SolidWrite. Our failure to enforce any provision does not
                                constitute a waiver of such provision.
                            </p>
                            <p>
                                If any provision of these Legal Terms is held to be invalid or
                                unenforceable, such provision shall be severed, and the remaining
                                provisions shall remain in full force and effect.
                            </p>
                        </section>

                        {/* Section 31 */}
                        <section id="contact" className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">31. Contact Us</h2>
                            <div className="bg-base-200 p-6 rounded-lg">
                                <p className="font-bold mb-2">
                                    Elite Systems s.r.o. (SolidWrite)
                                </p>
                                <p>Email: support@solidwrite.com</p>
                                <p>Website: https://solidwrite.com</p>
                                <p className="mt-4 text-sm text-base-content/70">
                                    For privacy-related inquiries, please see our{" "}
                                    <Link href="/privacy-policy" className="link link-primary">
                                        Privacy Policy
                                    </Link>{" "}
                                    or contact us at the email address above.
                                </p>
                            </div>
                        </section>

                        {/* Final Statement */}
                        <div className="mt-12 p-6 bg-primary/10 border border-primary/30 rounded-lg">
                            <p className="text-center font-bold">
                                By using SolidWrite, you acknowledge that you have read,
                                understood, and agree to be bound by these Terms of Service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;