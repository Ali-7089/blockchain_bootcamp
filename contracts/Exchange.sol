// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./Token.sol";

contract Exchange {
    address public feeAccount;
    uint256 public feePercent;
    uint256 public orderCount;

    mapping(address => mapping(address => uint256)) public tokens;
    mapping(uint256 => Order) public orders;
    mapping(uint256=>bool) public cancelledOrder;

    event Deposit(
        address _token,
        address _user,
        uint256 _amount,
        uint256 _balance
    );
    event Withdraw(
        address _token,
        address _user,
        uint256 _amount,
        uint256 _balance
    );

    event OrderEvent(
         uint256 Order_id,
        address user,
        address _tokenGet,
        uint256 _amountGet,
        address _tokenGive,
        uint256 _amountGive,
        uint256 timestamp
    );

    

    struct Order {
        uint256 Order_id;
        address user;
        address _tokenGet;
        uint256 _amountGet;
        address _tokenGive;
        uint256 _amountGive;
        uint256 timestamp;
    }

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    // deposit
    function depositToken(address _token, uint256 amount) public {
        //deposit tokens to exchange
        require(Token(_token).TransferFrom(msg.sender, address(this), amount));

        //update or mapping
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + amount;

        emit Deposit(_token, msg.sender, amount, tokens[_token][msg.sender]);
    }

    //withdraw tokens
    function withDrawTokens(address _token, uint256 _amount) public {
        require(tokens[_token][msg.sender] >= _amount);

        Token(_token).transfer(msg.sender, _amount);
        //update or mapping
        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;
        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    //make order or cancel order
    // _AmountGive - amount from other party
    //_AmountGet -  taker
    function makeOrder(
        address _tokenGet,
        uint256 _amountGet,
        address _tokenGive,
        uint256 _amountGive
    ) public {
      //  require(balanceOf(_tokenGive,msg.sender)>=_amountGive);
      orderCount = orderCount + 1;
      orders[orderCount] = Order(
         orderCount,
         msg.sender,
        _tokenGet,
        _amountGet,
        _tokenGive,
        _amountGive,
        block.timestamp 
      );
      emit OrderEvent(orderCount,msg.sender,_tokenGet,_amountGet,_tokenGive,_amountGive,block.timestamp);
    }

    //cancel order
    function cancelOrder(uint256 _orderId)public{
        Order storage temp = orders[_orderId];
    }


    function balanceOf(address _token, address _user)
        public
        view
        returns (uint256)
    {
        return tokens[_token][_user];
    }
}
