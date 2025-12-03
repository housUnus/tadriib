"use client";

import React, { useContext } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import Image from "next/image";
import CardBox from "@/app/components/shared/CardBox";
import { UserDataContext } from "@/app/context/UserDataContext/index";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PortfolioCards = () => {
  const { gallery }: any = useContext(UserDataContext);
  const [search, setSearchLocal] = React.useState("");

  const filterPhotos = (photos: any[], cSearch: string) => {
    if (photos)
      return photos.filter((t: { name: string }) =>
        t.name.toLowerCase().includes(cSearch.toLowerCase())
      );
    return photos;
  };

  const getPhotos = filterPhotos(gallery, search);

  return (
    <>
      {/* Header Section */}
      <div className="md:flex justify-between mb-6">
        <h5 className="text-2xl flex gap-3 items-center sm:my-0 my-4">
          Portfolio{" "}
          <Badge
            variant="secondary"
            className="text-xs px-2 py-1 rounded-md"
          >
            {getPhotos.length}
          </Badge>
        </h5>

        {/* ShadCN Input */}
        <div className="relative md:w-1/3 w-full">
          <Icon
            icon="solar:magnifer-line-duotone"
            height={18}
            className="absolute left-3 top-3 text-muted-foreground"
          />
          <Input
            type="text"
            placeholder="Search Gallery"
            className="pl-9"
            onChange={(e) => setSearchLocal(e.target.value)}
          />
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-12 gap-7">
        {getPhotos.map((photo) => (
          <div
            className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12"
            key={photo.id}
          >
            <CardBox className="overflow-hidden p-0 card-hover">
              {/* Image Section */}
              <div className="h-[220px] overflow-hidden">
                <Image
                  src={photo.cover}
                  height={220}
                  width={500}
                  alt="gallery"
                  className="object-center object-cover h-full w-full"
                />
              </div>

              {/* Info Section */}
              <div className="pt-4 p-6 flex items-center">
                <div>
                  <h6 className="text-sm font-medium">{photo.name}.jpg</h6>
                  <p className="text-xs font-medium text-muted-foreground">
                    {format(new Date(photo.time), "E, MMM d, yyyy")}
                  </p>
                </div>

                {/* ShadCN Dropdown */}
                <div className="ms-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-muted cursor-pointer">
                        <TbDotsVertical size={22} />
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="flex gap-3">
                        <span>{photo.name}.jpg</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardBox>
          </div>
        ))}
      </div>
    </>
  );
};

export default PortfolioCards;
