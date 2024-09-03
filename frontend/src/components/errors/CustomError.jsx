import { useRouteError } from "react-router-dom";
import { BiError } from "react-icons/bi";
export const CustomError = () => {
  const error = useRouteError();

  return (
    <div
      className="h-screen bg-no-repeat bg-cover bg-center   text-white  bg-black"
    >
      <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex items-center justify-center flex-col gap-5">
        <h1 className="font-bold text-4xl">
          {" "}
          <BiError className="inline text-yellow-500" /> Page Error
        </h1>
        <p className=" text-red-500 font-bold text-4xl">{error.message}</p>
        <span className="font-medium text-lg">Try Again Later</span>
      </div>
    </div>
  );
};

