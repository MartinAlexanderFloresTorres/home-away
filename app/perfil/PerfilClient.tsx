"use client";

import { useEffect } from "react";
import Image from "next/image";

import useProfileModal from "@/app/hooks/useProfileModal";
import { SafeUser } from "@/app/types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import useLoginModal from "../hooks/useLoginModal";
import useAvatarModal from "../hooks/useAvatarModal";
import { BsPencilSquare } from "react-icons/bs";
import { TbPhotoEdit } from "react-icons/tb";
import { FcDataProtection, FcAcceptDatabase } from "react-icons/fc";

interface PerfilClientProps {
  currentUser?: SafeUser | null;
}

const PerfilClient: React.FC<PerfilClientProps> = ({ currentUser }) => {
  const profileModal = useProfileModal();
  const avatarModal = useAvatarModal();
  const loginModal = useLoginModal();

  useEffect(() => {
    if (currentUser === null) {
      loginModal.onOpen();
    }
  }, [currentUser]);

  return (
    <Container>
      <Heading title="Información personal" subtitle="" />
      <div className="flex flex-col md:flex-row gap-8 justify-between mt-5">
        <div className="md:flex md:flex-col md:min-w-[70%] lg:min-w-[75%] p-5 text-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="m-auto text-center">
            {currentUser?.image ? (
              <Image
                src={currentUser?.image}
                width={250}
                height={250}
                alt="Foto de perfil"
              />
            ) : (
              <Image
                src="/images/placeholder.jpg"
                width={250}
                height={250}
                alt="Foto de perfil"
              />
            )}
            <p className="flex text-base underline hover:cursor-pointer" onClick={() => avatarModal.onOpen(currentUser!)}>Editar foto 
                <span><TbPhotoEdit size={20} /></span>
            </p>
            </div>
            <div className="text-xl font-bold lg:col-span-2">
                <div className="flex justify-between gap-8">
                    <div className="mb-4">
                    Nombre legal
                    <div className="font-normal">{currentUser?.name}</div>
                    </div>
                    <div className="underline hover:cursor-pointer" onClick={() => profileModal.onOpen(currentUser!)}>
                    <p className="flex text-sm font-normal">Editar datos<BsPencilSquare size={20} /></p>
                    </div>
                </div>
                <hr />
                <div className="mt-4 mb-4">
                    Correo electrónico
                    <div className="font-normal text-neutral-600">{currentUser?.email}</div>
                </div>
                <hr />
                <div className="mt-4 mb-4">
                    Número de teléfono
                    <div className="font-normal text-neutral-600">
                        {currentUser?.phoneNumber ? (
                            <p className="font-normal">
                                {currentUser?.phoneNumber}
                            </p>
                        ) : (
                        <p className="text-lg">
                            Agrega un número para que los huéspedes con reservaciones
                            confirmadas y Mibnb puedan ponerse en contacto contigo.
                        </p>
                        )}    
                    </div>
                </div>
                <hr />
                <div className="mt-4 mb-4">
                    Identificación oficial
                    <div className="font-normal text-neutral-600">
                        {currentUser?.idCard ? (
                            <p className="font-normal">{currentUser?.idCard}</p>
                            ) : (
                            <p className="text-lg">No se proporciona.</p>
                        )}    
                    </div>
                </div>
                <hr />
            </div>
          </div>
        </div>
        <div className="w-3/8 border-[1px] p-5 rounded-lg shadow-sm">
          <div className="m-5">
          <FcDataProtection size={52} />
            <p className="text-2xl font-bold mt-2">
              ¿Por qué mi información no aparece aquí?
            </p>
            <p className="mt-2 text-lg text-neutral-500">
              Para proteger tu identidad, ocultamos algunos datos de la cuenta.
            </p>
          </div>
          <hr />
          <div className="m-5">
            <FcAcceptDatabase size={52} />
            <p className="text-2xl font-bold">¿Qué datos se pueden editar?</p>
            <p className="mt-2 text-lg text-neutral-500">
              No se pueden modificar los datos que Mibnb utiliza para verificar
              tu identidad. Aunque puedes modificar tus datos personales y de
              contacto, podríamos pedirte que verifiques tu identidad la próxima
              vez que hagas una reservación o crees un anuncio.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PerfilClient;
