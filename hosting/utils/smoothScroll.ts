// import { initLenis } from "./lenis";

// export const scrollToSection = (sectionId: string) => {
//   const element = document.getElementById(sectionId);
//   if (element) {
//     const lenis = initLenis();
//     lenis.scrollTo(element, {
//       offset: -100, // Adjust offset to account for sticky navbar
//       duration: 1.2,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     });
//   }
// };