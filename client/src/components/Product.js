import React, {
  useState,
  useEffect
} from 'react'
import CreatableSelect from 'react-select/creatable';

export const ProductGroup = ({ item, handle, index }) => {
  const [CodeData, setCodeData] = useState([])
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: state.selectProps.menuColor,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      height: 50,
      fontSize: 14,
      marginTop: 5
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: 55
    }),
  }
  useEffect(() => {
    fetch("/api/products").then(
      res => res.json())
      .then(data => {
        // console.log(data)
        const list = [];
        for (let i = 0; i < data.length; i++) {
          const element = data[i][0];
          list.push({ value: element, label: element })
        }
        setCodeData(list)
        // console.log(CodeData);
      })
  }, [])
  
  return (
    <div className="row g-2 mb-3">
      <div className="col-md">
        <div className="form-floating">
          {/* {newCode ? <input onChange={(e) => handle(e,index)} type="text" className="form-control" id="floatingSelectGrid" />
            : <select 
            onChange={(e)=>handle(e,index)}
            value={item.code}
            className="form-select" id="floatingSelectGrid" aria-label="Floating label select example">
              <option></option>
              <option value={1}>1</option>
              <option value="0">New Product</option>
              {CodeData ?
                CodeData.map((item) => {
                  return (
                    <option key={item.label} value={item.value}>{item.label}</option>

                  )
                }) : null
              }
            </select>} */}
          <CreatableSelect
            isClearable
            options={CodeData}
            onChange={(e)=>
              handle("code",e.value,index)}
            placeholder="Product Code"
            styles={customStyles}
            className="react-select-container"
          />

          {/* <label htmlFor="floatingSelectGrid">Product Code</label> */}
        </div>
      </div>

      <div className="col-md" >
        <div className="form-floating">
          <textarea 
          onChange={(e) => handle(e.target.name,e.target.value,index)}
          value={item.desc} 
          name="desc"
          className="form-control" id="floatingTextarea2" ></textarea>
          <label htmlFor="floatingTextarea2">Description</label>
        </div>
      </div>
      <div className="col-md">
        <div className="form-floating">
          <input 
          onChange={(e) => handle(e.target.name,e.target.value,index)}
          name="amount"
          value={item.amount}
          type="text" className="form-control" id="floatingInputGrid" />
          <label htmlFor="floatingInputGrid">Amount</label>
        </div>
      </div>
      <div className="col-md">
        <div className="form-floating">
          <input 
          onChange={(e) => handle(e.target.name,e.target.value,index)}
          value={item.qty}
          name="qty"
          type="text" className="form-control" id="floatingInputGrid" />
          <label htmlFor="floatingInputGrid">Quantity</label>
        </div>
      </div>
    </div>
  )
}
