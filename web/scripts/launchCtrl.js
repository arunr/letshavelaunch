var launchPage = angular.module('launchPage', []);

function LaunchCtrl($http, $scope) {
	$scope.user = {email : ""};
	$scope.user.thank_you = false;
	$scope.user.error = false;

	$scope.addUserToBeta = function() {
		if($scope.user.email !== "")
		{
			$http.post('/api/v1/launch/users', {email: $scope.user.email}).success(function(data, status, header, config){
				$scope.user.thank_you = true;
			}).error(function(data, status, header, config){
				$scope.user.error = true;
			});
		}
	}

}