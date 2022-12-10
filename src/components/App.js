import { ethers } from 'ethers';
import { useEffect } from 'react';
import '../App.css';
import config from '../config.json';
import TOKEN_ABI from '../abi/Token.json';

function App() {
  
    const loadBlockchainData = async()=>{
      const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
      console.log(accounts[0]);

      // connect ether with blockchain

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const {chainId} = await provider.getNetwork();

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

