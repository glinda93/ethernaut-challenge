[OpenZeppelin Level 2](https://ethernaut.openzeppelin.com/level/0x5732B2F88cbd19B6f01E3a96e9f0D90B917281E5)

# Fallout

Claim ownership of the contract below to complete this level.

Things that might help

- Solidity Remix IDE

## Sources

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Fallout {
  using SafeMath for uint256;
  mapping(address => uint256) allocations;
  address payable public owner;

  /* constructor */
  function Fal1out() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "caller is not the owner");
    _;
  }

  function allocate() public payable {
    allocations[msg.sender] = allocations[msg.sender].add(msg.value);
  }

  function sendAllocation(address payable allocator) public {
    require(allocations[allocator] > 0);
    allocator.transfer(allocations[allocator]);
  }

  function collectAllocations() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }

  function allocatorBalance(address allocator) public view returns (uint256) {
    return allocations[allocator];
  }
}

```

## Level author:

Alejandro Santander
palebluedot@gmail.com
https://github.com/ajsantander
Did this level teach you anything useful? Donate to the level author (on mainnet): 0x31a3801499618d3c4b0225b9e06e228d4795b55d
