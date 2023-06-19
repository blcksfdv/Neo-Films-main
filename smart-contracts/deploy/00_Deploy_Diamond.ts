/* global ethers */
/* eslint prefer-const: "off" */

import { deployDiamond } from '../lib/diamond/deploy';

module.exports = async () => {
    try {
        await deployDiamond();
    } catch (error) {
        console.error('Error deploying Diamond:', error);
    }
};

