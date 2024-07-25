import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { imageUpload } from "../../redux/user/userReducer";
import ModalHeader from "../../utils/modalHeader";
import {
  IconButton,
  IconWithButton,
  PrimaryButton,
  SecondButton,
} from "../button/button";
import { useSelector } from "react-redux";
import UploadIcon from "../../assests/icons/uploadIcon.png";
import { base64ImageProps, UserProps } from "../../pages/profilePage";
import CovertToBase64 from "../../utils/covertToBase64";
import axios from "axios";
import { LoadingSpinner } from "../LoaderSpinner";
import useAxios from "../../hooks/useAxios";
import { baseURL } from "../../redux/config";
import { sizeFormatter } from "../../utils/sizeFormatter";
import ImageCropperModal from "./imageCropper";
import errorToast from "../../utils/errorToast";
import { useNavigate } from "react-router-dom";
import { characterHidder } from "../../utils/characterHidder";

type modalProps = {
  isVisible: boolean;
  onclose: () => void;
  userID: string;
};

export type selectedImageIDProps = {
  id: string;
  data: string;
};

const ImageUploadModal = ({ isVisible, onclose, userID }: modalProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const imageUploadRes = useSelector((data: any) => data?.imageUpload);
  const [userData, setUserData] = useState<UserProps>();
  const [reload, setReload] = useState(false);
  const [selectedImageID, setSelectedImageID] = useState<selectedImageIDProps>({
    id: "",
    data: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const { data, error, loading, fetchFn } = useAxios({
    path: `user/${userID}`,
  });

  useEffect(() => {
    // api call using custom hook
    fetchFn();
  }, [reload, isVisible]);

  useEffect(() => {
    if (data?.status === "success") {
      setUserData(data?.data);
      const imagesWithBase64 = CovertToBase64(data?.data as UserProps);
      const filterValue = imagesWithBase64?.find(
        (item: base64ImageProps) => item?.profileImage === true
      );
      setSelectedImageID({
        id: filterValue?._id ?? "",
        data: filterValue?.data ?? "",
      });
    } else if (data?.status === "failed") {
      errorToast("Something went wrong");
    }
  }, [data, error]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxNumber = 5 - (userData?.images?.length || 0);
    const maxSize = 5 * 1024 * 1024;
    const files = e.target.files;
    if (files) {
      if (files?.length > maxNumber) {
        errorToast(
          maxNumber
            ? `You are able to upload only ${maxNumber} more image`
            : "You've reached the image limit"
        );
        return;
      }

      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          errorToast(
            `File size should not exceed 5 MB. File ${files[i].name} is too large.`
          );
          return;
        }
      }
      const formData = new FormData();
      Array.from(files).forEach((file) =>
        formData.append("profileImages", file)
      );
      dispatch(imageUpload({ userID: userID, formData: formData }));
    }
    e.target.value = "";
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const maxNumber = 5 - (userData?.images?.length || 0);
    const maxSize = 5 * 1024 * 1024;
    const files = e.dataTransfer.files;
    if (files) {
      if (files?.length > maxNumber) {
        errorToast(
          maxNumber
            ? `You are able to upload only ${maxNumber} more image`
            : "You've reached the image limit"
        );
        return;
      }
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          errorToast(
            `File size should not exceed 5 MB. File ${files[i].name} is too large.`
          );
          return;
        }
      }
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
      errorToast("Something went wrong");
    }
  }, [imageUploadRes]);

  const imagesWithBase64 = CovertToBase64(userData as UserProps);

  const [removeLoading, setRemoveLoading] = useState({ id: "", value: false });

  const removeImage = async (imageID: string) => {
    setRemoveLoading({ id: imageID, value: true });
    try {
      // normal api call using axios
      await axios.patch(`${baseURL}user/remove-image/${userID}`, {
        imageID,
      });
      setReload(!reload);
      setRemoveLoading({ id: imageID, value: false });
    } catch (error: any) {
      if (error?.response?.status === 500) {
        navigate("/error-page");
      }
      setRemoveLoading({ id: imageID, value: false });
      errorToast("Something went wrong");
    }
  };

  const handleChange = (id: string, data: string) => {
    setSelectedImageID({ id: id, data: data });
  };

  if (!isVisible) return null;
  return (
    <>
      <ImageCropperModal
        isVisible={openModal}
        onclose={() => {
          setOpenModal(false);
          onclose();
          setSelectedImageID({ id: "", data: "" });
        }}
        imageData={selectedImageID}
        userID={userID}
      />
      <div className={`${openModal && "hidden"}`}>
        <ModalHeader>
          <div className={`sm:w-[576px] w-[100vw] sm:px-0 px-5`}>
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
                disabled={
                  imageUploadRes?.isLoading ||
                  (userData?.images?.length || 0) >= 5
                }
              />
              <label className="cursor-pointer" htmlFor="imageUpload">
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e)}
                  className={`w-full border border-neutral-200 bg-neutral-50 rounded flex justify-center items-center ${
                    (userData?.images?.length || 0) >= 5
                      ? "h-[100px]"
                      : "h-[200px]"
                  } `}
                >
                  {imageUploadRes?.isLoading ? (
                    <LoadingSpinner />
                  ) : (userData?.images?.length || 0) >= 5 ? (
                    <>
                      <div className="text-center">
                        <div className="pt-3">
                          <span className="text-16 font-semibold text-red-600">
                            You've reached the image limit
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-normal text-neutral-600">
                            Remove one or more to upload more images.
                          </span>
                        </div>
                      </div>
                    </>
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
                    <input
                      type="radio"
                      value={selectedImageID?.id}
                      checked={selectedImageID?.id === item?._id}
                      name="profileImage"
                      onChange={() => handleChange(item?._id, item?.data)}
                    />
                  </div>
                  <div className="flex">
                    <div className="w-[80px] h-[80px]">
                      <img
                        src={item?.data}
                        alt="images"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col justify-between ps-3">
                      <div className="flex flex-col ">
                        <span className="text-16 font-semibold text-neutral-900">
                          {characterHidder(item?.filename)}
                        </span>
                        <span className="text-12 font-normal text-neutral-600">
                          {sizeFormatter(item?.size)}
                        </span>
                      </div>
                      <div>
                        {removeLoading?.value &&
                        removeLoading?.id === item?._id ? (
                          <div className="px-5">
                            <LoadingSpinner width="w-6" height="h-6" />
                          </div>
                        ) : (
                          <IconWithButton
                            name="Delete"
                            onclick={() => {
                              removeImage(item?._id);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            <div className="flex justify-between gap-5">
              <SecondButton
                name="Cancel"
                padding="py-3 w-full"
                onclick={() => {
                  onclose();
                  setSelectedImageID({ id: "", data: "" });
                }}
              />
              <PrimaryButton
                name="Select"
                padding="py-3 w-full"
                disabled={!selectedImageID?.id}
                onclick={() => {
                  setOpenModal(true);
                }}
              />
            </div>
          </div>
        </ModalHeader>
      </div>
    </>
  );
};

export default ImageUploadModal;
