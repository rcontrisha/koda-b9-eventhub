import { Outlet } from "react-router";
import Header from "../components/shared/Header";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainLayout;
