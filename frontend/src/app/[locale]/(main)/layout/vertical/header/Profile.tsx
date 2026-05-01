"use client"
import React from "react";
import { Icon } from "@iconify/react";
import * as profileData from "./Data";
import Link from "next/link";
import Image from "next/image";
import SimpleBar from "simplebar-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/lib/actions/auth";
import { ActionButton } from "@/components/common/forms/generic/action-button";
import { useUserStore } from "@/stores/user";
import { getMe, switchRole } from "@/lib/actions/users";
import { useSession } from "next-auth/react";

const Profile = () => {

  const user = useUserStore(s => s.user)
  const {data: session, update } = useSession();

  return (
    <div className="relative group/menu">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <Image
              unoptimized
              src={user?.avatar || "/images/profile/user-1.jpg"}
              alt="logo"
              height="35"
              width="35"
              className="rounded-full"
            />
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-[90vw] max-w-[250px] pt-4 px-0 rounded-sm ">
          {/* Header */}
          <Link href="/account/settings">
            <div className="px-6">
              <div className="flex items-center gap-6 pb-5 border-b border-border dark:border-darkborder mt-2 mb-2">
                <Image
                  unoptimized
                  src={user?.avatar || "/images/profile/user-1.jpg"}
                  alt="logo"
                  height="40"
                  width="40"
                  className="rounded-full"
                />
                <div>
                  <h6 className="card-title hover:text-primary">{user?.first_name} {user?.last_name}</h6>
                  <p className="card-subtitle mb-0 flex items-center">
                    {user?.active_role}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Dropdown items */}
          <SimpleBar>
            {profileData.profileDD.map((items, index) => {
              return (
                <DropdownMenuItem
                  key={index}
                  asChild
                  className="px-6 py-2 flex justify-between items-center bg-hover group/link w-full cursor-pointer"
                >
                  <Link href={items.url} className="flex items-center w-full">
                    <div className="flex items-center w-full">
                      <Icon icon={items.icon} height={14} width={14} className={'text-muted-foreground'} />
                      <div className="ps-4 flex justify-between w-full">
                        <div className="w-3/4">
                          <h5 className="mb-0 text-sm group-hover/link:text-primary text-muted-foreground">
                            {items.title}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </SimpleBar>

          <div className="border border-t border-b-0">
            {user?.can_switch_role &&
              <div className="flex items-center bg-hover group/link px-6">
                <Icon icon="solar:users-group-rounded-bold" height={14} width={14} className={'text-muted-foreground'} />
                <ActionButton action={switchRole} onActionDone={async () => {
                  const new_user = await getMe()
                  await update({ user: new_user}); 
                  window.location.reload()
                }} className="w-full rounded-full no-underline! flex justify-start" variant={'link'}>
                  Switch Role
                </ActionButton>
              </div>
            }
            <div className="flex items-center bg-hover group/link px-6">
              <Icon icon="solar:logout-2-line-duotone" height={14} width={14} className={'text-muted-foreground'} />
              <ActionButton action={logoutAction} className="w-full rounded-full no-underline! flex justify-start" variant={'link'}>
                Logout
              </ActionButton>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
