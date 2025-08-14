import { Signup2 } from "@/components/signup2";
const Signup = () => {
  return <>
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full">
          <Signup2 logo={{
            url: "",
            src: "",
            alt: "",
            title: "Signup page"
          }} />
        </div>
      </div>
  </>;
};

export default Signup;
