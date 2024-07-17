import React, { useState, useEffect } from 'react';
import CustomerTable from "./Components/CustomerTable.jsx";
import TransactionGraph from "./Components/TransactionGraph.jsx";



function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  

  useEffect(() => {
    fetch('http://localhost:3001/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
    fetch('http://localhost:3001/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data));

      console.log(transactions);
  }, []);

  const handleCustomerClick = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  return (

    <div className="container">
    <h1 className="text-center my-4">Customer Transactions</h1>
    <CustomerTable 
      customers={customers} 
      transactions={transactions} 
      onCustomerClick={handleCustomerClick} 
    />
    {selectedCustomerId && (
      <TransactionGraph 
        transactions={transactions} 
        customerId={selectedCustomerId} 
      />
    )}
  </div>
  );
}

export default App;
