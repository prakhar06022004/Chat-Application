import { useSelector } from "react-redux";
import emptyImage from "./../assets/emptyImage.png";
const Sender = ({ image, message }) => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="flex justify-end mt-3 gap-1">
      <div className="bg-white max-w-[70%] px-3 py-2 rounded-2xl rounded-tr-none shadow-sm shadow-gray-300">
        {image && (
          <img
            src={image}
            className="md:w-[200px] md:h-[200px] h-[150px] w-[150px] object-cover rounded-2xl mb-2"
          />
        )}
        {message && <span>{message}</span>}
      </div>
      <div className=" w-0 h-0 md:w-[30px] md:h-[30px] rounded-full relative cursor-pointer">
        <img
          src={userData?.image || emptyImage}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Sender;
