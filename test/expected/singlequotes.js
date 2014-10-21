angular.module('demo').
run(['$cacheFactory', '$templateCache', '$http', function(cf, _, __) {
	var c = cf.get('$http') || cf('$http');
	c.put('test/fixtures/singlequotes.html', '<escape>\n\t<p>\'Single quote\'<p>\n</escape>');
	c.put('test/fixtures/singlequotes.json', '{\n\t"escape": "\'Single quote\'"\n}');
}]);