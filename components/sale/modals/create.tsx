import { cookies } from "next/headers";
import axios from "axios";
import https from "https";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddSaleButton } from "./addSaleButton";
import { API_BASE_URL } from "@/lib/api";
import { revalidatePath } from "next/cache";

export function CreateSale() {
  async function handleCreteSale(form: FormData) {
    'use server';

    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt")?.value;

    const data = {
      productId: form.get("productId")?.toString() || "",
      quantity: Number(form.get("quantity")),
      payment: form.get("payment")?.toString() || "credit",
      discount: Number(form.get("discount")) || 0,
      amount: Number(form.get("amount")),
      origin: form.get("origin")?.toString() || "n/a",
      observation: form.get("observation")?.toString() || "",
      additionalCost: Number(form.get("additionalCost")) || 0,
      unitMeasure: form.get("unitMeasure")?.toString() || "UN",
    };

    const agent = new https.Agent({ rejectUnauthorized: false });

    await axios.post(`${API_BASE_URL}/Sale/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      httpsAgent: agent,
    });

    revalidatePath('/sale'); 
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Criar Venda
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Venda</DialogTitle>
        </DialogHeader>

        <form action={handleCreteSale} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Produto ID</label>
            <input
              type="text"
              name="productId"
              required
              className="mt-1 w-full border px-3 py-2 rounded"
              defaultValue="3fa85f64-5717-4562-b3fc-2c963f66afa6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Quantidade</label>
            <input
              type="number"
              name="quantity"
              required
              className="mt-1 w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Preço</label>
            <input
              type="number"
              name="amount"
              required
              className="mt-1 w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Desconto</label>
            <input
              type="number"
              name="discount"
              className="mt-1 w-full border px-3 py-2 rounded"
              defaultValue={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Custo adicional</label>
            <input
              type="number"
              name="additionalCost"
              className="mt-1 w-full border px-3 py-2 rounded"
              defaultValue={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Pagamento</label>
            <input
              type="text"
              name="payment"
              className="mt-1 w-full border px-3 py-2 rounded"
              defaultValue="credit"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Origem</label>
            <input
              type="text"
              name="origin"
              className="mt-1 w-full border px-3 py-2 rounded"
              defaultValue="n/a"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Observação</label>
            <input
              type="text"
              name="observation"
              className="mt-1 w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Unidade de Medida</label>
            <input
              type="text"
              name="unitMeasure"
              required
              className="mt-1 w-full border px-3 py-2 rounded"
              defaultValue="UN"
            />
          </div>
          <AddSaleButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}
