import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Footer from "@/components/Footer";
import Link from "next/link";
import PushNotificationManager from "@/components/PushNotificationManager";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Texas Frenchie Network | petshealthessentials.com",
    template: "%s | Texas Frenchie Network",
  },
  description:
    "The ultimate directory for Texas French Bulldog owners. Find verified vets, dog-friendly patios, elite breeders, and essential gear across Austin, Dallas, Houston, and San Antonio.",
  metadataBase: new URL("https://petshealthessentials.com"),
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://petshealthessentials.com",
    siteName: "Texas Frenchie Network",
    title: "The Texas Frenchie Network",
    description:
      "The statewide directory for French Bulldog owners in Texas. Verified vets, dog-friendly patios, top breeders, and essential summer gear.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Texas Frenchie Network",
    description:
      "The ultimate directory for Texas French Bulldog owners.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Texas Frenchie",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${bebasNeue.variable} font-sans antialiased w-full`}
        suppressHydrationWarning
      >
        <PushNotificationManager />
        <div className="w-full min-h-screen">
          {children}
          <Footer />
        </div>

        {/* Secret Admin Portal Access */}
        <Link 
          href="/admin" 
          title="Admin Dashboard"
          className="fixed bottom-4 left-4 z-50 text-2xl opacity-10 hover:opacity-100 transition-opacity drop-shadow-md cursor-pointer"
        >
          🐶
        </Link>

        {/* Meta Pixel Code for Texas Frenchie Network */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || "YOUR_PIXEL_ID"}');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
