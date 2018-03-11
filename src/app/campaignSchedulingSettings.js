var campaignSchedulingSettings = angular.module("campaignSchedulingSettings",['ngStorage']);

campaignSchedulingSettings.controller(
    "campaignSchedulingSettings_Controller",
    function($scope,$http,$window,$location,$stateParams,GetHostUrl,$state,$timeout,$localStorage)
    {
        $scope.autoValue = 1;

        $(".header").show();
        $("#loginDiv").parent().parent().css( "background-color", "#e6e6e6" );
        $("body").removeClass( "body-bg" );

        $(".sNotSelected").click(function(){
            $(this).parent().siblings().children().removeClass("sSelected");
            $(this).addClass("sSelected");

        })

        //  $("select.select-box").each(function(){
        //     $(this).wrap("<span class='select-wrapper'></span>");
        //     $(this).after("<span class='holder'></span>");
        // });
        $("select.select-box").change(function(){

        var selectedOption = $(this).find(":selected").text();
        if(selectedOption=="Select option")
        {
        $("#run_before").val("");
        $("#run_camp").val("");
        }
        $(this).next(".holder").text(selectedOption);
        }).trigger('change');
        

        $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+"/WSSettings/campaignSchedulerSettings/autoCampaigns",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
                  })
                })
                .success(function(data)
                {
                    $scope.autoCampaign = data.CampaignList.campaign;
                    console.log($scope.autoCampaign);
                })

                $scope.selectCamp= function(blah){
                    console.log(blah);
                    $scope.selectedCampId = blah.id;
                    $http({
                        method  : 'POST',
                        url     : GetHostUrl.cvmUrl+"/WSSettings/campaignSchedulerSettings/campaignWise",
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                        data:$.param({
                            userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                            sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                            authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                            campaignId:blah.id
                          })
                    })
                    .success(function(data)
                    {
                        $scope.campaignScheduleDet = data.ResultStatus.data;
                        //console.log($scope.autoCampaign);
                        $scope.campaignScheduleDet.scheduledTime=$scope.campaignScheduleDet.scheduledTime.slice(0,-3);
                    })
                }
                $scope.autoClick = function(value){
                    $scope.autoValue = value;
                    
                }
                $scope.days = /^([01]?[0-9]|2[0-9]|3[0])$/;
                $scope.timePattern=/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                $scope.update= function(){
                    if($scope.selectedCampId =="" || $scope.selectedCampId ==undefined){
                        $scope.commonAlertText="Please select the Conversation";
                        $("#commonAlert").modal("show");
                    }
                    else if($scope.campaignScheduleDet.runBefore =="" || $scope.campaignScheduleDet.runBefore ==undefined){
                        $scope.commonAlertText="Please provide the “Run Before” number of days";
                        $("#commonAlert").modal("show");
                    }
                    else{

                        $http({
                            method  : 'POST',
                            url     : GetHostUrl.cvmUrl+"/WSSettings/campaignSchedulerSettings/update",
                            headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                            data:$.param({
                                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                                runBefore:$scope.campaignScheduleDet.runBefore,
                                scheduledTime:$scope.campaignScheduleDet.scheduledTime,
                                autoFlag:$scope.autoValue,
                                campaignId: $scope.selectedCampId
                              })
                        })
                        .success(function(data)
                        {
                            console.log(data);
                            $scope.commonAlertText="Conversation scheduling settings updated successfully";
                            $("#commonAlert").modal("show");
                        })
                    }
                     $scope.myForm.$setPristine();
                     $scope.myForm.$setUntouched();
                     $(".select-box").next(".holder").text("Select option");
                     $scope.blah = "";
                $scope.campaignScheduleDet.scheduledTime = "";
                $scope.campaignScheduleDet.runBefore = "";
                }
            
    })