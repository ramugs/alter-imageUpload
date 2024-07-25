export const convertBase64ToFile = (base64: string, filename: string) => {
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
