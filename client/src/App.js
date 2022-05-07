import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import OrderForm from './components/OrderForm';
import PurchaseForm from './components/PurchaseForm';
import Table from './components/Table.js';
import ProductGroup from "./components/Product"

function App() {
  
  const [customerData, setcustomerData] = useState([]);
  const [orderData, setorderData] = useState([]);
  const [purchaseData, setpurchaseData] = useState([]);
  const [productData, setproductData] = useState([]);
  useEffect(() => {
    fetch("/api/customers").then(
      res => res.json())
      .then(data => {
        console.log("Customer==>",data)
        setcustomerData(data)
      })
    fetch("/api/orders").then(
      res => res.json())
      .then(data => {
        console.log("Order==>",data)
        setorderData(data)
      })
    fetch("/api/purchases").then(
      res => res.json())
      .then(data => {
        console.log("Purchases==>",data)
        setpurchaseData(data)
      })
    fetch("/api/products").then(
      res => res.json())
      .then(data => {
        console.log("Products==>",data)
        setproductData(data)
      })

  }, [])
  console.log(customerData)
  return (
    // <OrderForm/>
    
    <Router>
      <div className="App"
      
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <Routes>
          <Route path='/' exact element={<Table head={"Customer Sheet"} data={customerData !== undefined ? customerData : []} />} />
          <Route path='/purchase' element={<Table head={"Purchase Sheet"} data={purchaseData !== undefined ? purchaseData : []} />} />
          <Route path='/order' element={<Table head={"Order Sheet"} data={orderData !== undefined ? orderData : []} />} />
          <Route path='/product' element={<Table head={"Product Sheet"} data={productData !== undefined ? productData : []} />} />
          <Route path='/neworder' element={<OrderForm />} />
          <Route path='/newpurchase' element={<PurchaseForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
