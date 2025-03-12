import { Noticia } from "@/@types/services";
import { getMainBannerNoticiasAction } from "@/app/actions/newsActions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MainNewsSection = () => {
  const [noticiaById, setNoticiaById] = React.useState<Noticia>();

  React.useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const responseTwo = await getMainBannerNoticiasAction();
        setNoticiaById(responseTwo.content[0]);
      } catch (error) {
        console.error("Erro ao buscar os programas:", error);
      }
    };

    fetchFornecedores();
  }, []);

  if (!noticiaById) {
    return;
  }

  return (
    <section className="relative  bg-blueGray-50 rounded-md">
      <div className="relative pt-12 md:pt-[16.375rem]  flex content-center items-center justify-center md:min-h-screen-75 h-auto">
        <div className="absolute top-0 w-full h-full bg-center ">
          <Image
            src={noticiaById.imagem!}
            alt="Desfile capa"
            quality={100}
            width={1400}
            height={500}
            sizes="100vw"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="section relative mx-auto w-full opacity-90  rounded-t-md">
          <div className="items-start flex flex-col px-4 2sm:px-[2rem] pt-[1.625rem] bg-bg-principal pb-5 gap-4 ">
            <h1 className="h2-medium 2sm:main-title">{noticiaById?.titulo}</h1>
            <span className="paragraph-2">{noticiaById.resumo}</span>
            <Link href={`/noticias/noticia?id=${noticiaById.id}`} className="cta ">
              Continuar lendo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
