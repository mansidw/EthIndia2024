// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract EthIndia {
    mapping(address => string) public publicAddressToAonAadhar;
    mapping(string => address) public aonAadharToPublicAddress;

    function checkAndLinkAonAadhar(string memory _aonAadhar) public {
        require(bytes(_aonAadhar).length > 0, "AonAadhar cannot be empty");

        // Check if the AonAadhar is already linked to the sender
        if (aonAadharToPublicAddress[_aonAadhar] == msg.sender) {
            return;
        }

        // Ensure the AonAadhar is not already linked to another address
        require(
            aonAadharToPublicAddress[_aonAadhar] == address(0),
            "AonAadhar is already linked to another user"
        );

        // Ensure the sender does not already have an AonAadhar linked
        require(
            bytes(publicAddressToAonAadhar[msg.sender]).length == 0,
            "User already has an AonAadhar linked"
        );

        // Link the AonAadhar to the sender's address
        aonAadharToPublicAddress[_aonAadhar] = msg.sender;
        publicAddressToAonAadhar[msg.sender] = _aonAadhar;
    }
}
