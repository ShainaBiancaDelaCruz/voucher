import PropTypes from "prop-types";
import { RxEnterFullScreen } from "react-icons/rx";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
export const TableCont = ({children}) => {
  const handle = useFullScreenHandle();
  return (
    <FullScreen className={`${handle.enter ? 'h-screen bg-white ' : ''}  `} handle={handle}>
    <table className=" bg-white  backdrop-blur-md  shadow-[#00000021]  shadow-md  rounded-lg relative  mt-2 overflow-x-auto ">
      {children}
      <div className={`${handle.enter ? 'right-0 -top-0' : '-right-4 -top-3'} absolute  bg-light-gray-3 text-white rounded-full p-2 `} role="button" tabIndex={0}>
        <RxEnterFullScreen className="w-5 h-5" onClick={() => handle.enter()}/>
      </div>
    </table>
    </FullScreen>
  );
};

TableCont.propTypes = {
  children: PropTypes.node,
};