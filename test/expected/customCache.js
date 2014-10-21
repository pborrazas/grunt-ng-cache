angular.module('demo').
run(['$cacheFactory', '$templateCache', '$http', function(cf, _, __) {
	var c = cf.get('customCacheName') || cf('customCacheName');
	c.put('test/fixtures/data.json', '{\n\t"dummy": "data"\n}');
}]);