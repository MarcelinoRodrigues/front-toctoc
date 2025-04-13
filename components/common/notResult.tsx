"use client"

import { AlertTriangle } from "lucide-react"
import { Card, CardDescription, CardTitle } from "../ui/card"

export const NotResult = () => {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-10 border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-xl flex flex-col items-center text-center gap-8">
      <div className="bg-yellow-100 text-yellow-800 rounded-full p-6 shadow-lg mb-6">
        <AlertTriangle className="w-14 h-14" />
      </div>
      <CardTitle className="text-3xl font-semibold text-gray-800">Nenhum Resultado Encontrado</CardTitle>
      <CardDescription className="text-base text-gray-600">
        Infelizmente, não encontramos nada com sua pesquisa. Caso o problema persista, tente entrar em contato com o Administrador do Site.
      </CardDescription>
      <div className="pt-8">
        <button
          onClick={handleReload}
          className="px-8 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
        >
          Tentar Novamente
        </button>
      </div>
    </Card>
  )
}
