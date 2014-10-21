angular.module('demo').
run(['$cacheFactory', '$templateCache', '$http', function(cf, _, __) {
	var c = cf.get('$http') || cf('$http');
	c.put('custom-cache-url/template.html', '<div>\n\t<p>innerHTML</p>\n</div>');
}]);