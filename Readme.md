# Pitch
Hiring contractors can be risky. With the Contractd decentralized app you can easily enter a contract that 
protects both parties against fraud and poor communication. Once you meet someone you'd like to do business you simply
specify the tasks, both parties agree to the terms, then the contract is locked and payment is dispersed by task.

# How does it work?
The contract is like a checklist where tasks are described and are assigned a dollar amount. Once the contractor believes 
that the task to be complete they can mark it as completed and await approval. Once approved by the paying party the funds
are released to the contractor.

# Why is this better than traditional contracting?
Smart contract use is on the rise and while crypto use is nascent, it is on the track to disrupt numerous industries. 
* By interacting through a smart contract users that wish to be a part of the ecosystem can pay and be paid in its native currency.
* This contract could be incorporated into other smart contracts in countless ways which that add value to our users. 
* Likewise, Contractd's use of tokenomics will also incentivize users to be honest by gathering reputation.
* The locking of funds can allow risk mitigation by third parties in a manner similar to insurance or venture capital

# Tokenomics
* In order to complete a task, both the paying party and contractor must lock up an amount of TRUST tokens equal to
what the contract's task is assigned. 
* If the specified contract termination date passes before the contract is over, both parties' trust is slashed. 
  - This can happen if there is a disagreement on whether a task is completed or not, if the contractor 
    is too slow or underestimating (purposefully or not) the amount of time the task will take, etc. 
* Once a task is deemed complete, both parties are given double the task's payment amount in TRUST.
* When two parties cannot agree on the completion of a task, the paying party does not have to pay


# Possible features
Two versions of the checklist, the internal one and the external one.
    The internal checklist follows the skeleton of the external but can add sub-items and assign people to tasks
    The external checklist is usually less detailed
    Would need encryption ability
The checklist contract can have terms for releasing or not releasing funds
    Time period between working party checking an item off, and the paying party accepting
    If the period elapses then half the funds are given to the working party but the paying party can opt out of all future checklist items
The checklist has a schedule, either with each checkpoint or the entire checklist
    The working party must pay to extend the schedule (optional in contract agreement phase)
    The paying party can pay to shorten the schedule
The checklist can interact with another contract that can mint TRUST tokens
    Make sure that others cannot mint TRUST tokens who use this (public) contract


Possible ways to prevent bad behavior
* Make it costly to be a scammer
* Make it costly to be a poor payer
* Make it rewarding to be a good actor

Questions:
* Should people be allowed to buy TRUST from the contract?
  * 2 TRUST = 1 Dollar for escrow purposes but each TRUST purchased costs more than the previous. Cool-down by being paid.
    * f(x) = 2x + .5(num_purchased) 
      * W_(t) = W_(t-1)  
    * Continuous or discrete?
* Can we avoid both parties from being punished by dead contracts?
* Allow the transfer of TRUST from one wallet to another?
  * Allow the transfer of TRUST from third parties to contract
