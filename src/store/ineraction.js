import { ethers } from "ethers";

export const loadProvider = (dispatch)=>{
    const connection = new ethers.providers.Web3Provider(window.ethereum);
    dispatch({type:'PROVIDER_LOADED', connection});

    return connection;
}

export const loadNetwork = async(dispatch,provider)=>{
    const network = await provider.getNetwork();
    console.log(network.chainId)
    dispatch({type:'NETWORK_LOADED' , chainId : network.chainId});

    return network.chainId;
}