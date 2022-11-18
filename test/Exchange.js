const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Exchange", () => {
  let exchange,feeAccount,accounts,token,user1;
  const feePercent = 10;
  beforeEach(async () => {
    const Exchange = await ethers.getContractFactory("Exchange");
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Sheryians","SHERY","1000000");

    accounts = await ethers.getSigners();
    feeAccount = accounts[1];
    user1 = accounts[2];

    exchange = await Exchange.deploy(feeAccount.address,feePercent);
});

  describe("deployment", () => {
      it('fee account address',async()=>{
        expect(await exchange.feeAccount()).to.equal(feeAccount.address);
      })  

      it('fee percent ',async()=>{
        expect(await exchange.feePercent()).to.equal(feePercent);
      })   
  });

  describe('send token to exchange',()=>{
    let amount = tokens('10');
    beforeEach(async()=>{
      let Transaction = await exchange.connect(user1).depositToken(token.address,amount);
    await Transaction.wait();
    })
  })

 
});
