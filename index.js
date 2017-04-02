
let nameToId = {
	"Protein" : 203,
	"Energy" : 208,
	"Sugars, total" : 269,
	"Total lipid (fat)" : 204,
	"Carbohydrate, by difference" : 205
}

function index(){
var mult = 8000 * Math.random() + 1000;
mult = mult.toFixed(0);
$.get('https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=DEMO_KEY&nutrients=203&nutrients=204&nutrients=205&nutrients=208&nutrients=269&callback=?&ndbno=0' + mult, function(data){
	var rtn = {}
	for (var nutrient of data.report.foods[0].nutrients) {
		for (var name in nameToId) {
			if (nutrient.nutrient_id == nameToId[name]) {
				rtn[name] = {
					value: nutrient.value,
					unit: nutrient.unit,
				}
			}
		}
	}
	console.log(rtn);
   return rtn;
   console.log(rtn);
   result.innerHTML=(data.report.foods[0].name);
});
}

$(document).ready(function() {
	$("#searchbox").autocomplete({
		source: function(request, response) {
			$.ajax({
				url: `https://api.nal.usda.gov/ndb/search/?format=json&q=${request.term}&sort=n&max=100&offset=0&api_key=DEMO_KEY&ds=Standard%20Reference`,
				success: function(data) {
					console.log(data)
					var rtn = []
					for (entry of data.list.item) {
						rtn.push(entry.name)
					}
					response(rtn)
				}
			})
		}
	})
})

function find(){
	var searchid = document.getElementById("searchbox").value;
	var ndbno;
	$.get({'https://api.nal.usda.gov/ndb/search/?format=json&q=' + searchid + '&sort=n&max=100&offset=0&api_key=DEMO_KEY&ds=Standard%20Reference', function(data){
	for(entry of data.list.item){
		if(entry.name == searchid){
			ndbno = entry.ndbno;
			break;
		}
	}}});
	$.get({'https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=DEMO_KEY&nutrients=203&nutrients=204&nutrients=205&nutrients=208&nutrients=269&callback=?&ndbno=' + ndbno, function(data){
	var rtn = {}
	for (var nutrient of data.report.foods[0].nutrients) {
		for (var name in nameToId) {
			if (nutrient.nutrient_id == nameToId[name]) {
				rtn[name] = {
					value: nutrient.value,
					unit: nutrient.unit,
				}
			}
		}
	}
	console.log(rtn);
   return rtn;	})
});
}