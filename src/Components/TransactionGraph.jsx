import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TransactionGraph = ({ customerId, transactions }) => {
  useEffect(() => {
    const customerTransactions = transactions.filter(
      (transaction) => transaction.customer_id === customerId
    );

    // Aggregate transactions by date
    const aggregatedData = customerTransactions.reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {});

    const dates = Object.keys(aggregatedData);
    const amounts = Object.values(aggregatedData);

    // Destroy previous chart instance if it exists
    if (window.myChart) {
      window.myChart.destroy();
    }

    const ctx = document.getElementById('transactionGraph').getContext('2d');
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Total Transaction Amount per Day',
          data: amounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [customerId, transactions]);

  return (
    <div className="container my-4">
      <canvas id="transactionGraph"></canvas>
    </div>
  );
};

export default TransactionGraph;
