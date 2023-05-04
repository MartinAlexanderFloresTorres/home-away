'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  accomodationClass: string;
  accomodationType: string;
  guestCount: number;
  roomCount: number;
  bedCount: number;
  bathroomCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  accomodationClass,
  accomodationType,
  guestCount,
  roomCount,
  bedCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row flex-wrap items-center gap-2">
          <div>{accomodationClass}: {accomodationType}. </div>
          <div>
            Anfitrión: {user.name && (user.name.indexOf(" ") >= 0 
              ? user.name.substring(0, user.name.indexOf(" "))
              : user.name)}
          </div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center flex-wrap gap-4 font-light text-neutral-500">
          <div>
            {guestCount} {guestCount > 1 ? 'huéspedes' : 'huésped'}
          </div>
          <div>
            {roomCount} {roomCount > 1 ? 'habitaciones' : 'habitación'}
          </div>
          <div>
            {bedCount} {bedCount > 1 ? 'camas' : 'cama'}
          </div>
          <div>
            {bathroomCount} {bathroomCount > 1 ? 'baños' : 'baño'}
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
   );
}
 
export default ListingInfo;