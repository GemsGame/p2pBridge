import { useWeb3Store } from ".";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { BridgesActions } from "../../types/bridges";
import { useBridgesStore } from "../bridges";

export async function connect(
  this: ReturnType<typeof useWeb3Store>
): Promise<void> {

  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions: CONFIG.providerOptions,
    theme: "dark",
  });

  const provider = await web3Modal.connect();

  this.provider = provider;
  this.web3 = new Web3(provider);
  console.log((await this.web3.eth.accounts.wallet))
  this.address = (await this.web3.eth.getAccounts())[0];
  this.chainId = await this.web3.eth.getChainId();

  if (!(this.chainId in this.config.chains)) {
    await switchChain(1337); //On unknown chain switch to ganache for user safety
  }

  const bridgesStore = useBridgesStore();
  await bridgesStore[BridgesActions.ConnectContract]();

  provider.on("accountsChanged", (accounts: string[]) => {
    this.address = accounts[0];
    console.log(accounts)
  });

  provider.on("chainChanged", (chainId: string) => {
    this.chainId = parseInt(chainId);
  });
  this.connected = true;
}

async function addNewChain(chainId: number): Promise<void> {
  const web3Store = useWeb3Store();
  if (!web3Store.provider) return;
  return web3Store.provider.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: `0x${chainId.toString(16)}`,
        chainName: web3Store.config.chains[chainId].chainName,
        rpcUrls: [web3Store.config.chains[chainId].rpcUrls[0]],
      },
    ],
  });
}

async function _switchChain(chainId: number): Promise<void> {
  const web3Store = useWeb3Store();
  if (!web3Store.provider) return;
  return web3Store.provider.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: `0x${chainId.toString(16)}`,
      },
    ],
  });
}

export async function switchChain(chainId: number): Promise<void> {
  const web3Store = useWeb3Store();
  try {
    await _switchChain(chainId);
  } catch {
    await addNewChain(chainId);
    await _switchChain(chainId);
  }
}
