const config = {
  appName: "SolidWrite",
  appDescription:
    "Transform AI-generated text into natural, human-like content that bypasses AI detection.",
  domainName: "SolidWrite.com",
  crisp: {
    id: "",
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    plans: [
      // MONTHLY PLANS
      {
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkK4GubYQbBbhWJriHIpbR" : "price_1SbiOkKBnTv7JXWROJag4V1o",
        name: "Basic",
        billingInterval: "monthly",  // ← ADD THIS
        description: "Best for students who need basic humanization features",
        price: 5.99,
        credits: 5000,
        perRequestLimit: 500,
        features: [
          { name: "5,000 words per month" },
          { name: "Basic AI Humanizer" },
        ],
      },
      {
        isFeatured: true,
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkKUGubYQbBbhWwvqkPTzh" : "price_1SbiPIKBnTv7JXWRxPpg1isa",
        name: "Pro",
        billingInterval: "monthly",  // ← ADD THIS
        description: "Perfect for professional writing",
        price: 19.99,
        credits: 15000,
        perRequestLimit: 1500,
        features: [
          { name: "15,000 words per month" },
        ],
      },
      {
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkKsGubYQbBbhW7Tp5A5Cp" : "price_1SbiPjKBnTv7JXWRMbCJ7Fqp",
        name: "Ultra",
        billingInterval: "monthly",  // ← ADD THIS
        description: "For blogs and long-form writing",
        price: 39.99,
        credits: 30000,
        perRequestLimit: 3000,
        features: [
          { name: "30,000 words per month" },
        ],
      },
      // ANNUAL PLANS
      {
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkM5GubYQbBbhWSVzXWKyM" : "price_1SbiQ7KBnTv7JXWRruqVX3Vx",
        name: "Basic",
        billingInterval: "annual",  // ← ADD THIS
        description: "Best for students who need basic humanization features",
        price: 2.99,
        priceAnchor: 5.99,
        credits: 5000,
        perRequestLimit: 500,
        features: [
          { name: "5,000 words per month" },
        ],
      },
      {
        isFeatured: true,
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkMwGubYQbBbhWPIHRI7ys" : "price_1SbiQwKBnTv7JXWRzGbPHxQL",
        name: "Pro",
        billingInterval: "annual",  // ← ADD THIS
        description: "Perfect for professional writing",
        price: 9.99,
        priceAnchor: 19.99,
        credits: 15000,
        perRequestLimit: 1500,
        features: [
          { name: "15,000 words per month" },
        ],
      },
      {
        priceId: process.env.NODE_ENV === "development" ? "price_1SXkNYGubYQbBbhWfyMUCcg0" : "price_1SbiRPKBnTv7JXWRPGSQKvtk",
        name: "Ultra",
        billingInterval: "annual",  // ← ADD THIS
        description: "For blogs and long-form writing",
        price: 19.99,
        priceAnchor: 39.99,
        credits: 30000,
        perRequestLimit: 3000,
        features: [
          { name: "30,000 words per month" },
        ],
      },
    ],
  },
  aws: {
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/"
  },
  resend: {
    fromNoReply: `SolidWrite <noreply@SolidWrite.com>`,
    fromAdmin: `Support at SolidWrite <support@SolidWrite.com>`,
    supportEmail: "support@solidwrite.com",
  },
  colors: {
    theme: "silk",
    main: "hsl(var(--p))",
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
};

export default config;