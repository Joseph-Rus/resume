// // utils/lenis.ts
// "use client";

// import Lenis from "@studio-freight/lenis";

// export const initLenis = () => {
//   // Check if we're in a browser environment
//   if (typeof window === "undefined") return {
//     destroy: () => {},
//     scrollTo: () => {},
//     raf: () => {},
//   };

//   try {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       lerp: 0.1,
//       direction: "vertical",
//       gestureDirection: "vertical",
//       smoothTouch: false,
//       touchMultiplier: 2,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return lenis;
//   } catch (error) {
//     console.error("Failed to initialize Lenis:", error);
//     // Return a dummy object with the same interface to prevent errors
//     return {
//       destroy: () => {},
//       scrollTo: () => {},
//       raf: () => {},
//     };
//   }
// };

// // utils/smoothScroll.ts
// "use client";

// import { initLenis } from "./lenis";

// export const scrollToSection = (sectionId: string) => {
//   const element = document.getElementById(sectionId);
//   if (element) {
//     const lenis = initLenis();
//     if (lenis && typeof lenis.scrollTo === 'function') {
//       lenis.scrollTo(element, {
//         offset: -100, // Adjust offset to account for sticky navbar
//         duration: 1.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       });
//     }
//   }
// };

// // app/layout.tsx
// "use client";

// import "./style/globals.css";
// import { Inter } from "next/font/google";
// import { useEffect } from "react";
// import { initLenis } from "./utils/lenis";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
//   weight: ["400", "500", "600", "700", "800"],
// });

// // Move metadata to a separate file since this is a client component
// // For example, create app/metadata.ts and import it in the appropriate server component

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   useEffect(() => {
//     const lenis = initLenis();
    
//     return () => {
//       if (lenis && typeof lenis.destroy === 'function') {
//         lenis.destroy();
//       }
//     };
//   }, []);

//   return (
//     <html lang="en" className={inter.className}>
//       <body className="bg-white text-gray-900 antialiased">{children}</body>
//     </html>
//   );
// }