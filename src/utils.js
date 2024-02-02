import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormErrorsBox from "./components/common/FormErrorsBox";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

export function schemaValidation(schema, obj) {
  return schema.validate(obj, { abortEarly: false });
}

export function renderErrorsAlertBox(errors, className) {
  return errors && <FormErrorsBox errors={errors} className={className} />;
}

export function renderErrorWarningIcon(errors) {
  return (
    errors && (
      <FontAwesomeIcon
        icon={faExclamationCircle}
        className="text-red-700 mr-5 text-2xl"
      />
    )
  );
}

export function formatISODate(isoDate) {
  const date = new Date(isoDate);
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${day}-${month}-${date.getFullYear()}`;
}

export function setHeaders(headers) {
  const cookies = new Cookies();

  const accessToken = cookies.get("accessToken");

  if (accessToken) {
    return {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return headers;
  }
}

export function getAPIURL() {
  if (process.env.NODE_ENV === "development")
    return process.env.REACT_APP_API_DEV_URL;
  else if (process.env.NODE_ENV === "production")
    return process.env.REACT_APP_API_PROD_URL;
}

export function getAPIImagesURL() {
  if (process.env.NODE_ENV === "development")
    return process.env.REACT_APP_API_IMAGES_DEV_URL;
  else if (process.env.NODE_ENV === "production")
    return process.env.REACT_APP_API_IMAGES_PROD_URL;
}
