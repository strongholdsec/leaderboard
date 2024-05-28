import FantomIcon from 'assets/icons/fantom.jpg';
import FarmAutumn from 'assets/icons/farm_autumn.svg';
import FarmSpring from 'assets/icons/farm_spring.svg';
// import FarmSummer from 'assets/icons/farm_summer.svg';
import FarmWinter from 'assets/icons/farm_winter.svg';
import LidoIcon from 'assets/icons/lido.svg';
import MoonwellIcon from 'assets/icons/moonwel.svg';
import NetherFi from 'assets/icons/netherfi.jpg';
import Shiftam from 'assets/icons/shiftam.png';
import UNCXIcon from 'assets/icons/uncx.svg';

export type CompetitionType = 'farm' | 'contest';
export type SeasonType = 2022 | 2023;

export type CompetitionInfo = {
  id: number;
  name: string;
  type: CompetitionType;
  startDate: Date;
  endDate: Date;
  imageSrc: string;
  season: SeasonType;
};

/*
ID = 0 - Farm Winter 2023 (23.01.2023 - 01.03.2023);
ID = 1 - Farm Spring 2022 (01.04.2022 - 04.05.2022);
ID = 2 - Farm Autumn 2022 (22.07.2022 - 26.09.2022);
ID = 3 - Moonwell Contest (9.10.2022 - 16.10.2022);
ID = 4 - Sidechain Oracles Contest (05.12.2022 - 11.12.2022);
ID = 5 - Lido Contest (14.02.2023 - 13.03.2023);
ID = 6 - Farm Spring 2023 (28.04.2023 - 16.06.2023);
ID = 7 - Fathom Contest (03.08.2023 - 11.09.2023);
ID = 8 - NetherFi Contest (02.10.23 - 17.11.23);
ID = 9 - Farm Autumn 2023 (30.10.2023 - 26.12.2023).
*/
export const competitionInfo: CompetitionInfo[] = [
  {
    id: 0,
    name: 'Farm Winter 2023',
    type: 'farm',
    startDate: new Date('2023/01/23'),
    endDate: new Date('2023/03/01'),
    season: 2023,
    imageSrc: FarmWinter,
  },
  {
    id: 1,
    name: 'Farm Spring 2022',
    type: 'farm',
    startDate: new Date('2022/04/01'),
    endDate: new Date('2022/05/04'),
    season: 2022,
    imageSrc: FarmSpring,
  },
  {
    id: 2,
    name: 'Farm Autumn 2022',
    type: 'farm',
    startDate: new Date('2022/07/22'),
    endDate: new Date('2022/09/26'),
    season: 2022,
    imageSrc: FarmAutumn,
  },
  {
    id: 3,
    name: 'Moonwell Contest',
    type: 'contest',
    startDate: new Date('2022/10/09'),
    endDate: new Date('2022/10/16'),
    season: 2022,
    imageSrc: MoonwellIcon,
  },
  {
    id: 4,
    name: 'Sidechain Oracles Contest',
    type: 'contest',
    startDate: new Date('2022/12/05'),
    endDate: new Date('2022/12/11'),
    season: 2022,
    imageSrc: '',
  },
  {
    id: 5,
    name: 'Lido Contest',
    type: 'contest',
    startDate: new Date('2023/02/14'),
    endDate: new Date('2023/03/13'),
    season: 2023,
    imageSrc: LidoIcon,
  },
  {
    id: 6,
    name: 'Farm Spring 2023',
    type: 'farm',
    startDate: new Date('2023/04/28'),
    endDate: new Date('2023/06/16'),
    season: 2023,
    imageSrc: FarmSpring,
  },
  {
    id: 7,
    name: 'Fathom Contest',
    type: 'contest',
    startDate: new Date('2023/08/03'),
    endDate: new Date('2023/09/11'),
    season: 2023,
    imageSrc: FantomIcon.src,
  },
  {
    id: 8,
    name: 'NetherFi Contest',
    type: 'contest',
    startDate: new Date('2023/08/03'),
    endDate: new Date('2023/11/17'),
    season: 2023,
    imageSrc: NetherFi.src,
  },
  {
    id: 9,
    name: 'UNCX Contest',
    type: 'contest',
    startDate: new Date('2023/11/23'),
    endDate: new Date('2023/12/11'),
    season: 2023,
    imageSrc: UNCXIcon,
  },
  {
    id: 10,
    name: 'Shiftam Contest',
    type: 'contest',
    startDate: new Date('2023/12/08'),
    endDate: new Date('2023/12/25'),
    season: 2023,
    imageSrc: Shiftam.src,
  },
  {
    id: 11,
    name: 'Farm Autumn 2023',
    type: 'farm',
    startDate: new Date('2023/10/30'),
    endDate: new Date('2024/01/26'),
    season: 2023,
    imageSrc: FarmAutumn,
  },
];

export const guessCompetitionName = (id: number) => {
  return competitionInfo?.[id]?.name || '???';
};

export const getCompetitionInfo = (id: number): CompetitionInfo =>
  competitionInfo?.[id];
