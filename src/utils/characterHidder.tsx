export const characterHidder = (fileName: string, count: number = 18) => {
  if (fileName && fileName.length > count) {
    const parts = fileName.split(".");
    const baseName = parts.slice(0, -1).join("."); // All parts except the last one
    const extension = parts[parts.length - 1]; // The last part

    return (
      <span title={fileName}>
        {baseName.substring(0, count) + "..."}
        <span>{`.${extension}`}</span>
      </span>
    );
  } else {
    return fileName;
  }
};
