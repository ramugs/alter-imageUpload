export const sizeFormatter = (data: number) => {
  let fileSize;
  if (data >= 1024 * 1024) {
    fileSize = (data / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    fileSize = (data / 1024).toFixed(2) + " KB";
  }
  return fileSize;
};
