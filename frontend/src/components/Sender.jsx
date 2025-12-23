import emptyImage from "../assets/emptyImage.png";

function Sender() {
  return (
    <div className="flex justify-end mt-3">
      <div className='bg-white max-w-[70%] px-3 py-2 rounded-2xl rounded-tr-none shadow-sm shadow-gray-300'>
        <img
          src={emptyImage}
          className="md:w-[200px] md:h-[200px] h-[150px] w-[150px] object-cover"
        />
        <span className="">Hello its sender </span>
      </div>
    </div>
  );
}

export default Sender;
