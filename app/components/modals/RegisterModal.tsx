"use client";

import React from "react";
import axios from "axios";
import {FcGoogle} from 'react-icons/fc'
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
    <div className="flex flex-col gap-4">
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
        id="password"
        type="password"
        label="Senha"
        disabeld={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="fle flex-col gap-4 mt-3">
      <hr/>
      <Button 
        outline
        label="Continue com a conta Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
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
