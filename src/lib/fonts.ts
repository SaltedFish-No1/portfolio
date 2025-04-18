import { Doto } from "next/font/google";
import localFont from "next/font/local";


export const englishFont = Doto({
  subsets: ["latin"],
  variable: "--font-english",
  display: "swap",
  weight: ["400", "700"],
});
export const chineseFont = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSC.ttf',
      weight: '400 700',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-zh',
})
