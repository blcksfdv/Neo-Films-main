import { useContext } from 'react';
import { NetworkContext, NetworkContextType } from '../Provider/context/NetworkContext';

// ----------------------------------------------------------------------

const useNetwork = () => useContext(NetworkContext) as NetworkContextType;

export default useNetwork;
