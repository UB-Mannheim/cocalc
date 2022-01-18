/*
Sales tax for WA state.

Of course, this shouldn't exist much longer, since it's the sort of thing
that stripe automates.
*/

// WA state sales tax rates, as of July 11 2017.
// Generated via scripts/sales_tax.py

export default function salesTax(zip: string) {
  return WA_sales_tax[zip] ?? 0;
}

const WA_sales_tax = {
  98001: 0.099,
  98002: 0.086,
  98003: 0.1,
  98004: 0.1,
  98005: 0.1,
  98006: 0.086,
  98007: 0.1,
  98008: 0.1,
  98009: 0.1,
  98010: 0.086,
  98011: 0.1,
  98012: 0.077,
  98013: 0.086,
  98014: 0.086,
  98015: 0.1,
  98019: 0.077,
  98020: 0.1,
  98021: 0.077,
  98022: 0.079,
  98023: 0.1,
  98024: 0.086,
  98025: 0.086,
  98026: 0.1,
  98027: 0.086,
  98028: 0.1,
  98029: 0.086,
  98030: 0.1,
  98031: 0.1,
  98032: 0.1,
  98033: 0.1,
  98034: 0.1,
  98035: 0.1,
  98036: 0.103,
  98037: 0.103,
  98038: 0.086,
  98039: 0.1,
  98040: 0.1,
  98041: 0.1,
  98042: 0.086,
  98043: 0.1,
  98045: 0.086,
  98046: 0.104,
  98047: 0.093,
  98050: 0.086,
  98051: 0.086,
  98052: 0.086,
  98053: 0.086,
  98054: 0.086,
  98055: 0.1,
  98056: 0.1,
  98057: 0.1,
  98058: 0.086,
  98059: 0.086,
  98061: 0.09,
  98062: 0.1,
  98063: 0.1,
  98064: 0.1,
  98065: 0.086,
  98068: 0.08,
  98070: 0.086,
  98071: 0.1,
  98072: 0.077,
  98073: 0.1,
  98074: 0.086,
  98075: 0.086,
  98077: 0.077,
  98082: 0.104,
  98083: 0.1,
  98087: 0.103,
  98089: 0.1,
  98092: 0.086,
  98093: 0.1,
  98101: 0.101,
  98102: 0.101,
  98103: 0.101,
  98104: 0.101,
  98105: 0.101,
  98106: 0.1,
  98107: 0.101,
  98108: 0.1,
  98109: 0.101,
  98110: 0.09,
  98111: 0.101,
  98112: 0.101,
  98113: 0.101,
  98114: 0.101,
  98115: 0.101,
  98116: 0.101,
  98117: 0.101,
  98118: 0.101,
  98119: 0.101,
  98121: 0.101,
  98122: 0.101,
  98124: 0.101,
  98125: 0.1,
  98126: 0.1,
  98127: 0.101,
  98129: 0.101,
  98131: 0.1,
  98132: 0.1,
  98133: 0.1,
  98134: 0.101,
  98136: 0.101,
  98138: 0.1,
  98139: 0.101,
  98141: 0.101,
  98144: 0.1,
  98145: 0.101,
  98146: 0.1,
  98148: 0.1,
  98151: 0.1,
  98154: 0.101,
  98155: 0.1,
  98158: 0.1,
  98160: 0.1,
  98161: 0.101,
  98164: 0.101,
  98165: 0.101,
  98166: 0.1,
  98168: 0.1,
  98170: 0.1,
  98171: 0.1,
  98174: 0.101,
  98175: 0.101,
  98177: 0.1,
  98178: 0.1,
  98181: 0.101,
  98184: 0.101,
  98185: 0.101,
  98188: 0.1,
  98189: 0.1,
  98190: 0.1,
  98191: 0.101,
  98194: 0.101,
  98195: 0.101,
  98198: 0.1,
  98199: 0.101,
  98201: 0.089,
  98203: 0.077,
  98204: 0.097,
  98205: 0.097,
  98206: 0.097,
  98207: 0.097,
  98208: 0.077,
  98213: 0.097,
  98220: 0.085,
  98221: 0.081,
  98222: 0.081,
  98223: 0.077,
  98224: 0.086,
  98225: 0.079,
  98226: 0.079,
  98227: 0.087,
  98228: 0.087,
  98229: 0.079,
  98230: 0.079,
  98231: 0.085,
  98232: 0.085,
  98233: 0.081,
  98235: 0.085,
  98236: 0.087,
  98237: 0.079,
  98238: 0.081,
  98239: 0.087,
  98240: 0.085,
  98241: 0.081,
  98243: 0.081,
  98244: 0.079,
  98245: 0.081,
  98247: 0.085,
  98248: 0.079,
  98249: 0.087,
  98250: 0.081,
  98251: 0.086,
  98252: 0.077,
  98253: 0.087,
  98255: 0.085,
  98256: 0.089,
  98257: 0.081,
  98258: 0.077,
  98259: 0.091,
  98260: 0.087,
  98261: 0.081,
  98262: 0.079,
  98263: 0.085,
  98264: 0.085,
  98266: 0.085,
  98267: 0.085,
  98270: 0.077,
  98271: 0.077,
  98272: 0.077,
  98273: 0.081,
  98274: 0.081,
  98275: 0.097,
  98276: 0.085,
  98277: 0.087,
  98278: 0.087,
  98279: 0.081,
  98280: 0.081,
  98281: 0.079,
  98282: 0.077,
  98283: 0.079,
  98284: 0.077,
  98286: 0.081,
  98287: 0.089,
  98288: 0.086,
  98290: 0.077,
  98291: 0.091,
  98292: 0.077,
  98293: 0.089,
  98294: 0.077,
  98295: 0.085,
  98296: 0.077,
  98297: 0.081,
  98303: 0.079,
  98304: 0.078,
  98305: 0.084,
  98310: 0.085,
  98311: 0.09,
  98312: 0.085,
  98314: 0.09,
  98315: 0.09,
  98320: 0.085,
  98321: 0.079,
  98322: 0.09,
  98323: 0.079,
  98324: 0.084,
  98325: 0.09,
  98326: 0.084,
  98327: 0.079,
  98328: 0.079,
  98329: 0.079,
  98330: 0.078,
  98331: 0.084,
  98332: 0.079,
  98333: 0.079,
  98335: 0.079,
  98336: 0.078,
  98337: 0.09,
  98338: 0.079,
  98339: 0.09,
  98340: 0.09,
  98342: 0.09,
  98343: 0.084,
  98344: 0.079,
  98345: 0.09,
  98346: 0.09,
  98348: 0.079,
  98349: 0.079,
  98350: 0.084,
  98351: 0.079,
  98352: 0.093,
  98353: 0.09,
  98354: 0.099,
  98355: 0.078,
  98356: 0.078,
  98357: 0.084,
  98358: 0.09,
  98359: 0.079,
  98360: 0.079,
  98361: 0.078,
  98362: 0.084,
  98363: 0.084,
  98364: 0.09,
  98365: 0.09,
  98366: 0.09,
  98367: 0.09,
  98368: 0.09,
  98370: 0.09,
  98371: 0.099,
  98372: 0.093,
  98373: 0.093,
  98374: 0.093,
  98375: 0.093,
  98376: 0.09,
  98377: 0.078,
  98378: 0.09,
  98380: 0.085,
  98381: 0.084,
  98382: 0.084,
  98383: 0.09,
  98384: 0.09,
  98385: 0.079,
  98386: 0.09,
  98387: 0.079,
  98388: 0.079,
  98390: 0.093,
  98391: 0.079,
  98392: 0.09,
  98393: 0.09,
  98394: 0.079,
  98395: 0.079,
  98396: 0.079,
  98397: 0.079,
  98398: 0.079,
  98401: 0.101,
  98402: 0.099,
  98403: 0.101,
  98404: 0.099,
  98405: 0.093,
  98406: 0.093,
  98407: 0.099,
  98408: 0.099,
  98409: 0.099,
  98411: 0.101,
  98412: 0.101,
  98413: 0.101,
  98415: 0.101,
  98416: 0.101,
  98417: 0.101,
  98418: 0.101,
  98419: 0.101,
  98421: 0.099,
  98422: 0.099,
  98424: 0.099,
  98430: 0.093,
  98431: 0.093,
  98433: 0.093,
  98438: 0.093,
  98439: 0.093,
  98442: 0.093,
  98443: 0.099,
  98444: 0.093,
  98445: 0.093,
  98446: 0.079,
  98447: 0.099,
  98448: 0.099,
  98450: 0.099,
  98455: 0.099,
  98460: 0.099,
  98464: 0.099,
  98465: 0.099,
  98466: 0.099,
  98467: 0.099,
  98471: 0.101,
  98477: 0.101,
  98481: 0.101,
  98490: 0.101,
  98492: 0.101,
  98493: 0.099,
  98496: 0.099,
  98497: 0.099,
  98498: 0.093,
  98499: 0.093,
  98501: 0.079,
  98502: 0.079,
  98503: 0.087,
  98504: 0.088,
  98505: 0.087,
  98506: 0.079,
  98507: 0.088,
  98508: 0.088,
  98509: 0.089,
  98511: 0.089,
  98512: 0.079,
  98513: 0.079,
  98516: 0.079,
  98520: 0.088,
  98522: 0.078,
  98524: 0.085,
  98526: 0.088,
  98527: 0.08,
  98528: 0.079,
  98530: 0.079,
  98531: 0.078,
  98532: 0.078,
  98533: 0.078,
  98535: 0.088,
  98536: 0.088,
  98537: 0.08,
  98538: 0.078,
  98539: 0.078,
  98540: 0.079,
  98541: 0.085,
  98542: 0.078,
  98544: 0.078,
  98546: 0.085,
  98547: 0.08,
  98548: 0.085,
  98550: 0.088,
  98552: 0.088,
  98554: 0.08,
  98555: 0.085,
  98556: 0.079,
  98557: 0.085,
  98558: 0.079,
  98559: 0.088,
  98560: 0.085,
  98561: 0.08,
  98562: 0.088,
  98563: 0.085,
  98564: 0.078,
  98565: 0.078,
  98566: 0.088,
  98568: 0.078,
  98569: 0.088,
  98570: 0.078,
  98571: 0.088,
  98572: 0.078,
  98575: 0.088,
  98576: 0.079,
  98577: 0.08,
  98579: 0.078,
  98580: 0.079,
  98581: 0.078,
  98582: 0.078,
  98583: 0.088,
  98584: 0.085,
  98585: 0.078,
  98586: 0.08,
  98587: 0.088,
  98588: 0.085,
  98589: 0.079,
  98590: 0.08,
  98591: 0.078,
  98592: 0.085,
  98593: 0.078,
  98595: 0.088,
  98596: 0.078,
  98597: 0.079,
  98599: 0.088,
  98601: 0.077,
  98602: 0.07,
  98603: 0.078,
  98604: 0.077,
  98605: 0.07,
  98606: 0.077,
  98607: 0.077,
  98609: 0.078,
  98610: 0.077,
  98611: 0.078,
  98612: 0.076,
  98613: 0.07,
  98614: 0.08,
  98616: 0.078,
  98617: 0.07,
  98619: 0.07,
  98620: 0.07,
  98621: 0.076,
  98622: 0.077,
  98623: 0.07,
  98624: 0.08,
  98625: 0.078,
  98626: 0.078,
  98628: 0.07,
  98629: 0.077,
  98631: 0.08,
  98632: 0.076,
  98635: 0.07,
  98637: 0.08,
  98638: 0.076,
  98639: 0.077,
  98640: 0.08,
  98641: 0.08,
  98642: 0.077,
  98643: 0.076,
  98644: 0.08,
  98645: 0.078,
  98647: 0.076,
  98648: 0.077,
  98649: 0.078,
  98650: 0.07,
  98651: 0.077,
  98660: 0.077,
  98661: 0.084,
  98662: 0.077,
  98663: 0.084,
  98664: 0.084,
  98665: 0.084,
  98666: 0.084,
  98667: 0.084,
  98668: 0.084,
  98670: 0.07,
  98671: 0.077,
  98672: 0.07,
  98673: 0.07,
  98674: 0.077,
  98675: 0.077,
  98682: 0.077,
  98683: 0.084,
  98684: 0.084,
  98685: 0.077,
  98686: 0.077,
  98687: 0.084,
  98801: 0.082,
  98802: 0.082,
  98807: 0.084,
  98811: 0.082,
  98812: 0.078,
  98813: 0.077,
  98814: 0.081,
  98815: 0.082,
  98816: 0.081,
  98817: 0.082,
  98819: 0.081,
  98821: 0.082,
  98822: 0.082,
  98823: 0.078,
  98824: 0.079,
  98826: 0.082,
  98827: 0.081,
  98828: 0.082,
  98829: 0.081,
  98830: 0.077,
  98831: 0.082,
  98832: 0.079,
  98833: 0.081,
  98834: 0.081,
  98836: 0.082,
  98837: 0.079,
  98840: 0.077,
  98841: 0.077,
  98843: 0.078,
  98844: 0.081,
  98845: 0.078,
  98846: 0.081,
  98847: 0.082,
  98848: 0.078,
  98849: 0.081,
  98850: 0.078,
  98851: 0.079,
  98852: 0.082,
  98853: 0.079,
  98855: 0.081,
  98856: 0.081,
  98857: 0.077,
  98858: 0.078,
  98859: 0.081,
  98860: 0.079,
  98862: 0.081,
  98901: 0.079,
  98902: 0.081,
  98903: 0.079,
  98904: 0.079,
  98907: 0.082,
  98908: 0.079,
  98909: 0.081,
  98920: 0.079,
  98921: 0.079,
  98922: 0.08,
  98923: 0.079,
  98925: 0.08,
  98926: 0.08,
  98929: 0.08,
  98930: 0.079,
  98932: 0.079,
  98933: 0.079,
  98934: 0.08,
  98935: 0.07,
  98936: 0.079,
  98937: 0.078,
  98938: 0.079,
  98939: 0.079,
  98940: 0.08,
  98941: 0.08,
  98942: 0.079,
  98943: 0.08,
  98944: 0.079,
  98946: 0.08,
  98947: 0.079,
  98948: 0.079,
  98950: 0.08,
  98951: 0.079,
  98952: 0.079,
  98953: 0.079,
  99001: 0.088,
  99003: 0.081,
  99004: 0.081,
  99005: 0.081,
  99006: 0.076,
  99008: 0.08,
  99009: 0.076,
  99011: 0.088,
  99012: 0.081,
  99013: 0.076,
  99014: 0.088,
  99016: 0.081,
  99017: 0.078,
  99018: 0.081,
  99019: 0.081,
  99020: 0.081,
  99021: 0.081,
  99022: 0.081,
  99023: 0.081,
  99025: 0.081,
  99026: 0.076,
  99027: 0.081,
  99029: 0.08,
  99030: 0.081,
  99031: 0.081,
  99032: 0.077,
  99033: 0.078,
  99034: 0.076,
  99036: 0.081,
  99037: 0.081,
  99039: 0.081,
  99040: 0.076,
  99101: 0.076,
  99102: 0.078,
  99103: 0.079,
  99104: 0.078,
  99105: 0.077,
  99107: 0.077,
  99109: 0.076,
  99110: 0.076,
  99111: 0.078,
  99113: 0.078,
  99114: 0.076,
  99115: 0.078,
  99116: 0.077,
  99117: 0.08,
  99118: 0.077,
  99119: 0.076,
  99121: 0.077,
  99122: 0.076,
  99123: 0.079,
  99124: 0.077,
  99125: 0.077,
  99126: 0.076,
  99128: 0.078,
  99129: 0.076,
  99130: 0.078,
  99131: 0.076,
  99133: 0.078,
  99134: 0.08,
  99135: 0.079,
  99136: 0.078,
  99137: 0.076,
  99138: 0.077,
  99139: 0.076,
  99140: 0.077,
  99141: 0.076,
  99143: 0.078,
  99144: 0.08,
  99146: 0.077,
  99147: 0.08,
  99148: 0.076,
  99149: 0.078,
  99150: 0.077,
  99151: 0.076,
  99152: 0.076,
  99153: 0.076,
  99154: 0.08,
  99155: 0.077,
  99156: 0.076,
  99157: 0.076,
  99158: 0.078,
  99159: 0.077,
  99160: 0.077,
  99161: 0.078,
  99163: 0.078,
  99164: 0.078,
  99165: 0.078,
  99166: 0.077,
  99167: 0.076,
  99169: 0.077,
  99170: 0.078,
  99171: 0.078,
  99173: 0.076,
  99174: 0.078,
  99176: 0.078,
  99179: 0.078,
  99180: 0.076,
  99181: 0.076,
  99185: 0.08,
  99201: 0.088,
  99202: 0.088,
  99203: 0.081,
  99204: 0.088,
  99205: 0.081,
  99206: 0.081,
  99207: 0.088,
  99208: 0.081,
  99209: 0.088,
  99210: 0.088,
  99211: 0.088,
  99212: 0.081,
  99213: 0.088,
  99214: 0.088,
  99215: 0.088,
  99216: 0.081,
  99217: 0.081,
  99218: 0.081,
  99219: 0.088,
  99220: 0.088,
  99223: 0.081,
  99224: 0.081,
  99228: 0.088,
  99251: 0.088,
  99252: 0.088,
  99256: 0.088,
  99258: 0.088,
  99260: 0.088,
  99299: 0.088,
  99301: 0.08,
  99302: 0.086,
  99320: 0.08,
  99321: 0.079,
  99322: 0.07,
  99323: 0.081,
  99324: 0.087,
  99326: 0.077,
  99328: 0.081,
  99329: 0.081,
  99330: 0.08,
  99333: 0.078,
  99335: 0.08,
  99336: 0.08,
  99337: 0.08,
  99338: 0.08,
  99341: 0.077,
  99343: 0.08,
  99344: 0.077,
  99345: 0.08,
  99346: 0.08,
  99347: 0.079,
  99348: 0.081,
  99349: 0.079,
  99350: 0.07,
  99352: 0.08,
  99353: 0.08,
  99354: 0.086,
  99356: 0.07,
  99357: 0.079,
  99359: 0.081,
  99360: 0.081,
  99361: 0.081,
  99362: 0.081,
  99363: 0.081,
  99371: 0.077,
  99401: 0.077,
  99402: 0.077,
  99403: 0.079,
};