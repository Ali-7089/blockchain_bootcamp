import { ethers } from 'ethers';
import { useEffect } from 'react';
import '../App.css';
import config from '../config.json';
import TOKEN_ABI from '../abi/Token.json';
import {useDispatch} from 'react-redux';
import {loadProvider,loadNetwork} from '../store/ineraction';

function App() {
  const dispatch = useDispatch();

    const loadBlockchainData = async()=>{
      const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      console.log(accounts[0]);

      // connect ether with blockchain
      const provider = loadProvider(dispatch);
      const chainId = await loadNetwork(dispatch,provider);

      //fetching contracts
      const token = new ethers.Contract( config[chainId].shery.address,TOKEN_ABI,provider);
      console.log(await token.symbol());

    }



    useEffect(()=>{
      loadBlockchainData();
    })

  return (
    <div>

      {/* Navbar */}

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          {/* Markets */}

          {/* Balance */}

          {/* Order */}

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

      {/* Alert */}

    </div>
  );
}

export default App;

