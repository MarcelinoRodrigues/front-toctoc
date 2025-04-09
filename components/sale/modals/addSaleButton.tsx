'use client'

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function AddSaleButton() {
  const { pending } = useFormStatus()

  return (
    <div className="flex justify-end space-x-2 pt-4">
      {pending ? (
        <Loader2/>
      ) : (
        <>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Criar
          </button>
        </>
      )}
    </div>
  )
}