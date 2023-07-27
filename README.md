## tokenBridge

# Currently using self made token for testing.
# If you wanna send USDT make sure to add correct USDT address in Mainnet and have some USDT already available in bridge contract.

Step-1 ==> Deploy both the contracts in 2 or many evm compaitable chains.

Step-2 ==> When you deploy the Token contract make sure to write the owner/minter address through which the token is deployed.

Step-3 ==> Add Token contract address to respective Bridge contract through the remix or the chain explorer after verifying and publishing the contract.

Step-4 ==> Approve some other wallet to hold and spend token on your behalf using approve method in token contract.

Step-5 ==> Send some token to other wallet using the owner wallet to test those tokens Independently.

Step-6 ==> Add .env file in backend folder like this ==> 

                                          POLYGONRPC="https://polygon-mumbai.g.alchemy.com/v2/A4IU3JLLNeOn-rdzXPYs9oXCvH_gs_L-"
                                          AVALNCHERPC="https://api.avax-test.network/ext/bc/C/rpc"
                                          BRIDEADDRESS_AVAL="0xfA5773c5cAefb08f2011987C80152F113b92F985"
                                          BRIDEADDRESS_POLY="0x73001Af71991F72f4e02f54412701F7B8f7F1846"
                                          AVAL_TOKEN_ADDRESS="0x7baC7f966851ffBa09321d47a647EcA79a8d8020"
                                          privateKey="owner private key"
                                          POLY_WEBSOCKET_API="wss://polygon-mumbai.g.alchemy.com/v2/A4IU3JLLNeOn-rdzXPYs9oXCvH_gs_L-"
                                          AVAL_WEBSOCKET_API="wss://api.avax-test.network/ext/bc/C/ws"
                                          POLY_TOKEN_ADDRESS="0xeC4788EE57857AA7cC309f8b4B913Fea27478b08"


Step-7 ==> "npm start" both Frontend and backend after "npm -i", proceed to send the token from one chain to another.
