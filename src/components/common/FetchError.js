import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

function FetchError() {
  function handleReload() {
    window.location.reload(false);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center flex flex-col items-center p-10 w-full sm:w-[500px]">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="text-red-700 text-6xl mb-5"
        />
        <h1 className="text-3xl font-semibold mb-5">
          Something went wrong {String.fromCodePoint("0x1F614")}
        </h1>
        <p className="text-center text-xl mb-5">
          There was an unexpected error when trying to fetch the data. Please
          try again later.
        </p>
        <Button className="w-fit" onClick={handleReload}>
          Try again
        </Button>
      </div>
    </div>
  );
}

export default FetchError;
