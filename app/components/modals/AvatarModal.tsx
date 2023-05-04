"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useAvatarModal from "@/app/hooks/useAvatarModal";
import Modal from "./Modal";
import Heading from "../Heading";

import ImageUpload from "../inputs/ImageUpload";
import { SafeUser } from "@/app/types";
import axios from "axios";

interface AvatarModalProps {
  currentUser: SafeUser | null;
}

const AvatarModal: React.FC<AvatarModalProps> = ({ currentUser }) => {
  const router = useRouter();
  const avatarModal = useAvatarModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      image: "",
      currentUser,
    },
  });

  const image = watch("image");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/avatar", data)
      .then(() => {
        toast.success("Avatar actualizado");
        router.refresh();
        reset();
        avatarModal.onClose();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Cargar nueva imagen de perfil"
        subtitle="Elige una imagen de perfil que te represente"
      />
      <ImageUpload
        onChange={(value) => setCustomValue("image", value)}
        value={image}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      title="Cambiar avatar"
      actionLabel="Guardar cambios"
      isOpen={avatarModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={avatarModal.onClose}
      body={bodyContent}
    />
  );
};

export default AvatarModal;
