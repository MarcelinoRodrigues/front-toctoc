'use client'

import { loginAction } from "../actions/login/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();

  const submitForm = (formData: FormData) => {
    startTransition(async () => {
      await loginAction(formData);
    });
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 bg-cover bg-center"/>

      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
        <form
          action={submitForm}
          className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Bem-vindo de volta</h2>
          <p className="text-center text-sm text-gray-500">Entre para continuar</p>

          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Senha" required />

          <Button disabled={isPending} className="w-full">
            {isPending ? "Carregando..." : "Entrar"}
          </Button>

          <p className="text-sm text-center text-gray-500">
            Não tem uma conta?{" "}
            <a href="/user" className="text-brand-primary font-medium underline">
              Criar conta
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
