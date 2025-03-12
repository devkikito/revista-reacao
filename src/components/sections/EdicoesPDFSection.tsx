"use client";
import { usePagination } from "@/context/PaginationContext";
import { MiniCardPDFEdition } from "../cards/MiniCardPDFEdition";
import React from "react";
import { Revista } from "@/@types/services";
import Pagination from "../ui/paginationControler";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export const EdicoesPDFSection = () => {
  const [mounted, setMounted] = React.useState(false);
  const [magazine, setMagazine] = React.useState<Revista[]>([]);
  const { setTotalItems, currentPage, itemsPerPage } = usePagination();
  const supabase = createClient();

  React.useEffect(() => {
    async function fetch() {
      try {
        const from = currentPage * itemsPerPage;
        const to = from + itemsPerPage - 1;
        const { data } = await supabase
          .from("editions")
          .select("*", { count: "exact" })
          .range(from, to)
          .order("id", { ascending: false });
        setMagazine(data as Revista[]);
      } catch (error) {
        console.log("erro:", error);
      } finally {
        setMounted(true);
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[80vh] flex justify-center">
        <Loader2 className={cn("h-12 w-12  m-auto animate-spin")} />
      </div>
    );
  }

  return (
    <section className="w-full flex flex-wrap justify-center items-center gap-x-[1.3125rem] gap-y-[4.5rem] max-sm:gap-y-[12.5rem] max-xl:grid-cols-1 mt-[3.3125rem]">
      {magazine &&
        magazine.map((data) => {
          return <MiniCardPDFEdition image={data.image_url} key={data.id} title={data.name} pdf={data.pdf_url} />;
        })}
      <Pagination />
    </section>
  );
};
