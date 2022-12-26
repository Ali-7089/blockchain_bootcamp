import { useState } from "react";
import { useRef } from "react";

const Order = () => {
    const buyRef = useRef(null);
    const sellRef = useRef(null);

    const[isBuy,setIsBuy] = useState(true);
    const[Amount,setAmount] = useState(0);
    const[Price, setPrice] = useState(0);

    const tabHandler = (e)=>{
    if(e.target.className!=buyRef.current.className){
        e.target.className = 'tab tab--active'
        buyRef.current.className = 'tab'
        setIsBuy(false);
    }else {
        e.target.className = 'tab tab--active'
        sellRef.current.className = 'tab'
        setIsBuy(true);
    }
    }

    const buyHandler=(e)=>{
        e.preventDefault();
       
    } 

    const sellHandler=(e)=>{
        e.preventDefault();
       
    }

    return (
      <div className="component exchange__orders">
        <div className='component__header flex-between'>
          <h2>New Order</h2>
          <div className='tabs'>
            <button onClick={tabHandler} className='tab tab--active' ref={buyRef}>Buy</button>
            <button onClick={tabHandler} className='tab' ref={sellRef}>Sell</button>
          </div>
        </div>
  
        <form onClick={ isBuy?buyHandler:sellHandler}>     
       <label htmlFor="amount">{isBuy?'Buy Amount':'Sell Amount'}</label>
         
          <input
              type="text"
              id='amount'
              placeholder='0.0000'
              onChange={(e)=>setAmount(e.target.value)}
          />
  
         
            <label htmlFor="price">{isBuy?'Buy Price':'Sell Price'}</label>
         
          <input
              type="text"
              id='price'
              placeholder='0.0000'
              onChange={(e)=>setPrice(e.target.value)}
          />
  
          <button className='button button--filled' type='submit'>
                <span>{isBuy?'Buy Order':'Sell Order'}</span>
          </button>
        </form>
      </div>
    );
  }
  
export default Order;
  