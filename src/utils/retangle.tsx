export const rectangle = (color?: string): string => {
  return `
      <svg width="1440" height="420" viewBox="0 0 1440 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1440" height="420" fill="${color || "#fff"}" />
      </svg>
    `;
};
