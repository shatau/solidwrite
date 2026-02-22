// app/[...slug]/page.js — Dynamic pSEO page renderer
// Uses generateStaticParams for SSG + ISR fallback.
// Server component — no client JS shipped for these pages.

import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllRoutes, generatePage } from "@/libs/pseo-generator";
import Header from "@/components/Header";
import Problem from "@/components/Problem";
import FeaturesGrid from "@/components/FeaturesGrid";
import Testimonials3 from "@/components/Testimonials3";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { Suspense } from "react";


// ── Static generation ──
export async function generateStaticParams() {
  const routes = getAllRoutes();
  return routes.map((route) => ({
    slug: route.slug.split("/"),
  }));
}

// ── Dynamic metadata ──
export async function generateMetadata({ params }) {
  const slugParts = (await params).slug;
  const slug = slugParts.join("/");
  const routes = getAllRoutes();
  const route = routes.find((r) => r.slug === slug);

  if (!route) return { title: "Not Found" };

  const page = generatePage(route);
  if (!page || page.status === "SKIPPED") return { title: "Not Found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://solidwrite.com";

  return {
    title: page.seo.title,
    description: page.seo.meta_description,
    keywords: [page.seo.primary_keyword, ...page.seo.secondary_keywords],
    alternates: { canonical: `${siteUrl}/${slug}` },
    openGraph: {
      title: page.seo.title,
      description: page.seo.meta_description,
      url: `${siteUrl}/${slug}`,
      type: "article",
      siteName: "SolidWrite",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.meta_description,
    },
  };
}

// ── Structured data ──
function JsonLd({ page, slug }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://solidwrite.com";

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.seo.title,
    description: page.seo.meta_description,
    url: `${siteUrl}/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "SolidWrite",
      url: siteUrl,
    },
  };

  // FAQ schema
  let faqSchema = null;
  if (page.content.faq?.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.content.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

// ── Section renderer ──
function SectionContent({ body }) {
  // Handle JSON-encoded structured content
  try {
    const parsed = JSON.parse(body);

    if (parsed.type === "comparison_table" || parsed.type === "ranking_table") {
      return (
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100">
                {parsed.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsed.rows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 text-slate-600">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (parsed.type === "benefits_list") {
      return (
        <ul className="space-y-3 my-4">
          {parsed.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (parsed.type === "directory_listing") {
      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
          {parsed.items.map((item) => (
            <Link
              key={item.slug}
              href={item.link}
              className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
            >
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {item.name[0]}
              </span>
              <span className="font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      );
    }
  } catch {
    // Plain text — render as paragraphs
  }

  return <p className="text-slate-600 leading-relaxed">{body}</p>;
}

// ── Page component ──
export default async function PSEOPage({ params }) {
  const slugParts = (await params).slug;
  const slug = slugParts.join("/");
  const routes = getAllRoutes();
  const route = routes.find((r) => r.slug === slug);

  if (!route) notFound();

  const page = generatePage(route);
  if (!page || page.status === "SKIPPED") notFound();

  return (
    <>
      <JsonLd page={page} slug={slug} />
      <Suspense>
        <Header />
      </Suspense>
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="capitalize">{page.playbook_type}</span>
              <span>/</span>
              <span className="text-slate-700 font-medium truncate">
                {page.content.h1}
              </span>
            </nav>

            <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {page.content.h1}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              {page.content.introduction}
            </p>

            {page.content.heroStats && (
  <div className="flex flex-wrap gap-6 mt-8">
    {page.content.heroStats.map((stat, i) => (
      <div key={i} className="flex flex-col">
        <span className="text-3xl font-bold text-blue-600">{stat.value}</span>
        <span className="text-sm text-slate-500">{stat.label}</span>
      </div>
    ))}
  </div>
)}

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-sm"
              >
                Try SolidWrite Free
              </Link>
              <Link
                href="/#pricing"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <article className="max-w-4xl mx-auto px-6 py-16">
          <div className="space-y-12">
            {page.content.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {section.heading}
                </h2>
                <SectionContent body={section.body} />
              </section>
            ))}
          </div>

          {/* FAQ */}
          {page.content.faq?.length > 0 && (
            <section className="mt-16 pt-12 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {page.content.faq.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                      {faq.question}
                      <svg
                        className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTA banner */}
          <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Humanize Your Text?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              {page.content.call_to_action}
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
            >
              Start Free — 500 Words
            </Link>
          </section>

          {/* Internal links */}
          {page.internal_links?.length > 0 && (
            <section className="mt-16 pt-12 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Related Pages
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {page.internal_links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                  >
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-medium capitalize">
                      {link.playbook}
                    </span>
                    <span className="text-slate-700 text-sm font-medium">
                      {link.title}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Reused components */}
      <Problem />
      <FeaturesGrid />
      <Testimonials3 />
      <Pricing />


      </main>
      <Footer />

    </>
  );
}