const hre = require("hardhat");
const {ethers} =require("hardhat");
const config = require('../src/config.json');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether");
  };

const wait=(second)=>{
    const milisecond = second * 1000;
    return new Promise(resolve => resolve, milisecond);
}

async function main() {
     const accounts = await ethers.getSigners();

     const {chainId} = await ethers.provider.getNetwork();

     const shery = await ethers.getContractAt('Token',config[chainId].shery.address);
     console.log(`shery fetched from this ${shery.address} address`)

     const eTIT = await ethers.getContractAt('Token',config[chainId].eTIT.address);
     console.log(`eTIT fetched from this ${eTIT.address} address`)

     const sTIT = await ethers.getContractAt('Token',config[chainId].sTIT.address);
     console.log(`sTIT fetched from this ${sTIT.address} address`)

     const exchange = await ethers.getContractAt('Exchange',config[chainId].exchange.address);
     console.log(`exchange fetched from this ${exchange.address} address`)

     let sender = accounts[0];
     let receiver = accounts[1];
     let amount = tokens('10000');

     // reciever get 10,000 eTIT coins from sender
     let transaction , result;
     transaction = await eTIT.connect(sender).transfer(receiver.address,amount);
     await transaction.wait();
     console.log(`receiver get 10,000 eTIT from ${sender.address}`);

     let user1 = accounts[0];
     let user2 = accounts[1];

     //user1 approves tokens to exchange
     transaction = await shery.connect(user1).approve(exchange.address,tokens(100));
     await transaction.wait();
     console.log(`shery coins approved by ${user1.address}`);

     //user1 deposit tokens to exchange
     transaction = await exchange.connect(user1).depositToken(shery.address,tokens(100));
     await transaction.wait();
     console.log(`shery deposited to ${exchange.address}`);

     //user2 approves tokens to exchange
     transaction = await eTIT.connect(user2).approve(exchange.address,tokens(100));
     await transaction.wait();
     console.log(`shery coins approved by ${user2.address}`);

     //user2 deposit tokens to exchange
     transaction = await exchange.connect(user2).depositToken(eTIT.address,tokens(100));
     await transaction.wait();
     console.log(`shery deposited to ${exchange.address}`);

     //user1 make order 
     transaction = await exchange.connect(user1).makeOrder(eTIT.address,tokens(50),shery.address,tokens(5));
     result = await transaction.wait();
     console.log(`made order by ${user1.address}`);

     //order cancel by user1 
     let order_id;
     order_id = result.events[0].args.Order_id;
     transaction = await exchange.connect(user1).cancelOrder(order_id);
     await transaction.wait();
     console.log(`order cancel by ${user1.address}`)

     await wait(1);
    

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
