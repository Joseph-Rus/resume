// // components/SketchfabEmbed.tsx
// "use client";
// import { useState } from 'react';

// interface SketchfabEmbedProps {
//   modelId: string;
//   autoStart?: boolean;
//   className?: string;
//   fallbackElement?: React.ReactNode;
// }

// const SketchfabEmbed = ({ 
//   modelId, 
//   autoStart = true,
//   className = "",
//   fallbackElement = null
// }: SketchfabEmbedProps) => {
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   // Construct the Sketchfab URL with parameters
//   const sketchfabUrl = `https://sketchfab.com/models/${modelId}/embed?autostart=${autoStart ? 1 : 0}&ui_theme=dark&ui_annotations=0&ui_inspector=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_animations=0`;

//   return (
//     <div className={`relative w-full h-full ${className}`}>
//       {/* Show fallback until iframe loads */}
//       {!isLoaded && fallbackElement && (
//         <div className="absolute inset-0 z-10">
//           {fallbackElement}
//         </div>
//       )}
      
//       <div className="sketchfab-embed-wrapper w-full h-full">
//         <iframe 
//           title={`Sketchfab 3D Model ${modelId}`}
//           onLoad={() => setIsLoaded(true)}
//           frameBorder="0" 
//           allowFullScreen 
//           allow="autoplay; fullscreen; xr-spatial-tracking" 
//           xr-spatial-tracking="true"
//           execution-while-out-of-viewport="true"
//           execution-while-not-rendered="true"
//           web-share="true"
//           src={sketchfabUrl}
//           style={{ width: '100%', height: '100%' }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SketchfabEmbed;