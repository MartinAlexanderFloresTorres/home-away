'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
    FieldValues, 
    SubmitHandler,
    useForm
} from "react-hook-form";

import Modal from "./Modal"
import useProfileModal from "@/app/hooks/useProfileModal"
import useLoginModal from "@/app/hooks/useLoginModal";

import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import axios from "axios";
import { SafeUser } from "@/app/types";

interface ProfileModalProps {
    currentUser: SafeUser | null;
}


const ProfileModal: React.FC<ProfileModalProps> = ({ currentUser }) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const profileModal = useProfileModal();
    const [isLoading, setIsLoading] = useState(false);  

    const { 
        register, 
        handleSubmit,
        setValue,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
            currentUser,
            name: currentUser?.name ?? "",
            phoneNumber: currentUser?.phoneNumber ?? "",
            idCard: currentUser?.idCard ?? "",
          },
      });    

      const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      };

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
    
        axios.post('/api/perfil', data)
        .then(() => {
          toast.success('¡Actualizado con exitoso!');
          router.refresh();
          profileModal.onClose();
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        })
      }

    const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title='¡Actualiza tu perfil!'
            subtitle='Completa los siguientes campos para actualizar tu perfil.'
          />
          <Input
            id="name"
            label="Nombre"
            disabled={isLoading}
            register={register}
            onChange={(e) => setCustomValue("name", e.target.value)}
            errors={errors}
            required
            />
          <Input
            id="phoneNumber"
            label="Número de teléfono"
            disabled={isLoading}
            onChange={(e) => setCustomValue("phoneNumber", e.target.value)}
            register={register}
            errors={errors}
          />
          <Input
            id="idCard"
            label="Cédula/Identificación"
            disabled={isLoading}
            onChange={(e) => setCustomValue("idCard", e.target.value)}
            register={register}
            errors={errors}
          />
        </div>
      )      

    return (
        <Modal 
            disabled={isLoading}
            isOpen={profileModal.isOpen}
            onClose={profileModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Editar perfil"
            actionLabel="Guardar cambios"
            body={bodyContent}
        />
    )
}

export default ProfileModal
