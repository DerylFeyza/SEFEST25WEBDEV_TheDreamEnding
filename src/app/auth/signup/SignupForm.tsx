"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { handleUserSignup } from "@/app/utils/actions/user";
import { z } from "zod";
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

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUpSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    const loadingId = toast.loading("Signing up...");

    const validationResult = signUpSchema.safeParse({
      name: name,
      email: email,
      password: password,
    });
    if (!validationResult.success) {
      const validationErrors = validationResult.error.format();
      const errorMessages = Object.values(validationErrors)
        .map((fieldError) =>
          Array.isArray(fieldError) ? fieldError[0] : fieldError?._errors?.[0]
        )
        .filter((message) => message)
        .join("\n");

      setLoading(false);
      return toast.error(errorMessages, { id: loadingId });
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      const result = await handleUserSignup(formData);
      if (result.success === false) {
        setLoading(false);
        return toast.error(result.message || "Unexpected Error", {
          id: loadingId,
        });
      }
      setLoading(false);
      return toast.success("Signup successful! Please login", {
        id: loadingId,
      });
    } catch (error) {
      setLoading(false);
      console.log("Error signing up: " + (error as Error).message);
      return toast.error(
        "An unexpected error occurred. Please try again later.",
        {
          id: loadingId,
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow px-6 bg-green-100">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-green-800">
            Create Your Account
          </CardTitle>
          <CardDescription>
            Join EcoRent and start renting sustainably
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="right-2 top-1/2 absolute -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="right-2 top-1/2 absolute -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="hover:bg-green-700 w-full bg-green-600"
            >
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="hover:underline font-medium text-green-600"
            >
              Login now
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
