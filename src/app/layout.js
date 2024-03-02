import { Inter } from "next/font/google";
import "./globals.css";
import NextUiProvider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FoodBook",
  description: "Search for your favorite recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}> <main className="background">
      <NextUiProvider>{children}</NextUiProvider>
    </main></body>
    </html>
  );
}
