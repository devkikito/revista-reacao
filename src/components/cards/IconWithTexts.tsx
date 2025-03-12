import { IconType } from "react-icons";

export interface IconWithTextsProps {
  icon: IconType;
  title: string;
  paragraph: string;
}

export const IconWithTexts = ({ icon, title, paragraph }: IconWithTextsProps) => {
  const IconType = icon;
  return (
    <div className="flex gap-[1.625rem] w-full max-w-[37rem] max-2sm:flex-col  max-2sm:items-center ">
      <div className="rounded-full bg-rev-brand-100 flex justify-center items-center w-min h-min">
        <IconType className="w-[2.875rem] h-[2.875rem] m-4  text-rev-brand-400" />
      </div>
      <div className="div flex flex-col gap-2  max-2sm:text-center">
        <span className="font-sarabun text-[1.375rem] font-medium text-rev-cinza-200 ">{title}</span>
        <p className="font-sarabun text-base text-rev-cinza-200">{paragraph}</p>
      </div>
    </div>
  );
};
