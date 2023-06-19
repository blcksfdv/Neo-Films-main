var ethers = require('ethers');
var url = '';
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
var privateKey = process.env.PRIVATE_KEY;
var wallet = new ethers.Wallet(privateKey);
console.log("Address: " + wallet.address);
tx = {
    chainId: 1,
    nonce: 26,
    gasPrice: 50000000000,
}
customHttpProvider.estimateGas(tx).then(function(estimate) {
    tx.gasLimit = estimate;
    wallet.signTransaction(tx).then((signedTX)=>{
        customHttpProvider.sendTransaction(signedTX).then(console.log);
    });
});
