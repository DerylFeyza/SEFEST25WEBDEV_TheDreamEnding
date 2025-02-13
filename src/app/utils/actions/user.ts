"use server";
import { revalidatePath } from "next/cache";
import { createUser } from "../database/user.query";
import { encrypt } from "../bcrypt";

interface userField {
	name: string;
	email: string;
	password?: string;
}

export const handleCreateUser = async (formData: FormData) => {
	try {
		const hashedPassword = await encrypt(formData.get("password") as string);
		const userData = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			password: hashedPassword,
		};

		await createUser(userData);
		revalidatePath("/", "layout");
		return { success: true, message: "Berhasil membuat user" };
	} catch (error) {
		//@ts-expect-error error type
		if (error.code === "P2002") {
			return {
				success: false,
				message: "Email sudah terdaftar",
			};
		}
		return { success: false, message: "Gagal membuat user" };
	}
};
