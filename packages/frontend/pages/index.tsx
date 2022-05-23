import {useCallback, useState} from "react";
import type { NextPage } from 'next';
import Image from 'next/image'
import Head from 'next/head';
import LoadingButton from '@mui/lab/LoadingButton';
import {showToast} from "../components/Toast";
import styles from '../styles/Home.module.css';
import useContractInfos from "../hooks/useContractInfos";
import {MTPackage} from "../utils/types";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import {useERC1155MTContract} from "../hooks/useContract";
import {getEtherscanLink} from "../utils/scan";
import {
    Typography,
    Link
} from "@mui/material";
import {formatEther} from "ethers/lib/utils";

const Home: NextPage = () => {
  const {account} = useActiveWeb3React();
  const erc1155MT = useERC1155MTContract();
  const {name, symbol, mintPrice, packages} = useContractInfos();
  const [minting, setMinting] = useState(-1);

  // mint token
  const onMinting = useCallback(async (tokenId: number) => {
      if(minting < 0 && account && mintPrice){
          setMinting(tokenId);
          try{
              const tx = await erc1155MT.mint(account, tokenId, 1, [], {value: mintPrice});
              await tx.wait();
              setMinting(-1);
              showToast("success", "Success", "You minted token successfully",
                  (<div>
                      <Link target={"_blank"} href={getEtherscanLink(tx.hash, 'transaction')}>
                          <Typography variant="subtitle2">
                              View on Etherscan
                          </Typography>
                    </Link>
                  </div>));
          } catch (e) {
              showToast("error", "Failed", "Transaction was failed");
              setMinting(-1);
          }
      }
  }, [minting, account, mintPrice]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Semi Fungible Token Mint</title>
        <meta name="description" content="mint semi fungible token" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Semi Fungible Token Mint
        </h1>

        <p className={styles.description}>
          Name: {name} <br/>
          Symbol: {symbol} <br/>
          Mint Price: {mintPrice ? formatEther(mintPrice) : "-"} ETH
        </p>

        <div className={styles.grid}>
          {
            packages.map((item: MTPackage, tokenId) =>
              <div key={tokenId} className={styles.card}>
                <Image
                  loader={() => item.image}
                  src={item.image}
                  alt={item.name}
                  layout={"responsive"}
                  width={280}
                  height={280}
                />
                <h2>{item.name} </h2>
                <p>{item.description}</p>
                <LoadingButton size="large" fullWidth variant="contained" loading={minting === tokenId} disabled={!account || minting === tokenId} onClick={() => onMinting(tokenId)}>Mint</LoadingButton>
              </div>
            )
          }
        </div>
      </main>
    </div>
  )
}

export default Home
