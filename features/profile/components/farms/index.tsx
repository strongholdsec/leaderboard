'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/system/Stack';
import { AuditorFarmsResult } from 'hooks/useAuditorResults';
import numeral from 'numeral';
import * as React from 'react';

import { FC } from 'react';

import { getComparator, Order, stableSort } from 'utils/tableUtils';

import { InlineLoader } from 'components/InlineLoader';

import { MedalIcon } from 'components/Medals';
import { DisplayData, EnhancedTHs } from 'components/Table/components';

import { ContestBadge } from '../contestBadge';
import { FindingsTooltip } from '../findingsTooltip';

type Data = AuditorFarmsResult;

const displayData: readonly DisplayData<Data>[] = [
  {
    field: 'contest',
    numeric: false,
    label: 'Name',
    sort: false,
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
    field: 'CTFPoints',
    numeric: true,
    label: 'CTF Points',
    sort: true,
    width: '14%',
  },
  {
    numeric: true,
    label: 'Audit Points',
    sort: true,
    width: '14%',
    field: 'auditPoints',
  },
  {
    numeric: true,
    label: 'Findings',
    sort: true,
    width: '14%',
    field: 'findings',
  },
];

type TableCellProps = {
  field: keyof Data;
  value: any;
  width: string;
};

const TableCellContent: FC<TableCellProps> = ({ field, value, width }) => {
  switch (field) {
    case 'contest':
      return (
        <TableCell width={width}>
          <ContestBadge
            title={value.name}
            startDate={value.startDate}
            endDate={value.endDate}
            imageSrc={value.imageSrc}
          />
        </TableCell>
      );
    case 'auditPoints':
    case 'CTFPoints':
      return (
        <TableCell width={width}>{numeral(value).format('0,0')}</TableCell>
      );
    case 'rank':
      return (
        <TableCell width={width}>
          <Stack direction="row" spacing={1} alignItems="center">
            <span>
              {value.user} / {value.total}
            </span>
            {value.user <= 3 && <MedalIcon place={value.user} />}
          </Stack>
        </TableCell>
      );
    case 'findings':
      return (
        <TableCell width={width}>
          <FindingsTooltip
            findings={value.issues}
            uniqueFindings={value.uniqueFindings}
          />
        </TableCell>
      );

    default:
      return <TableCell width={width}>{value}</TableCell>;
  }
};

const TableLoadingRows: FC<{ rowsPerPage: number }> = React.memo(
  ({ rowsPerPage }) => (
    <>
      {Array.from(Array(rowsPerPage).keys()).map((row) => (
        <TableRow key={`row-${row}`}>
          {Array.from(Array(displayData.length + 1).keys()).map((cell) => (
            <TableCell key={`cell-${cell}`} height={30}>
              <InlineLoader />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  ),
);

TableLoadingRows.displayName = 'TableLoadingRows';

type FarmsTableProps = {
  rows: Data[];
  isLoading: boolean;
};

export const FarmsTable = ({ rows, isLoading }: FarmsTableProps) => {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('CTFPoints');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rows, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper} elevation={0}>
        <Table
          sx={{ minWidth: 850 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTHs
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            displayConfig={displayData}
          />
          <TableBody>
            {isLoading && <TableLoadingRows rowsPerPage={rowsPerPage} />}

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
