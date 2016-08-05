var countryList = {
    withRegion: function() {
        return this.list;
    },
    withoutRegion: function(opts) {
        var defaults = {
            lowercase: false
        };

        _.extend(defaults, opts);
        var opts = defaults;

        var regions = Object.keys(this.list);
        var list = [];
        for(var i = 0 ; i < regions.length; i++) {
            var countriesInRegion = this.list[regions[i]];
            if (i === 0 ) { 
                for(var j = 0; j < countriesInRegion.length; j++) {
                    list[j] = countriesInRegion[j][0];
                }
                continue;
            }
            var subList = [];
            for(var k = 0; k < countriesInRegion.length; k++) {
                subList[k] = countriesInRegion[k][0];
            }
            list = list.concat(subList);
        }
        list.sort();

        // if keep casing
        if (opts.lowercase !== true) return list;

        // if lower case.
        list.forEach(function(country, i) {
            list[i] = country.toLowerCase();
        });

        return list;
    },
    getRegion: function(country) {
        for(var region in this.list) {
            if (this.list.hasOwnProperty(region)) {
                var countriesInRegion = this.list[region];
                for(var i in countriesInRegion) {
                    var countryArray = countriesInRegion[i];
                    if (countryArray[0].toLowerCase().indexOf(country.toLowerCase()) > -1) return region;
                }
            }
        }
    },

    validateOne: function(countryOrCode, isCountryOrCode, returnType) {

        if (typeof countryOrCode !== 'string') return false;

        // guess whether its country or code if not defined
        if (typeof isCountryOrCode === 'undefined') {
            if (countryOrCode.length === 3) {
                var firstTest = this.validateOne(countryOrCode, 'code', returnType);
                if (!firstTest) {
                    // if first test fails, attempt to run it as country and return the final result
                    return this.validateOne(countryOrCode, 'country', returnType);
                }
            } else {
                // assume is country
                isCountryOrCode = 'country';
            }
        }

        var countryOrCodeIndex = ['country','code'].indexOf(isCountryOrCode.toLowerCase());
        if (countryOrCodeIndex === -1) throw new Error('Invalid `isCountryOrCode` parameter.');

        var regions = Object.keys(this.list);
        for(var i in regions) {
            var region = regions[i];
            var countriesInRegion = this.list[region];

            for(var i in countriesInRegion) {
                var countriesArray = countriesInRegion[i];
                if (countriesArray[countryOrCodeIndex].toLowerCase() === countryOrCode.toLowerCase()) {
                    return (returnType === 'array') ? countriesArray : countriesArray[0];
                }
            }
        }
        return false;

    },
    validateList: function(countries) {

        if (typeof countries !== 'string' && !Array.isArray(countries)) return [];

        var self = this;

        //if it is not array type, explode it.
        if(!Array.isArray(countries)) {
            if (countries.length === 0) { return []; }
            var countries = countries.split(',')
            for(var i in countries) {
                countries[i] = S(countries[i]).trim().s; // trim leading & trailing whitespaces
                var returned = this.validateOne(countries[i]);
                if (!returned) {
                    countries.splice(i, 1);
                    i += 1;
                } else {
                    countries[i] = returned;
                }
            }
        } else {
            for(var i in countries) {
                var returned = this.validateOne(countries[i]);
                if (!returned) {
                    countries.splice(i, 1);
                    i += 1;
                } else {
                    countries[i] = returned;
                }
            }
        }

        return countries;
    },
    getCountryNameFromCode: function(code) {
        var result = this.validateOne(code, 'code', 'array');
        return result ? result[0] : result;
    },
    getCodeFromCountryName: function(name) {
        var result = this.validateOne(name, 'country', 'array');
        return result ? result[1] : result;
    },
    list: {

        usc: [ 
            ["Canada","CAN"],
            ["Saint Pierre and Miquelon","SPM"],
            ["United States","USA"],
            ["United States Minor Outlying Islands","UMI"]
        ],
        sea: [
            ["Brunei Darussalam","BRN"],
            ["Cambodia","KHM"],
            ["Guam","GUM"],
            ["Indonesia","IDN"],
            ["Lao People's Democratic Republic","LAO"],
            ["Malaysia","MYS"],
            ["Myanmar","MMR"],
            ["Northern Mariana Islands","MNP"],
            ["Palau","PLW"],
            ["Philippines","PHL"],
            ["Singapore","SGP"],
            ["Thailand","THA"],
            ["Timor-leste","TLS"],
            ["Vietnam","VNM"]
        ],
        asianeu: [
            ["Albania","ALB"],
            ["Andorra","AND"],
            ["Austria","AUT"],
            ["Azerbaijan","AZE"],
            ["Bangladesh","BGD"],
            ["Belarus","BLR"],
            ["Belgium","BEL"],
            ["Bhutan","BTN"],
            ["Bosnia and Herzegovina","BIH"],
            ["Bulgaria","BGR"],
            ["China","CHN"],
            ["Croatia","HRV"],
            ["Czech Republic","CZE"],
            ["Denmark","DNK"],
            ["Estonia","EST"],
            ["Faroe Islands","FRO"],
            ["Finland","FIN"],
            ["France","FRA"],
            ["Georgia","GEO"],
            ["Germany","DEU"],
            ["Gibraltar","GIB"],
            ["Greece","GRC"],
            ["Greenland","GRL"],
            ["Holy See (Vatican City State)","VAT"],
            ["Hong Kong","HKG"],
            ["Hungary","HUN"],
            ["Iceland","ISL"],
            ["India","IND"],
            ["Ireland","IRL"],
            ["Italy","ITA"],
            ["Japan","JPN"],
            ["Kazakhstan","KAZ"],
            ["Kyrgyzstan","KGZ"],
            ["Latvia","LVA"],
            ["Liechtenstein","LIE"],
            ["Lithuania","LTU"],
            ["Luxembourg","LUX"],
            ["Macao","MAC"],
            ["Macedonia","MKD"],
            ["Maldives","MDV"],
            ["Malta","MLT"],
            ["Moldova","MDA"],
            ["Monaco","MCO"],
            ["Mongolia","MNG"],
            ["Montenegro","MNE"],
            ["Montserrat","MSR"],
            ["Nepal","NPL"],
            ["Netherlands","NLD"],
            ["North Korea","PRK"],
            ["Norway","NOR"],
            ["Pakistan","PAK"],
            ["Poland","POL"],
            ["Portugal","PRT"],
            ["Romania","ROU"],
            ["Russia","RUS"],
            ["San Marino","SMR"],
            ["Serbia","SRB"],
            ["Slovakia","SVK"],
            ["Slovenia","SVN"],
            ["South Korea","KOR"],
            ["Spain","ESP"],
            ["Sri Lanka","LKA"],
            ["Svalbard and Jan Mayen","SJM"],
            ["Sweden","SWE"],
            ["Switzerland","CHE"],
            ["Taiwan","TWN"],
            ["Tajikistan","TJK"],
            ["Turkmenistan","TKM"],
            ["Ukraine","UKR"],
            ["United Kingdom","GBR"],
            ["Uzbekistan","UZB"]
        ],
        oceania: [
            ["American Samoa","ASM"],
            ["Australia","AUS"],
            ["Christmas Island","CXR"],
            ["Cocos (Keeling) Islands","CCK"],
            ["Fiji","FJI"],
            ["French Polynesia","PYF"],
            ["New Caledonia","NCL"],
            ["New Zealand","NZL"],
            ["Niue","NIU"],
            ["Norfolk Island","NFK"],
            ["Papua New Guinea","PNG"],
            ["Solomon Islands","SLB"],
            ["Tonga","TON"],
            ["Tuvalu","TUV"],
            ["Vanuatu","VUT"],
            ["Wallis and Futuna","WLF"]
        ],
        me: [
            ["Afghanistan","AFG"],
            ["Armenia","ARM"],
            ["Bahrain","BHR"],
            ["Cyprus","CYP"],
            ["Iran","IRN"],
            ["Iraq","IRQ"],
            ["Israel","ISR"],
            ["Jordan","JOR"],
            ["Kuwait","KWT"],
            ["Lebanon","LBN"],
            ["Libya","LBY"],
            ["Oman","OMN"],
            ["Palestine","PSE"],
            ["Qatar","QAT"],
            ["Saudi Arabia","SAU"],
            ["Syrian Arab Republic","SYR"],
            ["Turkey","TUR"],
            ["United Arab Emirates","ARE"],
            ["Yemen","YEM"]
        ],
        row: [
            ["Algeria","DZA"],
            ["Angola","AGO"],
            ["Anguilla","AIA"],
            ["Antarctica","ATA"],
            ["Antigua and Barbuda","ATG"],
            ["Argentina","ARG"],
            ["Aruba","ABW"],
            ["Bahamas","BHS"],
            ["Barbados","BRB"],
            ["Belize","BLZ"],
            ["Benin","BEN"],
            ["Bermuda","BMU"],
            ["Bolivia","BOL"],
            ["Botswana","BWA"],
            ["Bouvet Island","BVT"],
            ["Brazil","BRA"],
            ["British Indian Ocean Territory","IOT"],
            ["Burkina Faso","BFA"],
            ["Burundi","BDI"],
            ["Cameroon","CMR"],
            ["Cape Verde","CPV"],
            ["Cayman Islands","CYM"],
            ["Central African Republic","CAF"],
            ["Chad","TCD"],
            ["Chile","CHL"],
            ["Colombia","COL"],
            ["Comoros","COM"],
            ["Congo","COG"],
            ["Cook Islands","COK"],
            ["Costa Rica","CRI"],
            ["Cote D'ivoire","CIV"],
            ["Cuba","CUB"],
            ["Democratic Republic of Congo","COD"],
            ["Djibouti","DJI"],
            ["Dominica","DMA"],
            ["Dominican Republic","DOM"],
            ["Ecuador","ECU"],
            ["Egypt","EGY"],
            ["El Salvador","SLV"],
            ["Equatorial Guinea","GNQ"],
            ["Eritrea","ERI"],
            ["Ethiopia","ETH"],
            ["Falkland Islands","FLK"],
            ["French Guiana","GUF"],
            ["French Southern Territories","ATF"],
            ["Gabon","GAB"],
            ["Gambia","GMB"],
            ["Ghana","GHA"],
            ["Grenada","GRD"],
            ["Guadeloupe","GLP"],
            ["Guatemala","GTM"],
            ["Guinea","GIN"],
            ["Guinea-bissau","GNB"],
            ["Guyana","GUY"],
            ["Haiti","HTI"],
            ["Heard Island and Mcdonald Islands","HMD"],
            ["Honduras","HND"],
            ["Jamaica","JAM"],
            ["Kenya","KEN"],
            ["Kiribati","KIR"],
            ["Lesotho","LSO"],
            ["Liberia","LBR"],
            ["Madagascar","MDG"],
            ["Malawi","MWI"],
            ["Mali","MLI"],
            ["Marshall Islands","MHL"],
            ["Martinique","MTQ"],
            ["Mauritania","MRT"],
            ["Mauritius","MUS"],
            ["Mayotte","MYT"],
            ["Mexico","MEX"],
            ["Micronesia","FSM"],
            ["Morocco","MAR"],
            ["Mozambique","MOZ"],
            ["Namibia","NAM"],
            ["Nauru","NRU"],
            ["Nicaragua","NIC"],
            ["Niger","NER"],
            ["Nigeria","NGA"],
            ["Panama","PAN"],
            ["Paraguay","PRY"],
            ["Peru","PER"],
            ["Pitcairn","PCN"],
            ["Puerto Rico","PRI"],
            ["Reunion","REU"],
            ["Rwanda","RWA"],
            ["Saint Helena","SHN"],
            ["Saint Kitts and Nevis","KNA"],
            ["Saint Lucia","LCA"],
            ["Saint Vincent and The Grenadines","VCT"],
            ["Samoa","WSM"],
            ["Sao Tome and Principe","STP"],
            ["Senegal","SEN"],
            ["Seychelles","SYC"],
            ["Sierra Leone","SLE"],
            ["Somalia","SOM"],
            ["South Africa","ZAF"],
            ["South Georgia","SGS"],
            ["Sudan","SDN"],
            ["Suriname","SUR"],
            ["Swaziland","SWZ"],
            ["Tanzania","TZA"],
            ["Togo","TGO"],
            ["Tokelau","TKL"],
            ["Trinidad and Tobago","TTO"],
            ["Tunisia","TUN"],
            ["Turks and Caicos Islands","TCA"],
            ["Uganda","UGA"],
            ["Uruguay","URY"],
            ["Venezuela","VEN"],
            ["Virgin Islands British","VGB"],
            ["Virgin Islands U.S.","VIR"],
            ["Western Sahara","ESH"],
            ["Zambia","ZMB"],
            ["Zimbabwe","ZWE"]
        ]
    }
}
if (typeof module !== 'undefined') module.exports = countryList;

function selectCountry(selectId, selection) {
    var i = 0,
        elem_select = document.getElementById(selectId),
        flag = false;
        x = document.createElement('option');

    x.value = "";
    x.innerHTML = "-- select a country --";
    elem_select.appendChild(x);

    var list = countryList.withoutRegion();
    while(list[i]) {
        var o = document.createElement('option'),
        c = list[i];
        o.value = c;
        o.innerHTML = c;
        elem_select.appendChild(o);
        if(selection && selection === c) { o.selected = true; flag = true; }
        i++;
    }
    if(!flag) { x.selected = true; }
}