export const getCurrency = (chainId: number | undefined) => {
  switch (chainId) {
    case 338:
      return "TCRO";
    case 1:
      return "ETH";
    case 25:
      return "CRO";
    default:
      return undefined;
  }
};


export const PriceInMatic = 1