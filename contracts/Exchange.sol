// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./Token.sol";

contract Exchange{
    address public feeAccount;
    uint256 public feePercent;

    mapping(address=>mapping(address=>uint256)) public tokens;

    event Deposit(address _token,address _user , uint256 _amount, uint256 _balance);

    constructor(address _feeAccount , uint256 _feePercent){
       feeAccount = _feeAccount;
       feePercent = _feePercent;
    }


    // deposit 
    function depositToken(address _token,uint256 amount) public {
      //deposit tokens to exchange
      require(Token(_token).TransferFrom(msg.sender, address(this), amount));

      //update or mapping 
      tokens[_token][msg.sender] = tokens[_token][msg.sender] + amount;

      emit Deposit(_token,msg.sender,amount,tokens[_token][msg.sender]);
    }

  function balanceOf(address _token, address _user) public view returns(uint256) {
    return tokens[_token][_user];
  }

}
