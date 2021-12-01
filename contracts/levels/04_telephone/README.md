[OpenZeppelin Level 4](https://ethernaut.openzeppelin.com/level/0x0b6F6CE4BCfB70525A31454292017F640C10c768)

# Telephone

Claim ownership of the contract below to complete this level.

## Sources

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Telephone {
  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}

```

## Level author:

Kyle Riley
kyle@iosiro.com
https://github.com/syncikin
