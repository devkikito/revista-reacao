import { IconWithTexts, IconWithTextsProps } from "@/components/cards/IconWithTexts";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsPersonSquare } from "react-icons/bs";
import { CgDatabase } from "react-icons/cg";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { MdOutlineCookie, MdOutlinePermMedia } from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbClockQuestion } from "react-icons/tb";

const data: IconWithTextsProps[] = [
  {
    icon: PiUsersThreeBold,
    title: "Quem somos",
    paragraph:
      "Somos uma Revista Nacional de Reabilitação, focando em inclusão e acessibilidade de pessoas diversas, mobilidade reduzida, familiares e profissionais do setor.",
  },
  {
    icon: MdOutlineCookie,
    title: "Cookies",
    paragraph:
      "Ao deixar um comentário no site, você poderá optar por salvar seu nome, e-mail e site nos cookies. Isso visa seu conforto, assim você não precisará preencher seus dados novamente quando fizer outro comentário. Estes cookies duram um ano. ",
  },
  {
    icon: BiCommentDetail,
    title: "Comentários",
    paragraph:
      "Quando os visitantes deixam comentários no site, coletamos os dados mostrados no formulário de comentários, além do endereço de IP e de dados do navegador do visitante, para auxiliar na detecção de spam. ",
  },
  {
    icon: MdOutlinePermMedia,
    title: "Mídia incorporada de outros sites",
    paragraph:
      "Artigos neste site podem incluir conteúdo incorporado como, por exemplo, vídeos, imagens, artigos, etc. Conteúdos incorporados de outros sites se comportam exatamente da mesma forma como se o visitante estivesse visitando o outro site.",
  },
  {
    icon: BsPersonSquare,
    title: "Mídia",
    paragraph:
      "Se você envia imagens para o site, evite enviar as que contenham dados de localização incorporados (EXIF GPS). Visitantes podem baixar estas imagens do site e extrair delas seus dados de localização.",
  },
  {
    icon: AiOutlineCloudDownload,
    title: "Com quem compartilhamos seus dados",
    paragraph:
      "Se você solicitar uma redefinição de senha, seu endereço de IP será incluído no e-mail de redefinição de senha.",
  },
  {
    icon: TbClockQuestion,
    title: "Por quanto tempo mantemos os seus dados",
    paragraph:
      "Se você deixar um comentário, o comentário e os seus metadados são conservados indefinidamente. Fazemos isso para que seja possível reconhecer e aprovar automaticamente qualquer comentário posterior ao invés de retê-lo para moderação.",
  },
  {
    icon: LiaBalanceScaleSolid,
    title: "Quais os seus direitos sobre seus dados",
    paragraph:
      "Se você tiver uma conta neste site ou se tiver deixado comentários, pode solicitar um arquivo exportado dos dados pessoais que mantemos sobre você, inclusive quaisquer dados que nos tenha fornecido.",
  },
  {
    icon: CgDatabase,
    title: "Para onde enviamos seus dados",
    paragraph: "Comentários de visitantes podem ser marcados por um serviço automático de detecção de spam.",
  },
];

export default async function PoliticasPrivacidadePage() {
  return (
    <section className="grid grid-cols-2 gap-y-[7.125rem] gap-x-12  max-sm:flex max-sm:flex-col py-[5.3125rem] w-full max-w-max m-auto justify-center items-center ">
      {data.map((item, index) => (
        <IconWithTexts key={index} icon={item.icon} title={item.title} paragraph={item.paragraph} />
      ))}
    </section>
  );
}
