import { EB_Garamond } from "next/font/google";
import localFont from "next/font/local";

// Primary Display Font - Mazius Display
export const maziusDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/MAZIUSREVIEW20.09-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mazius-display",
  display: "swap",
});

// Secondary Body Font - EB Garamond
export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
