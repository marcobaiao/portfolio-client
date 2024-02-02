import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorAlert from "./ErrorAlert";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function FormErrorsBox({ errors, className = "w-fit" }) {
  return (
    <ErrorAlert className={className}>
      <ul>
        {errors.map((error) => (
          <div key={error.message} className="flex items-center my-0.5">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-red-800 mr-3"
            />
            <li className="font-semibold">{error.message}</li>
          </div>
        ))}
      </ul>
    </ErrorAlert>
  );
}

export default FormErrorsBox;
