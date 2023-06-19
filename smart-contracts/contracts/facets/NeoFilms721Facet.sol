// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../storage/facets/ERC721StorageFacet.sol";
import "../interfaces/IERC721.sol";
import "../interfaces/IERC20.sol";
import "../interfaces/IERC721Receiver.sol";
import "../interfaces/IERC165.sol";
import "../interfaces/IERC721Metadata.sol";
import "../interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NeoFilms721Facet is ERC721StorageFacet, IERC721, IERC2981, IERC721Metadata {
    using Strings for uint256;
    function initialize() external {
        LibDiamond.enforceIsContractOwner();
        ERC721FacetStorage storage _ds = erc721Storage();
        /* string memory name_, string memory symbol_ */
        _ds._name = "Neo NFTS";
        _ds._symbol = "NEO";
        _ds.maxSupply = 3333;
        _ds.publicMintPrice = 65 ether;
        _ds._idx = 483;
        _ds.totalRemainingFreeMints = 330;
        setBaseURI("https://neogoldpass.mypinata.cloud/ipfs/QmeeaDbEb1Qkz9wyNshtmiH54QjHfbnfBqD4rTNFPsJrFw/");
        _ds.royaltyReceiver = 0x491968b05D95979BA3a52D73D8a39EA96693f011;
        _ds.royaltyFraction = 500;
    }

    function setRoyaltyReceiver(address receiver) external {
        LibDiamond.enforceIsContractOwner();
        ERC721FacetStorage storage _ds = erc721Storage();
        _ds.royaltyReceiver = receiver;
    }

    function setRoyaltyFraction(uint96 fraction) external {
        LibDiamond.enforceIsContractOwner();
        ERC721FacetStorage storage _ds = erc721Storage();
        _ds.royaltyFraction = fraction;
    }

    function getMaxSupply() public view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.maxSupply - _ds.totalRemainingFreeMints - _ds.totalBtgoFreeClaimsRemaining;
    }

    function getBlockTimestamp() external view returns (uint256) {
        return block.timestamp;
    }

    function setPublicMintPrice(uint256 price) external {
        LibDiamond.enforceIsContractOwner();
        ERC721FacetStorage storage _ds = erc721Storage();
        _ds.publicMintPrice = price;
    }

    function getPublicMintPrice() external view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.publicMintPrice;
    }

    function isPaused() external view returns (bool) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.paused;
    }

    function pause() external {
        LibDiamond.enforceIsContractOwner();
        ERC721FacetStorage storage _ds = erc721Storage();
        _ds.paused = true;
    }

    function unpause() external {
        LibDiamond.enforceIsContractOwner();
        ERC721FacetStorage storage _ds = erc721Storage();
        _ds.paused = false;
    }

    function enforceNotPaused() internal view {
        ERC721FacetStorage storage _ds = erc721Storage();
        require(!_ds.paused, "Contract is paused");
    }

    event TipGiven(address indexed by, uint256 amount);

    function publicMintToWithTip(address to, uint256 amount, uint256 tipAmount) payable external {
        enforceNotPaused();
        ERC721FacetStorage storage _ds = erc721Storage();
        require(msg.value >= _ds.publicMintPrice * amount + tipAmount, "Not enough MATIC sent to mint and tip");
        require(totalSupply() + amount <= getMaxSupply(), "Trying to mint more than the max supply");
        for (uint i = 0; i < amount; i++) {
            _mint(to, 0);
        }
        _ds.totalBtgoFreeClaimsRemaining += amount/2;
        _ds.btgoFreeClaimedEarned[to] += amount/2;
        if (tipAmount > 0) {
            emit TipGiven(msg.sender, tipAmount);
        }
    }

    event MintedFromEth(address indexed by, uint256 amount);

    function mintFromEth(uint256 amount, address to) external {
        LibDiamond.enforceIsContractOwner();
        ERC721FacetStorage storage _ds = erc721Storage();
        require(totalSupply() + amount <= getMaxSupply(), "Trying to mint more than the max supply");
        for (uint i = 0; i < amount; i++) {
            _mint(to, 0);
        }
        _ds.totalBtgoFreeClaimsRemaining += amount/2;
        _ds.btgoFreeClaimedEarned[to] += amount/2;
        emit MintedFromEth(to, amount);
    }

    function adminMintTo(address to, uint256 amount) external {
        LibDiamond.enforceIsContractOwner();
        require(totalSupply() + amount <= getMaxSupply(), "Trying to mint more than the max supply");
        for (uint i = 0; i < amount; i++) {
            _mint(to, 0);
        }
    }

    function getReservedTokens(address user) external view returns (uint256[] memory) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.reservedTokens[user];
    }

    function setReservedTokens(LibDiamond.ReservedTokens[] calldata reservedTokens) external {
        LibDiamond.enforceIsContractOwner();
        ERC721FacetStorage storage _ds = erc721Storage();
        for (uint256 i = 0; i < reservedTokens.length; i++) {
            _ds.reservedTokens[reservedTokens[i].recipient] = reservedTokens[i].ids;
        }
    }

    function claimReserved() external {
        ERC721FacetStorage storage _ds = erc721Storage();
        uint256[] memory tokenIds = _ds.reservedTokens[msg.sender];
        require(tokenIds.length > 0, "No reserved tokens for this address");
        mintMultipleSpecificTo(tokenIds.length, msg.sender, tokenIds);
        delete _ds.reservedTokens[msg.sender];
    }

    function setClaimFree(address[] calldata accounts, uint256[] calldata amounts) external {
        require(accounts.length == amounts.length, "Lengths must match");
        LibDiamond.enforceIsContractOwner();
        ERC721FacetStorage storage _ds = erc721Storage();
        for (uint256 i = 0; i < accounts.length; i++) {
            _ds.freeClaimsRemaining[accounts[i]] = amounts[i];
        }
    }

    function claimFree() external {
        ERC721FacetStorage storage _ds = erc721Storage();
        uint256 freeClaimsRemaining = _ds.freeClaimsRemaining[msg.sender];
        require(freeClaimsRemaining > 0, "None left to claim for free");
        for (uint i = 0; i < freeClaimsRemaining; i++) {
            _mint(msg.sender, 0);
            _ds.freeClaimsRemaining[msg.sender] -= 1;
            _ds.totalRemainingFreeMints -= 1;
        }
    }

    function getClaimFreeRemaining(address user) external view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.freeClaimsRemaining[user];
    }

    function getTotalBtgoFreeClaimsRemaining() public view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.totalBtgoFreeClaimsRemaining;
    }

    function getBtgoFreeClaimsRemaining(address user) public view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.btgoFreeClaimedEarned[user] - _ds.btgoFreeClaimed[user];
    }

    function claimBtgoFree() external {
        ERC721FacetStorage storage _ds = erc721Storage();
        uint256 amount = getBtgoFreeClaimsRemaining(msg.sender);
        require(amount > 0, "Trying to claim more than remaining");
        _ds.btgoFreeClaimed[msg.sender] += amount;
        for (uint i = 0; i < amount; i++) {
            _mint(msg.sender, 0);
        }
    }

    function getBtgoClaimed(address user) public view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.btgoFreeClaimed[user];
    }

    function mintMultipleSpecificTo(uint amount, address to, uint256[] memory tokenIds) internal {
        require(tokenIds.length == amount, "TokenIds length does not match amount");
        for (uint i = 0; i < amount; i++) {
            _mint(to, tokenIds[i]);
        }
    }

    function _mint(address to_, uint256 tokenId) private {
        ERC721FacetStorage storage _ds = erc721Storage();
        if(tokenId == 0){
            tokenId = _ds._idx;
            _ds._idx += 1;
        }
        _ds._balances[to_] += 1;
        _ds._owners[tokenId] = to_;
        _ds.totalSupply += 1;
        emit Transfer(address(0), to_, tokenId);
    }

    function getCurrentIndex() public view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds._idx;
    }

    function setCurrentIndex(uint256 _idx) public {
        ERC721FacetStorage storage _ds = erc721Storage();
        _ds._idx = _idx;
    }

    function setMaxSupply(uint256 amount) public {
        ERC721FacetStorage storage _ds = erc721Storage();
        _ds.maxSupply = amount;
    }

    function totalSupply() public view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.totalSupply;
    }

    // ERC721 interface ID is 0x80ac58cd
    bytes4 constant ERC721_INTERFACE_ID = 0x80ac58cd;

    function isERC721Contract(address addr) public view returns (bool) {
        if (!isContract(addr)) {
            return false;
        }

        try IERC721(addr).supportsInterface(ERC721_INTERFACE_ID) returns (bool supportsERC721) {
            return supportsERC721;
        } catch {
            return false;
        }
        return false;
    }

    //return IERC721(0xc7E77C602D549747AB33C2F0137Cbcb42eeF2bB8).balanceOf(account) > 0;

    function isContract(address addr) public view returns (bool) {
        uint256 size;
        assembly {size := extcodesize(addr)}
        return size > 0;
    }

    function adminMintMultipleSpecificTo(uint amount, address to, uint256[] memory tokenIds) external {
        ERC721FacetStorage storage _ds = erc721Storage();
        require(tokenIds.length == amount, "TokenIds length does not match amount");
        require(_ds._idx + amount <= getMaxSupply(), "Trying to mint more than the max supply");
        LibDiamond.enforceIsContractOwner();
        _ds.adminMintedAmount += amount;
        mintMultipleSpecificTo(amount, to, tokenIds);
    }

    function symbol() public view virtual override returns (string memory) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds._symbol;
    }

    function name() public view virtual override returns (string memory) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds._name;
    }

    function baseURI() external view returns (string memory) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds.baseUrl;
    }

    function tokenURI(uint256 tokenID_) public view override returns (string memory) {
        _requireMinted(tokenID_);
        ERC721FacetStorage storage _ds = erc721Storage();
        string memory _base = _ds.baseUrl;
        return string(abi.encodePacked(_base, tokenID_.toString(), ".json"));
    }

    function setBaseURI(string memory baseUri) public {
        ERC721FacetStorage storage _ds = erc721Storage();
        _ds.baseUrl = baseUri;
    }

    function withdrawToken(address _tokenContract, uint256 _amount) public {
        LibDiamond.enforceIsContractOwner();
        IERC20 tokenContract = IERC20(_tokenContract);
        tokenContract.transfer(msg.sender, _amount);
    }

    function withdrawNft(address _nft, uint256[] memory tokenIds) public {
        LibDiamond.enforceIsContractOwner();
        for (uint256 i = 0; i < tokenIds.length; i += 1) {
            IERC721(_nft).safeTransferFrom(address(this), msg.sender, tokenIds[i]);
        }
    }

    // This implements ERC-165.
    function supportsInterface(bytes4 _interfaceId) external override view returns (bool) {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        return ds.supportedInterfaces[_interfaceId];
    }

    function withdrawEth() public {
        LibDiamond.enforceIsContractOwner();
        (bool success,) = payable(msg.sender).call{value : address(this).balance}("");
        require(success);
    }

    // ERC721 INTERFACE FUNCTIONS

    function balanceOf(address account_) external override view returns (uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds._balances[account_];
    }

    function ownerOf(uint256 tokenID_) public view virtual override returns (address) {
        _requireMinted(tokenID_);
        return _owner(tokenID_);
    }

    function transfer(address to_, uint256 amount_) external returns (bool) {
        return _transfer(msg.sender, to_, amount_);
    }

    function transferFrom(address from_, address to_, uint256 tokenID_) override external {
        _requireAuth(from_, tokenID_);
        _transfer(from_, to_, tokenID_);
    }

    function approve(address operator_, uint256 tokenID_) override external {
        _approve(msg.sender, operator_, tokenID_);
    }

    function setApprovalForAll(address operator_, bool approved_) external override {
        _setApprovalForAll(msg.sender, operator_, approved_);
    }

    function getApproved(uint256 tokenId) external override view returns (address operator) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds._tokenApprovals[tokenId];
    }

    function isApprovedForAll(address owner_, address operator_) override public view returns (bool) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds._operatorApprovals[owner_][operator_];
    }

    function safeTransferFrom(address from_, address to_, uint256 tokenID_, bytes memory data_) public override {
        _requireAuth(msg.sender, tokenID_);
        _safeTransfer(from_, to_, tokenID_, data_);
    }

    function safeTransferFrom(address from_, address to_, uint256 tokenID_) external override {
        safeTransferFrom(from_, to_, tokenID_, "");
    }

    // PRIVATE FUNCTIONS

    function _setApprovalForAll(address owner_, address operator_, bool approved_) internal virtual {
        require(owner_ != operator_, "ERC721: approve to caller");

        ERC721FacetStorage storage _ds = erc721Storage();
        _ds._operatorApprovals[owner_][operator_] = approved_;

        emit ApprovalForAll(owner_, operator_, approved_);
    }

    function _approve(address owner_, address operator_, uint256 tokenID_) private returns (bool) {
        require(ownerOf(tokenID_) != operator_, "ERC721: Approval to current owner");
        _requireAuth(owner_, tokenID_);

        ERC721FacetStorage storage _ds = erc721Storage();
        _ds._tokenApprovals[tokenID_] = operator_;

        emit Approval(ownerOf(tokenID_), operator_, tokenID_);
        return true;
    }

    function _transfer(address from_, address to_, uint256 tokenID_) private returns (bool) {
        _requireMinted(tokenID_);
        _requireOwner(from_, tokenID_);
        /* _requireAuth(from_, tokenID_); */

        ERC721FacetStorage storage _ds = erc721Storage();

        delete _ds._tokenApprovals[tokenID_];
        _ds._owners[tokenID_] = to_;
        _ds._balances[msg.sender] -= 1;
        _ds._balances[to_] += 1;

        emit Transfer(msg.sender, to_, tokenID_);
        return true;
    }

    function _safeTransfer(address from_, address to_, uint256 tokenID_, bytes memory data_) internal {
        _transfer(from_, to_, tokenID_);
        _requireReciever(from_, to_, tokenID_, data_);
    }

    function _requireMinted(uint256 tokenId) internal view virtual {
        require(_exists(tokenId), "ERC721: invalid token ID");
    }

    function _requireAuth(address from_, uint256 tokenID_) private view {
        require(_hasAuth(from_, tokenID_), "ERC721: Not token owner or approved");
    }

    function _requireOwner(address from_, uint256 tokenID_) private view {
        require(_owner(tokenID_) == from_, "ERC721: Not token owner");
    }

    function _requireReciever(address from_, address to_, uint256 tokenID_, bytes memory data_) private {
        require(_checkOnERC721Received(from_, to_, tokenID_, data_), "ERC721: transfer to non ERC721Receiver implementer");
    }

    function _owner(uint256 tokenID_) internal view returns (address) {
        ERC721FacetStorage storage _ds = erc721Storage();
        return _ds._owners[tokenID_];
    }

    function _hasAuth(address from_, uint256 tokenID_) internal view returns (bool) {
        address owner = _owner(tokenID_);
        return owner == from_ || isApprovedForAll(owner, from_);
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owner(tokenId) != address(0);
    }

    function _hasContract(address account_) private view returns (bool) {
        return account_.code.length > 0;
    }

    function _checkOnERC721Received(address from_, address to_, uint256 tokenID_, bytes memory data_) private returns (bool) {
        if (_hasContract(to_)) {
            try IERC721Receiver(to_).onERC721Received(msg.sender, from_, tokenID_, data_) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    /// @solidity memory-safe-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice) public view virtual override returns (address, uint256) {
        ERC721FacetStorage storage _ds = erc721Storage();
        uint256 royaltyAmount = (salePrice * _ds.royaltyFraction) / 10000;

        return (_ds.royaltyReceiver, royaltyAmount);
    }
}
