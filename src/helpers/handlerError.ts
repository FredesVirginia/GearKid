import toast from "react-hot-toast";

interface IError {
  error: any;
  message?: string;
}
export const handlerError = ({ error, message }: IError) => {
  let text = "Unexpected error";

  const data = error?.response?.data;

  if (error && typeof data === "object") {
    if ("detail" in data) text = data.detail;
    else if ("message" in data) text = data.message;
    else if ("error" in data) text = data.error;
    else if ("result" in data) text = data.result;
    else if (message) text = message;
  }

  if (typeof text === "boolean") text = "The answers don't match";

  toast.error(text);
};
