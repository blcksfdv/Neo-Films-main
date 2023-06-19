import useRPCData from "./useRPCData";
import {useMemo} from "react";

const useRpcNodeStatus=(rpcNode:string|undefined)=>{
    if(!rpcNode) return null;
    const chain=useRPCData(rpcNode);
    const data = useMemo(() => {
        const topRpc:any = chain?.data ?? {};

        const { height = null, latency = null, url = "" } = chain?.data || {};

        let trust = "transparent";
        let disableConnect = false;

        if (!height || !latency || topRpc.height - height > 3 || topRpc.latency - latency > 5000) {
            trust = "red";
        } else if (topRpc.height - height < 2 && topRpc.latency - latency > -600) {
            trust = "green";
        } else {
            trust = "orange";
        }

        if (url.includes("wss://") || url.includes("API_KEY")) disableConnect = true;

        const lat = latency ? (latency / 1000).toFixed(3) + "s" : null;

        return {
            ...chain,
            data: { ...chain.data, height, latency: lat, trust, disableConnect },
        };
    }, [chain,rpcNode]);
    return data.data.trust;
}
export default useRpcNodeStatus;