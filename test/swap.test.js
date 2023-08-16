const { expect } = require("chai");
const { ethers } = require("hardhat");

const WETH9 = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";

describe("SwapExamples", () => {
  let weth, dai, deployer, SwapExamplesContract;

  before(async () => {
    [deployer] = await ethers.getSigners();

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);

    const SwapExamplesFactory = await ethers.getContractFactory(
      "contracts/SwapExamples.sol:SwapExamples",
      deployer
    );
    SwapExamplesContract = await SwapExamplesFactory.deploy();
    SwapExamplesContract.deployed();
  });

  it("swapExactInputSingle", async () => {
    const wethAmountIn = ethers.utils.parseEther("1");

    await weth.connect(deployer).deposit({ value: wethAmountIn });
    await weth
      .connect(deployer)
      .approve(SwapExamplesContract.address, wethAmountIn);

    await SwapExamplesContract.swapExactInputSingle(wethAmountIn);

    console.log("DAI balance", await dai.balanceOf(deployer.address));
  });

  it("swapExactOutputSingle", async () => {
    const wethAmountInMax = ethers.utils.parseEther("1");
    const DaiAmountOut = ethers.utils.parseEther("100");

    await weth.connect(deployer).deposit({ value: wethAmountInMax });
    await weth
      .connect(deployer)
      .approve(SwapExamplesContract.address, wethAmountInMax);

    await SwapExamplesContract.swapExactOutputSingle(
      DaiAmountOut,
      wethAmountInMax
    );

    console.log("DAI balance", await dai.balanceOf(deployer.address));
  });

  it("swapExactInputMultihop", async () => {
    const wethAmountIn = ethers.utils.parseEther("1");

    await weth.connect(deployer).deposit({ value: wethAmountIn });
    await weth
      .connect(deployer)
      .approve(SwapExamplesContract.address, wethAmountIn);

    await SwapExamplesContract.swapExactInputMultihop(wethAmountIn);

    console.log("DAI balance", await dai.balanceOf(deployer.address));
  });

  it("swapExactOutputMultihop", async () => {
    const wethAmountInMax = ethers.utils.parseEther("1");
    const DaiAmountOut = ethers.utils.parseEther("100");

    await weth.connect(deployer).deposit({ value: wethAmountInMax });
    await weth
      .connect(deployer)
      .approve(SwapExamplesContract.address, wethAmountInMax);

    await SwapExamplesContract.swapExactOutputMultihop(
      DaiAmountOut,
      wethAmountInMax
    );

    console.log("DAI balance", await dai.balanceOf(deployer.address));
  });
});
