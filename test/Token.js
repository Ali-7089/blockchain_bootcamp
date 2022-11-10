const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n)=>{
  return ethers.utils.parseUnits(n.toString(), "ether");
}

describe("Token", () => {
  let token , accounts , deployer , receiver;
  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Sheryians" , "SHERY", "1000000");
    
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];

  });
  describe("deployment", () => {
    const name = "Sheryians";
    const symbol = "SHERY";
    const decimal = 18;
    const totalSupply = tokens('1000000');
    it("has a name", async () => {
      expect(await token.name()).to.equal(name);
    });

    it("has a symbol", async () => {
      expect(await token.symbol()).to.equal(symbol);
    });

    it("has a decimal", async () => {
      expect(await token.decimal()).to.equal(decimal);
    });
    it("has a totalSupply", async () => {
      expect(await token.totalSupply()).to.equal(totalSupply);
    });
    
    it('assing totalSupply to deployer' , async()=>{
      console.log(deployer.address);
      expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
    })

  });

  describe('transfer',()=>{
        it('sending tokens ',async()=>{
          // before transfer
        console.log(await token.balanceOf(deployer.address));
        console.log(await token.balanceOf(receiver.address));
        let transaction = await token.connect(deployer).transfer(receiver.address,'100');
        await transaction.wait();
        console.log(await token.balanceOf(deployer.address));
        console.log(await token.balanceOf(receiver.address));
        
        })
  })
});
