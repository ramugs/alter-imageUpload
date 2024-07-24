import axios from "axios";
import { useEffect, useState } from "react";
import CoverImage from "../assests/images/cover.png";
import ImageCropper from "../components/imageCropper";
import TestingComponent from "../components/testingComponent";
import { useAppDispatch } from "../redux/store";
import { getUser } from "../redux/user/userReducer";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../components/LoaderSpinner";
import { SecondButton } from "../components/button/button";
import ModalHeader from "../utils/modalHeader";
import ImageUploadModal from "../components/modals/upload";
import CovertToBase64 from "../utils/covertToBase64";

export type ImageProps = {
  contentType: string;
  data: {
    data: ArrayBuffer;
    type: string;
  };
  profileImage: boolean;
  filename: string;
  size: number;
  _id: string;
};

export type base64ImageProps = {
  contentType: string;
  data: string;
  profileImage: boolean;
  filename: string;
  size: number;
  _id: string;
};

export type UserProps = {
  company: string;
  name: string;
  role: string;
  email: string;
  images: ImageProps[];
  __v: number;
  _id: string;
};

const ProfilePage = () => {
  const userID = "66a1318a9d05c4d39a19c4c2";
  const dispatch = useAppDispatch();
  const userDetailsRes = useSelector((data: any) => data?.getUser);
  const [user, setUser] = useState<UserProps>();
  const [reload, setReload] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) =>
        formData.append("profileImages", file)
      );

      try {
        const response = await axios.patch(
          `http://localhost:5000/api/v1/user/${userID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setReload(!reload);
        console.log("Upload success:", response.data);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

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

  const imagesWithBase64 = CovertToBase64(user as UserProps);
  const prifileImage = imagesWithBase64?.find(
    (item) => item?.profileImage === true
  );

  useEffect(() => {
    dispatch(getUser(userID));
  }, []);

  useEffect(() => {
    if (userDetailsRes?.status === "success") {
      setUser(userDetailsRes.data.data);
    } else if (userDetailsRes?.status === "failed") {
      console.log("Something went wrong");
    }
  }, [userDetailsRes]);

  return (
    <>
      <ImageUploadModal
        isVisible={modalOpen}
        onclose={() => setModalOpen(false)}
        userID={userID}
      />
      {userDetailsRes?.isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen ">
          <div className="shadow-2 rounded-lg lg:w-[55vw] h-[58vh] md:mx-10 mx-4">
            <div className="h-[20vh]">
              <img src={CoverImage} className="w-full h-full rounded-t-lg" />
            </div>
            <div className=" h-[38vh] relative lg:px-8 px-4">
              <div className="absolute md:w-[160px] md:h-[160px] w-[96px] h-[96px] md:top-[-90px] top-[-60px] left-[20px]">
                <img
                  src={prifileImage?.data}
                  alt="profile image"
                  className="w-full h-full object-cover rounded-full border-[5px] border-white"
                />
              </div>
              <div className="flex justify-end my-4">
                <SecondButton
                  name="Update Profile"
                  onclick={() => setModalOpen(true)}
                />
              </div>

              <div className="pt-5 ">
                <span className="text-3xl font-semibold text-neutral-900">
                  {user?.name}
                </span>
              </div>
              <div className="md:text-xl text-16 flex flex-wrap gap-3 pt-3 font-normal">
                <span>@{user?.email}</span>
                <span>
                  <span className="pe-3 text-neutral-600">&#x2022;</span>
                  {user?.role}
                  <span className="text-neutral-600 px-3">at</span>
                  {user?.company}
                </span>
                <span className="text-neutral-600">
                  <span className="pe-3 text-neutral-600">&#x2022;</span>
                  He/Him
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
