import { EdicoesPDFSection } from "@/components/sections/EdicoesPDFSection";
import { EditionsSection } from "@/components/sections/EditionsSection";

export default async function EditionsPage() {
  return (
    <section className="flex flex-col justify-center items-center gap-[6rem] w-full">
      <EditionsSection />
      <EdicoesPDFSection />
    </section>
  );
}
