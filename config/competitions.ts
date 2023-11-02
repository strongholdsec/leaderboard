export type CompetitionInfo = {
  id: number;
  name: string;
  type: 'farm' | 'contest';
  startDate: Date;
  endDate: Date;
  imageSrc: string;
};

/*
ID = 0 - Farm Winter 2023 (??? - 01.03.2023);
ID = 1 - Farm Spring 2022 (??? - 04.05.2022);
ID = 2 - Farm Autumn 2022 (??? - 26.09.2022);
ID = 3 - Moonwell Contest (9.10.2022 - 16.10.2022);
ID = 4 - Sidechain Oracles Contest (05.12.2022 - 11.12.2022);
ID = 5 - Lido Contest (14.02.2023 - 13.03.2023);
ID = 6 - Farm Spring 2023 (??? - ???);
ID = 7 - Fathom Contest (03.08.2023 - 11.09.2023);
ID = 8 - NetherFi Contest (02.10.23 - 17.11.23);
ID = 9 - Farm Autumn 2023 (??? - ???).
*/
export const competitionInfo: CompetitionInfo[] = [
  {
    id: 0,
    name: 'Farm Winter 2023',
    type: 'farm',
    startDate: new Date(),
    endDate: new Date('2023/03/01'),
    imageSrc: '',
  },
  {
    id: 1,
    name: 'Farm Spring 2022',
    type: 'farm',
    startDate: new Date(),
    endDate: new Date('2022/05/04'),
    imageSrc: '',
  },
  {
    id: 2,
    name: 'Farm Autumn 2022',
    type: 'farm',
    startDate: new Date(),
    endDate: new Date('2022/09/26'),
    imageSrc: '',
  },
  {
    id: 3,
    name: 'Moonwell Contest',
    type: 'contest',
    startDate: new Date('2022/10/09'),
    endDate: new Date('2022/10/16'),
    imageSrc: '',
  },
  {
    id: 4,
    name: 'Sidechain Oracles Contest',
    type: 'contest',
    startDate: new Date('2022/12/05'),
    endDate: new Date('2022/12/11'),
    imageSrc: '',
  },
  {
    id: 5,
    name: 'Lido Contest',
    type: 'contest',
    startDate: new Date('2023/02/14'),
    endDate: new Date('2023/03/13'),
    imageSrc: '',
  },
  {
    id: 6,
    name: 'Farm Spring 2023',
    type: 'farm',
    startDate: new Date(),
    endDate: new Date(),
    imageSrc: '',
  },
  {
    id: 7,
    name: 'Fathom Contest',
    type: 'contest',
    startDate: new Date('2023/08/03'),
    endDate: new Date('2023/09/11'),
    imageSrc: '',
  },
  {
    id: 8,
    name: 'NetherFi Contest',
    type: 'contest',
    startDate: new Date('2023/08/03'),
    endDate: new Date('2023/11/17'),
    imageSrc: '',
  },
  {
    id: 9,
    name: 'Farm Autumn 2023',
    type: 'farm',
    startDate: new Date(),
    endDate: new Date(),
    imageSrc: '',
  },
];

export const guessCompetitionName = (id: number) => {
  return competitionInfo?.[id]?.name || '???';
};

export const getCompetitionInfo = (id: number): CompetitionInfo =>
  competitionInfo?.[id];