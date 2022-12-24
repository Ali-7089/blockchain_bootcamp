import logo from '../assets/assets/shery.png'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect , useState} from 'react';
import { loadBalance } from '../store/ineraction';
import { TransferToken } from '../store/ineraction';


const Balance = () => {
  const dispatch = useDispatch();
  const provider = useSelector(state=>state.provider.connection);
  const symbols = useSelector(state=>state.tokens.symbols);
  const contracts = useSelector(state=>state.tokens.contracts);
  const account = useSelector(state =>state.provider.account);
  const exchange = useSelector(state=>state.exchange.exchange);
  const balances = useSelector(state =>state.tokens.balances);
  const exchange_balance = useSelector(state=>state.exchange.balances)

  const[Token1Transfer , setToken1Transfer] = useState(0);

  useEffect(()=>{
    if(contracts && account && exchange){
      loadBalance(dispatch,contracts,account,exchange);
    }
  },[exchange,contracts,account])

  const balanceHandler = (e,token)=>{
    if(token.address== contracts[0].address){
      setToken1Transfer(e.target.value);
    }
  }

  //[X] Step 1 - do the transfer
  //[X] step 2 - notify the app that transfer is Pending
  // step 3 - fetch the info from blockchain that transfer was successfull
  // step 4 - notify the app that tranfer was successfull

  const depositHandler = (e,token)=>{
    e.preventDefault();
   if(token.address==contracts[0].address){
    TransferToken(provider,exchange,Token1Transfer,token,dispatch);
   }
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
  
          <form  onSubmit={(e)=>depositHandler(e,contracts[0])}>
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
  