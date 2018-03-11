//App Config

var selectedDate ={};
var refCodes ={};
var loggedIn=false;
var username ="";
var op='f';
var imgs = [];
// function preventBack(){window.history.forward();}
//   setTimeout("preventBack()", 0);
//   window.onunload=function(){null};
var app = angular.module('communicator',
                                    [
                                        'ui.router',
                                        'angularMoment',
                                        'ngSanitize',                                     
                                        'design_and_selection',
                                        'messaging',
                                        'login_check',
                                        'forgot_pass',
                                        'forgot_pass_auth',
                                        'change_pass',
                                        'dashboard',
                                        'contactlist',
                                        'creative_edit',
                                        'finalize_messaging',
                                        'select_design',
                                        'finalize_design',
                                        'finalize_design_edit',
                                        'finalize',
                                        'editor',
                                        'angular-medium-editor',
                                        'ui.sortable',
                                        'sms_controller',
                                        'sign_up',
                                        'ngStorage',
                                        'plan_upgrade1',
                                        'profile_update',
                                        'adminSetting',
                                        'emailPlugin',
                                        'makePaymentSummary',
                                        'createnewcampaign',
                    'campaignperformance',
                    'completereport',
                                        'plan_selection',
                                        'campaignSchedulingSettings',
                                        'mailerSettings',
                                        'configureSettings',
                                        'manageResponseHistory',
                                        'manageUsers',
                                        'manageDataBase',
                                        'createuser',
                                        'createsegments',
                    'upload_layout',
                    'setFiters'
                                    ]
                        ); 

//Route Config

app.config(
 
    function($stateProvider, $urlRouterProvider,$httpProvider)
    {
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/login");
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $stateProvider
      .state('dsn', 
      {
          url:"/dsn",
          templateUrl:"design_and_selection.html",
          controller:"Design_Controller"
      }
      )
      .state('login', 
      {
          url:"/login",
          templateUrl:"login.html",
          controller:"Login_Controller"
      }
      )
     .state('campaignperformance', 
      {
          url:"/campaignperformance",
          templateUrl:"campaignPerformance.htm",
          controller:"campaignperformanceController"
      }
      )
      .state('completereport', 
      {
          url:"/completereport",
          templateUrl:"completeReport.htm",
          controller:"completereportController"
      }
      )
      .state('change_pass', 
      {
          url:"/change_pass",
          templateUrl:"change_password.html",
          controller:"Change_Pass_Controller"
      }
      )
      .state('forgot_pass', 
      {
          url:"/forgot_pass",
          templateUrl:"forgot_password.html",
          controller:"Forgot_Pass_Controller"
      }
      )
      .state('forgot_pass_auth', 
      {
          url:"/forgot_pass_auth/:user?code",
          templateUrl:"forgot_pass_auth.html",
          controller:"Forgot_Pass_Auth_Controller"
      }
      )
    .state('dashboard', 
      {
          url:"/dashboard/:update",
          templateUrl:"dashboard.html",
          controller:"Dashboard_Controller"
      }
      ) 
      .state('contact_list', 
      {
          url:"/contact_list/:id",
          templateUrl:"contact-list.html",
          controller:"contact_list_Controller"
      }
      )
      .state('msg', 
      {
          url: "/msg/:id",
          templateUrl:"messaging.html",
          controller:"Messaging_Controller"
      }
      )
      .state('fmsg', 
      {
          url: "/fmsg/:id?style",
          templateUrl:"finalize_messaging.html",
          controller:"Finalize_Messaging_Controller"
      }
      )
      .state('sdsn', 
      {
          url: "/sdsn/:id?style",
          templateUrl:"select_design.html",
          controller:"Select_Design_Controller"
      }
      )
      .state('fdsn', 
      {
          url: "/fdsn/:id?style&step",
          templateUrl:"finalize_design.html",
          controller:"Finalize_Design_Controller"
      }
      )
      .state('creative-edit', 
      {
          url: "/creative-edit/:id?style&step",
          templateUrl:"creative_edit.html",
          controller:"Creative_Edit_Controller"
      }
      )
      .state('fdsne', 
      {
          url: "/fdsne/:id?style&step",
          templateUrl:"finalize_design_edit.html",
          controller:"Finalize_Design_Edit_Controller"
      }
      )
      .state('editor', 
      {
          url: "/editor/:id?style&step",
          templateUrl:"editor_test.html",
          controller:"Editor_Controller"
      }
      )
      .state('finalize', 
      {
          url: "/finalize/:id?style&step",
          templateUrl:"finalize.html",
          controller:"Finalize_Controller"
      }
      )
      .state('sign_up', 
      {
          url: "/sign_up",
          templateUrl:"signup.html",
          controller:"Signup_Controller"
      }
      )
    .state('plan-upgrade', 
      {
          url:"/plan-upgrade",
          templateUrl:"plan-upgrade.html",
          controller:"planupgrade_Controller"
      }
      )
     .state('profile-update', 
      {
          url:"/profile-update",
          templateUrl:"profile-update.html",
          controller:"profileupdate_Controller"
      }
      )
       .state('adminSetting', 
      {
          url:"/adminSetting",
          templateUrl:"adminsetting.html",
          controller:"adminsettingController"
      }
      )
      .state('sms', 
      {
          url:"/sms",
          templateUrl:"SMS.html",
          controller:"smsController"
      }
      )
      .state('emailPlugin', 
      {
          url:"/emailPlugin",
          templateUrl:"emailpluginSet.html",
          controller:"emailPluginController"
      }
      )
      .state('paymentSummary', 
      {
          url:"/paymentSummary",
          templateUrl:"make-payment-summary.html",
          controller:"makePaymentSummaryController"
      }
      )
      .state('createcampaign', 
      {
          url:"/createnewcampaign",
          templateUrl:"createnewcampaign.html",
          controller:"createCampaignController"
      }
      )
      .state('plan-selection', 
      {
          url:"/plan-selection",
          templateUrl:"plan-selection.html",
          controller:"planselection_Controller"
      }
      )
      .state('manageDataBase', 
      {
          url:"/manageDataBase",
          templateUrl:"manageDataBase.html",
          controller:"manageDataBase_Controller"
      }
      )
      .state('manageUsers', 
      {
          url:"/manageUsers/:update",
          templateUrl:"manageUsers.html",
          controller:"manageUsers_Controller"
      }
      )
      .state('manageResponseHistory', 
      {
          url:"/manageResponseHistory",
          templateUrl:"manageResponseHistory.html",
          controller:"manageResponseHistory_Controller"
      }
      )
      .state('configureSettings', 
      {
          url:"/configureSettings",
          templateUrl:"configureSettings.html",
          controller:"configureSettings_Controller"
      }
      )
      .state('mailerSettings', 
      {
          url:"/mailerSettings",
          templateUrl:"mailerSettings.html",
          controller:"mailerSettings_Controller"
      }
      )
      .state('campaignSchedulingSettings', 
      {
          url:"/campaignSchedulingSettings",
          templateUrl:"campaignSchedulingSettings.html",
          controller:"campaignSchedulingSettings_Controller"
      }
      )
      .state('createuser', 
      {
          url:"/createuser/:adminId",
          templateUrl:"createuser.html",
          controller:"createuserController"
      }
      )
      .state('createsegments', 
      {
          url:"/createsegments",
          templateUrl:"createsegments.html",
          controller:"createsegmentsController"
      }
      )
    .state('setFilter', 
      {
          url:"/setFilter?edit",
          templateUrl:"set_filters.html",
          controller:"setFiters_Controller"
      }
      )
    .state('upload_layout', 
      {
          url:"/upload_layout",
          templateUrl:"upload_layout.html",
          controller:"upload_layout_Controller"
      }
      )
    }
)

app.controller("indexController",function ($scope, $http, $window, $location, $stateParams, GetHostUrl, $state, $timeout, $rootScope, $localStorage) {
  $scope.getproductid=function(){
    $http({
      method: 'POST',
      url: GetHostUrl.cvmUrl + '/WSCampaign/campaign/getActiveCampaignDetails',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: $.param({
          userId: $localStorage.loginUserDet.LoginStatus.user.userId,
          sessionId: $localStorage.loginUserDet.LoginStatus.sessionId,
          authToken: $localStorage.loginUserDet.LoginStatus.user.authToken,
          activeCampaignId: $localStorage.campId
        })
      })
      .then(function (response) {
        $localStorage.activecampaignproductid = response.data.Response.data.activeCampaignProductId;
        $localStorage.activecampaignproductname = response.data.Response.data.activeCampaignProduct;
      })
  }
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
  $scope.toPage = toState.controller;
  $scope.fromPage = fromState.controller;
  if($scope.toPage == "Finalize_Messaging_Controller"){
  }
  if($scope.toPage == "Design_Controller"){
    $scope.getproductid();
  }
    });
  
      //$rootScope.loggedInUserName = $localStorage.userName;
      $scope.loggedInUserName=$localStorage.userName;
      $scope.getnotifications=$localStorage.getnotification;
      $scope.loginUserDetRoleName=$localStorage.loginUserDetRole;
      $scope.getnotificationNotilist=$localStorage.getnotificationNotilist;
      var idArray= $scope.getnotifications;
      
      // if($scope.loginUserDetRoleName=="creator")
      // {
        
      // $scope.loginUserDetRole=1;
      
      // }
      // if($scope.loginUserDetRoleName=="admin")
      // {
        
      // $scope.loginUserDetRole=0;
      // }
      // if($scope.loginUserDetRoleName=="reviewer")
      // {
        
      // $scope.loginUserDetRole=2;
      // }
      // console.log($scope.loginUserDetRole);
      $scope.createcampaignPerformance= function()
      {
        
        $state.go('campaignperformance');
      }
       $scope.createcompleteReport= function()
      {
        
        $state.go('completereport');
      }
      if($scope.getnotifications)
      { 
        $scope.count= $scope.getnotifications.unread;
        if($scope.count>1)
         {
       
        angular.element(document).find("#headernotifi").html($scope.count);
        }
      
      if($scope.count==0)
      {
       
      $scope.count="";
      }
      } 
      //   if($scope.getnotifications.notifications.length!= undefined && $scope.getnotifications.notifications.length>1)
      //   {
      //   for(var i=0;i<$scope.getnotifications.notifications.length;i++)
      //     {  
      //     $scope.count= 1;
      //     if($scope.getnotifications.notifications[i].status==0)
      //     {
      //       $scope.count = $scope.count + i;
      //       console.log($scope.count);
      //     }
      //   }
      // }
      // else
      // {
      //   $scope.count= 1;
      // }
      console.log($scope.count);
      $scope.headernotifi= function()
      {
        moment.lang('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s",
        s:  "seconds",
        m:  "1m",
        mm: "%d m",
        h:  "1h",
        hh: "%d h",
        d:  "1d",
        dd: "%d d",
        M:  "1m",
        MM: "%d m",
        y:  "1y",
        yy: "%dy"
    }
  })
       $(".notify + .dropdown-menu:before").css({'left': '70% !important'});
       console.log($scope.getnotificationNotilist);
        $http({
              method:"POST",
              url:GetHostUrl.cvmUrl+"/WSCampaign/campaigns/updateNotificationHistory",
              headers : {'Content-Type': 'application/x-www-form-urlencoded'},
              data:$.param({
                  userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                  sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                  authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                  userRole:$localStorage.loginUserDetRole
              })

          })
        if($localStorage.getnotification.notifications)
        {
          $scope.idris=true;
          $scope.idris1=false;
        }
        else
        {
         $scope.idris1=true; 
         $scope.idris=false; 
        }
        if($scope.idris1==true)
        {
          
          $('.dropdown-menu').addClass("dfgdfg");
        }
        else
        {
        $('.dropdown-menu').removeClass("dfgdfg"); 
         $('#headernotifi').removeClass("not-value"); 
        }
       // if(Array.isArray($scope.getnotificationNotilist.NotificationList.notifications))
       // {
       //  $scope.idris=true;
       // }
       // else
       // {
       //  $scope.idris1=true;
       // }
         if($localStorage.count="")
        {
          {angular.element(document).find("#headernotifi").html("");}
         
         $scope.count=$localStorage.count;
        $scope.getnotifications=$localStorage.getnotification;
        }
        if($localStorage.count>0)
                {$('#headernotifi').addClass("not-value")}
                if($localStorage.count==0)
                {angular.element(document).find("#headernotifi").html("");
            $('#headernotifi').removeClass("not-value");$('#headernotifi').addClass("not-value1");}
                if($localStorage.count>0)
                {angular.element(document).find("#headernotifi").html($localStorage.count);}
         
         $scope.count=$localStorage.count;
        $scope.getnotifications=$localStorage.getnotification;
      console.log($scope.getnotifications);
      $scope.loginUserDetRoleName=$localStorage.loginUserDetRole;
      // if($scope.loginUserDetRoleName=="creator")
      // {
        
      // $scope.loginUserDetRole=1;
      
      // }
      // if($scope.loginUserDetRoleName=="admin")
      // {
        
      // $scope.loginUserDetRole=0;
      // }
      // if($scope.loginUserDetRoleName=="reviewer")
      // {
        
      // $scope.loginUserDetRole=2;
      // }
      console.log($scope.loginUserDetRoleName);
      $scope.count= "";
      if($scope.getnotifications)
      { 
      $scope.count= $scope.getnotifications.unread;
      console.log($scope.count);
      if($scope.count==0)
      {
        angular.element(document).find("#headernotifi").html("");
       $scope.count=""; 
      }
      //   if($scope.getnotifications.notifications.length!= undefined && $scope.getnotifications.notifications.length>1)
      //   {
      //   for(var i=0;i<$scope.getnotifications.notifications.length;i++)
      //     {  
      //     $scope.count= 1;
      //     if($scope.getnotifications.notifications[i].status==0)
      //     {
      //       $scope.count = $scope.count + i;
      //       console.log($scope.count);
      //     }
      //   }
      // }
      // else
      // {
      //   $scope.count= 1;
      // }
      } 
      console.log($scope.count);
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
             if($scope.getnotifications.notifications[i].message=="Conversation Rejected")
            {
              $scope.getnotifications.notifications[i].getreviewer="reject";
            }
             if($scope.getnotifications.notifications[i].message=="Communicator Rejected")
            {
              $scope.getnotifications.notifications[i].getreviewer="reject";
            }
            if($scope.getnotifications.notifications[i].message=="Communicator Approved")
            {
              $scope.getnotifications.notifications[i].getreviewer="approve";
            }
            if($scope.getnotifications.notifications[i].message=="Communicator Reviewing")
            {
              $scope.getnotifications.notifications[i].getreviewer="review";
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
         if(Array.isArray($localStorage.getnotification.notifications)){
          return false;
         }else{
         a.push($localStorage.getnotification.notifications);
         console.log(a);
         $localStorage.getnotification.notifications=a;
         
          if($scope.getnotifications.notifications[0].message=="Conversation Reviewing")
          {
            $scope.getnotifications.notifications[0].getreviewer="review";
            console.log($scope.getnotifications.notifications[0].getreviewer);
          }
          if($scope.getnotifications.notifications.message=="Conversation Approved")
          {
            $scope.getnotifications.notifications.getreviewer="approve";
            console.log($scope.getnotifications.notifications.getreviewer);
          }   
           if($scope.getnotifications.notifications.message=="Conversation Rejected")
          {
            $scope.getnotifications.notifications.getreviewer="reject";
            console.log($scope.getnotifications.notifications.getreviewer);
          }  
           if($scope.getnotifications.notifications.message=="Communicator Reviewing")
          {
            $scope.getnotifications.notifications.getreviewer="review";
            console.log($scope.getnotifications.notifications.getreviewer);
          }
          if($scope.getnotifications.notifications.message=="Communicator Approved")
          {
            $scope.getnotifications.notifications.getreviewer="approve";
            console.log($scope.getnotifications.notifications.getreviewer);
          }   
           if($scope.getnotifications.notifications.message=="Communicator Rejected")
          {
            $scope.getnotifications.notifications.getreviewer="reject";
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
        }
      $scope.clicker=1;
        $scope.clicker=0;
         
        $scope.count="";
      }
       

    //   console.log("$scope.loggedInUserName" + $scope.loggedInUserName)
    //   console.log("$localStorage.loginFooter" + $localStorage.loginFooter)
      if($localStorage.loginFooter=="False"){
          angular.element(document).find(".login-footer").hide();
          angular.element(document).find(".footer").show();
      }
      else{
          angular.element(document).find(".login-footer").show();
          angular.element(document).find(".footer").hide();
      }

      $scope.goHome=function()
      {   
          if($localStorage.loggedIn=="True"){
    
              $state.go('dashboard');
            }
            else{
                $(".header").hide();
                $state.go("login");
                $("#loginDiv").parent().parent().css( "background-color", "#98c900" );
                GetHostUrl.backValue = ""
                $("body").addClass( "body-bg" );
            }     
      }
    $scope.logout=function()
    {
      console.log("true");
        
        $localStorage.loggedIn="False";       
        $state.go("login");
        $("#loginDiv").parent().parent().css( "background-color", "#98c900" );
        $("body").addClass( "body-bg" );
    
    }

    
})

//Global URL Variable

app.factory('GetHostUrl', function() {

    //var url = 'http://localhost/exareach/';
    var temp="some";
    var url = 'http://10.20.0.178';
    //var url = 'http://exareachcomm.xerago.com';
    var port = '8070';
    // var url = 'http://10.20.0.224';
    // var port = '8070';
    //var contentRepoUrl = 'http://cvmclient1.xerago.com';
    //var contentRepoPort = '3000';
    var contentRepoUrl ='http://10.20.0.177';
    var contentRepoPort ='3000';


    //var cvmServer =  "http://138.68.21.161";
    //var cvmServer =  "http://10.20.0.176";
    var cvmServer =  "http://exareachdev.xerago.com";
    var cvmPort = "7070/CampaignInBox/services";
    return {
        host : url,
        hostUrl : url+":"+port,
        repoUrl : contentRepoUrl+":"+contentRepoPort,
        //repoUrl : url+":"+port,
        cvmUrl : cvmServer+":"+cvmPort
    };

});

// app.factory('GetHostUrl', function() {

//     //var url = 'http://localhost/exareach/';
//     var temp="some";
//     var url = 'http://10.20.0.178';
//     //var url = 'http://exareachcomm.xerago.com';
//     var port = '8070';
//     // var url = 'http://10.20.0.224';
//     // var port = '8070';
//     var contentRepoUrl = 'http://cvmclient1.xerago.com';
//     var contentRepoPort = '3000';

//     //var cvmServer =  "http://138.68.21.161";
//     var cvmServer =  "http://10.20.0.176";
//     var cvmPort = "8080/CampaignInBox/services";
//     var generatedAuthKey = $localStorage.authkeyupdate;
//     var headers = {'Content-Type': 'application/json', 'AUTH_TOKEN': generatedAuthKey};
//     return {
//         host : url,
//         hostUrl : url+":"+port,
//         repoUrl : contentRepoUrl+":"+contentRepoPort,
//         cvmUrl : cvmServer+":"+cvmPort,
//         dynamicHeaders : headers
//     };

// });
