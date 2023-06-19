import {ethers} from "ethers";
import * as fs from 'fs';

try {
    let provider = ethers.getDefaultProvider("https://eth-mainnet.g.alchemy.com/v2/eywdNR4ANEzmPvHKtLbM8LzhwzDSWKpE");

    const ERC721_contract = new ethers.Contract("0x4f2a7fa39915b5846c2fea11d0d9b76ef63693bb", [{
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }], provider);

    let filter = ERC721_contract.filters.Transfer(ethers.constants.AddressZero, null, 1614);
    const logs = [];

    // get logs from block 16007060 to 16929579
    // for(let i = 16007060; i <= 16929579; i+=10000) {
    //     console.log(i);
    //     if(i+10000 > 16929579) {
    //         logs.push(...await ERC721_contract.queryFilter(filter, i, 16929579));
    //     } else {
    //         logs.push(...await ERC721_contract.queryFilter(filter, i, i+10000));
    //     }
    // }
    logs.push(...await ERC721_contract.queryFilter(filter, 16007060, 'latest'));
    let owners = {}
    let counts = {}

    const eventAbi = ERC721_contract.interface.getEvent('Transfer');

    for (const log of logs) {
        let parsedLog = ERC721_contract.interface.decodeEventLog(eventAbi, log.data, log.topics);
        if (parsedLog.from !== parsedLog.to) {
            counts[parsedLog.tokenId] = (counts[parsedLog.tokenId] || 0) + 1;
            if (!owners[parsedLog.from]) {
                owners[parsedLog.from] = [];
            }
            const index = owners[parsedLog.from].indexOf(parsedLog.tokenId);
            if (index > -1) {
                owners[parsedLog.from].splice(index, 1);
            }
        } else {
            counts[parsedLog.tokenId] = counts[parsedLog.tokenId] || 0; //if user transfer token to himself donot increase the count
        }
        if (!owners[parsedLog.to]) {
            owners[parsedLog.to] = [];
        }
        owners[parsedLog.to].push(parseInt(parsedLog.tokenId._hex, 16));
    }

    fs.writeFileSync('allOwners.json', JSON.stringify(owners));
    // Find total tokenIds minted in owners array
} catch (error) {
    console.log(error.message);
}
