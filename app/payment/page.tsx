import Content from "@/components/payment/content";
import { Suspense } from "react";

export default function Page() {
   return (
    <Suspense fallback={<></>}>
      <Content />
    </Suspense>
  );
}