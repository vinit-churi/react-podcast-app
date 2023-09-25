import toast from "react-hot-toast";
export default function notify(message, icon) {
  return toast(message, {
    icon: icon,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
}
