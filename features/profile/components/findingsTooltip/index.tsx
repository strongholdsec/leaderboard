import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Stack from '@mui/system/Stack';

import { FC } from 'react';

import styled from 'styled-components';

import ExclamationIcon from 'components/Icons';

import { Findings } from '../stats/issuesStats';

type FindingsTooltipProps = {
  findings: [number, number, number, number];
  uniqueFindings: [number, number, number, number];
};

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
  },
}));

export const FindingsTooltip: FC<FindingsTooltipProps> = ({
  findings,
  uniqueFindings,
}) => (
  <Stack direction="row" alignItems="center">
    {Object.values(findings)
      .reduce((acc: number, val: number) => acc + val, 0)
      .toString()}
    <HtmlTooltip
      placement="top"
      title={
        <Card
          raised
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 30px',
          }}
        >
          <CardContent sx={{ p: 3, pr: 6 }}>
            <Findings findings={findings} uniqueFindings={uniqueFindings} />
          </CardContent>
        </Card>
      }
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
    </HtmlTooltip>
  </Stack>
);
