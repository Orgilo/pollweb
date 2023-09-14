// Chart.tsx
import React, { FC } from 'react';
import { PieChart, Pie, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ChartDataItem {
  options:string [];
  answer: string[]; // Pass answer options as a prop
}
interface chartdata{
  value: string[]
  name: string
}
const Chart: FC<ChartDataItem> = ({ options , answer}) => {
  // Calculate chart data based on answer options
  const data = new Array<chartdata>(
    {value: options, name:'options' },
    {value: answer, name:'answer' },

  )

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={150} height={150}>     
          <Pie
            data={options.map((option, index) => ({ value: option, name: `Option ${index + 1}` }))}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          /> 
      </PieChart>
      
    </ResponsiveContainer>
  );
};

export default Chart;
