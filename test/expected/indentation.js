angular.module('demo').
run(['$cacheFactory', '$templateCache', '$http', function(cf, _, __) {
	var c = cf.get('$http') || cf('$http');
	c.put('test/fixtures/indentation.html', '<textarea>\n\n\tTextarea text\n\n</textarea>\n<pre>\n\n\tDebug HTML\n\n</pre>\n<code>\n\n\tScript code\n\n</code>');
}]);