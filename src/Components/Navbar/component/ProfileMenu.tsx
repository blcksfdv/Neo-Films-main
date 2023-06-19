import { Avatar, Menu } from '@mui/material'
import React, { FC, useState } from 'react'
import { IProfileMenuProps } from '../types';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import { getBalance } from '../../../utils/balance';
import { useBalance } from '../../../hooks/useBalance';
import { getCurrency } from '../../../Helper/getCurrency';

export const ProfileMenu: FC<IProfileMenuProps> = (props) => {
    const { open, onClose, anchorEL } = props;
    const balance:any = useBalance()
    const { chainId } = useWeb3React()
    const currency = getCurrency(chainId)
    const navigate = useNavigate()

    return (
        <Menu
            open={open}
            onClose={onClose}
            anchorEl={anchorEL}
            className='flex flex-col'
        >
            <div className='flex flex-col w-48 p-5 justify-center items-center gap-5'>
                <button className='flex flex-row justify-center items-center gap-4' onClick={() => navigate('/profile')}>
                    <Avatar
                        alt=''
                        src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                    />
                    <h1>
                        Profile
                    </h1>
                </button>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1>
                        Total Balance
                    </h1>
                    <div className='flex flex-row justify-center items-center gap-2'>
                        <h1 className='font-bold text-lg '>
                            {balance !=null ? balance : 'loading...'}
                        </h1>
                        <h1 className='text-gray-400'>
                            {currency}
                        </h1>
                    </div>
                </div>
            </div>
        </Menu>
    )
}
