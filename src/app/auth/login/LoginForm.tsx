"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegularSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loading = toast.loading("Logging In...");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setLoading(false);
        return toast.error("Invalid Email Or Password", { id: loading });
      } else {
        router.push("/");
        setLoading(false);
        return toast.success("Login successful!", { id: loading });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error("Something Went Wrong!", { id: loading });
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-[400px] ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-green-800">
            Login
          </CardTitle>
          <CardDescription>Welcome back to EcoRent</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegularSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="hover:bg-green-700 w-full bg-green-600"
            >
              Login
            </Button>
          </form>

          <div className="mt-6">
            <Separator className="my-4" />
            <Button
              disabled={loading}
              onClick={() => signIn("google", { callbackUrl: "/" })}
              variant="outline"
              className="w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Login with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
