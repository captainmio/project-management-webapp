import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { errorNotification } from "./ui/notification";
import { Loader2Icon } from "lucide-react";
import { useLoading } from "@/hooks/useLoading";

export type submitData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
interface Signup2Props {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  onSubmit: (data: submitData) => Promise<void>;
}

const Signup2 = ({
  heading = "Signup",
  buttonText = "Create Account",
  signupText = "Already a user?",
  signupUrl = "/",
  onSubmit: submit
}: Signup2Props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const [loading, setLoading] = useState(false);
  const loadingState = useLoading();
  const { loading, startLoading, stopLoading } = loadingState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    startLoading();
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // validate that password and confirmPassword match
    if (password !== confirmPassword) {
      errorNotification("Passwords do not match");
      return;
    }

    // validate that password and confirmPassword are more than 6 characters
    if (password.length < 6 || confirmPassword.length < 6) {
      errorNotification("Password must be at least 6 characters long");
      stopLoading();
      return;
    } 

    // these just to add some delay to the form submission
    setTimeout(() => {
      submit({ name, email, password });
      stopLoading();
    }, 1000);
  };

  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <form onSubmit={handleSignup} className="w-full">
              <div className="flex w-full flex-col gap-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  className="text-sm"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </div>
              <div className="flex w-full flex-col gap-2 pt-3">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="text-sm"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="flex w-full flex-col gap-2 pt-3">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="text-sm"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>
              <div className="flex w-full flex-col gap-2 pt-3 pb-7">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Password"
                  className="text-sm"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer"
              >
                {loading && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? "Please wait" : buttonText}
              </Button>
            </form>
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export {Signup2};
