export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export type Comparator<T> = (a: T, b: T) => 1 | -1 | 0;

export type Comparators<T> = {
  [K in keyof T]?: Comparator<T>;
};

export function getComparator<T, Key extends keyof T>(
  order: Order,
  orderBy: Key,
  descendingComparators?: Comparators<T>,
): (a: T, b: T) => number {
  if (descendingComparators && descendingComparators[orderBy])
    return order === 'desc'
      ? (a, b) => descendingComparators[orderBy]!(a, b)
      : (a, b) => -descendingComparators[orderBy]!(a, b);

  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
