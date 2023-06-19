import * as fs from "fs";

let data = {
  "0xB41A12D2380A0F10A97b58D22C677dFdF1454139": [
    0,
    1,
    2,
    157,
    158,
    226,
    227
  ],
  "0xDe8266bf77d65A02E4cc5bf5E526e4C2140aabc1": [
    3,
    4,
    5,
    134,
    135,
    136,
    137,
    138,
    139,
    140
  ],
  "0xC5aceE542B82A6BFc32DF5F801C9765e7f023551": [
    6,
    19,
    20,
    21,
    28,
    29,
    30,
    32,
    33,
    34,
    45,
    46,
    51,
    52,
    53,
    54,
    59,
    61,
    62,
    69,
    70,
    71,
    129,
    130,
    131,
    132,
    141,
    142,
    143,
    144,
    145,
    146,
    147,
    148,
    149,
    150,
    151,
    152,
    153,
    154,
    156,
    159,
    160,
    161,
    162,
    163,
    164,
    165,
    166,
    167,
    168,
    169,
    170,
    171,
    175,
    176,
    177
  ],
  "0xdC6dCd58FbA494F833e3B2ae94fFe25AAF5B88FC": [
    7,
    8,
    9
  ],
  "0x24a541A74af3882f6737FFcB32069C837a42C6df": [
    10,
    11,
    199,
    200
  ],
  "0x9041F4Fcda493C0a0E42E4400ae5a0F9B411f901": [
    12,
    13
  ],
  "0x1532Ae55D8Ca89363c22C8a1dBB7685fa4759e69": [
    14,
    15,
    16,
    252,
    253,
    254,
    273,
    274,
    275,
    278,
    279,
    280,
    281
  ],
  "0x4959aee7ee78186100f725573703A6a5701F645A": [
    17,
    425,
    426
  ],
  "0xAa55a818cE6D83DA30f1296D41074Dc1AbD9C4f0": [
    18,
    440,
    441
  ],
  "0xDe17ECF1e9ba5725dd7E7875a2F47E141a32e788": [
    22,
    23,
    24,
    442,
    443
  ],
  "0x2a3D253A46218FFaAd2bc7eABbf6b9304B979d47": [
    25
  ],
  "0xacaEf3f859813B43399B539B7094C79adbe91593": [
    26
  ],
  "0xa1090738b0Af70A60a62a19De9aAE0D9639EAf64": [
    27
  ],
  "0x9bb9268d71412FD918eA08357fff068Fe7f82735": [
    31,
    362,
    400
  ],
  "0xfE67a9E6038fC44Dc4e771645939c554E88d1498": [
    35,
    36,
    37
  ],
  "0x3F25cC01C3b5CA2B30b8e5bc7e2D879146372fd2": [
    38
  ],
  "0xA1c4878a5C6CB0241a40F0F195E204B3cfDED369": [
    39,
    40
  ],
  "0xF3fAb1B547499f5304EA9cbD646d8f5539FD6BA5": [
    41
  ],
  "0x4773486c07AF05bFAc1C220F8790CA00075F7b53": [
    42,
    43,
    44
  ],
  "0x5e44357be9c3b4CeAbb30bD0E0A336608eCa0a3b": [
    47
  ],
  "0x602BFe41496e7Cf3d5011eCa0CA8E66E2cFbE745": [
    48,
    49,
    50
  ],
  "0x97FD2cFBfF3eb3f1CB019DE99aA7705ec7579499": [
    55,
    56,
    57
  ],
  "0xF8e148B1dbF6df530d1EeaD814798D472a59000B": [
    58
  ],
  "0x798c4D95F5C186ea4fA2838CDa5e797A28f982E6": [
    60
  ],
  "0x75971932EA81A401dB5DBaFeDA3a1307caE2928e": [
    63,
    67,
    68
  ],
  "0xc814070Be24d5263a949D3c729a51CB9F6f00646": [
    64
  ],
  "0xb0f0B10a997Ee8a5B023F1Fe48e7F730E98c3Ef9": [
    65,
    66
  ],
  "0xa3311E40ac917e30F65cDAACFDC59339dAeB9D5e": [
    72
  ],
  "0x34629C01531b84f840610B561938cB465689c703": [
    73,
    76
  ],
  "0x98000f240f63364E5849e32F9d14f1f5733cCB26": [
    74
  ],
  "0x99Cce0EeE6391534c0713249c7754D108EFDb11E": [
    75,
    80
  ],
  "0x586f93897Ae9382e54CC1d0bC67b29464e718F08": [
    77
  ],
  "0xa94Bd00015a97A1FDA21eC02B98b4e0003309d11": [
    78
  ],
  "0xc38Ab1eeB92222704b25c2D17760948f65578bF9": [
    79
  ],
  "0x2541779c9f5Aac24E2A53CCF3454933093DEBE92": [
    81,
    82,
    83
  ],
  "0xBaD60B230EDC08a5d5A249489AF5d074f1b0c351": [
    84,
    85,
    86
  ],
  "0x5378eAac4E2fA12fcc762FD6213B8D2B26Fc5B02": [
    87,
    118
  ],
  "0x86B5F187469De99a824020E2AfABfAbe63d2Eda7": [
    88
  ],
  "0x7d3d6a8C2262917aCcb52C7D5d5f0D6B6d326f09": [
    89
  ],
  "0x0b83C462b723E90b25592aB2eecBb1DD875829D6": [
    90,
    91
  ],
  "0x890Ea984DaB3EB1b683411C041516426ca969e49": [
    92
  ],
  "0x837A9901300312c86884902DB2bFd343A93604Dc": [
    93
  ],
  "0x68DE2D6B022Dae5dB1237b6ddB80eb739Ab8d1f8": [
    94,
    95,
    96
  ],
  "0xd5d597fEB5C7836a9E5F5a217817da4584a2E0f1": [
    97,
    98,
    99
  ],
  "0x1Ca679a66d69FAde171a13d4Da5C9dDd03d04308": [
    100
  ],
  "0xA43Adfb594310e136307Ff9760fbac3e28a9DAa0": [
    101
  ],
  "0x6D20DDb8b80B6Fcfb526604ba99c98b318C0177B": [
    102,
    103,
    104
  ],
  "0x1ee1A1116eBA3D5fa3B6bD7fdD1e859C0f08aE1b": [
    105,
    106
  ],
  "0x9bBcC22Cb7245b0ac4c2D17Da0BbE699273eEda3": [
    107
  ],
  "0xE22683BADd4E35ac0c7eC2BF08d75575BDa88409": [
    108
  ],
  "0x3076dD2c4f6797034Ffb11cedFca352b579b120E": [
    109,
    110,
    111,
    128
  ],
  "0x83f555bd201D4602ce4B3FdE79e8Cb18Ed56E245": [
    112,
    115,
    116
  ],
  "0x50B9FFb93fbF565f836d8cDf5A5874F1fa7DF8b6": [
    113,
    114
  ],
  "0x577916bFc93a80c0f8A3aCaBFd928F29446b0761": [
    117
  ],
  "0xa78d24A4CD52F37dfB0836f105eb91d18c6aa29c": [
    119,
    120
  ],
  "0x778ED2BE2A6a6Eb6df1fffa97d29D50f8AaA27a2": [
    121,
    122,
    123
  ],
  "0x778631dB9b8B1906131Bb89e21f834b99eAA31CF": [
    124
  ],
  "0xdcC90475F6B41aCf6Ca1d192b9bdD038dF0e72e0": [
    125
  ],
  "0x11194aA8d25DA6EAfC1401F1f925337b604A1ED7": [
    126
  ],
  "0x5f4E021398F1b767fd5844225227C7f7a8b20797": [
    127
  ],
  "0x1E2658C9DD1dF7D0C9A85B1ED984B6ddfFB7Fb16": [
    133,
    369,
    370
  ],
  "0x707DB1f5bA68193De3e9AA332C693607A621f814": [
    155
  ],
  "0x491968b05D95979BA3a52D73D8a39EA96693f011": [
    172,
    173,
    174
  ],
  "0x9619E0530614F1F8245117B2Fe2775AD0AECbc0C": [
    178
  ],
  "0x2e81d9Fb30eF692280284DcC656814EbE6b68043": [
    179
  ],
  "0x92950cc9d226133D866d6Bf36c647Ff1B42397E5": [
    180,
    181,
    188,
    189
  ],
  "0xf5d2539690562f9CB7cC228422500BcaA7D7b981": [
    182,
    183
  ],
  "0x18C30251ADAE03701cC240641b6C3725639b5aDD": [
    184,
    185
  ],
  "0x2DDc3EBCA6DEA894EC259d660528FC3f41C8954C": [
    186,
    187,
    236,
    237
  ],
  "0xCacF4F952020EFc23019818006708440Aeae30f2": [
    190,
    191,
    432,
    433
  ],
  "0x052689F00CE3a71216C67A66a54c88334a6Eb305": [
    192,
    193,
    413,
    414
  ],
  "0x9aB69183B05f5d9cA7E7d88c2081B281F259101C": [
    194,
    195
  ],
  "0xC485EE59d1D69f44d87c0545Ca1c641E05d04a76": [
    196,
    197,
    198,
    201,
    202,
    203,
    204,
    205,
    206,
    207,
    208,
    209,
    210,
    211,
    212,
    213,
    214,
    215,
    216,
    217,
    218,
    219,
    220,
    221,
    222,
    223,
    224,
    225
  ],
  "0xf51976C85DFD772445330Ec01804694a863cc306": [
    228,
    229,
    303,
    304
  ],
  "0xBD43e95EcFF3e1153896f9a22fbE497CEd6bc60C": [
    230,
    231
  ],
  "0xCbD9f0166CeaD845d28172a9FdA0B584f21F011B": [
    232,
    233,
    234,
    235
  ],
  "0xe7b5ae95f3805278250EE715316bdAc8b956433b": [
    238,
    239
  ],
  "0x49aD53280632bd078C7415972a60DEC12BDcEC00": [
    240,
    241,
    242,
    243,
    244,
    245
  ],
  "0x10792B73782F7A43272078d144518f0A4dA8C694": [
    246,
    247
  ],
  "0xA77cF9F200832B952c9c503004A94Ba5E0b1d713": [
    248,
    249,
    250,
    251
  ],
  "0xDc805d55cDA95Bf4cC5eCee141C5d8E8cffCe13B": [
    255,
    256,
    257,
    258,
    259,
    260
  ],
  "0xE5c25ddc88Eb5257baf8cae84e0FEe40836637Ed": [
    261,
    262
  ],
  "0x596e42E54B525A955136Dd30FfCff2cB43A8aB0b": [
    263,
    264
  ],
  "0xb28552Ad34bf2Ea1aD59De0F96B4C028DC773783": [
    265,
    266
  ],
  "0x7F14bbcd8b7E7b3Df1ea150E5D175F20D6DBd66d": [
    267,
    268
  ],
  "0x46190A0E24a7deE8DAe568C1c118F92B1EfA1503": [
    269,
    270
  ],
  "0xDe2747cA2a2390F474e5cc8F02e5d6FC7007F41D": [
    271,
    272
  ],
  "0xfe221F5D65e36d3DA21Dd58Ff26E1AC8020f4467": [
    276,
    277
  ],
  "0x055ef3015b9725A3264D154003bae428B820b0b0": [
    282,
    283
  ],
  "0x3b56f49a4142383A6dB06e1bc05b958B31bb46fd": [
    284,
    285
  ],
  "0x3bd75973B3A6Bd6eB69632898182B0677216b064": [
    286,
    287
  ],
  "0x085D7386563B304DBfC14B5902Ee120649b2c944": [
    288,
    289
  ],
  "0xaB34b4969b7CFbb23C4949ea40F41588E9fED511": [
    290,
    291
  ],
  "0xDC6Ad288D435944330362a5637EEc6ffC9251463": [
    292,
    293,
    294,
    367
  ],
  "0xd805C2Ce025Df26E2A4BaA49F3A7e68C352fd223": [
    295,
    296
  ],
  "0xCa01eB77800a84c1BD6670AfB1787759CEA5c6a0": [
    297,
    298
  ],
  "0xba105eD077a41D6D4Aa6f559790Bb7C2d95D0C4e": [
    299,
    300
  ],
  "0x0ed6C928b100fa2C263c85eA42b22a5A612045E4": [
    301,
    302
  ],
  "0x19675E4cEB507C3Af6E6079F1CC669fEDA9462D5": [
    305,
    306
  ],
  "0x82aF3A6A2554cD41C4ea0e4c1d9A865F1c2af26C": [
    307,
    308,
    309,
    310
  ],
  "0x229DEF00711be46BA0FF91199bd3319D525FF7cD": [
    311,
    312
  ],
  "0xEa2604e0F77040b807935AA4F9682ae3798440a5": [
    313,
    314
  ],
  "0xfAF241943CcaEfEfaf6E36Ca7C4475bA814D1655": [
    315,
    316,
    317
  ],
  "0x8FcB9e54260781FB8aFcd769C6aaC8B62C9caC6D": [
    318,
    319,
    320,
    407
  ],
  "0x301A0C3FB9aA90c60720D007Bf4e5DD2c4da4eCC": [
    321
  ],
  "0xDf9E79b7eC15377a991777dfcf336eC017b27503": [
    322,
    323,
    324,
    325,
    326,
    327,
    328,
    329,
    330,
    331
  ],
  "0xd43Dbf51F9Bc2662EAd340B4E137dC052e7d6A43": [
    332,
    333,
    334,
    335,
    336,
    337,
    338,
    339,
    340,
    341
  ],
  "0x180C482e00833CbB36958414E77364EbB0AfF72E": [
    342,
    343,
    344
  ],
  "0xf76146319B31f770781471114bbD87ABC0dAD0B2": [
    345,
    346
  ],
  "0xAFA1067F21eeC6ee1397cA89EC8e57db5dF1d198": [
    347,
    348,
    349,
    352,
    353,
    354,
    355,
    356,
    357,
    360
  ],
  "0xF2337Df84F13bc4236fc021AfE64F536D7DA4786": [
    350,
    351
  ],
  "0x5ee151F79c933A41387552d389DF941B50702606": [
    358,
    359
  ],
  "0x0dfa9fE3279f2C97C49AcAF2B53a13A793E17e00": [
    361
  ],
  "0x41E0d6fD4F722F39b3168E2CAC4da2E0a2B8fE6B": [
    363,
    364
  ],
  "0x54B57fc02A55420A69b987361b098415c7C4C71a": [
    365,
    366
  ],
  "0xC4167c6E560c90a792CB535C5CCd5a3661401025": [
    368
  ],
  "0x979a6C71E8865a9345De203979507884350d727a": [
    371,
    372,
    373,
    374,
    375,
    376,
    377,
    378,
    379,
    383,
    384,
    385
  ],
  "0x483C97C3A80B7016D7508B31CAF9140913Fa719a": [
    380,
    381,
    382,
    386,
    387,
    388,
    389,
    390,
    391,
    392,
    393,
    394
  ],
  "0xA3D49d11dEAE9e14BE2E5FC394DCc5Ff3323Fe50": [
    395,
    396
  ],
  "0xF26b76a1415B9B81a214eb9Acf1d108609FdA13B": [
    397,
    398,
    399,
    401,
    402,
    403,
    404,
    405,
    406,
    410
  ],
  "0x7ddAC2cF4359D5B14cc2648a1fb6C76d2510C4c2": [
    408,
    409
  ],
  "0x3Bd7f33540BC3224B5d2Ff01bAa02CD71D762a65": [
    411,
    412
  ],
  "0xA8600f3bAe2163D5baB32206E00951B19745665e": [
    415,
    416
  ],
  "0x8F76d8D3C733B02B60521D8181598E4bC1E7dDdB": [
    417,
    418
  ],
  "0x33cd35C808A8c0B379314C5E129c1331Ee4a2113": [
    419,
    420
  ],
  "0xA80BC09199E8a190A359Ecc45c36731056c412e7": [
    421,
    422
  ],
  "0xe8104097b310f2C4C7bad3A91ACC164E4096b6db": [
    423,
    424
  ],
  "0x1424c2A237F32030fd914465410f89Bbc4723B90": [
    427
  ],
  "0x4E45Aee4Ea18686f6037f536D200597b9b7cD5F6": [
    428,
    429,
    430,
    431
  ],
  "0x1287EcD56bFfE0ca1f07566278DC7062cc39B879": [
    434,
    435
  ],
  "0xb2767629602Cf390168d4FFa52d283E894B01222": [
    436,
    437
  ],
  "0x352064Eda42D36a9Eab33A5B0cCe2Fcece61F2Ad": [
    438,
    439, 663, 983, 2490, 665
  ],
  "0x160Cf6551ee3d910f673AF762D5a2f1bd4855be1": [
    444,
    445
  ],
  "0x117c87915A5208d1315DFD85f0F90Df7eEAdde60": [
    446,
    447
  ],
  "0x96FDb0b8C300231f6a85b209656eD0C7be1C92fD": [
    448
  ],
  "0x97C9E2ee29F69Ae88d056839072491392fB0a6a4": [
    449,
    450
  ],
  "0x87eb9f7Ff56ae2DA49EFDe8159Ee66e1b37eD6dE": [
    451,
    452,
    453
  ],
  "0xFc4c5B7c6989FA79A7217f34dAf368cADBf2a246": [
    454,
    455,
    456
  ],
  "0x3280C639fD18b32392B77F35748fA65E311799fA": [
    457,
    458,
    481
  ],
  "0x9a605b5285510f68337E411A59629451C161A74A": [
    459,
    460
  ],
  "0x320DfeaF0776DB3208B09D56a42AcbeeB563a988": [
    461,
    462
  ],
  "0xE613B9F2Dd4DA5C99dC2Aa7bc94F5552C35F7253": [
    463,
    464
  ],
  "0x1c2E4b068f69A46d8Cf7995db90D38428163B979": [
    465
  ],
  "0xcf237E16b82cB772ccF9A414C032eD93b6D24cE0": [
    466,
    467
  ],
  "0x55c39310d97f3851B87A920f803233eF2f2A69EF": [
    468,
    469
  ],
  "0x0F0C12044A760389CF255E764F780C04642EA337": [
    470
  ],
  "0x50864e33e28a68d7F60FF449a7b8F2BF6BA262d3": [
    471,
    472
  ],
  "0x77424437E320fc70Ab04D983e259CA6e6e205C86": [
    473,
    474
  ],
  "0xa82B6A181Fd754974f6917Ba4e00F16d39B24150": [
    475,
    476
  ],
  "0xBDA7CD852E6dCc0491904CBCC6D705C8f6c4EeE9": [
    477
  ],
  "0x8fe24df2a028AFB7C0c837ec0c1711355F67AC60": [
    478
  ],
  "0x4248A61811A096802BC8bfD4f8cD11C6C0e6c30f": [
    479,
    480
  ],
  "0x07dc36Eb6f3d7A92B2E2018116d25f6FCcFe0c04": [
    482
  ],
  "0x58f8331fEC0Ca3d48DEbbc55485603390387F240": [1012],

}

let freePerWallet = {};

let btgoQualified = 0;
for(const owner in data){
  let qualifiedTokenIds = 0;
  for(const tokenId of data[owner]){
      if(tokenId >= 179 && tokenId<= 482){
        qualifiedTokenIds++;
      }
  }
  freePerWallet[owner] = Math.trunc(qualifiedTokenIds/2);
  btgoQualified += Math.trunc(qualifiedTokenIds/2);
}

let bogoQualified = 0;
for(const owner in data){
  let qualifiedTokenIds = 0;
  for(const tokenId of data[owner]){
    if(tokenId >= 0 && tokenId<= 178 || tokenId >= 848){
      qualifiedTokenIds++;
    }
  }
  freePerWallet[owner] += qualifiedTokenIds;
  bogoQualified += qualifiedTokenIds;
}

console.log({ btgoQualified, bogoQualified })
console.log(Object.keys(freePerWallet), Object.values(freePerWallet))
await fs.writeFileSync('freeWalletAddress.json', JSON.stringify(freePerWallet), null, 2);
// fs.writeFileSync('freePerWallet.json', JSON.stringify(Object.values(freePerWallet), null, 2));

