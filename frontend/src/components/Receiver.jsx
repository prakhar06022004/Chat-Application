import { useSelector } from "react-redux";
import emptyImage from "./../assets/emptyImage.png";
function Receiver({ image, message  }) {
    const { selectedUser } = useSelector((state) => state.user);

  return (
    <div className="flex justify-start gap-1">
       <div className="w-0 h-0 md:w-[30px] md:h-[30px] rounded-full relative cursor-pointer top-4">
              <img
                src={selectedUser?.image || emptyImage}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
      <div className="max-w-[70%] bg-white rounded-2xl px-3 py-1 shadow-sm shadow-gray-300 mt-4 rounded-tl-none ">
        {image && (
          <img
            src={image}
            className="md:w-[200px] md:h-[200px] h-[150px] w-[150px] object-cover"
          />
        )}
        {message && <span>{message}</span>}
      </div>
    </div>
  );
}

export default Receiver;
