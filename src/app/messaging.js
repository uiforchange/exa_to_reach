var messaging = angular.module("messaging", ['ngStorage']);

messaging.controller(
    "Messaging_Controller",
    function ($scope, $http, $window, $location, $stateParams, GetHostUrl, $state, $localStorage, $rootScope) {


        if ($localStorage.loggedIn == "True") {
            $rootScope.butnItration = 0;
        }
        else {
            $state.go("login");
            $("#loginDiv").parent().parent().css("background-color", "#98c900");
            $("body").addClass("body-bg");
        }

        GetHostUrl.backValue = "new";
        $scope.username = username;
        $scope.backClick = function () {
            //$state.go('msg',{id:$scope.id,style:$scope.style_id});
            $state.go("dsn");
        }
        $scope.logout = function () {
            GetHostUrl.loggedIn = false;
            $state.go("login");
            $("#loginDiv").parent().parent().css("background-color", "#98c900");
            $("body").addClass("body-bg");

        }

        $scope.templateLoading = function () {
            $scope.Conversation_Name = $localStorage.conversationName;
            $scope.Conversation_Description = $localStorage.conversationDescription;
            $scope.id = $stateParams.id;
            $scope.blank = 'blank';
            var url = GetHostUrl.hostUrl + "/campaigntemplate/listtemplate"
            $http(
                {
                    method: 'POST',
                    url: url,
                    data: {
                        refCode: $scope.id
                    },
                    headers: $localStorage.headerss
                }
            )
                .success(
                function (data) {

                    var dataAr = (Object.keys(data));
                    $scope.newArray = [];
                    $scope.finalArr = [];
                    for (var h = 0; h < dataAr.length; h++) {
                        $scope.newArray.push(data[dataAr[h]])
                    }

                    for (var i = 0; i < $scope.newArray.length; i++) {
                        var channelsLen = $scope.newArray[i].length;
                        var channelName = $scope.newArray[i];
                        var finalObj = {};
                        for (var j = 0; j < channelsLen; j++) {
                            var newObj = {};
                            channelName[j].data = channelName[j].data
                            var trimedData = channelName[j].data.replace(/\\n/g, "\\n").trim();
                            channelName[j].data = trimedData.replace(/[\u0000-\u0019]+/g, "");
                            var channelData = JSON.parse(channelName[j].data);
                            // channelName[j].optionName = channelName[j].optionName.replace("option","Approach");
                            finalObj[channelName[j].channel + "url"] = channelName[j].url;
                            finalObj[channelName[j].channel + "option"] = channelName[j].optionName;
                            for (var k = 0; k < channelData.fields.length; k++) {
                                var field = channelData.fields[k];
                                console.log(field.value)
                                if (channelName[j].channel == "email" || channelName[j].channel == "landingpage" || channelName[j].channel == "directmail") {
                                    if (field.name == "SubjectLine") {
                                        finalObj[channelName[j].channel + "subjectline"] = field.value;
                                    }
                                    else if (field.name == "BannerCopy") {
                                        for (var l = 0; l < field.value.length; l++) {
                                            if (field.value[l].name == "Heading") {
                                                finalObj[channelName[j].channel + "head"] = field.value[l].value;
                                            }
                                            else if (field.value[l].name == "SubHeading") {
                                                finalObj[channelName[j].channel + "subheading"] = field.value[l].value;
                                            } else if (field.value[l].name == "BannerCTA") {
                                                finalObj[channelName[j].channel + "bannerctacontent"] = field.value[l].value;
                                            } else if (field.value[l].name == "MainHeading") {
                                                finalObj[channelName[j].channel + "mainheading"] = field.value[l].value;
                                            }
                                        }
                                    }
                                    else if (field.name == "BodyCopy") {
                                        for (var r = 0; r < field.value.length; r++) {
                                            if (field.value[r].name == "Paragraphs") {
                                                for (var n = 0; n < field.value[r].value.length; n++) {
                                                    finalObj[channelName[j].channel + "paragraphs" + n] = field.value[r].value[n];
                                                }
                                            } else if (field.value[r].name == "IntroCTA") {
                                                finalObj[channelName[j].channel + "introcta"] = field.value[r].value;
                                            }
                                        }
                                    } else if (field.name == "Benefits") {
                                        for (var ben = 0; ben < field.value.length; ben++) {
                                            if (field.value[ben].name == "BenefitsMainTitle") {
                                                finalObj[channelName[j].channel + "BenefitsMainTitle"] = field.value[ben].value;
                                            } else if (field.value[ben].name == "BenefitsMainDescription") {
                                                finalObj[channelName[j].channel + "BenefitsMainDescription"] = field.value[ben].value;
                                            } else if (field.value[ben].name == "BenefitsSubTitle") {
                                                for (var bensubtitle = 0; bensubtitle < field.value[ben].value.length; bensubtitle++) {
                                                    finalObj[channelName[j].channel + "BenefitsSubTitle" + bensubtitle] = field.value[ben].value[bensubtitle].value;
                                                    if (field.value[ben].value.length != undefined && field.value[ben].value.length > 0) {
                                                        finalObj[channelName[j].channel + "BenefitsSubValue" + bensubtitle] = field.value[ben].value[bensubtitle].value;
                                                    } else {
                                                        for (var BenefitsSubValueList = 0; BenefitsSubValueList < field.value[bensubtitle].value.length; BenefitsSubValueList++) {
                                                            finalObj[channelName[j].channel + "BenefitsSubValue" + BenefitsSubValueList] = field.value[ben].value[bensubtitle].value[BenefitsSubValueList];
                                                        }
                                                    }
                                                }
                                            } else if (field.value[ben].name == "BenefitsCTA") {
                                                finalObj[channelName[j].channel + "BenefitsCTA"] = field.value[ben].value;
                                            }
                                        }
                                    }
                                    if (field.name == "Features") {
                                        for (var fea = 0; fea < field.value.length; fea++) {
                                            if (field.value[fea].name == "FeaturesMainTitle") {
                                                finalObj[channelName[j].channel + "FeaturesMainTitle"] = field.value[fea].value;
                                            } else if (field.value[fea].name == "FeaturesMainDescription") {
                                                finalObj[channelName[j].channel + "FeaturesMainDescription"] = field.value[fea].value;
                                            } else if (field.value[fea].name == "FeatureSubTitle") {
                                                if (field.value[fea].value.length != undefined && field.value[fea].value.length < 1) {
                                                    finalObj[channelName[j].channel + "FeatureSubValue"] = field.value[fea].value;
                                                } else {
                                                    for (var BenefitsSubValueList = 0; BenefitsSubValueList < field.value[fea].value.length; BenefitsSubValueList++) {
                                                        if (field.value[fea].value[BenefitsSubValueList].value.length != undefined && field.value[fea].value[BenefitsSubValueList].value.length < 1) {
                                                            finalObj[channelName[j].channel + "FeatureSubValue" + BenefitsSubValueList] = field.value[fea].value[BenefitsSubValueList].value;
                                                        } else {
                                                            for (var BenefitsSubValueListsub = 0; BenefitsSubValueListsub < field.value[fea].value[BenefitsSubValueList].value.length; BenefitsSubValueListsub++) {
                                                                finalObj[channelName[j].channel + "FeatureSubValue" + BenefitsSubValueListsub] = field.value[fea].value[BenefitsSubValueList].value[BenefitsSubValueListsub];
                                                            }
                                                        }
                                                    }
                                                }
                                            } else if (field.value[fea].name == "FeaturesCTA") {
                                                finalObj[channelName[j].channel + "FeaturesCTA"] = field.value;
                                            }
                                        }
                                    } else if (field.name == "ImportantInfo") {
                                        for (var ImportantInfo; ImportantInfo < field.value.length; ImportantInfo++) {
                                            if (field.value[ImportantInfo].name == "ImportantInfoParagraphs") {
                                                finalObj[channelName[j].channel + "ImportantInfoParagraphs"] = field.value[ImportantInfo].value;
                                            } else if (field.value[ImportantInfo].name == "ImportantInfoCTA") {
                                                finalObj[channelName[j].channel + "ImportantInfoCTA"] = field.value[ImportantInfo].value;
                                            }
                                        }
                                    }
                                    else if (field.name == "Disclaimer") {
                                        for (var dis = 0; dis < field.value.length; dis++) {
                                            if (field.value[dis].name == "DisclaimerMainTitle") {
                                                finalObj[channelName[j].channel + "DisclaimerMainTitle"] = field.value[dis].value;
                                            } else if (field.name == "DisclaimerMainDescription") {
                                                finalObj[channelName[j].channel + "DisclaimerMainDescription1"] = field.value[r].value[0];
                                                finalObj[channelName[j].channel + "DisclaimerMainDescription2"] = field.value[r].value[1];
                                            }
                                        }
                                        //finalObj[channelName[j].channel+"Disclaimer"] = field.value;

                                    }
                                }

                                else {
                                    if (field.name == "Body Copy") {
                                        finalObj[channelName[j].channel + "bodycopy"] = field.value;
                                    }
                                }
                            }
                        }
                        $scope.finalArr.push(finalObj);

                        console.log($scope.finalArr);
                    }
                }
                )
            //END 
        }
        //Add More Messaging Objects

        /* fill blank template content*/
        $scope.fillBlankTemp = [];
        var temp = {};
        temp.emailcontent = "Your Text Here";
        temp.smscontent = "Your Text Here";
        temp.pushcontent = "Your Text Here";
        temp.voicecontent = "Your Text Here";
        temp.directmailcontent = "Your Text Here";
        temp.landingpagecontent = "Your Text Here";
        temp.emailtitle = "Type Your Heading Here";
        temp.pushtitle = "Type Your Heading Here";
        temp.voicetitle = "Type Your Heading Here";
        temp.smstitle = "Type Your Heading Here";
        temp.directmailtitle = "Type Your Heading Here";
        temp.landingpagetitle = "Type Your Heading Here";
        $scope.fillBlankTemp.push(temp);

        $scope.addMore = function () {
            var d = new Date();
            var svrdate = d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + (d.getDate())).slice(-2) + " 00:00:00";
            var contents = [];
            for (var i = 0; i <= 5; i++) {
                var data = {};
                if (i == 4) {
                    data.createddate = svrdate;
                    data.campaignrefCode = $scope.id;
                    optionpath = $scope.finalArr.length + 1;
                    data.campaignwaverefCode = 1;
                    data.content = '{ "fields": [{ "name": "Title",  "value": "' + $scope.fillBlankTemp[0].landingpagetitle + '"},{"name": "Description","value": "' + $scope.fillBlankTemp[0].landingpagecontent + '"}]}';
                    //data.content  = '{ "fields": [{ "name": "Title",  "value": "Type Your Heading Here"},{"name": "Description","value": "Your Text Here"}]}';
                    data.url = GetHostUrl.repoUrl + '/content/industries/BANKING/SAVINGS-ACCOUNT/CROSS-SELL/Contents/option' + optionpath + '/landingpage/en-US/fields.json';
                    console.log("data.url " + data.url);
                }
                else {
                    data.createddate = svrdate;
                    data.campaignrefCode = $scope.id;
                    data.campaignwaverefCode = 1;
                    optionpath = $scope.finalArr.length + 1;
                    if (i == 0) {
                        data.content = '{ "fields": [{ "name": "Title",  "value": "' + $scope.fillBlankTemp[0].emailtitle + '"},{"name": "Description","value": "' + $scope.fillBlankTemp[0].emailcontent + '"}]}';
                        //data.content  = '{ "fields": [{ "name": "Title",  "value": "Type Your Heading Here"},{"name": "Description","value": "Your Text Here"}]}';
                        //data.url = $scope.finalArr[templateOptionUrl].emailurl;

                        data.url = GetHostUrl.repoUrl + '/content/industries/BANKING/SAVINGS-ACCOUNT/CROSS-SELL/Contents/option' + optionpath + '/email/en-US/fields.json';
                    }
                    if (i == 1) {
                        data.content = '{ "fields": [{ "name": "Title",  "value": "' + $scope.fillBlankTemp[0].pushtitle + '"},{"name": "Description","value": "' + $scope.fillBlankTemp[0].pushcontent + '"}]}';
                        //data.content  = '{ "fields": [{ "name": "Title",  "value": "Type Your Heading Here"},{"name": "Description","value": "Your Text Here"}]}';
                        //data.url = $scope.finalArr[templateOptionUrl].pushurl;

                        data.url = GetHostUrl.repoUrl + '/content/industries/BANKING/SAVINGS-ACCOUNT/CROSS-SELL/Contents/option' + optionpath + '/push/en-US/fields.json';
                    }
                    if (i == 2) {
                        data.content = '{ "fields": [{ "name": "Title",  "value": "' + $scope.fillBlankTemp[0].voicetitle + '"},{"name": "Description","value": "' + $scope.fillBlankTemp[0].voicecontent + '"}]}';
                        //data.content = '{ "fields": [{ "name": "Title",  "value": "Type Your Heading Here"},{"name": "Description","value": "Your Text Here"}]}';
                        //data.url = $scope.finalArr[templateOptionUrl].voiceurl;

                        data.url = GetHostUrl.repoUrl + '/content/industries/BANKING/SAVINGS-ACCOUNT/CROSS-SELL/Contents/option' + optionpath + '/voice/en-US/fields.json';
                    }
                    if (i == 3) {
                        data.content = '{ "fields": [{ "name": "Title",  "value": "' + $scope.fillBlankTemp[0].smstitle + '"},{"name": "Description","value": "' + $scope.fillBlankTemp[0].smscontent + '"}]}';
                        //data.content  = '{ "fields": [{ "name": "Title",  "value": "Type Your Heading Here"},{"name": "Description","value": "Your Text Here"}]}';
                        //data.url = $scope.finalArr[templateOptionUrl].smsurl;

                        data.url = GetHostUrl.repoUrl + '/content/industries/BANKING/SAVINGS-ACCOUNT/CROSS-SELL/Contents/option' + optionpath + '/sms/en-US/fields.json';
                    }
                    if (i == 5) {
                        data.content = '{ "fields": [{ "name": "Title",  "value": "' + $scope.fillBlankTemp[0].directmailtitle + '"},{"name": "Description","value": "' + $scope.fillBlankTemp[0].directmailcontent + '"}]}';
                        //data.content  = '{ "fields": [{ "name": "Title",  "value": "Type Your Heading Here"},{"name": "Description","value": "Your Text Here"}]}';
                        //data.url = $scope.finalArr[templateOptionUrl].smsurl;

                        data.url = GetHostUrl.repoUrl + '/content/industries/BANKING/SAVINGS-ACCOUNT/CROSS-SELL/Contents/option' + optionpath + '/directmail/en-US/fields.json';
                    }

                }

                data.filename = 'fields';
                data.type = 'json';
                contents.push(data);
            }

            $http({
                method: "POST",
                url: GetHostUrl.hostUrl + "/campaigntemplate/saveCampaignDefaultContentTemp",
                headers: $localStorage.headerss,
                data: {
                    contents: contents
                }
            })
                .success(function (data) {
                    console.log(data);
                    $scope.templateLoading();
                })
            //          var parentDIv = angular.element( document.querySelector( '#holder' ) );
            // parentDIv.append("<div class='temp-sel-holder' ui-sref='fmsg({id:temp,style:blank})'> <div class='row'> <div class='col-sm-12'> <h4>Style</h4> <div class='cont-sep'> <h4>Email</h4> <p>Your Content Here</p> </div> </div> </div> <div class='row'> <div class='col-sm-6'> <div class='row'> <div class='col-sm-12'> <div class='cont-sep'> <h4>SMS</h4> <p>Your Content Here</p> </div> </div> </div> <div class='row'> <div class='col-sm-12'> <div class='cont-sep'> <h4>Push Notification</h4> <p>Your Content Here</p> </div> </div> </div> </div> <div class='col-sm-6'> <div class='row'> <div class='col-sm-12'> <div class='cont-sep'> <h4>Voice</h4> <p>Your Content Here</p> </div> </div> </div> <div class='row'> <div class='col-sm-12'> <div class='cont-sep'> <h4>Something else</h4> <p>Your Content Here</p> </div> </div> </div> <input type='hidden' ng-model='styleVal' value='{{style_id}}");
        };
        $scope.templateLoading();

        $scope.labels = [];
        $scope.dateLabel = [];
        //End Add More Function 

        if (GetHostUrl.editFinalizeDesign.campaigndetails.stages == "messaging") {

            $scope.getdates = GetHostUrl.editOrchestration.cmapignwaveall;
            $scope.getdates1 = [];
            for (var i = 0; i < $scope.getdates.length; i++) {
                $scope.getdates2 = $scope.getdates[i].campaignwave.startOn;
                $scope.getdates3 = $scope.getdates2.replace(/ [0-9]+:[0-9]+:[0-9]+/g, "");
                $scope.getdates1.push($scope.getdates3);
            }
        } else {

            $scope.getdates = GetHostUrl.selectedDate;
            $scope.getdates1 = [];
            for (var i = 0; i < $scope.getdates.length; i++) {
                $scope.getdates2 = $scope.getdates[i].svrdate;
                $scope.getdates3 = $scope.getdates2.replace(/ [0-9]+:[0-9]+:[0-9]+/g, "");
                $scope.getdates1.push($scope.getdates3);
            }
        }
        console.log($scope.getdates1[0]);
        var c = $scope.getdates1.toString().replace(/,/g, ', ');
        console.log(c);

        var c1 = c.replace(/ [0-9]+:[0-9]+:[0-9]+/g, "");
        $scope.stringcoc = c1.replace(/,(?=[^,]*$)/, ' &');

        if (GetHostUrl.selectedChannel == "fromdash") {
            $scope.showLabel = true;
            var i = GetHostUrl.iterator;
            $scope.iterator = GetHostUrl.iterator;
            if (i == 0) {
                $scope.labels.push("LAUNCH");
                $scope.dateLabel.push($scope.getdates1[i]);
            } else if (i == GetHostUrl.editFinalizeDesign.cmapignwaveall.length - 1) {
                $scope.labels.push("CLOSURE");
                $scope.dateLabel.push($scope.getdates1[i]);
            } else {
                $scope.labels.push("REMINDER " + (i));
                $scope.dateLabel.push($scope.getdates1[i - 1]);
            }
        } else {
            for (var i = 1; i <= $scope.getdates1.length; i++) {
                if (i == 1) {
                    $scope.labels.push("LAUNCH");
                    $scope.dateLabel.push($scope.getdates1[i]);
                } else if (i == $scope.getdates1.length) {
                    $scope.labels.push("CLOSURE");
                    $scope.dateLabel.push($scope.getdates1[i]);
                } else {
                    $scope.labels.push("REMINDER " + (i - 1));
                    $scope.dateLabel.push($scope.getdates1[i - 1]);
                }
            }
        }

    }


);
