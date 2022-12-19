import config from '../config.json';
import { useSelector } from 'react-redux';

const Markets = () => {

    const {chainId} = useSelector(state=>state.provider);
    
    const marketHandler=(e)=>{
      const tokens = (e.target.value).split(',');
      console.log(tokens);
    }

    return(
      <div className='component exchange__markets'>
        <div className='component__header'>
            <h3>Select Markets</h3>
        </div>
      
      {chainId? (<select name="markets" id="markets" onChange={marketHandler} >
        <option value={`${config[chainId].shery.address},${config[chainId].eTIT.address}`}>shery/eTIT</option>
        <option value={`${config[chainId].shery.address},${config[chainId].eTIT.address}`}>shery/sTIT</option>
       </select>):
       <div>
        <p>tokens not deployed yet</p>
       </div>
  }

      
        <hr />
      </div>
    )
  }
  
  export default Markets;
  