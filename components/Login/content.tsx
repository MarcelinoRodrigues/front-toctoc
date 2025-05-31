"use client";

import { loginAction } from "@/app/actions/login/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition, useEffect, useState } from "react";
import { InitialTitleLogin } from "@/components/Login/title";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Content() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setShowSuccessModal(true);
    }
  }, [searchParams]);

  const submitForm = (formData: FormData) => {
    setErrorMessage("");

    startTransition(async () => {
      const result = await loginAction(formData);

      if (result?.error) {
        setErrorMessage(result.error);
      } else if (result?.Expired && !result?.Paid) {
        window.location.href = "/payment";
      }else{
        window.location.href = "/dashboard";
      }
    });
  };

  return (
    <div className="flex h-screen">
      <InitialTitleLogin />

      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
        <form
          action={submitForm}
          className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Bem-vindo de volta</h2>
          <p className="text-center text-sm text-gray-500">Entre para continuar</p>

          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Senha" required />

          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}

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

        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Conta criada com sucesso</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600">Você tem 14 dias de acesso gratuito.</p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
