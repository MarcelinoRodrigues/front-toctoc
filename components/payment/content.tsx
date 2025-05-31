"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CopyIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function PagamentoPage() {
  const [copied, setCopied] = useState(false)

  const pixCode = "00020126580014br.gov.bcb.pix0136a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5204000053039865802BR5915Nome da Empresa6009Sao Paulo62070503***6304ABCD"

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6">
        <CardHeader className="text-center">
          <Image src="/logo.png" alt="Logo" width={60} height={60} className="mx-auto mb-2" />
          <CardTitle className="text-2xl font-bold text-brand-primary">Pagamento Necessário</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Para continuar usando o sistema, realize o pagamento via Pix abaixo.</p>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 mt-4">
          <div className="bg-white border rounded-xl p-4 w-full text-center">
            <p className="text-lg font-semibold mb-2">Valor: <span className="text-brand-primary">R$ 54,99</span></p>
            <Image src="/qrcode-pix.png" alt="QR Code Pix" width={200} height={200} className="mx-auto my-4" />
            <div className="relative w-full">
              <input
                readOnly
                value={pixCode}
                className="w-full border rounded-md px-4 py-2 text-sm text-gray-700 bg-gray-100 pr-10"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCopy}
                className="absolute top-1/2 -translate-y-1/2 right-2"
              >
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">{copied ? "Código copiado!" : "Copie o código acima ou escaneie o QR Code para pagar."}</p>
          </div>

          <Button className="w-full mt-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold">
            Verificar Pagamento
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
