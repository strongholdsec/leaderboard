import { DisplayData } from 'components/Table/components';

import { CompetitionData } from 'hooks/useAuditorResults';
import { Comparators } from 'utils/tableUtils';

export const farmsDisplayData: readonly DisplayData<CompetitionData>[] = [
  {
    field: 'competition',
    numeric: false,
    label: 'Event',
    sort: true,
    width: '30%',
  },
  {
    field: 'rank',
    numeric: true,
    label: 'Rank',
    sort: true,
    width: '14%',
  },
  {
    field: 'points',
    numeric: true,
    label: 'Points',
    sort: true,
    width: '14%',
  },
  {
    numeric: true,
    label: 'Findings',
    sort: true,
    width: '15%',
    field: 'findings',
  },
];

export const contestsDisplatData: readonly DisplayData<CompetitionData>[] = [
  ...farmsDisplayData.slice(0, 3),
  {
    numeric: true,
    label: 'Rewards',
    sort: true,
    width: '14%',
    field: 'rewards',
  },
  ...farmsDisplayData.slice(3),
];

export const customComparators: Comparators<CompetitionData> = {
  rank: (a, b) => {
    if (!a['rank'].userRank || !b['rank'].userRank) return 0;

    if (b['rank'].userRank > a['rank'].userRank) {
      return -1;
    }
    if (b['rank'].userRank < a['rank'].userRank) {
      return 1;
    }
    return 0;
  },
  competition: (a, b) => {
    if (!a['competition']?.endDate || !b['competition']?.endDate) return 0;

    if (b['competition'].endDate < a['competition'].endDate) {
      return -1;
    }
    if (b['competition'].endDate > a['competition'].endDate) {
      return 1;
    }
    return 0;
  },
  findings: (a, b) => {
    if (!a['findings'] || !b['findings']) return 0;

    const aFindingsSum =
      a.findings.critical +
      a.findings.high +
      a.findings.medium +
      a.findings.low;
    const bFindingsSum =
      b.findings.critical +
      b.findings.high +
      b.findings.medium +
      b.findings.low;

    if (bFindingsSum < aFindingsSum) {
      return -1;
    }
    if (bFindingsSum > aFindingsSum) {
      return 1;
    }
    return 0;
  },
};
