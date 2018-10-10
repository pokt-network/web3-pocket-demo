/**
 * THIS CODE IS FOR DEMO PURPOSES ONLY, DO NOT USE IN PRODUCTION
 */

var EthereumTx = require('ethereumjs-tx');

var Keystore = function Keystore() {
    // Set the private key and address strings here
    this.privateKeyStr = "49190b5ee82f5f4e9eb4b013f955312d40da5d6e9a50e815a2d31cf1a4db2315";
    this.address = "0xe955199873Abd97A921F8B57D27809D57bFF6329";
    this.privateKey = Buffer.from(this.privateKeyStr, 'hex');
}

Keystore.prototype.hasAddress = function(address, callback) {
    callback(null, this.address.toUpperCase() === address.toUpperCase());
}

Keystore.prototype.signTransaction = function(txParams, callback) {
    try {
        var transaction = new EthereumTx(txParams);
        transaction.sign(this.privateKey);
        var serializedTx = transaction.serialize();
        callback(null, '0x' + serializedTx.toString('hex'));
    } catch(error) {
        callback(new Error(error), null);
    }
}

module.exports = Keystore;