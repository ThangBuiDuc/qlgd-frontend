import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "./ReactQueryProvider";
import localFont from "next/font/local";
import { NextUIProvider } from "@nextui-org/system";
import { Toaster } from "sonner";

// import { ViewTransitions } from "next-view-transitions";
import "react-sweet-progress/lib/style.css";
const montserrat = localFont({
  src: [
    {
      path: "./fonts/Montserrat-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    // <ViewTransitions>
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.className} bg-white `}>
          <NextUIProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextUIProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
    // </ViewTransitions>
  );
}
