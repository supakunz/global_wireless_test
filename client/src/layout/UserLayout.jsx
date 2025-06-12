/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
// import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <nav>{/* <Navbar /> */}</nav>
      <main className="flex-grow bg-[#999] flex items-center justify-center">
        <Outlet />
      </main>
      <footer className="bg-black text-white text-center">
        <Footer />
      </footer>
    </div>
  );
}

export default UserLayout;
