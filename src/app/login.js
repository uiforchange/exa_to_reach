var login_check = angular.module("login_check",['ngStorage']);

login_check.controller(
    "Login_Controller",
    function($scope,$http,$window,$location,$stateParams,GetHostUrl,$state, $rootScope, $localStorage)
    {
        $localStorage.$reset();
        
        console.log("GetHostUrl.loggedIn "+GetHostUrl.loggedIn)
        
        if($localStorage.loggedIn == "True"){
             $(".login-footer").hide();
            $(".header").show();
            $(".footer").show();
           $state.go('dashboard');
        }
        else{
        $localStorage.$reset();
            $(".header").hide();
            $(".footer").hide();
             $(".login-footer").show();
           $("#loginDiv").parent().parent().css( "background-color", "#99c600" );
            GetHostUrl.backValue = ""
        }
             $scope.loadotherservice = function()
              {
                 var url= "http://10.20.0.176:7070/CampaignInBox/services/WSCampaign/campaigns/getNotification";
                $http({
                method  : 'POST',
                url     : url,
                //forms user object
                data    : 
                                    $.param({
                                        userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                                        sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                                        authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
                                    }), 
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .success(function(data)
                {
                console.log(data); 
                $localStorage.getnotification=data.NotificationList;
                $localStorage.getnotificationNotilist=data;
                $localStorage.count=data.NotificationList.unread;
                if($scope.getnotifications)
      {
        
        if($scope.getnotifications.notifications.length!= undefined && $scope.getnotifications.notifications.length>1)
        {
          for(var i=0;i<$scope.getnotifications.notifications.length;i++)
          {
            if($scope.getnotifications.notifications[i].message=="Conversation Reviewing")
            {
              $scope.getnotifications.notifications[i].getreviewer="review";
            }
            if($scope.getnotifications.notifications[i].message=="Conversation Approved")
            {
              $scope.getnotifications.notifications[i].getreviewer="approve";
            }
          }
             for(var i=0;i<$scope.getnotifications.notifications.length;i++)
              {
              if($scope.getnotifications.notifications[i].updateTime)
              {
                var c= $scope.getnotifications.notifications[i].updateTime;
                $scope.getnotifications.notifications[i].gettime="c";
              }
          }
        }
        else
        {
         a=[];
         a.push($localStorage.getnotification.notifications);
         console.log(a);
         $localStorage.getnotification.notifications=a;
         
          if($scope.getnotifications.notifications.message=="Conversation Reviewing")
          {
            $scope.getnotifications.notifications.getreviewer="review";
            console.log($scope.getnotifications.notifications.getreviewer);
          }
          if($scope.getnotifications.notifications.message=="Conversation Approved")
          {
            $scope.getnotifications.notifications.getreviewer="approve";
            console.log($scope.getnotifications.notifications.getreviewer);
          }   
          if($scope.getnotifications.notifications.updateTime)
          {
            var c= $scope.getnotifications.notifications.updateTime;
            $scope.getnotifications.notifications.gettime=c;
            console.log($scope.getnotifications.notifications.gettime);
          }
        }
        }
                if($localStorage.count>0)
                {$('#headernotifi').addClass("not-value")}
                if($localStorage.count==0)
                {angular.element(document).find("#headernotifi").html("");
            $('#headernotifi').removeClass("not-value");$('#headernotifi').addClass("not-value1");}
                if($localStorage.count>0)
                {angular.element(document).find("#headernotifi").html($localStorage.count);}
                $state.go('dashboard');
                });
              }
        $scope.check = function() 
        {
        if($scope.user_name==""||$scope.pass=="")
        {
            $scope.err="Enter Valid User Name and Password";
        }
        else
        {
            // if($scope.user_name =="creator"){
            //     GetHostUrl.loginUserType = "creator"
            // }
            // else if($scope.user_name == "checking"){
            //     GetHostUrl.loginUserType = "reviewer"
            // }

            var urls =  GetHostUrl.hostUrl+'/login/loginUser';
            //var url =  GetHostUrl.hostUrl+'/campaign/listCampaign/login';
            $http({
            method  : 'POST',
            url     : urls,
            data    : {
                username:"creator",
                password:"creator"
            },
            headers : {'Content-Type': 'application/json'}
            })
            .success(function(data)
            {
              console.log(data);
              GetHostUrl.authToken = data.authKey;
               $localStorage.authToken = data.authKey
              
            })

            var url =  GetHostUrl.cvmUrl+'/WSUser/users/login';
            $http({
            method  : 'POST',
            url     : url,
            data    : 
            $.param({
                username:$scope.user_name,
                password:$scope.pass
            }), 
            // transformRequest: function(data) {
            // var str = [];
            // for(var p in data)
            // str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
            // return str.join("&");
            // },
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data)
            {
              console.log(data);
              $rootScope.userDetails=data;
              $localStorage.loginUserDet = data;
              $localStorage.loginUserDetRole = data.LoginStatus.user.level;
              console.log($localStorage.loginUserDetRole);
              console.log($localStorage.loginUserDet);
              if((data.LoginStatus.message)=="")
              {
         GetHostUrl.authToken = data.authKey;
                 $localStorage.authkeyupdate=data.authKey;
                 GetHostUrl.userName = $scope.user_name;
                username = $scope.user_name;
                $rootScope.userLoginType = data.LoginStatus.user.level;
                $localStorage.loginUserTypecre = data.LoginStatus.user.level;
                $localStorage.loginUserDetRole = data.LoginStatus.user.level;
                $localStorage.userName = $scope.user_name;
                $localStorage.headerss = {'Content-Type': 'application/json', 'AUTH_TOKEN':$localStorage.authToken};
                console.log($localStorage.headerss)
                angular.element(document).find("#loginuser").html("WELCOME, " +$localStorage.userName);
                
                angular.element(document).find(".login-footer").hide();
                $localStorage.loginUserType =$scope.user_name;
                $localStorage.loginFooter="False";
                $localStorage.loggedIn="True";
                $(".header").show();
                angular.element(document).find(".footer").show();
               $scope.loadotherservice();
              }
              else
              {
                $scope.err= data.LoginStatus.message;
              }
         

            });
        }
    };
})