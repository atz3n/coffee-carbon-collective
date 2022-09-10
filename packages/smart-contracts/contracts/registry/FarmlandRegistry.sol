// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract FarmlandRegistry is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    constructor() ERC721("FarmlandRegistry", "FARM") {}


    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        require(msg.sender == owner(), "FarmlandRegistry: Only transferable by contract owner");
        super._beforeTokenTransfer(from, to, tokenId);
    }


    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }


    function approve(address, uint256) public pure override(ERC721) {
        require(false, "FarmlandRegistry: Not approvable");
    }


    function setApprovalForAll(address, bool) public pure override(ERC721) {
        require(false, "FarmlandRegistry: Not approvable");
    }


    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }


    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721) {
        _transfer(from, to, tokenId);
    }


    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override(ERC721) {
        _safeTransfer(from, to, tokenId, data);
    }


    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }


    function setTokenURI(uint256 tokenId, string memory _tokenURI) public onlyOwner {
        _setTokenURI(tokenId, _tokenURI);
    }
}