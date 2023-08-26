import { Skeleton } from '@mui/material';
import { MAX_SUPPLY } from './MintPage';
// import ProgressBar from '../ProgressBar';
// import { MAX_SUPPLY } from '../../../utils/constant';

const MintStatus = ({ isLoading, minted, mintedPercentage }: any) => {

  console.log(minted);
  
  return (
    <div className="w-full sm:max-w-lg mx-auto">
      <div>
        {isLoading ? (
          <Skeleton />
        ) : (
          <div>
         
            <div className="text-xs sm:text-base mt-3">
              <div className="grid grid-cols-3 gap-8 text-white justify-items-center px-7 py-4 border-[5px] border-[#fff] border-solid rounded-full bg-gradient-to-r from-purple-700 to-[#AB17DF] ">
                <div>Minted: {mintedPercentage}%</div>

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

