/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors,get, FacetCutAction } = require('../lib/diamond/diamond.ts')

async function upgradeDiamond() {
    let diamondAddress = '0xEdc2E4c9fa10C4859246a876397f33273D813535'
    let diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)

    // Deploy the new facet
    console.log('Deploying NeoFilms721Facet...')
    const CronosDuelsErc721Facet = await ethers.getContractFactory('NeoFilms721Facet')
    const cronosDuelsErc721Facet = await CronosDuelsErc721Facet.deploy()
    await cronosDuelsErc721Facet.deployed()
    console.log('NeoFilms721Facet deployed with address: ', cronosDuelsErc721Facet.address)
    let tx = await diamondCutFacet.diamondCut(
        [{
            facetAddress: cronosDuelsErc721Facet.address,
            action: FacetCutAction.Replace,
            functionSelectors: getSelectors(CronosDuelsErc721Facet)
        }],
        ethers.constants.AddressZero, '0x', {})
    let receipt = await tx.wait()
    console.log("NeoFilms721Facet upgrade tx:", tx.hash)
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
