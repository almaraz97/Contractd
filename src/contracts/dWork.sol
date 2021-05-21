pragma solidity >=0.6.0 <0.8.0;

import "./Checklist.sol";
import "./Token.sol";


contract dWork {
  Token token;
  Checklist checklist;  // Contract that deploys between parties
  Checklist[] onGoing;  // Th contracts that each person has since they can have multiple
  mapping(address payable => Checklist[]) public dContracts;  // Payer/Contractor to respective ongoing Contracts
  mapping(address payable => uint) public trustToken;  // Track how much trust each person has

  constructor(Checklist _checklist, Token _token) public {  // Pass deployed Checklist contract
    // Assign token deployed contract to variable
    checklist = _checklist;
    token = _token;
  }
  function addContract(address payable payer, string memory contractName){
    Checklist checklist_ = new Checklist(payer, contractName);  // Initialize Checklist contract
    dContracts[msg.sender].push(checklist_);  // Add contract to that person's list of on-going contracts
    dContracts[payer].push(checklist_);  // Add contract to that person's list of on-going contracts
  }
  function deleteContract(){
  }
  function getContract(uint index) returns(Checklist){
    return dContracts[msg.sender][index];
  }
  function addTrustToken(){

  }
  function removeTrustToken(){

  }
}
