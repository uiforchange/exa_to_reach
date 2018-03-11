var configureSettings = angular.module("configureSettings",['ngStorage','ui.bootstrap','ngPatternRestrict']);

configureSettings.controller(
    "configureSettings_Controller",
    function($scope,$http,$window,$location,$stateParams,GetHostUrl,$state,$timeout,$localStorage,$rootScope)
    {

$scope.patternvariant = /^[a-zA-Z0-9]{5,25}$/;
$scope.patternNumber = /^[0-9]*$/;
//$scope.patternDecimal = /^[-+]?[0-9]+(\.[0-9]+)?$/;
$scope.patternDecimal = /^(\d{0,3}(\.\d{0,2})?)$/;
$scope.patternPercent = /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/;

 $scope.currentPage = 1;
  $scope.pageSize = 10;

		  $("select.select-box").change(function(){
            var selectedOption = $(this).find(":selected").text();
            $(this).next(".holder").text(selectedOption);
        }).trigger('change');
		$(".holder").text("Select");
              $('#txt_renameProduct').keydown(function (e) {
          if (e.ctrlKey || e.altKey) {
              e.preventDefault();
          } else {
              var key = e.keyCode;
              if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90) || key == 9)) {
                  e.preventDefault();
              }
          }
      });
       $scope.ControlGroupObj = {}

       $scope.allcontactCampaign=function(){
           alert("fgdhg");
           console.log("allcontactCampaign" + $scope.allcontactCampaign);
       }
               $scope.load=function()
         {
                $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+"/WSSettings/application/applicationSettings",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                            userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                            sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                            authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
                  })
                })
                .success(function(data)
                {
                    $scope.controlGroupDetails=data.ApplicationSettingsList.applicationSettings;
                    $scope.contolGroup_allowUser=$scope.controlGroupDetails[0].userEditable;
                    $scope.costPerContact_allowUser=$scope.controlGroupDetails[1].userEditable;
                    $scope.revenuePerConversion_allowUser=$scope.controlGroupDetails[2].userEditable;
                    $scope.contactedViaCampaign_allowUser=$scope.controlGroupDetails[8].userEditable;
                    $scope.allEmployees_allowUser=$scope.controlGroupDetails[7].userEditable;
                    $scope.vipCustomer_allowUser=$scope.controlGroupDetails[6].userEditable;
                    $scope.seededCustomer_allowUser=$scope.controlGroupDetails[9].userEditable;
                   $scope.ControlGroupObj.controlGroup= $scope.controlGroupDetails[0].value;
                   $scope.ControlGroupObj.costPerContact= $scope.controlGroupDetails[1].value;
                   $scope.ControlGroupObj.revenuePerConversion= $scope.controlGroupDetails[2].value;
                   if($scope.controlGroupDetails[8].enabled==1){
                       $scope.ControlGroupObj.days= $scope.controlGroupDetails[8].value;
                   }else{
                       $scope.ControlGroupObj.days= "";
                   }
                   
                   $scope.allemployee=$scope.controlGroupDetails[7].enabled;
                   $scope.allcontactCampaign=$scope.controlGroupDetails[8].enabled;
                   $scope.vipCustomer=$scope.controlGroupDetails[6].enabled;
                   $scope.seededData=$scope.controlGroupDetails[9].enabled;
              });
                $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+"/WSCampaign/settings/clientWiseCampaignSettings",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                            userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                            sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                            authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
                  })
                })
                .success(function(data)
                {
                    $scope.productCategoryDetails=data.ResultStatus.data.categoryBased;
                    console.log("product Details ==  "+ JSON.stringify(data));
                    $scope.productOrCategory=data.ResultStatus.data.categoryBased;
              });
                $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+'/WSProduct/products/allProducts',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
                  })
                })
                .success(function(data)
                {
                    for(var i=0;i<data.ProductList.products.length;i++)
                    {
                        if(data.ProductList.products[i].productStatus==1){
                            data.ProductList.products[i].selected = true;
                        }
                    }
                    $scope.renamevariants= data;
					//$scope.renameList=data.ProductList.products[0];
					$scope.renameList="";
                    //console.log($scope.showproducts);
              });

             $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+'/WSProduct/products/productsWithVariants',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
                  })
                })
                .success(function(data)
                {
                    $scope.showproducts= data;
                    for(var i=0;i<$scope.showproducts.ProductList.products.length;i++)
                    {
                        if($scope.showproducts.ProductList.products[i].productStatus==1){
                            $scope.showproducts.ProductList.products[i].selected = true;
                        }
                    }
              });

            $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+'/WSProduct/products/productsWithVariants',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken
                  })
                })
                .success(function(data)
                {
                    $scope.variants= data;
					//$scope.variantList=data.ProductList.products[0];
					$scope.variantList="";
                    // console.log($scope.variants)
              });
                }
            $scope.changeproduct= function(variantList)
            {
              $(".selectBoxEmpty").show(); 
            // console.log("variantList inside changeproduct" + variantList);
			if (angular.isObject(variantList)) {
            $scope.addnewtrue= true;
            $http({
            method  : 'POST',
            url     : GetHostUrl.cvmUrl+'/WSVariant/variants',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            data:$.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                productId: variantList.productId
            })
            })
            .success(function(data)
            {
            $scope.flag= true;
            $scope.tableproduct=data.ResultStatus.variants;
            $("#variantAddNew").hide();
            $scope.viewby = 10;
            $scope.totalItems = data.ResultStatus.variants.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            //$scope.maxSize = 5; //Number of pager buttons to show          
            })
			} else {
				$(".selectBoxEmpty").hide();
			}
            };

             $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function() {
            };

            $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first paghe
            }
            $scope.deleteVariantConfirm = function(d1){
			$scope.d1=d1;
            $("#deleteCampaign").modal("show");
			}
			
              $scope.deleteVariant = function(){
                  //console.log(d1);
                  $scope.d1product=$scope.d1.productId;
                  //console.log(d1.productId);
                  $("#variantAddNew").hide();

           $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+'/WSVariant/variants/delete',
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                    productId: $scope.d1.productId,
                    variantId: $scope.d1.id
                }),
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}

                })

                .success(function(data)
                {
                        //console.log(data);
                         $scope.changeproduct($scope.variantList);
                         $scope.commonAlertText="Deleted successfully";
                         $("#commonAlert").modal("show");
                })
        }
        $scope.variant_name="";
        $scope.variant_code="";
        $scope.addNewVariant = function(variant_name,variant_code,d1){
           var rx = new RegExp(/^\d+(?:\.\d{1,2})?$/);
    // if(rx.test(obj.controlGroup)){
            console.log("$scope.variant_name" + $scope.variant_name + "$scope.variant_code" + $scope.variant_code);
            $scope.productidss=d1.productId;
            //console.log($scope.productidss);
            $(".idris").hide();
            $(".idris1").show();
            //if($scope.variant_name!='' && $scope.variant_code!='')
            if($scope.variant_name!='' && $scope.variant_code!='' && $scope.variant_name!=' ' && $scope.variant_code!=' ')
            {
               
            $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+'/WSVariant/variants/new',
                data:$.param({
                    userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                    sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                    authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                    productId: d1.productId,
                    variantName: $("#txt_variantName").val(),
                    variantCode: $("#txt_variantCode").val()
                }),
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}

                })

                .success(function(data)
                {
                    console.log("data.status" + data.ResultStatus.status)
                    if(data.ResultStatus.status=="variant code already exists for the given product"){
                        $scope.commonAlertText="Entered variant code already exists.";
                         $("#commonAlert").modal("show");
                    }
                    else{
                        console.log(data + "$scope.variantList" + $scope.variantList);
                        $scope.commonAlertText="User data added";
                         $("#commonAlert").modal("show");
                        $scope.changeproduct($scope.variantList);
                        $('#variantAddNew').hide();
                         $scope.variant_name="";
                        $scope.variant_code="";
                    }
                })
                }
                else
                {
                    $scope.commonAlertText="Please enter valid data";
                    $("#commonAlert").modal("show");
                }

        }
        //UPDATE SHOW HIDE
        $scope.updateshowhide= function()
                {
                    $scope.newProductArr ="";
                    for(var i=0;i<$scope.showproducts.ProductList.products.length;i++)
                    {
                    if($scope.showproducts.ProductList.products[i].selected ==true){
                            $scope.newProductArr = $scope.showproducts.ProductList.products[i].productId +","+$scope.newProductArr;
                        }
                    }
                    $scope.newProductArr = $scope.newProductArr.substr("", $scope.newProductArr.length - 1);

                    console.log("$scope.newProductArr" + $scope.newProductArr.length);
                    if($scope.newProductArr.length==0){
                        $scope.commonAlertText="Please select atleast one product.";
                        $("#commonAlert").modal("show");
                    }
                    else{
                        $http({
                            method  : 'POST',
                            url     : GetHostUrl.cvmUrl+'/WSProduct/products/activate',
                            data:$.param({
                                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                                products: $scope.newProductArr
                            }),
                            headers : {'Content-Type': 'application/x-www-form-urlencoded'}

                            })

                            .success(function(data)
                            {
                                    console.log(data);
                                    $scope.commonAlertText="User data updated";
                                    $("#commonAlert").modal("show");
                            })
                    }
               

                }
                $scope.renameProduct= function(renamed,productIdss)
                {
                
                
                $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+'/WSProduct/products/update',
                data:$.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                productId:productIdss,
                updatedProductName: renamed
                }),
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}

                })

                .success(function(data)
                {
                        console.log(data);
                        $scope.commonAlertText="Product successfully renamed";
                        $("#commonAlert").modal("show");
                        $scope.load();
                        $(".holder").text("Select");
                })

                }
                $scope.enableVariantUpdate = function(value,index){
                $(".productaddnew").show();
                $(".idris").show();
                $(".idris1").hide();
                $scope.dis_varcode= true;
             
                $scope.variant_name = value.productType;
                $scope.variant_code = value.productTypeCode;
                $scope.productIdId = value.productId;
                $("#txt_variantName").val(value.productType);
                $("#txt_variantCode").val(value.productTypeCode);
                $("#txt_variantCode").attr("disabled",true);
                $scope.ida = value.id;
                $scope.updIndex = index;
				$("#txt_variantName").focus();
                }
                $scope.updateNewVariant = function()
                {
                 
                   if($scope.variant_name!='' && $scope.variant_name!=' ')
            { 
                $http({
                method  : 'POST',
                url     : GetHostUrl.cvmUrl+'/WSVariant/variants/update',
                data:$.param({
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                //productId: $scope.productIdId,
                variantId: $scope.ida,
                variantCode: $("#txt_variantCode").val(),
                variantName: $("#txt_variantName").val()
                  }),
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}

                })

                .success(function(data)
                {
                    //console.log($scope.tableproduct.ResultStatus.variants.length)
                    /*for(var i=0;i<$scope.tableproduct.ResultStatus.variants.length;i++){
                        if(i==$scope.updIndex){
                            console.log($scope.updIndex)
                            $scope.tableproduct.ResultStatus.variants[i].productType = $scope.variant_name
                        }
                    }*/
                    console.log("$scope.variantList in update" + $scope.variantList);
                   $scope.changeproduct($scope.variantList);
                   $('#variantAddNew').hide();
                  $scope.commonAlertText="Successfully updated";
                  $("#commonAlert").modal("show");
                   
                })

}
else{
	$scope.commonAlertText="Please enter valid variant name";
    $("#commonAlert").modal("show");
}
                }

        $(".header").show();
        $("#loginDiv").parent().parent().css( "background-color", "#e6e6e6" );
        $("body").removeClass( "body-bg" );
        $(".productaddnew").hide();
        $("#btn_newVariant").click(function(){
            $scope.dis_varcode= false;
            $("#txt_variantName").val("");
            $("#txt_variantCode").val("");
            $("#txt_variantCode").attr("disabled",false);
            $scope.variant_name="";
            $scope.variant_code="";
            $(".productaddnew").show();
            $(".idris").hide();
            $(".idris1").show();
        })
        $scope.cancelnewvariant= function()
        {
            $scope.dis_varcode= false;
            $(".productaddnew").hide();
            $(".idris").hide();
            $(".idris1").show();
            $("#txt_variantName").val("");
            $("#txt_variantCode").val("");
            $("#txt_variantCode").attr("disabled",false);
        }

        $scope.cancelvariant= function()
        {
            $scope.dis_varcode= false;
            $(".selectBoxEmpty").hide();
            $(".holder").text("Select");
        }


        $(".sNotSelected").click(function(){
$(this).parent().siblings().children().removeClass("sSelected");
            $(this).addClass("sSelected");

        })
        $(".sNotSelectedSetting").click(function(){
$(this).parent().siblings().children().removeClass("sSelectedSetting");
            $(this).addClass("sSelectedSetting");

        })
$scope.prod_categoryUpdate =function(){
 var url =GetHostUrl.cvmUrl+"/WSSettings/client/updateCampaignBase";
        $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({
                                            "userId": $localStorage.loginUserDet.LoginStatus.user.userId,
                                            "sessionId":$localStorage.loginUserDet.LoginStatus.sessionId,
                                            "authToken":$localStorage.loginUserDet.LoginStatus.user.authToken,
                                            "campaignBase":$scope.productOrCategory
                                            
                                  }),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    
        }).success(function(data){
            $scope.commonAlertText="Successfully updated";
            $("#commonAlert").modal("show");
            $scope.productOrCategory=data.ResultStatus.data.categoryBased;
            console.log("prod_categoryUpdate = "+JSON.stringify(data))
            
          
})}
//  controlGroup:"",
//  costPerContact:"",
//  revenuePerConversion:"",
//  days:""
$scope.controlGroupUpdate =function(obj){
var rx = new RegExp(/^\d+(?:\.\d{1,2})?$/);
    
        console.log("obj.days" + JSON.stringify(obj))
    if(obj.controlGroup==""||obj.costPerContact==""||obj.revenuePerConversion==""||($scope.allcontactCampaign=="1"&&(obj.days==""||obj.days==0||obj.days=="00"))){
        if(obj.controlGroup==""){
            $scope.commonAlertText="Please provide Control Group value";
            $("#commonAlert").modal("show");
        }
        else if(obj.costPerContact==""){
            $scope.commonAlertText="Please provide Cost per Contact";
            $("#commonAlert").modal("show");
        }
        else if(obj.revenuePerConversion==""){
            $scope.commonAlertText="Please provide Revenue per Conversion";
            $("#commonAlert").modal("show");
        }   
        else if($scope.allcontactCampaign=="1"&&obj.days==""){
                $scope.commonAlertText="Please provide the number of days";
                $("#commonAlert").modal("show");
        } 
        else if($scope.allcontactCampaign=="1"&&(obj.days==0||obj.days=="00")){
                $scope.commonAlertText="Please provide valid number of days";
                $("#commonAlert").modal("show");
        }     
    }
     else if(rx.test(obj.controlGroup)){
        console.log("$scope.seededData" + $scope.seededData)
        if($scope.seededData==true){
            $scope.seededDataInput=1;
            $scope.seededData=1;
        }
        if($scope.seededData==false){
            $scope.seededDataInput=0;
            $scope.seededData=0;
        }
        if($scope.allemployee==true){
            $scope.allemployeeInput=1;
            $scope.allemployee=1;
        }
        if($scope.allemployee==false){
            $scope.allemployeeInput=0;
            $scope.allemployee=0;
        }
        if($scope.vipCustomer==true){
            $scope.vipCustomerInput=1;
            $scope.vipCustomer=1;
        }
        if($scope.vipCustomer==false){
            $scope.vipCustomerInput=0;
            $scope.vipCustomer=0;
        }
        //console.log("$scope.days1" + obj.days)
        if(obj.days!=""&&obj.days!=null&&obj.days!=undefined&&obj.days!=" "){
            $scope.days=obj.days;
        }else{
            $scope.days=0;
        }
        console.log("$scope.days" + $scope.days)
 var url =GetHostUrl.cvmUrl+"/WSSettings/application/updateConfig";

        $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({
                                            userId: $localStorage.loginUserDet.LoginStatus.user.userId,
                                            sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                                            authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                                            controlGroup:obj.controlGroup,
                                            isControlGroupUserOverrideable: $scope.contolGroup_allowUser,
                                            costPerCampaign: obj.costPerContact,
                                            isCostPerCampaignUserOverrideable: $scope.costPerContact_allowUser,
                                            revenuePerCampaign: obj.revenuePerConversion,
                                            isRevenuePerCampaignUserOverrideable: $scope.revenuePerConversion_allowUser,
                                            contactedViaCampaign: $scope.days,
                                            contactedViaCampaignOverridable: $scope.allcontactCampaign,
                                            allEmployees:$scope.allemployeeInput,
                                            allEmployeesOverridable: $scope.allemployeeInput,
                                            vip:$scope.vipCustomerInput,
                                            vipOverridable: $scope.vipCustomerInput,
                                            seeded:$scope.seededDataInput,
                                            seededOverridable:$scope.seededDataInput
                                  }),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    
        }).success(function(data){
            // standardInclusions:$scope.seededData,
            // standardExclusions:$scope.allemployee
            $scope.commonAlertText="Successfully updated";
            $("#commonAlert").modal("show");
             $scope.allemployee=$scope.allemployeeInput;
             //$scope.allcontactCampaign=$scope.controlGroupDetails[8].enabled;
            $scope.vipCustomer=$scope.vipCustomerInput;
             $scope.seededData=$scope.seededDataInput;
            //  $scope.ControlGroupObj = {

            //         controlGroup:"",
            //         costPerContact:"",
            //         revenuePerConversion:"",
            //         days:""
            //   }
           //$("#div_allowUserToOverrideVip").removeClass("sSelectedSetting");

     })
    }
    else{	
        $scope.commonAlertText="Please provide valid input";
        $("#commonAlert").modal("show");
        return false;
	}

}

 $scope.fetchProductType= function(obj){
$scope.productOrCategory=obj;
console.log("fetchProductType : "+ $scope.productOrCategory)
}

$scope.contolGroup_allow= function(obj){
$scope.contolGroup_allowUser=obj;
console.log("contolGroup_allowUser : "+ $scope.contolGroup_allowUser)
}

$scope.costPerContact_allow= function(obj){
$scope.costPerContact_allowUser=obj;
console.log("costPerContact_allowUser : "+ $scope.costPerContact_allowUser)
}


$scope.revenuePerConversion_allow= function(obj){
$scope.revenuePerConversion_allowUser=obj;
console.log("revenuePerConversiont_allowUser : "+ $scope.revenuePerConversion_allowUser)
}

$scope.standardExclusions_allow= function(obj){
$scope.standardExclusions_allowUser=obj;
console.log("standardExclusions_allowUser : "+ $scope.standardExclusions_allowUser)
}

$scope.contactedViaCampaign_allow= function(obj){
    //if($scope.allcontactCampaign=="1"){
        $scope.contactedViaCampaign_allowUser=obj;
        console.log("contactedViaCampaign_allowUser : "+ $scope.contactedViaCampaign_allowUser)
    //}
}

$scope.allEmployees_allow= function(obj){
$scope.allEmployees_allowUser=obj;
console.log("allEmployees_allowUser : "+ $scope.allEmployees_allowUser)
}

$scope.vipCustomer_allow= function(obj){
$scope.vipCustomer_allowUser=obj;
console.log("vipCustomer_allowUser : "+ $scope.vipCustomer_allowUser)
}
$scope.seededCustomer_allow= function(obj){
$scope.seededCustomer_allowUser=obj;
console.log("seededCustomer_allowUser : "+ $scope.seededCustomer_allowUser)
}

 
 $scope.controlGroup_Test =function(obj){
     console.log("test obj == "+ obj.controlGroup)
 }

// $('#txt_controlGroup').keyup(function () {
//     if (!this.value.match(/^\d+(?:\.\d{1,2})?$/)) {
//         this.value = this.value.replace(/[^0-9]/g, '');
//     }
// });
// $('#txt_costPerCampaign').keyup(function () {
//     if (!this.value.match(/^\d+(?:\.\d{1,2})?$/)) {
//         this.value = this.value.replace(/[^0-9]/g, '');
//     }
// });
// $('#txt_revenuePerCampaign').keyup(function () {
//     if (!this.value.match(/^\d+(?:\.\d{1,2})?$/)) {
//         this.value = this.value.replace(/[^0-9]/g, '');
//     }
// });
$('#txt_contactedViaCampaign_days').keyup(function () {
    if (!this.value.match(/^\d+(?:\.\d{1,2})?$/)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});
$scope.load();
$scope.getControlGroupDetails =function(){
 var url =GetHostUrl.cvmUrl+"/WSSettings/application/applicationSettings";
        $http({
                        method  : 'POST',
                        url     : url,
                        data    : $.param({
                                            "userId": $localStorage.loginUserDet.LoginStatus.user.userId,
                                            "sessionId":$localStorage.loginUserDet.LoginStatus.sessionId,
                                            "authToken":$localStorage.loginUserDet.LoginStatus.user.authToken,
                                            "campaignBase":$scope.productOrCategory
                                            
                                  }),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    
        }).success(function(data){
            console.log("prod_categoryUpdate = "+JSON.stringify(data))
            $scope.commonAlertText="Successfully updated";
            $("#commonAlert").modal("show");
          
})}
configureSettings.directive('parseInt', [function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, controller) {
                    controller.$formatters.push(function (modelValue) {
                        console.log('model', modelValue, typeof modelValue);
                        return '' + modelValue;
                    });

                    controller.$parsers.push(function (viewValue) {
                        console.log('view', viewValue, typeof viewValue);
                        return parseInt(viewValue,10);
                    });
                }
            }
        } ])


    })