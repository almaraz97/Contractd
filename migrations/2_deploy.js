// const Token = artifacts.require("Token");
// const dBank = artifacts.require("dBank");
const Checklist = artifacts.require("Checklist");

module.exports = async function(deployer) {
	// //deploy Token
    // await deployer.deploy(Token)
	// //assign token into variable to get it's address
	// const token = await Token.deployed()
	// //pass token address for dBank contract(for future minting)
    // await deployer.deploy(dBank, token.address)
	// //assign dBank contract into variable to get it's address
    // const dbank = await dBank.deployed()
	// //change token's owner/minter from deployer to dBank
    // await token.passMinterRole(dbank.address)
    //deploy Token
    await deployer.deploy(Checklist, '0xc10D00BfCbF779627c91Fa72Dc10bEd4fCd2A7e2', 'Virtual Lock');
    const checklist = await Checklist.deployed();
};