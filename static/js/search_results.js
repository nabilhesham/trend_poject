// function get_data() {
//   let url = "http://127.0.0.1:8000/trend/api/trend/";
//   fetch(url)
//     .then((res) => res.json())
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       throw err;
//     });
// }
// function get_data(trend1, search_type, trend2="") {
//   try {
//     if (trend2 == "") {
//       let url1 = `http://127.0.0.1:8000/trend/api/trends/?name=${trend1}&type=${search_type}`}
//       else{        let url1 = `http://127.0.0.1:8000/trend/api/trends/?name=${trend1}&type=${search_type}`
//         let url2 = `http://127.0.0.1:8000/trend/api/trends/?name=${trend2}&type=${search_type}`}
//     fetch(url1)
//       .then((res1) => res1.json())
//       .then((res1) => {
//         return res1;
//       })
//       .catch((err) => {
//         throw err;
//       });
//       fetch(url2)
//       .then((res2) => res2.json())
//       .then((res2) => {
//         return res2;
//       })
//       .catch((err) => {
//         throw err;
//       });
//   } catch {
//     pass;
//   }
// }

var res1;
var res2;

$(document).ready(function () {
  try {
    trend1 = $("#trend1").text();
    trend2 = $("#trend2").text();
    search_type = $("table").attr("search_type");
    get_data(trend1, search_type);
    res1 = JSON.parse(localStorage.getItem("res1"));
    if (trend2) {
      get_data(trend2, search_type, true);
      res2 = JSON.parse(localStorage.getItem("res2"));
    }
  } catch {
    pass;
  }
});

function get_data(trend, search_type, trend2_exist = false) {
  let url = `http://127.0.0.1:8000/trend/api/trends/?name=${trend}&type=${search_type}`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (trend2_exist) {
        console.log(res);
        localStorage.setItem("res1", JSON.stringify(res));
      } else {
        localStorage.setItem("res1", JSON.stringify(res));
      }
    })
    .catch((err) => {
      throw err;
    });
}

am4core.ready(function () {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart_bar = am4core.create("chartdiv_bar", am4charts.XYChart);

  chart_bar.data = [
    {
      country: "USA",
      visits: 2025,
    },
    {
      country: "China",
      visits: 1882,
    },
    {
      country: "Japan",
      visits: 1809,
    },
    {
      country: "Germany",
      visits: 1322,
    },
    {
      country: "UK",
      visits: 1122,
    },
    {
      country: "France",
      visits: 1114,
    },
    {
      country: "India",
      visits: 984,
    },
    {
      country: "Spain",
      visits: 711,
    },
    {
      country: "Netherlands",
      visits: 665,
    },
    {
      country: "Russia",
      visits: 580,
    },
    {
      country: "South Korea",
      visits: 443,
    },
    {
      country: "Canada",
      visits: 441,
    },
  ];

  chart_bar.padding(40, 40, 40, 40);

  var categoryAxis = chart_bar.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "country";
  categoryAxis.renderer.minGridDistance = 60;
  categoryAxis.renderer.inversed = true;
  categoryAxis.renderer.grid.template.disabled = true;

  var valueAxis = chart_bar.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.extraMax = 0.1;

  var series = chart_bar.series.push(new am4charts.ColumnSeries());
  series.dataFields.categoryX = "country";
  series.dataFields.valueY = "visits";
  series.tooltipText = "{valueY.value}";
  series.columns.template.strokeOpacity = 0;
  series.columns.template.column.cornerRadiusTopRight = 10;
  series.columns.template.column.cornerRadiusTopLeft = 10;
  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.verticalCenter = "bottom";
  labelBullet.label.dy = -10;
  labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

  chart_bar.zoomOutButton.disabled = true;

  // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
  series.columns.template.adapter.add("fill", function (fill, target) {
    return chart_bar.colors.getIndex(target.dataItem.index);
  });

  categoryAxis.sortBySeries = series;

  // Create map instance
  var chart_map1 = am4core.create("chartdiv_map1", am4maps.MapChart);

  // Set map definition
  chart_map1.geodata = am4geodata_usaLow;

  // Set projection
  chart_map1.projection = new am4maps.projections.AlbersUsa();

  // Create map polygon series
  var polygonSeries = chart_map1.series.push(new am4maps.MapPolygonSeries());

  //Set min/max fill color for each area
  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: chart_map1.colors.getIndex(1).brighten(1),
    max: chart_map1.colors.getIndex(1).brighten(-0.3),
  });

  // Make map load polygon data (state shapes and names) from GeoJSON
  polygonSeries.useGeodata = true;

  // Set heatmap values for each state

  polygonSeries.data = [
    {
      id: "US-AL",
      value: 4447100,
    },
    {
      id: "US-AL",
      value: 2000,
    },
    {
      id: "US-AK",
      value: 626932,
    },
    {
      id: "US-AZ",
      value: 5130632,
    },
    {
      id: "US-AR",
      value: 2673400,
    },
    {
      id: "US-CA",
      value: 33871648,
    },
    {
      id: "US-CO",
      value: 4301261,
    },
    {
      id: "US-CT",
      value: 3405565,
    },
    {
      id: "US-DE",
      value: 783600,
    },
    {
      id: "US-DC",
      value: 503600,
    },
    {
      id: "US-FL",
      value: 15982378,
    },
    {
      id: "US-GA",
      value: 8186453,
    },
    {
      id: "US-HI",
      value: 1211537,
    },
    {
      id: "US-ID",
      value: 1293953,
    },
    {
      id: "US-IL",
      value: 12419293,
    },
    {
      id: "US-IN",
      value: 6080485,
    },
    {
      id: "US-IA",
      value: 2926324,
    },
    {
      id: "US-KS",
      value: 2688418,
    },
    {
      id: "US-KY",
      value: 4041769,
    },
    {
      id: "US-LA",
      value: 4468976,
    },
    {
      id: "US-ME",
      value: 1274923,
    },
    {
      id: "US-MD",
      value: 5296486,
    },
    {
      id: "US-MA",
      value: 6349097,
    },
    {
      id: "US-MI",
      value: 9938444,
    },
    {
      id: "US-MN",
      value: 4919479,
    },
    {
      id: "US-MS",
      value: 2844658,
    },
    {
      id: "US-MO",
      value: 5595211,
    },
    {
      id: "US-MT",
      value: 902195,
    },
    {
      id: "US-NE",
      value: 1711263,
    },
    {
      id: "US-NV",
      value: 1998257,
    },
    {
      id: "US-NH",
      value: 1235786,
    },
    {
      id: "US-NJ",
      value: 8414350,
    },
    {
      id: "US-NM",
      value: 1819046,
    },
    {
      id: "US-NY",
      value: 18976457,
    },
    {
      id: "US-NC",
      value: 8049313,
    },
    {
      id: "US-ND",
      value: 642200,
    },
    {
      id: "US-OH",
      value: 11353140,
    },
    {
      id: "US-OK",
      value: 3450654,
    },
    {
      id: "US-OR",
      value: 3421399,
    },
    {
      id: "US-PA",
      value: 12281054,
    },
    {
      id: "US-RI",
      value: 1048319,
    },
    {
      id: "US-SC",
      value: 4012012,
    },
    {
      id: "US-SD",
      value: 754844,
    },
    {
      id: "US-TN",
      value: 5689283,
    },
    {
      id: "US-TX",
      value: 20851820,
    },
    {
      id: "US-UT",
      value: 2233169,
    },
    {
      id: "US-VT",
      value: 608827,
    },
    {
      id: "US-VA",
      value: 7078515,
    },
    {
      id: "US-WA",
      value: 5894121,
    },
    {
      id: "US-WV",
      value: 1808344,
    },
    {
      id: "US-WI",
      value: 5363675,
    },
    {
      id: "US-WY",
      value: 493782,
    },
  ];

  // Set up heat legend
  // let heatLegend = chart_map1.createChild(am4maps.HeatLegend);
  // heatLegend.series = polygonSeries;
  // heatLegend.align = "right";
  // heatLegend.valign = "bottom";
  // heatLegend.width = am4core.percent(20);
  // heatLegend.marginRight = am4core.percent(4);
  // heatLegend.minValue = 0;
  // heatLegend.maxValue = 40000000;

  // Set up custom heat map legend labels using axis ranges
  // var minRange = heatLegend.valueAxis.axisRanges.create();
  // minRange.value = heatLegend.minValue;
  // minRange.label.text = "Little";
  // var maxRange = heatLegend.valueAxis.axisRanges.create();
  // maxRange.value = heatLegend.maxValue;
  // maxRange.label.text = "A lot!";

  // Blank out internal heat legend value axis labels
  // heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function (
  //   labelText
  // ) {
  //   return "";
  // });

  // Configure series tooltip
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}: {value} , {name}:{value}";
  polygonTemplate.nonScalingStroke = true;
  polygonTemplate.strokeWidth = 0.5;

  // worldPolygon.fill = am4core.color("#eee");
  // worldPolygon.propertyFields.fill = "color";

  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#3c5bdc");

  // OTHER MAP
  // Create map instance
  var chart_map2 = am4core.create("chartdiv_map2", am4maps.MapChart);

  // Set map definition
  chart_map2.geodata = am4geodata_usaLow;

  // Set projection
  chart_map2.projection = new am4maps.projections.AlbersUsa();

  // Create map polygon series
  var polygonSeries1 = chart_map2.series.push(new am4maps.MapPolygonSeries());

  //Set min/max fill color for each area
  polygonSeries1.heatRules.push({
    property: "fill",
    target: polygonSeries1.mapPolygons.template,
    min: chart_map2.colors.getIndex(10).brighten(1),
    max: chart_map2.colors.getIndex(10).brighten(-0.3),
  });

  // Make map load polygon data (state shapes and names) from GeoJSON
  polygonSeries1.useGeodata = true;

  // Set heatmap values for each state

  polygonSeries1.data = [
    {
      id: "US-AL",
      value: 4447100,
      fill: am4core.color("#fff"),
    },
    {
      id: "US-AL",
      value: 2000,
    },
    {
      id: "US-AK",
      value: 626932,
    },
    {
      id: "US-AZ",
      value: 5130632,
    },
    {
      id: "US-AR",
      value: 2673400,
    },
    {
      id: "US-CA",
      value: 33871648,
    },
    {
      id: "US-CO",
      value: 4301261,
    },
    {
      id: "US-CT",
      value: 3405565,
    },
    {
      id: "US-DE",
      value: 783600,
    },
    {
      id: "US-DC",
      value: 503600,
    },
    {
      id: "US-FL",
      value: 15982378,
    },
    {
      id: "US-GA",
      value: 8186453,
    },
    {
      id: "US-HI",
      value: 1211537,
    },
    {
      id: "US-ID",
      value: 1293953,
    },
    {
      id: "US-IL",
      value: 12419293,
    },
    {
      id: "US-IN",
      value: 6080485,
    },
    {
      id: "US-IA",
      value: 2926324,
    },
    {
      id: "US-KS",
      value: 2688418,
    },
    {
      id: "US-KY",
      value: 4041769,
    },
    {
      id: "US-LA",
      value: 4468976,
    },
    {
      id: "US-ME",
      value: 1274923,
    },
    {
      id: "US-MD",
      value: 5296486,
    },
    {
      id: "US-MA",
      value: 6349097,
    },
    {
      id: "US-MI",
      value: 9938444,
    },
    {
      id: "US-MN",
      value: 4919479,
    },
    {
      id: "US-MS",
      value: 2844658,
    },
    {
      id: "US-MO",
      value: 5595211,
    },
    {
      id: "US-MT",
      value: 902195,
    },
    {
      id: "US-NE",
      value: 1711263,
    },
    {
      id: "US-NV",
      value: 1998257,
    },
    {
      id: "US-NH",
      value: 1235786,
    },
    {
      id: "US-NJ",
      value: 8414350,
    },
    {
      id: "US-NM",
      value: 1819046,
    },
    {
      id: "US-NY",
      value: 18976457,
    },
    {
      id: "US-NC",
      value: 8049313,
    },
    {
      id: "US-ND",
      value: 642200,
    },
    {
      id: "US-OH",
      value: 11353140,
    },
    {
      id: "US-OK",
      value: 3450654,
    },
    {
      id: "US-OR",
      value: 3421399,
    },
    {
      id: "US-PA",
      value: 12281054,
    },
    {
      id: "US-RI",
      value: 1048319,
    },
    {
      id: "US-SC",
      value: 4012012,
    },
    {
      id: "US-SD",
      value: 754844,
    },
    {
      id: "US-TN",
      value: 5689283,
    },
    {
      id: "US-TX",
      value: 20851820,
    },
    {
      id: "US-UT",
      value: 2233169,
    },
    {
      id: "US-VT",
      value: 608827,
    },
    {
      id: "US-VA",
      value: 7078515,
    },
    {
      id: "US-WA",
      value: 5894121,
    },
    {
      id: "US-WV",
      value: 1808344,
    },
    {
      id: "US-WI",
      value: 5363675,
    },
    {
      id: "US-WY",
      value: 493782,
    },
  ];

  // Set up heat legend
  // let heatLegend = chart_map2.createChild(am4maps.HeatLegend);
  // heatLegend.series = polygonSeries;
  // heatLegend.align = "right";
  // heatLegend.valign = "bottom";
  // heatLegend.width = am4core.percent(20);
  // heatLegend.marginRight = am4core.percent(4);
  // heatLegend.minValue = 0;
  // heatLegend.maxValue = 40000000;

  // Set up custom heat map legend labels using axis ranges
  // var minRange = heatLegend.valueAxis.axisRanges.create();
  // minRange.value = heatLegend.minValue;
  // minRange.label.text = "Little";
  // var maxRange = heatLegend.valueAxis.axisRanges.create();
  // maxRange.value = heatLegend.maxValue;
  // maxRange.label.text = "A lot!";

  // Blank out internal heat legend value axis labels
  // heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function (
  //   labelText
  // ) {
  //   return "";
  // });

  // Configure series tooltip
  var polygonTemplate = polygonSeries1.mapPolygons.template;
  // polygonTemplate.fill = am4core.color("#000");
  polygonTemplate.tooltipText = "{name}: {value}";
  polygonTemplate.nonScalingStroke = true;
  polygonTemplate.strokeWidth = 0.5;

  // worldPolygon.fill = am4core.color("#eee");
  // worldPolygon.propertyFields.fill = "color";

  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#3c5bdc");
}); // end am4core.ready()
