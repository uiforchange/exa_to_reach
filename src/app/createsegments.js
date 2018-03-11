var createsegments = angular.module("createsegments",['ui.sortable','ngStorage']);

createsegments.controller(
    "createsegmentsController",
    function($scope,$http,$window,$location,GetHostUrl,$state,$stateParams,$timeout,$localStorage)
    {
        $("#loginDiv").parent().parent().css( "background-color", "#e6e6e6" );
        $("body").removeClass( "body-bg" );
		$scope.fsadasdf = function(){
			$localStorage.createBack = true;
			$state.go("createcampaign");
		}
		 // $scope.loadotherservice = function()
   //            {
   //               var url= "http://10.20.0.176:8080/CampaignInBox/services/WSCampaign/campaigns/getNotification";
   //              $http({
   //              method  : 'POST',
   //              url     : url,
   //              //forms user object
   //              data    : 
   //                                  $.param({
   //                                      userId:$localStorage.loginUserDet.LoginStatus.user.userId,
   //                                      sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
   //                                      authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
   //                                  }), 
   //              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
   //              })
   //              .success(function(data)
   //              {
   //              console.log(data); 
   //              $localStorage.getnotification=data.NotificationList;
   //              $localStorage.count=data.NotificationList.unread;
   //              if($localStorage.count>0)
   //              {$('#headernotifi').addClass("not-value")}
   //              if($localStorage.count==0)
   //              {$localStorage.count="";angular.element(document).find("#headernotifi").html($localStorage.count);
   //          $('#headernotifi').removeClass("not-value");$('#headernotifi').addClass("not-value1");}
   //              if($localStorage.count>0)
   //              {angular.element(document).find("#headernotifi").html($localStorage.count);}
                
   //              });
   //            }
		// var c="";
		// var selectedChannel2="";

		// $scope.outputgoals= function(value)
		// {
		// 	console.log(c);
		// var i = 0;
  //       if(value)
  //        {
		// 	selectedChannel2 = selectedChannel2 +","+ value;
		// 	data = selectedChannel2.replace(/^,/, '');
		// 	arr =  $.unique(data.split(','));
		// 	c = arr.join(","); 
			
  //        }
  //        i++
		// }
		$(".modal-backdrop.fade.in").remove();
		$(".modal-open").removeClass("modal-open");
		$http({
                        method  : 'POST',
                        url     : GetHostUrl.cvmUrl+'/WSCampaign/campaigns/activeCampaignDetails',
                       headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                        data:$.param({
                            userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                            sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                            authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
							activeCampaignId : $localStorage.activeCampaignId
                            })
                    })
                .success(function(data){
					$scope.activeCampaignDetails = data;
					console.log("activeCampaignDetails"+data);
				})
				var recordCount = parseInt(localStorage["ngStorage-recordCount"]);
				$scope.productPercentage= [{"value":Math.round(recordCount*25/100),"percentage" : "25%","type":"percentage","id":"1"},{"value":Math.round(recordCount*50/100),"percentage" : "50%","type":"percentage","id":"2"},{"value":Math.round(recordCount*75/100),"percentage" : "75%","type":"percentage","id":"3"},{"value":Math.round(recordCount),"percentage" : "100%","type":"percentage","id":"4"}];
				$scope.outPutcolomns = [{"value":"Conversation Code","type":"conversationCode"},{"value":"Offer ID","type":"OfferId"},{"value":"Offer Text","type":"OfferText"},{"value":"Channel","type":"Channel"},{"value":"Customer ID","type":"CustomerId"},{"value":"Current City","type":"CurrentCity"},{"value":"Gender","type":"Gender"},{"value":"Age","type":"Age"},{"value":"Vintage","type":"Vintage"},{"value":"Income","type":"Income"},{"value":"Product Type","type":"ProductType"},{"value":"Product Holding","type":"ProductHolding"}]
				$scope.rvvalue1 = ["Conversation Code","Offer ID"]
				$scope.settEnable=0;
				$scope.test23= recordCount;
				for(var i=0;i<$scope.outPutcolomns.length;i++)
				if($scope.outPutcolomns[i].value==$localStorage.activecampainidtest)
				{
                 $scope.outPutcolomns[i].value=$localStorage.activecampainidtest;
				}
				$scope.customValueCheck = function (customValue){

					// if (customValue !=""){
					// 	$scope.customValue = true;
					// }
					// else{
					// 	$scope.customValue = false;
					// }
				}

				$scope.removeActiveCollections=function(){
					$(".radiosection1").removeClass("chck-active");
					$(".radio-holder1").removeClass("seg-act1");
				}
				
				$scope.formModel = {};
				$scope.line1={
							refCode: $localStorage.refcoder,
							status: "Reviewing" 

				};
				
				$scope.saveConversation1= function()
				{

					$http({
                        method  : 'POST',
                        url     : GetHostUrl.hostUrl+'/campaign/updateCampaign',
                          data:   $scope.line1,
                        headers : {'Content-Type': 'application/json', AUTH_TOKEN:$localStorage.authToken}
                    })
                .success(function(data){
					//console.log("details to save" + JSON.stringify($scope.value) + "activeCampaignDetails"+data);
					$state.go('dashboard',{update:"1"});
					
				})
				}
				$scope.saveConversation = function (formDetails,productDetails){
				var selectedChannel = "";
				var selectedChannel2 = "";
				var i=0;
				console.log(selectedChannel);
				$(".channelclass").each(function(){
				if($(this).prop("checked")==true){
				selectedChannel2 = selectedChannel2 +","+ $(this).attr('name');
				selectedChannel = selectedChannel2.replace(/^,/, '');
				console.log(selectedChannel);

				}
				i++;

				})
				$scope.selectedChannelsegment=selectedChannel;				
					$scope.value= productDetails;
					//$rootScope.infoMsgforCreation="Conversation has been saved successfully and sent for approval";
					$http({
                        method  : 'POST',
                        url     : GetHostUrl.cvmUrl+'/WSCampaign/campaigns/saveSegmentationValues',
                       headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                        data:$.param({
                            userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                            sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                            authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
							activeCampaignId : $localStorage.activeCampaignId,
							segmentationParams:{"segmentationparams":{"segment_type":"None","segments":[{"segment_value":"Segment","offerid":"0","offerTypeName":"","startDate":"","expiryDate":"","offerCost":0,"targetResponseRate":0}]}},
							noOfSegments : "1",
							count : productDetails.percentage,
							countType : $localStorage.countValue,
							outputList : "true,true,true,true,true ",
							outputListLabels : $scope.selectedChannelsegment
							
                            })
                    })
                .success(function(data){
					$scope.activeCampaignDetails = data;
					$scope.saveConversation1();
					//console.log("details to save" + JSON.stringify($scope.value) + "activeCampaignDetails"+data);
					})
					}
					
					$scope.customRemove = function(data){
						$("#removeClsFlag").removeClass('seg-act1');
						$scope.customTextbox = false;
						$localStorage.countValue = data;
						$scope.test23="";
					}

     })
