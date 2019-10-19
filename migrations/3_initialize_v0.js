const ERC721Patronage_v0 = artifacts.require("ERC721Patronage_v0");
const ERC20PatronageReceipt_v0 = artifacts.require("ERC20PatronageReceipt_v0");
const CarbonCreditSteward_v0 = artifacts.require("CarbonCreditSteward_v0");

const patronageNumerator = 2400000000000
const patronageDenominator = 1000000000000

const image1MetadataJson = {
  location: "def"
}
const image1MetadataString = JSON.stringify(image1MetadataJson)
const image2MetadataJson = {
  location: "abc"
}
const image2MetadataString = JSON.stringify(image2MetadataJson)

module.exports = function (deployer, networkName, accounts) {
  deployer.then(async () => {
    // Don't try to deploy/migrate the contracts for tests
    if (networkName === 'test') {
      return
    }

    const patronageToken = await ERC721Patronage_v0.deployed()
    const steward = await CarbonCreditSteward_v0.deployed()

    console.log(await patronageToken.isMinter.call(accounts[0]))
    await Promise.all([
      patronageToken.mintWithTokenURI(steward.address, 0, image1MetadataString, { from: accounts[0] }),
      patronageToken.mintWithTokenURI(steward.address, 1, image2MetadataString, { from: accounts[0] }),
      patronageToken.mintWithTokenURI(steward.address, 2, image2MetadataString, { from: accounts[0] }),
      patronageToken.mintWithTokenURI(steward.address, 3, image2MetadataString, { from: accounts[0] }),
      patronageToken.mintWithTokenURI(steward.address, 4, image2MetadataString, { from: accounts[0] }),
      patronageToken.mintWithTokenURI(steward.address, 5, image2MetadataString, { from: accounts[0] }),
      patronageToken.mintWithTokenURI(steward.address, 6, image2MetadataString, { from: accounts[0] }),
      patronageToken.mintWithTokenURI(steward.address, 7, image2MetadataString, { from: accounts[0] }),
      patronageToken.mintWithTokenURI(steward.address, 8, image2MetadataString, { from: accounts[0] }),
    ])
    console.log(ERC20PatronageReceipt_v0.address)
    await steward.initialize(patronageToken.address, accounts[0], patronageDenominator, ERC20PatronageReceipt_v0.address, { from: accounts[0] })
    await steward.listNewTokens(
      [0, 1, 2, 3, 4, 5, 6, 7, 8],
      [accounts[0], accounts[0], accounts[0], accounts[0], accounts[0], accounts[0], accounts[0], accounts[0], accounts[0]],
      [patronageNumerator, patronageNumerator, patronageNumerator, patronageNumerator, patronageNumerator, patronageNumerator, patronageNumerator, patronageNumerator, patronageNumerator],
      { from: accounts[0] }
    )
  })
}
