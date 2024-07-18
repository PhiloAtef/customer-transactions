import React, { useState, useEffect } from 'react';


const CustomerTable = ({ customers, transactions, onCustomerClick }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);


  useEffect(() => {
    setFilteredCustomers(
      customers.filter(customer =>
        customer.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    );
  }, [nameFilter, customers]);

  useEffect(() => {
    let customerDataArray = [];
    for (let i = 0; i < customers.length; i++) {
      for (let j = 0; j < transactions.length; j++) {
        
        if (customers[i].id == transactions[j].customer_id) {
          let obj = {};
          obj.id = transactions[j].id;
          obj.customerid = customers[i].id;
          obj.name = customers[i].name;
          obj.date = transactions[j].date;
          obj.amount = transactions[j].amount;
          customerDataArray.push(obj);      
        }
      }
    }
    if (nameFilter) {
      setFilteredCustomers(
        customerDataArray.filter(customerData =>
          customerData.name.toLowerCase().includes(nameFilter.toLowerCase())
        )
      );}
      else if(amountFilter){
        setFilteredCustomers(
          customerDataArray.filter(customerData =>
            customerData.amount.toString().includes(amountFilter)
          )
        );
      }
      else{
        setFilteredCustomers(customerDataArray);
      }
    
  }, [nameFilter,amountFilter, customers, transactions]);

  return (
    <div className="container my-4">
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Filter by customer name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
    </div>
    <div className="input-group mb-3">
      <input
        type="number"
        className="form-control"
        placeholder="Filter by transaction amount"
        value={amountFilter}
        onChange={(e) => setAmountFilter(e.target.value)}
      />
    </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Transaction Date</th>
            <th>Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredCustomers.map(cust => (
                <tr key={cust.id} onClick={() => onCustomerClick(cust.customerid)} style={{ cursor: 'pointer' }}>
                <td>{cust.name}</td>
                <td>{cust.date}</td>
                <td>{cust.amount}</td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
