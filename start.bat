@echo off
start geth --datadir ./geth_network --networkid 15 --http --http.api "personal,web3,net,eth" --http.corsdomain "*" --allow-insecure-unlock
start geth attach \\.\pipe\geth.ipc --exec miner.start()
start geth attach \\.\pipe\geth.ipc
npm start