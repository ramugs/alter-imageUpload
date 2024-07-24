const setCanvasPreview = (
  image: any, // HTMLImageElement
  canvas: any, // HTMLCanvasElement
  crop: any // PixelCrop
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};
export default setCanvasPreview;

// const generateCroppedImage = () => {
//     if (!completedCrop || !imgRef.current || !canvasRef.current) {
//       return;
//     }
//     const image = imgRef.current;
//     const canvas = canvasRef.current;
//     const crop = completedCrop;
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     const ctx = canvas.getContext("2d");

//     canvas.width = crop.width;
//     canvas.height = crop.height;

//     if (ctx) {
//       ctx.drawImage(
//         image,
//         crop.x * scaleX,
//         crop.y * scaleY,
//         crop.width * scaleX,
//         crop.height * scaleY,
//         0,
//         0,
//         crop.width,
//         crop.height
//       );
//     }

//     const base64Image = canvas.toDataURL("image/jpeg");
//     setCroppedImageUrl(base64Image);
//   };


// const generateCroppedImage = () => {
//     if (!completedCrop || !imgRef.current || !canvasRef.current) {
//       return;
//     }
//     const image = imgRef.current;
//     const canvas = canvasRef.current;
//     const crop = completedCrop;

//     setCanvasPreview(
//       image,
//       canvas,
//       convertToPixelCrop(crop, image?.width, image?.height)
//     );
//     const base64Image = canvas.toDataURL("image/jpeg")
//     setCroppedImageUrl(base64Image);

//     //   const scaleX = image.naturalWidth / image.width;
//     //   const scaleY = image.naturalHeight / image.height;
//     //   const ctx = canvas.getContext("2d");

//     //   canvas.width = crop.width;
//     //   canvas.height = crop.height;

//     //   if (ctx) {
//     //     ctx.drawImage(
//     //       image,
//     //       crop.x * scaleX,
//     //       crop.y * scaleY,
//     //       crop.width * scaleX,
//     //       crop.height * scaleY,
//     //       0,
//     //       0,
//     //       crop.width,
//     //       crop.height
//     //     );
//     //   }

//     //   const base64Image = canvas.toDataURL("image/jpeg");
//     //   setCroppedImageUrl(base64Image);
//   };
