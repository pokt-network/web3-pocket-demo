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

function refreshAccountData() {
    // Setup nav header
    $('#address-nav').text('Address: ' + keystore.address);

    web3.eth.getBalance(keystore.address, function (error, balance) {
        if (error !== null) {
            console.error('Error getting account balance');
        }
        var ethBalance = web3.utils.fromWei(balance).toString();
        $('#balance').text(ethBalance + " ETH");
    });

    web3.eth.getTransactionCount(keystore.address, function (error, transactionCount) {
        if (error !== null) {
            console.error('Error getting account transaction count');
        }
        var transactionCountStr = transactionCount.toString();
        $('#transaction-count').text(transactionCountStr);
    });
}

$(document).ready(function() {

    // Refresh account data
    refreshAccountData();

    $("#send-transaction").submit(function (event) {
        event.preventDefault();

        var toAddress = $('#to-address').val();
        var amount = $('#amount').val();

        var txParams = {
            to: toAddress,
            value: web3.utils.toWei(amount),
            from: keystore.address,
            gasPrice: '0x1',
            gas: '0x3B9AC9FF'
        };

        web3.eth.sendTransaction(txParams, function(error, txHash) {
            alert('Transaction Hash: ' + txHash);
            refreshAccountData();
            web3.eth.getTransaction(txHash, function(error, transactionReceipt) {
                if(error !== null) {
                    console.error(error);
                }
                console.log(transactionReceipt);
            });
        });
    });
});