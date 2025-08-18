import { login } from "@/api/auth";
import { LoginForm, type loginData } from "@/components/login-form";

export const Login = () => {

  const handleSubmit = async ({email, password}: loginData) => {
    // Handle login logic here
    console.log("Login data submitted:", { email, password });

    const result = await login(email, password);

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