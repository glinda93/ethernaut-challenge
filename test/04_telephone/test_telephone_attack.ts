import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Telephone, TelephoneAttack } from "../../typechain";

describe("TelephoneAttack", function () {
  let TelephoneToken;
  let TelephoneAttackToken;
  let victim: Telephone;
  let attack: TelephoneAttack;
  let owner: SignerWithAddress;
  let attacker: SignerWithAddress;

  beforeEach(async function () {
    TelephoneToken = await ethers.getContractFactory("Telephone");
    TelephoneAttackToken = await ethers.getContractFactory("TelephoneAttack");
    [owner, attacker] = await ethers.getSigners();
    victim = await TelephoneToken.connect(owner).deploy();
    attack = await TelephoneAttackToken.connect(attacker).deploy(
      victim.address
    );
  });

  describe("attack", function () {
    it("should claim ownership", async function() {
      await attack.connect(attacker).attack();

      const telephoneOwner = await victim.owner();

      expect(telephoneOwner).to.equals(attacker.address);
    });
  });
});
