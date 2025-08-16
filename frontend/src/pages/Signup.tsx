import { signUp } from "@/api/auth";
import { Signup2, type submitData } from "@/components/signup2";


const Signup = () => {

  const handleSignup = async ({name, email, password} : submitData) => {
    const result = await signUp(name, email, password)
    console.log("Signup Result:", result);
  };


  return (<>
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full">
          <Signup2 onSubmit={handleSignup}/>
        </div>
      </div>
  </>);
};

export default Signup;
