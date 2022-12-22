import logo from '../assets/assets/shery.png'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect , useState} from 'react';
import { loadBalance } from '../store/ineraction';
import { tokens } from '../store/reducers';


const Balance = () => {
  const dispatch = useDispatch();
  const symbols = useSelector(state=>state.tokens.symbols);
  const contracts = useSelector(state=>state.tokens.contracts);
  const account = useSelector(state =>state.provider.account);
  const exchange = useSelector(state=>state.exchange.exchange);
  const balances = useSelector(state =>state.tokens.balances);
  const exchange_balance = useSelector(state=>state.exchange.balances)

  const[state , setState] = useState(0);

  useEffect(()=>{
    if(contracts && account && exchange){
      loadBalance(dispatch,contracts,account,exchange);
    }
  },[exchange,contracts,account])

  const balanceHandler = (e,token)=>{
    if(token.address== contracts[0].address){
      setState(e.target.value);
    }
    console.log(state)
  }

    return (
      <div className='component exchange__transfers'>
        <div className='component__header flex-between'>
          <h2>Balance</h2>
          <div className='tabs'>
            <button className='tab tab--active'>Deposit</button>
            <button className='tab'>Withdraw</button>
          </div>
        </div>
  
        {/* Deposit/Withdraw Component 1 (DApp) */}
  
        <div className='exchange__transfers--form'>
          <div className='flex-between'>
          <p><small>Token</small><br /><img src={logo} className='sheryPng' alt="" />{symbols && symbols[0]}</p>
          <p><small>Balance</small><br />{balances && balances[0]}</p>
           <p><small>Exchange</small><br />{exchange_balance && exchange_balance[0]}</p>
          </div>
  
          <form>
            <label htmlFor="token0">Amount</label>
            <input
              type="text"
              id='token0'
              placeholder='0.0000'
              onChange={(e)=>balanceHandler(e,contracts[0])}
             />
  
            <button className='button' type='submit'>
              <span>Deposit</span>
            </button>
          </form>
        </div>
  
        <hr />
  
        {/* Deposit/Withdraw Component 2 (mETH) */}
  
        <div className='exchange__transfers--form'>
          <div className='flex-between'>
  
          </div>
  
          <form>
            <label htmlFor="token1"></label>
            <input type="text" id='token1' placeholder='0.0000'/>
  
            <button className='button' type='submit'>
              <span></span>
            </button>
          </form>
        </div>
  
        <hr />
      </div>
    );
  }
  
  export default Balance;
  