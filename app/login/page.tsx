"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { validateInputs } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetError = (errorMessage: string) => setError(errorMessage)

  const handleLogin = async () => {
    if (!validateInputs(email,password,handleSetError)) return;
    
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("https://localhost:44323/api/Auth/login", {
        email,
        senha: password,
      });

      localStorage.setItem("token", response.data.token);
      router.replace("/products");
    } catch {
      setError("Usuário ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

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
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <Button
          className="w-full hover:cursor-pointer"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Entrar"}
        </Button>
      </div>
    </div>
  );
}
