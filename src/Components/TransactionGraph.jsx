import React from 'react';
import { Line } from 'react-chartjs-2';

const TransactionGraph = ({ transactions, customerId }) => {
    console.log(transactions);
  const customerTransactions = transactions.filter(transaction => transaction.customer_id === customerId);

  const data = {
    labels: customerTransactions.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Transaction Amount',
        data: customerTransactions.map(transaction => transaction.amount),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <>
  <div className="container my-4">
      <h2>Transaction Graph</h2>
      <Line data={data} />
    </div>
  </>
};

export default TransactionGraph;
