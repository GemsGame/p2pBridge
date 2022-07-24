import {
  avalanche,
  bsc,
  busd,
  cronos,
  ethereum,
  gnosis,
  polygon,
  tether,
  usdc,
} from "../asset/images/images";

export const chainDetails = {
  "1": {
    name: "Ethereum",
    icon: ethereum,
    token: {
      USDT: { name: "USDT", icon: tether },
      BUSD: { name: "BUSD", icon: busd },
      USDC: { name: "USDC", icon: usdc },
    },
  },
  "56": {
    name: "BSC",
    icon: bsc,
    token: {
      USDT: { name: "USDT", icon: tether },
      BUSD: { name: "BUSD", icon: busd },
      USDC: { name: "USDC", icon: usdc },
    },
  },
  "338": {
    name: "Cronos Test",
    icon: cronos,
    token: {
      "0x1719DED8e908d7b1fe54ba6c6fD280A605e977ee": {
        name: "USDT",
        icon: tether,
      },
      USDT: { name: "USDT", icon: tether },
      BUSD: { name: "BUSD", icon: busd },
      USDC: { name: "USDC", icon: usdc },
    },
  },
  "77": {
    name: "Gnosis Test",
    icon: gnosis,
    token: {
      "0x1719DED8e908d7b1fe54ba6c6fD280A605e977ee": {
        name: "USDT",
        icon: tether,
      },
      BUSD: { name: "BUSD", icon: busd },
      USDC: { name: "USDC", icon: usdc },
    },
  },
  "43114": {
    name: "Avalanche",
    icon: avalanche,
    token: {
      USDT: { name: "USDT", icon: tether },
      BUSD: { name: "BUSD", icon: busd },
      USDC: { name: "USDC", icon: usdc },
    },
  },
  "137": {
    name: "Polygon",
    icon: polygon,
    token: {
      USDT: { name: "USDT", icon: tether },
      BUSD: { name: "BUSD", icon: busd },
      USDC: { name: "USDC", icon: usdc },
    },
  },
} as {
  [key in string]: {
    name: string;
    icon: string;
    token: { [key in string]: { name: string; icon: string } };
  };
};
