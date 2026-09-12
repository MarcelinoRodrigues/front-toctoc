"use client";

import { loginAction } from "@/app/actions/login/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition, useEffect, useState } from "react";
import { InitialTitleLogin } from "@/components/Login/title";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react"
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Content() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEdge, setIsEdge] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setShowSuccessModal(true);
    }
  }, [searchParams]);

  useEffect(() => {
    setIsEdge(/Edg/i.test(navigator.userAgent));

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
      }else if (result?.Token === ""){
        window.location.href = "/"
      }
      else{
        window.location.href = "/dashboard";
      }
    });
  };

  return (
    <div className="flex h-screen">
      <InitialTitleLogin />

      {isPending && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
    <Loader2
      className="h-12 w-12 animate-spin"
    />
  </div>
)}

      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
        <form
          action={submitForm}
          className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Bem-vindo de volta</h2>
          <p className="text-center text-sm text-gray-500">Entre para continuar</p>

          <Input
  name="email"
  type="email"
  placeholder="Email"
  required
/>
      <div className="relative">
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          required
          className={!isEdge ? "pr-10" : ""}
        />

        {!isEdge && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

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
