export const EditionsSection = () => {
  return (
    <section
      className="flex gap-5 items-start justify-start bg-edition-banner bg-cover max-sm:bg-none flex-col w-full min-w-[100vw]
     max-sm:min-w-full mx-[-6.25rem] max-sm:mx-auto h-full max-lg:px-4  py-[5.75rem]"
    >
      <div className="flex flex-col gap-[1.625rem] max-w-[21.5rem] w-full ml-20 max-sm:ml-0 max-sm:max-w-full ">
        <h2 className="main-title">Encontre sua próxima revista</h2>
        <span className="paragraph-1">
          Navegue por todas as edições bimestrais da Revista Reação. Embarque em um mundo de informação inclusiva e
          acessível para todos os públicos.
        </span>

        {/* <button className="w-max">
          <div className="flex gap-3 w-max justify-center items-center">
            <span>Assinar</span>
            <FaLongArrowAltRight color="#fff" />
          </div>
        </button> */}
      </div>
    </section>
  );
};
