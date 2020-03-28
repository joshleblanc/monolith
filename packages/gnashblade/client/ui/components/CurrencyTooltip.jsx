import React from 'react';
import Typography from '@material-ui/core/Typography';
import PaddedPaper from './PaddedPaper';
import CurrencyCell from './CurrencyCell';


export default (tooltip) => {
  return (
    <PaddedPaper>
      <Typography variant="caption">{new Date(tooltip.label).toLocaleString()}</Typography>
      {
        tooltip.payload.map(p => {
          return (
            <div style={{ color: p.color }} key={p.dataKey}>
              <Typography variant="caption">{p.name}: </Typography>
              <CurrencyCell amount={p.value} />
            </div>
          )
        })
      }
    </PaddedPaper>
  );
}