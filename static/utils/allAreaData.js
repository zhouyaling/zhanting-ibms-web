const allAreaData = [
    {
        "addressCoordinate": [106.01404863200136, 30.33057841596901],
        "areas": [
            {
                "citys": [
                    "重庆"
                ],
                "districts": [
                    "北碚区",
                    "江北区",
                    "璧山",
                    "渝北区",
                    "南岸区",
                    "沙坪坝",
                    "合川"
                ],
                "province": "重庆"
            }
        ],
        "elevators": 1,
        "id": 235,
        "code": "chongqingArea",
        "name": "重庆区域公司",
        "type": 0
    },
]

// const allAreaData = [
//     {
//         "addressCoordinate": [106.01404863200136, 30.33057841596901],
//         "areas": [
//             {
//                 "citys": [
//                     "重庆"
//                 ],
//                 "districts": [
//                     "北碚区",
//                     "江北区",
//                     "璧山",
//                     "渝北区",
//                     "南岸区",
//                     "沙坪坝",
//                     "合川"
//                 ],
//                 "province": "重庆"
//             }
//         ],
//         "elevators": 1,
//         "id": 235,
//         "code": "chongqingArea",
//         "name": "重庆区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [110.100104182059, 24.055021400214464],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "广西"
//             },
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "广东"
//             }
//         ],
//         "elevators": 0,
//         "id": 243,
//         "code": "nanbuArea",
//         "name": "南部区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [116.23876568226045, 40.23037952012497],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "河北"
//             },
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "天津"
//             },
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "辽宁"
//             },
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "北京"
//             }
//         ],
//         "elevators": 0,
//         "id": 242,
//         'code': "beibuArea",
//         "name": "北部区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [113.98478241189927, 34.726909733243396],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "河南"
//             }
//         ],
//         "elevators": 0,
//         "id": 244,
//         "code": "zhongyuanArea",
//         "name": "中原区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [102.71571943930944, 25.051930618682363],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "云南"
//             }
//         ],
//         "elevators": 0,
//         "id": 489,
//         "code": "yunguangArea",
//         "name": "云广区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [115.86285122115535, 28.704650096965487],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "福建"
//             },
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "江西"
//             }
//         ],
//         "elevators": 0,
//         "id": 581,
//         "code": 'dongnanArea',
//         "name": "东南区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [113.11046928018244, 28.22823859663024],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "湖南"
//             }
//         ],
//         "elevators": 0,
//         "id": 240,
//         "code": 'hunanArea',
//         "name": "湖南区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [104.11388256980544, 30.67439244885505],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "四川"
//             }
//         ],
//         "elevators": 0,
//         "id": 238,
//         "code": 'xibuArea',
//         "name": "西部区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [106.66011111025364, 26.498568946291197],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "贵州"
//             }
//         ],
//         "elevators": 0,
//         "id": 239,
//         "code": 'guizhouArea',
//         "name": "贵州区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [87.51340964381873, 44.05293610796223],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "新疆"
//             }
//         ],
//         "elevators": 0,
//         "id": 264,
//         "code": 'xinjiangArea',
//         "name": "新疆区域公司",
//         "type": 0
//     },

//     {
//         "addressCoordinate": [109.0758212614585, 29.979626002395452],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "湖北"
//             },
//             {
//                 "citys": [
//                     "重庆"
//                 ],
//                 "districts": [
//                     "涪陵",
//                     "丰都",
//                     "云阳",
//                     "南川",
//                     "彭水",
//                     "巫山",
//                     "石柱",
//                     "奉节",
//                     "长寿",
//                     "开县",
//                     "巫溪",
//                     "忠县",
//                     "黔江",
//                     "酉阳",
//                     "万盛",
//                     "万州",
//                     "秀山",
//                     "城口",
//                     "垫江",
//                     "梁平"
//                 ],
//                 "province": "重庆"
//             }
//         ],
//         "elevators": 0,
//         "id": 236,
//         "code": "zhongbuArea",
//         "name": "中部区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [120.32216146352849, 31.552874116246297],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "安徽"
//             },
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "江苏"
//             },
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "上海"
//             },
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "浙江"
//             }
//         ],
//         "elevators": 0,
//         "id": 241,
//         "code": "dongbuArea",
//         "name": "东部区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [116.95204082837904, 36.660721052698854],
//         "areas": [
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "山东"
//             }
//         ],
//         "elevators": 0,
//         "id": 491,
//         "code": "shandongArea",
//         "name": "山东区域公司",
//         "type": 0
//     },
//     {
//         "addressCoordinate": [108.75109281577589, 34.156427062720546],
//         "areas": [
//             {
//                 "citys": [
//                     "重庆"
//                 ],
//                 "districts": [
//                     "江北区",
//                     "九龙坡区",
//                     "綦江区",
//                     "大足",
//                     "铜梁",
//                     "永川",
//                     "荣昌",
//                     "江津",
//                     "渝中区",
//                     "大渡口区"
//                 ],
//                 "province": "重庆"
//             },
//             {
//                 "citys": [

//                 ],
//                 "districts": [

//                 ],
//                 "province": "陕西"
//             }
//         ],
//         "elevators": 0,
//         "id": 237,
//         "code": "yuxiArea",
//         "name": "渝西区域公司",
//         "type": 0
//     }

// ]

export {
    allAreaData
}