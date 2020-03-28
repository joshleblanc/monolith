import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import TableCell from '@material-ui/core/TableCell';

const TableCellSkeleton = () => {
  return(
    <TableCell>
      <Skeleton variant="rect"/>
    </TableCell>
  )
}

export default ({ loading, children }) => {
  if(loading) {
    return <TableCellSkeleton />
  } else {
    return(
      <TableCell>
        {children}
      </TableCell>
    )
  }
}
