// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../storage/facets/ERC721StorageFacet.sol";

contract Upgrade1Facet is ERC721StorageFacet {
    function getAdminMintedAmount() public view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.adminMintedAmount;
    }

    function getPublicMintedAmount() public view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.publicMintedAmount;
    }
}
