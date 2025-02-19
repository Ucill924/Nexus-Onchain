const hre = require("hardhat");

async function main() {
    const Counter = await hre.ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(); // Tidak ada argumen!

    await counter.waitForDeployment(); // Gunakan ini jika "deployed()" tidak tersedia

    console.log(`Counter deployed to: ${await counter.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
