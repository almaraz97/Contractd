# Pitch
Hiring contractors can be risky. With the Contractd decentralized app you can easily enter a contract that 
protects both parties against fraud and poor communication while incentivizing good behavior. Once you meet someone you'd 
like to do with business, you simply specify the tasks, both parties agree to the terms, then the contract is locked and 
payment is dispersed by task.

# How does it work?
The contract is like a checklist where tasks are described and are assigned a dollar amount. Once the contractor believes 
the task is complete they can mark it as completed and await approval. Once approved by the paying party the funds
are released to the contractor.

# Who is this for?
Contractd is suitable for multi-part jobs that take weeks to months to complete. Generally I can see this as ideal for
small businesses that cannot afford the legal costs of traditional contracting but still wants to avoid some of the risks 
that comes with hiring outside help. Conversely, this contract can help freelancers who want to avoid paying hefty fees
required by other sites or who may be talented but who are just starting out. The reputation system works for parties on
both ends.

# Why is this better than traditional contracting?
While smart contract use is still in its infancy it is well on its way to disrupting numerous industries around the world.
* By interacting through a smart contract users that wish to be a part of the ecosystem can pay and be paid in its native currency.
* This contract could be incorporated into other smart contracts in countless ways which can add value to our users. 
* Likewise, Contractd's use of tokenomics will also incentivize users to be honest by gathering reputation.
* The locking of funds can allow risk mitigation by third parties in a manner similar to insurance or venture capital
* The two parties can agree how the punishment should take place if the contract is not completed; both parties lossing 
  TRUST or just one.

# Tokenomics
* In order to complete a task, both the paying party and contractor must lock up an amount of TRUST tokens equal to
what the contract's task is assigned. 
* If the specified contract termination date passes before the contract is over, both parties' trust is slashed. 
  - This can happen if there is a disagreement on whether a task is completed or not, if the contractor 
    is too slow or underestimating (purposefully or not) the amount of time the task will take, etc. 
* Once a task is deemed complete, both parties are given double the task's payment amount in TRUST.
* There are a number of available punishment mechanisms for poor behavior that can be agreed upon in the contract.
* Users can buy TRUST directy from the contract but are penalized the more they do so. The exchange rate self-adjusts such
  that continued purchasing of TRUST becomes more expensive.
  * Completing a contract can lower the exchange rate while bad behavior can increase it.
* Secondary markets for TRUST are allowed where people can buy and sell TRUST. For those who are top earners on the platform
  they may hold much more than is needed for additional contracting. In this case they can cash in and sell their reputation to others.
* New members can either buy TRUST (which means they have money on the line for poor behavior), or they can be vouched for
by another party whom put their own TRUST on the line. This opens the door to recruiters and insurance instruments to assist
  in contracts as well.

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



Questions:
* Should people be allowed to buy TRUST from the contract?
  * 2 TRUST = 1 Dollar for escrow purposes but each TRUST purchased costs more than the previous. Cool-down by being paid.
    * f(x) = (2 - .5*(ln(x)+1/x))x 
* Can we avoid both parties from being punished by dead contracts?
* Allow the transfer of TRUST from one wallet to another?
  * Allow the transfer of TRUST from third parties to contract
