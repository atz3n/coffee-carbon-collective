// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./IPropertyStore.sol";
// import "hardhat/console.sol";


contract FarmRegistry is ERC721Enumerable, Ownable, IPropertyStore  {
    
    struct MintParams {
        uint256 latitude;
        uint256 longitude;
        string name;
    }


    uint256 private LATITUDE_FACTOR = 1000000000; // constant to shift latitude to produce place for longitude value
    mapping(uint256 => IPropertyStore.Property[]) private tokensProps;
    mapping(uint256 => string) private tokensImage;


    constructor() ERC721("FarmToken", "FAT") {}


    function mintFarmToken(MintParams memory props) public {
        uint256 tokenId = props.latitude * LATITUDE_FACTOR + props.longitude;
        _mint(owner(), tokenId);

        tokensProps[tokenId].push(IPropertyStore.Property("area", props.area));
        tokensImage[tokenId] = props.imageLink;
    }


    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "FarmRegistry: operator query for nonexistent token");
        uint256 latitude;
        uint256 longitude;
        (latitude, longitude) = getCoordinates(tokenId);

        bytes memory attributes = abi.encodePacked(
            '[',
                byteifyCoordinates(latitude, longitude),
                byteifyAdditionalProps(tokenId),
            ']'
        );

        string memory json = Base64.encode(abi.encodePacked(
            '{'
                '"name":' '"', createTitle(tokenId, baseProps), '",'
                '"description":' '"', createDescription(tokenId, baseProps), '",'
                '"image":' '"', tokensImage[tokenId], '",'
                '"attributes":', attributes,
            '}'
        ));

        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    function getCoordinates(uint256 tokenId) private pure returns (uint256, uint256) {
        return (tokenId / LATITUDE_FACTOR, tokenId % LATITUDE_FACTOR);
    }

    function byteifyCoordinates(uint256 latitude, uint256 longitude) private pure returns (bytes memory) {
        bytes memory coordinateBytes = abi.encodePacked(
            '{'
                '"trait_type":' '"latitude",'
                '"value":' '"', Strings.toString(latitude), '"'
            '},'
        );
        coordinateBytes = abi.encodePacked(coordinateBytes, abi.encodePacked(
            '{'
                '"trait_type":' '"longitude",'
                '"value":' '"', Strings.toString(longitude), '"'
            '},'
        ));

        return coordinateBytes;
    }

    function byteifyAdditionalProps(uint256 tokenId) private view returns (bytes memory) {
        bytes memory propsBytes = "";

        for (uint256 i = 1 ; i < tokensProps[tokenId].length ; i++) {
            propsBytes = abi.encodePacked(propsBytes, abi.encodePacked(
                ',{'
                    '"trait_type":' '"', tokensProps[tokenId][i].key, '",'
                    '"value":' '"', tokensProps[tokenId][i].value, '"'
                '}'
            ));
        }

        return propsBytes;
    }


    function addProperty(uint256 tokenId, IPropertyStore.Property calldata property) public virtual override {
        require(_exists(tokenId), "FarmRegistry: operator query for nonexistent token");
        require(propertySetters[msg.sender], "FarmRegistry: sender not whitelisted");

        for (uint256 i = 0; i < tokensProps[tokenId].length; i++) {
            if (isSameString(tokensProps[tokenId][i].key, property.key)) {
                tokensProps[tokenId][i].value = property.value;
                return;
            }
        }
        tokensProps[tokenId].push(property);
    }

    function isSameString(string memory str1, string memory str2) private pure returns (bool) {
        return keccak256(bytes(str1)) == keccak256(bytes(str2));
    }


    function getProperties(uint256 tokenId) public view virtual override returns (IPropertyStore.Property[] memory) {
        require(_exists(tokenId), "FarmRegistry: operator query for nonexistent token");
        return tokensProps[tokenId];
    }
}
