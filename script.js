function Get_DIGIPIN(lat, lon) {
  var L1 = [
    ["0", "2", "0", "0"],
    ["3", "4", "5", "6"],
    ["G", "8", "7", "M"],
    ["J", "9", "K", "L"],
  ];

  var L2 = [
    ["J", "G", "9", "8"],
    ["K", "3", "2", "7"],
    ["L", "4", "5", "6"],
    ["M", "P", "W", "X"],
  ];

  var vDIGIPIN = "";
  var msg = "";
  var msg1 = "";

  var r = 0;
  var c = 0;
  var p = 0.000000000000001;

  var MinLat = 1.5;
  var MaxLat = 39.0;

  var MinLon = 63.5;
  var MaxLon = 99.0;

  //var MinLat = 0.00; var MaxLat = 100.00; var MinLon = 0.00; var MaxLon = 100.00;
  var LatDivBy = 4;
  var LonDivBy = 4;

  var LatDivDeg = 0;
  var LonDivDeg = 0;

  if (lat < MinLat || lat > MaxLat) {
    alert("Latitude Out of range");
    return "";
  }

  if (lon < MinLon || lon > MaxLon) {
    alert("Longitude Out of range");
    return "";
  }

  for (let Lvl = 1; Lvl <= 10; Lvl++) {
    //console.log('Level-'+Lvl);
    LatDivDeg = (MaxLat - MinLat) / LatDivBy;
    LonDivDeg = (MaxLon - MinLon) / LonDivBy;
    //console.log('LAT = '+lat+' ('+ MinLat +' - '+ MaxLat + ');   LON = '+lon+' ('+ MinLon +' - '+ MaxLon +')');

    var NextLvlMaxLat = MaxLat;
    var NextLvlMinLat = MaxLat - LatDivDeg;

    for (x = 0; x < LatDivBy; x++) {
      //console.log('  --Cur LAT Range in Loop = '+ NextLvlMinLat +' - '+ NextLvlMaxLat );
      if (lat >= NextLvlMinLat && lat < NextLvlMaxLat) {
        r = x;
        break;
      } else {
        NextLvlMaxLat = NextLvlMinLat;
        NextLvlMinLat = NextLvlMaxLat - LatDivDeg;
      }
    }
    //console.log('Lat Falls in Range = '+ NextLvlMinLat +' - '+ NextLvlMaxLat + ' ('+lat+')');

    var NextLvlMinLon = MinLon;
    var NextLvlMaxLon = MinLon + LonDivDeg;
    for (x = 0; x < LonDivBy; x++) {
      //console.log('  --Cur LON Range in Loop = '+ NextLvlMinLon +' - '+ NextLvlMaxLon );
      if (lon >= NextLvlMinLon && lon < NextLvlMaxLon) {
        c = x;
        break;
      } else {
        NextLvlMinLon = NextLvlMaxLon;
        NextLvlMaxLon = NextLvlMinLon + LonDivDeg;
      }
    }
    //console.log('Lon Falls in Range = '+ NextLvlMinLon +' - '+ NextLvlMaxLon + ' ('+lon+')');

    if (Lvl == 1) {
      if (L1[r][c] == "0") {
        vDIGIPIN = "Out of Bound";
        break;
      }
      vDIGIPIN = vDIGIPIN + L1[r][c];
    } else {
      vDIGIPIN = vDIGIPIN + L2[r][c];
      if (Lvl == 3 || Lvl == 6) {
        vDIGIPIN = vDIGIPIN + "-";
      }
    }
    // Set Max boundary for nex level
    MinLat = NextLvlMinLat;
    MaxLat = NextLvlMaxLat;
    MinLon = NextLvlMinLon;
    MaxLon = NextLvlMaxLon;
  }
  return vDIGIPIN;
}

Get_DIGIPIN(19.225374, 72.983719);
//35.097282, 76.475194
//'236-454-KG3M'

function reverse(pin) {
  var L1 = [
    ["z1", "2", "z2", "z3"],
    ["3", "4", "5", "6"],
    ["G", "8", "7", "M"],
    ["J", "9", "K", "L"],
  ];

  var L2 = [
    ["J", "G", "9", "8"],
    ["K", "3", "2", "7"],
    ["L", "4", "5", "6"],
    ["M", "P", "W", "X"],
  ];

  let L1Obj = L1.flat()
    .filter((val) => val != "0")
    .reduce((r, a) => {
      r[a] = null;
      return r;
    }, {});

  let L2Obj = L2.flat()
    .filter((val) => val != "0")
    .reduce((r, a) => {
      r[a] = null;
      return r;
    }, {});

  let pinArr = [...pin.replaceAll("-", "")];

  console.log(L1Obj);
  console.log(L2Obj);
  console.log(pinArr);

  var MinLat = 1.5;
  var MaxLat = 39.0;

  var MinLon = 63.5;
  var MaxLon = 99.0;

  //var MinLat = 0.00; var MaxLat = 100.00; var MinLon = 0.00; var MaxLon = 100.00;
  var LatDivBy = 4;
  var LonDivBy = 4;

  var LatDivDeg = 0;
  var LonDivDeg = 0;
    let obj = {};
  let arr = [];
  let nextLat = MaxLat;
  var NextLon = MinLon;
  for (x = 0; x < LatDivBy; x++) {
    LonDivDeg = (MaxLon - MinLon) / LonDivBy;
    LatDivDeg = (MaxLat - MinLat) / LatDivBy;
    let m = [];
    m = [nextLat, nextLat - LatDivDeg];
    for (y = 0; y < LonDivBy; y++) {
      arr.push({lat: m, lon: [NextLon, NextLon + LonDivDeg]});
      obj[L1[x][y]] = {lat: m, lon: [NextLon, NextLon + LonDivDeg]}

      NextLon = NextLon + LonDivDeg;
    }
    nextLat = nextLat - LatDivDeg;
  }
  console.log(arr);
  console.log(obj);
}

reverse("236-454-KG3M");
