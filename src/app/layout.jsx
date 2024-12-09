import "./globals.css";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

export const metadata = {
  title: "FooFest",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anton.variable}>
      <body className="text-forest-100 text-desk-base">
        <header className="col-start-2 p-12">
          {/* <h1 className="text-8xl font-display uppercase">FooFest</h1> */}
        </header>
        {children}
        <footer></footer>
      </body>
    </html>
  );
}