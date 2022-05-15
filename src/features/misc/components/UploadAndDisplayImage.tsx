import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInput = {
  image: FileList;
};

export const UploadAndDisplayImage = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

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

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log("uploaded data: ", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("image")} required type="file" onChange={onSelectFile} />
        <button>Submit</button>
      </form>
      <p>image preview</p>
      {preview ? <img src={preview} alt="preview" style={{ height: "200px" }} /> : <p>no image</p>}
    </>
  );
};
