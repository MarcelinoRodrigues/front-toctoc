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
  const dashboard: DashboardData[] = await getDashboard();

  return (
    <section className="w-full px-6 py-10 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#019267] to-[#1e3a34] drop-shadow-md">
          Painel Geral
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboard.map((item: DashboardData, index) => (
            <Fragment key={index}>
              <Windownnw title="Produtos" quantity={item.products} />
              <Windownnw title="Vendas" quantity={item.sales} />
              <Windownnw title="Estoque" quantity={item.stock} />
              <WindownReport inQty={item.reportIn} outQty={item.reportOut} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
