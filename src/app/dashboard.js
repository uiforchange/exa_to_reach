var dashboard = angular.module("dashboard", ['angular-medium-editor','ngStorage','ngPatternRestrict']);

dashboard.controller(
    "Dashboard_Controller",
    function ($scope, $http, $window, $location, $stateParams, GetHostUrl, $state, $timeout,$rootScope,$localStorage) {
        $("#loginDiv").parent().parent().css( "background-color", "#e6e6e6" );
        $("body").removeClass( "body-bg" );
        // $(".startDate")
        // .datepicker(
        // {

        // dateFormat : 'yy-mm-dd',
        // defaultDate: $scope.createdOn
        // });



        // $(".endDate")
        // .datepicker(
        // {
        // defaultDate: $scope.expireOn,
        // dateFormat : 'yy-mm-dd'

        // });
        var url= GetHostUrl.cvmUrl+"/WSCampaign/campaigns/getNotification";
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
            console.log($scope.getnotification);
        $scope.getnotifications=data.NotificationList;
            if($scope.getnotifications)
          {
          $scope.count= $scope.getnotifications.unread;
          console.log($scope.count);
           console.log($scope.getnotifications);
          angular.element(document).find("#headernotifi").html($scope.count);
          $('#headernotifi').removeClass("not-value1");$('#headernotifi').addClass("not-value");
          if($scope.count==0)
          {
           angular.element(document).find("#headernotifi").html("");
           $('#headernotifi').removeClass("not-value");$('#headernotifi').addClass("not-value1");
          }
          }
          


        });

        /**Based on users login */
        $scope.userLoginType = $localStorage.loginUserType;
        $scope.userRole = $scope.userLoginType;
        $scope.userLoginCre = $localStorage.loginUserTypecre;
        console.log("userLoginCre" + $scope.userLoginCre)
        $localStorage.showsave= true;
        $scope.updateBtn = $localStorage.showsave;
        if($localStorage.loggedIn=="True"){
        }
        else{
            $state.go("login");
            $("#loginDiv").parent().parent().css( "background-color", "#98c900" );
            $("body").addClass( "body-bg" );
        }
        $scope.showInfo=false;
        $scope.loading = false;
        $scope.tableData =true;
        console.log("$stateParams.update" + $stateParams.update + "$rootScope.infoMsgforCreation" + $rootScope.infoMsgforCreation)

        if($stateParams.update=="1"){
            $scope.infoMsg="Conversation has been saved successfully and sent for approval";
            $scope.showInfo=true;
        }
        $scope.noFilterValues=false;
        $scope.filterCount=0;
        $scope.showFilterCount=false;
        $scope.searchPattern=/^[A-Za-z0-9 ]*[A-Za-z]+[A-Za-z0-9 ]*$/;
/* New Services */
           
            $scope.getMetrics=function(){
                var metricsurl =  GetHostUrl.cvmUrl+'/WSCampaign/getActiveCampaignMetrics';
                        $http({
                        method  : 'POST',
                        url     : metricsurl,
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
                            $scope.reviewCount = data.ResultStatus.data.reviewPendingCamapaigns;
                            $scope.approvedCount   = data.ResultStatus.data.approvedCampaigns; 
                            $scope.rejectedCount = data.ResultStatus.data.rejectedCampaigns;
                            $scope.listreadyCount = data.ResultStatus.data.campaignsWithListReady;
                            $scope.inProgressCount = data.ResultStatus.data.campaignsInProgress;
                            $scope.messagesCount = data.ResultStatus.data.totalMessages;
                        });
            }

            $scope.getResponseStatus=function(){
                var lastweekurl =  GetHostUrl.cvmUrl+'/WSCampaign/getCampaignResponseStats';
            $http({
            method  : 'POST',
            url     : lastweekurl,
            data    : 
            $.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                isOnlyForPrevWeek:1
            }), 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data)
            {
                $scope.lastweekData = data.ResultStatus.data;
              });

              var averageurl =  GetHostUrl.cvmUrl+'/WSCampaign/getCampaignResponseStats';
            $http({
            method  : 'POST',
            url     : averageurl,
            data    : 
            $.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                isOnlyForPrevWeek:0
            }), 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data)
            {
                $scope.averageData = data.ResultStatus.data;
              });
            }

             
/* Progressbar */
GetHostUrl.authToken = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNDgyMzkyMDk3LCJzdWIiOiJYQ0FQSSIsImlzcyI6IlhFUkFHTyIsImV4cCI6MTQ4MjQ3ODQ5N30.EYGbUaEfXKww6TSrS-pZL0Abhp28p1ayDI5-6fpuuv8";
  var countUrl =   GetHostUrl.cvmUrl+'/WSCampaign/campaigns/getConversationsRemaining';
                    $http({
                    method  : 'POST',
                    url     : countUrl,
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
                console.log("status data count" + data)
                    var bar = new ProgressBar.SemiCircle(meterImg, {
                    strokeWidth: 6,
                    color: '#99c600',
                    trailColor: '#99c600',
                    trailWidth: 5,
                    easing: 'easeInOut',
                    duration: 1400,
                    svgStyle: null,
                    text: {
                        value: '',
                        alignToBottom: false
                    },
                    from: {color: '#FF9F3E'},
                    to: {color: '#FF9F3E'},
                    // Set default step function for all animate calls
                    step: (function (state, bar) {
                        bar.path.setAttribute('stroke', state.color);
                        var value = Math.round(bar.value() * 100);
                        if (value === 0) {
                            bar.setText('0');
                        } else if (value < 100) {
                            bar.setText((100-data)+"/"+100);
                        } else {
                            bar.setText("0");
                        }
                        if (data < 100) {
                            bar.setText((100-data)+"/"+100);
                        } else {
                            bar.setText('0');
                        }
                        bar.text.style.color = '#99c600';
                    })

                    // step: (state, bar) => {
                    //     bar.path.setAttribute('stroke', state.color);
                    //     var value = Math.round(bar.value() * data.plancampaigncount);
                    //     if (value === 0) {
                    //     bar.setText('0');
                    //     } else if (value <data.plancampaigncount) {
                    //     bar.setText(data.campaigncount);
                    //     }
                    //     else {
                    //     bar.setText("0");
                    //     }
                    //     if(data.campaigncount<data.plancampaigncount){
                    //         bar.setText(data.campaigncount);
                    //     }
                    //     else{
                    //         bar.setText('0');
                    //     }
                    //     bar.text.style.color = '#99c600';
                    // }
                    });
                    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                    bar.text.style.fontSize = '2rem';
                    var avgPercent=(data/100);
                    if(avgPercent<=1.0){
                         bar.animate(avgPercent);  // Number from 0.0 to 1.0
                    }
                    else{
                         bar.animate(1.0);  // Number from 0.0 to 1.0
                    }
                   
              });
/* Progressbar */

                // $scope.updateStatus=function(status,refCode){
                //     if(status=="Approved"){

                //     }
                //     else if(status=="Rejected"){

                //     }

                //      var updateStatusUrl =   GetHostUrl.hostUrl+'/campaign/updateCampaign';
                //     $http({
                //     method  : 'POST',
                //     url     : countUrl,
                //     data    : {
                //         "refCode":refCode,
                //         "status":status
                //     }, //forms user object
                //     headers : {'Content-Type': 'application/json','AUTH_TOKEN':GetHostUrl.authToken}
                //         }) 
                //     .success(function(data)
                //     {
                //     });
                // }

            //$scope.getResponseStatus();

                $scope.viewnewCampaignDetail=function(code){
                    console.log(code)
                    var viewurl =  GetHostUrl.cvmUrl+'/WSCampaign/campaign/getActiveCampaignDetails';
                    $http({
                    method  : 'POST',
                    url     : viewurl,
                    data    : 
                    $.param({
                        userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                        sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                        authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                        activeCampaignId:code
                    }), 
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                    .success(function(data){
                        $scope.showDetails = data.Response.data;
                               if($scope.showDetails.activeCampaignSpecificParams==""){
                                   $scope.showDetails.filter="No filters applied";
                                }
                                else{
                                    $scope.showDetails.filter="Filters applied";
                                }
                                if($scope.showDetails.offer==undefined){
                                    $scope.showDetails.offer="No offer exists";
                                }
                                if($scope.activecampaigns[i].status == "2")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "3")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "1")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "7"){
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "8")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "9")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "4")
                        {
                            $scope.activecampaigns[i].icon = 'ready';
                            $scope.activecampaigns[i].status = 'List Ready';
                        }
                        if($scope.activecampaigns[i].status == "5")
                        {
                            $scope.activecampaigns[i].icon = 'progress';
                            $scope.activecampaigns[i].status = 'In Progress';
                        }
                                $scope.showDetails.stdate = $scope.returnDate($scope.showDetails.campaignStartDate,0,'day');
                                $scope.showDetails.stmonth = $scope.returnDate($scope.showDetails.campaignStartDate,0,'month');
                                $scope.showDetails.date1 = $scope.returnDate($scope.showDetails.campaignStartDate,0,'day') +' ' + $scope.returnDate($scope.showDetails.campaignStartDate,0,'month');
                                $scope.showDetails.endate = $scope.returnDate($scope.showDetails.campaignEndDate,0,'day');
                                $scope.showDetails.enmonth = $scope.returnDate($scope.showDetails.campaignEndDate,0,'month');
                                $scope.showDetails.date2 = $scope.returnDate($scope.showDetails.campaignEndDate,0,'day') +' ' + $scope.returnDate($scope.showDetails.campaignEndDate,0,'month');
                                

                    });
                }


            $scope.showActiveCampaign=true;
            $scope.showCompletedCampaign=false;
            $scope.showWatchedCampaign=false;
            $scope.activeClass=1;
            $scope.activeCampaign=true;
            $scope.reuseCompleted=false;
            $scope.reviewCompleted=true;
            if($scope.userLoginCre==1){
                $scope.getMetrics();
            }
            else if($scope.userLoginCre==2){
                $scope.getResponseStatus();
            }
            $scope.firstfn = function(callback){
               var campaignsurlOffersCount =  'http://10.20.0.178:8070/campaign/listCampaign';
            $http({
            method  : 'POST',
            url     : campaignsurlOffersCount,
            data   : {

            },
            headers : {'Content-Type': 'application/json','AUTH_TOKEN':$localStorage.authToken}
            })
            .success(function(data)
            {
                 $scope.campaignsurlOffersCount=data;
                 console.log($scope.campaignsurlOffersCount[0].offercounts);
                
            })
            .finally(function(){
            callback($scope.campaignsurlOffersCount);
        })
        }
           $scope.secondfn = function(data){
            var campaignsurl =  GetHostUrl.cvmUrl+'/WSCampaign/campaigns/activeCampaignsForCreator';
            $http({
            method  : 'POST',
            url     : campaignsurl,
            data    : 
            $.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                activeCampaignId:0,
                viewAll:0,
                active:1,
                favorite:1,
                searchText:"Search Your Campaign"
            }), 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data)
            {
                
                 $scope.activecampaignsObj=data;
                $scope.activecampaigns=[];
               if(data.ActiveCampaignList.activecampaigns==undefined){
				}
				else{
                if(data.ActiveCampaignList.activecampaigns.length==undefined){
                $scope.activecampaigns.push(data.ActiveCampaignList.activecampaigns);
                if($scope.activecampaigns[0].active_campaign_specific_params==""){
                        $scope.activecampaigns[0].filter="No filters applied";
                        }
                        else{
                            $scope.activecampaigns[0].filter="Filters applied";
                        }
                        // if($scope.activecampaigns[i].offer==undefined){
                        //     $scope.activecampaigns[i].offer="No offer exists";
                        // }

                       
                        if($scope.activecampaigns[0].status == "2")
                        {
                            $scope.activecampaigns[0].icondownleft = 'rej1';
                            $scope.activecampaigns[0].commname1="Creator";
                            $scope.activecampaigns[0].commname2="Communicator";
                            $scope.activecampaigns[0].icondownright = 'rej2'
                            $scope.activecampaigns[0].icon = 'succ';
                            $scope.activecampaigns[0].status = 'Approved';
                        }
                        if($scope.activecampaigns[0].status == "3")
                        {
                            $scope.activecampaigns[0].icondownleft = 'rej1';
                            $scope.activecampaigns[0].commname1="Creator";
                            $scope.activecampaigns[0].commname2="Communicator";
                            $scope.activecampaigns[0].icondownright = 'rej2'
                            $scope.activecampaigns[0].icon = 'rej';
                            $scope.activecampaigns[0].status = 'Rejected';
                        }
                        if($scope.activecampaigns[0].status == "1")
                        {
                            $scope.activecampaigns[0].icondownleft = 'rej1';
                            $scope.activecampaigns[0].commname1="Creator";
                            $scope.activecampaigns[0].commname2="Communicator";
                            $scope.activecampaigns[0].icondownright = 'rej2'
                            $scope.activecampaigns[0].icon = 'rev';
                            $scope.activecampaigns[0].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[0].status == "7"){
                            $scope.activecampaigns[0].icondownleft = 'rej3';
                            $scope.activecampaigns[0].commname1="Creator";
                            $scope.activecampaigns[0].commname2="Communicator";
                            $scope.activecampaigns[0].icondownright = 'rej4';
                            $scope.activecampaigns[0].icon = 'rev';
                            $scope.activecampaigns[0].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[0].status == "8")
                        {
                            $scope.activecampaigns[0].icondownleft = 'rej3';
                            $scope.activecampaigns[0].commname1="Creator";
                            $scope.activecampaigns[0].commname2="Communicator";
                            $scope.activecampaigns[0].icondownright = 'rej4';
                            $scope.activecampaigns[0].icon = 'succ';
                            $scope.activecampaigns[0].status = 'Approved';
                        }
                        if($scope.activecampaigns[0].status == "9")
                        {
                            $scope.activecampaigns[0].icondownleft = 'rej3';
                            $scope.activecampaigns[0].commname1="Creator";
                            $scope.activecampaigns[0].commname2="Communicator";
                            $scope.activecampaigns[0].icondownright = 'rej4';
                            $scope.activecampaigns[0].icon = 'rej';
                            $scope.activecampaigns[0].status = 'Rejected';
                        }
                        if($scope.activecampaigns[0].status == "4")
                        {
                            $scope.activecampaigns[0].icon = 'ready';
                            $scope.activecampaigns[0].status = 'List Ready';
                        }
                        if($scope.activecampaigns[0].status == "5")
                        {
                            $scope.activecampaigns[0].icon = 'progress';
                            $scope.activecampaigns[0].status = 'In Progress';
                        }
                 for(var i=0;i<$scope.campaignsurlOffersCount.length;i++)
                {
                
                    if($scope.campaignsurlOffersCount[i].refCode==$scope.activecampaigns[0].communicator_ref_code) 
                    {
                    
                    $scope.activecampaigns[0].offer=$scope.campaignsurlOffersCount[i].offercounts;
                    if($scope.campaignsurlOffersCount[i].offercounts==0) 
                    {
                    $scope.activecampaigns[0].offer="No";
                    }
                    }
                console.log($scope.activecampaigns);
                }
            }

				else{
				$scope.activecampaigns=data.ActiveCampaignList.activecampaigns;

                // if(data.ActiveCampaignList.activecampaigns.length==undefined){
                //     //$scope.activecampaigns=data.ActiveCampaignList.activecampaigns;
                //     if($scope.activecampaigns.active_campaign_specific_params==""){
                //         $scope.activecampaigns.filter="No filters applied";
                //         }
                //         else{
                //             $scope.activecampaigns.filter="Filters applied";
                //         }
                //         if($scope.activecampaigns.offer==undefined){
                //             $scope.activecampaigns.offer="No offer exists";
                //         }
                //         if($scope.activecampaigns.status == "2")
                //         {
                //             $scope.activecampaigns.icon = 'succ';
                //             $scope.activecampaigns.status = 'Approved';
                //         }
                //         if($scope.activecampaigns.status == "0")
                //         {
                //             $scope.activecampaigns.icon = 'rej';
                //             $scope.activecampaigns.status = 'Rejected';
                //         }
                //         if($scope.activecampaigns.status == "1")
                //         {
                //             $scope.activecampaigns.icon = 'rev';
                //             $scope.activecampaigns.status = 'Reviewing';
                //         }
                // }
                // else{
                    //$scope.activecampaigns=data.ActiveCampaignList.activecampaigns;
                 //      for(var i=0;i<$scope.activecampaigns.length;i++){
                        
                 // if($scope.campaignsurlOffersCount[i].refCode==$scope.activecampaigns[i].communicator_ref_code)
                 //        {
                 //        console.log($scope.campaignsurlOffersCount[i].refCode);
                 //        console.log($scope.activecampaigns[i].communicator_ref_code);
                 //          $scope.activecampaigns[i].offer=$scope.campaignsurlOffersCount[i].offercounts;
                 //        }
                 //    }
                for(var i=0;i<$scope.campaignsurlOffersCount.length;i++)
                {
                for(var j=0;j<$scope.activecampaigns.length;j++)
                {
                if($scope.campaignsurlOffersCount[i].refCode==$scope.activecampaigns[j].communicator_ref_code) 
                {
                $scope.activecampaigns[j].offer=$scope.campaignsurlOffersCount[i].offercounts;
                if($scope.campaignsurlOffersCount[i].offercounts==0) 
                {
                $scope.activecampaigns[j].offer="No";
                }
                }

                }
                }
                    for(var i=0;i<$scope.activecampaigns.length;i++){
                        
                        if($scope.activecampaigns[i].active_campaign_specific_params==""){
                        $scope.activecampaigns[i].filter="No filters applied";
                        }
                        else{
                            $scope.activecampaigns[i].filter="Filters applied";
                        }
                        // if($scope.activecampaigns[i].offer==undefined){
                        //     $scope.activecampaigns[i].offer="No offer exists";
                        // }

                       
                        if($scope.activecampaigns[i].status == "2")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "3")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "1")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "7"){
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "8")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "9")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "4")
                        {
                            $scope.activecampaigns[i].icon = 'ready';
                            $scope.activecampaigns[i].status = 'List Ready';
                        }
                        if($scope.activecampaigns[i].status == "5")
                        {
                            $scope.activecampaigns[i].icon = 'progress';
                            $scope.activecampaigns[i].status = 'In Progress';
                        }
                    }
                }
				}
              });
}
$scope.firstfn($scope.secondfn);
 
            var filterurl =  GetHostUrl.cvmUrl+'/WSCampaign/campaign/getCampaignFilters';
            $http({
            method  : 'POST',
            url     : filterurl,
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
                $scope.statusList = data.CampaignFilters.campaignStatus;
                $scope.categoryList = data.CampaignFilters.categories;
                $scope.productList = data.CampaignFilters.products;
              });

              
/* New Services */
        $scope.clientRefCodeForOffer = "e4881d00-5baa-413f-a5fd-afe2712df360";
        $scope.username = username;
        $scope.statusArray = [];
        $scope.categoryArray = [];
        $scope.productArray = []; 

        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";           
        month[3] = "Apr";           
        month[4] = "May";        
        month[5] = "Jun";          
        month[6] = "Jul";          
        month[7] = "Aug";           
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        $scope.status_icon = false;  

        $scope.name_icon = true;

        $scope.cdate_icon = false;

        $scope.contacts_icon = false; 

        $scope.fo_icon = false;

        $scope.msg_icon = false;
        
        // if(loggedIn==false)
        // {
        //     $state.go("login");
        //     $("#loginDiv").parent().parent().css( "background-color", "#98c900" );
        //     $("body").addClass( "body-bg" );
        // }
        $scope.logout=function()
        {
            $localStorage.loggedIn="False";          
            $state.go("login");
            $("#loginDiv").parent().parent().css( "background-color", "#98c900" );
            $("body").addClass( "body-bg" );
            $localStorage.clearAll();
        };

        $scope.arrayHandler= function (arr,item)
        {
            var found = jQuery.inArray(item, arr);
            if (found >= 0) 
            {
                // Element was found, remove it.
                arr.splice(found, 1);
            } 
            else 
            {
                // Element was not found, add it.
                arr.push(item);
            }
        };

        $scope.returnDate = function(inputDate,index,type){
            var splitStartDate = inputDate.split(" ");
            var start_date =splitStartDate[0];
            var st_dt1 =splitStartDate[0];
            var st_dt = st_dt1.split('-');
            $scope.start_date = start_date;

            var d1=st_dt[0]+'-'+ st_dt[1]+'-'+ st_dt[2];
            var d=new Date(d1);

            if(type==='day')
            {
                return st_dt[2];
            }
            else if(type==='month')
            {
                return month[d.getMonth()];
            }
            
        };
        $scope.redirect = function(refCode,id){
            GetHostUrl.backValue= "";
            var url = GetHostUrl.hostUrl+'/campaign/listCampaignAll';
            $http({
                method  : 'POST',
                url     : url,
                data    : 
                {
                    refCode:refCode
                }, //forms user object
                headers : {'Content-Type': 'application/json'}
            })
            .success(function(data,status)
            {
                 $localStorage.loginUserDet.LoginStatus.activeCampaignId=id;
                if(status == 200){
				console.log("createCampign1" + data);
                    $scope.showDetails = data;
                    console.log($scope.showDetails);
                    GetHostUrl.fromAssign = "assign";
                    GetHostUrl.editOrchestration = {};
                    GetHostUrl.editOrchestration.cmapignwaveall = $scope.showDetails.cmapignwaveall;
                    GetHostUrl.editOrchestration.campaigndetails =$scope.showDetails.campaigndetails;
                    GetHostUrl.editOrchestration.campaigndetails.refCode = $scope.showDetails.campaigndetails.refCode;
                    GetHostUrl.filledCode = $scope.showDetails.campaigndetails.refCode;
                    $state.go("dsn");
					$localStorage.conversationName=$scope.showDetails.campaigndetails.name;
					$localStorage.conversationDescription = $scope.showDetails.campaigndetails.description;
					
                }
            });
        }

        $scope.applyFilter =function(){
             $scope.status_new="";
           $scope.category_new="";
           $scope.product_new="";
           //$scope.filterApplied=false;
           $scope.loading = true;
           $scope.tableData =false;
                      console.log("$scope.statusList.length" + $scope.statusList.length)
                  for(var k=0;k<$scope.statusList.length;k++){
                  if($('#status'+k).prop("checked")==true){
                      console.log("$scope.statusList[k]" + $scope.statusList[k])
                      if($scope.status_new==""){
                                $scope.status_new = $scope.statusList[k];
                            }
                        else{
                                $scope.status_new = $scope.statusList[k] + "," + ($scope.status_new) ;
                            } 
                   }          
                     }
                   
                   for(var k=0;k<$scope.categoryList.length;k++){
                  if($('#category'+ $scope.categoryList[k].id).prop("checked")==true){
                      if($scope.category_new==""){
                                $scope.category_new = $scope.categoryList[k].id;
                            }
                        else{
                                $scope.category_new = $scope.categoryList[k].id + "," + ($scope.category_new) ;
                            } 
                   }          
                     }

                     for(var k=0;k<$scope.productList.length;k++){
                  if($('#product'+ $scope.productList[k].productId).prop("checked")==true){
                      if($scope.product_new==""){
                                $scope.product_new = $scope.productList[k].productId;
                            }
                        else{
                                $scope.product_new = $scope.productList[k].productId + "," + ($scope.product_new) ;
                            } 
                   }          
                     }
                     $scope.showFilterCount=true;
                     $scope.filterCount=$('input[type=checkbox]:checked').length;

            if($scope.showActiveCampaign==true){
                $scope.activeInput=1;
                $scope.favouriteInput=0;
            }
            if($scope.showWatchedCampaign==true){
                $scope.activeInput=1;
                $scope.favouriteInput=1;
            }
            if($scope.showCompletedCampaign==true){
                $scope.activeInput=0;
                $scope.favouriteInput=0;
            }
                     console.log("$scope.status_new.length" + $scope.status_new.length + "$scope.category_new.length" + $scope.category_new.length + "$scope.product_new.length" + $scope.product_new.length)
                  if($scope.status_new.length==0&&$scope.category_new.length==0&&$scope.product_new.length==0)
            {
                 
                if($scope.showActiveCampaign==true){
                    $scope.showActive();
                }
                if($scope.showCompletedCampaign==true){
                    $scope.viewCompletedCampaigns();
                }
                if($scope.showWatchedCampaign==true){
                    $scope.viewWatchedCampaigns();
                }
                //$scope.tableData =true;
               // $scope.loading = false;
                $scope.noFilterValues=false;

            }
            else
            {
            var url = GetHostUrl.cvmUrl+'/WSCampaign/campaigns/getActiveCampaignList';
               $http({
                method  : 'POST',
                url     : url,
                data    : 
                $.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                    active:$scope.activeInput,
                    favorite:$scope.favouriteInput,
                    category:$scope.category_new,
                    startDate:'',
                    channel:'channel',
                    product:$scope.product_new,
                    campaignStatus:$scope.status_new,
                    creator:'creator',
                    reviewer:'reviewer',
                    sort:0,
                    sortBy:'',
                    sortOrder:'',
                    limit:20,
                    range:1,
                    isOnlyNew:0
                }), 
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .success(function(data)
                {
                    if(data.ActiveCampaignList.length==undefined){
                        $scope.noFilterValues=true;
                        $scope.loading = false;
                        $scope.filterApplied=true;
                    }

                    $scope.activecampaigns=[];
                    $scope.activecampaigns = data.ActiveCampaignList.activecampaigns;
                    if($scope.activecampaigns.length==undefined){
                        $scope.activecampaigns=[];
                        $scope.activecampaigns.push(data.ActiveCampaignList.activecampaigns);
                        $scope.noFilterValues=false;
                        $scope.filterApplied=true;
                        }
                        else{
                            $scope.noFilterValues=false;
                            $scope.filterApplied=true;
                        }
                    for(var i=0;i<$scope.activecampaigns.length;i++)
                    {
                        if($scope.activecampaigns[i].offer==undefined){
                            $scope.activecampaigns[i].offer="No offer exists";
                        }
                        if($scope.activecampaigns[i].active_campaign_specific_params==""){
                           $scope.activecampaigns[i].filter="No filters applied";
                        }
                        else{
                            $scope.activecampaigns[i].filter="Filters applied";
                        }
                        if($scope.activecampaigns[i].status == "2")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "3")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "1")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "7"){
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "8")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "9")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "4")
                        {
                            $scope.activecampaigns[i].icon = 'ready';
                            $scope.activecampaigns[i].status = 'List Ready';
                        }
                        if($scope.activecampaigns[i].status == "5")
                        {
                            $scope.activecampaigns[i].icon = 'progress';
                            $scope.activecampaigns[i].status = 'In Progress';
                        }
                    }
                    $scope.filterApplied=true;
                    $scope.sortType = 'name';
                    $scope.sortReverse  = false; 
                    $scope.review_count = 0;
                    $scope.searchStr   = ''; 
                    $scope.approved_count = 0;
                    $scope.rejected_count = 0;
                    $scope.list_ready_count = 0;
                    $scope.inProgress_count = 0;
                    $scope.filterApplied=true;
                    $scope.loading = false;
                    $scope.tableData =true;
            });
        }
        }

        $scope.resetFilter = function(){
            $('input[type=checkbox]').prop("checked",false);
            if($scope.showActiveCampaign==true){
                $scope.showActive();
            }
            if($scope.showCompletedCampaign==true){
                $scope.viewCompletedCampaigns();
            }
            if($scope.showWatchedCampaign==true){
                $scope.viewWatchedCampaigns();
            }
            $scope.noFilterValues=false;
            $scope.status_new="";
           $scope.category_new="";
           $scope.product_new="";
           $scope.filterApplied=false;
            $scope.filterCount=0;
            $scope.showFilterCount=false;
        }
        $scope.returnDateForShowDetails = function(inputDate,type){
            var splitStartDate = inputDate.split(" ");
            var start_date =splitStartDate[0];
            var st_dt1 =splitStartDate[0];
            var st_dt = st_dt1.split('-');
            $scope.start_date = start_date;

            var d1=st_dt[0]+'-'+ st_dt[1]+'-'+ st_dt[2];
            var d=new Date(d1);

            if(type==='day')
            {
                return st_dt[2];
            }
            else if(type==='month')
            {
                return month[d.getMonth()];
            }
            
        };

        $scope.createnewCampaign= function(){
            $state.go("createcampaign");
        }

        $scope.showActive= function(){
            $scope.showActiveCampaign=true;
            $scope.showCompletedCampaign=false;
            $scope.showWatchedCampaign=false;
            $scope.activeClass=1;
            $scope.activeCampaign=true;
            $scope.reuseCompleted=false;
            $scope.reviewCompleted=true;
            $scope.getMetrics();
            $scope.getResponseStatus();
            //$scope.resetFilter();
            var campaignsurl =  GetHostUrl.cvmUrl+'/WSCampaign/campaigns/activeCampaignsForCreator';
            $http({
            method  : 'POST',
            url     : campaignsurl,
            data    : 
            $.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                activeCampaignId:0,
                viewAll:0,
                active:1,
                favorite:1,
                searchText:"Search Your Campaign"
            }), 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data)
            {
                $scope.noFilterValues=false;
                $scope.activecampaigns=[];
				if(data.ActiveCampaignList.activecampaigns==undefined){
				}
				else{
                $scope.activecampaigns=data.ActiveCampaignList.activecampaigns;
                if($scope.activecampaigns.length==undefined){
                $scope.activecampaigns=[];
                $scope.activecampaigns.push(data.ActiveCampaignList.activecampaigns);
                }
                for(var i=0;i<$scope.activecampaigns.length;i++){
                        if($scope.activecampaigns[i].active_campaign_specific_params==""){
                           $scope.activecampaigns[i].filter="No filters applied";
                        }
                        else{
                            $scope.activecampaigns[i].filter="Filters applied";
                        }
                        if($scope.activecampaigns[i].offer==undefined){
                            $scope.activecampaigns[i].offer="No offer exists";
                        }
                       if($scope.activecampaigns[i].status == "2")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "3")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "1")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "7"){
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "8")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "9")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "4")
                        {
                            $scope.activecampaigns[i].icon = 'ready';
                            $scope.activecampaigns[i].status = 'List Ready';
                        }
                        if($scope.activecampaigns[i].status == "5")
                        {
                            $scope.activecampaigns[i].icon = 'progress';
                            $scope.activecampaigns[i].status = 'In Progress';
                        }
                        }
						}
                        if($scope.filterApplied==true){
                        console.log("filter applied")
                        $scope.applyFilter();
                        }
              });

        }
        $scope.showCompleted= function(){
            $scope.viewCompletedCampaigns();
            $scope.showActiveCampaign=false;
            $scope.showCompletedCampaign=true;
            $scope.showWatchedCampaign=false;
            $scope.activeClass=2;
            $scope.activeCampaign=false;
            $scope.reuseCompleted=true;
            $scope.reviewCompleted=false;
            $scope.getResponseStatus();
            //$scope.resetFilter();
        }
        $scope.showWatched= function(){
            $scope.viewWatchedCampaigns();
            $scope.showActiveCampaign=false;
            $scope.showCompletedCampaign=false;
            $scope.showWatchedCampaign=true;
            $scope.activeClass=3;
            $scope.activeCampaign=false;
            $scope.reuseCompleted=false;
            $scope.reviewCompleted=false;
            //$scope.resetFilter();
        }

        $scope.viewWatchedCampaigns= function(){
            var campaignsurl =  GetHostUrl.cvmUrl+'/WSCampaign/campaigns/getActiveCampaignList';
            $http({
            method  : 'POST',
            url     : campaignsurl,
            data    : 
            $.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                active:1,
                favorite:1,
                category:'category',
                startDate:'',
                channel:'channel',
                product:'product',
                campaignStatus:'',
                creator:'creator',
                reviewer:'reviewer',
                sort:0,
                sortBy:'',
                sortOrder:'',
                limit:20,
                range:1,
                isOnlyNew:0
            }), 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data)
            {
                $scope.noFilterValues=false;
                $scope.activecampaigns=[];
				if(data.ActiveCampaignList.activecampaigns==undefined){
				}
				else{
                $scope.activecampaigns=data.ActiveCampaignList.activecampaigns;
                if($scope.activecampaigns.length==undefined||$scope.activecampaigns.length==0){
                $scope.activecampaigns=[];
                $scope.activecampaigns.push(data.ActiveCampaignList.activecampaigns);
                }
                console.log("$scope.activecampaigns" + $scope.activecampaigns.length);
                for(var i=0;i<$scope.activecampaigns.length;i++){
                    if($scope.activecampaigns[i].active_campaign_specific_params==""){
                           $scope.activecampaigns[i].filter="No filters applied";
                        }
                        else{
                            $scope.activecampaigns[i].filter="Filters applied";
                        }
                        if($scope.activecampaigns[i].offer==undefined){
                            $scope.activecampaigns[i].offer="No offer exists";
                        }
                        if($scope.activecampaigns[i].status == "2")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "3")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "1")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "7"){
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "8")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "9")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "4")
                        {
                            $scope.activecampaigns[i].icon = 'ready';
                            $scope.activecampaigns[i].status = 'List Ready';
                        }
                        if($scope.activecampaigns[i].status == "5")
                        {
                            $scope.activecampaigns[i].icon = 'progress';
                            $scope.activecampaigns[i].status = 'In Progress';
                        }
                        }
						
}                        if($scope.filterApplied==true){
                        $scope.applyFilter();
                        }
              });
        }

        $scope.viewCompletedCampaigns= function(){
            var campaignsurl =  GetHostUrl.cvmUrl+'/WSCampaign/campaigns/getActiveCampaignList';
            $http({
            method  : 'POST',
            url     : campaignsurl,
            data    : 
            $.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                active:0,
                favorite:0,
                category:'category',
                startDate:'',
                channel:'channel',
                product:'product',
                campaignStatus:'',
                creator:'creator',
                reviewer:'reviewer',
                sort:0,
                sortBy:'',
                sortOrder:'',
                limit:20,
                range:1,
                isOnlyNew:0
            }), 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data)
            {
                $scope.noFilterValues=false;
                $scope.activecampaigns=[];
				if(data.ActiveCampaignList.activecampaigns==undefined){
				}
				else{
                $scope.activecampaigns = data.ActiveCampaignList.activecampaigns;
                // if(data.ActiveCampaignList.activecampaigns.length<1){
                //     $scope.activecampaigns = data.ActiveCampaignList.activecampaigns;
                // }
                //console.log("$scope.activecampaigns ==" + $scope.activecampaigns.length);
                if($scope.activecampaigns.length==undefined){
                $scope.activecampaigns=[];
                $scope.activecampaigns.push(data.ActiveCampaignList.activecampaigns);
                }

               // console.log("$scope.activecampaigns ==" + JSON.stringify(data));
                for(var i=0;i<$scope.activecampaigns.length;i++){
                    if($scope.activecampaigns[i].active_campaign_specific_params==""){
                           $scope.activecampaigns[i].filter="No filters applied";
                        }
                        else{
                            $scope.activecampaigns[i].filter="Filters applied";
                        }
                        if($scope.activecampaigns[i].offer==undefined){
                            $scope.activecampaigns[i].offer="No offer exists";
                        }
                        if($scope.activecampaigns[i].status == "2")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "3")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "1")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej1';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej2'
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "7"){
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rev';
                            $scope.activecampaigns[i].status = 'Reviewing';
                        }
                        if($scope.activecampaigns[i].status == "8")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'succ';
                            $scope.activecampaigns[i].status = 'Approved';
                        }
                        if($scope.activecampaigns[i].status == "9")
                        {
                            $scope.activecampaigns[i].icondownleft = 'rej3';
                            $scope.activecampaigns[i].commname1="Creator";
                            $scope.activecampaigns[i].commname2="Communicator";
                            $scope.activecampaigns[i].icondownright = 'rej4';
                            $scope.activecampaigns[i].icon = 'rej';
                            $scope.activecampaigns[i].status = 'Rejected';
                        }
                        if($scope.activecampaigns[i].status == "4")
                        {
                            $scope.activecampaigns[i].icon = 'ready';
                            $scope.activecampaigns[i].status = 'List Ready';
                        }
                        if($scope.activecampaigns[i].status == "5")
                        {
                            $scope.activecampaigns[i].icon = 'progress';
                            $scope.activecampaigns[i].status = 'In Progress';
                        }
                        }
						}
                        if($scope.filterApplied==true){
                        $scope.applyFilter();
                        }
              });
        }

        $scope.newViewCvmDetails = function(campId){
            console.log("view function works")
             /* cvm url starts */
            $http({
                method:"POST",
                url:GetHostUrl.cvmUrl+"/WSCampaign/campaign/getActiveCampaignDetails",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                    activeCampaignId:campId
                })

            })

            .success(function(data){
                $scope.showDetails.cvmDetails = data.Response;
                $localStorage.selectedconversationid = $scope.showDetails.cvmDetails.data.campaignId;
                $localStorage.activeCampaignId = $scope.showDetails.cvmDetails.data.activeCampaignId;
                // $scope.campaignList.cvmDetails = data.Response;
                for(var i=0;i<$scope.showDetails.cvmDetails.data.activeCampaignSpecificParams.length;i++) {

                        if($scope.showDetails.cvmDetails.data.activeCampaignSpecificParams[i].filerTitle==="age") {
							$scope.showDetails.cvmDetails.data.activeCampaignSpecificParams[i].filerValue += '' + i + '##';
						}
					}
                $scope.activecampaigns.cvmDetails = data.Response;
                console.log($scope.showDetails);
                month_names_short=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                var newDateSplit= $scope.showDetails.cvmDetails.data.nonResponderDate.split(" ");
                var splitedDate = newDateSplit[0].split("-");
                var newMonth = month_names_short[parseInt(splitedDate[1])];
                $scope.showDetails.cvmDetails.data.nonResponderDate = splitedDate[2]+" "+newMonth+" "+splitedDate[0];
                var conversationFilter = $scope.showDetails.cvmDetails.data.activeCampaignSpecificParams.split(";");
                var filtersArr = [];
                for(var i=0;i<conversationFilter.length;i++){
                    var filters = conversationFilter[i].split(",");
                    var filtersObj = {};
                    if(filters[2]!="" && filters[2]!=undefined && filters[2].indexOf("$") == "-1"){
                        filtersObj.filerTitle = filters[0];
                        filtersObj.filerTitle = filtersObj.filerTitle.replace(/_/g," ");

                        if(filtersObj.filerTitle =="credit spent"){
                            filtersObj.filerValue = filters[2];
                        }else{
                            filtersObj.filerValue = filters[2];
                            filtersObj.filerValue = filtersObj.filerValue.replace(/##/g,' ').split(" ");
                            for(var j=0;j<filtersObj.filerValue.length;j++){
                                filtersObj.filerValue[j] = filtersObj.filerValue[j].replace(/_/g," ");
                            }
                        }
                        filtersArr.push(filtersObj);
                    }
                }
                $scope.showDetails.cvmDetails.data.activeCampaignSpecificParams = filtersArr;
            })

        }
        $scope.viewRejectReason=false;
        $scope.changeDate= function(campId)
        {
         $localStorage.campId=campId;
         var url = GetHostUrl.hostUrl+'/campaign/listCampaignAll';
         $http({
            method:"POST",
            url:GetHostUrl.cvmUrl+"/WSCampaign/campaign/getActiveCampaignDetails",
            headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            data:$.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                activeCampaignId:campId
            })

        })
            .success(function(data)
            {
                $scope.dateDetails = data;
                console.log(data.Response.data.campaignStartDate);
                console.log(data.Response.data.campaignEndDate);
                $scope.startOn1=data.Response.data.campaignStartDate;
                $scope.expireOn1=data.Response.data.campaignEndDate;
                $scope.createdOn=$scope.startOn1.split(' ')[0];
                $scope.expireOn=$scope.expireOn1.split(' ')[0];
                console.log($scope.createdOn);
                console.log($scope.expireOn);
                $('#fromDate.ui-datepicker-header').addClass('ui-state-disabled');
                $("#fromDate")
                .datepicker(
                {
                dateFormat : 'yy-mm-dd',
                defaultDate: $scope.createdOn,
                beforeShowDay: function enableAllTheseDays(date) {
                var enableDays = [$scope.createdOn];
                var sdate = $.datepicker.formatDate( 'yy-mm-dd', date)
                if($.inArray(sdate, enableDays) != -1) {
                return [true];
                }
                return [false];
                },
                onSelect:function(date){
                $scope.createdOn = $scope.createdOn;
                console.log($scope.createdOn);
                }
            })
                $('#fromDate').datepicker("setDate", new Date($scope.createdOn));
                $('#fromDate .ui-datepicker-prev').addClass('ui-state-disabled');
                $('#fromDate .ui-datepicker-next').addClass('ui-state-disabled');
                
                


                $("#toDate")
                .datepicker(
                {
                defaultDate: $scope.expireOn,
                dateFormat : 'yy-mm-dd',
                minDate : 1,
                onSelect:function(date){
                $scope.expireOn = date;
                console.log($scope.expireOn);
                }

                });
                $('#toDate').datepicker("setDate", new Date($scope.expireOn));
            });
            
        }
        $scope.updateDate= function()
        {
         $http({
                method:"POST",
                url:GetHostUrl.cvmUrl+"/WSCampaign/campaigns/updateActiveCampaignDate",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                    activeCampaignId:$localStorage.campId,
                    startDate: $scope.createdOn,
                    endDate: $scope.expireOn
                })

            })
            .success(function(data)
            {
                 $("#changeDate").modal("hide");
                $scope.commonAlertText="Conversation Date Updated Successfully";
                $("#commonAlert").modal("show");
                $scope.firstfn($scope.secondfn);
                $state.go('dashboard');
            })


        }
        $scope.viewCampaignDetail = function(campId,refcode,stages,status,status_text){
            if(status_text!=undefined){
                $localStorage.status_text=status_text;
                $scope.viewRejectReason=true;
                $scope.rejectReason=$localStorage.status_text
            }
            else{
                $scope.viewRejectReason=false;
            }
            
            $localStorage.refcode=refcode;
            $scope.stages=stages;
            $scope.newCampId = campId;
            $scope.statusCamp= status;
            var url = GetHostUrl.hostUrl+'/campaign/listCampaignAll';
            $http({
            method  : 'POST',
            url     : url,
            data    : 
            {
                "refCode":refcode
            }, //forms user object
            headers : {'Content-Type': 'application/json'}
            })
            .success(function(data)
            {
                $scope.showDetails = data;
                $scope.showDetails.campaigndetails.status = $scope.statusCamp;

                console.log("createCampign" + data);
				$localStorage.conversationName=$scope.showDetails.campaigndetails.name;
				$localStorage.conversationDescription = $scope.showDetails.campaigndetails.description;        
                $scope.newViewCvmDetails($scope.newCampId);
                GetHostUrl.editOrchestration={};
                GetHostUrl.editOrchestration.campaigndetails = [];
                GetHostUrl.editOrchestration.campaigndetails.refCode = $scope.showDetails.refCode;
                GetHostUrl.filledCode = $scope.showDetails.refCode;
                GetHostUrl.editOrchestration.cmapignwaveall = $scope.showDetails.cmapignwaveall;
                GetHostUrl.backValue= "";
                campaignsegment:null;
                //$localStorage.selectedconversationid=$scope.showDetails.cvmDetails.data.campaignId;
                //$localStorage.activecampainid=$scope.showDetails.cvmDetails.data.activeCampaignId;
            if($scope.showDetails.campaignsegment==null||$scope.showDetails.campaigndetails.selectedOption==null){
                $scope.canEditOffer=false;
            }
            else{
                for(var i=0;i<$scope.showDetails.campaignsegment.length;i++){
                if($scope.showDetails.campaignsegment[i].segmentcategory=="None"){
                    $scope.showDetails.campaignsegment[i].segmenttype=$scope.showDetails.campaigndetails.name;
                    $scope.segmentTypeName="Default";
                }
                else if($scope.showDetails.campaignsegment[i].segmentcategory=="Age"||$scope.showDetails.campaignsegment[i].segmentcategory=="Vintage"||$scope.showDetails.campaignsegment[i].segmentcategory=="Relationship Value"||$scope.showDetails.campaignsegment[i].segmentcategory=="Income"){
                    $scope.showDetails.campaignsegment[i].segmenttype=$scope.showDetails.campaignsegment[i].min+" to "+$scope.showDetails.campaignsegment[i].max;
                    $scope.segmentTypeName=$scope.showDetails.campaignsegment[i].segmentcategory;
                }
                else if($scope.showDetails.campaignsegment[i].segmentcategory=="Product Type"){
                    $scope.segmentTypeName=$scope.showDetails.campaignsegment[i].segmentcategory;
                }
                else if($scope.showDetails.campaignsegment[i].segmentcategory=="Gender"){
                    $scope.segmentTypeName=$scope.showDetails.campaignsegment[i].segmentcategory;
                }
                }
                $localStorage.segmentcategory=$scope.showDetails.campaignsegment[0].segmentcategory
                $scope.canEditOffer=true;
                
                console.log(" $localStorage.segmentcategory in ds" +  $localStorage.segmentcategory)
            }
               
                if($scope.showDetails.campaigndetails.stages =="orchestration"){
                    $scope.stageOrchestration = true;
                    $scope.stagefinalizeMessaging = false;
                    $scope.finalizeCreative = false;
                }

                else if($scope.showDetails.campaigndetails.stages =="messaging")
                {
                    $scope.stageOrchestration = true;
                    $scope.stagefinalizeMessaging = true;
                    $scope.finalizeCreative = false;
                }
                else if($scope.showDetails.campaigndetails.stages =="creative")
                {
                    $scope.stageOrchestration = true;
                    $scope.stagefinalizeMessaging = true;
                    $scope.finalizeCreative = true;
                }
                else{
                    $scope.stageOrchestration = true;
                    $scope.stagefinalizeMessaging = true;
                }


                $scope.testClick = function(wave_no){
                    GetHostUrl.iterator = wave_no;
                    GetHostUrl.editFinalizeDesign = $scope.showDetails;
                    console.log($scope.showDetails);
                    //GetHostUrl.editFinalizeDesign.campaigndetails.stages =$scope.stages;
                    GetHostUrl.selectedChannel= "fromdash";
                    $state.go("fmsg",{id:$scope.showDetails.campaigndetails.refCode,style:$scope.showDetails.campaigndetails.selectedOption});
                    //window.open(url,'liveMatches','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=720,height=800');
                }
                $scope.editCreative = function(wave_no){
                    console.log(wave_no)
                    GetHostUrl.iterator = wave_no;
                    GetHostUrl.editFinalizeDesign = $scope.showDetails;
                    console.log($scope.showDetails);
                    var waves = [];
                    var refCodes = [];
                    for(var i=0;i<$scope.showDetails.cmapignwaveall.length;i++){
                        var wave_data = {};
                        var channels = [];

                        var channelrefcode = [];
                        var wave_refcode = {};

                        var x = $scope.showDetails.cmapignwaveall[i].campaignwave;

                        wave_data.svrdate = x.startOn;
                        var split_date = wave_data.svrdate.split(' ');
                        split_date = split_date[0].split('-');
                        
                        wave_data.id = split_date[2];
                        wave_data.date = split_date[2]+"-"+split_date[1];
                        wave_data.selected = 'selected';

                        GetHostUrl.editorIndex = 0;
                        GetHostUrl.contentoption = x.option_path;
                        GetHostUrl.templateoption = x.templateoption;
                        console.log("GetHostUrl.contentoption" + GetHostUrl.contentoption);
                        console.log("GetHostUrl.templateoption"+ GetHostUrl.templateoption);

                        for(var j=0;j<$scope.showDetails.cmapignwaveall[i].campaignwaveChannel.length;j++){

                            var channel_data = {};
                            var channel_refcode_data = {};

                            var y = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j];
                            if(y.channel=="EMailer"){
                                y.channel="m"
                            }
                            channel_data.id = wave_data.id + "-" + y.channel;
                            channel_data.key = y.channel;
                            channel_data.selected = (y.active==1?true:false);

                            channel_refcode_data.campaignwavechannelrefCode = y.refCode;
                            channel_refcode_data.channel = y.channel;

                            channelrefcode.push(channel_refcode_data);
                            channels.push(channel_data);

                            
                        }
                        wave_data.channels = channels;

                        GetHostUrl.labels = [];
                        var label_ob= {}

                        if (i == 0) {         
                            label_ob.label = "LAUNCH";
                            label_ob.status = false;
                        } else if (i == $scope.showDetails.cmapignwaveall.length) {
                            label_ob.label = "FINAL REMINDER";
                            label_ob.status = true;
                        } else {
                            label_ob.label = "REMINDER " + (i - 1);
                            label_ob.status = true;
                        }

                        wave_refcode.campaignwaverefCode = x.refCode;
                        wave_refcode.campaignwavechannel = channelrefcode;
                        if(i==wave_no){
                            waves.push(wave_data);
                            GetHostUrl.labels.push(label_ob);
                            refCodes.push(wave_refcode);
                        }
                    }
                    var campaignwave = {}
                    campaignwave.campaignwave = refCodes;
                    GetHostUrl.waveChannelRefCodes = campaignwave;
                    GetHostUrl.selectedDate= waves;
                    console.log("Refcode:");
                    console.log(GetHostUrl.waveChannelRefCodes);
                    GetHostUrl.selectedChannel= "fromdash";
                    $("#viewModal").modal('toggle')
                    $state.go("fdsne",{id:$scope.showDetails.campaigndetails.refCode,style:$scope.showDetails.campaigndetails.selectedOption});
                }
                $scope.editOrchestration = function(){
                    $localStorage.editSegment="fromdashoffer";
                    $localStorage.campaignName=$scope.showDetails.campaigndetails.name;
                    GetHostUrl.iterator = 0;
                    GetHostUrl.editFinalizeDesign = $scope.showDetails;
                    $localStorage.refcode=$scope.showDetails.campaigndetails.refCode;
                    GetHostUrl.editOrchestration = $scope.showDetails;
                    GetHostUrl.selectedChannel= "fromOrchestration";
                    $state.go("dsn");
                }

                 $scope.editcontacts = function(){
                                $scope.campaignidreupdate = $scope.showDetails.cvmDetails.data.activeCampaignId;

                                $http({
                                method:"POST",
                                url:GetHostUrl.cvmUrl+"/WSCampaign/campaigns/activeCampaignDetails",
                                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                                data:$.param({
                                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                                activeCampaignId: $scope.campaignidreupdate
                                })

                                })
                                .success(function(data)
                                {
                                $scope.commonAlertText="success";
                                $("#commonAlert").modal("show");
                                $scope.records=data;
                                GetHostUrl.editviewconversation1 = $scope.showDetails.cvmDetails;
                                localStorage['ngStorage-recordCount']= $scope.records.ActiveCampaignDetails.activecampaign.recordCount;
                                $localStorage.activecampainId= GetHostUrl.editviewconversation1.data.activeCampaignId;
                                

                                $state.go("createsegments");
                                })
                  
                }

                 $scope.editviewconversation = function(){
                    GetHostUrl.editviewconversation = $scope.showDetails.campaigndetails;
                    GetHostUrl.editviewconversation1 = $scope.showDetails.cvmDetails;
                    console.log(GetHostUrl.editviewconversation1);
                    $localStorage.selectedconversationid=GetHostUrl.editviewconversation1.data.campaignId;
                    $localStorage.activeCampaignId = $scope.showDetails.cvmDetails.data.activeCampaignId;
                    $localStorage.productNamess= GetHostUrl.editviewconversation.product;
                    $localStorage.selectedConversationValue= GetHostUrl.editviewconversation.category;
                    $localStorage.selectedconversationname= GetHostUrl.editviewconversation.campaigntype;

                    console.log($localStorage.productNamess);
                        console.log($localStorage.selectedConversationValue);
                            console.log($localStorage.selectedconversationname);

                    
                    $localStorage.campaignTitle= GetHostUrl.editviewconversation.name;
                    $localStorage.campaignrefcode = GetHostUrl.editviewconversation.refCode;
                    $localStorage.date3= GetHostUrl.editviewconversation.startOn;
                    $localStorage.date4= GetHostUrl.editviewconversation.expireOn;
                    $localStorage.campaignconversation= GetHostUrl.editviewconversation.description;
                    $localStorage.appsetting1= GetHostUrl.editviewconversation1.data.controlGroup;
                    $localStorage.appsetting2= GetHostUrl.editviewconversation1.data.costPerContact;
                    $localStorage.appsetting3= GetHostUrl.editviewconversation1.data.revenuePerCampaign;
                    $localStorage.selectedChannels= GetHostUrl.editviewconversation.goals;
                    $localStorage.showsave=false;
                    $scope.updateBtn = $localStorage.showsave;
                    $localStorage.createBack = true;
                    console.log(GetHostUrl.editviewconversation);
                    $state.go("createcampaign");
                }


                $scope.showDetails.campaigndetails.stdate = $scope.returnDateForShowDetails(data.campaigndetails.startOn,'day');
                $scope.showDetails.campaigndetails.stmonth = $scope.returnDateForShowDetails(data.campaigndetails.startOn,'month');
                $scope.showDetails.campaigndetails.endate = $scope.returnDateForShowDetails(data.campaigndetails.expireOn,'day');
                $scope.showDetails.campaigndetails.enmonth = $scope.returnDateForShowDetails(data.campaigndetails.expireOn,'month');
                if($scope.showDetails.campaigndetails.status == "Active")
                {
                    $scope.showDetails.icon = 'succ';
                }
                if($scope.showDetails.campaigndetails.status == "Approved")
                {
                    $scope.showDetails.icon = 'succ';
                }
                if($scope.showDetails.campaigndetails.status == "Rejected")
                {
                    $scope.showDetails.icon = 'rej';
                }
                if($scope.showDetails.campaigndetails.status == "Reviewing")
                {
                    $scope.showDetails.icon = 'rev';
                }

                /*channels selection for view info*/

                if($scope.showDetails.campaigndetails.mailchannel==1){
                    $scope.mailIcon= true;
                }
                if($scope.showDetails.campaigndetails.smschannel==1){
                    $scope.smsIcon= true;
                }
                if($scope.showDetails.campaigndetails.voicechannel==1){
                    $scope.voiceIcon= true;
                }
                if($scope.showDetails.campaigndetails.pushchannel==1){
                    $scope.pushIcon= true;
                }
                if($scope.showDetails.campaigndetails.directchannel==1){
                    $scope.directIcon= true;
                }
                /*channels selection for view info*/
                for(var i=0;i<$scope.showDetails.cmapignwaveall.length;i++){
                    var month_names_short=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    var newDateSplit= data.cmapignwaveall[i].campaignwave.startOn.split(" ");
                    var splitedDate = newDateSplit[0].split("-");
                    var splitedMonthString = splitedDate[1];
                    var splitedMonth = parseInt(splitedMonthString);
                    var newMonth = month_names_short[splitedMonth-1];
                    $scope.showDetails.cmapignwaveall[i].startOn = $scope.returnDate(data.cmapignwaveall[i].campaignwave.startOn,i,'day');
                    $scope.showDetails.cmapignwaveall[i].startOn = newMonth +" "+ $scope.showDetails.cmapignwaveall[i].startOn;
                }


                /*-------------------------------- Start Populate Campaign Labels ----------------------------- */
                $scope.strip = function(val){
                    return(val.replace(/\s/g,''));
                }
                var label_temp = [];
                for (var i = 0; i < $scope.showDetails.cmapignwaveall.length; i++) {
                      if (i == 0) {
                          label_temp.push("LAUNCH");
                      } else if (i == $scope.showDetails.cmapignwaveall.length-1) {
                          label_temp.push("FINAL REMINDER");
                      } else {
                          label_temp.push("REMINDER " + (i));
                      }
                      $scope.showDetails.cmapignwaveall[i].labels=label_temp[i];
                  }
                  var data_title=[];
                  var data_description=[];
                  for(var i=0;i<$scope.showDetails.cmapignwaveall.length;i++){
                    for(var j=0;j<$scope.showDetails.cmapignwaveall[i].campaignwaveChannel.length;j++){
                        if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data != null){
                            $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data = JSON.parse($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data);
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "m"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel ="EMailer";
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Title = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[1].value[0].name;
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Description = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[1].value[0].value;
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "s"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel ="SMS";
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Description = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[0].value;
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "p"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel = "Push Notification" ;
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Title = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[0].value;
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Description = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[1].value;
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "v"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel = "Voice";
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Title = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[0].value;
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Description = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[0].value;
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "l"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel = "Landing Page";
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Title = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[1].value[0].name;
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Description = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[1].value[0].value;
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "d"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel = "Direct Mail";
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Title = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[1].value[0].name;
                                // $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].Description = $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].data.fields[1].value[0].value;
                            }
                        }else{
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "m"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel ="EMailer";
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "s"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel ="SMS";
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "p"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel = "Push Notification";
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "v"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel = "Voice";
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "l"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel = "Landing Page";
                            }
                            if($scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel == "d"){
                                $scope.showDetails.cmapignwaveall[i].campaignwaveChannel[j].channel = "Direct Mail";
                            }
                        }
                    }
                  }
                /*-------------------------------- End Populate Campaign Labels ----------------------------- */

            })


        }

        /** approve campaign starts */

        $scope.approveCamp = function(x){
            $scope.approvecampaignId=x.id
            $scope.rejectStatus = x.status;
            $scope.approvestatus= x.status;
            $scope.approvalrefCode=x.communicator_ref_code;
            console.log("inside approve")
             if(x.status =="Approved" || x.status =="Rejected"){
                $("#rejectCallApprovedMsg").modal("show");    
            }else{
                $("#approveConversation").modal("show");
            }
        }
        /** approve campaign ends */

        /** reject campaign starts */

        $scope.openRejectModal = function(x){
            $scope.rejectStatus = x.status;
            $scope.rejectcampaignId = x.id;
            $scope.communicator_ref_code = x.communicator_ref_code;
            if(x.status =="Approved" || x.status =="Rejected"){
                $("#rejectCallApprovedMsg").modal("show");    
            }else{
                $scope.rejectRefCode = x.refCode;
                $("#rejectCampagin").modal("show");
            }
        }

        $scope.gotoManageUser = function(){
            $state.go("manageUsers");
        }


        $scope.editSegments =function(){
            $localStorage.editSegment="fromdashoffer";
            $localStorage.showeditSegment="fromdashoffer";
            $localStorage.campaignName=$scope.showDetails.campaigndetails.name;

            GetHostUrl.iterator = 0;
            GetHostUrl.editFinalizeDesign = $scope.showDetails;
            $localStorage.refcode=$scope.showDetails.campaigndetails.refCode;
            GetHostUrl.selectedChannel= "fromdash";
            $state.go("fmsg",{id:$scope.showDetails.campaigndetails.refCode,style:$scope.showDetails.campaigndetails.selectedOption});
        }
        // $scope.rejectCampaign = function(){
        //     var updateStatusUrl =   GetHostUrl.hostUrl+'/campaign/updateCampaign';
        //             $http({
        //             method  : 'POST',
        //             url     : updateStatusUrl,
        //             data    : {
        //                 "refCode":refCode,
        //                 "status":status
        //             }, //forms user object
        //             headers : {'Content-Type': 'application/json','AUTH_TOKEN':GetHostUrl.authToken}
        //                 }) 
        //             .success(function(data)
        //             {
        //                 console.log("updateStatus data" + data)
        //             });

            // var url = GetHostUrl.hostUrl+'/campaign/updateCampaign';
            // $http({
            // method  : 'POST',
            // url     : url,
            // data    : {
            //     refCode:$scope.rejectRefCode,
            //     status:"Rejected",
            //     reasons:$scope.rejectReasonCamp
            // }, 
            // headers : {'Content-Type': 'application/json'}
            // })
            // .success(function(data)
            // {
            //     console.log(data.reason);
            //     $scope.rejectReasonCamp = "";
            //     $scope.getAll();
            // })
        // }

         $scope.approveConversation=function(){


                 var updateStatusUrl =   GetHostUrl.hostUrl+'/campaign/updateCampaign';
                    $http({
                    method  : 'POST',
                    url     : updateStatusUrl,
                    data    : {
                        "refCode":$scope.approvalrefCode,
                        "status":$scope.status
                    }, //forms user object
                    headers : {'Content-Type': 'application/json','AUTH_TOKEN':GetHostUrl.authToken}
                        }) 
                    .success(function(data)
                    {
                        console.log("updateStatus data" + data)
                        var approveUrl=GetHostUrl.cvmUrl+'/WSGenerateCampaign/updateCampaign/updateActiveCampaignStatus';

                   $http({
                    method  : 'POST',
                    url     : approveUrl,
                    data    : 
                    $.param({
                        userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                        sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                        authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                        activeCampaignId:$scope.approvecampaignId,
                        isApproved:true
                    }), 
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                    .success(function(data){
                        var url= GetHostUrl.cvmUrl+"/WSCampaign/campaigns/getNotification";
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
            console.log($scope.getnotification);
        $scope.getnotifications=data.NotificationList;
            if($scope.getnotifications)
          {
          $scope.count= $scope.getnotifications.unread;
          console.log($scope.count);
           console.log($scope.getnotifications);
          angular.element(document).find("#headernotifi").html($scope.count);
          $('#headernotifi').removeClass("not-value1");$('#headernotifi').addClass("not-value");
          if($scope.count==0)
          {
           angular.element(document).find("#headernotifi").html("");
           $('#headernotifi').removeClass("not-value");$('#headernotifi').addClass("not-value1");
          }
          }
          


        });
                        $scope.showActive();
                        $scope.commonAlertText="Successfully approved";
                        $("#commonAlert").modal("show");
                    });
                    });
		 }
                 $scope.rejectConversation=function(){

                     $scope.updateStatus($scope.rejectStatus,$scope.communicator_ref_code);
                }
                $scope.updateStatus=function(status,refCode){

                     var updateStatusUrl =   GetHostUrl.hostUrl+'/campaign/updateCampaign';
                    $http({
                    method  : 'POST',
                    url     : updateStatusUrl,
                    data    : {
                        "refCode":refCode,
                        "status":status
                    }, //forms user object
                    headers : {'Content-Type': 'application/json','AUTH_TOKEN':$localStorage.authToken}
                        }) 
                    .success(function(data)
                    {
                        console.log("updateStatus data" + data)
                         var rejectUrl=GetHostUrl.cvmUrl+'/WSGenerateCampaign/updateCampaign/updateActiveCampaignStatusText';
                            $http({
                                method  : 'POST',
                                url     : rejectUrl,
                                data    : 
                                $.param({
                                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                                    activeCampaignId:$scope.rejectcampaignId,
                                    statusText:$scope.rejectReasonCamp
                                }), 
                                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                                })
                                .success(function(data){
                                      var url= GetHostUrl.cvmUrl+"/WSCampaign/campaigns/getNotification";
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
            console.log($scope.getnotification);
        $scope.getnotifications=data.NotificationList;
            if($scope.getnotifications)
          {
          $scope.count= $scope.getnotifications.unread;
          console.log($scope.count);
           console.log($scope.getnotifications);
          angular.element(document).find("#headernotifi").html($scope.count);
          $('#headernotifi').removeClass("not-value1");$('#headernotifi').addClass("not-value");
          if($scope.count==0)
          {
           angular.element(document).find("#headernotifi").html("");
           $('#headernotifi').removeClass("not-value");$('#headernotifi').addClass("not-value1");
          }
          }
          


        });
                                    $scope.rejectReasonCamp="";
                                    $scope.showActive();
                                    $scope.commonAlertText="Rejected";
                                    $("#commonAlert").modal("show");
                                });
                    });
                }

       /** reject campaign ends */

       $scope.watchCamp = function(id,refCode,favourite){
           var favourite=favourite;
           if(favourite==true){
               var favourite=0;
           }
           else if(favourite==false){
               var favourite=1;
           }
            $http({
                method:"POST",
                url:GetHostUrl.cvmUrl+"/WSCampaign/campaigns/setCampaignAsFavourite",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                    activeCampaignId:id,
                    favourite:favourite
                })

            })

            .success(function(data){
                $scope.showActive();
                $scope.commonAlertText="Watch request successfully updated";
                $("#commonAlert").modal("show");
            })
       }

       
       $scope.deleteCamp = function(id,refCode){
           $scope.deleteId=id;
           $("#deleteCampaign").modal("show");
       }

       $scope.deleteConversation=function(){
           $http({
                method:"POST",
                url:GetHostUrl.cvmUrl+"/WSCampaign/campaigns/deleteCampaign",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                    activeCampaignId:$scope.deleteId
                })

            })

            .success(function(data){
                $scope.showActive();
                $scope.commonAlertText="Successfully deleted";
                $("#commonAlert").modal("show");
            })
       }

        $scope.onEditConversationFilters = function(ev, showDetails) {
            ev.preventDefault();
            console.log(showDetails);
            localStorage.activeCampaignId = showDetails.cvmDetails.data.activeCampaignId;
            localStorage['ngStorage-selectedconversationid'] = showDetails.cvmDetails.data.campaignId;
            $("#viewModal").modal("hide");
            $timeout(function(){
                    $state.go('setFilter', { edit: true });
            },500)
            
        };


    //$scope.getMetrics();
    });



 

dashboard.directive("dynamicdata", function ($compile) {
    return {
        restrict: 'AEC',
        scope: {
            domdetails: '@',
        },
        link: function (scope, iElement, iAttrs) {
        /**************Declaration part*******************/
        // console.log(scope.domdetails);
        //debugger;
        scope.SubjectLine=function(data){
            return "<h3 class=' text-center'>"+data+"</h3>";
        }
        scope.MainHeading = function(data){
            return "<h1 class=' text-center'>"+data+"</h1>";
        }
        scope.SubHeading = function(data){
            return "<h3 class=' text-center'>"+data+"</h3>";
        }
        scope.BannerCTA= function(data){
            return "<p class='text-center'>"+data+"</p>";
        }
        scope.Content=function(data){
            return "<p>"+data+"</p>";
        }
        scope.Body_Copy=function(data){
            return "<p>"+data+"</p>" ;
        }
        // scope.Title=function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.Description=function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.visual =function(data){
        //     return "<p>"+data+"</p>";
        // }
        scope.HeaderMessage =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs0 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs1 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs2 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs3 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs4 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs5 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs6 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs7 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs8 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.Paragraphs9 =function(data){
            return "<p>"+data+"</p>";
        }
        // scope.BenefitsMainTitle =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsMainDescription =function(data){
        //     return "<h3>"+data+"</h3>";
        // }
        // scope.BenefitsSubTitle1 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsDescription1 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsSubTitle2 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsSubTitle3 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsDescription3 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsSubTitle4 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsDescription4 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsSubTitle5 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsDescription5 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.BenefitsCTA =function(data){
        //     return "<p>"+data+"</p>";
        // }
        scope.FeaturesMainTitle =function(data){
            return "<h3 style='text-align:center;'>"+data+"</h3>";
        }
        scope.FeaturesMainDescription =function(data){
            return "<h2>"+data+"</h2>";
        }
        scope.FeaturesSubTitle1 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesDescription1 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesSubTitle2 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesDescription2 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesSubTitle3 =function(data){
            return "<p>"+data+"</p>";
        }
        // scope.FeaturesDescription3 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        scope.FeaturesSubTitle4 =function(data){
            return "<p>"+data+"</p>";
        }
        // scope.FeaturesDescription4 =function(data){
        //     return "<p>"+data+"</p>";
        // }
        scope.FeaturesSubTitle5 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesDescription5 =function(data){
            return "<p>"+data+"</p>";
        }
        // scope.FeaturesCTA =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.ImportantInfoParagraphs =function(data){
        //     return "<p>"+data+"</p>";
        // }
        // scope.ImportantInfoCTA =function(data){
        //     return "<p>"+data+"</p>";
        // }
        scope.DisclaimerMainTitle =function(data){
            return "<p>"+data+"</p>";
        }
        scope.DisclaimerMainDescription =function(data){
            return "<p>"+data+"</p>";
        }
        scope.dis0 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.dis1 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesDescription0 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesDescription1 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesDescription2 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesDescriptionPhone0 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesDescriptionPhone1 =function(data){
            return "<p>"+data+"</p>";
        }
        scope.FeaturesDescriptionPhone2 =function(data){
            return "<p>"+data+"</p>";
        }
        // scope.dis1 =function(data){
        // return "<p>"+data+"</p>";
        // }


        scope.constructhtml="";
        scope.funcToConstructHtml=function(name,datavalue){
        //console.log( Array.isArray(datavalue));

        if(Array.isArray(datavalue))
        for(var i=0 in datavalue)
        {
            //console.log("name:-"+name+" value:-"+JSON.stringify(datavalue));
            if(datavalue[i].name=="DisclaimerMainDescription"){
                for(var jk=0;jk<datavalue[i].value.length;jk++){
                scope.funcToConstructHtml("dis"+jk,datavalue[i].value[jk]);
            }
            }else if(datavalue[i].name=="FeaturesDescription1"){
                for(var jk=0;jk<datavalue[i].value.length;jk++){
                scope.funcToConstructHtml("FeaturesDescription"+jk,datavalue[i].value[jk]);
            }
            }else if(datavalue[i].name=="FeaturesDescription2"){
                for(var jk=0;jk<datavalue[i].value.length;jk++){
                scope.funcToConstructHtml("FeaturesDescriptionPhone"+jk,datavalue[i].value[jk]);
            }
            }else if(datavalue[i].name=="Paragraphs"){
                for(var jk=0;jk<datavalue[i].value.length;jk++){
                scope.funcToConstructHtml("Paragraphs"+jk,datavalue[i].value[jk]);
            }
            }

            if(i>2){
                if(datavalue[i].name=="FeaturesDescription3"){
                    for(var jk=0;jk<datavalue[i].value.length;jk++){
                        //scope.funcToConstructHtml("FeaturesDescriptionPhone"+jk,datavalue[i].value[jk]);
                    }
                }
            }
            scope.funcToConstructHtml(datavalue[i].name,datavalue[i].value);
        }
        else
        {
            //console.log("name:-"+name+"value:-"+datavalue);
            if(name != undefined){
                var indexVar = name.indexOf(" ");
                //console.log(indexVar);
                if(indexVar != -1){
                    var temp=name.replace(" ","_");
                    if(datavalue&& datavalue!="undefined")
                    scope.constructhtml=scope.constructhtml+scope[temp](datavalue);
                }else{
                    if(datavalue&& datavalue!="undefined")
                    scope.constructhtml=scope.constructhtml+scope[name](datavalue);
                }
            }
            //var temp=name.replace(" ","_");
            // if(datavalue&& datavalue!="undefined")
            // scope.constructhtml=scope.constructhtml+scope[name](datavalue);
            //function to be called will be taken dynamically from service data in temp variable.
        }
        }
        /************************************************/
        /**************Execution Part*******************/
        if(scope.domdetails){
            var data = JSON.parse(scope.domdetails);
            scope.funcToConstructHtml("",data);
        }
        /*************Constructing the DOM*************/
        var sethtml = angular.element(scope.constructhtml);
        /**************Inserting DOM to Page***********/
        angular.element(sethtml).appendTo(iElement[0]);
        //...
        }
    };
});
