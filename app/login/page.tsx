import { Suspense } from "react";
import Content from "@/components/Login/content";


export default function Page() {
   return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Content />
    </Suspense>
  );
}
