"use client";

import React from "react";
import { createClient } from "@/lib/supabase/client";
import { Vaga } from "@/@types/services";
import { VagaCard } from "../cards/vagaCard";
import { usePagination } from "@/context/PaginationContext";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Pagination from "../ui/paginationControler";

export const VagasEmpregoPage = () => {
  const [vacancys, setVacancys] = React.useState<Vaga[]>([]);
  const { setTotalItems, currentPage, itemsPerPage } = usePagination();
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const supabase = createClient();

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const from = currentPage * itemsPerPage;
        const to = from + itemsPerPage - 1;

        const { data, error, count } = await supabase
          .from("teste")
          .select("*", { count: "exact" })
          .range(from, to)
          .order("id", { ascending: false });

        setVacancys(data as Vaga[]);
        setTotalItems(count || 0);
        if (error) {
          throw new Error();
        }
      } catch (error) {
        console.log("erro:", error);
      } finally {
        setIsMounted(true);
      }
    };
    fetch();
  }, [currentPage, itemsPerPage, setTotalItems, supabase]);

  if (!isMounted) {
    return (
      <div className="w-full h-[80vh] flex justify-center">
        <Loader2 className={cn("h-12 w-12  m-auto animate-spin")} />
      </div>
    );
  }

  return (
    <section className="section flex flex-col gap-20 mt-12">
      <h2 className="h2-medium">Vagas de emprego</h2>
      <div className="columns-1 lg:columns-2 xl:columns-3  space-y-3 w-full">
        {vacancys.map((vaga) => (
          <div key={vaga.id} className="break-inside-avoid">
            <VagaCard {...vaga} />
          </div>
        ))}
      </div>
      <Pagination />
    </section>
  );
};
