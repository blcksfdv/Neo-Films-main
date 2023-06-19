import { useCallback } from "react";
import { useQueries,useQuery } from "@tanstack/react-query";
import axios, {AxiosInterceptorManager, AxiosRequestConfig} from "axios";

const refetchInterval = 60_000;// 1 minute

export const rpcBody = JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_getBlockByNumber",
    params: ["latest", false],
    id: 1,
});
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    requestStart?: number;
}
const fetchChain = async (baseURL:string) => {
    if (baseURL.includes("API_KEY")) return null;
    try {
        let API = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        API.interceptors.request.use(function(request:any) {
            request.requestStart = Date.now();
            return request;
        });


        API.interceptors.response.use(
            function (response:any) {
                response.latency = Date.now() - response.config.requestStart;
                return response;
            },
            function (error) {
                if (error.response) {
                    error.response.latency = null;
                }

                return Promise.reject(error);
            },
        );

        let { data,  } = await API.post("", rpcBody);

        return { ...data,  };
    } catch (error) {
        return null;
    }
};

const formatData = (url:string, data:any) => {
    let height = data?.result?.number ?? null;
    let latency = data?.latency ?? null;
    if (height) {
        const hexString = height.toString(16);
        height = parseInt(hexString, 16);
    } else {
        latency = null;
    }
    return { url, height, latency };
};


const useRPCData = (url:string) => {
    return useQuery({  queryKey: [url],
        queryFn: () => fetchChain(url),
        refetchInterval,
        select: useCallback((data:any) => formatData(url, data), []),});
};

export default useRPCData;
