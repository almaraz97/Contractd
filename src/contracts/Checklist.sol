pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;
import "./Token.sol";


//struct IndexValue {
//  uint keyIndex; uint value;
//}
//struct KeyFlag {
//  uint key; bool deleted;
//}
//struct KeyValue {
//  uint key; uint value;
//}
//
//struct itmap
//{
//  mapping(uint => IndexValue) data;
//  KeyFlag[] keys;
//  uint size;
//}

//  struct subTask{
//    string subDescription;
//  }
//dBank private dbank;  // The contractor's chosen bank that handles the splitting of the funds
//  enum completionLevel{Complete, inProgress, notStarted}

contract Checklist {
  Token token;
  string public name;  // Name of the agreement
  uint funds;  // Amount of funds in the contract
  uint cost;  // Calculated price of the checklist
  address payable payer;
  address payable contractor;
  struct Task {bool init; string description; uint amount; bool contractorCheck; bool payerCheck; bool payedOut;}

  bool locked;  // Once checklist locked do not allow changing of checklist
  bool contractorUnlock = true;  // Allow
  bool payerUnlock = true;
  uint initTime;
  uint deadline;
  uint[] taskNumbers;
  mapping (uint => Task) public taskLookup;

  constructor(address payable payer_, string memory _name) public {
    contractor = msg.sender;  // assign initiator as the contractor
    payer = payer_;
    name = _name;
    funds = 0;
    initTime = block.timestamp;
    deadline = block.timestamp;
  }

  function addTask(string memory description_, uint number, uint amount) external returns (bool){
    require(locked==false, 'The checklist has been locked, both parties must unlock to allow changes.');
    require(bytes(description_).length!=0 && number>0 && amount>0, 'You must add a description, number, and valid amount');

    Task storage task_;
    task_.description = description_;
    task_.amount = amount;
    task_.init = true;
    taskLookup[number] = task_;  // Add task to task mapping (where you can access task structs)
    taskNumbers.push(number);  // Add task number to list of task numbers
    require(taskLookup[number] == task_, 'Mapping update failed.');
    return true;
  }
  function changeTask(uint number, string calldata _description, uint _amount) external returns (bool, uint) {
    require(locked==false, 'The checklist has been locked, both parties must unlock to allow changes.');
    require(bytes(_description).length!=0 && number>0 && _amount>0, 'You must add a description, number, and valid amount');
    taskLookup[number].description = _description;
    taskLookup[number].amount = _amount;

    return (true, computePrice());
  }
  function removeTask(uint number, uint[] calldata taskNumbers_) external returns (bool){
    require(locked==false, 'The checklist has been locked, both parties must unlock to allow changes.');
    delete taskLookup[number];  // Delete task number "order"
    taskNumbers = taskNumbers_; // Client side reassign the array of task numbers
    return true;
  }
  function getTask(uint number) public view returns(string memory, uint, bool, bool, bool) {
//    Task memory _task = taskLookup[number];
    return (taskLookup[number].description, taskLookup[number].amount,
    taskLookup[number].contractorCheck, taskLookup[number].payerCheck, taskLookup[number].payedOut);
  }
  function computePrice() internal view returns(uint){
    uint totalPayment = 0;
    for (uint i = 0; i <= taskNumbers.length; i++) {
      totalPayment += taskLookup[i].amount;
    }
    return totalPayment;
  }
  function lockChecklist() public returns (bool){  // Both the contractor and payer have to call this function
    require(msg.sender==payer || msg.sender==contractor);
    if (msg.sender==payer){
      payerUnlock = !payerUnlock;
    } else{
       contractorUnlock = !contractorUnlock;
    }
    if (payerUnlock==false && contractorUnlock==false){
      locked = true;
      (bool success, ) = escrowPayer();
      require(success);
    }
    return true;
  }
  function escrowPayer() public returns (bool){  // Could escrow per checklist point
    require(locked, 'Both parties must agree to the checklist before escrow-ing funds.');
    uint totalPayment = computePrice();
    (bool success, ) = address(this).call{value: totalPayment}("");
    require(success, 'Escrow failed');
    funds = totalPayment;
    return true;
  }

  function unlockChecklist() public returns (bool){
    require(msg.sender==payer || msg.sender==contractor);
    if (msg.sender==payer){
      payerUnlock = true;
    } else{
       contractorUnlock = true;
    }
    if (payerUnlock==true && contractorUnlock==true){
      locked = false;
    }
    return true;
  }

  function contractorCheckOff(uint number) public {
    require(msg.sender==contractor, 'Only the contractor can check off their side');
    require(taskLookup[number].init, 'No task exists for that number');
    taskLookup[number].contractorCheck = true;
  }
  function payerCheckOff(uint number) public {
    require(msg.sender==payer, 'Only the payer can check off their side');
    require(taskLookup[number].init, 'No task exists for that number');
    require(taskLookup[number].contractorCheck, 'Can only pay out for tasks contractor has asserted as completed.');

    taskLookup[number].payerCheck = true;
    if (taskLookup[number].contractorCheck){  // Both parties agreed to the task being finished, pay out
      require(taskLookup[number].payedOut==false, 'Task has already been paid out.');
      uint payout = taskLookup[number].amount;
      require(payout<=funds, "Contract's escrowed funds are less than the payout price");
      (bool success, ) = contractor.call{value: payout}("");  // Pay contractor, TODO does this pay from checklist fund?
      require(success, 'Pay out transaction failed.');
      taskLookup[number].payedOut = true;
      funds -= payout;
    }
  }

  function getName() public view returns(string memory){
    return name;
  }
  function getFunds() public view returns(uint){
    return funds;
  }
  function getCost() public view returns(uint){
    return cost;
  }
  function getPayer() public view returns(address payable){
    return payer;
  }
  function getContractor() public view returns(address payable){
    return contractor;
  }
  function getLockStatus() public view returns(bool){
    return locked;
  }
  function getContractorUnlock() public view returns(bool){
    return contractorUnlock;
  }
  function getPayerUnlock() public view returns(bool){
    return payerUnlock;
  }
  function getTaskNumbers() public view returns(uint[] memory){
    return taskNumbers;
  }
}
