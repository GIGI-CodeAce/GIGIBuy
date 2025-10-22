
function Checkout() {
  return (
    <main>
  <div className="inset-0 z-0 h-[72vh] opacity-10 absolute w-full bg-[url('./assets/rotatediamond.png')] bg-[length:90px_90px] bg-repeat"></div>
      <div className="relative h-[60vh] pb-10 flex items-center justify-center">
        <div className="text-center bg-[#e9c6be] w-[90%] max-w-xl p-8 rounded-lg shadow-md">
          <h1 className="text-[25px] font-bold">Oops!</h1>
          <p className="text-lg mt-2">
            This is a showcase website. Purchases and deliveries are unavailable.  
            Thanks for stopping by!
          </p>
        </div>
      </div>
    </main>
  );
}

export default Checkout
