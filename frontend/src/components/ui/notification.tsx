import { toast, Bounce, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const errorNotification = (message: string) => {
  toast.error(message, defaultOptions);
};

export const successNotification = (message: string) => {
  toast.success(message, defaultOptions);
};