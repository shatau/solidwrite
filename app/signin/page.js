import SignIn from "@/components/SignIn";
import { getSEOTags } from "@/libs/seo";

export async function generateMetadata({ params: { lang } }) {
  const metadata = await getSEOTags({
    title: `SolidWrite Login`,
    description: "SolidWrite Login page to sign in to dashboard",
    canonicalUrlRelative: `/signin`,
    lang,
  });
  return metadata;
}

export default function SignInPage() {
  return <SignIn />;
}