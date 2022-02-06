import { toast, ToastContainer } from "react-toastify";

export default function Alert(
  text: string,
  type: string,
  aTheme: "dark" | "light"
) {
  if (type === "success") {
    return toast.success(text, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      theme: aTheme,
    });
  }

  if (type === "error") {
    return toast.error(text, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      theme: aTheme,
    });
  }

  if (type === "info") {
    return toast.info(text, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      theme: aTheme,
    });
  }
}
