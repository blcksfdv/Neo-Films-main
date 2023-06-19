import { Skeleton } from '@mui/material';
import { MAX_SUPPLY } from './MintPage';
// import ProgressBar from '../ProgressBar';
// import { MAX_SUPPLY } from '../../../utils/constant';
const MintStatus = ({ isLoading, minted, mintedPercentage }: any) => {
  return (
    <div className="w-full sm:max-w-lg mx-auto">
      <div>
        {isLoading ? (
          <Skeleton />
        ) : (
          <div>
            <div className="w-full">
              <div className="mb-2 text-base font-bold  text-center justify-center text-white ">{`${mintedPercentage}% Minted`}</div>
              {/* <ProgressBar value={mintedPercentage} /> */}
              {/*<Progress maxWidth={'500px'} margin='auto' hasStripe value={mintedPercentage} size='md' colorScheme='red'*/}
              {/*          width={'100%'} />*/}
            </div>

            <div className="text-xs sm:text-base mt-3">
              <div className="grid grid-cols-3 gap-8 text-white justify-items-center px-7 py-4 border-[5px] border-[#fff] border-solid rounded-full bg-gradient-to-r from-purple-700 to-[#AB17DF] ">
                <div>Minted: {minted}</div>

                <p className="text-[40px]">/</p>
                <div>Total: {MAX_SUPPLY}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MintStatus;
