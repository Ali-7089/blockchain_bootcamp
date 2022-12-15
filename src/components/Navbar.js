import logo from '../assets/assets/logo.png';
import { useSelector , useDispatch } from 'react-redux';
import {loadAccount} from '../store/ineraction'
import eth from '../assets/assets/eth.svg';

const Navbar = () => {

    const {account,amount,connection,chainId} = useSelector(state=>state.provider);
    const dispatch = useDispatch();
    const handleAccount=()=>{
        loadAccount(dispatch,connection);
    }

    return(
      <div className='exchange__header grid'>
        <div className='exchange__header--brand flex'>
        <img src={logo} className="logo" alt="logo" />
        <h4>Token Exchange</h4>
        </div>
  
        <div className='exchange__header--networks flex'>
        <img src={eth} alt="" />
        <select className="Network" id="Network">
            <option value="" disabled>Network</option>
            <option value="" >localhost</option>
            <option value="" >kovan</option>
        </select>
        </div>
  
        <div className='exchange__header--account flex'>
        {amount?<p>My Balance : {Number(amount).toFixed(2) + " ETH"}</p>:
        <p>My Balance : 0 ETH</p>       
        }

        {account?<a href="">{account.slice(0,5)+"..."+account.slice(account.length-3)}</a>:
        <button className='button' onClick={handleAccount}>connect</button>  
        }
        </div>
      </div>
    )
  }
  
  export default Navbar;