const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", () => {
   let token;
    beforeEach(async()=>{
        const Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
    })
    describe("deployment",()=>{
        it("has a name", async () => {
            expect(await token.name()).to.equal("Sheryians");
          });
        
          it("has a symbol" , async()=>{
            expect(await token.symbol()).to.equal("SHERY");
          })
        
          it("has a decimal" , async()=>{
            expect(await token.decimal()).to.equal(18);
          })
          it("has a totalSupply" , async()=>{
            const value = await ethers.utils.parseUnits('1000000' , 'ether');
            expect(await token.totalSupply()).to.equal(value);
          })
        
    })
    

});
