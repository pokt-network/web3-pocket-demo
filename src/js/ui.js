var Web3 = require('web3');
var PocketProvider = require('web3-pocket-provider');
var Keystore = require('./keystore');
var keystore = new Keystore();

var transactionSigner = {
    hasAddress: function (address, callback) {
        keystore.hasAddress(address, callback);
    },
    signTransaction: function (txParams, callback) {
        keystore.signTransaction(txParams, callback);
    }
};

var options = {
    networkId: '5777',
    timeout: 0
}

// Create the provider
var pocketProvider = new PocketProvider('http://localhost:3000', transactionSigner, options);

// Create web3 instance with the provider
var web3 = new Web3(pocketProvider);

$(document).ready(function() {

    // Setup nav header
    $('#address-nav').text('Address: ' + keystore.address);

    web3.eth.getBalance(keystore.address, function(error, balance) {
        if(error !== null) {
            console.error('Error getting account balance');
        }
        var ethBalance = web3.utils.fromWei(balance).toString();
        $('#balance').text(ethBalance + " ETH");
    });

    web3.eth.getTransactionCount(keystore.address, function(error, transactionCount) {
        if (error !== null) {
            console.error('Error getting account transaction count');
        }
        var transactionCountStr = transactionCount.toString();
        $('#transaction-count').text(transactionCountStr);
    });
});