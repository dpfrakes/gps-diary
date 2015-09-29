var diaryApp = angular.module('diaryApp',[]);
diaryApp.controller('diaryController',['$scope',function($scope){
	getLocation();
}]);

$(document).ready(function() {
	
	
	
	
	
	
	
	var myUrl;
	
	navigator.geolocation.getCurrentPosition(updateLGS, error);
	
	function updateLGS(position) {
		//var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		//console.log(locJSON);
		myUrl = getMyUrl(position.coords.latitude,position.coords.longitude);
		getLocation(myUrl);
	}
	function error(e) {
		console.error('Error (' + e.code + '): cannot get current location');
		//var defaultLat = 38.88498248850142;
		//var defaultLon = -77.02302372548729;
		myUrl = getMyUrl(0,0);
		updateFormWithLocation('Location Unknown');
	}
	function updateFormWithLocation(s) {
		document.getElementById("locationgoeshere").innerHTML = s;
	}
	function getMyUrl(lat,lon){
		return 'https://maps.googleapis.com/maps/api/geocode/json';
	}
	function getLocation(url,lat,lon) {
		$.ajax({
			url: url,
			type: "get",
			data:{latlng:lat+','+lon,key:apiKey},
			success: function(response) {
				//var jsonObj = JSON.parse(JSON.stringify(response));
				//var firstAddress = jsonObj.results[0].address_components[0];
				//updateFormWithLocation(firstAddress.long_name);
				updateFormWithLocation(JSON.stringify(response));
			},
			error: function(e) {
				console.error('Error retrieving JSON');
			}
		});
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	$("#testslide").click(function() {
		$("#testslidecontent").slideToggle( "fast" );
	});
	
	getLocation();
	
	var hasNote = false;
	var hasPhoto = false;
	var hasVideo = false;
	var hasAudio = false;
	
	function setColor(e,b){
		console.info(e.attr('id') + " : " + b);
		var c = b ? 'green' : 'buttonface';
		e.css("background-color",c);
	}
	
	function handleFiles(files) {
		setColor($('#noteSelect'),hasNote);
		setColor($('#photoSelect'),hasPhoto);
		setColor($('#videoSelect'),hasVideo);
		setColor($('#audioSelect'),hasAudio);
	}
	
	function nn(a){
		if(a == null || a == '')
			return false;
		return true;
	}
	
	$('#log').click(function() {
		$('#entryinfo').show();
		$('#log').hide();
	});
	
	$('#cancellog').click(function() {
		$('#testslidecontent').slideUp( "fast" );
	});
	
	function padleft(str,dig) {
		var zeros = '';
		for(i=0;i<dig;i++){
			zeros+='0';
		}
		return (zeros+str).slice(0-dig);
	}
	
	$('.fileElem').change(function() {
		console.log(this.id);
		console.log(this.value);
		var v = this.value;
		
		switch (this.id) {
			case 'noteElem': hasNote=nn(v);
				break;
			case 'photoElem': hasPhoto=nn(v);
				break;
			case 'videoElem': hasVideo=nn(v);
				break;
			case 'audioElem': hasAudio=nn(v);
		}
		handleFiles(this);
	});
	
	document.querySelector('#noteSelect').addEventListener('click', function(e) {
		var fileInput = document.querySelector('#noteElem');
		fileInput.click();
	}, false);
	document.querySelector('#photoSelect').addEventListener('click', function(e) {
		var fileInput = document.querySelector('#photoElem');
		//click(fileInput); // Simulate the click with a custom event.
		fileInput.click(); // Or, use the native click() of the file input.
	}, false);
	document.querySelector('#videoSelect').addEventListener('click', function(e) {
		var fileInput = document.querySelector('#videoElem');
		fileInput.click();
	}, false);
	document.querySelector('#audioSelect').addEventListener('click', function(e) {
		var fileInput = document.querySelector('#audioElem');
		fileInput.click();
	}, false);
	
	// Display date on top of form
	var today = new Date();
	var mm = today.getMonth()+1;
	var dd = today.getDate();
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var mi = today.getMinutes();
	if(hh<12)
		var meridiem = 'AM'
	else{
		meridiem = 'PM'
		hh=hh-12;
	}
	$('#datebox').html(mm+'/'+dd+'/'+yyyy+' '+hh+':'+padleft(mi,2)+' '+meridiem);
});