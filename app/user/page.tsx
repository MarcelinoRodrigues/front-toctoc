'use client'

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { handleCreateUser } from "../actions/user/create";
import { InitialTitleLogin } from "@/components/Login/title";
import { cpf, cnpj } from 'cpf-cnpj-validator'; // 👈 adicionado aqui
import { formatTaxNumber } from "@/utils/user";

export default function UserSignupPage() {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const cleaned = formatTaxNumber(taxNumber)
    const isCpfValid = cleaned.length === 11 && cpf.isValid(cleaned);
    const isCnpjValid = cleaned.length === 14 && cnpj.isValid(cleaned);

    if (!isCpfValid && !isCnpjValid) {
      setErrorMessage('CPF ou CNPJ inválido.');
      return;
    }

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await handleCreateUser(formData);
        window.location.href = "/login?success=1";
      } catch {
        setErrorMessage('Erro ao criar conta. Verifique os dados e tente novamente.');
      }
    });
  };

  return (
    <div className="flex h-screen">
      <InitialTitleLogin />

      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 relative">
        <Link href="/login" className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para login
        </Link>

        <form onSubmit={handleRegister} className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-800">Criar sua conta</h2>
          <p className="text-center text-sm text-gray-500">Você terá 14 dias gratuitos de acesso</p>

          <Input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" required />
          <Input name="taxNumber" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} placeholder="CPF ou CNPJ" required />
          <Input name="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="Telefone" required />
          <Input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />

          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? 'Criando conta...' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
