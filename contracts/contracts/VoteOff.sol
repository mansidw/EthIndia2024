// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./VoteToken.sol";
import "./EIP712MetaTransaction.sol";

contract VoteOff is EIP712MetaTransaction("VoteOff", "1") {
    event transferred(address sender, address receiver, uint amount);
    address payable admin;
    mapping(address => string) public userToAadhar;

    struct UrlInfo {
        string url;
        string urlhash;
        string data;
        address payable sender;
        uint positivecnts;
        uint negativecnts;
        uint threshold;
    }
    mapping(string => UrlInfo) public urlToData;
    string[] public allurlhashes;

    struct UserVote {
        string urlhash;
        uint userVote; // positive 1 or negative 0
        address sender;
        uint stakeamt;
    }
    UserVote[] public userVotes;

    uint public instance;
    mapping(uint => VoteToken) public tokencontractinstances;

    struct VoteWithUrlInfo {
        UserVote vote;
        UrlInfo info;
    }

    constructor() {
        admin = payable(msg.sender);
        instance = 0;
    }

    function registerNewContract(VoteToken tokenContract) public {
        tokencontractinstances[instance] = tokenContract;
    }

    // Transfers 10 tokens from admin
    function onboard(string memory aadharhash) public payable {
        userToAadhar[msg.sender] = aadharhash;
        tokencontractinstances[instance].transfer_From(admin, msg.sender, 10);
        emit transferred(admin, msg.sender, 10);
    }

    function checkIfAlreadyRegistered() public view returns (bool) {
        return bytes(userToAadhar[msg.sender]).length > 0;
    }

    function addData(
        string memory url,
        string memory data,
        string memory urlhash
    ) public payable {
        urlToData[urlhash] = UrlInfo(
            url,
            urlhash,
            data,
            payable(msg.sender),
            0,
            0,
            10
        );
        allurlhashes.push(urlhash);
    }

    // vote: 1 positive, 0 negative
    function addUserVote(
        string memory urlhash,
        uint vote,
        uint stakeamt
    ) public payable {
        if (vote == 1) {
            urlToData[urlhash].positivecnts += 1;
        } else {
            urlToData[urlhash].negativecnts += 1;
        }

        userVotes.push(UserVote(urlhash, vote, msg.sender, stakeamt));

        tokencontractinstances[instance].transfer_From(
            msg.sender,
            address(this),
            stakeamt
        );
        emit transferred(msg.sender, address(this), stakeamt);

        UrlInfo storage info = urlToData[urlhash];
        if (info.positivecnts + info.negativecnts >= info.threshold) {
            distributeStakes(urlhash);
        }
    }

    function distributeStakes(string memory urlhash) internal {
        UrlInfo storage info = urlToData[urlhash];
        bool positiveMajority = info.positivecnts > info.negativecnts;

        for (uint i = 0; i < userVotes.length; i++) {
            if (
                keccak256(abi.encodePacked(userVotes[i].urlhash)) ==
                keccak256(abi.encodePacked(urlhash))
            ) {
                if (
                    (positiveMajority && userVotes[i].userVote == 1) ||
                    (!positiveMajority && userVotes[i].userVote == 0)
                ) {
                    // Refund stake to the user
                    tokencontractinstances[instance].transfer_From(
                        address(this),
                        userVotes[i].sender,
                        userVotes[i].stakeamt
                    );
                    // emit transferred(address(this), userVotes[i].sender, stakeamt);
                }
            }
        }
    }

    function getAllVotes() public view returns (VoteWithUrlInfo[] memory) {
        VoteWithUrlInfo[] memory combinedVotes = new VoteWithUrlInfo[](
            userVotes.length
        );

        for (uint i = 0; i < userVotes.length; i++) {
            string memory hash = userVotes[i].urlhash;
            combinedVotes[i] = VoteWithUrlInfo({
                vote: userVotes[i],
                info: urlToData[hash]
            });
        }

        return combinedVotes;
    }

    function getAllArticles() public view returns (UrlInfo[] memory) {
        UrlInfo[] memory allUrls = new UrlInfo[](allurlhashes.length);

        for (uint i = 0; i < allurlhashes.length; i++) {
            allUrls[i] = urlToData[allurlhashes[i]];
        }

        return allUrls;
    }
}