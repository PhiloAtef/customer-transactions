import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

//necessary registering for chart.js
Chart.register(...registerables);

const TransactionGraph = ({ customerId, transactions }) => {
  useEffect(() => {

    //filtering transactions
    const customerTransactions = transactions.filter(
      (transaction) => transaction.customer_id === customerId
    );

    // Aggregate transactions by date
    //first executes a reducer function on each element of the array that results in a single output value
    //expected output of aggregatedData is an object where each key is a date paired with total transaction amount
    const aggregatedData = customerTransactions?.reduce((total, transaction) => {
      const date = transaction.date;
      if (!total[date]) {
        //checks if the total already exist for the current transaction's date. If not, it initializes it to 0
        total[date] = 0;
      }
      total[date] += transaction.amount;
      return total;
    }, {});

    //chart.js needs data in this way
    const dates = Object.keys(aggregatedData);
    const amounts = Object.values(aggregatedData);

    // Destroy previous chart instance if it exists so no overlapping
    if (window.myChart) {
      window.myChart.destroy();
    }

    //boilerplate from chart.js documentation with some modifications to finally create the chart
    const chart = document.getElementById('transactionGraph').getContext('2d');
    window.myChart = new Chart(chart, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Total Transaction Amount per Day',
          data: amounts,
          backgroundColor: '#D6EFD8',
          borderColor: '#80AF81',
          borderWidth: 2,
          pointRadius: 5,
          pointStyle : "circle",
          hitRadius: 10,
          hoverRadius: 10,
          hoverBorderWidth: 10,
          fill: 'origin'  
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
