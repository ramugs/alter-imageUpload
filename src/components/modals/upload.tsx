import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { getUser, imageUpload } from "../../redux/user/userReducer";
import ModalHeader from "../../utils/modalHeader";
import { IconButton, IconWithButton } from "../button/button";
import { useSelector } from "react-redux";
import UploadIcon from "../../assests/icons/uploadIcon.png";
import {
  base64ImageProps,
  ImageProps,
  UserProps,
} from "../../pages/profilePage";
import { error } from "console";
import CovertToBase64 from "../../utils/covertToBase64";
import axios from "axios";
import { LoadingSpinner } from "../LoaderSpinner";

type modalProps = {
  isVisible: boolean;
  onclose: () => void;
  userID: string;
};

const ImageUploadModal = ({ isVisible, onclose, userID }: modalProps) => {
  const dispatch = useAppDispatch();
  const imageUploadRes = useSelector((data: any) => data?.imageUpload);
  const userDetailsRes = useSelector((data: any) => data?.getUser);
  const [userData, setUserData] = useState<UserProps>();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getUser(userID));
  }, [reload]);

  useEffect(() => {
    if (userDetailsRes?.status === "success") {
      setUserData(userDetailsRes.data.data);
    } else if (userDetailsRes?.status === "failed") {
      console.log("Something went wrong");
    }
  }, [userDetailsRes]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) =>
        formData.append("profileImages", file)
      );
      dispatch(imageUpload({ userID: userID, formData: formData }));
    }
  };

  useEffect(() => {
    if (imageUploadRes?.status === "success") {
      setReload(!reload);
    } else if (imageUploadRes?.status === "failed") {
      console.log("something went wrong");
    }
  }, [imageUploadRes]);

  const imagesWithBase64 = CovertToBase64(userData as UserProps);

  const removeImage = async (imageID: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/user/remove-image/${userID}`,
        {
          imageID,
        }
      );
      console.log(response.data);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isVisible) return null;
  return (
    <ModalHeader>
      <div className="w-[576px]">
        <div className="flex justify-between">
          <div>
            <span className="text-xl text-neutral-900 font-medium">
              Upload image(s)
            </span>
            <div className="pt-1">
              <span className="text-16 text-neutral-600 font-normal">
                You may upload up to 5 images
              </span>
            </div>
          </div>
          <div>
            <IconButton onclick={onclose} />
          </div>
        </div>
        <div className="w-full my-6">
          <input
            id="imageUpload"
            className="hidden"
            type="file"
            accept=".jpg, .png"
            multiple
            onChange={(e) => handleFileUpload(e)}
            disabled={imageUploadRes?.isLoading}
          />
          <label className="cursor-pointer" htmlFor="imageUpload">
            <div className="w-full border border-neutral-200 bg-neutral-50 rounded flex justify-center items-center h-[200px]">
              {imageUploadRes?.isLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="text-center">
                  <div className="flex justify-center">
                    <img src={UploadIcon} alt="upload Icon" />
                  </div>
                  <div className="pt-3">
                    <span className="text-lg font-medium text-neutral-900">
                      Click or drag and drop to upload
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-normal text-neutral-600">
                      PNG, or JPG (Max 5MB)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
        {imagesWithBase64 &&
          imagesWithBase64?.map((item: base64ImageProps, index: number) => (
            <div className="relative mb-6" key={index}>
              <div className="absolute top-0 right-0">
                <input type="radio" name="profileImage" />
              </div>
              <div className="flex">
                <div className="w-[80px] h-[80px]">
                  <img
                    src={item?.data}
                    alt="images"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col">
                    <span>{item?.filename}</span>
                    <span>{item?.size}</span>
                  </div>
                  <div>
                    <IconWithButton
                      name="Delete"
                      onclick={() => {
                        removeImage(item?._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </ModalHeader>
  );
};

export default ImageUploadModal;
