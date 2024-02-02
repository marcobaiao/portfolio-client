import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ErrorAlert from "./ErrorAlert";

function LoginError({ errorMessage }) {
  return (
    errorMessage && (
      <ErrorAlert className="w-[400px]">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="mr-2 text-2xl text-red-700"
        />
        <span className="text-red-700 font-semibold">{errorMessage}</span>
      </ErrorAlert>
    )
  );
}

export default LoginError;
