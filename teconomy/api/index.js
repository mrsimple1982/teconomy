"use strict";
const express = require('express')
const app = express()
const port = 6000

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.WebBundlr = exports["default"] = void 0;
var bundlr_1 = require("./bundlr");
__createBinding(exports, bundlr_1, "default");
var bundlr_2 = require("./bundlr");
__createBinding(exports, bundlr_2, "default", "WebBundlr");
var client_1 = require("@bundlr-network/client");



app.get('/connect', (req, res) => {
var bundlr = new client_1["default"](req.query.node, req.query.currency, req.query.privatekey);
console.log(bundlr);
    res.send(bundlr)
})
app.get('/loaded_balance', (req, res) => {
  var bundlr = new client_1["default"](req.query.node, req.query.currency, req.query.privatekey);
//Get the loaded address' balance with the Bundlr node in atomic units
var balance = bundlr.getLoadedBalance().then(function (result) {
    console.log(result);
  res.send(result)
});
    
})
app.get('/price', (req, res) => {
  var bundlr = new client_1["default"](req.query.node, req.query.currency, req.query.privatekey);
//Get the price for n bytes in atomic units
var price = bundlr.getPrice(req.query.bytes).then(function (result) {
    console.log(result);
  res.send(result)
});
    
})
app.get('/fund', (req, res) => {
  var bundlr = new client_1["default"](req.query.node, req.query.currency, req.query.privatekey);
//Fund the Bundlr node
var a = bundlr.fund(req.query.amount).then(function (result) {
    console.log(result);
  res.send(result)
});
    
})
app.get('/withdraw', (req, res) => {
  var bundlr = new client_1["default"](req.query.node, req.query.currency, req.query.privatekey);
//Withdraw balance from Bundlr 
var b = bundlr.withdrawBalance(req.query.amount).then(function (result) {
    console.log(result);
  res.send(result)
});
    
})
app.get('/transaction', (req, res) => {
  var bundlr = new client_1["default"](req.query.node, req.query.currency, req.query.privatekey);
//Store NFT image and tags on Arweave via bundlr node
const nft=req.query.link;
const tags = [{name: req.query.tag_name, value: req.query.tag_value}];

const transaction = bundlr.createTransaction(nft, { tags });

 transaction.sign();
 transaction.upload();
//const id = ( transaction.upload).data;

//console.log(id);
  console.log(transaction);
res.send(transaction);
})
app.get('/bal', (req, res) => {
  var bundlr = new client_1["default"](req.query.node, req.query.currency, req.query.privatekey);
//Withdraw balance from Bundlr 
var b = bundlr.getBalance(req.query.address).then(function (result) {
    console.log(result);
  res.send(result)
});
    
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})