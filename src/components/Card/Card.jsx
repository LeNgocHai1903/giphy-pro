import "./Card.css";
import { FaHeart, FaComment, FaEye } from "react-icons/fa";

const BACKUP_IMAGE =
  "https://media4.giphy.com/avatars/studiosoriginals/j3JBzK5twdv8.jpg";
const BACKUP_NAME = "unknown_name";

const Card = (props) => {
  return (
    <div onClick={props.openModal} ref={props.gifsRef}>
      <div className="card-item">
        <div className="flex justify-center cursor-pointer">
          <img
            className="card-image md:p-2 p-1"
            alt={props.giphy.url}
            src={props.giphy.url}
          />
        </div>
        <div className="flex justify-end">
          <div className="flex flex-row items-center p-2">
            <FaHeart />
            <span>0</span>
          </div>
          <div className="flex flex-row items-center p-2">
            <FaEye />
            <span>0</span>
          </div>
          <div className="flex flex-row items-center p-2">
            <FaComment />
            <span>0</span>
          </div>
        </div>
      </div>
      <div className="flex items-center ml-4">
        <img
          alt="avatar"
          src={props.userAvatar ? props.userAvatar : BACKUP_IMAGE}
          className="user-avatar"
        />
        <a href={props.userLink} className="text-blue-500">
          {props.userName ? props.userName : BACKUP_NAME}
        </a>
      </div>
    </div>
  );
};

export default Card;
