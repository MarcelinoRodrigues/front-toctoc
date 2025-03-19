"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)

      const response = await axios.post("https://localhost:44323/api/Auth/login", {
        email,
        senha: password,
      });

      setResponse(response?.data)
    } catch (err) {
      setError("Usuário ou senha inválidos.")
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (response) {
      setIsLoading(false)
      localStorage.setItem("token", response.data.token);
      router.push("/products");
    }
  }, [response])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-80 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2"
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button className="w-full hover:cursor-pointer" onClick={handleLogin}>
          {isLoading ?
            <Loader2 className={'animate-spin'} />
            : <>Entrar</>
          }
        </Button>
      </div>
    </div>
  );
}
