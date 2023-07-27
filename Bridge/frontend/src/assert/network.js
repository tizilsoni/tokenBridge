export const network = [
    {
        networkiconUrl:"https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574",
        networkName:"Avalanche",
        id:0,
        networkType:"Testnet",
        chainId:"43113"
    },
    {
        networkiconUrl:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
        networkName:"Polygon",
        id:1,
        networkType:"Testnet",
        chainId:"80001"
    }
]


export const mapnetworks = new Map();

mapnetworks.set("43113", {
    networkiconUrl:"https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574",
    networkName:"Avalanche",
    id:0,
    networkType:"Testnet",
    chainId:"43113"
})
mapnetworks.set("80001",{
    networkiconUrl:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
    networkName:"Polygon",
    id:1,
    networkType:"Testnet",
    chainId:"80001"
})

export function getValue(chainId){
     return mapnetworks.get(chainId);
}