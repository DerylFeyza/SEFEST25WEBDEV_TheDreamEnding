"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
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
			return toast.error("Something Went Wrong !", { id: loading });
		}
	};

	return (
		<main className="min-h-screen flex flex-col">
			<div className="flex-grow flex items-center justify-center px-4 lg:px-20">
				<div className="bg-white max-w-[624px] w-full py-[72px] md:py-[92px] px-[24px] md:px-[88px] flex flex-col items-center mx-auto shadow-lg rounded-lg">
					<h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
						Login
					</h2>
					<form
						onSubmit={handleRegularSignIn}
						className="w-full space-y-4 mb-6"
					>
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<button
							disabled={loading}
							type="submit"
							className="w-full bg-[#C1121F] hover:bg-[#A30F1A] text-white font-bold py-2 px-4 rounded-md transition duration-300"
						>
							Login
						</button>
					</form>

					<div className="w-full text-center mb-4">
						<span className="text-gray-500">Or</span>
					</div>

					<button
						disabled={loading}
						onClick={() => signIn("google", { callbackUrl: "/" })}
						className="flex items-center gap-x-4 w-full justify-center bg-white text-gray-700 border border-gray-300 font-medium py-2 px-4 rounded-full hover:bg-gray-50 transition duration-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
						</svg>
						<span>Login dengan Google</span>
					</button>
				</div>
			</div>
		</main>
	);
}
