import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInput = {
  image: FileList;
};

export const UploadAndDisplayImage = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!selectedFile) {
      return;
    }

    console.log("uploaded data: ", data.image[0]);
    const formData = new FormData();
    formData.append("file", selectedFile);

    const token = await getAccessTokenSilently();

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("post result: ", res.data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("image")} required type="file" onChange={onSelectFile} />
        <Button variant="contained" color="success" type="submit">
          保存する
        </Button>
      </form>
      <p>image preview</p>
      {preview ? <img src={preview} alt="preview" style={{ height: "200px" }} /> : <p>no image</p>}
    </>
  );
};
