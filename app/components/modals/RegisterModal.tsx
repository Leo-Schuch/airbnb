"use client";

import React from "react";
import axios from "axios";
import {FcGoogle} from 'react-icons/fc'
import {AiFillGithub, AiFillApple, AiOutlineMail} from 'react-icons/ai'
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "../../hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api.register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((err) => {
        toast.error('Algo deu errado!!')
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col rounded-xl gap-4">
      <Heading title="Bem-vindo ao Airbnb" subtitle="Crie uma conta" />
      <Input
        
        id="email"
        label="Email"
        disabeld={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Nome"
        disabeld={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Senha"
        disabeld={isLoading}
        register={register}
        errors={errors}
        required
      />
      
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr/>
      <Button 
        outline
        label="Continuar com Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <Button 
        outline
        label="Continuar com Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      
      <Button 
        outline
        label="Continuar com email"
        icon={AiOutlineMail}
        onClick={() => {}}
      />
      <div className="
        text-neutral-500
        mt-4
        font-light
      "
      >
        <div className="justify-center flex flex-row items-center gap-2">
        <div>
          Já tem uma conta?
        </div>
        <div
          onClick={registerModal.onClose}
          className="
            text-neutral-800
            cursor-pointer
            hover:underline
          "
        >
          Logar
        </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Entrar ou cadastrar-se"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
