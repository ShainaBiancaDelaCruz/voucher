import { Outlet } from "react-router-dom";
export const LandingLayout = () => {
  return (
    <div className=" grid   min-h-screen  w-full  bg-light-gray  ">
      <Outlet />
    </div>
  );
};
