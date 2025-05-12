'use client'

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UserSignupPage() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        alert('Conta criada! Você tem 14 dias de acesso gratuito.');
        // redirecionar se necessário
      } else {
        alert('Erro ao criar conta.');
      }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Imagem à esquerda */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/featured/?business,account')` }} />

      {/* Formulário */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 relative">
        <Link href="/login" className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para login
        </Link>

        <form onSubmit={handleRegister} className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg space-y-5">
          <h2 className="text-2xl font-bold text-center text-gray-800">Criar sua conta</h2>
          <p className="text-center text-sm text-gray-500">Você terá 14 dias gratuitos de acesso</p>

          <Input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="Email" required />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Senha" required />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? 'Criando conta...' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
