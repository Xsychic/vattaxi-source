import { taxiways as A } from '@/js/graph/taxiways/A';
import { taxiways as AN } from '@/js/graph/taxiways/AN';
import { taxiways as AS } from '@/js/graph/taxiways/AS';
import { taxiways as J } from '@/js/graph/taxiways/J';
import { taxiways as K } from '@/js/graph/taxiways/K';
import { taxiways as KA } from '@/js/graph/taxiways/KA';
import { taxiways as L } from '@/js/graph/taxiways/L';
import { taxiways as N } from '@/js/graph/taxiways/N';
import { taxiways as P } from '@/js/graph/taxiways/P';
import { taxiways as Q } from '@/js/graph/taxiways/Q';
import { taxiways as QX } from '@/js/graph/taxiways/QX';
import { taxiways as Z } from '@/js/graph/taxiways/Z';


const data = {
	"A": [
		{
			"object": A.segOne,
			"bounds": [
				[2594.8, 1289.7],
				[2600.3, 1319.7],
				[2594.2, 1326.6],
				[2563.5, 1333.3],
				[2559.1, 1298.3]
			]
		},
		{
			"object": A.segTwo,
			"bounds": [
				[2600.3, 1319.7],
				[2619.7, 1313.7],
				[2618.3, 1350.1],
				[2591.8, 1347.7],
				[2586.2, 1328.7],
				[2594.2, 1326.6]
			]
		},
		{
			"object": A.segThree,
			"bounds": [
				[2586.2, 1328.7],
				[2591.8, 1347.7],
				[2595, 1352.2],
				[2561.4, 1358.8],
				[2563.5, 1333.3]
			]
		},
		{
			"object": A.segFour,
			"bounds": [
				[2595, 1352.2],
				[2603.1, 1357.4],
				[2606.5, 1408.7],
				[2550.8, 1418.7],
				[2544.3, 1367.3],
				[2561.4, 1358.8]
			]
		}
	],
	"AN": [
		{
			"object": AN.segOne,
			"bounds": [
				[2180.4, 1405.9],
				[2335.9, 1367.6],
				[2346, 1410.8],
				[2185.7, 1448.8]
			]
		},
		{
			"object": AN.segTwo,
			"bounds": [
				[2335.9, 1367.6],
				[2396.8, 1356.9],
				[2402.8, 1395.4],
				[2346, 1410.8]
			]
		},
		{
			"object": AN.segThree,
			"bounds": [
				[2396.8, 1356.9],
				[2560, 1326.2],
				[2563.9, 1361.4],
				[2402.8, 1395.4]
			]
		},
		{
			"object": AN.segFour,
			"bounds": [
				[2560, 1326.2],
				[2595.1, 1320.3],
				[2598.5, 1353],
				[2563.9, 1361.4]
			]
		},
		{
			"object": AN.segFive,
			"bounds": [
				[2595.1, 1320.3],
				[2646.5, 1295.1],
				[2654.7, 1322.5],
				[2621.4, 1348.3],
				[2598.5, 1353]
			]
		},
		{
			"object": AN.segSix,
			"bounds": [
				[2646.5, 1295.1],
				[2709.3, 1281.5],
				[2713.6, 1308.3],
				[2654.7, 1322.5]
			]
		}
	],
	"AS": [
		{
			"object": AS.segOne,
			"bounds": [
				[2390.2, 1410.8],
				[2470.8, 1391.7],
				[2477.7, 1425.4],
				[2405.1, 1435.3]
			]
		},
		{
			"object": AS.segTwo,
			"bounds": [
				[2470.8, 1391.7],
				[2546.7, 1376.8],
				[2567.8, 1380.8],
				[2561.8, 1417.5],
				[2534.3, 1414.2],
				[2477.7, 1425.4]
			]
		}
	],
	"J": [
		{
			"object": J.segEOne,
			"bounds": [
				[1744.7, 1436.1],
				[1890.9, 1406.3],
				[1898.8, 1446.9],
				[1754.4, 1474.3]
			]
		},
		{
			"object": J.segETwo,
			"bounds": [
				[1890.9, 1406.3],
				[1953.7, 1393.8],
				[1962.5, 1435.4],
				[1898.8, 1446.9]
			]
		},
		{
			"object": J.segEThree,
			"bounds": [
				[1953.7, 1393.8],
				[2012.7, 1386.1],
				[2020.7, 1420.6],
				[1962.5, 1435.4]
			]
		},
		{
			"object": J.segEFour,
			"bounds": [
				[2012.7, 1386.1],
				[2032, 1369.4],
				[2122.3, 1351.2],
				[2132.8, 1399.6],
				[2020.7, 1420.6]
			]
		},
		{
			"object": J.segEFive,
			"bounds": [
				[2122.3, 1351.2],
				[2168.2, 1341.3],
				[2175.2, 1393.4],
				[2132.8, 1399.6]
			]
		},
		{
			"object": J.segESix,
			"bounds": [
				[2168.2, 1341.3],
				[2312.2, 1310.1],
				[2319, 1308.1],
				[2329, 1352.8],
				[2307.8, 1359.6],
				[2175.2, 1393.4]
			]
		},
		{
			"object": J.segESeven,
			"bounds": [
				[2319, 1308.1],
				[2328.5, 1299.3],
				[2352.7, 1317.3],
				[2348.2, 1340.6],
				[2329, 1352.8]
			]
		},
		{
			"object": J.segEEight,
			"bounds": [
				[2328.5, 1299.3],
				[2335.2, 1281.3],
				[2359.2, 1276.6],
				[2367.9, 1311.1],
				[2352.7, 1317.3]
			]
		},
		{
			"object": J.segENine,
			"bounds": [
				[2359.2, 1276.6],
				[2402.4, 1264.9],
				[2406.9, 1299.7],
				[2367.9, 1311.1]
			]
		},
		{
			"object": J.segETen,
			"bounds": [
				[2402.4, 1264.9],
				[2413.8, 1257.4],
				[2436.4, 1254],
				[2443.9, 1289.9],
				[2406.9, 1299.7]
			]
		},
		{
			"object": J.segEEleven,
			"bounds": [
				[2436.4, 1254],
				[2592.9, 1219.3],
				[2597.3, 1252.3],
				[2443.9, 1289.9]
			]
		},
		{
			"object": J.segETwelve,
			"bounds": [
				[2592.9, 1219.3],
				[2613.8, 1217.1],
				[2604.2, 1254.1],
				[2597.3, 1252.3]
			]
		},
		{
			"object": J.segEThirteen,
			"bounds": [
				[2613.8, 1217.1],
				[2689.2, 1199.4],
				[2695.5, 1238.3],
				[2610.6, 1255.1],
				[2604.2, 1254.1]
			]
		},
		{
			"object": J.segEFourteen,
			"bounds": [
				[2689.2, 1199.4],
				[2716.2, 1194.1],
				[2725.1, 1232.6],
				[2695.5, 1238.3]
			]
		},
		{
			"object": J.segWOne,
			"bounds": [
				[628.6, 1892],
				[639.7, 1856.5],
				[628.2, 1809],
				[574.5, 1820.5],
				[597.8, 1862.7]
			]
		},
		{
			"object": J.segWTwo,
			"bounds": [
				[574.5, 1820.5],
				[557, 1780.1],
				[621.4, 1770],
				[628.2, 1809]
			]
		},
		{
			"object": J.segWThree,
			"bounds": [
				[557, 1780.1],
				[549.2, 1757.7],
				[590, 1750.7],
				[594, 1773.6]
			]
		},
		{
			"object": J.segWFour,
			"bounds": [
				[621.4, 1770],
				[594, 1773.6],
				[590, 1750.7],
				[638.1, 1741.2],
				[645.9, 1778.7],
				[628.7, 1781.8]
			]
		},
		{
			"object": J.segWFive,
			"bounds": [
				[549.2, 1757.7],
				[536.4, 1702.9],
				[586.1, 1729.5],
				[590, 1750.7]
			]
		},
		{
			"object": J.segWSix,
			"bounds": [
				[536.4, 1702.9],
				[665.4, 1669.2],
				[669.1, 1703.3],
				[651.7, 1714.7],
				[586.1, 1729.5]
			]
		},
		{
			"object": J.segWSeven,
			"bounds": [
				[665.4, 1669.2],
				[700.8, 1656.7],
				[709.7, 1698.9],
				[680.6, 1703.3],
				[669.1, 1703.3]
			]
		},
		{
			"object": J.segWEight,
			"bounds": [
				[700.8, 1656.7],
				[709.7, 1698.9],
				[874.3, 1663.6],
				[866.6, 1615.7]
			]
		},
		{
			"object": J.segWNine,
			"bounds": [
				[929.3, 1600.1],
				[866.6, 1615.7],
				[874.3, 1663.6],
				[939.1, 1650.5]
			]
		},
		{
			"object": J.segWTen,
			"bounds": [
				[1376.8, 1512],
				[929.3, 1600.1],
				[939.1, 1650.5],
				[1381.3, 1553]
			]
		},
		{
			"object": J.segWEleven,
			"bounds": [
				[1498.7, 1491],
				[1376.8, 1512],
				[1381.3, 1553],
				[1505.8, 1531.2]
			]
		},
		{
			"object": J.segWTwelve,
			"bounds": [
				[1744.7, 1436.1],
				[1754.4, 1474.3],
				[1505.8, 1531.2],
				[1498.7, 1491]
			]
		}
	],
	"K": [
		{
			"object": K.segOne,
			"bounds": [
				[1983.4, 1222.9],
				[1940.8, 1226.4],
				[1937.6, 1245.4],
				[1948.9, 1264.8],
				[1991.9, 1252.1]
			]
		},
		{
			"object": K.segTwo,
			"bounds": [
				[1983.4, 1222.9],
				[2002, 1206.4],
				[2282.3, 1145.1],
				[2298.8, 1181.3],
				[2293.2, 1184],
				[2280.6, 1201.6],
				[2009.3, 1258],
				[1991.9, 1252.1]
			]
		},
		{
			"object": K.segThree,
			"bounds": [
				[2282.3, 1145.1],
				[2314.6, 1130],
				[2322.6, 1107],
				[2330.9, 1105],
				[2336.5, 1154.5],
				[2318.7, 1157.7],
				[2298.8, 1181.3]
			]
		},
		{
			"object": K.segFour,
			"bounds": [
				[2330.9, 1105],
				[2366.4, 1097.2],
				[2376, 1149.7],
				[2336.5, 1154.5]
			]
		},
		{
			"object": K.segFive,
			"bounds": [
				[2366.4, 1097.2],
				[2457, 1077.6],
				[2467.7, 1089.1],
				[2476.5, 1131.3],
				[2387.3, 1154.7],
				[2376, 1149.7]
			]
		},
		{
			"object": K.segSix,
			"bounds": [
				[2467.7, 1089.1],
				[2506.4, 1081.4],
				[2515.6, 1121.9],
				[2476.5, 1131.3]
			]
		},
		{
			"object": K.segSeven,
			"bounds": [
				[2506.4, 1081.4],
				[2515.2, 1065.7],
				[2691.3, 1028.1],
				[2706.3, 1036.3],
				[2712.1, 1079],
				[2515.6, 1121.9]
			]
		}
	],
	"KA": [
		{
			"object": KA.segOne,
			"bounds": [
				[2443.5, 982.9],
				[2490.7, 978.4],
				[2515.2, 1065.7],
				[2506.4, 1081.4],
				[2467.7, 1089.1],
				[2457, 1077.6],
				[2447.1, 997.6]
			]
		}
	],
	"L": [
		{
			"object": L.segOne,
			"bounds": [
				[1650, 1138],
				[1674, 1123],
				[1692, 1118],
				[1697, 1150],
				[1680, 1158],
				[1660, 1156]
			]
		},
		{
			"object": L.segTwo,
			"bounds": [
				[1692, 1118],
				[1873.3, 1080.1],
				[1883.6, 1132],
				[1721.9, 1165.9],
				[1697, 1150]
			]
		},
		{
			"object": L.segThree,
			"bounds": [
				[1873.3, 1080.1],
				[1912.3, 1070.4],
				[1922.5, 1110.7],
				[1880, 1116.7]
			]
		},
		{
			"object": L.segFour,
			"bounds": [
				[1912.3, 1070.4],
				[1944.8, 1064.2],
				[1965.4, 1065.8],
				[1966.5, 1066.2],
				[1972.3, 1105.2],
				[1922.5, 1110.7]
			]
		},
		{
			"object": L.segFive,
			"bounds": [
				[1966.5, 1066.2],
				[2005.3, 1059.5],
				[2014, 1101.8],
				[1972.3, 1105.2]
			]
		},
		{
			"object": L.segSix,
			"bounds": [
				[2005.3, 1059.5],
				[2050.9, 1047.3],
				[2069.2, 1027.7],
				[2079.6, 1092.4],
				[2014.8, 1106.5],
				[2014, 1101.8]
			]
		},
		{
			"object": L.segSeven,
			"bounds": [
				[2069.5, 1033.8],
				[2246.6, 996],
				[2258, 1054.5],
				[2079.6, 1092.4]
			]
		},
		{
			"object": L.segEight,
			"bounds": [
				[2246.6, 996],
				[2287.1, 987],
				[2294.7, 1028.6],
				[2254.1, 1036.6]
			]
		},
		{
			"object": L.segNine,
			"bounds": [
				[2287.1, 987],
				[2438.2, 954.9],
				[2447.1, 997.6],
				[2294.7, 1028.6]
			]
		},
		{
			"object": L.segTen,
			"bounds": [
				[2438.2, 954.9],
				[2440.6, 942.1],
				[2492.7, 954.9],
				[2490.7, 978.4],
				[2443.5, 982.9]
			]
		},
		{
			"object": L.segEleven,
			"bounds": [
				[2440.6, 942.1],
				[2451.7, 908.5],
				[2470.6, 883.2],
				[2508.1, 923.2],
				[2492.7, 954.9]
			]
		},
		{
			"object": L.segTwelve,
			"bounds": [
				[2470.6, 883.2],
				[2513.4, 853.1],
				[2535.5, 901.8],
				[2508.1, 923.2]
			]
		},
		{
			"object": L.segThirteen,
			"bounds": [
				[2513.4, 853.1],
				[2547.7, 843.9],
				[2577.8, 855.4],
				[2577.2, 897.4],
				[2559, 896.3],
				[2535.5, 901.8]
			]
		},
		{
			"object": L.segFourteen,
			"bounds": [
				[2577.8, 855.4],
				[2637.9, 875.9],
				[2617.9, 911],
				[2605.4, 903],
				[2577.2, 897.4]
			]
		},
		{
			"object": L.segFifteen,
			"bounds": [
				[2637.9, 875.9],
				[2662.8, 903.3],
				[2627.7, 924],
				[2617.9, 911]
			]
		},
		{
			"object": L.segSixteen,
			"bounds": [
				[2662.8, 903.3],
				[2691.5, 973.4],
				[2657.1, 989.2],
				[2627.7, 924]
			]
		}
	],
	"N": [
		{
			"object": N.segOne,
			"bounds": [
				[2366.4, 1097.2],
				[2387.3, 1154.7],
				[2398.8, 1212.3],
				[2365.2, 1219.6],
				[2344.4, 1201.9],
				[2336.5, 1154.4]
			]
		},
		{
			"object": N.segTwo,
			"bounds": [
				[2398.8, 1212.3],
				[2404.9, 1242.5],
				[2360.3, 1252],
				[2355.9, 1241],
				[2365.2, 1219.6]
			]
		},
		{
			"object": N.segThree,
			"bounds": [
				[2404.9, 1242.5],
				[2413.8, 1257.4],
				[2405.4, 1263.5],
				[2407.5, 1290.4],
				[2369.9, 1303.6],
				[2360.8, 1272.8],
				[2360.3, 1252]
			]
		},
		{
			"object": N.segFour,
			"bounds": [
				[2407.5, 1290.4],
				[2415, 1338],
				[2378.6, 1342],
				[2369.9, 1303.6]
			]
		},
		{
			"object": N.segFive,
			"bounds": [
				[2415, 1338],
				[2424.5, 1357.5],
				[2383.2, 1367.6],
				[2378.6, 1342]
			]
		},
		{
			"object": N.segSix,
			"bounds": [
				[2424.5, 1357.5],
				[2452.5, 1397.8],
				[2401.8, 1409.8],
				[2383.2, 1367.6]
			]
		},
		{
			"object": N.segSeven,
			"bounds": [
				[2452.5, 1397.8],
				[2470.5, 1413],
				[2441, 1418],
				[2430.3, 1403.3]
			]
		},
		{
			"object": N.segEight,
			"bounds": [
				[2430.3, 1403.3],
				[2449, 1429.8],
				[2417.3, 1436.3],
				[2401.8, 1409.8]
			]
		}
	],
	"P": [
		{
			"object": P.segOne,
			"bounds": [
				[2294.7, 1028.6],
				[2314.8, 1132.6],
				[2273.5, 1138.9],
				[2254.1, 1036.6]
			]
		},
		{
			"object": P.segTwo,
			"bounds": [
				[2314.8, 1132.6],
				[2322.8, 1170.5],
				[2283.3, 1179.4],
				[2273.5, 1138.9]
			]
		},
		{
			"object": P.segThree,
			"bounds": [
				[2322.8, 1170.5],
				[2330.4, 1207.5],
				[2327.3, 1227.1],
				[2298.9, 1235.5],
				[2283.3, 1179.4]
			]
		},
		{
			"object": P.segFour,
			"bounds": [
				[2327.3, 1227.1],
				[2337.6, 1241.9],
				[2343.1, 1254],
				[2303.4, 1261.1],
				[2298.9, 1235.5]
			]
		},
		{
			"object": P.segFive,
			"bounds": [
				[2343.1, 1254],
				[2348.5, 1281.4],
				[2342.6, 1299.2],
				[2309.8, 1306],
				[2303.4, 1261.1]
			]
		},
		{
			"object": P.segSix,
			"bounds": [
				[2342.6, 1299.2],
				[2354.2, 1311.2],
				[2361, 1363.2],
				[2330.3, 1375.1],
				[2309.8, 1306]
			]
		},
		{
			"object": P.segSeven,
			"bounds": [
				[2361, 1363.2],
				[2399.2, 1404.5],
				[2363.8, 1422.7],
				[2330.3, 1375.1]
			]
		},
		{
			"object": P.segEight,
			"bounds": [
				[2399.2, 1404.5],
				[2417.9, 1436.5],
				[2375.8, 1445.7],
				[2363.8, 1422.7]
			]
		}
	],
	"Q": [
		{
			"object": Q.segOne,
			"bounds": [
				[1925, 833],
				[1938, 817],
				[1961, 853],
				[1992, 999],
				[1992, 1004],
				[1965, 1010],
				[1934, 850]
			]
		},
		{
			"object": Q.segTwo,
			"bounds": [
				[1965, 1010],
				[1992, 1004],
				[1999, 1042],
				[1971, 1044]
			]
		},
		{
			"object": Q.segThree,
			"bounds": [
				[1971, 1044],
				[1999, 1042],
				[2012, 1092],
				[1974, 1106],
				[1940, 1108],
				[1946, 1078],
				[1969.9, 1068.8]
			]
		},
		{
			"object": Q.segFour,
			"bounds": [
				[1939, 1109],
				[1951, 1115],
				[1957, 1127],
				[1950, 1153],
				[1966, 1223],
				[1994, 1214],
				[1974, 1105]
			]
		},
		{
			"object": Q.segFive,
			"bounds": [
				[1966, 1223],
				[1994, 1214],
				[2006, 1252],
				[1974, 1260]
			]
		},
		{
			"object": Q.segSix,
			"bounds": [
				[2006, 1252],
				[1974, 1260],
				[1995, 1373],
				[2027, 1365]
			]
		},
		{
			"object": Q.segSeven,
			"bounds": [
				[1995, 1373],
				[2027, 1365],
				[2030, 1381.5],
				[1997, 1389.5]
			]
		},
		{
			"object": Q.segEight,
			"bounds": [
				[2030, 1382],
				[2040.2, 1424.4],
				[2007.2, 1430],
				[1997, 1389.5]
			]
		},
		{
			"object": Q.segNine,
			"bounds": [
				[2040.2, 1424.4],
				[2041.4, 1429.8],
				[2009.2, 1435.4],
				[2007.2, 1430]
			]
		}
	],
	"QX": [
		{
			"object": QX.segOne,
			"bounds": [
				[1925, 638],
				[1984, 628],
				[2021, 801],
				[1966, 813],
				[1962, 806]
			]
		},
		{
			"object": QX.segTwo,
			"bounds": [
				[2021, 801],
				[2028, 837],
				[1992, 846],
				[1983, 809]
			]
		},
		{
			"object": QX.segThree,
			"bounds": [
				[2028, 837],
				[2061, 991],
				[2012, 999],
				[1979, 849]
			]
		},
		{
			"object": QX.segFour,
			"bounds": [
				[2061, 991],
				[2069, 1023],
				[2027, 1033],
				[2023, 997]
			]
		},
		{
			"object": QX.segFive,
			"bounds": [
				[2069, 1023],
				[2069, 1028],
				[2051, 1048],
				[2026, 1054],
				[2027, 1033]
			]
		},
		{
			"object": QX.QB,
			"bounds": [
				[2023, 997],
				[2027, 1033],
				[2026, 1037],
				[1999, 1042],
				[1992, 999],
				[2012, 999]
			]
		},
		{
			"object": QX.QC,
			"bounds": [
				[1983, 809],
				[1992, 846],
				[1961, 853],
				[1938, 817],
				[1962, 806],
				[1966, 813]
			]
		}
	],
	"Z": [
		{
			"object": Z.segOne,
			"bounds": [
				[2315.3, 1314.2],
				[2387.4, 1306.8],
				[2395.3, 1349.3],
				[2325.5, 1356.4]
			]
		},
		{
			"object": Z.segTwo,
			"bounds": [
				[2387.4, 1306.8],
				[2547.4, 1272.5],
				[2556.6, 1316.9],
				[2395.3, 1349.3]
			]
		},
		{
			"object": Z.segThree,
			"bounds": [
				[2547.4, 1272.5],
				[2612.4, 1258.7],
				[2623.4, 1302.1],
				[2556.6, 1316.9]
			]
		},
		{
			"object": Z.segFour,
			"bounds": [
				[2612.4, 1258.7],
				[2707.7, 1244.8],
				[2712.8, 1275.5],
				[2623.4, 1302.1]
			]
		}
	]
};

export default data;