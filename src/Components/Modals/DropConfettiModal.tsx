import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

const DropConfettiModal = ({ openModal, handleCloseModal, rawNftList }: any) => {
    return (
        <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>
                <Typography className="font-bold text-xl">
                    !!Congratulation!!
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Congratulations on successfully minting your NFT! This is a
                    significant achievement and a testament to your creativity and hard
                    work. Wishing you the best of luck as you continue to explore the
                    exciting world of NFTs.
                </Typography>
                {/*<Box>*/}
                {/*  <Carousel*/}
                {/*    showArrows={rawNftList.length > 1}*/}
                {/*    className="cursor-pointer w-full"*/}
                {/*    showThumbs={false}*/}
                {/*    autoPlay={true}*/}
                {/*    showStatus={rawNftList.length > 1}*/}
                {/*    interval={2000}*/}
                {/*    infiniteLoop={true}*/}
                {/*    showIndicators={false}*/}
                {/*    stopOnHover={true}*/}
                {/*    width={'100%'}*/}
                {/*    // height={cardHeight}*/}
                {/*  >*/}
                {/*    {rawNftList.map((rawNft) => (*/}
                {/*      <div className="w-full h-full" key={rawNft.nftId}>*/}
                {/*        <div className="flex items-center justify-center text-sm">*/}
                {/*          <SingleNftCard*/}
                {/*            nftAddress={rawNft.nftAddress}*/}
                {/*            nftId={rawNft.nftId}*/}
                {/*          >*/}
                {/*            {(x) => {*/}
                {/*              const { loading, error, nft, fetchNFT } = x();*/}
                {/*              if (loading)*/}
                {/*                return (*/}
                {/*                  <Skeleton*/}
                {/*                    sx={{ mx: 0, width: '320px', height: '320px' }}*/}
                {/*                  />*/}
                {/*                );*/}
                {/*              if (error) {*/}
                {/*                return (*/}
                {/*                  <div className="flex flex-col items-center justify-center gap-1">*/}
                {/*                    <ErrorOutlineTwoToneIcon />*/}
                {/*                    <span style={{ color: 'blue', fontWeight: '600' }}>*/}
                {/*                      nftId: {rawNft.nftId}*/}
                {/*                    </span>*/}
                {/*                    <span*/}
                {/*                      className={*/}
                {/*                        'flex items-center justify-center gap-2'*/}
                {/*                      }*/}
                {/*                    >*/}
                {/*                      <span>Contract Address: </span>*/}
                {/*                      <AddressCopyButton address={rawNft.nftAddress} />*/}
                {/*                    </span>*/}
                {/*                    <span*/}
                {/*                      style={{*/}
                {/*                        fontSize: '14px',*/}
                {/*                        lineHeight: '20px',*/}
                {/*                        width: '100%',*/}
                {/*                        textAlign: 'center',*/}
                {/*                        padding: '0 12px',*/}
                {/*                        color: 'blue',*/}
                {/*                      }}*/}
                {/*                    >*/}
                {/*                      {error?.message ?? error.toString()}*/}
                {/*                    </span>*/}
                {/*                    <StyledButton*/}
                {/*                      variant="contained"*/}
                {/*                      fullWidth*/}
                {/*                      onClick={() => {*/}
                {/*                        fetchNFT(networkConfig.mainnet.rpcUrl);*/}
                {/*                      }}*/}
                {/*                    >*/}
                {/*                      Retry*/}
                {/*                    </StyledButton>*/}
                {/*                  </div>*/}
                {/*                );*/}
                {/*              }*/}

                {/*              if (nft) {*/}
                {/*                return (*/}
                {/*                  <PaperRecord*/}
                {/*                    sx={{*/}
                {/*                      p: 3,*/}
                {/*                      mt: 5,*/}
                {/*                      width: '320px',*/}
                {/*                      height: '320px',*/}
                {/*                    }}*/}
                {/*                  >*/}
                {/*                    <RenderNftFile*/}
                {/*                      type={nft.type}*/}
                {/*                      fileUrl={nft.fileUrl}*/}
                {/*                    />*/}
                {/*                  </PaperRecord>*/}
                {/*                );*/}
                {/*              }*/}
                {/*            }}*/}
                {/*          </SingleNftCard>*/}
                {/*        </div>*/}
                {/*        <p className="legend">NFT id: {rawNft.nftId}</p>*/}
                {/*      </div>*/}
                {/*    ))}*/}
                {/*  </Carousel>*/}
                {/*</Box>*/}
            </DialogContent>
        </Dialog>
    );
};

export default DropConfettiModal;
