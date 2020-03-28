import React from 'react';
import AreaChart from 'recharts/lib/chart/AreaChart';
import Area from 'recharts/lib/cartesian/Area';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import CurrencyCell from './CurrencyCell';
import CurrencyTooltip from './CurrencyTooltip';

export default ({data}) => {
  if(!data) return null;
  console.log(data.map(d => d.date));
  const gradientOffset = () => {
    const itemProfits = data.map((i) => i.profit);
    const dataMax = Math.max(...itemProfits);
    const dataMin = Math.min(...itemProfits);

    if (dataMax <= 0){
      return 0
    }
    else if (dataMin >= 0){
      return 1
    }
    else{
      return dataMax / (dataMax - dataMin);
    }
  };
  const off = gradientOffset();
  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="timestamp"
          scale="time"
          tickFormatter={v => new Date(v).toLocaleString()}
          domain={['dataMin', 'dataMax']}
        />

        <YAxis tick={tick => {
          console.log(tick);
          return (
            <foreignObject x={tick.x - 120} y={tick.y - 9} width={250} height={tick.height}>
              <CurrencyCell amount={tick.payload.value} />
            </foreignObject>

          )
        }} />
        <Tooltip content={<CurrencyTooltip />} />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="green" stopOpacity={1} />
            <stop offset={off} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area type='monotone' name="Buy Price" dataKey='buyPrice' stackId="1" stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' name="Sell Price" dataKey='sellPrice' stackId="2" stroke='#82ca9d' fill='#82ca9d' />
        <Area type='monotone' name="Profit" dataKey='profit' stackId="3" stroke='#ffc658' fill="url(#splitColor)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
