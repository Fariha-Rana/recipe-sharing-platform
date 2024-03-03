import { Inter } from "next/font/google";
import "./globals.css";
import NextUiProvider from "./providers";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FoodBook",
  description: "Search for your favorite recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <main>
          <NextUiProvider>
            <Navbar />
            {children}
          </NextUiProvider>
        </main>
      </body>
    </html>
  );
}
