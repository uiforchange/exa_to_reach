var contactlist1 = angular.module("contactlist",[]);
contactlist1.controller("contact_list_Controller",function($scope, $http, $window, $location, $stateParams, GetHostUrl, $state, $timeout,$rootScope,$localStorage){
    
    
    $("#loginDiv").parent().parent().css( "background-color", "#e6e6e6" );
    $("body").removeClass( "body-bg" );
    $(".footer").hide();
    $(".login-footer").hide();
    $(".header").show();
        $(".modal-backdrop.fade.in").remove();
    $(".modal-open").removeClass("modal-open");
    $scope.id = $stateParams.id;
    $scope.clientRefCodeForOffer = "e4881d00-5baa-413f-a5fd-afe2712df360";
    $scope.loadData = function(){
        $http({
            method:"POST",
            url:GetHostUrl.hostUrl+"/contactlist/listContactList",
            headers:{'Content-Type': 'application/json'},
            data:{clientRefCode:$scope.clientRefCodeForOffer}
            })
        .success(function(data) {
            $scope.items = data;
            $scope.filteredItems = data;
            
        });
    }
     
     
  
    
   // alert(0)
    $scope.checkAll = function () {

        console.log("selected " +$scope.selectedAll);
        if ($scope.selectedAll==true) {
            console.log("selected true " +$scope.selectedAll);
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
            console.log("selected false " +$scope.selectedAll);
        }
        angular.forEach($scope.filteredItems, function (item) {
      
            item.selected = $scope.selectedAll;
        });

    };



    // $scope.checkStatus= function() {
    //         var checkCount = 0;
    //         angular.forEach($scope.filteredItems, function(item) {
    //              if(item.selected) checkCount++;
    //         });
    //             $scope.selectedAll = ( checkCount === $scope.items.length);
    //     };
    
    $scope.selectedCont= [];
    $scope.checkStatus  = function(refCode,$index){
        $scope.selectedIndex = $index;
        var contObj = {};
        contObj.contactListrefcode = refCode;
        contObj.clientRefCode = $scope.clientRefCodeForOffer;
        contObj.campaignListrefcode = $scope.id;
        contObj.modifiedBy = "12345";
        $scope.selectedCont.push(contObj);        
    }

    $scope.contactListGen = function(){
        // $scope.selectedCont= [];
        // $(".contactSelected").each(function(){
        //     var contObj = {};
        //     if($(this).prop("checked")==true){
        //         contObj.contactListrefcode = $(this).attr('name');
        //         contObj.clientRefCode = $scope.clientRefCodeForOffer;
        //         contObj.campaignListrefcode = $scope.id;
        //         contObj.modifiedBy = "12345";
        //         $scope.selectedCont.push(contObj);
        //     }
        // })

        if($scope.selectedCont.length==0){
            $scope.commonAlertText="Please select contacts";
            $("#commonAlert").modal("show");
        } else{

            $http({
                url:GetHostUrl.hostUrl+"/campaign/addContactListCampaign",
                method:"POST",
                headers:{'content-type':"application/json"},
                data:$scope.selectedCont
            })
            .success(function(data){
                console.log(data);
                $scope.selectedCont= [];
                $state.go('dashboard');
            })
        }
    }


    $scope.$watch('filteredItems', function(items){
        var selectedItembox = 0;
        angular.forEach(items, function(item){
            selectedItembox += item.selected ? 1 : 0;
        })
        
        $scope.selectedItems = selectedItembox;
    }, true);

    $scope.loadData();
});
