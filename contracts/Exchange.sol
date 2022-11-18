// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./Token.sol";

contract Exchange{
    address public feeAccount;
    uint256 public feePercent;

    constructor(address _feeAccount , uint256 _feePercent){
       feeAccount = _feeAccount;
       feePercent = _feePercent;
    }

    // deposit 
    function depositToken(address _token,uint256 amount) public {
      Token(_token).TransferFrom(msg.sender, address(this), amount);
    }
}
