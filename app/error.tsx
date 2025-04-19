"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/dashboard");
    }, 3500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#f9fafb] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-500 w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Algo deu errado
        </h1>
        <p className="text-gray-600 mb-6">
          Ocorreu um erro inesperado. Você será redirecionado para o painel em
          alguns segundos.
        </p>
        <button
          onClick={() => router.replace("/dashboard")}
          className="bg-[#019267] text-white font-semibold px-6 py-2 rounded-xl hover:bg-[#017f5c] transition"
        >
          Ir para o Dashboard agora
        </button>
      </div>
    </div>
  );
};

export default Error;
