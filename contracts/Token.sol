// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Token{
    string public name = "Sheryians";
    string public symbol = "SHERY";
    uint public decimal = 18;
    uint public totalSupply = 1000000 * (10**decimal);
}