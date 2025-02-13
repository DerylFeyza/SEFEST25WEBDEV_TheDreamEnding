"use server";
import { revalidatePath } from "next/cache";
import { createUser } from "../database/user.query";
import { Role } from "@prisma/client";
import { encrypt } from "../bcrypt";

interface userField {
	nama_user: string;
	role: Role;
	username: string;
	password?: string;
}

export const handleCreateUser = async (formData: FormData) => {
	try {
		const hashedPassword = await encrypt(formData.get("password") as string);
		const userData = {
			nama_user: formData.get("nama_user") as string,
			role: formData.get("role") as Role,
			username: formData.get("username") as string,
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
				message:
					"Username sudah terdaftar dalam aplikasi atau terdapat dalam transaksi",
			};
		}
		return { success: false, message: "Gagal membuat user" };
	}
};
