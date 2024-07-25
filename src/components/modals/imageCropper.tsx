import { useEffect, useRef, useState } from "react";
import ModalHeader from "../../utils/modalHeader";
import { IconButton, PrimaryButton, SecondButton } from "../button/button";
import { selectedImageIDProps } from "./upload";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import setCanvasPreview from "../setCanvasPreview";
import { baseURL } from "../../redux/config";
import axios from "axios";
import { convertBase64ToFile } from "../../utils/covertBase64ToFile";
import { useAppDispatch } from "../../redux/store";
import { getUser } from "../../redux/user/userReducer";
import { LoadingSpinner } from "../LoaderSpinner";
import errorToast from "../../utils/errorToast";
import { useNavigate } from "react-router-dom";

type modalProps = {
  isVisible: boolean;
  onclose: () => void;
  imageData: selectedImageIDProps;
  userID: string;
};

const ImageCropperModal = ({
  isVisible,
  onclose,
  imageData,
  userID,
}: modalProps) => {
  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string>(imageData?.data);
  useEffect(() => {
    setImgSrc(imageData?.data);
  }, [imageData]);
  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState("");
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [loading, setLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height, naturalHeight, naturalWidth } = e.currentTarget;
    if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
      setError("Image must be atleast 150 * 150 pixels");
      errorToast("Image must be atleast 150 * 150 pixels");
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

  const generateCroppedImage = async () => {
    setLoading(true);
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

    if (!base64Image) return;

    const file = convertBase64ToFile(base64Image, "cropped-image.jpg");

    const formData = new FormData();
    formData.append("profileImages", file);
    formData.append("imageID", imageData?.id);

    try {
      await axios.patch(`${baseURL}user/profile-image/${userID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(getUser(userID));
      onclose();
      setLoading(false);
    } catch (error: any) {
      if (error?.response?.status === 500) {
        navigate("/error-page");
      }
      errorToast("Something went wrong");
      setLoading(false);
    }
  };

  if (!isVisible) return null;
  return (
    <ModalHeader>
      <div className="sm:w-[350px] w-[100vw]">
        <div className="flex justify-between sm:px-0 px-5">
          <div>
            <span className="text-xl text-neutral-900 font-medium">
              Crop your picture
            </span>
          </div>
          <div>
            <IconButton onclick={onclose} />
          </div>
        </div>

        {error ? (
          <div className="py-3">
            <span className="text-18 text-neutral-600 font-semibold">
              {error}
            </span>
          </div>
        ) : (
          <div className="sm:w-[350px] w-[100vw] h-[350px] bg-neutral-950 my-5">
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
                className="w-full h-[350px] object-contain"
                style={{ maxHeight: "70vh" }}
                onLoad={(e) => onImageLoad(e)}
              />
            </ReactCrop>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="flex justify-between gap-5 mt-6 sm:px-0 px-5">
          <SecondButton
            name="Cancel"
            padding="py-3 w-full"
            disabled={loading}
            onclick={() => {
              onclose();
            }}
          />
          <PrimaryButton
            name={
              loading ? <LoadingSpinner width="w-6" height="h-6" /> : `Confirm`
            }
            disabled={loading || Boolean(error)}
            padding="py-3 w-full"
            onclick={() => generateCroppedImage()}
          />
        </div>
      </div>
    </ModalHeader>
  );
};

export default ImageCropperModal;
