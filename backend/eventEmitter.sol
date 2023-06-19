// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract NeoFilmsEventEmitter {
    address public owner;
    constructor() {
        owner = msg.sender;
    }

    event MintNft(address indexed to, uint256 indexed amount);

    function mint(uint256 amount, address mintTo) public payable {
        require(40000000000000000 * amount <= msg.value, "Send more money");
        emit MintNft(mintTo, amount);
    }

    function withdraw(uint256 amount) public  {
        require(msg.sender == owner, "Only owner can withdraw.");
        require(amount <= address(this).balance);
        payable(msg.sender).transfer(amount);
    }
}
