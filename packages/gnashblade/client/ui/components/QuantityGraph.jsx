import React from 'react';
import AreaChart from 'recharts/lib/chart/AreaChart';
import Area from 'recharts/lib/cartesian/Area';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';

export default ({data}) => {
  if(!data) return null;
  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="timestamp"
          scale="time"
          tickFormatter={v => new Date(v).toLocaleString()}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis />
        <Tooltip labelFormatter={value => new Date(value).toLocaleString()} />
        <Area type='monotone' name="Buy Orders" dataKey='buyOrders' stackId="1" stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' name="Sell Orders" dataKey='sellOrders' stackId="2" stroke='#82ca9d' fill='#82ca9d' />
      </AreaChart>
    </ResponsiveContainer>
  )
}
