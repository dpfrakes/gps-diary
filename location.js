function getLocation() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;

		console.log('Your current position is:');
		console.log('Latitude : ' + crd.latitude);
		console.log('Longitude: ' + crd.longitude);
		console.log('More or less ' + crd.accuracy + ' meters.');
		
		/* Google Location API to return country name of coordinates */
		/* If location is large country, use city; otherwise country */
		var c = '' /* TODO */;
		if(c.toUpperCase == 'UNITED STATES OF AMERICA') {
			c = '' /* TODO : city */;
		}
			
		$scope.$apply(function() {
			$scope.location = c;
		});
	};

	function error(err) {
		console.warn('ERROR ' + err.code + ' : ' + err.message);
	};
	
	navigator.geolocation.getCurrentPosition(success, error, options);
}