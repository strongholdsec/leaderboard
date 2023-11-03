import IconButton from '@mui/material/IconButton';
import Stack from '@mui/system/Stack';

import { FC } from 'react';

import ExclamationIcon from 'components/Icons';

import { Tooltip } from 'components/Tooltip';

import { Findings } from '../stats/issuesStats';

type FindingsTooltipProps = {
  findings: [number, number, number, number];
  uniqueFindings: [number, number, number, number];
};

export const FindingsTooltip: FC<FindingsTooltipProps> = ({
  findings,
  uniqueFindings,
}) => (
  <Stack direction="row" alignItems="center">
    {findings
      ? Object.values(findings)
          .reduce((acc: number, val: number) => acc + val, 0)
          .toString()
      : ''}
    <Tooltip
      placement="top"
      title={<Findings findings={findings} uniqueFindings={uniqueFindings} />}
    >
      <IconButton>
        <ExclamationIcon
          sx={{
            color: 'white',
            fill: 'black',
            width: 28,
            height: 28,
            marginBottom: '2px',
          }}
        />
      </IconButton>
    </Tooltip>
  </Stack>
);
