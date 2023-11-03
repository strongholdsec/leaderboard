export const getMedal = (top: number) =>
  top == 0 ? '🥇' : top == 1 ? '🥈' : top == 2 ? '🥉' : '';

export const formatAddress = (address: string, symbols = 3): string => {
  if (symbols <= 0) return '';
  if (symbols * 2 >= address.length) return address;

  const left = address.slice(0, symbols + 2);
  const right = address.slice(-symbols);

  return `${left}...${right}`;
};
