/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors,get, FacetCutAction } = require('../lib/diamond/diamond.ts')

async function upgradeDiamond() {
    let diamondAddress = '0xEdc2E4c9fa10C4859246a876397f33273D813535'
    let diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
    //
    //
    const Facet = await ethers.getContractFactory('OwnershipFacet')
    // const facet = await Facet.deploy()
    // await facet.deployed()
    let facet = await ethers.getContractAt('OwnershipFacet', "0xA047d3Cc9Da79A5D4C1AC80c54bE7dD846fe9048")
    console.log('Facet deployed to:', facet.address)
    let tx = await diamondCutFacet.diamondCut(
        [{
            facetAddress: facet.address,
            action: FacetCutAction.Add,
            functionSelectors: get(getSelectors(Facet), ["setDevAddress(address)"])
        }],
        ethers.constants.AddressZero, '0x', {})
    let receipt = await tx.wait()
    console.log("Success")
    if (!receipt.status) {
        throw Error(`Diamond upgrade failed: ${tx.hash}`)
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
    upgradeDiamond()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error)
            process.exit(1)
        })
}
