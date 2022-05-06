import { useState, useEffect } from 'react'
import { ProductGroup } from './Product';
import Select from 'react-select'
import axios from 'axios';

export default function OrderForm() {
  const [data, setData] = useState([])
  const [newCustomer, setnewCustomer] = useState(true)
  const [Date, setDate] = useState("");
  const [Customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [Product, setProduct] = useState([{ code: "", desc: "", amount: "", qty: "" }]);
  const [Courier, setCourier] = useState("");
  const [DC, setDC] = useState("");
  const [CheckDC, setCheckDC] = useState(false);
  const [CheckPayment, setCheckPayment] = useState(false);
  const [TrackingNo, setTrackingNo] = useState("");

  function handleChange(name, value, index) {
    const list = [...Product];
    list[index][name] = value;
    setProduct(list);
  }

  function handleAdd() {
    setProduct([...Product, { code: "", desc: "", amount: "", qty: "" }])
  }

  function handleNew(e) {
  const {name, value} = e.target;
  console.log(name,value);
  const list = {...Customer};
  list[name]=value
  // console.log(list);
  setCustomer(list)  
  // console.log(Customer); 
  }

  const port = "https://bries-boutique.herokuapp.com";
  function onSubmit(e) {
    e.preventDefault();
    console.log(Date, Customer, Product, Courier, DC, CheckDC, CheckPayment, TrackingNo);
    
    const body = { Date, Customer, Product, Courier, DC, CheckDC, CheckPayment, TrackingNo }
    console.log(body);
    axios
    .post(`${port}/api/orders`, body)
    .then(res => console.log(res.data))

  }

  function onReset() {
    // console.log(Date, Customer, Name, Product, Courier, DC, CheckDC, CheckPayment, TrackingNo);
    // setDate();
    // setCustomer();
    // setProduct([]);
    // setCourier();
    // setDC();
    // setCheckDC();
    // setCheckPayment();
    // setTrackingNo();
  }
  const onChangeCustomer = (e) => {
    console.log(e, Customer);
    setCustomer({ name: e.label, phone: e.value.number, address: e.value.address })
    console.log(Customer);
  }

  useEffect(() => {
    fetch("/api/customers").then(
      res => res.json())
      .then(data => {
        // console.log(data)
        const list = [];
        for (let i = 1; i < data.length; i++) {
          const name = data[i][0];
          const num = data[i][1];
          const adr = data[i][2];
          list.push({ key: i, label: name, value: { name: name, number: num, address: adr } })
        }
        setData(list)
      })
  }, [])
  
  return (
    <div style={{ backgroundColor: "whitesmoke", padding: "30px" }}>
      <h1>Order Form</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 col align-self-end">
          <label htmlFor="dateinput" className="form-label">Date</label>
          <input required onChange={(e) => setDate(e.target.value)} value={Date} className="form-control" type="date" id="date" />
        </div>

        {newCustomer ? <fieldset>
          <legend> Existing Customer</legend>

          <div className="mb-3">
            <label htmlFor="exampleDataList" className="form-label">Customer Name</label>
            <Select 
              isClearable={true}
              isLoading={true}
              isSearchable={true}
              onChange={(e) => onChangeCustomer(e)}
              options={data} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number</label>
            <input readOnly
              value={Customer.phone != undefined ? Customer.phone : ""}
              type="text" className="form-control" id="exampleFormControlInput1" placeholder="03xxxxxxxxx" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
            <textarea readOnly
              value={Customer.address}
              className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

        </fieldset> :
          <fieldset>
            <legend> New Customer</legend>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Customer Name</label>
              <input required onChange={(e) => handleNew(e)} value={Customer.name} name="name"
                type="text" className="form-control" id="exampleFormControlInput1" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number</label>
              <input required onChange={(e) => handleNew(e)} name="phone" value={Customer.phone}
                type="text" className="form-control" id="exampleFormControlInput1" placeholder="03xxxxxxxxx" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
              <textarea required value={Customer.address} name="address"
                onChange={(e) => handleNew(e)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

          </fieldset>}
        <div className="d-flex justify-content-center">
          <button onClick={() => setnewCustomer(!newCustomer)} type="button" className="btn btn-outline-primary">{newCustomer?"New Customer":"Existing Customer"}</button>
        </div>
        <fieldset>
          <legend>Product Details</legend>
          {Product?.map((item, i) => {
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
          <label htmlFor="exampleFormControlInput1" className="form-label">Delivery Charges</label>
          <input onChange={(e) => setDC(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" />
        </div>

        <div className="mb-3">
          <label htmlFor="textinput">Courier Service</label>
          <div className="form-check">
            <input value="Personal" onChange={(e) => setCourier(e.target.value)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Personal
            </label>
          </div>
          <div className="form-check">
            <input value="M&P" onChange={(e) => setCourier(e.target.value)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              M&P
            </label>
          </div>
        </div>

        <div className="row justify-content-evenly">
          <div className="col-4 form-check form-switch">
            <input onClick={(e) => setCheckDC(!CheckDC)} value={CheckDC} type="checkbox" className="form-check-input" role="switch" autoComplete="off" />
            <label className="form-check-label" htmlFor="btn-check-outlined">DC Received</label><br />
          </div>
          <div className="col-4 form-check form-switch">
            <input onClick={(e) => setCheckPayment(!CheckPayment)} value={CheckDC} type="checkbox" className="form-check-input" role="switch" autoComplete="off" />
            <label className="form-check-label" htmlFor="btn-check-outlined">Payment Received</label><br />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Tracking Number</label>
          <input onChange={(e) => setTrackingNo(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="#00xxxxxxxxx" />
        </div>

        <div className="row justify-content-evenly">
          <input className="col-4 m-3 btn btn-primary" type="submit" value="Submit" />
          <input className="col-4 m-3 btn btn-outline-primary" type="reset" value="Reset" />

        </div>
      </form>
    </div>
  )
}


const TextField = ({
  label,
  field: { name, value, ...fieldProps },
  form,
  required,
  ...props
}) => {
  return (
    <FormField id={name} label={label} required={required} formProps={form}>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        {...fieldProps}
        {...props}
      />
    </FormField>
  )
}

const FormField = ({
  id,
  label,
  required,
  children,
  formProps: { touched, errors },
}) => {
  const hasError = errors[id] && touched[id]

  return (
    <div className="field" id={id} label={label}>
      <label htmlFor={id}>
        {label}
        {required && <sup className="required">*</sup>}
      </label>
      {children}
      {hasError && <small className="error">{errors[id]}</small>}
    </div>
  )
}

// export const Select = ({
//   label,
//   field: { name, value, ...fieldProps },
//   form,
//   required,
//   options,
//   ...props
// }) => {
//   return (
//     <FormField id={name} label={label} required={required} formProps={form}>
//       <select name={name} id={name} {...fieldProps} {...props}>
//         <option value="">Select one</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </FormField>
//   )
// }