// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates; // Mapping of candidate ID to Candidate
    mapping(address => bool) public voters; // Track if an address has voted

    uint public candidatesCount;

    // Event emitted when a vote is cast
    event VoteCast(uint indexed candidateId);

    constructor() {
        addCandidate("Party A");
        addCandidate("Party B");
    }

    function addCandidate(string memory _name) private {
        candidates[candidatesCount] = Candidate(_name, 0);
        candidatesCount++;
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId < candidatesCount, "Invalid candidate ID.");

        voters[msg.sender] = true; // Mark voter as having voted
        candidates[_candidateId].voteCount++; // Increment vote count

        emit VoteCast(_candidateId); // Emit event for logging
    }

    function getVoteCount(uint _candidateId) public view returns (uint) {
        require(_candidateId < candidatesCount, "Invalid candidate ID.");
        return candidates[_candidateId].voteCount;
    }
}
