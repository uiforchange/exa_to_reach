var fiters = angular.module("setFiters", ['ngStorage']);

fiters.controller(
	"setFiters_Controller",
	function ($scope, $http, $window, $timeout, $location, $stateParams, GetHostUrl, $state, $localStorage, $rootScope) {

		$scope.formModel = {};

		$scope.formData = [];

		var CONSTANTS = {
			CAMPAIGN_ID: $localStorage.selectedconversationid
		};

		function getActiveCampaignDetails() {
			return $http({
				method: 'POST',
				url: GetHostUrl.cvmUrl + '/WSCampaign/campaign/getActiveCampaignDetails',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: $.param({
					// userId: 97,
					// sessionId: 5402,
					// authToken: '0603ebc10df1c045390980c00b6d6c1398f7',
					// activeCampaignId: 2690
					userId: $localStorage.loginUserDet.LoginStatus.user.userId,
					sessionId: $localStorage.loginUserDet.LoginStatus.sessionId,
					authToken: $localStorage.loginUserDet.LoginStatus.user.authToken,
					activeCampaignId: $localStorage.activeCampaignId
				})
			});
		}

		$timeout(function () {
			$http({
				method: 'POST',
				url: GetHostUrl.cvmUrl + '/WSCampaign/campaigns/campaignSpecificParams',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: $.param({
					userId: $localStorage.loginUserDet.LoginStatus.user.userId,
					sessionId: $localStorage.loginUserDet.LoginStatus.sessionId,
					authToken: $localStorage.loginUserDet.LoginStatus.user.authToken,
					campaignId: $localStorage.selectedconversationid
				})
			})
				.then(function (response) {
					$scope.formData = JSON.parse(response.data.CampaignSpecificParams.campaignSpecificParams.campaignSpecificParams).fields;
					if ($stateParams.edit === 'true') return getActiveCampaignDetails();
				})
				.then(function (response) {
					var activeCampaignSpecificParams = response.data.Response.data.activeCampaignSpecificParams;
					// var activeCampaignSpecificParams = 'days_inactive,null,20;credit_spent,null,between 0 and 10;card_type,null,SLR;card_profile,null,transactor;current_overdue,null,inclusion;repayment_history,null,<=$$$$90;rfm,null,3$$3$$2$$;age,null,between_19_and_24##;vintage,null,between_3_and_5##between_5_and_7##;income,null,between_1050186_and_2050170##;years_in_current_residence,null,between_2_and_3##;housing_status,null,own##;employment_status,null,Professional##;vip,null,1;';
					if (activeCampaignSpecificParams) {
						var splittedActiveCampaignSpecificParams = activeCampaignSpecificParams.split(';');
						splittedActiveCampaignSpecificParams.splice(splittedActiveCampaignSpecificParams.length - 1, 1);
						angular.forEach(splittedActiveCampaignSpecificParams, function (individualActiveCampaignSpecificParam) {
							var splittedIndividualActiveCampaignSpecificParam = individualActiveCampaignSpecificParam.split(',');
							if (splittedIndividualActiveCampaignSpecificParam[0] === 'days_inactive') {
								$scope.formModel['static_' + splittedIndividualActiveCampaignSpecificParam[0] + '_0'] = splittedIndividualActiveCampaignSpecificParam[2];
								$scope.formModel[splittedIndividualActiveCampaignSpecificParam[0]] = 1;
							} else if (splittedIndividualActiveCampaignSpecificParam[0] === 'credit_spent' || splittedIndividualActiveCampaignSpecificParam[0] === 'vip') {
								$scope.formModel[splittedIndividualActiveCampaignSpecificParam[0]] = isNaN(splittedIndividualActiveCampaignSpecificParam[2]) ? splittedIndividualActiveCampaignSpecificParam[2] : parseInt(splittedIndividualActiveCampaignSpecificParam[2]);
							} else if (splittedIndividualActiveCampaignSpecificParam[0] === 'card_type' || splittedIndividualActiveCampaignSpecificParam[0] === 'card_profile' || splittedIndividualActiveCampaignSpecificParam[0] === 'current_overdue') {
								$scope.formModel[splittedIndividualActiveCampaignSpecificParam[0]] = splittedIndividualActiveCampaignSpecificParam[2];
							} else if (splittedIndividualActiveCampaignSpecificParam[0] === 'rfm') {
								var splittedRfm = splittedIndividualActiveCampaignSpecificParam[2].split('$$');
								splittedRfm.splice(splittedRfm.length - 1, 1);
								angular.forEach(splittedRfm, function (rfm, index) {
									$scope.formModel['static_' + splittedIndividualActiveCampaignSpecificParam[0] + '_' + index] = rfm;
								});
							} else if (splittedIndividualActiveCampaignSpecificParam[0] === 'repayment_history' || splittedIndividualActiveCampaignSpecificParam[0] === 'top-up_history') {
								var splittedRepayHistory = splittedIndividualActiveCampaignSpecificParam[2].split('$$$$');
								$scope.formModel['static_' + splittedIndividualActiveCampaignSpecificParam[0] + '_0'] = splittedRepayHistory[0];
								$scope.formModel['static_' + splittedIndividualActiveCampaignSpecificParam[0] + '_2'] = splittedRepayHistory[1];
							} else if ((splittedIndividualActiveCampaignSpecificParam[2].indexOf('##') > -1) && (splittedIndividualActiveCampaignSpecificParam[0] === 'age' || splittedIndividualActiveCampaignSpecificParam[0] === 'vintage' || splittedIndividualActiveCampaignSpecificParam[0] === 'income' || splittedIndividualActiveCampaignSpecificParam[0] === 'years_in_current_residence' || splittedIndividualActiveCampaignSpecificParam[0] === 'housing_status' || splittedIndividualActiveCampaignSpecificParam[0] === 'employment_status')) {
								if (splittedIndividualActiveCampaignSpecificParam[2].indexOf('_') > -1) {
									splittedIndividualActiveCampaignSpecificParam[2] = splittedIndividualActiveCampaignSpecificParam[2].split('_').join(' ');
								}
								var splittedAge = splittedIndividualActiveCampaignSpecificParam[2].split('##');
								splittedAge.splice(splittedAge.length - 1, 1);
								angular.forEach(splittedAge, function (age, index) {
									$scope.formModel[age] = true;
								});
							} else if (splittedIndividualActiveCampaignSpecificParam[0] === 'productNvariant') {
								var splittedProductNvariant = splittedIndividualActiveCampaignSpecificParam[2].split('$$');
								if (splittedProductNvariant) {
									$scope.formModel['static_' + splittedIndividualActiveCampaignSpecificParam[0] + '_0'] = splittedProductNvariant[0];
									$scope.formModel['static_' + splittedIndividualActiveCampaignSpecificParam[0] + '_1'] = splittedProductNvariant[1];
								}
							} else {
								// console.log('others...');
								if (splittedIndividualActiveCampaignSpecificParam[2].indexOf('$$') > -1) {
									var splitted = splittedIndividualActiveCampaignSpecificParam[2].split('$$');
									splitted.splice(splitted.length - 1, 1);
									angular.forEach(splitted, function (value, index) {
										$scope.formModel['static_' + splittedIndividualActiveCampaignSpecificParam[0] + '_' + index] = value;
									});
								} else {
									// console.log('others');
									$scope.formModel[splittedIndividualActiveCampaignSpecificParam[0]] = splittedIndividualActiveCampaignSpecificParam[2];
								}
							}
						});
					}
				});
		}, 10);

		$scope.checkboxChange = function (fd, rv, checked) {
			// console.log(rv.value + ' ' + checked);
			if ($scope.formModel[fd.name]) {
				var obj = $scope.formModel[fd.name][0];
			} else {
				var obj = new Object();
			}
			angular.forEach(fd.values, function (option) {
				if (option.value === rv.value) {
					obj[option.value] = checked;
				}
			});
			$scope.formModel[fd.name] = [obj];
		};

		// $scope.isCheckboxRequired = function(fd, rv) {
		// 	// debugger;
		// 	if(!$scope.formModel[fd.name]) {
		// 		return true;
		// 	}
		// 	return !$scope.formModel[fd.name].some(function(option){
		// 		return option[rv.name];
		// 	});
		// };

		$scope.back = function () {
			$localStorage.createBack = true;
			$state.go("createcampaign");
		};

		$scope.submit = function (myForm, formModel) {
			var formInvalid = $scope.formData.some(function (value) {
				return (value.validation.optional === 'false' && !formModel[value.name]);
			});
			if (formInvalid || myForm.$invalid) {
				$scope.commonAlertText = "Please select all the required values";
				$("#commonAlert").modal("show");
				return;
			}
			// console.log(formModel);
			var params = {};
			angular.forEach($scope.formData, function (value) {
				if (angular.isArray(formModel[value.name])) {
					var concatted = '';
					for (var i in formModel[value.name][0]) {
						if (formModel[value.name][0][i]) {
							concatted += '' + i + '##';
						}
					}
					params[value.name] = value.name + ',null,' + concatted.split(' ').join('_') + ';';
				} else if (angular.isArray(value.values) && value.control === 'checkbox') {
					var concatted = '';
					for (var i in value.values) {
						if (formModel[value.values[i].value]) {
							concatted += '' + value.values[i].value + '##';
						}
					}
					params[value.name] = value.name + ',null,' + concatted.split(' ').join('_') + ';';
				} else {
					if (value.name.indexOf('days_inactive') > -1) {
						var multiplyByVal = 0;
						if (formModel['days_inactive'] == '1') multiplyByVal = 1;
						else if (formModel['days_inactive'] == '30') multiplyByVal = 30;
						else multiplyByVal = 365;
						params[value.name] = value.name + ',null,' + (parseInt(formModel['static_days_inactive_0']) * multiplyByVal) + ';';
					} else if (value.name.indexOf('repayment_history') > -1) {
						params[value.name] = value.name + ',null,' + (formModel['static_repayment_history_0'] ? formModel['static_repayment_history_0'] : 'Select') + '$$$$' + (formModel['static_repayment_history_2'] ? formModel['static_repayment_history_2'] : 'Month') + ';';
					} else {
						var concatted = '';
						var dynamicValue = (formModel[value.name] ? (formModel[value.name].value ? formModel[value.name].value : formModel[value.name]) : '');
						concatted += value.name + ',null,';
						params[value.name] = concatted;
						for (var i in formModel) {
							if ((i.indexOf(value.name) > -1)) {
								if (i.indexOf('static_') > -1) {
									params[value.name] += (angular.isObject(formModel[i]) ? formModel[i].value : formModel[i]) + '$$';
								} else {
									//code added for assigning non static
									if(value.control === 'checkbox') {
										params[value.name] += (angular.isObject(formModel[i]) ? formModel[i].value : formModel[i]) + '$$';
									}
								}
							}
						}
						params[value.name] += dynamicValue + ';';
					}
				}
			});
			// console.log(params);
			var formattedParams = {};
			formattedParams.userId = $localStorage.loginUserDet.LoginStatus.user.userId;
			formattedParams.sessionId = $localStorage.loginUserDet.LoginStatus.sessionId;
			formattedParams.authToken = $localStorage.loginUserDet.LoginStatus.user.authToken;
			formattedParams.campaignId = CONSTANTS.CAMPAIGN_ID;
			formattedParams.activeCampaignId = $localStorage.activeCampaignId;
			formattedParams.acsp = '';
			formattedParams.inclusions = '';
			formattedParams.exclusions = '';
			for (var i in params) {
				formattedParams.acsp += params[i];
			}
			console.log(formattedParams);
			$scope.showRecordCount = true;
			$scope.isLoadingCount = true;
			$http({
				method: 'POST',
				url: GetHostUrl.cvmUrl + '/WSCampaign/campaigns/updateCampaignSpecificParamsForContactsCount',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: $.param(formattedParams)
			})
				.then(function (response) {
					// console.log(response);
					getContactsCount();
				});
		};

		function getContactsCount() {
			$http({
				method: 'POST',
				url: GetHostUrl.cvmUrl + '/WSCampaign/campaigns/getContactsCount',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: $.param({
					userId: $localStorage.loginUserDet.LoginStatus.user.userId,
					sessionId: $localStorage.loginUserDet.LoginStatus.sessionId,
					authToken: $localStorage.loginUserDet.LoginStatus.user.authToken,
					activeCampaignId: $localStorage.activeCampaignId
				})
			})
				.then(function (response) {
					// console.log(response);
					var nearestRecordCount = 0;
					if (response.data.CampaignCount.recordCount > 0) {
						var recordCount = response.data.CampaignCount.recordCount;
						if (recordCount < 2000) {
							if (recordCount < 200) {
								if (recordCount < 20) {
									nearestRecordCount = recordCount;
								} else {
									nearestRecordCount = nearest(recordCount, 10);
								}
							} else {
								nearestRecordCount = nearest(recordCount, 100);
							}
						} else {
							nearestRecordCount = nearest(recordCount, 1000);
						}
						$scope.recordCount = nearestRecordCount;
						$scope.isLoadingCount = false;
					} else {
						setTimeout(function () {
							getContactsCount();
						}, 2000);
					}
				}, function () {
					//error comes here
					setTimeout(function () {
						getContactsCount();
					}, 2000);
					// $scope.isLoadingCount = false;
				});
		}

		function nearest(n, v) {
			n = n / v;
			n = Math.round(n) * v;
			console.log(n);
			return n;
		}

		$scope.saveAndProceed = function () {
			localStorage['ngStorage-recordCount'] = $scope.recordCount;
			$state.go('createsegments');
		};

		// var formList = [];

		// $scope.finalFn = function(){
		// 	$.each(formList, function(index, value) {
		// 		$(value).appendTo("#formFields");
		// 	});
		// }

		// $http({
		// 	method  : 'POST',
		// 	url     : GetHostUrl.cvmUrl+'/WSCampaign/campaigns/campaignSpecificParams',
		// 	headers : {'Content-Type': 'application/x-www-form-urlencoded'},
		// 	data:$.param({
		// 		userId:97,
		// 		sessionId:5665,
		// 		authToken:"d6efb03203db9046b30aa9a0ed33bebb0a08",
		// 		campaignId:23
		// 	})
		// })
		// .success(function(data)
		// {

		// 	for(var key in data){
		// 		var values = data["CampaignSpecificParams"];
		// 		$scope.values1 = JSON.parse(values.campaignSpecificParams.campaignSpecificParams);
		// 		for(var i in $scope.values1.fields){

		// 			$scope.formdata = $scope.values1.fields[i];
		// 			if($scope.formdata.control == "text"){
		// 				$scope.texttreq = $scope.formdata.validation.optional;
		// 				$scope.textReqFlag = false;
		// 				if($scope.texttreq == "false"){
		// 					$scope.textReqFlag = true;
		// 				}
		// 				$scope.formtext = '<div><div class="col-xs-12"><input type="text" class="form-control" ng-model="filterForm.'+$scope.formdata.name+'" name="'+$scope.formdata.name+'" ng-required="textReqFlag == true"/></div></div>';
		// 				formList.push($scope.formtext);
		// 			}
		// 			 else if($scope.formdata.control == "radio"){
		// 				$scope.radioreq = $scope.formdata.validation.optional;
		// 				$scope.radioReqFlag = false;
		// 				if($scope.radioreq == "false"){
		// 					$scope.radioReqFlag = true;
		// 				}
		// 				$scope.radioOptional = $scope.formdata.values;
		// 				$scope.formradio = $compile('<div><div class="col-xs-12" ng-repeat="radio in radioOptional"><div class="col-xs-3"><input type="radio" ng-model="filterForm.'+$scope.formdata.name+'" name="'+$scope.formdata.name+'" ng-value="{{radio.value}}"/>{{radio.name}}</div></div></div>')($scope);
		// 				formList.push($scope.formradio);
		// 			} else if($scope.formdata.control == "checkbox"){
		// 			debugger;
		//                 var checkArray = []; 					
		// 				$scope.checkOptional = $scope.formdata.values;
		// 				checkArray.push($scope.checkOptional);
		// 				$scope.checkvalue = checkArray[checkArray.length - 1];
		// 				var optionalval=$scope.formdata.values;
		// 				$scope.formcheckbox = $compile('<div><div class="col-xs-12"><div class="col-xs-3" ng-repeat="check in checkOptional"><input type="checkbox" ng-model="filterForm.'+$scope.formdata.name+'" ng-value="{{check.value}}"/><label>{{check.name}}</label></div></div></div>')($scope);
		// 				console.log("test");
		// 				formList.push($scope.formcheckbox);

		// 			} else if($scope.formdata.control == "select"){
		// 				$scope.selectreq = $scope.formdata.validation.optional;
		// 				$scope.selectReqFlag = false;
		// 				if($scope.selectreq == "false"){
		// 					$scope.selectReqFlag = true;
		// 				}
		// 				$scope.selectotional = $scope.formdata.values;
		// 				$scope.formselect = $compile('<div><div class="col-xs-12"><p>'+$scope.formdata.label+'</p></div><div class="col-xs-12"><div class="col-xs-6"><select ng-model="filterForm.'+$scope.formdata.name+'" name="'+$scope.formdata.name+'" ng-options="item.value as item.name for item in selectotional" ng-required="selectReqFlag == true"></select></div></div></div>')($scope);
		// 				formList.push($scope.formselect);
		// 			} else if($scope.formdata.control == "buildup_trend"){
		// 				$scope.formbuildup = '';
		// 				formList.push($scope.formbuildup);
		// 			} else if($scope.formdata.control == "combobox"){
		// 				$scope.formcombobox = '';
		// 				formList.push($scope.formcombobox);
		// 			} else if($scope.formdata.control == "invertedComboBox"){
		// 				$scope.forminvertedbox = '';
		// 				formList.push($scope.forminvertedbox);
		// 			} else if($scope.formdata.control == "average_balance_trend"){
		// 				$scope.formavgbalance = '';
		// 				formList.push($scope.formavgbalance);
		// 			} else if($scope.formdata.control == "usage"){
		// 				$scope.formusage = '';
		// 				formList.push($scope.formusage);
		// 			} else if($scope.formdata.control == "migration"){
		// 				$scope.formmigration = '';
		// 				formList.push($scope.formmigration);
		// 			} else if($scope.formdata.control == "history"){
		// 				$scope.formhistory = '';
		// 				formList.push($scope.formhistory);
		// 			} else if($scope.formdata.control == "rfm"){
		// 				$scope.formrfm = '';
		// 				formList.push($scope.formrfm);
		// 			} else if($scope.formdata.control == "text-combo"){
		// 				$scope.formtextcombo = '';
		// 				formList.push($scope.formtextcombo);
		// 			} else if($scope.formdata.control == "multiselect"){
		// 				$scope.formmultiselect = '';
		// 				formList.push($scope.formmultiselect);
		// 			}
		// 		}
		// 	}

		// 	$scope.finalFn();

		// })


	}
);
