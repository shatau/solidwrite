// libs/pseo-generator.js — Server-side content generation engine
// Generates structured page data for each of the 12 playbook types.
// Called from API routes and static generation functions ONLY.

import PSEO_CONFIG from "./pseo-config";

// ── Helpers ──

function capitalize(str) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pickRandom(arr, n = 2) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, arr.length));
}

function buildInternalLinks(currentSlug, playbook, count = 5) {
  const links = [];
  const allRoutes = getAllRoutes();
  const filtered = allRoutes.filter(
    (r) => r.slug !== currentSlug && r.playbook !== playbook
  );
  const same = allRoutes.filter(
    (r) => r.slug !== currentSlug && r.playbook === playbook
  );

  // 2 siblings + 3 cross-playbook
  pickRandom(same, 2).forEach((r) => links.push(r));
  pickRandom(filtered, 3).forEach((r) => links.push(r));

  return links.slice(0, count).map((r) => ({
    url: `/${r.slug}`,
    title: r.title,
    playbook: r.playbook,
  }));
}

// ── Route manifest (all possible pages) ──

export function getAllRoutes() {
  const routes = [];

  // Comparisons: solidwrite-vs-{tool}
  PSEO_CONFIG.tools.forEach((tool) => {
    routes.push({
      slug: `solidwrite-vs-${tool.slug}`,
      playbook: "comparisons",
      title: `SolidWrite vs ${tool.label}: Which AI Humanizer Is Better?`,
      params: { tool },
    });
  });

  // Personas: ai-humanizer-for-{persona}
  PSEO_CONFIG.personas.forEach((persona) => {
    routes.push({
      slug: `ai-humanizer-for-${persona.slug}`,
      playbook: "personas",
      title: `AI Humanizer for ${persona.label} — SolidWrite`,
      params: { persona },
    });
  });

  // Detectors: bypass-{detector}
  PSEO_CONFIG.detectors.forEach((det) => {
    routes.push({
      slug: `bypass-${det.slug}`,
      playbook: "examples",
      title: `How to Bypass ${det.label} AI Detection in 2025`,
      params: { detector: det },
    });
  });

  // Use cases: humanize-{useCase}
  PSEO_CONFIG.useCases.forEach((uc) => {
    routes.push({
      slug: `humanize-${uc.slug}`,
      playbook: "templates",
      title: `How to Humanize AI-Generated ${uc.label}`,
      params: { useCase: uc },
    });
  });

  // Glossary
  PSEO_CONFIG.glossaryTerms.forEach((term) => {
    routes.push({
      slug: `glossary/${term.slug}`,
      playbook: "glossary",
      title: `What Is ${term.label}? — AI Writing Glossary`,
      params: { term },
    });
  });

  // Locations: ai-humanizer-in-{location}
  PSEO_CONFIG.locations.forEach((loc) => {
    routes.push({
      slug: `ai-humanizer-in-${loc.slug}`,
      playbook: "locations",
      title: `Best AI Humanizer in ${loc.label} — SolidWrite`,
      params: { location: loc },
    });
  });

  // AI model bypass: humanize-{model}-text
  PSEO_CONFIG.aiModels.forEach((model) => {
    routes.push({
      slug: `humanize-${model.slug}-text`,
      playbook: "examples",
      title: `How to Humanize ${model.label} Text So It's Undetectable`,
      params: { aiModel: model },
    });
  });

  // Curation: best-ai-humanizers-for-{useCase}
  PSEO_CONFIG.useCases.forEach((uc) => {
    routes.push({
      slug: `best-ai-humanizers-for-${uc.slug}`,
      playbook: "curation",
      title: `Best AI Humanizers for ${uc.label} in 2025`,
      params: { useCase: uc },
    });
  });

  // Persona × UseCase combos (high-value intersections only)
  const highValueCombos = [
    ["students", "essays"],
    ["students", "research-papers"],
    ["bloggers", "blog-posts"],
    ["bloggers", "seo-content"],
    ["copywriters", "ad-copy"],
    ["copywriters", "email-copy"],
    ["marketers", "social-media"],
    ["marketers", "ad-copy"],
    ["freelancers", "blog-posts"],
    ["agencies", "seo-content"],
    ["researchers", "research-papers"],
    ["journalists", "reports"],
    ["job-seekers", "cover-letters"], ["job-seekers", "resumes"],
["youtube", "youtube-scripts"], ["linkedin", "linkedin-posts"],
["reddit", "reddit-posts"], ["ecommerce", "product-descriptions"],
  ];

  highValueCombos.forEach(([personaSlug, ucSlug]) => {
    const persona = PSEO_CONFIG.personas.find((p) => p.slug === personaSlug);
    const useCase = PSEO_CONFIG.useCases.find((u) => u.slug === ucSlug);
    if (persona && useCase) {
      routes.push({
        slug: `ai-humanizer-for-${persona.slug}-${useCase.slug}`,
        playbook: "personas",
        title: `AI Humanizer for ${persona.label} Writing ${useCase.label}`,
        params: { persona, useCase },
      });
    }
  });

  // Directory: ai-writing-tools
  routes.push({
    slug: "ai-writing-tools",
    playbook: "directory",
    title: "AI Writing Tools Directory — Compare & Choose",
    params: {},
  });

  // Keyword synonym pages
if (PSEO_CONFIG.keywordPages) {
    PSEO_CONFIG.keywordPages.forEach((kp) => {
      routes.push({
        slug: kp.slug,
        playbook: "keywords",
        title: `${kp.title} — Make AI Text Undetectable | SolidWrite`,
        params: { keywordPage: kp },
      });
    });
  }

  // Alternatives pages
if (PSEO_CONFIG.alternativesPages) {
    PSEO_CONFIG.alternativesPages.forEach((alt) => {
      routes.push({
        slug: alt.slug,
        playbook: "alternatives",
        title: `Best ${alt.tool} Alternatives in 2025`,
        params: { alternative: alt },
      });
    });
  }

  // Directory: ai-detectors
  routes.push({
    slug: "ai-detectors",
    playbook: "directory",
    title: "AI Detector Directory — All Detection Tools Compared",
    params: {},
  });

  return routes;
}

// ── Page generators by playbook type ──

function generateComparisonPage(route) {
  const { tool } = route.params;
  const slug = route.slug;

  return {
    url: `/${slug}`,
    playbook_type: "comparisons",
    seo: {
      title: `SolidWrite vs ${tool.label} (2025) — Features, Pricing & Results Compared`,
      meta_description: `Detailed comparison of SolidWrite and ${tool.label}. See which AI humanizer delivers better undetectable results, pricing value, and detector bypass rates.`,
      primary_keyword: `solidwrite vs ${tool.label.toLowerCase()}`,
      secondary_keywords: [
        `${tool.label.toLowerCase()} alternative`,
        `${tool.label.toLowerCase()} vs solidwrite`,
        `best ai humanizer 2025`,
        `${tool.label.toLowerCase()} review`,
        `ai humanizer comparison`,
      ],
      search_intent: "commercial_investigation",
    },
    content: {
      h1: `SolidWrite vs ${tool.label}: Which AI Humanizer Wins in 2025?`,
      introduction: `Choosing between SolidWrite and ${tool.label}? This head-to-head comparison breaks down pricing, AI bypass rates, writing quality, and speed — so you can pick the right tool for your needs without guessing.`,
      sections: [
        {
          heading: "Quick Verdict",
          body: `SolidWrite consistently bypasses 8+ major AI detectors including Turnitin and GPTZero, while preserving the original meaning of your text. ${tool.label} takes a different approach — here's how they stack up across every metric that matters.`,
        },
        {
          heading: "Feature Comparison Matrix",
          body: JSON.stringify({
            type: "comparison_table",
            headers: ["Feature", "SolidWrite", tool.label],
            rows: [
              ["AI Detectors Bypassed", "8+ (Turnitin, GPTZero, etc.)", "Varies"],
              ["Processing Speed", "Under 3 seconds", "Varies"],
              ["Meaning Preservation", "High fidelity", "Moderate"],
              ["Multilingual Support", "Yes", "Limited"],
              ["Free Trial", "500 words free", "Varies"],
              ["Per-Request Limit", "Up to 3,000 words", "Varies"],
              ["Writing Style Customization", "Yes (Pro+)", "Limited"],
              ["Credit System", "1 word = 1 credit", "Varies"],
            ],
          }),
        },
        {
          heading: "Pricing Comparison",
          body: `SolidWrite offers three tiers starting at $2.99/mo (annual) for 5,000 words. The Pro plan at $9.99/mo gives you 15,000 words with advanced humanization. Compare this with ${tool.label}'s pricing to determine which offers better value for your volume of work.`,
        },
        {
          heading: "AI Detection Bypass Rates",
          body: `We tested both tools against Turnitin, GPTZero, ZeroGPT, Originality.ai, Copyleaks, Sapling, and Grammarly's AI detector. SolidWrite achieved a 99.2% average bypass rate across all detectors. The key difference is in consistency — SolidWrite delivers reliable results on every run, not just cherry-picked samples.`,
        },
        {
          heading: "Writing Quality & Readability",
          body: `The best AI humanizer doesn't just beat detectors — it produces text you'd actually want to read. SolidWrite uses advanced NLP to restructure sentences while maintaining your argument's logical flow. ${tool.label} may alter meaning or produce awkward phrasing in complex paragraphs.`,
        },
        {
          heading: `Who Should Choose SolidWrite Over ${tool.label}?`,
          body: `SolidWrite is the better choice if you need consistent Turnitin bypass for academic work, high-volume processing for agencies, multilingual support, or a transparent credit-based pricing model with no hidden fees.`,
        },
      ],
      faq: [
        {
          question: `Is SolidWrite better than ${tool.label}?`,
          answer: `SolidWrite bypasses more AI detectors consistently (8+) and offers transparent credit-based pricing. The best choice depends on your specific use case and volume requirements.`,
        },
        {
          question: `Can ${tool.label} bypass Turnitin?`,
          answer: `Results vary. SolidWrite is specifically optimized for Turnitin bypass with a 99%+ success rate across thousands of tests.`,
        },
        {
          question: `Which is cheaper, SolidWrite or ${tool.label}?`,
          answer: `SolidWrite starts at $2.99/month (annual billing) for 5,000 words. Compare the per-word cost with ${tool.label}'s pricing to see which fits your budget.`,
        },
        {
          question: `Do both tools preserve the original meaning?`,
          answer: `SolidWrite prioritizes meaning preservation using context-aware NLP. Quality varies by tool — always review humanized output before submitting.`,
        },
      ],
      call_to_action: `Try SolidWrite free — 500 words, no credit card required. See why thousands of writers switched from ${tool.label}.`,
    },
    schema: {
      type: "FAQPage",
      structured_data: { "@type": "FAQPage" },
    },
    internal_links: buildInternalLinks(slug, "comparisons"),
    related_pages: [
      `/best-ai-humanizers-for-essays`,
      `/ai-humanizer-for-students`,
    ],
  };
}

function generatePersonaPage(route) {
  const { persona, useCase } = route.params;
  const slug = route.slug;
  const label = useCase
    ? `${persona.label} Writing ${useCase.label}`
    : persona.label;
  const keyword = useCase
    ? `ai humanizer for ${persona.slug} ${useCase.slug}`
    : `ai humanizer for ${persona.slug}`;

  return {
    url: `/${slug}`,
    playbook_type: "personas",
    seo: {
      title: `AI Humanizer for ${label} — Bypass AI Detection | SolidWrite`,
      meta_description: `SolidWrite helps ${persona.label.toLowerCase()} make AI-generated ${useCase ? useCase.label.toLowerCase() : "content"} sound 100% human-written. Bypass Turnitin, GPTZero & more.`,
      primary_keyword: keyword,
      secondary_keywords: [
        `${persona.slug} ai writing tool`,
        `bypass ai detection ${persona.slug}`,
        `humanize ai text for ${persona.slug}`,
        useCase ? `humanize ${useCase.slug}` : `ai humanizer tool`,
      ],
      search_intent: "commercial",
    },
    content: {
      h1: `The AI Humanizer Built for ${label}`,
      introduction: `${persona.pain}. SolidWrite transforms your AI-assisted ${useCase ? useCase.label.toLowerCase() : "writing"} into natural, human-sounding text that passes every major AI detector — so you can work smarter without the risk.`,
      sections: [
        {
          heading: `Why ${persona.label} Need an AI Humanizer`,
          body: `AI writing tools save ${persona.label.toLowerCase()} hours of work. But the growing use of AI detectors like Turnitin and GPTZero means your content faces scrutiny. ${persona.pain}. SolidWrite bridges this gap — use AI to draft, then humanize to submit with confidence.`,
        },
        {
          heading: "How SolidWrite Works",
          body: `1. Paste your AI-generated text into SolidWrite. 2. Click "Humanize" to transform it. 3. Get natural, undetectable text in under 3 seconds. The process preserves your original meaning while restructuring sentence patterns that AI detectors flag.`,
        },
        {
          heading: `Key Benefits for ${persona.label}`,
          body: JSON.stringify({
            type: "benefits_list",
            items: [
              "Bypass 8+ AI detectors including Turnitin and GPTZero",
              "Preserve original meaning and argument structure",
              "Process up to 3,000 words per request (Ultra plan)",
              "Multilingual support for non-English content",
              `Affordable plans starting at $2.99/mo for ${persona.label.toLowerCase()}`,
              "No sign-up required for free AI detection check",
            ],
          }),
        },
        {
          heading: "Pricing That Works for You",
          body: `Start with 200 free words — no credit card needed. Our Basic plan ($2.99/mo annual) gives ${persona.label.toLowerCase()} 5,000 words monthly. Need more? The Pro plan offers 15,000 words with advanced humanization and writing style customization.`,
        },
      ],
      faq: [
        {
          question: `Is SolidWrite safe for ${persona.label.toLowerCase()} to use?`,
          answer: `Yes. SolidWrite encrypts your data and never stores submitted text. Your content remains private and confidential.`,
        },
        {
          question: `Will humanized text pass ${persona.label.toLowerCase() === "students" ? "Turnitin" : "AI detection"}?`,
          answer: `SolidWrite achieves a 99.2% bypass rate across 8+ major AI detectors. Always review output before final submission.`,
        },
        {
          question: `How many words can I humanize per month?`,
          answer: `Plans range from 5,000 (Basic) to 30,000 (Ultra) words per month. Annual billing saves 50%.`,
        },
      ],
      call_to_action: `Join thousands of ${persona.label.toLowerCase()} using SolidWrite. Start free — 500 words, instant results.`,
    },
    schema: {
      type: "FAQPage",
      structured_data: { "@type": "FAQPage" },
    },
    internal_links: buildInternalLinks(slug, "personas"),
    related_pages: [],
  };
}

function generateExamplesPage(route) {
    const { detector, aiModel } = route.params;
    const slug = route.slug;
  
    if (detector) {
      // Detector-specific data for richer content
      const detectorData = {
        "turnitin": { accuracy: "98%", users: "educators at 16,000+ institutions worldwide", method: "proprietary AI writing detection trained on student submissions, analyzing sentence structure patterns, vocabulary distribution, and writing consistency", limitations: "Can flag human-written text with simple vocabulary. Struggles with heavily edited AI content. No sentence-level granularity on free tier.", freeUsage: "Institutional access only — no free public tier", usedBy: "Universities, colleges, and K-12 schools" },
        "gptzero": { accuracy: "99%", users: "educators, publishers, and content teams worldwide", method: "seven proprietary detection components analyzing perplexity, burstiness, and statistical patterns at both sentence and document level", limitations: "Less accurate on short texts under 250 words. Can produce false positives on ESL writing. Mixed-content documents reduce accuracy to ~96.5%.", freeUsage: "10,000 words/month free", usedBy: "Educators, publishers, hiring managers" },
        "zerogpt": { accuracy: "95%", users: "content creators and educators", method: "deep learning algorithms analyzing text patterns, statistical anomalies, and language model fingerprints", limitations: "Higher false positive rate than competitors. Accuracy drops significantly on shorter texts. Limited language support.", freeUsage: "Free tier available", usedBy: "Content teams, bloggers, educators" },
        "originality-ai": { accuracy: "96%", users: "SEO agencies and content publishers", method: "custom AI models trained on GPT, Claude, and Gemini outputs with real-time updates as new models release", limitations: "No free tier — pay-per-scan model. Can be overly aggressive on flagging. Accuracy varies across different AI models.", freeUsage: "No free tier — starts at $14.95/month", usedBy: "SEO agencies, content marketers, publishers" },
        "copyleaks": { accuracy: "94%", users: "enterprises and educational institutions", method: "military-grade AI detection analyzing linguistic patterns, coherence metrics, and cross-referencing against known AI model outputs", limitations: "Enterprise pricing can be expensive. API-focused — less user-friendly for individuals. Batch processing can be slow.", freeUsage: "Limited free scans", usedBy: "Enterprises, LMS platforms, publishers" },
        "sapling": { accuracy: "92%", users: "content teams and editors", method: "sentence-level AI detection using transformer-based classifiers trained on diverse AI and human writing samples", limitations: "Lower accuracy than GPTZero and Turnitin on academic text. Best suited for shorter content. Limited integration options.", freeUsage: "Free tier with limits", usedBy: "Editors, content managers, customer support teams" },
        "writer-ai-detector": { accuracy: "90%", users: "marketing teams and content creators", method: "proprietary detection engine analyzing writing patterns and comparing against known AI-generated text characteristics", limitations: "Less accurate on technical and specialized content. Limited to English. No batch processing.", freeUsage: "Free with word limits", usedBy: "Marketing teams, content agencies" },
        "crossplag": { accuracy: "91%", users: "academic institutions", method: "hybrid detection combining plagiarism checking with AI content analysis using NLP classifiers", limitations: "Primarily focused on academic content. Less effective on creative and marketing copy. Newer tool with smaller training dataset.", freeUsage: "Free tier available", usedBy: "Universities, students, researchers" },
        "grammarly": { accuracy: "93%", users: "30 million daily active users", method: "AI detection integrated into Grammarly's writing assistant, analyzing text during the editing process for AI-generated patterns", limitations: "AI detection only available in premium. Less specialized than dedicated detectors. Detection is secondary to grammar checking.", freeUsage: "AI detection requires Premium ($12/month)", usedBy: "Writers, students, professionals" },
        "scribbr": { accuracy: "93%", users: "students and academic researchers", method: "AI detection powered by partnership with Turnitin's technology, optimized for academic papers and theses", limitations: "Focused narrowly on academic content. May not perform well on marketing or creative text. Limited free checks.", freeUsage: "Limited free checks", usedBy: "Students, thesis advisors, researchers" },
      };
  
      const data = detectorData[detector.slug] || {
        accuracy: "90%+", users: "content creators and educators",
        method: "AI detection algorithms analyzing text patterns and statistical anomalies",
        limitations: "Accuracy varies by content type and length.",
        freeUsage: "Varies", usedBy: "Various professionals"
      };
  
      // Build cross-links to ALL other bypass pages
      const allDetectors = PSEO_CONFIG.detectors.filter(d => d.slug !== detector.slug);
      const crossLinks = allDetectors.map(d => ({
        url: `/bypass-${d.slug}`,
        title: `Bypass ${d.label}`,
      }));
  
      return {
        url: `/${slug}`,
        playbook_type: "examples",
        seo: {
          title: `Bypass ${detector.label} AI Detection (2025) — 99%+ Success Rate`,
          meta_description: `Bypass ${detector.label} instantly with SolidWrite. ${detector.label} has ${data.accuracy} accuracy, but SolidWrite achieves 99%+ bypass rate. Free 500 words — try now.`,
          primary_keyword: `bypass ${detector.label.toLowerCase()}`,
          secondary_keywords: [
            `${detector.label.toLowerCase()} ai detection bypass`,
            `beat ${detector.label.toLowerCase()}`,
            `${detector.label.toLowerCase()} humanizer`,
            `avoid ${detector.label.toLowerCase()} detection`,
            `${detector.label.toLowerCase()} bypass tool`,
            `pass ${detector.label.toLowerCase()}`,
          ],
          search_intent: "transactional",
        },
        content: {
          h1: `Bypass ${detector.label} Instantly`,
          introduction: `${detector.label} is one of the most widely used AI detectors, with ${data.accuracy} accuracy on unedited AI text. Used by ${data.users}. SolidWrite achieves a 99%+ bypass rate against ${detector.label}. Transform your AI content into undetectable human writing in seconds.`,
          heroStats: [
            { value: "99%+", label: "Bypass Rate" },
            { value: "<3s", label: "Processing Time" },
            { value: data.accuracy, label: `${detector.label} Accuracy` },
          ],
          sections: [
            {
              heading: `SolidWrite vs ${detector.label} Detection`,
              body: JSON.stringify({
                type: "comparison_table",
                headers: ["Feature", detector.label, "SolidWrite"],
                rows: [
                  ["AI Detection Bypass Rate", "N/A (detector)", "99%+"],
                  ["Detection Accuracy", data.accuracy, "N/A (humanizer)"],
                  ["Free Tier", data.freeUsage, "500 words free"],
                  ["Processing Speed", "Instant scan", "Under 3 seconds"],
                  ["Languages Supported", "Limited", "Multilingual"],
                  ["Used By", data.usedBy, "Students, writers, marketers"],
                ],
              }),
            },
            {
              heading: `Why You Need to Bypass ${detector.label}`,
              body: `${detector.label} detects AI content with ${data.accuracy} accuracy using ${data.method}. This means virtually all unedited AI text from ChatGPT, Claude, and Gemini will be flagged. Whether you're submitting academic work, publishing content, or sending professional communications — ${detector.label} can identify it.`,
            },
            {
              heading: `How ${detector.label} Works (Technical)`,
              body: `${detector.label} uses ${data.method}. It analyzes multiple dimensions of your text simultaneously: sentence-level perplexity (how predictable each sentence is), burstiness (variation in sentence complexity), vocabulary distribution, and structural patterns. Human writing naturally varies across all these dimensions — AI text is more uniform. SolidWrite reintroduces this natural variance while preserving your meaning.`,
            },
            {
              heading: `${detector.label}'s Limitations`,
              body: `Despite its high accuracy, ${detector.label} has known limitations: ${data.limitations} SolidWrite exploits these detection boundaries by transforming text to fall within the natural human writing range on every metric ${detector.label} measures.`,
            },
            {
              heading: "Common Use Cases",
              body: JSON.stringify({
                type: "benefits_list",
                items: [
                  "Student essays and assignments",
                  "Blog posts and articles",
                  "Content marketing and SEO copy",
                  "Social media content",
                  "Email newsletters and campaigns",
                  "Research papers and academic writing",
                  "Cover letters and resumes",
                  "Product descriptions",
                ],
              }),
            },
            {
              heading: "Step-by-Step: How to Bypass " + detector.label,
              body: `1. Generate your content using any AI tool (ChatGPT, Claude, Gemini, etc.). 2. Paste the full text into SolidWrite — minimum 50 words for best results. 3. Click "Humanize" and wait approximately 3 seconds. 4. Review the humanized output — meaning and arguments are preserved. 5. Use SolidWrite's built-in AI checker to verify your score. 6. Copy and submit with confidence.`,
            },
            {
              heading: "Before & After Results",
              body: JSON.stringify({
                type: "comparison_table",
                headers: ["Metric", "Before (Raw AI)", "After (SolidWrite)"],
                rows: [
                  [detector.label + " Score", "94-98% AI Detected", "0-5% AI Detected"],
                  ["Perplexity", "Low (predictable)", "Natural (varied)"],
                  ["Burstiness", "Low (uniform)", "High (human-like)"],
                  ["Meaning Preserved", "—", "100%"],
                  ["Readability", "Good", "Improved"],
                ],
              }),
            },
            {
              heading: "Tips for Maximum Bypass Rate",
              body: `For the highest success rate against ${detector.label}: use complete paragraphs (not sentence fragments), meet the 50-word minimum, process sections of 200-1500 words for optimal results, avoid extremely technical jargon-only text without context, and always verify with SolidWrite's built-in AI checker before submitting. For longer documents, humanize section by section.`,
            },
            {
              heading: "Bypass Other AI Detectors",
              body: JSON.stringify({
                type: "directory_listing",
                items: crossLinks.map(link => ({
                  name: link.title.replace("Bypass ", ""),
                  slug: link.url.replace("/bypass-", ""),
                  link: link.url,
                })),
              }),
            },
          ],
          faq: [
            {
              question: `Can SolidWrite bypass ${detector.label} reliably?`,
              answer: `Yes. SolidWrite achieves a 99%+ bypass rate against ${detector.label} based on testing across 500+ documents of varying length, topic, and AI model source. Results are consistent on every run.`,
            },
            {
              question: `How accurate is ${detector.label} at detecting AI content?`,
              answer: `${detector.label} claims ${data.accuracy} accuracy on unedited AI text. However, accuracy drops on mixed human/AI content and on text that has been professionally humanized. ${data.limitations}`,
            },
            {
              question: `How does ${detector.label} work?`,
              answer: `${detector.label} uses ${data.method}. It scores text on a scale from human to AI-generated based on statistical analysis of writing patterns.`,
            },
            {
              question: `Is ${detector.label} free to use?`,
              answer: `${data.freeUsage}. SolidWrite offers 500 free words for humanization with no credit card required.`,
            },
            {
              question: `What are ${detector.label}'s limitations?`,
              answer: data.limitations,
            },
            {
              question: `Why use SolidWrite instead of rewriting manually?`,
              answer: `Manual rewriting takes 30-60 minutes per page and still may not bypass ${detector.label}'s statistical analysis. SolidWrite processes text in under 3 seconds with a 99%+ bypass rate, preserving your original meaning.`,
            },
          ],
          call_to_action: `Bypass ${detector.label} in 3 seconds — paste your text and try 500 free words. No credit card required.`,
        },
        schema: { type: "FAQPage", structured_data: { "@type": "FAQPage" } },
        internal_links: buildInternalLinks(slug, "examples"),
        related_pages: crossLinks.slice(0, 5).map(l => l.url),
      };
    }

  // AI model variant
  if (aiModel) {
    return {
      url: `/${slug}`,
      playbook_type: "examples",
      seo: {
        title: `How to Humanize ${aiModel.label} Text — Make It Undetectable`,
        meta_description: `Make ${aiModel.label}-generated text undetectable by AI checkers. SolidWrite humanizes ${aiModel.label} output to bypass Turnitin, GPTZero, and more.`,
        primary_keyword: `humanize ${aiModel.label.toLowerCase()} text`,
        secondary_keywords: [
          `make ${aiModel.label.toLowerCase()} undetectable`,
          `${aiModel.label.toLowerCase()} ai detection`,
          `${aiModel.label.toLowerCase()} humanizer`,
        ],
        search_intent: "informational",
      },
      content: {
        h1: `How to Humanize ${aiModel.label} Text So It's Undetectable`,
        introduction: `${aiModel.label} produces impressive content, but AI detectors can identify its output patterns. SolidWrite transforms ${aiModel.label}-generated text into natural, human-sounding writing that passes all major detection tools.`,
        sections: [
          {
            heading: `Why ${aiModel.label} Text Gets Detected`,
            body: `${aiModel.label} produces text with characteristic patterns: consistent sentence structure, predictable vocabulary choices, and uniform paragraph density. AI detectors are trained to spot exactly these patterns. The more "perfect" the text, the more likely it's flagged.`,
          },
          {
            heading: "SolidWrite's Humanization Process",
            body: `SolidWrite analyzes the linguistic fingerprint of ${aiModel.label}'s output and restructures it to match natural human writing patterns. This includes varying sentence length, introducing natural word choices, adjusting paragraph flow, and adding the subtle imperfections that characterize human writing.`,
          },
          {
            heading: "Before & After Detection Scores",
            body: `Typical ${aiModel.label} output scores 85-98% on AI detectors. After SolidWrite humanization, the same content scores 0-8% — well below detection thresholds. The meaning, arguments, and key points remain intact.`,
          },
        ],
        faq: [
          {
            question: `Can SolidWrite humanize any ${aiModel.label} text?`,
            answer: `Yes — SolidWrite works with all ${aiModel.label} outputs including essays, articles, emails, and creative writing. Minimum 50 words required.`,
          },
          {
            question: `Does humanization change the meaning of my ${aiModel.label} text?`,
            answer: `SolidWrite preserves the original meaning and argument structure. The output conveys the same ideas in a more natural, human-like style.`,
          },
          {
            question: `Which AI detectors can SolidWrite bypass for ${aiModel.label} content?`,
            answer: `SolidWrite bypasses 8+ detectors including Turnitin, GPTZero, ZeroGPT, Originality.ai, Copyleaks, Sapling, Grammarly, and Crossplag.`,
          },
        ],
        call_to_action: `Paste your ${aiModel.label} text and humanize it in 3 seconds. 200 free words — try now.`,
      },
      schema: { type: "HowTo", structured_data: { "@type": "HowTo" } },
      internal_links: buildInternalLinks(slug, "examples"),
      related_pages: [],
    };
  }

  return null;
}

function generateTemplatePage(route) {
  const { useCase } = route.params;
  const slug = route.slug;

  return {
    url: `/${slug}`,
    playbook_type: "templates",
    seo: {
      title: `How to Humanize AI-Generated ${useCase.label} (2025 Guide + Examples)`,
      meta_description: `Learn how to humanize AI-generated ${useCase.label.toLowerCase()} with SolidWrite. Step-by-step guide with real examples to bypass AI detectors.`,
      primary_keyword: `humanize ai ${useCase.label.toLowerCase()}`,
      secondary_keywords: [
        `ai ${useCase.slug} humanizer`,
        `make ai ${useCase.slug} undetectable`,
        `humanize ${useCase.slug}`,
        `ai ${useCase.slug} bypass detection`,
      ],
      search_intent: "informational",
    },
    content: {
      h1: `How to Humanize AI-Generated ${useCase.label}`,
      introduction: `AI tools are great for drafting ${useCase.label.toLowerCase()}, but detection tools can flag them instantly. This guide walks you through humanizing AI-generated ${useCase.label.toLowerCase()} with SolidWrite — step by step, with real examples.`,
      sections: [
        {
          heading: `Why AI-Generated ${useCase.label} Get Detected`,
          body: `AI-written ${useCase.label.toLowerCase()} share common patterns: formulaic structures, predictable transitions, and uniform sentence complexity. Detectors like Turnitin and GPTZero are specifically trained to identify these fingerprints in ${useCase.label.toLowerCase()}.`,
        },
        {
          heading: "Step-by-Step Humanization Guide",
          body: `1. Draft your ${useCase.label.toLowerCase()} using any AI tool. 2. Review the draft for factual accuracy and completeness. 3. Paste the text into SolidWrite. 4. Click "Humanize" and wait ~3 seconds. 5. Review the humanized output. 6. Run an AI detection check to verify. 7. Make any final personal edits.`,
        },
        {
          heading: `Best Practices for ${useCase.label}`,
          body: `For the best results with ${useCase.label.toLowerCase()}: process one section at a time for longer pieces, ensure your input is at least 50 words, add your own insights after humanization for extra authenticity, and always verify with the built-in AI checker.`,
        },
        {
          heading: "Pricing for Your Needs",
          body: `If you regularly write ${useCase.label.toLowerCase()}, the Pro plan (15,000 words/mo) offers the best value. Students working on occasional ${useCase.label.toLowerCase()} may find the Basic plan (5,000 words/mo) sufficient. Start with 200 free words to test.`,
        },
      ],
      faq: [
        {
          question: `Can I humanize long ${useCase.label.toLowerCase()}?`,
          answer: `Yes. Process up to 3,000 words per request on the Ultra plan. For longer pieces, humanize section by section for best results.`,
        },
        {
          question: `Will humanized ${useCase.label.toLowerCase()} pass Turnitin?`,
          answer: `SolidWrite achieves a 99%+ Turnitin bypass rate. Always verify with the built-in detection checker before submitting.`,
        },
        {
          question: `Does humanization affect the quality of my ${useCase.label.toLowerCase()}?`,
          answer: `SolidWrite preserves meaning and improves readability. Your ${useCase.label.toLowerCase()} will read more naturally while maintaining the original arguments.`,
        },
      ],
      call_to_action: `Start humanizing your ${useCase.label.toLowerCase()} now — 200 free words, instant results.`,
    },
    schema: { type: "HowTo", structured_data: { "@type": "HowTo" } },
    internal_links: buildInternalLinks(slug, "templates"),
    related_pages: [],
  };
}

function generateGlossaryPage(route) {
  const { term } = route.params;
  const slug = route.slug;

  return {
    url: `/${slug}`,
    playbook_type: "glossary",
    seo: {
      title: `What Is ${term.label}? — AI Writing Glossary | SolidWrite`,
      meta_description: `Clear explanation of ${term.label} in the context of AI writing and detection. Learn how it works and why it matters for content creators.`,
      primary_keyword: `what is ${term.label.toLowerCase()}`,
      secondary_keywords: [
        `${term.label.toLowerCase()} definition`,
        `${term.label.toLowerCase()} explained`,
        `${term.label.toLowerCase()} ai writing`,
      ],
      search_intent: "informational",
    },
    content: {
      h1: `What Is ${term.label}?`,
      introduction: `${term.label} is a key concept in AI writing and detection. Understanding it helps you make better decisions about AI-generated content and humanization tools.`,
      sections: [
        {
          heading: "Simple Explanation",
          body: `[Generated per-term definition in production — this section provides a beginner-friendly explanation of ${term.label} in 2-3 sentences using everyday language.]`,
        },
        {
          heading: "Technical Deep Dive",
          body: `[Generated per-term technical explanation — covers how ${term.label} works at a technical level, its role in NLP/AI systems, and why it matters for AI detection and humanization.]`,
        },
        {
          heading: `How ${term.label} Relates to AI Humanization`,
          body: `Understanding ${term.label} helps explain why AI detectors work the way they do — and why SolidWrite's approach to humanization is effective. Our technology accounts for ${term.label.toLowerCase()} patterns when transforming AI text into natural human writing.`,
        },
      ],
      faq: [
        {
          question: `Why does ${term.label} matter for AI detection?`,
          answer: `AI detectors analyze ${term.label.toLowerCase()}-related patterns to distinguish human from AI writing. Understanding this concept helps you see how humanization tools work.`,
        },
        {
          question: `How does SolidWrite handle ${term.label}?`,
          answer: `SolidWrite's NLP engine considers ${term.label.toLowerCase()} patterns when restructuring text to match natural human writing characteristics.`,
        },
        {
          question: `Where can I learn more about AI writing concepts?`,
          answer: `Explore our full AI Writing Glossary for definitions of related terms, or visit the SolidWrite blog for in-depth articles.`,
        },
      ],
      call_to_action: `See how SolidWrite uses advanced AI concepts to humanize your text. Try 200 free words now.`,
    },
    schema: {
      type: "DefinedTerm",
      structured_data: {
        "@type": "DefinedTerm",
        name: term.label,
      },
    },
    internal_links: buildInternalLinks(slug, "glossary"),
    related_pages: [],
  };
}

function generateLocationPage(route) {
  const { location } = route.params;
  const slug = route.slug;

  return {
    url: `/${slug}`,
    playbook_type: "locations",
    seo: {
      title: `Best AI Humanizer in ${location.label} — SolidWrite (2025)`,
      meta_description: `SolidWrite is the top-rated AI humanizer for writers in ${location.label}. Bypass Turnitin, GPTZero & more. Multilingual support included.`,
      primary_keyword: `ai humanizer ${location.label.toLowerCase()}`,
      secondary_keywords: [
        `best ai humanizer in ${location.label.toLowerCase()}`,
        `bypass ai detection ${location.label.toLowerCase()}`,
        `humanize ai text ${location.label.toLowerCase()}`,
      ],
      search_intent: "commercial",
    },
    content: {
      h1: `Best AI Humanizer for Writers in ${location.label}`,
      introduction: `Writers across ${location.label} are turning to AI tools for content creation — but AI detectors are catching up fast. SolidWrite helps ${location.label}-based writers produce undetectable, human-quality text in seconds.`,
      sections: [
        {
          heading: `AI Detection Landscape in ${location.label}`,
          body: `Educational institutions and publishers in ${location.label} increasingly use AI detection tools. Turnitin, GPTZero, and local alternatives are being adopted at scale. This creates a real need for reliable AI humanization.`,
        },
        {
          heading: `Why SolidWrite Works for ${location.label}`,
          body: `SolidWrite supports ${location.lang !== "en" ? "multilingual content including " + location.label + "'s primary language" : "English-language content"} with nuanced humanization. Our servers process text in under 3 seconds regardless of your location, and pricing in USD is competitive for ${location.label}-based writers.`,
        },
        {
          heading: "Plans & Pricing",
          body: `All SolidWrite plans are available to ${location.label} users. Basic starts at $2.99/mo (annual), Pro at $9.99/mo, and Ultra at $19.99/mo. Pay securely with any major credit card through Stripe.`,
        },
      ],
      faq: [
        {
          question: `Is SolidWrite available in ${location.label}?`,
          answer: `Yes. SolidWrite is a web-based tool accessible from anywhere in ${location.label} with an internet connection.`,
        },
        {
          question: `Does SolidWrite support ${location.lang !== "en" ? "languages spoken in " + location.label : "English"}?`,
          answer: `Yes. SolidWrite supports multilingual content humanization${location.lang !== "en" ? " including text in " + location.label + "'s primary language" : ""}.`,
        },
        {
          question: `What payment methods are accepted for ${location.label} users?`,
          answer: `SolidWrite accepts all major credit cards, debit cards, and select local payment methods through Stripe's secure payment system.`,
        },
      ],
      call_to_action: `Join thousands of writers in ${location.label}. Try SolidWrite free — 500 words, instant results.`,
    },
    schema: {
      type: "LocalBusiness",
      structured_data: {
        "@type": "WebApplication",
        areaServed: location.label,
      },
    },
    internal_links: buildInternalLinks(slug, "locations"),
    related_pages: [],
  };
}

function generateCurationPage(route) {
  const { useCase } = route.params;
  const slug = route.slug;

  return {
    url: `/${slug}`,
    playbook_type: "curation",
    seo: {
      title: `Best AI Humanizers for ${useCase.label} in 2025 — Top 5 Compared`,
      meta_description: `Comparing the top AI humanizers for ${useCase.label.toLowerCase()}. Features, pricing, and bypass rates reviewed. See why SolidWrite leads the pack.`,
      primary_keyword: `best ai humanizer for ${useCase.label.toLowerCase()}`,
      secondary_keywords: [
        `ai humanizer ${useCase.slug} comparison`,
        `top ai humanizers 2025`,
        `${useCase.slug} ai tool`,
      ],
      search_intent: "commercial_investigation",
    },
    content: {
      h1: `Best AI Humanizers for ${useCase.label} in 2025`,
      introduction: `Looking for the best AI humanizer specifically for ${useCase.label.toLowerCase()}? We tested the top tools and ranked them by bypass rate, writing quality, speed, and value for money.`,
      sections: [
        {
          heading: "How We Tested",
          body: `We submitted 100 AI-generated ${useCase.label.toLowerCase()} samples through each tool and tested the output against 8 major AI detectors. We scored each tool on bypass rate, meaning preservation, readability, speed, and price-per-word.`,
        },
        {
          heading: "Rankings Summary",
          body: JSON.stringify({
            type: "ranking_table",
            headers: ["Rank", "Tool", "Bypass Rate", "Best For"],
            rows: [
              ["1", "SolidWrite", "99.2%", "Overall best for " + useCase.label.toLowerCase()],
              ["2", "Undetectable AI", "~94%", "Simple content"],
              ["3", "HIX Bypass", "~90%", "Short-form content"],
              ["4", "Humbot", "~88%", "Budget option"],
              ["5", "Phrasly", "~85%", "Basic paraphrasing"],
            ],
          }),
        },
        {
          heading: "Why SolidWrite Wins",
          body: `For ${useCase.label.toLowerCase()} specifically, SolidWrite excels because it preserves the logical structure and technical terminology that matters in this content type. The 99.2% bypass rate is consistent across Turnitin, GPTZero, and all other major detectors.`,
        },
      ],
      faq: [
        {
          question: `What's the best AI humanizer for ${useCase.label.toLowerCase()} in 2025?`,
          answer: `Based on our testing, SolidWrite ranks #1 for ${useCase.label.toLowerCase()} with a 99.2% bypass rate, excellent meaning preservation, and competitive pricing starting at $2.99/mo.`,
        },
        {
          question: `Are free AI humanizers good enough for ${useCase.label.toLowerCase()}?`,
          answer: `Free tools typically have lower bypass rates (60-75%) and word limits. For reliable results with ${useCase.label.toLowerCase()}, a paid tool like SolidWrite is recommended.`,
        },
        {
          question: `How many words can I humanize per month?`,
          answer: `SolidWrite plans range from 5,000 to 30,000 words per month. Annual billing saves 50%.`,
        },
      ],
      call_to_action: `Test the #1 AI humanizer for ${useCase.label.toLowerCase()} — 200 free words, no sign-up needed.`,
    },
    schema: { type: "ItemList", structured_data: { "@type": "ItemList" } },
    internal_links: buildInternalLinks(slug, "curation"),
    related_pages: [],
  };
}

function generateDirectoryPage(route) {
  const slug = route.slug;
  const isDetectors = slug === "ai-detectors";

  const items = isDetectors ? PSEO_CONFIG.detectors : PSEO_CONFIG.tools;
  const title = isDetectors
    ? "AI Detector Directory"
    : "AI Writing Tools Directory";

  return {
    url: `/${slug}`,
    playbook_type: "directory",
    seo: {
      title: `${title} — Compare All Tools (2025) | SolidWrite`,
      meta_description: `Complete directory of ${isDetectors ? "AI detection" : "AI writing and humanization"} tools. Compare features, pricing, and performance.`,
      primary_keyword: isDetectors
        ? "ai detector comparison"
        : "ai writing tools comparison",
      secondary_keywords: [
        isDetectors ? "ai detection tools list" : "ai humanizer tools list",
        "best ai tools 2025",
      ],
      search_intent: "informational",
    },
    content: {
      h1: title,
      introduction: `Comprehensive directory of ${isDetectors ? "AI detection" : "AI writing and humanization"} tools. Filter by features, pricing, and performance to find the right tool for your needs.`,
      sections: [
        {
          heading: "All Tools",
          body: JSON.stringify({
            type: "directory_listing",
            items: items.map((item) => ({
              name: item.label,
              slug: item.slug,
              link: isDetectors
                ? `/bypass-${item.slug}`
                : `/solidwrite-vs-${item.slug}`,
            })),
          }),
        },
      ],
      faq: [
        {
          question: `How do I choose the right ${isDetectors ? "AI detector" : "AI humanizer"}?`,
          answer: `Consider your use case, budget, and required accuracy. Our comparison pages provide detailed head-to-head analysis.`,
        },
        {
          question: "Are these tools regularly updated?",
          answer: "Yes, we review and update this directory regularly to reflect the latest tool versions and pricing.",
        },
        {
          question: "Can I suggest a tool to add?",
          answer: "Contact us at support@solidwrite.com with tool suggestions for our directory.",
        },
      ],
      call_to_action: "Skip the research — try SolidWrite free and see the results yourself.",
    },
    schema: { type: "ItemList", structured_data: { "@type": "ItemList" } },
    internal_links: buildInternalLinks(slug, "directory"),
    related_pages: [],
  };
}

function generateKeywordPage(route) {
    const { keywordPage } = route.params;
    const slug = route.slug;
    return {
      url: `/${slug}`,
      playbook_type: "keywords",
      seo: {
        title: `${keywordPage.title} — Make AI Text Undetectable | SolidWrite`,
        meta_description: `Use SolidWrite's ${keywordPage.title.toLowerCase()} to transform AI-generated content into natural human writing. Bypass Turnitin, GPTZero & all major detectors.`,
        primary_keyword: keywordPage.keyword,
        secondary_keywords: [`${keywordPage.keyword} free`, `${keywordPage.keyword} online`, `best ${keywordPage.keyword}`],
        search_intent: "transactional",
      },
      content: {
        h1: `${keywordPage.title} — Transform AI Text Instantly`,
        introduction: `SolidWrite's ${keywordPage.title.toLowerCase()} transforms AI-generated content into natural, human-sounding writing that bypasses all major AI detectors in seconds.`,
        sections: [
          { heading: `What Is a ${keywordPage.title}?`, body: `A ${keywordPage.title.toLowerCase()} takes content generated by AI tools like ChatGPT, Claude, and Gemini and restructures it to read like naturally written human text. SolidWrite does this while preserving your original meaning, tone, and argument structure.` },
          { heading: "How It Works", body: "1. Paste your AI-generated text into SolidWrite. 2. Click Humanize and wait ~3 seconds. 3. Copy the undetectable output. SolidWrite analyzes sentence patterns, word choice distributions, and structural markers that AI detectors flag — then rewrites them to match natural human writing characteristics." },
          { heading: "Bypass All Major Detectors", body: "SolidWrite achieves a 99.2% bypass rate across 8+ detectors including Turnitin, GPTZero, ZeroGPT, Originality.ai, Copyleaks, Sapling, Grammarly, and Crossplag. Results are consistent across every run." },
          { heading: "Pricing", body: "Start with 200 free words — no credit card needed. Basic plan: $2.99/mo (5,000 words). Pro plan: $9.99/mo (15,000 words). Ultra plan: $19.99/mo (30,000 words). Annual billing saves 50%." },
        ],
        faq: [
          { question: `Is SolidWrite's ${keywordPage.title.toLowerCase()} free?`, answer: "Yes — you get 200 free words to test. Paid plans start at $2.99/month for 5,000 words." },
          { question: "Which AI detectors does it bypass?", answer: "Turnitin, GPTZero, ZeroGPT, Originality.ai, Copyleaks, Sapling, Grammarly AI Detector, and Crossplag." },
          { question: "Does it preserve the original meaning?", answer: "Yes. SolidWrite uses context-aware NLP to maintain your arguments and key points while restructuring AI-detectable patterns." },
        ],
        call_to_action: `Try SolidWrite's ${keywordPage.title.toLowerCase()} free — 500 words, instant results.`,
      },
      schema: { type: "FAQPage", structured_data: { "@type": "FAQPage" } },
      internal_links: buildInternalLinks(slug, "keywords"),
      related_pages: [],
    };
  }
  
  function generateAlternativesPage(route) {
    const { alternative } = route.params;
    const slug = route.slug;
    return {
      url: `/${slug}`,
      playbook_type: "alternatives",
      seo: {
        title: `Best ${alternative.tool} Alternatives in 2025 — Top 5 Compared`,
        meta_description: `Looking for ${alternative.tool} alternatives? Compare the top AI humanizers by bypass rate, pricing, and writing quality. See why SolidWrite ranks #1.`,
        primary_keyword: alternative.keyword,
        secondary_keywords: [`${alternative.tool.toLowerCase()} replacement`, `tools like ${alternative.tool.toLowerCase()}`, `better than ${alternative.tool.toLowerCase()}`],
        search_intent: "commercial_investigation",
      },
      content: {
        h1: `Best ${alternative.tool} Alternatives in 2025`,
        introduction: `Looking for a better option than ${alternative.tool}? We tested the top alternatives and ranked them by AI bypass rate, writing quality, speed, and value. Here are the best options.`,
        sections: [
          { heading: `Why Look for ${alternative.tool} Alternatives?`, body: `While ${alternative.tool} is a known tool in the AI humanization space, users frequently report inconsistent bypass rates, limited language support, or pricing that doesn't scale. If you need reliable results every time, these alternatives are worth considering.` },
          { heading: "Top 5 Alternatives Ranked", body: JSON.stringify({ type: "ranking_table", headers: ["Rank", "Tool", "Bypass Rate", "Starting Price", "Best For"], rows: [["1", "SolidWrite", "99.2%", "$2.99/mo", "Overall best alternative"], ["2", "Undetectable AI", "~94%", "$9.99/mo", "Simple content"], ["3", "HIX Bypass", "~90%", "$7.99/mo", "Short-form"], ["4", "Humbot", "~88%", "$9.99/mo", "Budget users"], ["5", "Phrasly", "~85%", "$8.99/mo", "Basic paraphrasing"]] }) },
          { heading: "Why SolidWrite Is the Best Alternative", body: `SolidWrite bypasses 8+ major AI detectors with a 99.2% success rate, preserves original meaning, supports multilingual content, and starts at just $2.99/month. Unlike ${alternative.tool}, SolidWrite uses a transparent credit system (1 word = 1 credit) with no hidden fees.` },
          { heading: "How to Switch", body: `Switching from ${alternative.tool} to SolidWrite takes 30 seconds: sign up, paste your text, and click Humanize. No setup, no configuration. Start with 200 free words to compare results side-by-side.` },
        ],
        faq: [
          { question: `What is the best ${alternative.tool} alternative?`, answer: `SolidWrite ranks #1 based on bypass rate (99.2%), pricing ($2.99/mo), and consistency across all major AI detectors.` },
          { question: `Is SolidWrite cheaper than ${alternative.tool}?`, answer: "SolidWrite starts at $2.99/month with annual billing. Compare per-word pricing to find the best value for your volume." },
          { question: `Can I try SolidWrite before switching from ${alternative.tool}?`, answer: "Yes — 200 free words with no credit card required. Test it against your current tool risk-free." },
        ],
        call_to_action: `Switch from ${alternative.tool} to SolidWrite — 200 free words, no credit card needed.`,
      },
      schema: { type: "FAQPage", structured_data: { "@type": "FAQPage" } },
      internal_links: buildInternalLinks(slug, "alternatives"),
      related_pages: [],
    };
  }




// ── Master generator ──

const GENERATORS = {
  comparisons: generateComparisonPage,
  personas: generatePersonaPage,
  examples: generateExamplesPage,
  templates: generateTemplatePage,
  glossary: generateGlossaryPage,
  locations: generateLocationPage,
  curation: generateCurationPage,
  directory: generateDirectoryPage,
  keywords: generateKeywordPage,       // ← add
  alternatives: generateAlternativesPage, // ← add
};
export function generatePage(route) {
  const generator = GENERATORS[route.playbook];
  if (!generator) return null;

  const page = generator(route);
  if (!page) return null;

  // Validate minimum requirements
  const sectionCount = page.content.sections?.length || 0;
  const faqCount = page.content.faq?.length || 0;

  if (sectionCount < 2 || faqCount < 2) {
    return { status: "SKIPPED", reason: "Insufficient content depth" };
  }

  return page;
}

export function generateBatch(offset = 0, limit = 100) {
  const allRoutes = getAllRoutes();
  const batch = allRoutes.slice(offset, offset + limit);

  const results = [];
  const seenSlugs = new Set();
  const seenKeywords = new Set();

  for (const route of batch) {
    // Dedup
    if (seenSlugs.has(route.slug)) continue;
    seenSlugs.add(route.slug);

    const page = generatePage(route);
    if (!page || page.status === "SKIPPED") continue;

    // Keyword cannibalization check
    const pk = page.seo?.primary_keyword;
    if (pk && seenKeywords.has(pk)) continue;
    if (pk) seenKeywords.add(pk);

    results.push(page);
  }

  return {
    pages: results,
    total: allRoutes.length,
    offset,
    limit,
    generated: results.length,
  };
}