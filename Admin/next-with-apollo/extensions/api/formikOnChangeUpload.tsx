import { MyFormValues, useFormikUIHLS } from "../../components/hooks/useFormikUI";
import { AxiosStatic } from "axios";
import { FormikProps } from "formik";

export const handleOnChangeUploadFormik = async (
    formData: FormData,
    destination: string,
    type: "file" | "image",
    fileName: string,
    axios: AxiosStatic,
    formikInstance: FormikProps<MyFormValues>
  ) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        destination: destination,
      },
      onUploadProgress: (event: { loaded: number; total: number }) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
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
    console.log("response", response.data);
  };

  export default handleOnChangeUploadFormik