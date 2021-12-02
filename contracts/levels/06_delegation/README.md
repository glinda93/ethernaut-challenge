# Delegation

The goal of this level is for you to claim ownership of the instance you are given.

Things that might help

- Look into Solidity's documentation on the delegatecall low level function, how it works, how it can be used to delegate operations to - - - on-chain libraries, and what implications it has on execution scope.
- Fallback methods
- Method ids

## Sources

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Token {
  mapping(address => uint256) balances;
  uint256 public totalSupply;

  constructor(uint256 _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }
}

```

## Level author:

Alejandro Santander

palebluedot@gmail.com

https://github.com/ajsantander

Did this level teach you anything useful? Donate to the level author (on mainnet): 0x31a3801499618d3c4b0225b9e06e228d4795b55d
