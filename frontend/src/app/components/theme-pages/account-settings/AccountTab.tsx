import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UpdatePassword from "./forms/UpdatePassword";
import { auth } from "@/auth";
import UpdateProfile from "./forms/UpdateProfile";
import { useServerFetch } from "@/hooks/auth/user-server-fetch";
import { UserInput } from "@/lib/schemas/users";

const AccountTab = async () => {

  const session = await auth();
  const user_id = session?.user?.id
  const client = await useServerFetch();
  const { data: rawUser, error } = await client.get(`/users/${user_id}/`);
  const user = rawUser as UserInput;

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="md:col-span-6 col-span-12 h-full">
          <Card className="border shadow-xs h-full flex justify-between flex-col">
            <div className="head">
              <h5 className="card-title mb-1">Change Profile</h5>
              <p className="card-subtitle">
                Change your profile picture from here
              </p>
            </div>
            <div className="mx-auto text-center mt-5">
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden">
                <Image
                  unoptimized
                  src={user?.avatar || "/images/avatars/avatar-m-1.png"}
                  alt="avatar"
                  fill
                  className="rounded-full mx-auto"
                />
              </div>
              {/* <div className="flex justify-center gap-3 py-6">
                <Button>Upload</Button>
                <Button variant={"lighterror"}>Reset</Button>
              </div>
              <p className="text-sm text-ld">
                Allowed JPG, GIF or PNG. Max size of 800K
              </p> */}
              <p className="text-base text-ld font-bold">@{user?.first_name} {user?.last_name}</p>
              <p className="text-sm text-ld">Student</p>
            </div>
          </Card>
        </div>
        <div className="md:col-span-6 col-span-12 h-full">
          <Card className="border shadow-xs">
            <h5 className="card-title mb-1">Change Password</h5>
            <p className="card-subtitle">
              To change your password please confirm here
            </p>
            <UpdatePassword user={user} />
          </Card>
        </div>

        <div className="col-span-12">
          <Card className="border shadow-xs">
            <h5 className="card-title mb-1">Personal Details</h5>
            <p className="card-subtitle">
              To change your personal detail , edit and save from here
            </p>
            <UpdateProfile user={user} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default AccountTab;
