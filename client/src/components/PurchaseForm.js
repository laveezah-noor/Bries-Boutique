import { useState, useEffect } from 'react'
import { ProductGroup } from './Product';
import Select from 'react-select'
import axios from 'axios';

export default function PurchaseForm() {
  const [data, setData] = useState([])
  const [newDealer, setnewDealer] = useState(true)
  const [Date, setDate] = useState("");
  const [BillNo, setBillNo] = useState("");
  const [Dealer, setDealer] = useState({ name: "", phone: "", address: "" });
  const [Purchase, setPurchase] = useState([{ code: "", desc: "", amount: "", qty: "" }]);
  const [Type, setType] = useState("Purchase");
  const [Payment, setPayment] = useState("");

  function handleChange(name, value, index) {
    const list = [...Purchase];
    list[index][name] = value;
    setPurchase(list);
  }

  function handleAdd() {
    setPurchase([...Purchase, { code: "", desc: "", amount: "", qty: "" }])
  }

  function handleNew(e) {
  const {name, value} = e.target;
  console.log(name,value);
  const list = {...Dealer};
  list[name]=value
  // console.log(list);
  setDealer(list)  
  // console.log(Dealer); 
  }

  const port = "https://bries-boutique.herokuapp.com"
  function onSubmit(e) {
    e.preventDefault();
    console.log(BillNo, Date, Dealer, Purchase, Type, Payment);
    
    const body = { Date, BillNo, Dealer, Purchase, Type, Payment }
    console.log(body);
    axios
    .post(`${port}/api/purchases`, body)
    .then(res => console.log(res.data))

  }

  function onReset() {
    // console.log(Date, Dealer, Name, Purchase, Type, Payment);
    // setDate();
    // setDealer();
    // setPurchase([]);
    // setType();
    // setPayment();
  }
  const onChangeDealer = (e) => {
    console.log(e, Dealer);
    setDealer({ name: e.label, phone: e.value.number, address: e.value.address })
    console.log(Dealer);
  }

  useEffect(() => {
    fetch("/api/dealers").then(
      res => res.json())
      .then(data => {
        // console.log(data)
        const list = [];
        for (let i = 1; i < data.length; i++) {
          const name = data[i][0];
          const num = "";
          const adr = data[i][1];
          list.push({ key: i, label: name, value: { name: name, number: num, address: adr } })
        }
        setData(list)
      })
  }, [])
  
  return (
    <div style={{ backgroundColor: "whitesmoke", padding: "30px" }}>
      <h1>Purchase Form</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 col align-self-end">
          <label htmlFor="dateinput" className="form-label">Date</label>
          <input required onChange={(e) => setDate(e.target.value)} value={Date} className="form-control" type="date" id="date" />
        </div>

        <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Bill No#</label>
              <input required onChange={(e) => setBillNo(e.target.value)} value={BillNo} name="bill"
                type="text" className="form-control" id="exampleFormControlInput1" />
            </div>

        {newDealer ? <fieldset>
          <legend> Existing Dealer</legend>

          <div className="mb-3">
            <label htmlFor="exampleDataList" className="form-label">Dealer Name</label>
            <Select 
              isClearable={true}
              isLoading={true}
              isSearchable={true}
              onChange={(e) => onChangeDealer(e)}
              options={data} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number</label>
            <input readOnly
              value={Dealer.phone !== undefined ? Dealer.phone : ""}
              type="text" className="form-control" id="exampleFormControlInput1" placeholder="03xxxxxxxxx" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
            <textarea readOnly
              value={Dealer.address}
              className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

        </fieldset> :
          <fieldset>
            <legend> New Dealer</legend>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Dealer Name</label>
              <input required onChange={(e) => handleNew(e)} value={Dealer.name} name="name"
                type="text" className="form-control" id="exampleFormControlInput1" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number</label>
              <input onChange={(e) => handleNew(e)} name="phone" value={Dealer.phone}
                type="text" className="form-control" id="exampleFormControlInput1" placeholder="03xxxxxxxxx" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
              <textarea required value={Dealer.address} name="address"
                onChange={(e) => handleNew(e)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

          </fieldset>}
        <div className="d-flex justify-content-center">
          <button onClick={() => setnewDealer(!newDealer)} type="button" className="btn btn-outline-primary">{newDealer?"New Dealer":"Existing Dealer"}</button>
        </div>

        <fieldset>
          <legend>Purchase Details</legend>
          {Purchase?.map((item, i) => {
            // console.log(item, i);
            return (
              <ProductGroup
                key={i}
                handle={handleChange}
                item={item}
                index={i} />
            )
          })}
          <div className='row justify-content-evenly'>
            <input onClick={() => { handleAdd() }} className="col-4 m-3 btn btn-outline-primary" type="reset" value="Add More" />
          </div>

        </fieldset>

        <div className="mb-3">
          <label htmlFor="textinput">Type</label>
          <div className="form-check">
            <input defaultChecked value="Purchase" onChange={(e) => setType(e.target.value)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Purchase
            </label>
          </div>
          <div className="form-check">
            <input value="Expense" onChange={(e) => setType(e.target.value)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Expense
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Payment</label>
          <input onChange={(e) => setPayment(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" />
        </div>

        <div className="row justify-content-evenly">
          <input className="col-4 m-3 btn btn-primary" type="submit" value="Submit" />
          <input className="col-4 m-3 btn btn-outline-primary" type="reset" value="Reset" />

        </div>
      </form>
    </div>
  )
}
