import { MyFormValues, useFormikUIHLS } from "../../components/hooks/useFormikUISong";
import { AxiosStatic } from "axios";
import { FormikProps } from "formik";
import FormData from "form-data";

export const handleOnChangeUploadFormikSong = async (
    formData: FormData,
    destination: string,
    type: "file" | "image",
    fileName: string,
    axios: AxiosStatic,
    formikInstance: FormikProps<MyFormValues>,
    setUploaded: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setUploaded(false);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        destination: destination.replaceAll(" ", "_")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
      }
    };
    
    const response = await axios.post("/api/upload", formData, config);
    
    switch (type) {
      case "file":
        formikInstance.setFieldValue("fileName", fileName);
        break;
      case "image":
        formikInstance.setFieldValue("imageName", fileName);
        break;
    }
    setUploaded(true)
  };

  export default handleOnChangeUploadFormikSong