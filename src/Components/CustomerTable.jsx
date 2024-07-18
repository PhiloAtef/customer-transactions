import React, { useState, useEffect } from 'react';


const CustomerTable = ({ customers, transactions, onCustomerClick }) => {
  const [filter, setFilter] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);


  useEffect(() => {
    setFilteredCustomers(
      customers.filter(customer =>
        customer.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, customers]);

  useEffect(() => {
    let customerDataArray = [];
    console.log("here1")
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
    setFilteredCustomers(
      customerDataArray.filter(customerData =>
        customerData.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, customers, transactions]);

  return (
    <div className="container my-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by customer name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
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
