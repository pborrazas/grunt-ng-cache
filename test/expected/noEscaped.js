angular.module('demo').
run(['$cacheFactory', '$templateCache', '$http', function(cf, _, __) {
	var c = cf.get('$http') || cf('$http');
	c.put('test/fixtures/singlequotes.json', {
	"escape": "'Single quote'"
});
}]);