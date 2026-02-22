// app/api/pseo/route.js — Server-side pSEO API
// Handles batch generation and single page lookups.
// All content generation happens server-side only.

import { NextResponse } from "next/server";
import { getAllRoutes, generatePage, generateBatch } from "@/libs/pseo-generator";

// GET /api/pseo?slug=solidwrite-vs-quillbot
// GET /api/pseo?batch=true&offset=0&limit=100
// GET /api/pseo?manifest=true
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const isBatch = searchParams.get("batch") === "true";
    const isManifest = searchParams.get("manifest") === "true";

    // Return full route manifest (for sitemap generation)
    if (isManifest) {
      const routes = getAllRoutes();
      return NextResponse.json({
        total: routes.length,
        routes: routes.map((r) => ({
          slug: r.slug,
          playbook: r.playbook,
          title: r.title,
        })),
      });
    }

    // Batch generation
    if (isBatch) {
      const offset = parseInt(searchParams.get("offset") || "0", 10);
      const limit = Math.min(parseInt(searchParams.get("limit") || "100", 10), 100);
      const batch = generateBatch(offset, limit);
      return NextResponse.json(batch);
    }

    // Single page lookup
    if (slug) {
      const routes = getAllRoutes();
      const route = routes.find((r) => r.slug === slug);

      if (!route) {
        return NextResponse.json(
          { error: "Page not found", slug },
          { status: 404 }
        );
      }

      const page = generatePage(route);
      if (!page || page.status === "SKIPPED") {
        return NextResponse.json(
          { error: "Page skipped", reason: page?.reason || "Unknown" },
          { status: 422 }
        );
      }

      return NextResponse.json(page);
    }

    return NextResponse.json(
      { error: "Missing parameter: slug, batch, or manifest" },
      { status: 400 }
    );
  } catch (error) {
    console.error("pSEO API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}