// // components/IframeModelViewer.tsx
// "use client";

// import React, { useState } from 'react';

// const IframeModelViewer = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   // The model ID from Sketchfab
//   const modelId = "a55641f7cf924d598c59bfb24a12a87c";
  
//   return (
//     <div className="w-full h-full relative">
//       {/* Loading placeholder */}
//       {!isLoaded && (
//         <div className="absolute inset-0 flex items-center justify-center z-20 bg-gray-900 bg-opacity-50">
//           <div className="text-6xl font-bold text-orange-500">JR</div>
//         </div>
//       )}
      
//       <iframe
//         onLoad={() => setIsLoaded(true)}
//         title="F1 Car 3D Model"
//         className="w-full h-full"
//         frameBorder="0"
//         allowFullScreen={true}
//         allow="autoplay; fullscreen"
//         src={`https://sketchfab.com/models/${modelId}/embed?autospin=1&autostart=1&preload=1&ui_theme=dark&ui_controls=0&ui_inspector=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_animations=0&transparent=1&ui_infos=0`}
//         style={{
//           border: 'none',
//           background: 'transparent'
//         }}
//       />
      
//       {/* Attribution - required for Creative Commons license */}
//       <div className="absolute bottom-0 right-0 text-xs text-gray-500 opacity-70 p-1 bg-gray-900 bg-opacity-50 rounded">
//         Car by cuadot.fbx
//       </div>
//     </div>
//   );
// };

// export default IframeModelViewer;