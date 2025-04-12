'use client'

import { loginAction } from "../actions/login/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()

  const submitForm = (formData: FormData) => {
    startTransition(async () => {
      await loginAction(formData)
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        action={submitForm}
        className="w-80 p-6 bg-white shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold">Login</h2>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          required
        />
        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? "Carregando" : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
