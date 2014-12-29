angular.module('demo').
run(['$cacheFactory', '$templateCache', '$http', function(cf, _, __) {
	var c = cf.get('$http') || cf('$http');
	c.put('test/fixtures/singlequotes.html', '<escape>
	<p>'Single quote'<p>
</escape>');
}]);