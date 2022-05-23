import {useMemo} from "react";
import {ethers} from 'ethers'
import ERC1155MTJson from "../abi/ERC1155MT.json";
import useActiveWeb3React from "./useActiveWeb3React";
import {CHAIN_PARAMS} from "../config/constants";

export const useERC1155MTContract = () => {
    const {library, chainId} = useActiveWeb3React()
    return useMemo(() => {
        const signerOrProvider = library?.getSigner() ?? new ethers.providers.StaticJsonRpcProvider(CHAIN_PARAMS[chainId].rpcUrls[0]);
        return new ethers.Contract(ERC1155MTJson.address, ERC1155MTJson.abi, signerOrProvider);
    }, [library]);
}