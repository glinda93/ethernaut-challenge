import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { CoinFlip, CoinFlipAttack } from "../../typechain";

describe("CoinFlipAttack", function () {
  let CoinFlipToken;
  let CoinFlipAttackToken;
  let owner: SignerWithAddress;
  let attacker: SignerWithAddress;
  let victim: CoinFlip;
  let attack: CoinFlipAttack;

  beforeEach(async function () {
    CoinFlipToken = await ethers.getContractFactory("CoinFlip");
    CoinFlipAttackToken = await ethers.getContractFactory("CoinFlipAttack");
    [owner, attacker] = await ethers.getSigners();
    victim = await CoinFlipToken.connect(owner).deploy();
    attack = await CoinFlipAttackToken.connect(attacker).deploy(victim.address);
  });

  describe("hackFlip", async function () {
    it("should correctly guess coin flip", async function () {
      for (const _i of [...Array(10).keys()]) {
        await attack.hackFlip();
      }
      const consecutiveWins = await victim.consecutiveWins();
      expect(consecutiveWins).to.equals(10);
    });
  });
});
