const Anpc = () => {
  return (
    <div className="w-full bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div
          className="
          flex flex-wrap items-center justify-center
          gap-4 md:gap-6
        "
        >
          <img
            src="/ma_symbol_opt_73_3x.png"
            alt="Mastercard"
            className="h-6 object-contain"
          />

          <img
            src="/Visa_Brandmark_Blue_RGB_2021.png"
            alt="Visa"
            className="h-6 object-contain"
          />

          <img
            src="/Powered%20by%20Stripe%20-%20black.svg"
            alt="Powered by Stripe"
            className="h-6 object-contain"
          />

          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img
              src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sal.svg"
              alt="Solutionarea Alternativa a Litigiilor"
              className="h-8 object-contain"
            />
          </a>

          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <img
              src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sol.svg"
              alt="Solutionarea Online a Litigiilor"
              className="h-8 object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Anpc;
