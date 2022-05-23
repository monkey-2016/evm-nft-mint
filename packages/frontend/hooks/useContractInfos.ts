import {useEffect, useState} from "react";
import axios from "axios";
import {useERC1155MTContract} from "./useContract";
import {MTPackage} from "../utils/types";
import {BigNumber} from "@ethersproject/bignumber";
import useActiveWeb3React from "./useActiveWeb3React";

interface ERC1155MTInfo{
    name: string;
    symbol: string;
    mintPrice: BigNumber | null;
    packages: Array<MTPackage>;
}

const useContractInfos = () => {
    const { account } = useActiveWeb3React();
    const erc1155MTContract = useERC1155MTContract();
    const [infos, setInfos] = useState<ERC1155MTInfo>({
        name: "",
        symbol: "",
        mintPrice: null,
        packages: []
    })


    useEffect(() => {
        // fetch contract infos (name, symbol, mint-price, packages) from contract and ipfs
        const fetchInfos = async () => {
            console.log('fetch packages');
            const packages: Array<any> = [];
            for(let i = 0; i<3 ; i++){
                try{
                    let jsonUri = await erc1155MTContract.uri(i);
                    jsonUri = jsonUri.replace("ipfs://", "https://ipfs.io/ipfs/");

                    const jsonData = await axios.get(jsonUri);
                    console.log('jsonData', jsonData);
                    if(jsonData.status == 200){
                        packages.push(jsonData.data);
                    }
                } catch (e) {
                    console.error('error', e);
                }
            }
            const name = await erc1155MTContract.name();
            const symbol = await erc1155MTContract.symbol();
            const mintPrice = await erc1155MTContract.mintPrice();
            return({
                name,
                symbol,
                mintPrice,
                packages
            })
        }

        if(account){
            fetchInfos().then((response: ERC1155MTInfo) => {
                setInfos(response);
            })
        }
    }, [account])

    return infos;
}

export default useContractInfos;