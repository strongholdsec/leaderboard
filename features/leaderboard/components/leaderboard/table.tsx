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

import { useMemo } from 'react';

import { AddressBadge } from 'components/AddressBadge';

import { Socials } from './components/socials';
import { getComparator, Order, stableSort } from './utils';

interface Data {
  index: number;
  address: string;
  total: bigint;
  contests: number;
  socials: any;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
  sort: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'index',
    numeric: true,
    label: '#',
    sort: false,
  },
  {
    id: 'address',
    numeric: false,
    label: 'User',
    sort: false,
  },
  {
    id: 'total',
    numeric: true,
    label: 'SBT rating',
    sort: true,
  },
  {
    id: 'contests',
    numeric: true,
    label: 'Contests',
    sort: true,
  },
  {
    id: 'socials',
    numeric: false,
    label: 'Socials',
    sort: false,
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
        {headCells.map((headCell) =>
          headCell.sort ? (
            <TableCell
              key={headCell.id}
              align="left"
              padding="normal"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell key={headCell.id} align="left" padding="normal">
              {headCell.label}
            </TableCell>
          ),
        )}
      </TableRow>
    </TableHead>
  );
}

export const Leaderboard = () => {
  const { data } = useContestInfo();
  const rows: Data[] = useMemo(
    () =>
      data?.auditorResults?.map((item, index) => ({
        index,
        address: item.address,
        total: item.total,
        contests: item.competitions.length,
        socials: item.address,
      })) ?? [],
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
              {visibleRows.map((row) => {
                return (
                  <TableRow tabIndex={-1} key={`data-${row.index}`}>
                    <TableCell width="8%" padding="none">
                      {row.index.toString()}
                    </TableCell>
                    <TableCell width="22%" align="left">
                      <AddressBadge
                        address={row.address.toString()}
                        symbols={4}
                      />
                    </TableCell>
                    <TableCell width="22%" align="left">
                      {row.total.toLocaleString()}
                    </TableCell>
                    <TableCell width="22%" align="left">
                      {row.contests.toString()}
                    </TableCell>
                    <TableCell width="22%" align="left">
                      <Socials address={row.address.toString()} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
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
