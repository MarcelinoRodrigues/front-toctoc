import { Error } from "../common/error";
import { Windownnw } from "./windonnw";
import { ContentProps } from "@/types/dashboard/types"; 

export const Content = ({ dashboard }: ContentProps) => {
  const dashboardData = Array.isArray(dashboard) ? dashboard : [];

  return (
    <div className="mx-auto border-8 border-gray-900 p-4 h-screen overflow-auto min-w-[50vw]">
      <h2 className="bg-gray-900 text-white rounded-2xl text-center">Dashboard</h2>
      
      {dashboardData.length === 0 ? (
        <div className="flex items-center justify-center h-[80%]">
          <Error/>
        </div>
      ) : (
        <div className="flex justify-between">
          {dashboardData.map((item, index) => (
            <Windownnw key={index} title="Produtos" quantity={item.products} />
          ))}
        </div>
      )}
    </div>
  );
};
