import Link from "next/link";

export const processParagraph = (text: string): JSX.Element[] => {
  const linkRegex = /\$\{link:(.*?), frase:(.*?)\}/g;
  const subTitleRegex = /\$\{subTitle:(.*?)\}/g;
  const parts: JSX.Element[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, url, phrase] = match;
    const matchIndex = match.index;

    if (lastIndex < matchIndex) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex, matchIndex)}</span>);
    }

    parts.push(
      <Link aria-label={phrase} key={matchIndex} href={url} target="_blank" className="text-[#8ab4f8] underline">
        {phrase}
      </Link>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  while ((match = subTitleRegex.exec(text)) !== null) {
    const [fullMatch, subtitle] = match;
    const matchIndex = match.index;

    if (lastIndex < matchIndex) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex, matchIndex)}</span>);
    }

    parts.push(
      <h2 key={matchIndex} className="text-xl font-bold my-4">
        {subtitle}
      </h2>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
  }

  return parts;
};
