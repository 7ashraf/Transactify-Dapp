require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/28JiUgztNjqKZLcRCA2PLHgTHbKL0pE2',
      accounts:['ad9b9eb2ec3d4aea221f5d790ccbaa469956f92b878249c05f4667c0f29a7a72']
    }
  }
};
