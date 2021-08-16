import { AiFillCloseCircle } from "react-icons/ai";

const Modal = (props) => {
  return (
    <div className="fixed h-screen w-screen">
      <AiFillCloseCircle
        className="absolute right-10 top-5 z-10 text-2xl cursor-pointer"
        onClick={props.toogle}
      />
      <div>
        <img
          src={props.url}
          alt={props.url}
          className="h-screen w-screen fixed"
        />
      </div>
    </div>
  );
};

export default Modal;
