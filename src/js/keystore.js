/**
 * THIS CODE IS FOR DEMO PURPOSES ONLY, DO NOT USE IN PRODUCTION
 */

var EthereumTx = require('ethereumjs-tx');

var Keystore = function Keystore() {
    // Set the private key and address strings here
    this.privateKeyStr = "";
    this.address = "";
    this.privateKey = Buffer.from(this.privateKeyStr, 'hex');
}

Keystore.prototype.hasAddress = function(address, callback) {
    callback(null, this.address === address);
}

Keystore.prototype.signTransaction = function(txParams, callback) {
    try {
        var transaction = new EthereumTx(txParams);
        transaction.sign(this.privateKey);
        var serializedTx = transaction.serialize();
        callback(null, serializedTx);
    } catch(error) {
        callback(new Error(error), null);
    }
}

module.exports = Keystore;