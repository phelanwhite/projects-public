import axios from "axios";
// const host = `http://localhost:5000`;

export const uploadFiles = async (files: FileList) => {
  const formData = new FormData();
  Array.from(files)?.forEach((file) => formData.append("files", file));

  const resp = await (
    await axios.post(`http://localhost:5000/upload/upload-multiple`, formData)
  ).data;
  return resp;
};
