const Sender = ({ image, message }) =>{
  return (
    <div className="flex justify-end mt-3">
      <div className="bg-white max-w-[70%] px-3 py-2 rounded-2xl rounded-tr-none shadow-sm shadow-gray-300">
        {image && (
          <img
            src={image}
            className="md:w-[200px] md:h-[200px] h-[150px] w-[150px] object-cover rounded-2xl mb-2"
          />
        )}
        {message && <span>{message}</span>}
      </div>
    </div>
  );
}

export default Sender;
