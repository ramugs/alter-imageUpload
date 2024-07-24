import { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import axios from "axios";

const ImageCropper = ({ data, userID }: any) => {
  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150;
  const [imgSrc, setImgSrc] = useState<string>(data?.data);
  useEffect(() => {
    setImgSrc(data?.data);
  }, [data]);

  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState("");
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height, naturalHeight, naturalWidth } = e.currentTarget;
    if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
      setError("Image must be atleast 150 * 150 pixels");
      setImgSrc("");
      return;
    }
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,

      width,
      height
    );
    const ceneteredCrop = centerCrop(crop, width, height);
    setCrop(ceneteredCrop);
  };

  const onCropComplete = (pixelCrop: PixelCrop) => {
    setCompletedCrop(pixelCrop);
  };

  const generateCroppedImage = () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = canvasRef.current;
    const crop = completedCrop;

    setCanvasPreview(
      image,
      canvas,
      convertToPixelCrop(crop, image?.width, image?.height)
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setCroppedImageUrl(base64Image);
  };

  const convertBase64ToFile = (base64: string, filename: string) => {
    const [header, data] = base64.split(",");
    const mime = header.match(/:(.*?);/)?.[1];
    const byteString = atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new File([new Blob([uint8Array], { type: mime })], filename, {
      type: mime,
    });
  };

  const uploadCroppedImage = async () => {
    if (!croppedImageUrl) return;

    const file = convertBase64ToFile(croppedImageUrl, "cropped-image.jpg");

    const formData = new FormData();
    formData.append("profileImages", file);
    formData.append("imageID", data?._id);

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/user/profile-image/${userID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  console.log(data, "aksdjakjda");

  return (
    <div>
      <ReactCrop
        crop={crop}
        circularCrop
        keepSelection
        aspect={ASPECT_RATIO}
        minWidth={MIN_DIMENSION}
        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
        onComplete={onCropComplete}
      >
        <img
          ref={imgRef}
          src={imgSrc}
          style={{ maxHeight: "70vh" }}
          onLoad={(e) => onImageLoad(e)}
        />
      </ReactCrop>

      <button type="button" onClick={() => generateCroppedImage()}>
        Crop image
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {croppedImageUrl && (
        <div>
          <h3>Cropped Image:</h3>
          <img src={croppedImageUrl} alt="Cropped" />
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="button" onClick={() => uploadCroppedImage()}>
        Update
      </button>
    </div>
  );
};

export default ImageCropper;
