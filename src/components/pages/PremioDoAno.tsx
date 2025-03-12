"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Carro } from "@/@types/services";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarCard } from "../cards/CarCard";
import { findAllByCategory, postVote, VoteInterface } from "@/services/revistaReacaoApi/carrosService";
import AvisoModal from "../modal/SucessoModal";

interface CarCardInterface {
  id: number;
  carImageAlt: string;
  carMark: string;
  carModel: string;
  categoryName: string;
  carImage: string;
}

const schema = z.object({
  nome: z.string().min(1, "Informar seu nome é obrigatório"),
  email: z.string().min(1, "Informar seu email é obrigatório"),
  possuiDeficiencia: z.string().min(1, "Informar se tem alguma deficiência é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export const PremioDoAnoPage = () => {
  const [step, setStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = React.useState<CarCardInterface | null>(null);
  const [cars, setCars] = React.useState<Carro[] | null>(null);
  const [selectedCardVoteIndex, setSelectedCardVoteIndex] = React.useState<Carro | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [availableCategories] = React.useState<CarCardInterface[]>(categoryCarList);
  const [votedCategories, setVotedCategories] = React.useState<number[]>([]);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    setErrorMessage("");
  }, [selectedCardVoteIndex]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      possuiDeficiencia: "",
    },
  });

  React.useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form]);

  React.useEffect(() => {
    async function fetch() {
      try {
        const res = await findAllByCategory(selectedCategory?.carModel!);
        setCars(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [selectedCategory]);

  const NextStep = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setErrorMessage("");
      setOpenErrorModal(false);
      setStep((step) => step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setErrorMessage("Faltou preencher algum item do formulário.");
      setOpenErrorModal(true);
    }
  };

  function LastStep() {
    setStep((step) => step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedCardVoteIndex(null);
  }

  const handleCardClick = (carCard: CarCardInterface) => {
    setSelectedCategory(carCard);
  };

  const handleCardVoteClick = (carCard: Carro) => {
    setSelectedCardVoteIndex(carCard);
  };

  const handleCloseModal = () => {
    setVotedCategories((prev) => [...prev, selectedCategory?.id!]);

    if (votedCategories.length + 1 === categoryCarList.length) {
      window.location.href = "/";
    } else {
      setOpenModal(true);
      const nextIndex = (availableCategories.indexOf(selectedCategory!) + 1) % availableCategories.length;
      const nextCategory = availableCategories[nextIndex];
      setSelectedCategory(nextCategory);
      setStep(1);
      setOpenModal(false);
    }
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const getNextCategoryName = () => {
    const currentCategoryIndex = categoryCarList.findIndex(
      (category) => category.categoryName === selectedCategory?.categoryName
    );

    if (currentCategoryIndex < categoryCarList.length - 1) {
      return categoryCarList[currentCategoryIndex + 1].categoryName;
    }
    return "";
  };

  const onSubmit = async (data: FormData, event: React.FormEvent) => {
    console.log("submeteu");
    event.preventDefault();
    setIsLoading(true);

    localStorage.setItem("formData", JSON.stringify(data));

    if (selectedCardVoteIndex) {
      const selectedInfos: VoteInterface = {
        votante: {
          nome: data.nome,
          email: data.email,
          possuiDeficiencia: data.possuiDeficiencia,
        },
        votos: [
          {
            idCarro: selectedCardVoteIndex.id,
            tema: "CarroAno",
          },
        ],
      };

      try {
        await postVote(selectedInfos);
        setOpenModal(true);
      } catch (error) {
        setErrorMessage((error as any).response.data.message);
        setOpenErrorModal(true);
      }
    } else {
      setErrorMessage("Por favor, selecione um veículo para finalizar.");
      setOpenErrorModal(true);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <span>Carregando...</span>;
  }

  return (
    <form onSubmit={(event) => form.handleSubmit((data) => onSubmit(data, event))(event)}>
      {step == 0 && (
        <section className="section flex flex-col gap-20">
          <div className="relative  bg-blueGray-50 rounded-md">
            <div className="relative pt-[16.375rem]  flex content-center items-center justify-center md:min-h-screen-75 h-auto">
              <div className="absolute top-0 w-full h-full bg-center ">
                <Image src={"/temp/premiodoano.webp"} alt="Desfile capa" fill className="w-full h-full object-cover " />
              </div>
              <div className=" relative mx-auto w-full opacity-90 bg-bg-principal max-w-[57rem] rounded-t-md">
                <div className="items-start flex flex-col px-[2rem] pt-[1.625rem] pb-5 gap-4 ">
                  <span className="h2-medium">Eleição do “Melhor Carro para Pessoa com Deficiência”</span>
                  <p className="paragraph-1">
                    Pelo 27º ano consecutivo, o Sistema Reação/Revista Reação realiza a pesquisa para eleger o “Melhor
                    Carro para as Pessoas com Deficiência” junto aos leitores, internautas e assinantes — pessoas com
                    deficiência e familiares, profissionais e formadores de opinião, usuários e consumidores de
                    veículos. Todos juntos elegerão, mais uma vez, através do voto direto, os modelos de veículos que
                    melhor atendem suas necessidades, as melhores marcas, aquelas que oferecem melhor atendimento na
                    rede concessionária etc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-col gap-8 items-center w-full h-auto">
            <Image
              src={"/temp/sorteio/smartwatch.png"}
              alt={`Relógio inteligente`}
              className="w-full h-auto max-w-[22.125rem] object-cover shadow-lg "
              sizes="500px"
              width={500}
              height={500}
            />
            <div className="flex flex-col gap-1">
              <span className="h2-medium">Participe e concorra a um smartwatch exclusivo!</span>
              <p className="paragraph-1">
                Ao terminar sua votação você automaticamente estará concorrendo ao sorteio da Revista Reação de um lindo
                smartwatch.
              </p>
            </div>
          </div>

          <div className="flex max-md:flex-col gap-8 items-center w-full h-auto">
            <Image
              src={"/temp/carro-do-ano/LOGO CARRO DO ANO - 2024.jpg"}
              alt={`Cadeirante`}
              className="w-full h-auto max-w-[22.125rem] object-cover shadow-lg "
              sizes="500px"
              width={500}
              height={500}
            />
            <div className="flex flex-col gap-1">
              <span className="h2-medium">Escolha a categoria que gostaria de vota</span>
              <p className="paragraph-1">
                Para este ano de 2024, estamos vindo com uma novidade. Agora, vamos eleger o “Melhor Carro para Pessoas
                com Deficiência” em 4 categorias diferentes — Elétricos, SUV, Compactos e Sedan — você pode votar em
                todas as 4 categorias no modelo e marca que mais te agrada.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <span className="h2-medium">
              Para continuarmos, precisamos de algumas informações para validar seu voto. Vote, deixe seus dados e
              concorra a 1 smart watch de última geração.
            </span>

            <div className="flex flex-col gap-5">
              <div className="relative h-[6.25rem] border-[.125rem] rounded-[1.25rem] border-rev-tipo-tecnologias w-full">
                <input className="h-full w-full border-0 rounded-[1.25rem] pl-4 pt-6" {...form.register("nome")} />
                <div className="absolute top-2 left-4 rounded-[.25rem] border border-rev-tipo-saude px-1">
                  Insira seu nome completo:
                </div>
              </div>
              {form.formState.errors.nome && (
                <span className="text-red-500 text-sm pl-4">{form.formState.errors.nome.message}</span>
              )}
              <div className="relative h-[6.25rem] border-[.125rem] rounded-[1.25rem] border-rev-tipo-tecnologias w-full">
                <input className="h-full w-full border-0 rounded-[1.25rem] pl-4 pt-6" {...form.register("email")} />
                <div className="absolute top-2 left-4 rounded-[.25rem] border border-rev-tipo-saude px-1">
                  Insira seu nome melhor email:
                </div>
              </div>
              {form.formState.errors.email && (
                <span className="text-red-500 text-sm pl-4">{form.formState.errors.email.message}</span>
              )}
              <div className="relative h-[6.25rem] border-[.125rem] rounded-[1.25rem] border-rev-tipo-tecnologias w-full">
                <input
                  className="h-full w-full border-0 rounded-[1.25rem] pl-4 pt-6"
                  {...form.register("possuiDeficiencia")}
                />
                <div className="absolute top-2 left-4 rounded-[.25rem] border border-rev-tipo-saude px-1">
                  Você tem alguma deficiência? Se sim, qual?
                </div>
              </div>
              {form.formState.errors.possuiDeficiencia && (
                <span className="text-red-500 text-sm pl-4">{form.formState.errors.possuiDeficiencia.message}</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2  w-full gap-2">
              {categoryCarList.map((car) => (
                <div
                  key={car.id}
                  className="break-inside-avoid focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCardClick(car);
                      NextStep();
                    }
                  }}
                >
                  <CarCard
                    carImageAlt={car.carImage}
                    carMark={car.carMark}
                    carModel={car.carModel}
                    categoryName={car.categoryName}
                    isSelected={selectedCategory === car}
                    carImage={car.carImage}
                    onClick={() => {
                      handleCardClick(car);
                      NextStep();
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              {form.formState.errors.nome && (
                <span className="text-red-500 text-sm pl-4">{form.formState.errors.nome.message}*</span>
              )}
              {form.formState.errors.email && (
                <span className="text-red-500 text-sm pl-4">{form.formState.errors.email.message}*</span>
              )}
              {form.formState.errors.possuiDeficiencia && (
                <span className="text-red-500 text-sm pl-4">{form.formState.errors.possuiDeficiencia.message}*</span>
              )}
            </div>
          </div>
        </section>
      )}

      {step == 1 && (
        <section className="section flex flex-col gap-20">
          <div className="flex flex-col gap-1">
            <span className="h2-medium">{`Você está na tela de votação da categoria ${selectedCategory?.categoryName}`}</span>
            <p className="paragraph-1">
              Selecione o carro em que se encaixa na pergunta e clique em “Finalizar” para salvar seus votos
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <span className="title-h2">
              Em questão de CONFORTO, DESEMPENHO, SEGURANÇA, DESIGN, ACESSIBILIDADE, ATENDIMENTO NA REDE CONCESSIONÁRIA
              E MANUTENÇÃO, qual modelo você escolheria?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full space-y-2  gap-2">
              {cars?.map((car) => (
                <div
                  key={car.id}
                  className="break-inside-avoid "
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCardVoteClick(car);
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    }
                  }}
                >
                  <CarCard
                    carImageAlt={car.modelo}
                    carMark={car.marca}
                    carModel={car.modelo}
                    categoryName={car.categoria}
                    onClick={() => {
                      handleCardVoteClick(car);
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    }}
                    isSelected={selectedCardVoteIndex === car}
                    carImage={car.imagem}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 justify-center text-center">
            {errorMessage && <span className="text-red-500 text-sm pl-4">{errorMessage}</span>}
            <div className="flex w-full justify-center gap-4">
              <Button variant="ghost" onClick={LastStep}>
                Voltar
              </Button>
              <Button type="submit">Finalizar</Button>
            </div>
          </div>
          <AvisoModal
            border=""
            title="Muito obrigado!"
            description={
              getNextCategoryName() != ""
                ? `Obrigado por votar na categoria ${
                    selectedCategory?.categoryName
                  }. Clique em continuar para votar na categoria ${getNextCategoryName()}.`
                : "Nós da Revista Reação agradecemos seus votos. Boa sorte no sorteio!"
            }
            onClose={handleCloseModal}
            open={openModal}
            button="Fechar"
            type="button"
          />
        </section>
      )}
      <AvisoModal
        border=""
        title="Ops"
        description={errorMessage}
        onClose={handleCloseErrorModal}
        open={openErrorModal}
        button="Fechar"
      />
    </form>
  );
};

const categoryCarList: CarCardInterface[] = [
  {
    id: 1,
    carImageAlt: "Modelo",
    carMark: "CATEGORIA",
    carModel: "SUV",
    categoryName: "SUV",
    carImage: "/temp/carro-do-ano/suv_black.png",
  },
  {
    id: 2,
    carImageAlt: "Modelo",
    carMark: "CATEGORIA",
    carModel: "ELETRICOS",
    categoryName: "ELÉTRICOS",
    carImage: "/temp/carro-do-ano/eletrico_black.png",
  },
  {
    id: 3,
    carImageAlt: "Modelo",
    carMark: "CATEGORIA",
    carModel: "SEDAN",
    categoryName: "SEDAN",
    carImage: "/temp/carro-do-ano/sedan_black.png",
  },
  {
    id: 4,
    carImageAlt: "Modelo",
    carMark: "CATEGORIA",
    carModel: "COMPACTOS",
    categoryName: "COMPACTOS",
    carImage: "/temp/carro-do-ano/compacto_black.png",
  },
];
