import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.dateOfEntry),
    datasets: [
      {
        label: "Productivity",
        data: data.map((item) => item.productivity),
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4, // Adjust the line tension for a smoother curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to expand to its container
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Productivity Chart',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Productivity',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '500px', margin: '0 auto' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
