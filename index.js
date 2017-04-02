
function index(){
var mult = 8000 * Math.random() + 1000;
mult = mult.toFixed(0);

var nameToId = {
	"Protein" : 203,
	"Energy" : 208,
	"Sugars, total" : 269,
	"Total lipid (fat)" : 204,
	"Carbohydrate, by difference" : 205
}

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
   result.innerHTML=rtn[name];
});
}

$(document).ready(function() {
	$("#searchbox").autocomplete({
		source: function(request, response) {
			$.ajax({
				url: `https://api.nal.usda.gov/ndb/search/?format=json&q=${request.term}&sort=n&max=100&offset=0&api_key=DEMO_KEY`,
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