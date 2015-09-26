
var diaryApp = angular.module('diaryApp',[]);
diaryApp.controller('diaryController',['$scope',function($scope){
	$scope.location = getLocation();
}]);

$(document).ready(function() {
	
	getLocation();
	
	$('#log').on('click', function() {
		$('#entryinfo').show();
		$('#log').hide();
	});
	
	$('#cancellog').on('click', function() {
		$('#log').show();
		$('#entryinfo').hide();
	});
	
	
	function padleft(str,dig) {
		var zeros = '';
		for(i=0;i<dig;i++){
			zeros+='0';
		}
		return (zeros+str).slice(0-dig);
	}
	
	/*
	 * Fill in form buttons for each media type included
	 */
	function updateForm() {
	}
	
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
	$('#datebox-detail').html(today);
});