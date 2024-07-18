import React, { useState, useEffect } from 'react';


const CustomerTable = ({ customers, transactions, onCustomerClick }) => {

  //#region states
  const [nameFilter, setNameFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  //#endregion

  //#region data recall useEffect
  useEffect(() => {
    setFilteredCustomers(
      customers.filter(customer =>
        customer.name.toLowerCase().includes(nameFilter.toLowerCase()) //checking if the name typed in the filter is included in the customer names
      )
    );
  }, [nameFilter, customers]);
//#endregion

  //#region useEffect for creating a customer data array, populating it by for looping the data from customers and transactions and pushing it to it. also filter functionality
  useEffect(() => {
    //initializing an empty array to hold the objects
    let customerDataArray = []; 

    //for looping over the transaction array based on current customers selected
    for (let i = 0; i < customers.length; i++) {
      for (let j = 0; j < transactions.length; j++) {
        //check to see if the id in customer fits the customer_id in corresponding entry in transactions
        if (customers[i].id == transactions[j].customer_id) {
          //creating an object, deconstructing relevant data we want to extract into it and pushing it back to customerDataArray to be used
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

    //setting filter up based on wether it is written in the name or amount filter
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
  //#endregion

  return (
    <div className="container my-4">
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Filter by customer name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        disabled={amountFilter !== ''}
      />
    </div>
    <div className="input-group mb-3">
      <input
        type="number"
        className="form-control"
        placeholder="Filter by transaction amount"
        value={amountFilter}
        onChange={(e) => setAmountFilter(e.target.value)}
        disabled={nameFilter !== ''}
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
