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
          {filteredCustomers.map(customer => (
            transactions.filter(transaction => transaction.customer_id === customer.id).map(transaction => (
              <tr key={transaction.id} onClick={() => onCustomerClick(customer.id)} style={{ cursor: 'pointer' }}>
                <td>{customer.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
