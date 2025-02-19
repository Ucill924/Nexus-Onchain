const { printBanner } = require("./banner");
const hre = require("hardhat");

const CONTRACT_ADDRESS = "0x6DDc7dd77CbeeA3445b70CB04E0244BBa245e011"; 
const FUNCTION_DATA = "0xd09de08a"; 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

(async () => {
    printBanner(); 
    readline.question("🔢 Masukkan jumlah transaksi: ", async (numTx) => {
        numTx = parseInt(numTx);
        if (isNaN(numTx) || numTx <= 0) {
            console.log("⛔ Masukkan angka yang valid!");
            readline.close();
            return;
        }

        console.log(`🚀 Memulai ${numTx} transaksi di jaringan Nexus...`);

        const [signer] = await hre.ethers.getSigners();
        const contract = new hre.ethers.Contract(CONTRACT_ADDRESS, ["function increment()"], signer);

        for (let i = 1; i <= numTx; i++) {
            console.log(`⚡ Eksekusi transaksi #${i}...`);
            
            const tx = await signer.sendTransaction({
                to: CONTRACT_ADDRESS,
                data: FUNCTION_DATA
            });

            console.log(`⏳ Menunggu konfirmasi transaksi #${i}...`);
            await tx.wait();
            
            console.log(`✅ Transaksi #${i} berhasil! TX Hash: ${tx.hash}`);

            await delay(3000);
        }

        console.log("🎉 Semua transaksi selesai!");
        readline.close();
    });
})();
