var change_pass = angular.module("change_pass",['ngStorage']);

change_pass.controller(
    "Change_Pass_Controller",
    function($scope,$http,$window,$location,$stateParams,GetHostUrl,$state,$timeout,$localStorage)
    {
        if($localStorage.loggedIn=="True"){
        }
        else{
            $state.go("login");
            $("#loginDiv").parent().parent().css( "background-color", "#98c900" );
            $("body").addClass( "body-bg" );
        }
        var url = GetHostUrl.hostUrl+"/login/changeUserPassword";
        //var url = 'http://10.3.0.12:9030/login/changeUserPassword';
        $scope.showError=false;
        $(".footer").hide();
        $(".login-footer").show();
        $("#loginDiv").parent().parent().css( "background-color", "#98c900" );
        $("body").addClass( "body-bg" );
        $scope.change = function ()
        {
            $scope.error = false;
            $scope.success = false;
            $http(
                {
                    method  : 'POST',
                    url     : url,
                    data    : {
                                   "newpassword":$scope.new_pass,
                                   "username":"creator",
                                   "oldpassword":$scope.old_pass
                              },
                    headers : {'Content-Type': 'application/json'}
                }
        )
        .success(
            function(data)
            {
                console.log(data);
                if(data.result=="Updated")
                {
                    $scope.success = true;
		            $localStorage.loggedIn="False";
                    $timeout(function(){
                         $state.go("login");
                         $("#loginDiv").parent().parent().css( "background-color", "#98c900" );
                         $("body").addClass( "body-bg" );
                     },1000);
                }
                else
                {
                    $scope.error = true;
                     
                }
            }
        )
        }
        $scope.old_pass=$scope.new_pass=$scope.conf_new_pass = '';
         
    })
