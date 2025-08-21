import { login } from "@/api/auth";
import { LoginForm, type loginData } from "@/components/login-form";
import { errorNotification, successNotification } from "@/components/ui/notification";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async ({email, password}: loginData) => {
    // Handle login logic here

    const result = await login(email, password);

    if(!result.success) {
      errorNotification(result.message || "Signup failed");
    } else {
      successNotification("Signup successful!");

      // redirect user to main page

      // save the token in local storage
      localStorage.setItem("token", result.data.token as string);

      navigate('/main');
    }

    console.log(result)
  };

  return (<>
    <section className="bg-muted h-screen">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm onSubmit={handleSubmit}/>
        </div>
      </div>
    </section>
  </>);
};

export default Login;