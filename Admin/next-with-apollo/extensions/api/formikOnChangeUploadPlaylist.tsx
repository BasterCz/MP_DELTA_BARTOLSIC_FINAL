import { MyFormValues, useFormikUIHLS } from "../../components/hooks/useFormikUIPlaylist";
import { AxiosStatic } from "axios";
import { FormikProps } from "formik";
import FormData from "form-data";

export const handleOnChangeUploadFormikPlaylist = async (
    formData: FormData,
    destination: string,
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
        formikInstance.setFieldValue("imageName", fileName);
  
    setUploaded(true)
  };

  export default handleOnChangeUploadFormikPlaylist