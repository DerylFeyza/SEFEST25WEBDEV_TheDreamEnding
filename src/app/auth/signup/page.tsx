import { redirect } from "next/navigation";
import SignupForm from "./SignupForm";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
export default async function Signup() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex flex-grow">
      <SignupForm />
    </div>
  );
}
