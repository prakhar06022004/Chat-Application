import emptyImage from "../assets/emptyImage.png";

function Receiver() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[70%] bg-white rounded-2xl px-3 py-1 shadow-sm shadow-gray-300 mt-4 rounded-tl-none ">
        <img
          src={emptyImage}
          className="md:w-[190px] md:h-[190px] h-[150px] w-[150px] object-cover mt-2"
        />
        <span>Reciever</span>
      </div>
    </div>
  );
}

export default Receiver;
