// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct ERC721FacetStorage {
  string _name;
  string _symbol;
  uint256 _idx;
  mapping(uint256 => address) _owners;
  mapping(address => uint256) _balances;
  mapping(uint256 => address) _tokenApprovals;
  mapping(address => mapping(address => bool)) _operatorApprovals;
  uint256 publicMintPrice;
  uint256 whitelistPrice;
  string baseUrl;
  string hiddenFullUrl;
  bool revealed;
  mapping(address => bool) whitelisted;
  uint256 totalSupply;
  uint256 startTime;
  uint256 adminMintedAmount;
  uint256 whitelistMintedAmount;
  uint256 publicMintedAmount;
  bool paused;
  uint256 maxSupply;
  mapping(address => uint256) btgoFreeClaimed;
  mapping(address => uint256) btgoFreeClaimedEarned;
  mapping(address => uint256[]) reservedTokens;
  mapping(address => uint256) freeClaimsRemaining;
  uint256 totalRemainingFreeMints;
  uint256 totalBtgoFreeClaimsRemaining;
  address royaltyReceiver;
  uint96 royaltyFraction;
}
