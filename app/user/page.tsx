'use client'

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { handleCreateUser } from "../actions/user/create";

export default function UserSignupPage() {
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await handleCreateUser(formData);
        alert('Conta criada! Você tem 14 dias de acesso gratuito.');
      } catch (err) {
        alert('Erro ao criar conta.');
      }
    });
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/featured/?business,account')` }} />

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

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? 'Criando conta...' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
