import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "@/providers/apollo-provider";
import localFont from "next/font/local";

const playfair = localFont({
  src: [
    {
      path: "../../public/fonts/PlayfairDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/PlayfairDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/PlayfairDisplay-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-playfair",
});

const alwaysInMyHeart = localFont({
  src: [
    {
      path: "../../public/fonts/Always In My Heart.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-always-in-my-heart",
});

export const metadata: Metadata = {
  title: "OnePieceQL",
  description: "GraphQL API for One Piece",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="onepieceql.com"
          src="https://plausible.alexcretu.com/js/script.js"
        ></script>
      </head>
      <body
        className={`${playfair.variable} ${alwaysInMyHeart.variable} bg-bg backdrop-grayscale backdrop-brightness-50 backdrop-contrast-200`}
      >
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
