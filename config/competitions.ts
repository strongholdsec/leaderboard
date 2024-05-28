import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
  validateSync,
} from 'class-validator';

import competitions from 'content/competitions.yaml';

export enum CompetitionType {
  FARM = 'farm',
  CONTEST = 'contest',
}

export enum SeasonType {
  _2022 = 2022,
  _2023 = 2023,
  _2024 = 2024,
  _2025 = 2025,
  _2026 = 2026,
}

export type YamlCompetitionInfo = {
  id: number;
  name: string;
  type: CompetitionType;
  startDate?: string;
  endDate?: string;
  imageSrc?: string | undefined;
  season: SeasonType;
};

export class CompetitionInfo {
  constructor(info: YamlCompetitionInfo) {
    if (info.endDate && info.startDate) {
      try {
        this.endDate = new Date(info.endDate);
        this.startDate = new Date(info.startDate);
      } catch (error) {
        throw new Error('Invalid value for Dates');
      }
    }

    this.id = info.id;
    this.imageSrc = info.imageSrc;
    this.name = info.name;
    this.season = info.season;
    this.type = info.type;

    this.validate();
  }

  protected validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new Error('Competition validation error: ', errors[0].value);
    }
  }

  @IsInt()
  @Min(0)
  id: number;

  name: string;

  @IsEnum(CompetitionType)
  type: CompetitionType;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsOptional()
  imageSrc?: string;

  @IsEnum(SeasonType)
  season: SeasonType;
}

const competitionsInfo: CompetitionInfo[] = competitions.competitions
  .map((info: YamlCompetitionInfo) => {
    try {
      const competitionInfo = new CompetitionInfo(info);
      return competitionInfo;
    } catch (error) {
      return undefined;
    }
  })
  .filter((competition: CompetitionInfo | undefined) => !!competition);

export const guessCompetitionName = (id: number) => {
  return competitionsInfo?.[id]?.name || '???';
};

export const getCompetitionInfo = (id: number): CompetitionInfo =>
  competitionsInfo?.[id];
