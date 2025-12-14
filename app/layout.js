import { Inter } from "next/font/google";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport = {
	// Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
	themeColor: "#ffffff",
	width: "device-width",
	initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export async function generateMetadata() {

	return getSEOTags({
		title: "AI Humanizer by Solid Write: Bypass AI Detectors ",
		description: "Transform AI-generated text into natural, human-like content that bypasses AI detection.",
		canonicalUrlRelative: "http://localhost:3000"
	});
}

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			data-theme={config.colors.theme}
			className={font.className}
		>

			<head>
				<script
					defer
					data-website-id="dfid_P8rU79Du8bSylUKN5Qnl0"
					data-domain="solidwrite.com"
					src="https://datafa.st/js/script.js">
				</script>
			</head>
			<body>
				{/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
