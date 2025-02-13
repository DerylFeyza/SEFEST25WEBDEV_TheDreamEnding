"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BellIcon } from "lucide-react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Updating profile...");

    try {
      // Update the session
      console.log(name, email);

      const response = await update({ name, email });
      console.log(response);

      toast.success("Profile updated successfully", { id: loadingToast });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-green-800">
                {session?.user?.name}
              </CardTitle>
              <CardDescription>{session?.user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <form onSubmit={handleUpdateProfile} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
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
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="hover:bg-green-700 bg-green-600"
                >
                  Update Profile
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="settings">
              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold text-green-800">
                  Notification Preferences
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellIcon className="text-green-600" />
                    <span>Email Notifications</span>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
                <Separator />
                <h3 className="text-lg font-semibold text-green-800">
                  Account Security
                </h3>
                <Button variant="outline">Change Password</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
