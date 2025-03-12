interface TopicTitleProps {
  text: string;
}

export const TopicTitle = ({ text }: TopicTitleProps) => {
  return (
    <div className="flex gap-2 text-bg-marca400 items-center h2-medium">
      <div className="w-2 h-2 rounded-full bg-bg-marca400" />
      <span>{text}</span>
    </div>
  );
};
