import { Vaga } from "@/@types/services";
import Link from "next/link";

export const VagaCard: React.FC<Vaga> = ({
  descricao,
  nomeVaga,
  observacao,
  requisitos,
  beneficios,
  local,
  salario,
  links,
  email,
  telefone,
}) => {
  return (
    <div className="flex flex-col w-full border border-[#383838] rounded-[1.25rem] gap-3 text-start p-5 ">
      <span className="border border-[#1DCBF2] rounded-[.25rem] w-fit p-1">VAGA DE EMPREGO PARA PCD</span>
      <span className="font-medium text-2xl">{nomeVaga}</span>
      {requisitos && requisitos.length > 0 && (
        <ul className="paragraph-01 list-disc list-inside">
          <strong>Requisitos:</strong>
          {requisitos.map((req, index) => (
            <li className="ms-2" key={index}>
              {req}
            </li>
          ))}
        </ul>
      )}

      {beneficios && beneficios.length > 0 && (
        <ul className="paragraph-01 list-disc list-inside">
          <strong>Benefícios:</strong>
          {beneficios.map((ben, index) => (
            <li className="ms-2" key={index}>
              {ben}
            </li>
          ))}
        </ul>
      )}

      {descricao && descricao.length > 0 && (
        <ul className="paragraph-01 list-disc list-inside">
          <strong>Descrição:</strong>
          {descricao.map((desc, index) => (
            <li className="ms-2" key={index}>
              {desc}
            </li>
          ))}
        </ul>
      )}

      <span className="paragraph-01">{observacao}</span>

      <div className="flex gap-3 flex-wrap">
        {local && (
          <span className="border border-[#1DCBF2] rounded-[.25rem] w-fit p-1 text-sm flex gap-1">{local}</span>
        )}
        {salario && (
          <span className="border border-[#1DCBF2] rounded-[.25rem] w-fit p-1 text-sm flex gap-1">{salario}</span>
        )}
        {telefone && (
          <span className="border border-[#1DCBF2] rounded-[.25rem] w-fit p-1 text-sm flex gap-1">{telefone}</span>
        )}
        {email && (
          <span className="border border-[#1DCBF2] rounded-[.25rem] w-fit p-1 text-sm flex gap-1">{email}</span>
        )}

        {links &&
          links.map((l, index) => (
            <Link
              key={index}
              href={l.link}
              target="blank"
              className="border border-[#1DCBF2] rounded-[.25rem] p-1 text-sm flex gap-1 underline w-max"
            >
              {l.nome}
            </Link>
          ))}
      </div>
    </div>
  );
};
