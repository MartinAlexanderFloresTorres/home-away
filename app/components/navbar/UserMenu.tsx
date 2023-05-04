'use client';

import { useEffect, useRef, useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import useProfileModal from "@/app/hooks/useProfileModal";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const profileModal = useProfileModal();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
              setIsOpen(false);
          }
      };

      if (isOpen) {
          window.addEventListener('click', handleClickOutside);
      }

      return () => {
          window.removeEventListener('click', handleClickOutside);
      };
  }, [isOpen]);

  return ( 
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-rose-500 hover:text-white transition cursor-pointer hover:shadow-md"
        >
          Mibnb una propiedad
        </div>
        <div 
        onClick={toggleOpen}
        className="p-4 md:py-1 md:px-2 bortder-[1px] rounded-full border-neutral-200 flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-sm w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-10'>
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="Mis viajes" 
                  onClick={() => router.push('/viajes')}
                />
                <MenuItem 
                  label="Mis favoritos" 
                  onClick={() => router.push('/favoritos')}
                />
                <MenuItem 
                  label="Mis reservaciones" 
                  onClick={() => router.push('/reservaciones')}
                />
                <MenuItem 
                  label="Mis propiedades" 
                  onClick={() => router.push('/propiedades')}
                />
                <MenuItem 
                  label="Mibnb una propiedad" 
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Cuenta" 
                  onClick={() => router.push('/perfil')}
                />
                <MenuItem 
                  label="Cerrar sesión" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Iniciar sesión" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Regístrate" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;