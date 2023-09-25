import NavBar from "@components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "@components/Footer";
import { Toaster } from "react-hot-toast";
const RootLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default RootLayout;
