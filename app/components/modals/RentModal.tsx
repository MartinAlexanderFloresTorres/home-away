'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import useRentModal from '@/app/hooks/useRentModal';

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from "../inputs/CountrySelect";
import { categories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Select from "../inputs/Select";
import Heading from '../Heading';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bedCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',      
      accomodationClass: '',
      accomodationType: '',
      description: '',
      facilities: [],
    }
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const bedCount = watch('bedCount');
  const imageSrc = watch('imageSrc');

  const optionsClass = [
    { value: 'Alojamiento entero', label: 'Alojamiento entero' },
    { value: 'Habitación privada', label: 'Habitación privada' },
    { value: 'Habitación compartida', label: 'Habitación compartida' } 
  ]

  const optionsTypes = [
    { value: 'Apartamento', label: 'Apartamento' },
    { value: 'Casa', label: 'Casa' },
    { value: 'Casa de huéspedes', label: 'Casa de huéspedes' },
    { value: 'Hotel', label: 'Hotel' },
    { value: 'Villa', label: 'Villa' },
  ]

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Publicación creada con éxito.');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Algo salió mal.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Publicar'
    }

    return 'Siguiente'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Atrás'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="¿Cuál de estos describe mejor tu lugar?"
        subtitle="Selecciona una categoría"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Dónde está ubicada tu propiedad?"
          subtitle="Selecciona una ubicación"
        />
        <CountrySelect 
          value={location} 
          onChange={(value) => setCustomValue('location', value)} 
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Comparte algunos conceptos básicos sobre tu propiedad"
          subtitle="¿Qué comodidades tiene?"
        />
        <Counter 
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title="Huéspedes"
          subtitle="¿Cuántas personas pueden alojarse?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Habitaciones"
          subtitle="¿Cuántas habitaciones tiene?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('bedCount', value)}
          value={bedCount}
          title="Camas"
          subtitle="¿Cuántas camas tiene?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Baños" 
          subtitle="¿Cuántos baños tiene?"
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Agrega una foto de tu propiedad"
          subtitle="¡Muestra a los huéspedes cómo es tu lugar!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Cómo describirías tu propiedad?"
          subtitle="¿Qué hace que tu lugar sea único?"
        />
        <Input
          id="title"
          label="Título"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Select 
            id="accomodationClass"
            label="Tipo de propiedad"
            options={optionsClass}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Select 
            id="accomodationType"
            label="Tipo de propiedad"
            options={optionsTypes}
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <hr />
        <Input
          id="description"
          label="Descripción"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Cuánto quieres cobrar por noche?"
          subtitle="¡Establece un precio justo!"
        />
        <Input
          id="price"
          label="Precio por noche"
          formatPrice 
          type="number" 
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Mibnb tu propiedad"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

export default RentModal;
