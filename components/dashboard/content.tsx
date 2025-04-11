import { Windownnw } from "./windonnw";
import { Fragment } from "react";
import { getDashboard } from "@/services/dashboard/getDashboard";
import { WindownStock } from "./windownStock";

type DashboardData = {
  products: number;
  sales: number;
  stockIn: number;
  stockOut: number;
};

export const Content = async () => {
  const dashboard: DashboardData[] = await getDashboard();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 w-full">
      <h2 className="text-3xl font-bold text-center text-white bg-gray-900 py-3 rounded-xl mb-6 shadow">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboard.map((item: DashboardData, index) => (
          <Fragment key={index}>
            <Windownnw title="Produtos" quantity={item.products} />
            <Windownnw title="Vendas" quantity={item.sales} />
            <WindownStock inQty={item.stockIn} outQty={item.stockOut} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
