import Link from "next/link";
import { NextImage } from "../ui/NextImage";
import { NextImageType } from "@/@types/types";
import { Noticia } from "@/@types/services";
import { getCategoryInfo } from "@/utils/categories";
import { formatDateMouth } from "@/utils/formateData";

interface NewsCardProps {
  image?: NextImageType;
  imageUrl?: string;
  altImage?: string;
  category: string;
  title: string;
  paragraph: string;
  date: string;
  link: string;
  extraClassName?: string;
}

export const NewsCardMain = (data: Noticia) => {
  return (
    <div className="flex flex-col gap-3 text-start aspect-[17/10]">
      <NextImage
        imageUrl={data.imagem!}
        altImage={data.textoAlternativoImagem || data.titulo}
        sizes="720px"
        width={720}
        height={478}
        className="w-full h-full object-cover bg-cover bg-center rounded-lg"
      />
      <div className="flex flex-col text-start">
        <div className="flex gap-[.625rem] items-center">
          {data.categoria && (
            <span className="paragraph-1 p-1 rounded-[.25rem] border border-[#FF5C00] w-max">
              {getCategoryInfo(data.categoria).name}
            </span>
          )}
          <span className="">- {formatDateMouth(data.data as unknown as string)}</span>
        </div>
        <h2 className="h2-medium">{data.titulo}</h2>
        <p className="mt-2 paragraph-2">{data.resumo}</p>
      </div>

      <Link href={`/noticias/noticia?id=${data.id}`} className="cta">
        Continuar lendo
      </Link>
    </div>
  );
};

export const NewsCard = ({
  category,
  date,
  link,
  paragraph,
  title,
  image,
  extraClassName,
  imageUrl,
  altImage,
}: NewsCardProps) => {
  return (
    <div className={`flex flex-col gap-2 text-start border-b border-var-cinza-150 w-full ${extraClassName}`}>
      <div className="flex flex-col gap-2 text-start">
        <div className="flex gap-[.625rem] items-center">
          <span className="paragraph-1 p-1 rounded-[.25rem] border border-[#FF5C00] w-max">{category}</span>
          <span className="max-md:hidden">- {date}</span>
        </div>
        {image && (
          <NextImage
            imageUrl={image.imageUrl}
            altImage={altImage || title}
            sizes="400px"
            width={400}
            height={235}
            className="w-full h-[14.6875rem] object-cover object-left rounded-lg"
          />
        )}
        {imageUrl && (
          <NextImage
            imageUrl={imageUrl}
            altImage="Imagem alternativa"
            sizes="400px"
            width={400}
            height={235}
            className="w-full h-[14.6875rem] object-cover object-left rounded-lg"
          />
        )}
        <h2 className="title-card">{title}</h2>
        <p className="paragraph-1 ">{paragraph}</p>
      </div>

      <Link href={link} className="cta mb-4">
        Continuar lendo
      </Link>
    </div>
  );
};
