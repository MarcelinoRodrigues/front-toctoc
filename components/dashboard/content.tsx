import { Windownnw } from "./windonnw";
import { Fragment } from "react";
import { getDashboard } from "@/services/dashboard/getDashboard";
import { WindownReport } from "./windownStock";

type DashboardData = {
  products: number
  sales: number
  stock: number
  reportIn: number
  reportOut: number
}

export const Content = async () => {
  const dashboard: DashboardData = await getDashboard();

  return (
    <section className="w-full px-6 py-10 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#019267] to-[#1e3a34] drop-shadow-md">
          Painel Geral
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Fragment>
              <Windownnw title="Produtos" quantity={dashboard.products} href="/products" />
              <Windownnw title="Vendas" quantity={dashboard.sales} href="/sale"  />
              <Windownnw title="Estoque" quantity={dashboard.stock} href="/stock"  />
              <WindownReport inQty={dashboard.reportIn} outQty={dashboard.reportOut} />
            </Fragment>
        </div>
      </div>
    </section>
  );
};
