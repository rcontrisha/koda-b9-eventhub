import { Outlet } from "react-router";
import Header from "./shared/Header";

function GuestLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default GuestLayout;
