

var design_and_selection = angular.module("design_and_selection",['ui.sortable','ngStorage']);

design_and_selection.controller(
    "Design_Controller",
    function($scope,$http,$window,$location,GetHostUrl,$state,$stateParams,$timeout,$localStorage,$rootScope)
    {   
        if($localStorage.loggedIn=="True"){
        }
        else{
            $state.go("login");
            $("#loginDiv").parent().parent().css( "background-color", "#98c900" );
            $("body").addClass( "body-bg" );
        }

          
        $scope.clientRefCodeForOffer = "e4881d00-5baa-413f-a5fd-afe2712df360";
       // $scope.clientRefCodeForOffer = "864be1bd-2790-42f8-882d-9c8a465afb11";
        $(".modal-backdrop.fade.in").remove();
        $(".modal-open").removeClass("modal-open");
        $scope.username = username;
        $scope.listCamp = function(){
            var url = GetHostUrl.hostUrl+'/campaign/listCampaign';
            $http(
                {
                    method  : 'POST',
                    url     : url,
                    data    : 
                            {
                                clientRefCode:$scope.clientRefCodeForOffer
                            },
                    headers :$localStorage.headerss
                }
            )
            .success(
                function(data,status)
                {
                    if(status=="200"){
                        $scope.campaign_names=data;
                        $scope.choice="Select";
                        $rootScope.triggerCamp();
                    }
                }
            ); 
        }
        //Assign Radio Value
        $scope.test = function(temp)
        {
            $scope.freq_cap=temp;
            $scope.dateFlag = false;    
        }
        //END
        
        $scope.dateFlag = true;
       
        $scope.count=0;
        // GetHostUrl.iterator = null;
        // GetHostUrl.labels = [];
        // GetHostUrl.style_id = null;
        $scope.autolimit="";
        $scope.autoselect="";
        $scope.addcss1 = function()
        {
            if($scope.autolimit=="box chck-active")
            {
                $scope.autolimit="";
            }
            else
            {
                $scope.autolimit="box chck-active";
            }
          
        }
        $scope.addcss2 = function()
        {
            if($scope.autoselect="box chck-active")
            $scope.autoselect="";
            else
            $scope.autoselect="box chck-active";
            
        }
        if(GetHostUrl.backValue != "new"){
             $scope.selection = 
            {
                ids: {}
            };
        }else{
            $scope.selection = GetHostUrl.selectionCap;
        }
        //Increment and Decrement function 
        $scope.incr = function (val,test)
        {
           $("#"+val).parent().siblings().show()
            var a=b=c=0;     
            for (var key in $scope.selection.ids) 
            {
                
                if ($scope.selection.ids.hasOwnProperty(key)) 
                {
                    if( $scope.selection.ids[key]==true)
                    {
                        a++;                   
                    }
                    else
                    {
                        b=b+1;
                        a++;
                    }
                    
                }
                 
            } 
            c=a-b;
            $scope.flag=c;
            console.log(c);
           if(c>=$scope.freq_cap)
           {
               $scope.dateFlag=true;
           }
           else if(c<=$scope.freq_cap)
           {
               $scope.dateFlag=false;
           }                   
        }
        //END

        //TEST

        $scope.isShowing = function(index)
        {
            return  $scope.activeParentIndex === index;
        };
        //END
        //Display Campaign Details on Dropdown Change


        /** product type and conversationObj starts */

        
            // $scope.productType = function(){
            //      var url = GetHostUrl.hostUrl+'/product/listproduct';
            //     $http(
            //         {
            //             method  : 'POST',
            //             url     : url,
            //             data    : {
            //                           refCode:$scope.clientRefCodeForOffer
            //                       },
            //             headers :$localStorage.headerss
            //         }
            //     )
            //     .success(function(data){
            //         $scope.productTypeModel = data;
            //         if($scope.adminSetting != "product"){
            //             for(var i=0;i<$scope.productTypeModel.length;i++){
            //                 $scope.productTypeModel[i].disable = true;
            //             }
            //         }
            //         //console.log($scope.productTypeModel);
            //     })
            // }
            // $scope.selectedProductName = "";
            // $scope.selectedConversationValue = "";
            // $scope.selectedConversationTypeValue  = "";
            // $scope.selectedProIndex = -1;
            // $scope.selectedConTypeIndex = -1;
            // $scope.selectedCon1Index = -1;
            // $scope.selectedConIndex = -1;
            // $scope.selectproduct = function(productName,$index){
            //     $scope.selectedCon1Index = -1;
            //     $scope.selectedConTypeIndex = -1;
            //     $scope.selectCamTypeAtt = false;
            //     $scope.selectedIndex = $index;
            //     $scope.selectedProductName = productName;
            //     $scope.selectedConversationValue = "";
            //     $scope.selectedConversationTypeValue  = "";
            //     $('.radio-disable').attr('disabled','disabled');
            //     var url = GetHostUrl.hostUrl+'/product/productenablecampaignobject';
            //     $http(
            //         {
            //             method  : 'POST',
            //             url     : url,
            //             data    : {
            //                           clientRefCode:$scope.clientRefCodeForOffer,
            //                           productname:$scope.selectedProductName
            //                       },
            //             headers :$localStorage.headerss
            //         }
            //     )
            //     .success(function(data){
            //         $scope.conversationDis = data;
                    
            //         for(var k=0;k<$scope.conversationObjModel.length;k++){
            //                 $scope.conversationObjModel[k].disable = true;
            //         }
            //         for(var i=0;i<$scope.conversationDis.length;i++){
            //             for(var j=0;j<$scope.conversationObjModel.length;j++){
            //                 if($scope.conversationDis[i].campaignObjectname === $scope.conversationObjModel[j].name){
            //                     //console.log(i+" "+$scope.conversationDis[i].campaignObjectname+" "+j+" "+ $scope.conversationObjModel[j].name)
            //                 $scope.conversationObjModel[j].disable = false;
            //                 }
            //             }
            //         }
            //         //console.log($scope.conversationObjModel);
            //     })
            // }
            
            // $scope.selectConversation = function(conversarionName,$index){
            //     $scope.selectedConIndex = $index;
            //     $scope.selectedConversationValue = conversarionName;
            //     $scope.selectedProductName = "";
            //     $scope.selectedConversationTypeValue  = "";
            //     $scope.selectedProIndex = -1;
            //     $scope.selectedConTypeIndex = -1;
            //     $scope.selectCamTypeAtt = false;
            //     var url = GetHostUrl.hostUrl+'/product/campaignobjectenableproduct';
            //     $http(
            //         {
            //             method  : 'POST',
            //             url     : url,
            //             data    : {
            //                           clientRefCode:$scope.clientRefCodeForOffer,
            //                           campaignObjectname:$scope.selectedConversationValue
            //                       },
            //             headers :$localStorage.headerss
            //         }
            //     )
            //     .success(function(data){
            //         $scope.conversationDis = data;
                    
            //         for(var k=0;k<$scope.productTypeModel.length;k++){
            //                 $scope.productTypeModel[k].disable = true;
            //         }
            //         for(var i=0;i<$scope.conversationDis.length;i++){
            //             for(var j=0;j<$scope.productTypeModel.length;j++){
            //                 if($scope.conversationDis[i].productname === $scope.productTypeModel[j].name){
            //                     //console.log(i+" "+$scope.conversationDis[i].productname+" "+j+" "+ $scope.productTypeModel[j].name)
            //                 $scope.productTypeModel[j].disable = false;
            //                 }
            //             }
            //         }
            //         //console.log($scope.conversationObjModel);
            //     })
            // }

            // $scope.selectproductType = function(productName,$index){
            //     $scope.selectedProIndex = $index;
            //     $scope.selectedProductName = productName;
            //     $scope.selectedConversationTypeValue  = "";
            //     $scope.selectCamTypeAtt = true;
            //      $scope.selectedConTypeIndex = -1;
            //     var url = GetHostUrl.hostUrl+'/campaign/listcampaigntype';
            //     $http(
            //         {
            //             method  : 'POST',
            //             url     : url,
            //             data    : {
            //                           clientRefCode:$scope.clientRefCodeForOffer,
            //                           product:$scope.selectedProductName,
            //                           campaignobject:$scope.selectedConversationValue
                                      
            //                       },
            //             headers :$localStorage.headerss
            //         }
            //     )
            //     .success(function(data){
            //         $scope.conversationTypeModel = data;
            //     })
            // }

            // $scope.preFillCapDet = function(){
            //    $timeout(function(){
            //        console.log(0)
            //         for(var i=0;i<$scope.conversationObjModel.length;i++){
            //             if($scope.conversationObjModel[i].name === GetHostUrl.editOrchestration.campaigndetails.campaignobject){
            //                 $scope.selectedConIndex = i;
            //                 $scope.selectedConversationValue = $scope.conversationObjModel[i].name;
            //                 $scope.selectConversation($scope.conversationObjModel[i].name,i);
            //             }
            //         }
            //         for(var k=0;k<$scope.productTypeModel.length;k++){
            //         if( $scope.productTypeModel[k].name === GetHostUrl.editOrchestration.campaigndetails.product){
            //                 $scope.selectedProIndex = k;
            //                 $scope.selectedProductName = $scope.productTypeModel[k].name;
            //                 $scope.selectproductType($scope.productTypeModel[k].name,k);
            //             }
            //         }
            //         $timeout(function(){
            //             for(var j=0;j<$scope.conversationTypeModel.length;j++){
            //                 console.log("$scope.conversationTypeModel[j].campaigntype "+$scope.conversationTypeModel[j].campaigntype+" "+"campaigndetails.campaigntype "+GetHostUrl.editOrchestration.campaigndetails.campaigntype);
            //                 if($scope.conversationTypeModel[j].campaigntype === GetHostUrl.editOrchestration.campaigndetails.campaigntype){
            //                     $scope.selectedConTypeIndex = j;
            //                     $scope.selectedConversationTypeValue = $scope.conversationTypeModel[j].campaigntype;
            //                     $scope.conversarionTypeSelect($scope.conversationTypeModel[j].campaigntype,j)
            //                 }
            //             }
            //         },1000)
            //    },1000)     
            // }
            
            // $scope.conversationObj = function(){
            //     $scope.selectedCon1Index = -1;
            //     $scope.selectCamTypeAtt = false;
            //     var url = GetHostUrl.hostUrl+'/campaign/listactivecampaign';
            //     $http(
            //         {
            //             method  : 'POST',
            //             url     : url,
            //             data    : {
            //                           refCode:$scope.clientRefCodeForOffer
            //                       },
            //             headers :$localStorage.headerss
            //         }
            //     )
            //     .success(function(data){
            //         $scope.conversationObjModel = data;
            //         if($scope.adminSetting == "product"){
            //             for(var i=0;i<$scope.conversationObjModel.length;i++){
            //                 $scope.conversationObjModel[i].disable = true;
            //             }
            //         }
            //         //console.log($scope.conversationObjModel);
            //     })
            // }

            // $scope.conversationType = function(conversationObjName,$index){
            //     $scope.selectCamTypeAtt = true;
            //     $scope.selectedCon1Index = $index;
            //     $scope.selectedConversationValue = conversationObjName;
            //     $scope.selectedConversationTypeValue  = "";
            //      $scope.selectedConTypeIndex = -1;
            //     var url = GetHostUrl.hostUrl+'/campaign/listcampaigntype';
            //     $http(
            //         {
            //             method  : 'POST',
            //             url     : url,
            //             data    : {
            //                           clientRefCode:$scope.clientRefCodeForOffer,
            //                           product:$scope.selectedProductName,
            //                           campaignobject:$scope.selectedConversationValue
                                      
            //                       },
            //             headers :$localStorage.headerss
            //         }
            //     )
            //     .success(function(data){
            //         $scope.conversationTypeModel = data;
            //     })
            // }

            // $scope.conversarionTypeSelect = function(conversationname,$index){
            //     $scope.selectedConTypeIndex = $index;
            //     $scope.selectedConversationTypeValue  = conversationname;
            //     GetHostUrl.editOrchestration.campaigndetails.campaigntype = $scope.selectedConversationTypeValue;
            //     GetHostUrl.editOrchestration.campaigndetails.product = $scope.selectedProductName;
            //     GetHostUrl.editOrchestration.campaigndetails.campaignobject = $scope.selectedConversationValue;
            // }
            
             $scope.onchageDate = function(){
                    $scope.freq_cap=null;
                    $scope.selection.ids=null;
                    $scope.dateFlag=true;
                    $scope.channelCount = 0;
                    $scope.flag=0;
                var dates=[];
                //Date variables and functions
                var splitStartDate = $scope.start_date.split(" ");
                var start_date =splitStartDate[0];
                var st_dt1 =splitStartDate[0];
                var st_dt = st_dt1.split('/');
                $scope.start_date = start_date;
                
                var splitEndDate = $scope.end_date.split(" ");   
                var end_date = splitEndDate[0];
                var en_dt1 = splitEndDate[0];
                var en_dt=en_dt1.split('/');    
                $scope.end_date=end_date;
                var d1=st_dt[2]+'-'+ st_dt[0]+'-'+ st_dt[1];
                var d2=en_dt[2]+'-'+ en_dt[0]+'-'+ en_dt[1];
                var d3=new Date(d1);
                var d4=new Date(d2);
                
        
                for (var d = d3; d <= d4; d.setDate(d.getDate() + 1)) 
                {
                    var channel=[];
                    var dump ={};
                    var temp=d.toString();
                    var date =d.getDate()+'-'+("0" + (d.getMonth()+1)).slice(-2);
                    var svrdate = d.getFullYear()+'-'+("0" + (d.getMonth()+1)).slice(-2)+'-'+("0" + (d.getDate())).slice(-2)+" 00:00:00";
                    dump.name = temp.substring(0, 1);
                    //dump.id =d.getDate();
                    dump.id = ("0" + (d.getDate())).slice(-2);
                    for (var key in $scope.camp_channels) 
                    {
                        if ($scope.camp_channels.hasOwnProperty(key)) 
                        {
                            if($scope.camp_channels[key]==true)
                            {
                                var icon=$scope.icons[key];
                                key=key.slice(0,1);
                                var id=date+'-'+key;
                                channel.push({key:key,id:id,selected:false,icon:icon})
                            }
                        }
                    }
                    dump.channels=channel;
                    dump.selected=false;
                    dump.date=date;
                    dump.svrdate=svrdate;
                    dates.push(dump);
                }

                    $scope.freq_cap=null;
                    $scope.selection.ids=null;
                    //$scope.dates=dates;
                    //$scope.rows=dates;
                    $scope.$apply(function(){
                        $scope.dates=dates;
                    })
            }

        /** product type and conversationObj ends */
        if(GetHostUrl.backValue == "new"){
            $scope.selection = GetHostUrl.selectionCap;
            console.log($scope.selection);
            $scope.listCamp();  
            $timeout(function(){
                //$scope.preFillCapDet();
                $("#campaignlist").val(GetHostUrl.filledCode).trigger("change");
                if(GetHostUrl.moreCampaignSelected==true){
                    $("#Raise").prop("checked",true);
                    for(i=5;i<=10;i++){
                        $("#freq_cap"+i).next().removeClass("form-disable");
                        $("#freq_cap"+i).prop("disabled",false);
                        $scope.dateFlag=true;
                    }
                }
                else {
                    $("#Raise").prop("checked",false);
                    for(i=$scope.levelCamp+1;i<=10;i++){
                       $("#freq_cap"+i).next().addClass("form-disable");
                       $("#freq_cap"+i).attr("disabled",true);
                    }
                }
                $("#freq_cap"+GetHostUrl.selectedFreqCap).val(GetHostUrl.selectedFreqCap).prop("checked", true);
                //$("#freq_cap"+GetHostUrl.selectedFreqCap).val(GetHostUrl.selectedFreqCap).trigger("click");
                $scope.freq_cap=GetHostUrl.selectedFreqCap;
                $scope.theBackId = [];
                for(i=0;i<GetHostUrl.selectedNewDate.length;i++){
                    if(GetHostUrl.selectedNewDate[i].selected==true){
                        $scope.clickDateId =GetHostUrl.selectedNewDate[i].date;
                        $scope.theBackId.push($scope.clickDateId);
                        $scope.flag = i+1;
                         $scope.dates[i].selected=true;
                            for(var j=0;j<GetHostUrl.selectedNewDate[i].channels.length;j++){
                                if(GetHostUrl.selectedNewDate[i].channels[j].selected === true){
                                    $("#"+GetHostUrl.selectedNewDate[i].channels[j].id).trigger("click");
                                    $scope.dates[i].channels[j].selected=true;
                                }else{
                                    $scope.dates[i].channels[j].selected=false;
                                }
                            }
                            //$("#"+clickDateId).trigger("click");
                            //$("#"+$scope.clickDateId).prop("checked",true);
                            //$scope.dates[i].selected=true;
                            //$timeout(function(){
                            //for(var n=0;n<$scope.theBackId.length;n++){
                                //alert($scope.theBackId[n])
                                    //$("#"+$scope.theBackId[n]).trigger("click");
                                //}
                            //},10)
                            //for(var j=0;j<GetHostUrl.selectedNewDate[i].channels.length;j++){
                                // if(GetHostUrl.selectedNewDate[i].channels[j].selected === true){
                                //    // $("#"+GetHostUrl.selectedNewDate[i].channels[j].id).trigger("click");
                                //     //$scope.dates[i].channels[j].selected=true;
                                // }
                            //}

                    }else{
                        $scope.dates[i].selected=false;
                    }
                }

            },1000)
            var url = GetHostUrl.hostUrl+'/campaign/viewCampaign';
            $http(
                {
                    method  : 'POST',
                    url     : url,
                    data    : {
                                refCode:GetHostUrl.filledCode,
                                clientRefCode:$scope.clientRefCodeForOffer
                              },
                    headers :$localStorage.headerss
                }
            )
            .success(
                function(data)
                {
                   $scope.adminSetting = "conversation";
                   $scope.settEnable = "1";
                    /**if product means show the product list first */

                    $scope.selectedConversationTypeValue = data.campaigntype;
                    $scope.selectedProductName = data.product;
                    $scope.selectedConversationValue = data.category;
                    console.log($scope.selectedConversationTypeValue);
                    console.log($scope.selectedProductName);
                    console.log($scope.selectedConversationValue);
                    month_names_short=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    var newDateSplit= data.startOn.split(" ");
                    var splitedDate = newDateSplit[0].split("-");
                    var newMonth = month_names_short[parseInt(splitedDate[1])-1];
                    $scope.start_dateDet = splitedDate[0]+" "+newMonth+" "+splitedDate[2];
                    var newDateSplitEnd= data.expireOn.split(" ");
                    var splitedDateEnd = newDateSplitEnd[0].split("-");
                    var newMonthEnd = month_names_short[parseInt(splitedDateEnd[1])-1];
                    $scope.end_dateDet = splitedDateEnd[0]+" "+newMonthEnd+" "+splitedDateEnd[2];
                    console.log($scope.end_dateDet)
                    console.log($scope.start_dateDet)
                    $scope.freq_cap=null;
                    $scope.levelCamp=4;
                    $scope.frequency =[1,2,3,4,5,6,7,8,9];
                                     
                    $scope.tmpList=['SMS','EMAIL','PUSH','VOICE','DIRECT'];
                    $scope.icons=
                    {
                        mail:'cmail',
                        push:'cpush',
                        sms:'csms',
                        voice:'cvoice',
			            direct:'cdirect'
                    };
                    $scope.list=$scope.tmpList;
                    
                    //$scope.showDetails = false;
                    $scope.temp=data.refCode;

                    $scope.camp_level={};
                   
                    $scope.campaign_name=data.name;

                    $scope.campaign_description = data.description;
                    
                    $scope.goals= [{"goalName":"response","setChannelAct":false},{"goalName":"awarness","setChannelAct":false},{"goalName":"customersatisfaction","setChannelAct":false},{"goalName":"service","setChannelAct":false}];
                     console.log($scope.goals)
                    $scope.goalsArr= ["Response","Awarness","Customer Satisfaction","Service"];
                    $scope.checkGoals= data.goals.split(",");
                    console.log($scope.checkGoals);
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
                    
                   if(GetHostUrl.editOrchestration.campaigndetails.mailchannel== undefined){
                            GetHostUrl.editOrchestration.campaigndetails.mailchannel = data.mailchannel;
                            GetHostUrl.editOrchestration.campaigndetails.pushchannel = data.pushchannel;
                            GetHostUrl.editOrchestration.campaigndetails.smschannel = data.smschannel;
                            GetHostUrl.editOrchestration.campaigndetails.voicechannel = data.voicechannel;
                            GetHostUrl.editOrchestration.campaigndetails.directchannel = data.directchannel;
                            $scope.camp_channels = 
                            {
                            mail:GetHostUrl.editOrchestration.campaigndetails.mailchannel=='1'?true:false,
                            push:GetHostUrl.editOrchestration.campaigndetails.pushchannel=='1'?true:false,
                            sms:GetHostUrl.editOrchestration.campaigndetails.smschannel=='1'?true:false,
                            voice:GetHostUrl.editOrchestration.campaigndetails.voicechannel=='1'?true:false,
                            direct:GetHostUrl.editOrchestration.campaigndetails.directchannel=='1'?true:false
                            }
                            
                            $scope.camp_class=
                            {
                                mail:GetHostUrl.editOrchestration.campaigndetails.mailchannel=='1'?"box chck-active":"",
                                push:GetHostUrl.editOrchestration.campaigndetails.pushchannel=='1'?"box chck-active":"",
                                sms:GetHostUrl.editOrchestration.campaigndetails.smschannel=='1'?"box chck-active":"",
                                voice:GetHostUrl.editOrchestration.campaigndetails.voicechannel=='1'?"box chck-active":"",
                                direct:GetHostUrl.editOrchestration.campaigndetails.directchannel=='1'?"box chck-active":""
                            };

                         }else{
                             $scope.camp_channels = 
                            {
                            mail:data.mailchannel=='1'?true:false,
                            push:data.pushchannel=='1'?true:false,
                            sms:data.smschannel=='1'?true:false,
                            voice:data.voicechannel=='1'?true:false,
                            direct:data.directchannel=='1'?true:false
                            }
                            
                            $scope.camp_class=
                            {
                                mail:data.mailchannel=='1'?"box chck-active":"",
                                push:data.pushchannel=='1'?"box chck-active":"",
                                sms:data.smschannel=='1'?"box chck-active":"",
                                voice:data.voicechannel=='1'?"box chck-active":"",
                                direct:data.directchannel=='1'?"box chck-active":""
                            };
                         }
                         
                    var dates=[];
                                     
                    //Date variables and functions
                    var splitStartDate = data.startOn.split(" ");
                    var start_date =splitStartDate[0];
                    var st_dt1 =splitStartDate[0];
                    var st_dt = st_dt1.split('-');
                    $scope.start_date = start_date;

                    var splitEndDate = data.expireOn.split(" ");   
                    var end_date = splitEndDate[0];
                    var en_dt1 = splitEndDate[0];
                    var en_dt=en_dt1.split('-');    
                    $scope.end_date=end_date;

                    var d1=st_dt[0]+'-'+ st_dt[1]+'-'+ st_dt[2];
                    var d2=en_dt[0]+'-'+ en_dt[1]+'-'+ en_dt[2];

                    var d3=new Date(d1);
                    var d4=new Date(d2);
                    
            
                    for (var d = d3; d <= d4; d.setDate(d.getDate() + 1)) 
                    {
                        var channel=[];
                        var dump ={};
                        var temp=d.toString();
                        var date =d.getDate()+'-'+("0" + (d.getMonth()+1)).slice(-2);
            
                        dump.name = temp.substring(0, 1);
                        //dump.id =d.getDate();
                        dump.id = ("0" + (d.getDate())).slice(-2);
                        for (var key in $scope.camp_channels) 
                        {
                            if ($scope.camp_channels.hasOwnProperty(key)) 
                            {
                                if($scope.camp_channels[key]==true)
                                {
                                    console.log("key"+key);
                                    var icon=$scope.icons[key];
                                    key=key.slice(0,1);
                                    var id=date+'-'+key;
                                    channel.push({key:key,id:id,selected:false,icon:icon})
                                }
                            }
                            
                        }
                        dump.channels=channel;
                        dump.selected=false;
                        dump.date=date;
                        dates.push(dump);
                    }
                    //$scope.dates=dates;
                    $scope.dates=GetHostUrl.selectedNewDate;
                    $scope.rows=dates;
                    
                    // }
                    $scope.sortOptions = 
                    {
                        placeholder: 'placeholder',
                        tolerance: 'pointer',
                        cursor: 'move',
                        dropOnEmpty: true,
                        connectWith: '.connector'
                    };
                    $timeout(function(){
                        var newStartSplit = $scope.start_date.split("-");
                        var newEndSplit = $scope.end_date.split("-");
                        $scope.start_date = newStartSplit[1]+"/"+newStartSplit[2]+"/"+newStartSplit[0];
                        $scope.end_date = newEndSplit[1]+"/"+newEndSplit[2]+"/"+newEndSplit[0];
                        $("#conversionStartDate" ).datepicker({
                            onSelect: function(dateText) {
                                var d = new Date();
                                var h = d.getHours();
                                    h = (h < 10) ? ("0" + h) : h ;

                                    var m = d.getMinutes();
                                m = (m < 10) ? ("0" + m) : m ;

                                var s = d.getSeconds();
                                s = (s < 10) ? ("0" + s) : s ;

                                $scope.start_date = dateText + " " + h + ":" + m + ":" + s;
                                $scope.newEndDate();
                                $scope.onchageDate();
                            }
                        });  

                        $( "#conversionEndDate" ).datepicker({
                            minDate:0,
                            onSelect: function(dateText) {
                                var d = new Date();
                                var h = d.getHours();
                                    h = (h < 10) ? ("0" + h) : h ;

                                    var m = d.getMinutes();
                                m = (m < 10) ? ("0" + m) : m ;

                                var s = d.getSeconds();
                                s = (s < 10) ? ("0" + s) : s ;

                                $scope.end_date = dateText + " " + h + ":" + m + ":" + s;
                                console.log($scope.end_date)
                                $scope.onchageDate();
                            }
                    }); 

                     $scope.newEndDate = function(){                                 				
                        var dmy =$scope.onSelectDate.split("/");		
                        var joindate = new Date(		
                            parseInt(dmy[2], 10),		
                            parseInt(dmy[1], 10) - 1,		
                            parseInt(dmy[0], 10)		
                        );		
                        joindate.setDate(joindate.getDate() + 1); 		
                        $scope.editedEndYear = joindate.getFullYear();		
                        $scope.editedEndMonth = ("0" + (joindate.getMonth() + 1)).slice(-2)		
                        $scope.editedEndDate = ("0" + joindate.getDate()).slice(-2)		
                        $( "#conversionEndDate" ).datepicker('destroy');		
                        $( "#conversionEndDate" ).datepicker({		
                                minDate: new Date($scope.editedEndYear, $scope.editedEndMonth - 1, $scope.editedEndDate),		
                                defaultDate: $scope.end_date,		
                                onSelect: function(dateText) {		
                                    var d = new Date();		
                                    var h = d.getHours();		
                                        h = (h < 10) ? ("0" + h) : h ;		
                                        var m = d.getMinutes();		
                                    m = (m < 10) ? ("0" + m) : m ;		
                                    var s = d.getSeconds();		
                                    s = (s < 10) ? ("0" + s) : s ;		
                                    		
                                $scope.end_date = dateText + " " + h + ":" + m + ":" + s;		
                                    //$scope.end_date = dateText + " " + h + ":" + m + ":" + s;		
                                    $scope.onchageDate();		
                                    		
                                }		
                                		
                        }); 
                        var date1 = new Date($scope.start_date);
                                            var date2 = new Date($scope.end_date);
                                            var diffDays1 = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24); 
                                            //alert(diffDays1)
                                            if (diffDays1<0.99) {
                                                $scope.freq_cap=null;
                                                $scope.$apply(function(){
                                                    $scope.dates={};
                                                     $( "#conversionEndDate a.ui-state-active" ).removeClass("ui-state-active");
                                                })
                                                $scope.commonAlertText="Please select an End Date";
                                                $("#commonAlert").modal("show");
                                            }		      		
                    }

                    $("#conversionStartDate" ).datepicker('setDate',$scope.start_date);
                    $("#conversionEndDate" ).datepicker('setDate',$scope.end_date);
                    $(document).on('click','.channel-check.dis',function(e){
                        if($(this).hasClass("chck-active")){
                            $(this).removeClass("chck-active");
                            $scope.allChannel = false;
                            $(".channelall").removeClass("chck-active");
                        }
                        else{
                            $(this).addClass("chck-active");
                            $scope.allChannel = false;
                        }
                        $scope.onchageDate();
                        e.preventDefault();
                    })
                    
                    $scope.allChannel = false;
                    $scope.changeAllChannel = function(){

                        console.log("$scope.allChannel befor all click "+$scope.allChannel);

                        //console.log("allChannels "+ allChannels);

                    $scope.allChannel = !$scope.allChannel;
                        console.log("after all click "+$scope.allChannel);
                        if($scope.allChannel == false){
                            $scope.camp_channels = 
                            {
                            mail:$scope.allChannel,
                            push:$scope.allChannel,
                            sms:$scope.allChannel,
                            voice:$scope.allChannel,
                            direct:$scope.allChannel
                            }
                            $(".channel-check").removeClass("chck-active");
                        
                        }else{
                            $scope.camp_channels = 
                            {
                            mail:$scope.allChannel,
                            push:$scope.allChannel,
                            sms:$scope.allChannel,
                            voice:$scope.allChannel,
                            direct:$scope.allChannel
                            }
                            $(".channel-check").addClass("chck-active");
                        }

                        // console.log("$scope.camp_class");
                        // console.log($scope.camp_class);
                        // console.log("$scope.camp_channels")
                        // console.log($scope.camp_channels);

                        $timeout(function(){
                            $scope.onchageDate();
                        },100)
                    }

                    /**goals updated */

                    $(document).on('click','.chkbox-holder',function(e){
                        if($scope.settEnable == '0'){
                            return false;
                        }
                        else
                        {
                            if($(this).hasClass("chck-active")){
                                $(this).removeClass("chck-active");
                                $(this).children(".channelclass").prop("checked",false);
                            }
                            else{
                                $(this).addClass("chck-active");
                                $(this).children(".channelclass").prop("checked",true);
                            }
                            e.preventDefault();
                        }
                    })

                    
                       if($scope.camp_channels.mail==true && $scope.camp_channels.push==true && $scope.camp_channels.sms==true && $scope.camp_channels.voice==true && $scope.camp_channels.direct==true){
                            $scope.allChannel = true;
                        }
                    },1000)

                    $scope.frequencySelection = function(value)
                    {
                        console.log("value "+value);
                        $scope.dateFlag = false;
                        GetHostUrl.selectedFreqCap = value;
                        //console.log("frequency cap click " + $scope.dateFlag) 
                        //console.log($scope.dates)
                        //$scope.selection.ids=null;
                        for(i=0;i<$scope.dates.length;i++){
                            $scope.dates[i].selected=false;
                            $("#"+$scope.dates[i].date).prop('checked', false);
                        }  
                        $(".ui-sortable-handle input").prop("checked",false)
                        for(var i=0;i<$scope.dates.length;i++){
                            for(var j=0;j<$scope.dates[i].channels.length;j++){
                                $scope.dates[i].channels[j].selected=false;
                            }
                        }
                        $(".brandsub").removeClass("brandsub");                        
                    }

                }
                
                
             );
        }
        else{
            $scope.listCamp();
            $rootScope.triggerCamp = function(){
                GetHostUrl.filledCode = GetHostUrl.editOrchestration.campaigndetails.refCode;
                console.log("GetHostUrl.filledCode "+GetHostUrl.filledCode);
                $timeout(function(){
                    $("#campaignlist").val(GetHostUrl.filledCode).trigger("change");    
                })
            }

            console.log("mail "+GetHostUrl.editOrchestration.campaigndetails.mailchannel)
            console.log("push "+GetHostUrl.editOrchestration.campaigndetails.pushchannel)
            console.log("sms "+GetHostUrl.editOrchestration.campaigndetails.smschannel)
            console.log("voice "+GetHostUrl.editOrchestration.campaigndetails.voicechannel)
            console.log("direct "+GetHostUrl.editOrchestration.campaigndetails.directchannel)
            $scope.channelSelection = false;
           
            $scope.get_campaign_meta = function (camp_id) 
            {
                var data = camp_id;
                GetHostUrl.filledCode = data.refCode;
                if(data.refCode == null){    
                    return false;
                }
                else{
                var url = GetHostUrl.hostUrl+'/campaign/viewCampaign';
                $http(
                    {
                        method  : 'POST',
                        url     : url,
                        data    : {
                                      refCode:data.refCode,
                                      clientRefCode:$scope.clientRefCodeForOffer
                                  },
                        headers :$localStorage.headerss
                    }
                )
                .success(
                    function(data)
                    {
                         
                        $scope.adminSetting = "conversation";
                        $scope.settEnable = "1";
                         $scope.selectedConversationTypeValue = data.campaigntype;
                        $scope.selectedProductName = data.product;
                        $scope.selectedConversationValue = data.category;
                        console.log($scope.selectedConversationTypeValue);
                        console.log($scope.selectedProductName);
                        console.log($scope.selectedConversationValue);
                        month_names_short=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        var newDateSplit= data.startOn.split(" ");
                        var splitedDate = newDateSplit[0].split("-");
                        var newMonth = month_names_short[parseInt(splitedDate[1])-1];
                        $scope.start_dateDet = splitedDate[0]+" "+newMonth+" "+splitedDate[2];
                        var newDateSplitEnd= data.expireOn.split(" ");
                        var splitedDateEnd = newDateSplitEnd[0].split("-");
                        var newMonthEnd = month_names_short[parseInt(splitedDateEnd[1])-1];
                        $scope.end_dateDet = splitedDateEnd[0]+" "+newMonthEnd+" "+splitedDateEnd[2];
                        console.log($scope.end_dateDet)
                        console.log($scope.start_dateDet)
                        $scope.selectedProIndex = -1;
                        $scope.selectedConTypeIndex = -1;
                        $scope.selectedCon1Index = -1;
                        $scope.selectedConIndex = -1;
                        $scope.freq_cap=null;
                        $scope.selection.ids=null;

                        $scope.levelCamp=4;
                        $scope.frequency =[1,2,3,4,5,6,7,8,9];
                                         
                        $scope.tmpList=['SMS','EMAIL','PUSH','VOICE','DIRECT'];
                        $scope.icons=
                        {
                            mail:'cmail',
                            push:'cpush',
                            sms:'csms',
                            voice:'cvoice',
			                direct:'cdirect'
                        };
                        $scope.title=
                        {
                            mail:'Email',
                            push:'Push',
                            sms:'SMS',
                            voice:'Voice',
			                direct:'Direct'
                        };
                        $scope.list=$scope.tmpList;
                        
                        //$scope.showDetails = false;
                        $scope.temp=data.refCode;

                        $scope.camp_level={};
                       
                        $scope.campaign_name=data.name;

                        $scope.campaign_description = data.description;
                        
                       $scope.goals= [{"goalName":"response","setChannelAct":false},{"goalName":"awareness","setChannelAct":false},{"goalName":"customersatisfaction","setChannelAct":false},{"goalName":"service","setChannelAct":false}];
                     console.log($scope.goals)
                    $scope.goalsArr= ["Response","Awareness","Customer Satisfaction","Service"];
                    if(data.goals == null){
                    data.goals = "Response,Awareness,Customer Satisfaction,Service";
                    $scope.checkGoals= data.goals.split(",");
                    console.log($scope.checkGoals)
                    $timeout(function(){
                        for(var i=0;i<$scope.goals.length;i++){
                            for(var j=0;j<$scope.checkGoals.length;j++){
                                console.log("j "+j)
                                if($scope.checkGoals[j]==$scope.goals[i].goalName){
                                        $scope.goals[i].setChannelAct = true;
                                    }
                            }
                        }
                        
                            console.log($scope.goals)
                        })
                    }
                    else{
                        $scope.checkGoals= data.goals.split(",");
                        console.log($scope.checkGoals)
                        $timeout(function(){
                            for(var i=0;i<$scope.goals.length;i++){
                                for(var j=0;j<$scope.checkGoals.length;j++){
                                    console.log("j "+j)
                                    if($scope.checkGoals[j]==$scope.goals[i].goalName){
                                            $scope.goals[i].setChannelAct = true;
                                        }
                                }
                            }
                            
                                console.log($scope.goals)
                            })
                    }
                        if(GetHostUrl.editOrchestration.campaigndetails.mailchannel== undefined){
                            GetHostUrl.editOrchestration.campaigndetails.mailchannel = data.mailchannel;
                            GetHostUrl.editOrchestration.campaigndetails.pushchannel = data.pushchannel;
                            GetHostUrl.editOrchestration.campaigndetails.smschannel = data.smschannel;
                            GetHostUrl.editOrchestration.campaigndetails.voicechannel = data.voicechannel;
                            GetHostUrl.editOrchestration.campaigndetails.directchannel = data.directchannel;
                            $scope.camp_channels = 
                            {
                            mail:GetHostUrl.editOrchestration.campaigndetails.mailchannel=='1'?true:false,
                            push:GetHostUrl.editOrchestration.campaigndetails.pushchannel=='1'?true:false,
                            sms:GetHostUrl.editOrchestration.campaigndetails.smschannel=='1'?true:false,
                            voice:GetHostUrl.editOrchestration.campaigndetails.voicechannel=='1'?true:false,
                            direct:GetHostUrl.editOrchestration.campaigndetails.directchannel=='1'?true:false
                            }
                            
                            $scope.camp_class=
                            {
                                mail:GetHostUrl.editOrchestration.campaigndetails.mailchannel=='1'?"box chck-active":"",
                                push:GetHostUrl.editOrchestration.campaigndetails.pushchannel=='1'?"box chck-active":"",
                                sms:GetHostUrl.editOrchestration.campaigndetails.smschannel=='1'?"box chck-active":"",
                                voice:GetHostUrl.editOrchestration.campaigndetails.voicechannel=='1'?"box chck-active":"",
                                direct:GetHostUrl.editOrchestration.campaigndetails.directchannel=='1'?"box chck-active":""
                            };

                         }else{
                             $scope.camp_channels = 
                            {
                            mail:data.mailchannel=='1'?true:false,
                            push:data.pushchannel=='1'?true:false,
                            sms:data.smschannel=='1'?true:false,
                            voice:data.voicechannel=='1'?true:false,
                            direct:data.directchannel=='1'?true:false
                            }
                            
                            $scope.camp_class=
                            {
                                mail:data.mailchannel=='1'?"box chck-active":"",
                                push:data.pushchannel=='1'?"box chck-active":"",
                                sms:data.smschannel=='1'?"box chck-active":"",
                                voice:data.voicechannel=='1'?"box chck-active":"",
                                direct:data.directchannel=='1'?"box chck-active":""
                            };
                         }
                        
                        var dates=[];
                                         
                        //Date variables and functions
                        console.log(data.startOn);
                        var splitStartDate = data.startOn.split(" ");
                        var start_date =splitStartDate[0];
                        var st_dt1 =splitStartDate[0];
                        var st_dt = st_dt1.split('-');
                        $scope.start_date = start_date;

                        console.log(data.expireOn);
                        var splitEndDate = data.expireOn.split(" ");   
                        var end_date = splitEndDate[0];
                        var en_dt1 = splitEndDate[0];
                        var en_dt=en_dt1.split('-');    
                        $scope.end_date=end_date;

                        var d1=st_dt[0]+'-'+ st_dt[1]+'-'+ st_dt[2];
                        var d2=en_dt[0]+'-'+ en_dt[1]+'-'+ en_dt[2];

                        var d3=new Date(d1);
                        var d4=new Date(d2);
                        
                
                        for (var d = d3; d <= d4; d.setDate(d.getDate() + 1)) 
                        {
                            var channel=[];
                            var dump ={};
                            var temp=d.toString();
                            var date =d.getDate()+'-'+("0" + (d.getMonth()+1)).slice(-2);
                            var svrdate = d.getFullYear()+'-'+("0" + (d.getMonth()+1)).slice(-2)+'-'+("0" + (d.getDate())).slice(-2)+" 00:00:00";
                            dump.name = temp.substring(0, 1);
                            //dump.id =d.getDate();
                            dump.id = ("0" + (d.getDate())).slice(-2);
                            for (var key in $scope.camp_channels) 
                            {
                                if ($scope.camp_channels.hasOwnProperty(key)) 
                                {
                                    if($scope.camp_channels[key]==true)
                                    {
                                        console.log("key" +key);
                                        var icon=$scope.icons[key];
                                        var title=$scope.title[key];
                                        console.log("title" + title);
                                        key=key.slice(0,1);
                                        var id=date+'-'+key;
                                        channel.push({key:key,id:id,selected:false,icon:icon,title:title})
                                    }
                                }
                                
                            }
                            dump.channels=channel;
                            dump.selected=false;
                            dump.date=date;
                            dump.svrdate=svrdate;
                            dates.push(dump);
                        }

                        $timeout(function(){
                                console.log("start bef "+ $scope.start_date);
                                    console.log("end bef "+ $scope.end_date);
                                    var newStartSplit = $scope.start_date.split("-");
                                    var newEndSplit = $scope.end_date.split("-");
                                    $scope.start_date = newStartSplit[1]+"/"+newStartSplit[2]+"/"+newStartSplit[0];
                                    $scope.end_date = newEndSplit[1]+"/"+newEndSplit[2]+"/"+newEndSplit[0];
                                    console.log("start aftr "+ $scope.start_date);
                                    console.log("end aftr "+ $scope.end_date);
                                    $("#conversionStartDate" ).datepicker({
                                            onSelect: function(dateText) {
                                                var d = new Date();
                                                var h = d.getHours();
                                                    h = (h < 10) ? ("0" + h) : h ;

                                                    var m = d.getMinutes();
                                                m = (m < 10) ? ("0" + m) : m ;

                                                var s = d.getSeconds();
                                                s = (s < 10) ? ("0" + s) : s ;

                                                $scope.start_date = dateText + " " + h + ":" + m + ":" + s;
                                                var spiltdate = dateText.split('/');		
                                                $scope.onSelectDate = spiltdate[1] +"/"+ spiltdate[0] +"/"+spiltdate[2]			
                                                $scope.onchageDate();
                                                $scope.newEndDate();
                                            }
                                        });  

                                        $( "#conversionEndDate" ).datepicker({
                                            minDate:0,
                                            onSelect: function(dateText) {
                                                var d = new Date();
                                                var h = d.getHours();
                                                    h = (h < 10) ? ("0" + h) : h ;

                                                    var m = d.getMinutes();
                                                m = (m < 10) ? ("0" + m) : m ;

                                                var s = d.getSeconds();
                                                s = (s < 10) ? ("0" + s) : s ;

                                                $scope.end_date = dateText + " " + h + ":" + m + ":" + s;
                                                console.log($scope.end_date)
                                                $scope.onchageDate();
                                                $scope.validEndDate();	
                                            }
                                        }); 

                                        $("#conversionStartDate" ).datepicker('setDate',$scope.start_date);
                                        $("#conversionEndDate" ).datepicker('setDate',$scope.end_date);
                            },1000);
                            $scope.newEndDate = function(){					
                                            var dmy =$scope.onSelectDate.split("/");		
                                            var joindate = new Date(		
                                                parseInt(dmy[2], 10),		
                                                parseInt(dmy[1], 10) - 1,		
                                                parseInt(dmy[0], 10)		
                                            );		
                                            joindate.setDate(joindate.getDate() + 1); 		
                                            $scope.editedEndYear = joindate.getFullYear();		
                                            $scope.editedEndMonth = ("0" + (joindate.getMonth() + 1)).slice(-2)		
                                            $scope.editedEndDate = ("0" + joindate.getDate()).slice(-2)		
                                            $( "#conversionEndDate" ).datepicker('destroy');		
                                            $( "#conversionEndDate" ).datepicker({		
                                                    minDate: new Date($scope.editedEndYear, $scope.editedEndMonth - 1, $scope.editedEndDate),		
                                                    defaultDate: $scope.end_date,		
                                                    onSelect: function(dateText) {		
                                                        var d = new Date();		
                                                        var h = d.getHours();		
                                                            h = (h < 10) ? ("0" + h) : h ;		
                                                            var m = d.getMinutes();		
                                                        m = (m < 10) ? ("0" + m) : m ;		
                                                        var s = d.getSeconds();		
                                                        s = (s < 10) ? ("0" + s) : s ;		
                                                        		
                                                    $scope.end_date = dateText + " " + h + ":" + m + ":" + s;		
                                                        //$scope.end_date = dateText + " " + h + ":" + m + ":" + s;		
                                                        $scope.onchageDate();		
                                                         $scope.validEndDate();			
                                                    }		
                                                    		
                                            }); 
                                            var date1 = new Date($scope.start_date);
                                            var date2 = new Date($scope.end_date);
                                            var diffDays1 = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24); 
                                            //alert(diffDays1)
                                            if (diffDays1<0.99) {
                                                $scope.freq_cap=null;
                                                $scope.$apply(function(){
                                                    $scope.dates={};
                                                    $( "#conversionEndDate a.ui-state-active" ).removeClass("ui-state-active")
                                                })
                                                $scope.commonAlertText="Please select an End Date";
                                                $("#commonAlert").modal("show");
                                            }                                            	
                                        }
                                        $scope.validEndDate = function(){	
                                            var date1 = new Date($scope.start_date);
                                            var date2 = new Date($scope.end_date);
                                            var diffDays1 = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24); 
                                            if (diffDays1<0.99) {
                                                $scope.commonAlertText="Please select a valid End Date";
                                                $("#commonAlert").modal("show");
                                                $scope.freq_cap=null;
                                                $scope.$apply(function(){
                                                    $scope.dates={};
                                                    $( "#conversionEndDate a.ui-state-active" ).removeClass("ui-state-active")
                                                })
                                                
                                            }	
                                            // var date=$scope.start_date;
                                            //     var MyDate = new Date(date);
                                            //     var MyDateString;
                                            //     MyDate.setDate(MyDate.getDate());
                                            //     MyDateString = (MyDate.getMonth()+1) + '/'
                                            //         + ('0' + MyDate.getDate()).slice(-2) + '/'
                                            //         + MyDate.getFullYear();

                                            //     $scope.onSelectDateNew=MyDateString;
                                            // var dmy =$scope.onSelectDateNew.split("/");		
                                            // var joindate = new Date(		
                                            //     parseInt(dmy[2], 10),		
                                            //     parseInt(dmy[1], 10) - 1,		
                                            //     parseInt(dmy[0], 10)		
                                            // );	
                                            	
                                            // joindate.setDate(joindate.getDate() + 1); 		
                                            // $scope.editedEndYear = joindate.getFullYear();		
                                            // $scope.editedEndMonth = ("0" + (joindate.getMonth() + 1)).slice(-2)		
                                            // $scope.editedEndDate = ("0" + joindate.getDate()).slice(-2)	
                                            // alert("joindate" + joindate + "$scope.editedEndYear" + $scope.editedEndYear + "$scope.editedEndMonth" +$scope.editedEndMonth + "$scope.editedEndDate" + $scope.editedEndDate)	
                                            // $( "#conversionEndDate" ).datepicker('destroy');		
                                            // $( "#conversionEndDate" ).datepicker({		
                                            //         minDate: new Date($scope.editedEndYear, $scope.editedEndMonth - 1, $scope.editedEndDate),		
                                            //         defaultDate: $scope.end_date	
                                            // });	
                                        }
                        $timeout(function(){
                            //$scope.preFillCapDet();
                            if(GetHostUrl.editOrchestration.cmapignwaveall.length != undefined){
                                GetHostUrl.selectedFreqCap = GetHostUrl.editOrchestration.cmapignwaveall.length;
                                $("#freq_cap"+GetHostUrl.selectedFreqCap).val(GetHostUrl.selectedFreqCap).prop("checked", true);
                                $("#freq_cap"+GetHostUrl.selectedFreqCap).val(GetHostUrl.selectedFreqCap).trigger("click");
                            }
                            if(GetHostUrl.selectedFreqCap > 4){
                                $("#Raise").prop("checked",true);
                                for(i=5;i<=10;i++){
                                    //alert("cap "+i);
                                    $("#freq_cap"+i).next().removeClass("form-disable");
                                    $("#freq_cap"+i).prop("disabled",false);
                                    $scope.dateFlag=true;
                                }
                            }
                            else {
                                $("#Raise").prop("checked",false);
                                for(i=$scope.levelCamp+1;i<=10;i++){
                                   $("#freq_cap"+i).next().addClass("form-disable");
                                   $("#freq_cap"+i).attr("disabled",true);
                                }
                            }
                            $scope.freq_cap=GetHostUrl.editOrchestration.cmapignwaveall.length;

                            for(var i=0;i<GetHostUrl.editOrchestration.cmapignwaveall.length;i++){
                                for(var j=0;j<GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel.length;j++){
                                  if(GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel == "EMailer"){
                                        GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel ="m";
                                    }
                                    if(GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel == "SMS"){
                                        GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel ="s";
                                    }
                                    if(GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel == "Push Notification"){
                                        GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel = "p";
                                    }
                                    if(GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel == "Voice"){
                                        GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel = "v";
                                    }
                                    if(GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel == "Direct Mail"){
                                        GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel = "d";
                                    }
                                    if(GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel == "Landing Page"){
                                        GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[j].channel = "l";
                                    }
                                }
                            }
                            $scope.freq_cap=GetHostUrl.selectedFreqCap;
                            $scope.theId = [];
                            
                            if(GetHostUrl.editOrchestration.cmapignwaveall.length != undefined){
                                for(var i=0;i< GetHostUrl.editOrchestration.cmapignwaveall.length;i++){
                                    $scope.flag = i;
                                    var createdOn =  GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwave.startOn
                                    var splitDay = createdOn.split(" ");
                                    var inputDay = splitDay[0];
                                    for(var j=0;j<$scope.dates.length;j++){
                                        var existDay = $scope.dates[j].svrdate.split(" ");
                                        var existInputDay = existDay[0];

                                        if(inputDay === existInputDay){
                                            $scope.newClickDateId = $scope.dates[j].date;
                                            $scope.theId.push($scope.newClickDateId);
                                            for(var k=0;k<GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel.length;k++){
                                                for(var dateChannel=0;dateChannel<$scope.dates[j].channels.length;dateChannel++){
                                                    if(GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[k].channel !="l") {
                                                        if( GetHostUrl.editOrchestration.cmapignwaveall[i].campaignwaveChannel[k].channel === $scope.dates[j].channels[dateChannel].key){
                                                            $("#"+$scope.dates[j].channels[dateChannel].id).prop("checked", true);
                                                            $scope.dates[j].channels[dateChannel].selected=true;
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    }
                                    
                                }
                            }
                                $timeout(function(){
                                    for(var n=0;n<$scope.theId.length;n++){
                                        $("#"+$scope.theId[n]).trigger("click");
                                    }
                                    
                                },1000)
                        if(GetHostUrl.editOrchestration.campaigndetails.pushchannel=="1" && GetHostUrl.editOrchestration.campaigndetails.mailchannel=="1" && GetHostUrl.editOrchestration.campaigndetails.voicechannel=="1" && GetHostUrl.editOrchestration.campaigndetails.smschannel=="1" && GetHostUrl.editOrchestration.campaigndetails.directchannel=="1"){
                            $scope.allChannel = true;
                        }

                        },1000)

                       
                        $scope.dates=dates;
                        $scope.rows=dates;
                        
                        $scope.sortOptions = 
                        {
                            placeholder: 'placeholder',
                            tolerance: 'pointer',
                            cursor: 'move',
                            dropOnEmpty: true,
                            connectWith: '.connector'
                        };

                        $scope.frequencySelection = function(value)
                        {
                            $scope.dateFlag = false;
                            GetHostUrl.selectedFreqCap = value;
                            $scope.dateFlag = false;
                            $scope.selection.ids=null;
                            for(i=0;i<$scope.dates.length;i++){
                                $scope.dates[i].selected=false;
                                $("#"+$scope.dates[i].date).prop('checked', false);
                            }  
                            $(".ui-sortable-handle input").prop("checked",false)
                            for(var i=0;i<$scope.dates.length;i++){
                                for(var j=0;j<$scope.dates[i].channels.length;j++){
                                    $scope.dates[i].channels[j].selected=false;
                                }
                            }
                            $(".brandsub").removeClass("brandsub");                        
                        }

                        $timeout(function(){
                            for(i=$scope.levelCamp+1;i<=10;i++){
                            ////console.log("#freq_cap"+i)
                           $("#freq_cap"+i).next().addClass("form-disable");
                           $("#freq_cap"+i).attr("disabled",true);
                        }
                        },1000)


                    }
                    
                    
                 );}
            }
        }
        $scope.createWaves = function(callback)
        {
            $scope.updateStages();
            var xyz =[];
            $scope.waveData='';
            for(var i=0;i<$scope.dates.length;i++){
                if($scope.dates[i].selected==true){
                    xyz.push($scope.dates[i]);
                }
            }
            //console.log(xyz);
            var request ={};
            var campaignwave = [];
            for(var i=0;i<xyz.length;i++)
            {
                var campaignwavecontent = {};
                campaignwavecontent.startdate = xyz[i].svrdate;
                var campaignwavechannel = [];
                var priority = 1;
                for(var k=0;k<xyz[i].channels.length+1;k++)
                {
                    var campaignwavechannelcontent = {};

                    /* landing channel wave creation */
                    if (k == xyz[i].channels.length){
                        campaignwavechannelcontent.channel = "l"
                        campaignwavechannelcontent.priorityNo = priority;
                        campaignwavechannel.push(campaignwavechannelcontent);
                    }
                    /* landing channel wave creation */ 
                    else{
                        if(xyz[i].channels[k].selected===true)
                        {
                            campaignwavechannelcontent.channel = xyz[i].channels[k].key;
                            campaignwavechannelcontent.priorityNo = priority;
                            priority = priority + 1;
                            campaignwavechannel.push(campaignwavechannelcontent);
                        } 
                    }
                    
                }

                campaignwavecontent.campaignwavechannel = campaignwavechannel;
                campaignwave.push(campaignwavecontent);
            }
            request.campaignrefCode = $scope.temp;
            //console.log(campaignwave)
            request.campaignwave=campaignwave;
            //console.log("campaignwave "+request.campaignwave.length);
            $scope.req=request;
            var url = GetHostUrl.repoUrl+'/campaignwave/createCampaignWaveandChannel';
            //console.log(request);
            $http({
                    method  : 'POST',
                    url     : url,
                    headers :$localStorage.headerss,
                    data    : {
                                    campaignrefCode : $scope.temp,
                                    campaignwave:campaignwave,
                                    stage:"orchestration"
                            }
                })
                .success(function(data){
                    //console.log(data);
                    console.log(JSON.stringify(data));
                    GetHostUrl.waveChannelRefCodes=data;
                    callback(data)
                });
        };
        $scope.afterCreateWaves = function(data)
        {
            GetHostUrl.editFinalizeDesign.campaigndetails.stages = "orchestration";
            $state.go('msg', {id:$scope.temp})
        };

        $scope.updateStages = function(){
            
            $scope.channels=[];
             for (var key in $scope.camp_channels) 
            {
                if ($scope.camp_channels.hasOwnProperty(key)) 
                {
                    if($scope.camp_channels[key]==true)
                    {
                        $scope.channels[key]=1;
                        ////console.log(key);
                    }else{
                        $scope.channels[key]=0;
                    }
                }
                
            }
            console.log("$scope.channels")
            console.log($scope.channels.mail);

            /** date format conversion */
                var st_dt = $scope.start_date.split('/');
                
                var en_dt=$scope.end_date.split('/');    

                var d1=st_dt[2]+'-'+ st_dt[0]+'-'+ st_dt[1];
                var d2=en_dt[2]+'-'+ en_dt[0]+'-'+ en_dt[1];

                var d = new Date();
                var h = d.getHours();
                    h = (h < 10) ? ("0" + h) : h ;

                    var m = d.getMinutes();
                m = (m < 10) ? ("0" + m) : m ;

                var s = d.getSeconds();
                s = (s < 10) ? ("0" + s) : s ;

                $scope.end_date = d2 + " " + h + ":" + m + ":" + s;
                $scope.start_date = d1 + " " + h + ":" + m + ":" + s;




            $http({
            method  : 'POST',
            url     : GetHostUrl.hostUrl+'/campaign/updateCampaign',
            headers :$localStorage.headerss,
            data    : {
                      refCode:$scope.temp,
                      stages:"orchestration",
                      product:$scope.selectedProductName,
                      campaignobject:$scope.selectedConversationValue,
                      campaigntype:$scope.selectedConversationTypeValue,
                      startOn:$scope.start_date,    
                      expireOn:$scope.end_date,
                      mailchannel:$scope.channels.mail,
                      smschannel:$scope.channels.sms,
                      pushchannel:$scope.channels.push,
                      voicechannel:$scope.channels.voice,
                      directmailchannel:$scope.channels.direct,
                      goals:$scope.selectedChannels

                      } 
            })
            .success(function(data){
                console.log(data);
              })
          }

         $scope.validationClick= function(){ 
             $rootScope.butnItration=0;
             var selectedChannel = "";
             var i=0;
             $(".channelclass").each(function(){
                 if($(this).prop("checked")==true){
                     if(i!=0)
                     selectedChannel = selectedChannel +","+ $(this).attr('name');
                     else
                      selectedChannel = selectedChannel + $(this).attr('name');                    
                 }
                  i++;
             })
            $scope.selectedChannels = selectedChannel;
            console.log("selectedChannels "+ $scope.selectedChannels)
//            console.log(JSON.stringify($scope.dates))
             GetHostUrl.selectionCap = $scope.selection;
  //           console.log( GetHostUrl.selectionCap);
            $scope.xyz =[];
            for(var i=0;i<$scope.dates.length;i++){
                if($scope.dates[i].selected==true){
                    $scope.xyz.push($scope.dates[i]);
                }
            }
            GetHostUrl.selectedNewDate = $scope.dates;
            GetHostUrl.selectedDate = $scope.xyz;
            GetHostUrl.selectedChannel = "fromdesign";
            $scope.channelCount = 0;
            for(var i=0;i<$scope.xyz.length;i++){
                for(var j=0;j<$scope.xyz[i].channels.length;j++){
                    if($scope.xyz[i].channels[j].selected==true){
                        //console.log("true")
                        $scope.channelCount =$scope.channelCount+1;
                        break;
                    }
                    else{
                        //console.log("false")
                    }
                }
            }
            /** Check the channel selection**/
            if($scope.adminSetting !='product'){
                if($scope.selectedConversationValue==""){
                    $scope.commonAlertText="Please select the Conversation Objective";
                    $("#commonAlert").modal("show");
                    return false;
                }else if($scope.selectedProductName ==""){
                    $scope.commonAlertText="Please select a Product";
                    $("#commonAlert").modal("show");
                    return false;
                }else if($scope.selectedConversationTypeValue == ""){
                    $scope.commonAlertText="Please select the Conversation Type";
                    $("#commonAlert").modal("show");
                    return false;
                }else if($scope.freq_cap == null){
                    $scope.commonAlertText="Please select the Frequency Cap";
                    $("#commonAlert").modal("show");
                    return false;
                }else if($scope.flag == undefined || $scope.flag==0){
                    $scope.commonAlertText="Please select the Conversation Schedule Date";
                    $("#commonAlert").modal("show");
                    return false;
                }
            }else{
                if($scope.selectedProductName ==""){
                    $scope.commonAlertText="Please select a Product";
                    $("#commonAlert").modal("show");
                    return false;
                }else if($scope.selectedConversationValue==""){
                    $scope.commonAlertText="Please select the Conversation Objective";
                    $("#commonAlert").modal("show");
                    return false;
                }else if($scope.selectedConversationTypeValue == ""){
                    $scope.commonAlertText="Please select the Conversation Type";
                    $("#commonAlert").modal("show");
                    return false;
                }else if($scope.freq_cap == null){
                    $scope.commonAlertText="Please select the Frequency Cap";
                    $("#commonAlert").modal("show");
                    return false;
                }else if($scope.flag == undefined || $scope.flag==0){
                    $scope.commonAlertText="Please select the Conversation Schedule Date";
                    $("#commonAlert").modal("show");
                    return false;
                }
            }
            $scope.capFrqVali();
        }

        $scope.capFrqVali = function(){
            GetHostUrl.editFinalizeDesign = {};
            GetHostUrl.editFinalizeDesign.campaigndetails= [];
  //          console.log("$scope.flag "+ $scope.flag + " < "+" $scope.flag "+$scope.flag)
            if($scope.xyz.length < $scope.freq_cap){
                $scope.commonAlertText="Campaign Schedule dates is less than you selected dates, OK to Continue!";
                $("#commonAlertup").modal("show");
                $("#okthen").click(function(){
                    if($scope.channelCount == $scope.xyz.length){
                        $scope.createWaves($scope.afterCreateWaves);    
                        
                    }
                    else{
                        $("#commonAlertup").modal("hide");
                        $scope.commonAlertTexter="Please select the Channel";
                        $("#commonAlertupper").modal("show");
                        $scope.$apply();
                        return false;
                    }
                
            })
                $("#cancelthen").click(function(){
                        $("#commonAlertup").modal("hide");
                        return false;
                    
                
            })
            }
            else{
                if($scope.channelCount == $scope.xyz.length){
                        $scope.createWaves($scope.afterCreateWaves);
                    }
                    else{
                        $scope.commonAlertText="Please select the Channel";
                        $("#commonAlert").modal("show");
                        return false;
                    }
             
            }
        };
        

        $scope.moreCampaign = function(){
            //console.log("Freq Cap bfore " +$scope.freq_cap);
            //console.log("dateFlag "+$scope.dateFlag);
            $scope.freq_cap=null;
            $scope.selection.ids=null;
            $scope.dateFlag=true;
            $scope.channelCount = 0;
            $scope.flag=0;
            for(i=0;i<$scope.dates.length;i++){
                $scope.dates[i].selected=false
            }  
            $(".brandsub").removeClass("brandsub");
            if($("input#Raise").is(':checked')){
                for(i=$scope.levelCamp+1;i<=10;i++){
                    $("#freq_cap"+i).next().removeClass("form-disable");
                    $("#freq_cap"+i).attr("disabled",false);
                    GetHostUrl.moreCampaignSelected = true;
                    $scope.dateFlag=true;
                }
            }
            else {
                $scope.freq_cap=null;
                $scope.selection.ids=null;
                for(i=$scope.levelCamp+1;i<=10;i++){
                    $("#freq_cap"+i).next().addClass("form-disable");
                   $("#freq_cap"+i).attr("disabled",true);
                   GetHostUrl.moreCampaignSelected = false;
                    $scope.dateFlag=true;
                }
            }
            
        }

         $(document).on('click','.channel-check.dis',function(e){
            if($(this).hasClass("chck-active")){
                $(this).removeClass("chck-active");
                $scope.allChannel = false;
                  $(".channelall").removeClass("chck-active");
            }
            else{
                $(this).addClass("chck-active");
                $scope.allChannel = false;
                 if($scope.camp_channels.mail==true && $scope.camp_channels.push==true && $scope.camp_channels.sms==true && $scope.camp_channels.voice==true && $scope.camp_channels.direct==true){
                            $scope.allChannel = true;
                        }
            }
            $scope.onchageDate();
            e.preventDefault();
        })

        $scope.allChannel = false;
        
            $scope.changeAllChannel = function(){

                console.log("$scope.allChannel befor all click "+$scope.allChannel);
                

               $scope.allChannel = !$scope.allChannel;
                console.log("after all click "+$scope.allChannel);
                if($scope.allChannel == false){
                    $scope.camp_channels = 
                    {
                       mail:$scope.allChannel,
                       push:$scope.allChannel,
                       sms:$scope.allChannel,
                       voice:$scope.allChannel,
                       direct:$scope.allChannel
                    }
                    $(".channel-check").removeClass("chck-active");
                
                }else{
                     $scope.camp_channels = 
                    {
                       mail:$scope.allChannel,
                       push:$scope.allChannel,
                       sms:$scope.allChannel,
                       voice:$scope.allChannel,
                       direct:$scope.allChannel
                    }
                    $(".channel-check").addClass("chck-active");
                }

                $timeout(function(){
                    $scope.onchageDate();
                },100)
            }
        $scope.visible='';
        
    }
)
