import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';

import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { Order } from 'utils/tableUtils';

export interface DisplayData<TData extends Record<string, any>> {
  field: keyof TData;
  label: string;
  numeric: boolean;
  sort: boolean;
  color?: string;
  width: string;
}

export interface EnhancedTableProps<TData extends Record<string, any>> {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TData,
  ) => void;
  order: Order;
  orderBy: string;
  displayConfig: readonly DisplayData<TData>[];
}

export const EnhancedTHs = <TData extends Record<string, any>>(
  props: EnhancedTableProps<TData>,
) => {
  const { order, orderBy, onRequestSort, displayConfig } = props;
  const createSortHandler =
    (property: keyof TData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <>
      {displayConfig.map((headCell) =>
        headCell.sort ? (
          <TableCell
            key={headCell.field.toString()}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.field ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'desc'}
              onClick={createSortHandler(headCell.field)}
              sx={{
                color: `${headCell.color} !important`,
              }}
            >
              {headCell.label}
              {orderBy === headCell.field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ) : (
          <TableCell
            key={headCell.field.toString()}
            align="left"
            padding="normal"
          >
            {headCell.label}
          </TableCell>
        ),
      )}
    </>
  );
};
