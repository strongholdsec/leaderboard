'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { useContestInfo } from 'hooks/useContestInfo';
import * as React from 'react';

import { FC, useMemo } from 'react';

import { AddressBadge } from 'components/AddressBadge';

import { IAuditorResult } from 'types';

import { getComparator, Order, stableSort } from './utils';
import { InlineLoader } from '../../../../components/InlineLoader';

type Data = Pick<
  IAuditorResult,
  'address' | 'total' | 'contests' | 'critical' | 'medium' | 'low' | 'high'
>;

interface DisplayData {
  field: keyof Data;
  label: string;
  numeric: boolean;
  sort: boolean;
  color?: string;
  width: string;
}

const displayData: readonly DisplayData[] = [
  {
    field: 'address',
    numeric: false,
    label: 'User',
    sort: false,
    width: '18%',
  },
  {
    field: 'total',
    numeric: true,
    label: 'SBT rating',
    sort: true,
    width: '13%',
  },
  {
    field: 'contests',
    numeric: true,
    label: 'Contests',
    sort: true,
    width: '13%',
  },
  {
    field: 'critical',
    numeric: true,
    label: 'Critical',
    sort: true,
    color: '#ff394a',
    width: '13%',
  },
  {
    numeric: true,
    label: 'High',
    sort: true,
    color: '#6b63bd',
    width: '13%',
    field: 'high',
  },
  {
    numeric: true,
    label: 'Medium',
    sort: true,
    color: '#0089d8',
    width: '13%',
    field: 'medium',
  },
  {
    numeric: true,
    label: 'Low',
    sort: true,
    color: '#02a397',
    width: '13%',
    field: 'low',
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        {displayData.map((headCell) =>
          headCell.sort ? (
            <TableCell
              key={headCell.field}
              align="left"
              padding="normal"
              sortDirection={orderBy === headCell.field ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.field}
                direction={orderBy === headCell.field ? order : 'asc'}
                onClick={createSortHandler(headCell.field)}
                sx={{
                  color: `${headCell.color} !important`,
                }}
              >
                {headCell.label}
                {orderBy === headCell.field ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell key={headCell.field} align="left" padding="normal">
              {headCell.label}
            </TableCell>
          ),
        )}
      </TableRow>
    </TableHead>
  );
}

type TableCellProps = {
  field: keyof Data;
  value: any;
  width: string;
  color?: string | undefined;
};

const TableCellContent: FC<TableCellProps> = ({
  field,
  value,
  width,
  color,
}) => {
  switch (field) {
    case 'address':
      return (
        <TableCell width={width}>
          <AddressBadge address={value.toString()} symbols={4} />
        </TableCell>
      );
    case 'total':
      return <TableCell width={width}>{value.toLocaleString()}</TableCell>;
    case 'critical':
    case 'medium':
    case 'high':
    case 'low':
      return (
        <TableCell
          sx={{
            color,
          }}
          width={width}
        >
          {value}
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
          {Array.from(Array(8).keys()).map((cell) => (
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

export const Leaderboard = () => {
  const { data, isLoading } = useContestInfo();
  const rows: Data[] = useMemo(
    () => (data?.auditorResults as Data[]) ?? [],
    [data?.auditorResults],
  );

  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('total');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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
      <Paper elevation={0} sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {isLoading && <TableLoadingRows rowsPerPage={rowsPerPage} />}

              {visibleRows.map((row, index) => {
                return (
                  <TableRow tabIndex={-1} key={`data-${index}`}>
                    <TableCell width="4%" padding="none">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    {displayData.map((headCell) => (
                      <TableCellContent
                        width={headCell.width}
                        key={headCell.field}
                        field={headCell.field}
                        value={row[headCell.field]}
                        color={headCell.color}
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
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};