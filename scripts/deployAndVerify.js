const hre = require("hardhat");
const readline = require("readline");
const { printBanner } = require("./banner");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    printBanner(); 
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Berapa kali deploy? ", async (numDeployments) => {
        numDeployments = parseInt(numDeployments);
        if (isNaN(numDeployments) || numDeployments <= 0) {
            console.log("⛔ Masukkan angka yang valid!");
            rl.close();
            return;
        }

        console.log(`🔄 Compiling contracts...`);
        await hre.run("compile"); 

        const Counter = await hre.ethers.getContractFactory("Counter");

        for (let i = 1; i <= numDeployments; i++) {
            console.log(`🚀 Deploying contract #${i}...`);
            const counter = await Counter.deploy();
            await counter.waitForDeployment();

            const contractAddress = await counter.getAddress();
            console.log(`✅ Contract #${i} deployed at: ${contractAddress}`);

            console.log(`🔍 Verifying contract #${i}...`);
            await hre.run("verify:verify", {
                address: contractAddress,
                constructorArguments: [],
            });

            console.log(`✅ Contract #${i} verified successfully!`);

            if (i < numDeployments) {
                console.log(`⏳ Waiting before next transaction...`);
                await delay(15000);
            }
        }

        console.log(`🎉 Deployment & verification of ${numDeployments} contracts completed!`);
        rl.close();
    });
})();
