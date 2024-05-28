'use client';

import { TableHead } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/system/Stack';

import numeral from 'numeral';
import * as React from 'react';

import { FC } from 'react';

import { MedalIcon } from 'components/Icons/medals';
import { InlineLoader } from 'components/InlineLoader';

import { DisplayData, EnhancedTHs } from 'components/Table/components';

import { CompetitionData } from 'hooks/useAuditorResults';
import {
  Comparators,
  getComparator,
  Order,
  stableSort,
} from 'utils/tableUtils';

import { ContestBadge } from '../contestBadge';
import { FindingsTooltip } from '../findingsTooltip';

type Data = CompetitionData;

type TableCellProps = {
  field: keyof Data;
  value: any;
  width: string;
};

const TableCellContent: FC<TableCellProps> = ({ field, value, width }) => {
  switch (field) {
    case 'competition':
      return (
        <TableCell width={width}>
          <ContestBadge
            name={value?.name ?? '???'}
            startDate={value?.startDate}
            endDate={value?.endDate}
            imageSrc={value?.imageSrc}
            season={value?.season}
          />
        </TableCell>
      );
    case 'rewards':
      return (
        <TableCell width={width}>
          {value === 0 ? '-' : numeral(value).format('$0,0')}
        </TableCell>
      );
    case 'points':
      return (
        <TableCell width={width}>{numeral(value).format('0,0')}</TableCell>
      );
    case 'rank':
      return (
        <TableCell width={width}>
          <Stack direction="row" spacing={1} alignItems="center">
            <span>
              {value.userRank ?? 'N/A'} / {value.users ?? 'N/A'}
            </span>
            {value.userRank && value.userRank <= 6 && (
              <MedalIcon place={value.userRank} />
            )}
          </Stack>
        </TableCell>
      );
    case 'findings':
      return (
        <TableCell width={width}>
          <FindingsTooltip
            findings={[value.critical, value.high, value.medium, value.low]}
            uniqueFindings={[
              value.uniqueCritical,
              value.uniqueHigh,
              value.uniqueMedium,
              value.uniqueLow,
            ]}
          />
        </TableCell>
      );

    default:
      return <TableCell width={width}>{value}</TableCell>;
  }
};

const TableLoadingRows: FC<{ rowsPerPage: number; columns: number }> =
  React.memo(({ rowsPerPage, columns }) => (
    <>
      {Array.from(Array(rowsPerPage).keys()).map((row) => (
        <TableRow key={`row-${row}`}>
          {Array.from(Array(columns + 1).keys()).map((cell) => (
            <TableCell key={`cell-${cell}`} height={30}>
              <InlineLoader />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  ));

TableLoadingRows.displayName = 'TableLoadingRows';

type ContestTableProps = {
  rows: Data[];
  isLoading: boolean;
  displayData: readonly DisplayData<Data>[];
  descendingComparators?: Comparators<Data>;
};

export const DataTable = ({
  rows,
  isLoading,
  displayData,
  descendingComparators,
}: ContestTableProps) => {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('points');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(
        rows,
        getComparator(order, orderBy, descendingComparators),
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [descendingComparators, order, orderBy, page, rows, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer elevation={0} component={Paper}>
        <Table
          sx={{ minWidth: 850 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <TableHead>
            <TableRow>
              <EnhancedTHs
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                displayConfig={displayData}
              />
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && (
              <TableLoadingRows
                columns={displayData.length}
                rowsPerPage={rowsPerPage}
              />
            )}

            {visibleRows.map((row, index) => {
              return (
                <TableRow tabIndex={-1} key={`data-${index}`}>
                  {displayData.map((headCell) => (
                    <TableCellContent
                      width={headCell.width}
                      key={headCell.field}
                      field={headCell.field}
                      value={row[headCell.field]}
                    />
                  ))}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={9} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
