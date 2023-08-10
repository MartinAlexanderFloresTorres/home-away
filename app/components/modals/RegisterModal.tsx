'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

import Modal from './Modal'
import Input from '../inputs/Input'
import Heading from '../Heading'
import Button from '../Button'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post('/api/registro', data)
      .then(() => {
        toast.success('¡Registro exitoso!')
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='¡Te damos la bienvenida a Home Away!'
        subtitle='Crea una cuenta para reservar alojamientos, escribir reseñas y mucho más.'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Nombre'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Contraseña'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continuar con Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continuar con Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <p>
          {' '}
          ¿Ya tienes una cuenta?{' '}
          <span onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline'>
            {' '}
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Crear cuenta'
      actionLabel='Continuar'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
