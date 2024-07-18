import React, { useState, useEffect, useRef } from 'react';
import CustomerTable from "./Components/CustomerTable.jsx";
import TransactionGraph from "./Components/TransactionGraph.jsx";



function App() {
  //#region use statements
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const ref = useRef(null);
  //#endregion

  //#region fetching data
  useEffect(() => {
    fetch('http://localhost:3001/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
    fetch('http://localhost:3001/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data));
  }, []);
  //#endregion

  //#region handlecustomerclick
  const handleCustomerClick = (customerId) => {
    setSelectedCustomerId(customerId);
    ref.current?.scrollIntoView({behavior : "smooth"})
  };
  //#endregion
  
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
        ref = {ref}
        transactions={transactions} 
        customerId={selectedCustomerId} 
      />
    )}
  </div>
  );
}

export default App;
