"use client";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { EyeClosed, Eye } from "lucide-react";
import { handleUserSignup } from "@/app/utils/actions/user";
import { z } from "zod";
import { toast } from "sonner";
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
			return toast.error("Password tidak cocok");
		}
		const loading = toast.loading("signing up...");

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
			return toast.error(errorMessages, { id: loading });
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
					id: loading,
				});
			}
			setLoading(false);
			return toast.success("Signup successful! silahkan login", {
				id: loading,
			});
		} catch (error) {
			setLoading(false);
			console.log("Error signing up: " + (error as Error).message);
			return toast.error(
				"An unexpected error occurred. Please try again later.",
				{
					id: loading,
				}
			);
		}
	};

	return (
		<>
			<Head>
				<title>Signup</title>
			</Head>
			<div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
				<h1 className="text-xl font-bold mb-1 ">Buat Akun Anda!</h1>
				<p className="text-gray-500 mb-6 text-xs  text-center">
					Daftarkan diri Anda untuk mendapatkan akses ke berbagai fitur dan
					layanan.{" "}
				</p>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-full max-w-sm bg-transparent"
				>
					<label htmlFor="name" className="mb-1 text-sm font-medium">
						Name
					</label>
					<input
						id="name"
						type="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="name"
						className="focus:ring focus:outline-none px-4 py-2 mb-4 text-sm border rounded-lg"
						required
					/>
					<label htmlFor="email" className="mb-1 text-sm font-medium">
						Email
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="focus:ring focus:outline-none px-4 py-2 mb-4 text-sm border rounded-lg"
						required
					/>

					<label htmlFor="password" className="mb-1 text-sm font-medium">
						Password
					</label>
					<div className="relative mb-4">
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							className="focus:ring focus:outline-none w-full px-4 py-2 text-sm border rounded-lg"
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-2.5 text-gray-500"
						>
							{showPassword ? <EyeClosed /> : <Eye />}
						</button>
					</div>

					<label htmlFor="confirmPassword" className="mb-1 text-sm font-medium">
						Konfirmasi Password
					</label>
					<div className="relative mb-6">
						<input
							id="confirmPassword"
							type={showConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Konfirmasi Password"
							className="focus:ring focus:outline-none w-full px-4 py-2 text-sm border rounded-lg"
							required
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute right-3 top-2.5 text-gray-500"
						>
							{showConfirmPassword ? <EyeClosed /> : <Eye />}
						</button>
					</div>

					<button
						disabled={loading}
						type="submit"
						className="bg-primary hover:bg-red-700 py-2 mb-4 font-medium text-center text-white rounded-lg"
					>
						Daftar
					</button>

					<p className="text-sm text-center text-gray-500">
						Sudah punya akun?{" "}
						<Link
							href="/auth/login"
							className="text-primary hover:underline font-medium"
						>
							Masuk sekarang!
						</Link>
					</p>
				</form>
			</div>
		</>
	);
}
