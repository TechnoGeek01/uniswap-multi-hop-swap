require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.7.6",
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_API_KEY,
      },
    },
  },
};
