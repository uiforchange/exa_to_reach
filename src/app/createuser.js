var create_user = angular.module("createuser",['ngStorage']);
create_user.directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
		elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
			ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }]);
create_user.directive('removespace', function ($compile) {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
          return event.which !== 32;
        });
    };
});
create_user.controller(
    "createuserController",
    function($scope,$http,$window,$location,GetHostUrl,$state,$stateParams,$timeout,$localStorage,$rootScope)
    {   
        var settingurl =  GetHostUrl.cvmUrl+'/WSCampaign/settings/clientWiseCampaignSettings';
            $http({
            method  : 'POST',
            url     : settingurl,
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
                $scope.categoryBased= data.ResultStatus.data.categoryBased;
                $scope.productBased= data.ResultStatus.data.productBased;
                if($scope.productBased==1){
                     var url1 =  GetHostUrl.cvmUrl+'/WSProduct/products/allProducts';
                        $http({
                        method  : 'POST',
                        url     : url1,
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
                            $scope.productlist= data.ProductList.products;
                            $scope.showProducts=true;
                            $scope.showCategories=false;
                        });
                            }
                else if($scope.categoryBased==1){
                     var url1 =  GetHostUrl.cvmUrl+'/WSCategory/categories/categoryList';
                        $http({
                        method  : 'POST',
                        url     : url1,
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
                            $scope.CategoryList= data.CategoryList.categories;
                            $scope.showProducts=false;
                            $scope.showCategories=true;
                        });
                            }
              });

       
        $timeout(function(){
                if($localStorage.editUser==true){
                    var url =  GetHostUrl.cvmUrl+'/WSUser/users/getUserDetails';
                    $http({
                        method  : 'POST',
                        url     : url,
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                        data:$.param({
                            adminId:$localStorage.loginUserDet.LoginStatus.user.userId,
                            sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                            authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                            userId:$stateParams.adminId
                        })
                        })
                    .success(function(data)
                    {
                        $scope.data=data;
                        $scope.username=$scope.data.user.name;
                        $scope.emailaddress=$scope.data.user.email;
                        $scope.usernametouse=$scope.data.user.username;
                        $scope.password=$scope.data.user.password;
                        $scope.confirmpass=$scope.data.user.password;
                        $scope.userId=$scope.data.user.userId;
                        $scope.EditUsername=true;
                        $("#userStatus").val($scope.data.user.status);
                        $("#userType").val($scope.data.user.level);

                        $scope.createuser.usernametouse.$setValidity("required",true);
                        $scope.createuser.usernametouse.$setValidity("pattern",true);
                        $scope.createuser.user_password.$setValidity("required",true);
                        $scope.createuser.user_password.$setValidity("pattern",true);
                        $scope.createuser.username.$setValidity("required",true);
                        $scope.createuser.username.$setValidity("pattern",true);
                        $scope.createuser.emailaddress.$setValidity("required",true);
                        $scope.createuser.emailaddress.$setValidity("pattern",true);
                        $scope.createuser.cPassword.$setValidity("required",true);
                        $scope.createuser.cPassword.$setValidity("pwmatch",true);
                        $scope.createuser.userType.$setValidity("required",true);

                        if($scope.productBased=="1"){
                        for(var k=0;k<$scope.data.user.products.length;k++){
                                for(var i=0;i<$scope.productlist.length;i++){
                                    if($scope.productlist[i].productName == $scope.data.user.products[k]){
                                            //$scope.productlist[i].setChannelAct = true;
                                            $('#product'+ $scope.productlist[i].productId).parent().addClass("chck-active");
                                            $('#product'+ $scope.productlist[i].productId).prop("checked",true);
                                            console.log("checked prop" + $('#product'+ $scope.productlist[i].productId).prop("checked"));
                                        }
                                 }
                            }
                        }
                        else if($scope.categoryBased=="1"){
                            for(var k=0;k<$scope.data.user.categories.length;k++){
                                for(var i=0;i<$scope.CategoryList.length;i++){
                                    if($scope.CategoryList[i].name == $scope.data.user.categories[k]){
                                            //$scope.CategoryList[i].setChannelAct = true;
                                            $('#category'+ $scope.CategoryList[i].id).parent().addClass("chck-active");
                                            $('#category'+ $scope.CategoryList[i].id).prop("checked",true);
                                        }
                            }
                        }
                        }
                    });
                }
                else{
                    $scope.EditUsername=false;
                }
        },1000)
        $scope.patternname = /^[a-zA-Z ]*$/;
        $scope.patterncontactnumber = /(1\s?)?(\()?\b(\d{3})(\))?(\s|\-)*(\d{3})(\s|\-)*(\d{4})\b(?!\))/;
        $scope.patternusername = /^[a-zA-Z0-9]{5,25}$/;
        $scope.patternpassword=/^[a-zA-Z0-9]{5,15}$/;
        $scope.patternemailaddress = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        $scope.get_selectedtype=function(){
            if($scope.usertype_selected=="0"){
                $scope.showProducts=false;
                $scope.showCategories=false;
            }
            else{
                if($scope.productBased==1){
                    $scope.showProducts=true;
                }
                else if($scope.categoryBased==1){
                    $scope.showCategories=true;
                } 
            }
        }

        $scope.get_selectedstatus=function(){
        }

        $scope.save_user_profile=function(){
            $scope.mappedProducts="";
            $scope.mappedCategories="";
             if($scope.productBased==1){
                  for(var k=0;k<$scope.productlist.length;k++){
                  if($('#product'+ $scope.productlist[k].productId).prop("checked")==true){
                      if($scope.mappedProducts==""){
                          $scope.mappedProducts = $scope.productlist[k].productId;
                      }
                      else{
                          $scope.mappedProducts = ($scope.productlist[k].productId) + "," + ($scope.mappedProducts) ;
                      }
                   }
                               
                     }
                     $scope.mappedCategories="";
                }
                else if($scope.categoryBased==1){

                     for(var k=0;k<$scope.CategoryList.length;k++){
                        if($('#category'+ $scope.CategoryList[k].id).prop("checked")==true){
                            if($scope.mappedCategories==""){
                                $scope.mappedCategories = $scope.CategoryList[k].id;
                            }
                            else{
                                $scope.mappedCategories = ($scope.CategoryList[k].id) + "," + ($scope.mappedCategories) ;
                            }
                        }
                                    
                    }
                    $scope.mappedProducts="";
                }

            if($scope.userstatus_selected==""){
                $scope.userstatus_selected=1;
            }
            if($localStorage.editUser==false){
            var url =  GetHostUrl.cvmUrl+'/WSUser/users/createUser';
            $http({
            method  : 'POST',
            url     : url,
            data    : 
            $.param({
                adminId:"2",
                userId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                username:$scope.usernametouse,
                password:$scope.password,
                name:$scope.username,
                email:$scope.emailaddress,
                userLevel:$scope.usertype_selected,
                mappedCategories:$scope.mappedCategories,
                mappedProducts:$scope.mappedProducts,
                status:$scope.userstatus_selected
            }), 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data)
            {
                $state.go("manageUsers",{update:"1"});
                $rootScope.infoMsg="User has been created successfully";
              });
            }
            else{
                $scope.userstatus_selected=$("#userStatus").val();
                $scope.usertype_selected=$("#userType").val();

                var url =  GetHostUrl.cvmUrl+'/WSUser/users/updateUser';
            $http({
            method  : 'POST',
            url     : url,
            data    : 
            $.param({
                adminId:$localStorage.loginUserDet.LoginStatus.user.userId,
                sessionId:$localStorage.loginUserDet.LoginStatus.sessionId,
                authToken:$localStorage.loginUserDet.LoginStatus.user.authToken,
                userId:$stateParams.adminId,
                password:$scope.password,
                name:$scope.username,
                email:$scope.emailaddress,
                userLevel:$scope.usertype_selected,
                mappedCategories:$scope.mappedCategories,
                mappedProducts:$scope.mappedProducts,
                userStatus:$scope.userstatus_selected
            }), 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(function(data)
            {
                $state.go("manageUsers",{update:"1"});
                $rootScope.infoMsg="User has been updated successfully";
              });
            }
        }

        $scope.reset_user_profile=function(){
            if($localStorage.editUser==false){
                $scope.usernametouse="";
            }
            $scope.commonAlertText="Do you want to reset the datas entered";
            $("#commonAlert").modal("show");
            $scope.ok=function()
            {
            $scope.username="";
            $scope.emailaddress="";
            $scope.password="";
            $scope.confirmpass="";
            $scope.usertype_selected="";
            $scope.userstatus_selected="";
            }
            if($(".chkbox-holder").hasClass("chck-active")){
                 $(".chkbox-holder").removeClass("chck-active");
                $(".chkbox-holder").children(".channelclass").prop("checked",false);
             }
            //  if($scope.productBased==1){
            //       for(var i=0;i<$scope.productlist.length;i++){
            //             $scope.productlist[i].setChannelAct = false;
            //         }
            //     }
            //     else if($scope.categoryBased==1){
            //          for(var i=0;i<$scope.CategoryList.length;i++){
            //             $scope.CategoryList[i].setChannelAct = false;
            //         }
            //     }

            
           
        }

        $(document).on('click','.chkbox-holder',function(e){
                            if($(this).hasClass("chck-active")){
                                $(this).removeClass("chck-active");
                                $(this).children(".channelclass").prop("checked",false);
                            }
                            else{
                                $(this).addClass("chck-active");
                                $(this).children(".channelclass").prop("checked",true);
                            }
                            e.preventDefault();
                    })

     })