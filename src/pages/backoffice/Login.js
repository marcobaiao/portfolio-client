import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import TextInput from "../../components/common/inputs/TextInput";
import LoginError from "../../components/common/LoginError";
import Button from "../../components/common/Button";
import { schemaValidation } from "../../utils";
import { loginSchema } from "../../joi-schemas";
import { login } from "../../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  // Function to validate the form according to login schema
  function validate() {
    return schemaValidation(loginSchema, { email: email, password: password });
  }

  // Validating form and log in
  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill email and password.");
      return;
    }

    const validation = validate();

    if (!validation.error) {
      login({ email: email, password: password }).then((res) => {
        if (res.status === "success") {
          const cookies = new Cookies();

          cookies.set("accessToken", res.accessToken);
          navigate("/admin/general");
          setErrorMessage(null);
        } else setErrorMessage("Invalid credentials");
      });
    } else setErrorMessage("Invalid credentials");
  }

  return (
    <section className="h-screen bg-blue-50 flex flex-col justify-center items-center">
      <h1 className="mb-14 text-blue-700 text-5xl font-semibold font-heading text-[3.5rem]">
        Admin Panel
      </h1>

      <LoginError errorMessage={errorMessage} />

      <form onSubmit={handleLogin} className="flex flex-col w-[400px]">
        <TextInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-1"
        />

        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2"
        />

        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
    </section>
  );
}

export default Login;
