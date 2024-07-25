
function Get_DIGIPIN(lat, lon) {
    var L1 = [
        ['0', '2', '0', '0'],
        ['3', '4', '5', '6'],
        ['G', '8', '7', 'M'],
        ['J', '9', 'K', 'L']
    ];

    var L2 = [
        ['J', 'G', '9', '8'],
        ['K', '3', '2', '7'],
        ['L', '4', '5', '6'],
        ['M', 'P', 'W', 'X']
    ];

    var vDIGIPIN = ''; var msg = ''; var msg1 = '';

    var r = 0; 
    var c = 0; 
    var p = 0.000000000000001;

    var MinLat = 1.50; 
    var MaxLat = 39.00; 

    var MinLon = 63.50; 
    var MaxLon = 99.00;

    //var MinLat = 0.00; var MaxLat = 100.00; var MinLon = 0.00; var MaxLon = 100.00;
    var LatDivBy = 4; 
    var LonDivBy = 4;

    var LatDivDeg = 0; 
    var LonDivDeg = 0;


    if (lat < MinLat || lat > MaxLat) {
        alert('Latitude Out of range');
        return '';
    }

    if (lon < MinLon || lon > MaxLon) {
        alert('Longitude Out of range');
        return '';
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
            }
            else {
                NextLvlMaxLat = NextLvlMinLat
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
            }
            else {
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
        }
        else {
            vDIGIPIN = vDIGIPIN + L2[r][c];
            if (Lvl == 3 || Lvl == 6) {
                vDIGIPIN = vDIGIPIN + "-"
            }
        }
        // Set Max boundary for nex level
        MinLat = NextLvlMinLat; MaxLat = NextLvlMaxLat;
        MinLon = NextLvlMinLon; MaxLon = NextLvlMaxLon;
    } 
    return vDIGIPIN;
}

Get_DIGIPIN(19.225374, 72.983719)