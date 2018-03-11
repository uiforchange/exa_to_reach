var newCampaign = angular.module("createnewcampaign",['ui.sortable','ngStorage']);
				function isArray(obj){

    return !!obj && Array === obj.constructor;

}
newCampaign.controller(
	"createCampaignController",
	function($scope,$http,$window,$location,GetHostUrl,$state,$stateParams,$timeout,$localStorage)
	{
	
	$scope.updateBtn = $localStorage.showsave;
 //Goals Start		
 	$(".modal-backdrop.fade.in").remove();
	$(".modal-open").removeClass("modal-open");
	$scope.goals= [{"goalName":"response","setChannelAct":false},{"goalName":"awareness","setChannelAct":false},{"goalName":"customersatisfaction","setChannelAct":false},{"goalName":"service","setChannelAct":false}];
    
                    $scope.goalsArr= ["Response","Awareness","Customer Satisfaction","Service"];
         
				//Goals end

		$http({
			method  : 'POST',
			url     : GetHostUrl.cvmUrl+'/WSCampaign/campaigns/getApplicationSettings',
			headers : {'Content-Type': 'application/x-www-form-urlencoded'},
			data:$.param({
				userId:$localStorage.loginUserDet.LoginStatus.user.userId,
				sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
				authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
			})
		})
		.success(function(data)
		{
			$scope.appsetting = data.ApplicationSettingsOutput.applicationSettingsList;
			$scope.controlgroup = data.ApplicationSettingsOutput.applicationSettingsList[0].userOverrideable;
			$scope.cost_per_campaign = data.ApplicationSettingsOutput.applicationSettingsList[1].userOverrideable;
			$scope.revenue_per_campaign = data.ApplicationSettingsOutput.applicationSettingsList[2].userOverrideable;
			


		})
		$http({
			method  : 'POST',
			url     : GetHostUrl.cvmUrl+'/WSCampaign/settings/clientWiseCampaignSettings',
			headers : {'Content-Type': 'application/x-www-form-urlencoded'},
			data:$.param({
				userId:$localStorage.loginUserDet.LoginStatus.user.userId,
				sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
				authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
			})
		})
		.success(function(data)
		{
			$scope.clientWiseCampaignSettings = data.ResultStatus.data.categoryBased;
			
			console.log($scope.clientWiseCampaignSettings);
			if($scope.clientWiseCampaignSettings==1)
		{
			

			$scope.categorysetting=0; 
			$scope.productsetting=1; 
			$http({
				method  : 'POST',
				url     : GetHostUrl.cvmUrl+'/WSCategory/categories/categoryList',
				headers : {'Content-Type': 'application/x-www-form-urlencoded'},
				data:$.param({
					userId:$localStorage.loginUserDet.LoginStatus.user.userId,
					sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
					authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
				})
			})
			.success(function(data)
			{
				$scope.createcampaignproduct = data;

			})

			$scope.selectcategory = function(productName,$index){
				
				$scope.flag2=1;
				$scope.flag=1;
				$scope.flag1=0;
				$scope.selectedCon1Index = -1;
				$scope.selectedConTypeIndex = -1;
				$scope.productNamess=productName;
				
				$scope.selectedIndex = $index;
				$('.radio-disable').attr('disabled','disabled');
				
				$http({
					method  : 'POST',
					url     : GetHostUrl.cvmUrl+'/WSCampaign/campaigns/productMappedCategories',
					headers : {'Content-Type': 'application/x-www-form-urlencoded'},
					data:$.param({
						userId:$localStorage.loginUserDet.LoginStatus.user.userId,
						sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
						authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
						product: productName
					})
				})
				.success(function(data){
					
					$scope.conversationDis = data.productMappedCategories;
					
					
					for(var k=0;k<$scope.conversationObjModel.ProductList.products.length;k++){
						
						$scope.conversationObjModel.ProductList.products[k].disable = true;
					}
					if($scope.conversationDis==undefined)
					{
						$scope.conversationObjModel.ProductList.products[j].disable = true;	 
					}
					else
					{

						for(var i=0;i<$scope.conversationDis.length;i++){
							for(var j=0;j<$scope.conversationObjModel.ProductList.products.length;j++){

								if($scope.conversationDis.categories[i] === $scope.conversationObjModel.ProductList.products[j].productName){
                                //console.log(i+" "+$scope.conversationDis[i].campaignObjectname+" "+j+" "+ $scope.conversationObjModel[j].name)
                                $scope.conversationObjModel.ProductList.products[j].disable = false;
                            }
                        }
                    }
                }
               //console.log($scope.conversationObjModel);
           })

}
$scope.conversationcategoryType = function(){
	$scope.selectedCon1Index = -1;
	$scope.selectCamTypeAtt = false;
	var url = GetHostUrl.cvmUrl+'/WSProduct/products/productList';
	$http({
		method  : 'POST',
		url     : url,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'},
		data:$.param({
			userId:$localStorage.loginUserDet.LoginStatus.user.userId,
			sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
			authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
		})
	})
	.success(function(data){
		$scope.conversationObjModel = data;
		for(var i=0;i<$scope.conversationObjModel.ProductList.products.length;i++){
			$scope.conversationObjModel.ProductList.products[i].disable = true;
		}
                    //console.log($scope.conversationObjModel);
                })
}
}
else
{

	$scope.productsetting=0; 
	$scope.categorysetting=1;
	$http({
		method  : 'POST',
		url     : GetHostUrl.cvmUrl+'/WSProduct/products/productList',
		headers : {'Content-Type': 'application/x-www-form-urlencoded'},
		data:$.param({
			userId:$localStorage.loginUserDet.LoginStatus.user.userId,
			sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
			authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
		})
	})
	.success(function(data)
	{
		$scope.createcampaignproduct = data;

	})

	$scope.selectproduct = function(productName,$index){
		$scope.flag2=1;
		$scope.flag=1;
		$scope.flag1=0;
		$scope.selectedCon1Index = -1;
		$scope.selectedConTypeIndex = -1;
		$scope.productNamess=productName;
		$localStorage.productNamess=productName;
		$scope.newFunction();
		$scope.selectedIndex = $index;
		$('.radio-disable').attr('disabled','disabled');
		$http({
			method  : 'POST',
			url     : GetHostUrl.cvmUrl+'/WSCampaign/campaigns/productMappedCategories',
			headers : {'Content-Type': 'application/x-www-form-urlencoded'},
			data:$.param({
				userId:$localStorage.loginUserDet.LoginStatus.user.userId,
				sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
				authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
				product: productName
			})
		})
		.success(function(data){
			$scope.conversationDis = data.productMappedCategories;

           $localStorage.selectedConversationValue="";
           $localStorage.selectedconversationname="";

			for(var k=0;k<$scope.conversationObjModel.CategoryList.categories.length;k++){

				$scope.conversationObjModel.CategoryList.categories[k].disable = true;
			}
			if($scope.conversationDis==undefined)
			{
				$scope.conversationObjModel.CategoryList.categories[j].disable = true;	 
			}
				else if(isArray($scope.conversationDis.categories)==false){
					for(var j=0;j<$scope.conversationDis.categories.length;j++){
					if($scope.conversationDis.categories === $scope.conversationObjModel.CategoryList.categories[j].name){
						console.log($scope.conversationObjModel.CategoryList.categories[j].name);
						$scope.conversationObjModel.CategoryList.categories[j].disable = false;
					}
					}
					
				}
			else
			{
				for(var i=0;i<$scope.conversationDis.categories.length;i++){
					for(var j=0;j<$scope.conversationObjModel.CategoryList.categories.length;j++){

						if($scope.conversationDis.categories[i] === $scope.conversationObjModel.CategoryList.categories[j].name){
                                
                                $scope.conversationObjModel.CategoryList.categories[j].disable = false;
                            }
                        }
                    }
                }
			
               //console.log($scope.conversationObjModel);
           })

}
$scope.conversationObj = function(){
	$scope.selectedCon1Index = -1;
	$scope.selectCamTypeAtt = false;
	var url =  GetHostUrl.cvmUrl+'/WSCategory/categories/categoryList';
	$http({
		method  : 'POST',
		url     : url,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'},
		data:$.param({
			userId:$localStorage.loginUserDet.LoginStatus.user.userId,
			sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
			authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
		})
	})
	.success(function(data){
		$scope.conversationObjModel = data;
		for(var i=0;i<$scope.conversationObjModel.CategoryList.categories.length;i++){

			$scope.conversationObjModel.CategoryList.categories[i].disable = true;
		}
                    //console.log($scope.conversationObjModel);
                })
}
$scope.conversationObj();
}

		})
		
$scope.flag2=1;
$scope.flag=1;

$('#cgroup').keypress(function(e) {
	
   if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
               return false;
    }

});
// $('#campaignTitle').keypress(function(e) {
//    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
//         //display error message
//                return false;
//     }
   
// });
$('#campaignTitle').on('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z0-9_ -]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});
$('#cost').keypress(function(event) {
   if(event.which == 8 || event.which == 0){
        return true;
    }
    if(event.which < 46 || event.which > 59) {
        return false;
        //event.preventDefault();
    } // prevent if not number/dot
    
    if(event.which == 46 && $(this).val().indexOf('.') != -1) {
        return false;
        //event.preventDefault();
    } // preve
   
});
$('#revenue').keypress(function(event) {
   if(event.which == 8 || event.which == 0){
        return true;
    }
    if(event.which < 46 || event.which > 59) {
        return false;
        //event.preventDefault();
    } // prevent if not number/dot
    
    if(event.which == 46 && $(this).val().indexOf('.') != -1) {
        return false;
        //event.preventDefault();
    } // preve
   
});
$("#loginDiv").parent().parent().css( "background-color", "#e6e6e6" );
$("body").removeClass( "body-bg" );
$scope.settEnable=0;



$scope.conversationType = function(conversationObjName,$index){
	$scope.flag=0;
	$scope.flag1=1;
	$scope.flag2=1;
	$scope.selectedCon1Index = $index;
	$scope.selectedConversationValue = conversationObjName;
	$localStorage.selectedConversationValue1 = conversationObjName;
	$localStorage.selectedConversationValue = conversationObjName;
	$scope.newFunction();
	$scope.selectedConversationTypeValue  = "";
	$scope.selectedConTypeIndex = -1;

	$http(
	{
		method  : 'POST',
		url     :  GetHostUrl.cvmUrl+'/WSCampaign/campaigns/categoryProductMappedCampaignList',
		headers : {'Content-Type': 'application/x-www-form-urlencoded'},
		data:$.param({
			userId:$localStorage.loginUserDet.LoginStatus.user.userId,
			sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
			authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
			product: $scope.productNamess,
			category: conversationObjName
		})
	})
	.success(function(data){

					//$scope.conversationTypeModel=[];
					//$scope.conversationTypeModel.push(data.CampaignList.campaign);
					//console.log($scope.conversationTypeModel);
					//console.log($scope.conversationTypeModel.length);
					$localStorage.selectedconversationname="";
					if(data.CampaignList.campaign.length>0)
					{
						$scope.conversationTypeModel = data.CampaignList.campaign;
					}
					else
					{
						$scope.conversationTypeModel = [];	
						$scope.conversationTypeModel.push(data.CampaignList.campaign);
					}

					
					$scope.selectCamTypeAtt = true;
				})
}
$scope.conversarionTypeSelect = function(conversationname,conversationid,$index){
	$scope.selectedConTypeIndex = $index;
	$scope.selectedconversationname=conversationname;
	$scope.selectedconversationid=conversationid;

	$localStorage.selectedconversationid=$scope.selectedconversationid;
	$localStorage.selectedconversationname=conversationname;
	$localStorage.selectedconversationname1=conversationname;
}


    //     	Date.prototype.addDays = function(date, days) {
	// 	newdate = new Date(date);
	// 	newdate.setDate(this.getDate() + days);
	// 	return newdate;
	// };
	// Date Picker


	var dates = $(".startDate, .endDate")
	
	
	$(".startDate")
	.datepicker(
	{

		dateFormat : 'yy-mm-dd',
		minDate : new Date(),
		onSelect: function(Date,datetext)
		{
			var d = new window.Date; 

			var h = d.getHours();
			h = (h < 10) ? ("0" + h) : h ;

			var m = d.getMinutes();
			m = (m < 10) ? ("0" + m) : m ;

			var s = d.getSeconds();
			s = (s < 10) ? ("0" + s) : s ;

			$scope.datetext33 = Date + " " + h + ":" + m + ":" + s;
			$scope.datetext = Date + " " + 0 + 0 + ":" + 0 + 0 + ":" + 0 + 0;
			var date2 = $('.startDate').datepicker('getDate');
			date2.setDate(date2.getDate()+30);
			$(".endDate").datepicker('option', 'minDate', Date);
			var sdfsdf = $(".endDate").datepicker('option', 'minDate', Date);
			console.log(sdfsdf);
			$('.endDate').datepicker('setDate', date2);
			$scope.date3 = $(".startDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
			$localStorage.date3 = $(".startDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
			$scope.date4 = $(".endDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();	
			$scope.dateendtime33 = $scope.date4 + " " + h + ":" + m + ":" + s;
			$scope.dateendtime = $scope.date4 + " " + 23 + ":" + 59 + ":" + 0+0;
			$localStorage.date4 = $(".endDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();	
			//$scope.datetextend= date2 + " " + h + ":" + m + ":" + s;
			$scope.newFunction();
			$scope.$apply();
		}
	});


$(".endDate")
.datepicker(
{
	defaultDate: "+30d",
	minDate : 1,
	dateFormat : 'yy-mm-dd',
	onSelect:function(date){
		$scope.date3 = $(".startDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
		$scope.date4 = $(".endDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();	
		console.log(date);
        console.log($scope.date3);  

		if($scope.date3==date)
		{
			//alert("Please Select Valid date");
			$scope.commonAlertText="Please select a valid date";
            $("#commonAlert").modal("show");
			$scope.date4 = $(".endDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();	

			var date2 = $('.startDate').datepicker('getDate');
			date2.setDate(date2.getDate()+30);
			$(".endDate").datepicker('option', 'minDate', '+2');
			$('.endDate').datepicker('setDate', date2);
			$scope.date4 = $(".endDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();	
		}
		
		console.log("Load:" + $scope.date4)
		$scope.dateendtime = $scope.date4 + " " + 23 + ":" + 59 + ":" +0+0;
		$scope.newFunction();
		$scope.$apply();
	}
});

$scope.date3 = $(".startDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
console.log("Load:" + $scope.date3)
$scope.date4 = $(".endDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
console.log("Load:" + $scope.date4)
var datetext = $(".startDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
$scope.datetext = datetext + " 00:00:00";
var dateend = $(".endDate").datepicker({ dateFormat: 'yy-mm-dd' }).val();
$scope.dateendtime = dateend + " 23:59:59";
$scope.updateConversation= function(index){
	if($scope.productNamess==undefined)
	{
		$scope.commonAlertText="Please select a Product";
        $("#commonAlert").modal("show");
	}
	else if($localStorage.selectedConversationValue==undefined || $localStorage.selectedConversationValue=="")
	{
		$scope.commonAlertText="Please select the Conversation Objective";
        $("#commonAlert").modal("show");
	}
	else if($localStorage.selectedconversationname==undefined || $localStorage.selectedconversationname=="")
	{
		$scope.commonAlertText="Please select the Conversation Type";
        $("#commonAlert").modal("show");
	}
	
	else if($scope.goals[0].setChannelAct==false && $scope.goals[1].setChannelAct==false && $scope.goals[2].setChannelAct==false && $scope.goals[3].setChannelAct==false)
	{
		$scope.commonAlertText="Please select the Conversation Goal";
        $("#commonAlert").modal("show");
	}
	else if($scope.appsetting[0].value=="")
	{
		$scope.commonAlertText="Please enter a valid Control Group value (1% to 20%)";
        $("#commonAlert").modal("show");
	}
	else if($scope.appsetting[1].value=="")
	{
		$scope.commonAlertText="Please provide Cost per Contact";
        $("#commonAlert").modal("show");
	}
	else if($scope.appsetting[2].value=="")
	{
		$scope.commonAlertText="Please provide Revenue per Conversion";
        $("#commonAlert").modal("show");
	}
	else if($scope.campaignTitle==undefined)
	{
		$scope.commonAlertText="Please provide the Conversation Title";
        $("#commonAlert").modal("show");
	}
	else if($("#campaignDesc").val()=="")
	{
		$scope.commonAlertText="Please provide the Conversation description";
        $("#commonAlert").modal("show");
	}
	else
	{
		$localStorage.favstar=$scope.favstar;
		$localStorage.appsetting1 = $scope.appsetting[0].value;
		$localStorage.appsetting2 = $scope.appsetting[1].value;
		$localStorage.appsetting3 = $scope.appsetting[2].value;
		var selectedChannel = "";
		var selectedChannel2 = "";
		 var i=0;
		 $(".channelclass").each(function(){
			 if($(this).prop("checked")==true){
				 selectedChannel2 = selectedChannel2 +","+ $(this).attr('name');
				 selectedChannel = selectedChannel2.replace(/^,/, '');
		         console.log(selectedChannel);
				
			 }
			  i++;
		 })
		 
		$scope.selectedChannels = selectedChannel;
		$localStorage.selectedChannels= $scope.selectedChannels;
		console.log($localStorage.selectedChannels);
		$scope.campaignconversation= $('#campaignDesc').val();
		$scope.campaignconversation= $('#campaignDesc').val();
		$localStorage.campaignconversation= $('#campaignDesc').val();
		$localStorage.campaignTitle=$scope.campaignTitle;
		$scope.productNamess=$localStorage.productNamess;
		$scope.appsetting[0].value=$localStorage.appsetting1;

		$scope.lines = {
			refCode: $localStorage.campaignrefcode,
			sourceId: 12345,
			category: $scope.selectedConversationValue,
			name: $scope.campaignTitle,
			description: $scope.campaignconversation,
			controlgroup: 10,
			startOn: $scope.datetext,
			expireOn: $scope.dateendtime,
			active: "",
			modifiedOn: 0,
			campaigntypeid: $scope.selectedconversationid,
			modifiedBy: "",
			smschannel: 1,
			voicechannel: 1,
			directmailchannel: 1,
			pushchannel: 1,
			mailchannel: 1,
			costpercontact: 1,
			revenueforconvension: 20,
			product: $scope.productNamess,
			goals: $scope.selectedChannels,
			campaigntype: $scope.selectedconversationname
		};
		var url =  GetHostUrl.hostUrl+'/campaign/updateCampaign';
		$http({
			method  : 'POST',
			url     : url,
			data    : $scope.lines,
            // transformRequest: function(data) {
            // var str = [];
            // for(var p in data)
            // str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
            // return str.join("&");
            // },
            headers : {'Content-Type': 'application/json','AUTH_TOKEN' : $localStorage.authToken}
        })
		.then(function(data)
		{
				//alert("Conversation created Successfully");
				 
				$scope.postRefcode1();
				

			});

	}

}
$scope.saveConversation= function(index){
	if($scope.productNamess==undefined)
	{
		$scope.commonAlertText="Please select a Product";
        $("#commonAlert").modal("show");
	}
	else if($localStorage.selectedConversationValue==undefined || $localStorage.selectedConversationValue=="")
	{
		$scope.commonAlertText="Please select the Conversation Objective";
        $("#commonAlert").modal("show");
	}
	else if($localStorage.selectedconversationname==undefined || $localStorage.selectedconversationname=="")
	{
		$scope.commonAlertText="Please select the Conversation Type";
        $("#commonAlert").modal("show");
	}
	
	else if($scope.goals[0].setChannelAct==false && $scope.goals[1].setChannelAct==false && $scope.goals[2].setChannelAct==false && $scope.goals[3].setChannelAct==false)
	{
		$scope.commonAlertText="Please select the Conversation Goal";
        $("#commonAlert").modal("show");
	}
	else if($scope.appsetting[0].value=="")
	{
		$scope.commonAlertText="Please enter a valid Control Group value (1% to 20%)";
        $("#commonAlert").modal("show");
	}
	else if($scope.appsetting[1].value=="")
	{
		$scope.commonAlertText="Please provide Cost per Contact";
        $("#commonAlert").modal("show");
	}
	else if($scope.appsetting[2].value=="")
	{
		$scope.commonAlertText="Please provide Revenue per Conversion";
        $("#commonAlert").modal("show");
	}
	else if($scope.campaignTitle==undefined || $scope.campaignTitle=="")
	{
		$scope.commonAlertText="Please provide the Conversation Title";
        $("#commonAlert").modal("show");
	}
	else if($("#campaignDesc").val()=="")
	{
		$scope.commonAlertText="Please provide the Conversation description";
        $("#commonAlert").modal("show");
	}
	else
	{
		$localStorage.favstar=$scope.favstar;
		$localStorage.appsetting1 = $scope.appsetting[0].value;
		$localStorage.appsetting2 = $scope.appsetting[1].value;
		$localStorage.appsetting3 = $scope.appsetting[2].value;
		var selectedChannel = "";
		var selectedChannel2 = "";
		 var i=0;
		 $(".channelclass").each(function(){
			 if($(this).prop("checked")==true){
				 selectedChannel2 = selectedChannel2 +","+ $(this).attr('name');
				 selectedChannel = selectedChannel2.replace(/^,/, '');
		         console.log(selectedChannel);
				
			 }
			  i++;
		 })
		 
		$scope.selectedChannels = selectedChannel;
		$localStorage.selectedChannels= $scope.selectedChannels;
		console.log($localStorage.selectedChannels);
		$scope.campaignconversation= $('#campaignDesc').val();
		$localStorage.campaignconversation= $('#campaignDesc').val();
		$localStorage.campaignTitle=$scope.campaignTitle;
		$scope.productNamess=$localStorage.productNamess;
		$scope.appsetting[0].value=$localStorage.appsetting1;

		$scope.lines = {
			refCode: 12345,
			sourceId: 12345,
			category: $scope.selectedConversationValue,
			name: $scope.campaignTitle,
			description: $scope.campaignconversation,
			controlgroup: 10,
			startOn: $scope.datetext,
			expireOn: $scope.dateendtime,
			active: "",
			modifiedOn: 0,
			campaigntypeid: $scope.selectedconversationid,
			modifiedBy: "",
			smschannel: 1,
			voicechannel: 1,
			directmailchannel: 1,
			pushchannel: 1,
			mailchannel: 1,
			costpercontact: 1,
			revenueforconvension: 20,
			product: $scope.productNamess,
			goals: $scope.selectedChannels,
			campaigntype: $scope.selectedconversationname
		};
		var url =  GetHostUrl.hostUrl+'/campaign/createCampaign';
		$http({
			method  : 'POST',
			url     : url,
			data    : $scope.lines,
            // transformRequest: function(data) {
            // var str = [];
            // for(var p in data)
            // str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
            // return str.join("&");
            // },
            headers : {'Content-Type': 'application/json', 'AUTH_TOKEN' : $localStorage.authToken}
        })
		.then(function(data)
		{
				//alert("Conversation created Successfully");
				 console.log(data);
				$scope.refcoder=data.data.refCode;
				$localStorage.refcoder=$scope.refcoder;
				$scope.postRefcode();

			});

	}

}

$scope.postRefcode=function()
{
	
	
	$http({
		method  : 'POST',
		url     : GetHostUrl.cvmUrl+'/WSGenerateCampaign/generateCampaign/addActiveCampaignTitle',
		headers : {'Content-Type': 'application/x-www-form-urlencoded'},
		data:$.param({
			userId:$localStorage.loginUserDet.LoginStatus.user.userId,
			sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
			authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
			campaignId:$scope.selectedconversationid,
			communicator_refcode: $scope.refcoder,
			email: 1,
			sms: 1,
			voice: 1,
			push: 1,
			direct: 1,
			activeCampaignId: 0,
			activeCampaignTitle: $scope.campaignTitle,
			activeCampaignDesc: $scope.campaignconversation,
			startDate: $scope.date3,
			endDate: $scope.date4,
			controlGroup: 10,
			costPerCampaign:1,
			revenuePerCampaign:20,
			reminderDate: "2017-02-25",
			segmentationParams: "",
			noOfSegments: 1,
			acsp: "sdf",
			inclusions: "sdf",
			exclusions: "sdf",
			noOfSegments:1,
			goals: $scope.selectedChannels,
			isFavourite: $scope.favstar
		})
	})
.success(function(data)
{
	$scope.activeCampaignId=data.ActiveCampaignMailContents.activecampaignid;
	$localStorage.activeCampaignId=$scope.activeCampaignId;
	console.log($localStorage.activeCampaignId);
	$state.go("setFilter");
});
}
$scope.postRefcode1=function()
{
	
	
	$http({
		method  : 'POST',
		url     : GetHostUrl.cvmUrl+'/WSGenerateCampaign/generateCampaign/addActiveCampaignTitle',
		headers : {'Content-Type': 'application/x-www-form-urlencoded'},
		data:$.param({
			userId:$localStorage.loginUserDet.LoginStatus.user.userId,
			sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
			authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
			campaignId:$localStorage.selectedconversationid,
			communicator_refcode: $localStorage.campaignrefcode,
			email: 1,
			sms: 1,
			voice: 1,
			push: 1,
			direct: 1,
			activeCampaignId: $localStorage.activeCampaignId,
			activeCampaignTitle: $scope.campaignTitle,
			activeCampaignDesc: $scope.campaignconversation,
			startDate: $scope.date3,
			endDate: $scope.date4,
			controlGroup: 10,
			costPerCampaign:1,
			revenuePerCampaign:20,
			reminderDate: "2017-02-25",
			segmentationParams: "",
			noOfSegments: 1,
			acsp: "sdf",
			inclusions: "sdf",
			exclusions: "sdf",
			noOfSegments:1,
			isFavourite: $scope.favstar
		})
	})
.success(function(data)
{
	$scope.activeCampaignId=data.ActiveCampaignMailContents.activecampaignid;
	$localStorage.activeCampaignId=$scope.activeCampaignId;
	$localStorage.showsave= false;
	$scope.updateBtn = $localStorage.showsave;
	$state.go("dashboard");
});
}
	
$scope.favourite= function()
{
	$scope.favstar=1;
}
$scope.greaterthan= function(val)
{
	if(val>20 || val<=0)
	{
		$scope.commonAlertText="Please enter a valid Control Group value (1% to 20%)";
        $("#commonAlert").modal("show");
		$scope.appsetting[0].value="";
	}
	else
	{
		return true;
	}

}
$scope.greaterthanni= function(val)
{
	if(val>99 || val<=0)
	{
		$scope.commonAlertText="Please enter a valid value (1 to 99)";
		$('#commonAlert').modal({backdrop: 'static', keyboard: false})
		$("#commonAlert").modal("show");
		$('#cost').blur();
		$('#revenue').blur();
			$('#cost').keydown(function(e) {
			var code = e.keyCode || e.which;

			if (code === 9) {
			if($('#commonAlert').hasClass('in'))
			{

			e.preventDefault();
			}      
			}
			});
		
		$scope.appsetting[1].value="";

		
		
	}
	else
	{
		return true;
	}

}
$scope.greaterthanni1= function(val)
{
	if(val>99 || val<=0)
	{
		$scope.commonAlertText="Please enter a valid value (1 to 99)";
		$('#commonAlert').modal({backdrop: 'static', keyboard: false})
		$("#commonAlert").modal("show");
		$('#cost').blur();
		$('#revenue').blur();
			$('#revenue').keydown(function(e) {
			var code = e.keyCode || e.which;

			if (code === 9) {
			if($('#commonAlert').hasClass('in'))
			{

			e.preventDefault();
			}      
			}
			});
		
		$scope.appsetting[2].value="";

		
		
	}
	else
	{
		return true;
	}

}
$scope.favstar = 0;
$("#favourite").click(function(){
	if($(".favstar").hasClass("favstarselected"))
	{
		$(".favstar").removeClass("favstarselected")
		$scope.favstar = 0;
	}
	else{
		$(".favstar").toggleClass("favstarselected");
		$scope.favstar=1;
	}

});


					var productjq=  "";
					var productedsjq= "";
					var conversationtypejq= "";
					$scope.newFunction= function(){
						$timeout(function() {
							var desc="";
							console.log($scope.date3);
							console.log($scope.date4);
							var st_date = $scope.date3.split(' ');
							var end_date = $scope.date4.split(' ');
							if(st_date.length>0)
								{$scope.date3=st_date[0];}
							if(end_date.length>0)
								{$scope.date4=end_date[0];}
							if(($scope.productNamess!="") && ($scope.productNamess!=undefined) && ($scope.selectedConversationValue!="") && ($scope.selectedConversationValue!=undefined) && ($scope.final_channels!="") && ($scope.date3!="") && ($scope.date4!=""))
							{
								desc = "This Conversation relates to " + $scope.productNamess + "/" + $scope.selectedConversationValue + " and will run from " + $scope.date3 + " to " + $scope.date4;
								console.log($scope.date3);
							console.log($scope.date4);
							}
							console.log(desc);
							console.log($('#campaignDesc').val());						
							$('#campaignDesc').val(desc);
							//$scope.$apply();
							console.log($scope.date3);
							console.log($scope.date4);
							console.log($('#campaignDesc').val());
						}, 50);

					}



					$scope.backtohome = function()
					{
						$state.go("dashboard");
					}

					$scope.preFillCapDet = function(){

						if($localStorage.date3)
						{
							$scope.date3=$localStorage.date3;
							$('.startDate').datepicker('setDate', $scope.date3);
						}


						if($localStorage.date4)
						{
							$scope.date4=$localStorage.date4;
							$('.endDate').datepicker('setDate', $scope.date4);

						}
						$localStorage.createBack = false;
						$timeout(function(){

							for(var i=0;i<$scope.createcampaignproduct.ProductList.products.length;i++){
								if($scope.createcampaignproduct.ProductList.products[i].productName === $localStorage.productNamess){
									$scope.selectedIndex = i;
									$scope.selectedConversationValueCreate = $scope.createcampaignproduct.ProductList.products[i].productName;
									$scope.selectproduct($scope.selectedConversationValueCreate,i);
								}
							}
							for(var k=0;k<$scope.conversationObjModel.CategoryList.categories.length;k++){
								if( $scope.conversationObjModel.CategoryList.categories[k].name === $localStorage.selectedConversationValue){
									$scope.selectedCon1Index = k;
									$scope.selectedConversationTypeValueCreate = $scope.conversationObjModel.CategoryList.categories[k].name;
									$scope.conversationType($scope.selectedConversationTypeValueCreate,k);
								}
							}
							$timeout(function(){
								for(var j=0;j<$scope.conversationTypeModel.length;j++){
									if($scope.conversationTypeModel[j].name === $localStorage.selectedconversationname){
										$scope.selectedConTypeIndex = j;
										$scope.selectedconversationname = $scope.conversationTypeModel[j].name;
									}
									if($scope.conversationTypeModel[j].id === $localStorage.selectedconversationid){
										$scope.selectedConTypeIndex = j;
										$scope.selectedconversationid = $scope.conversationTypeModel[j].id;
									}
								}
							$localStorage.selectedConversationValue=$localStorage.selectedConversationValue1;
							$localStorage.selectedconversationname=$localStorage.selectedconversationname1;
							},2000)
							},3000)  
							
$timeout(function(){
	if($localStorage.campaignTitle)
	{
		$scope.campaignTitle=$localStorage.campaignTitle;
	}
},1000)
$timeout(function(){
	if($localStorage.campaignconversation)
	{
		$scope.campaignconversation=$localStorage.campaignconversation;
	}
},1000)
// $timeout(function(){
// 	if($localStorage.date3)
// 	{
// 		$scope.date3=$localStorage.date3;
// 		$('.startDate').datepicker('setDate', $scope.date3);
// 	}

// },1000)
// $timeout(function(){
// 	if($localStorage.date4)
// 	{
// 		$scope.date4=$localStorage.date4;
// 		$('.endDate').datepicker('setDate', ''$scope.date4);

// 	}
// },1000)
$timeout(function(){
	 $scope.appsetting[0].value = $localStorage.appsetting1;
	 $scope.appsetting[1].value =$localStorage.appsetting2;
	 $scope.appsetting[2].value =$localStorage.appsetting3;
	 if($localStorage.favstar==1)
	 {
		 $scope.commonAlertText="Star";
         $("#commonAlert").modal("show");
	 $scope.favstar=$localStorage.favstar;	 
	 $(".favstar").addClass("favstarselected");
	 }
	 
	 },1000)
 



$scope.goals= [{"goalName":"response","setChannelAct":false},{"goalName":"awareness","setChannelAct":false},{"goalName":"customersatisfaction","setChannelAct":false},{"goalName":"service","setChannelAct":false}];
                     console.log($scope.goals)
                    $scope.goalsArr= ["Response","Awareness","Customer Satisfaction","Service"];
                    $scope.checkGoals= $localStorage.selectedChannels.split(",");
                    $timeout(function(){
                        for(var i=0;i<$scope.goals.length;i++){
                            for(var j=0;j<$scope.checkGoals.length;j++){
                                console.log("j "+j);
                                if($scope.checkGoals[j]==$scope.goals[i].goalName){
                                        $scope.goals[i].setChannelAct = true;
                                    }
                            }
                        }
                       console.log($scope.goals)

                    })

}
if($localStorage.createBack == true){


	$scope.preFillCapDet();
}
else{


	return false;
}



})