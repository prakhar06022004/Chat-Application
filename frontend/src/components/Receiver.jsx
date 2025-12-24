function Receiver({ image, message }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[70%] bg-white rounded-2xl px-3 py-1 shadow-sm shadow-gray-300 mt-4 rounded-tl-none ">
        {image && (
          <img
            src={image}
            className="md:w-[200px] md:h-[200px] h-[150px] w-[150px] object-cover"
          />
        )}
        {message && <span className="">{message}</span>}
      </div>
    </div>
  );
}

export default Receiver;
