function Error({ message }: { message: string }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 flex items-center gap-3">
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );

}


export default Error;