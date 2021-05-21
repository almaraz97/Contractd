const Migrations = artifacts.require("Migrations");
// const Checklist = artifacts.require("Checklist");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  // deployer.deploy(Checklist, '0x66c1c6c3C4F8691462425a415C8d6fe585A841dE', 'Virtual Lock')
};
