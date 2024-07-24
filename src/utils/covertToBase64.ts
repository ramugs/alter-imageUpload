import { ImageProps, UserProps } from "../pages/profilePage";

const CovertToBase64 = (user: UserProps) => {
  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const imagesWithBase64 = user?.images?.map((image: ImageProps) => ({
    ...image,
    data: `data:${image.contentType};base64,${arrayBufferToBase64(
      image.data.data
    )}`,
  }));

  return imagesWithBase64;
};

export default CovertToBase64;
