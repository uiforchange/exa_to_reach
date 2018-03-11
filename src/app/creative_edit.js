var creative_edit = angular.module("creative_edit", ['ngStorage']);

creative_edit.controller("Creative_Edit_Controller",
    function ($scope, $http, $window, $location, $stateParams, GetHostUrl, $state, $timeout, $sce, $localStorage, $compile) {
 /**
         * KEditor Table Component
         * @copyright: Kademi (http://kademi.co)
         * @author: Kademi (http://kademi.co)
         * @version: 1.1.3
         * @dependencies: $, $.fn.draggable, $.fn.droppable, $.fn.sortable, Bootstrap, FontAwesome (optional)
         */
		 
		 /* Table settings start*/
        (function($) {
            var KEditor = $.keditor;
            var flog = KEditor.log;

            KEditor.components['table'] = {
                init: function(contentArea, container, component, keditor) {
                    flog('init "table" component', component);

                    var componentContent = component.children('.keditor-component-content');
                    var img = componentContent.find('img');
                },

                settingEnabled: true,

                settingTitle: 'Table Settings',
				
				/* Table settings component form start*/
				
				initSettingForm: function(form, keditor) {
                    flog('initSettingForm "table" component');

                    var self = this;
                    var options = keditor.options;

                    form.append($compile(
                        '<form class="form-horizontal" style="margin:0px !important;padding:0px !important; ">' +
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title ">How to use<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu openmenu howtouse">' +
                        '		  <p>If you double click on the Image element, the Image gallery will pop up, and you will be able to insert your image.</p>' +
                        '         <p>In the right menu you can add link (URL) and alt text to your image and also change its alignment (left, center, right) and size.</p>' +
                        '         <p>If the original width of your image is bigger than 240px, but you resized it to a smaller size in the desktop version, you are able to make it full width on mobile with the Fluid on mobile switch.</p>' +
                        '         <p>Note: Use 600px wide pictures for best reader experience on mobile.</p>' +
                        '		</div>' +
                        '   </div>' +
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title">TABLE PROPERTIES<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu rowcolumnadddelete rowcolumnadddelete">' +
						'   		<div class="form-group">' +
                        '     			<label for="rowcount" class="col-sm-12 twocolumnoption">Row</label>' +
                        '           	<div class="col-sm-12 twocolumnoption">' +
                        '         		  <input type="number" id="rowcount" class="form-control" />' +
                        '       		</div>' +
                        '   		</div>' +
						'  		 <div class="form-group">' +
						'			<a id="addrow" class="btn btn-default ">Add Row</a>' +
						'			<a id="deleterow" class="btn btn-default">Delete Row</a>' +
						'		 </div>' +	
						'   	<div class="form-group">' +
                        '     			<label for="columncount" class="col-sm-12 twocolumnoption">Column</label>' +
                        '           	<div class="col-sm-12 twocolumnoption">' +
                        '         		  <input type="number" id="columncount" class="form-control" />' +
                        '       		</div>' +
                        '   		</div>' +  
						'  		 <div class="form-group">' +
						'			<a id="addcolumn" class="btn btn-default">Add Column</a>' +
						'			<a id="deletecolumn" class="btn btn-default">Delete Column</a>' +
						'		 </div>' +	
                        '   	<div class="form-group">' +
                        '     			<label for="table-width" class="col-sm-12 twocolumnoption">Width</label>' +
                        '           	<div class="col-sm-12 twocolumnoption">' +
                        '         		 <input type="number" id="table-width" class="form-control" />' +
						'      		     <select id="width-sizeoption" class="form-control">' +
						'         		     <option value="Percent">Percent</option>' +
						'              		 <option value="pixel">pixel</option>' +
						'          		 </select>' +
                        '       		</div>' +
                        '   	</div>' +   						
						'  		 <div class="form-group">' +
						'      		 <label for="table-align" class="col-sm-12 twocolumnoption">Align</label>' +
						'      		 <div class="col-sm-12 twocolumnoption">' +
						'      		     <select id="table-align" class="form-control">' +
						'         		     <option value="left">Left</option>' +
						'          		     <option value="center">Center</option>' +
						'              		 <option value="right">Right</option>' +
						'          		 </select>' +
						'       	</div>' +
						'   	</div>' +						
                        '	</div>' +
                        '	</div>' + 
						'   <div class="accordian1">' +
                        '	<p class="accordion-title">Row Properties<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu ">' +
						'   	<div class="form-group">' +
                        '     			<label for="row-height" class="col-sm-12 twocolumnoption">Height</label>' +
                        '           	<div class="col-sm-12 twocolumnoption">' +
                        '         		  <input type="number" id="row-height" class="form-control" />' +
						'      		     <select id="rowheight-sizeoption" class="form-control">' +
						'         		     <option value="Percent">Percent</option>' +
						'          		     <option value="pixel">pixel</option>' +
						'          		 </select>' +
                        '       		</div>' +
                        '   	</div>' +   						
						'  		 <div class="form-group">' +
						'      		 <label for="row-align" class="col-sm-12 twocolumnoption">Align</label>' +
						'      		 <div class="col-sm-12 twocolumnoption">' +
						'      		     <select id="row-align" class="form-control">' +
						'         		     <option value="left">Left</option>' +
						'          		     <option value="center">Center</option>' +
						'              		 <option value="right">Right</option>' +
						'          		 </select>' +
						'       	</div>' +
						'   	</div>' +
						'  		 <div class="form-group">' +
						'      		 <label for="row-verticalalign" class="col-sm-12 twocolumnoption">Vertical Align</label>' +
						'      		 <div class="col-sm-12 twocolumnoption">' +
						'      		     <select id="row-verticalalign" class="form-control">' +
						'         		     <option value="Middle">Middle</option>' +
						'          		     <option value="Top">Top</option>' +
						'              		 <option value="Bottom">Bottom</option>' +
						'          		 </select>' +
						'       	</div>' +
						'   	</div>' +
                        ' 		</div>' +
                        ' 	</div>' +
						'   <div class="accordian1">' +
                        '	<p class="accordion-title">Cell Properties<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu ">' +
						'   	<div class="form-group">' +
                        '     			<label for="cell-width" class="col-sm-12 twocolumnoption">Width</label>' +
                        '           	<div class="col-sm-12 twocolumnoption">' +
                        '         		  <input type="number" id="cell-width" class="form-control" />' +
						'      		     <select id="cellwidth-sizeoption" class="form-control">' +
						'         		     <option value="Percent">Percent</option>' +
						'          		     <option value="pixel">pixel</option>' +
						'          		 </select>' +
                        '       		</div>' +
                        '   	</div>' + 
						'   	<div class="form-group">' +
                        '     			<label for="cell-height" class="col-sm-12 twocolumnoption">Height</label>' +
                        '           	<div class="col-sm-12 twocolumnoption">' +
                        '         		  <input type="number" id="cell-height" class="form-control" />' +
						'      		     <select id="cellheight-sizeoption" class="form-control">' +
						'         		     <option value="Percent">Percent</option>' +
						'          		     <option value="pixel">pixel</option>' +
						'          		 </select>' +
                        '       		</div>' +
                        '   	</div>' +   						
						'  		 <div class="form-group">' +
						'      		 <label for="cell-align" class="col-sm-12 twocolumnoption">Align</label>' +
						'      		 <div class="col-sm-12 twocolumnoption">' +
						'      		     <select id="cell-align" class="form-control">' +
						'         		     <option value="left">Left</option>' +
						'          		     <option value="center">Center</option>' +
						'              		 <option value="right">Right</option>' +
						'          		 </select>' +
						'       	</div>' +
						'   	</div>' +
						'  		 <div class="form-group">' +
						'      		 <label for="cell-verticalalign" class="col-sm-12 twocolumnoption">Vertical Align</label>' +
						'      		 <div class="col-sm-12 twocolumnoption">' +
						'      		     <select id="cell-verticalalign" class="form-control">' +
						'         		     <option value="Middle">Middle</option>' +
						'          		     <option value="Top">Top</option>' +
						'              		 <option value="Bottom">Bottom</option>' +
						'          		 </select>' +
						'       	</div>' +
						'   	</div>' +
                        ' 		</div>' +
                        ' 	</div>' +
                        '</form>'
                    )($scope));
					/* Accordian */
					 $(".openmenu").show();
                    $('.accordian1').find('.submenu.openmenu').parent().find("p span").css("background-image", "url('images/minus.png')");
                    $('.accordian1 p').click(function() {
                        $('.accordian1 .submenu').slideUp();
						$('.accordian1 p').css("background", "#f9f9f9");
                        $('.accordian1 p span').css("background-image", "url('images/plus.png')");
                        if ($(this).parent().find('.submenu').is(':visible')) {
                            $(this).parent().find('.submenu').slideUp();
                            $(this).find('span').css("background-image", "url('images/plus.png')");		
							$(this).css("background", "#f9f9f9");
                        } else {
                            $(this).parent().find('.submenu').slideDown();
                            $(this).find("span").css("background-image", "url('images/minus.png')");
							$(this).css("background", "#ffffff");
                        }
                    });
					/* Table width */
					var tablewidthoption = form.find('#width-sizeoption');					
					tablewidthoption.on('change', function () {
						var selectboxvalue = $( "#width-sizeoption option:selected" ).text();
						if(selectboxvalue == 'Percent'){
							var table = keditor.getSettingComponent().find('.tablewrapper .table');
							var inputvalue= $('#table-width').val();
							table.css('width', inputvalue + '%');
						}
						else{
							var table = keditor.getSettingComponent().find('.tablewrapper .table');
							var inputvalue= $('#table-width').val();
							table.css('width', inputvalue + 'px');
						}
					});	
					var tablewidth = form.find('#table-width');
					tablewidth.on('keyup', function () {
						var selectboxvalue = $( "#width-sizeoption option:selected" ).text();
						if(selectboxvalue == 'Percent'){
							var table = keditor.getSettingComponent().find('.tablewrapper .table');
							table.css('width', this.value + '%');
						}
						else{
							var table = keditor.getSettingComponent().find('.tablewrapper .table');
							table.css('width', this.value + 'px');
						}
					});
					/* TableAlign property */
					var tableAlign = form.find('#table-align');
					tableAlign.on('change', function () {
						var tablealignment = keditor.getSettingComponent().find('table');
						tablealignment.attr('align', this.value);
					});		
					/* Row height */
					var rowheightoption = form.find('#rowheight-sizeoption');					
					rowheightoption.on('change', function () {
						var selectboxvalue = $( "#rowheight-sizeoption option:selected" ).text();
						if(selectboxvalue == 'Percent'){
							var rowheightvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							var inputvalue= $('#row-height').val();
							rowheightvalue.parent().find('td').css('height', inputvalue + '%');
						}
						else{
							var rowheightvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							var inputvalue= $('#row-height').val();
							rowheightvalue.parent().find('td').css('height', inputvalue + 'px');
						}
					});	
					var rowheight = form.find('#row-height');
					rowheight.on('keyup', function () {						
						var selectboxvalue = $( "#rowheight-sizeoption option:selected" ).text();
						if(selectboxvalue == 'Percent'){
							var rowheightvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							rowheightvalue.parent().find('td').css('height', this.value + '%');
						}
						else{
							var rowheightvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							rowheightvalue.parent().find('td').css('height', this.value + 'px');
						}
					});
					/* Row align */
					var rowalign = form.find('#row-align');
					rowalign.on('change', function () {
						var cellalignment = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
						cellalignment.parent().find('td').css('text-align', this.value);
					});	
					/* Row verticalalign */
					var rowverticalalign = form.find('#row-verticalalign');
					rowverticalalign.on('change', function () {
						var rowverticalalignment = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
						rowverticalalignment.parent().find('td').css('vertical-align', this.value);
					});	
					/* Cellalign */
					var cellalign = form.find('#cell-align');
					cellalign.on('change', function () {
						var cellalignment = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
						cellalignment.css('text-align', this.value);
					});	
					/* Cellverticalalign */
					var cellverticalalign = form.find('#cell-verticalalign');
					cellverticalalign.on('change', function () {
						var cellverticalalignment = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
						cellverticalalignment.css('vertical-align', this.value);
					});	
					/* cellwidth */										
					var cellwidthoption = form.find('#cellwidth-sizeoption');					
					cellwidthoption.on('change', function () {
						var selectboxvalue = $( "#cellwidth-sizeoption option:selected" ).text();
						if(selectboxvalue == 'Percent'){
							var cellwidthvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							var inputvalue= $('#cell-width').val();
							cellwidthvalue.css('width', inputvalue + '%');
						}
						else{
							var cellwidthvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							var inputvalue= $('#cell-width').val();
							cellwidthvalue.css('width', inputvalue + 'px');
						}
					});	
					var cellwidth = form.find('#cell-width');
					cellwidth.on('keyup', function () {
						var selectboxvalue = $( "#cellwidth-sizeoption option:selected" ).text();
						if(selectboxvalue == 'Percent'){
							var cellwidthvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							cellwidthvalue.css('width', this.value + '%');
						}
						else{
							var cellwidthvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							cellwidthvalue.css('width', this.value + 'px');
						}
					});
					/* cellheight */
					var cellheightoption = form.find('#cellheight-sizeoption');					
					cellheightoption.on('change', function () {
						var selectboxvalue = $( "#cellheight-sizeoption option:selected" ).text();
						if(selectboxvalue == 'Percent'){
							var cellheightvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							var inputvalue= $('#cell-height').val();
							cellheightvalue.css('height', inputvalue + '%');
						}
						else{
							var cellheightvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							var inputvalue= $('#cell-height').val();
							cellheightvalue.css('height', inputvalue + 'px');
						}
					});	
					var cellheight = form.find('#cell-height');
					cellheight.on('keyup', function () {						
						var selectboxvalue = $( "#cellheight-sizeoption option:selected" ).text();
						if(selectboxvalue == 'Percent'){
							var cellheightvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							cellheightvalue.css('height', this.value + '%');
						}
						else{
							var cellheightvalue = keditor.getSettingComponent().find('.tablewrapper .table tr td.activecell');
							cellheightvalue.css('height', this.value + 'px');
						}
					});
					/* Vertical Align property */
					var verticalAlign = form.find('#table-verticalalign');
					verticalAlign.on('change', function () {
						var verticalalignment = keditor.getSettingComponent().find('.tablewrapper .table tr td');
						verticalalignment.css('vertical-align', this.value);
					});	
					/* Add Row */
					var addrow = form.find('#addrow');
					var rowcount = form.find('#rowcount');
					rowcount.val('1');
					$(addrow).click(function(){   
							var rowcountval = rowcount.val();
							var table = keditor.getSettingComponent().find('table');
							var tabletbody = keditor.getSettingComponent().find('table tbody');
							var tablerow = keditor.getSettingComponent().find('table tbody tr');
							var tabletbodyfirstchild = keditor.getSettingComponent().find('table tr td:first-child');
							var tabletbodylastchild = keditor.getSettingComponent().find('table tbody tr:last');
							if(rowcountval==0){
								tabletbody.append(tabletbodylastchild.clone());
							}
							else{
								for(var i=0; i<rowcountval; i++) {
									tabletbody.append(tabletbodylastchild.clone());
									rowcount.val('1');
								}
							}
							if (tabletbody.children().length == 0) {
										var columncount = table.rows[0].cells.length;
								  tabletbody.append($("<tr>Newlyinserteddiv "+ i +"</tr>"));
									for(var i=0; i<columncount; i++) {
										tablerow.append($("<td>Newlyinsertedrow "+ i +"</td>"));
									    tabletbodyfirstchild.html("<input type='checkbox'/>");
									}
							}
					});
					/* Delete Row */
					var deleterow = form.find('#deleterow');
					$(deleterow).click(function(){ 
						var rowcountval = rowcount.val();
						var $tbody = keditor.getSettingComponent().find('table tbody');
						if(rowcountval==0){
							var $last = $tbody.find('tr:last');
							if($last.is(':first-child')){
								alert('last is the only one')
							}else {
								$last.remove()
							}
							rowcount.val('1');
						}
						else{
							for(var i=0; i<rowcountval; i++) {
								var $last = $tbody.find('tr:last');
								if($last.is(':first-child')){
									alert('last is the only one')
								}else {
									$last.remove()
								}
							}							
						}
							
						/* var table = keditor.getSettingComponent().find('table');
						var rowCount = keditor.getSettingComponent().find('table tr').length;
						for(var i=1; i<rowCount-1; i++) {
							var row = table.rows[i];
							var chkbox = row.cells[0].childNodes[0];
							if(null != chkbox && true == chkbox.checked) {
								table.deleteRow(i);
								rowCount--;
								i--;
							}
						} */
					});
					/* Add Column */
					var addcolumn = form.find('#addcolumn');
					var columncount = form.find('#columncount');
					columncount.val('1');
					$(addcolumn).click(function(){ 
						var columncountval = columncount.val();
						var table = keditor.getSettingComponent().find('table');
						var tablerow = keditor.getSettingComponent().find('table tr');
/* 						var tableheadfirstchild = keditor.getSettingComponent().find('table thead tr td:first-child');
						var tabletbodylastchild = keditor.getSettingComponent().find('table tbody tr td:first-child'); */
						if(columncountval==0){
							tablerow.append($("<td>newcell</td>"));
							columncount.val('1');
						}
						else{
							for(var i=0; i<columncountval; i++) {
								tablerow.append($("<td>newcell</td>"));
							}
						}
						
						/* tableheadfirstchild.html("<input class='checkall' name='chk[]' type='checkbox'/>");
						tabletbodylastchild.html("<input type='checkbox'/>"); */
					});
					/* Delete Column */
					var deletecolumn = form.find('#deletecolumn');					
					$(deletecolumn).click(function(){ 
						var columncountval = columncount.val();
						var allRows = keditor.getSettingComponent().find('table tr');
						if(columncountval==0){
							columncount.val('1');
							for (var i=0; i< allRows.length; i++) {
								if (allRows[i].cells.length > 2) {
									allRows[i].deleteCell(-1); //delete the cell
								} else {
									alert("You can't delete more columns.");
									return;
								}
							}
						}
						else{
							for(var j=0; j<columncountval; j++) {
								for (var i=0; i< allRows.length; i++) {
									if (allRows[i].cells.length > 2) {
										allRows[i].deleteCell(-1); //delete the cell
									} else {
										alert("You can't delete more columns.");
										return;
									}
								}
							}
						}
					});
					/* check all */
					var checkall = form.find('.checkall');
					$(checkall).on('change',function(){
							alert("hai");
						 var checkboxes = keditor.getSettingComponent().find('table input');
						 if ($(this).is(':checked')) {
							 for (var i = 0; i < checkboxes.length; i++) {
								 if (checkboxes[i].type == 'checkbox') {
									 checkboxes[i].checked = true;
								 }
							 }
						 } else {
							 for (var i = 0; i < checkboxes.length; i++) {
								 console.log(i)
								 if (checkboxes[i].type == 'checkbox') {
									 checkboxes[i].checked = false;
								 }
							 }
						 }
					});
				},
					
					/* Table settings component form end*/
					
                showSettingForm: function(form, component, keditor) {
                    flog('showSettingForm "table" component', component);

                }
            };

        })(jQuery);

		/* Table settings End*/ 
		
		/* social sharing settings start*/
        (function($) {
            var KEditor = $.keditor;
            var flog = KEditor.log;

            KEditor.components['social'] = {
                init: function(contentArea, container, component, keditor) {
                    flog('init "social" component', component);

                    var componentContent = component.children('.keditor-component-content');
                    var img = componentContent.find('img');
                    img.css('display', 'inline-block');
                },

                settingEnabled: true,

                settingTitle: 'social Settings',
				
				/* Image settings component form start*/
				
                initSettingForm: function(form, keditor) {
                    flog('initSettingForm "social" component');

                    var self = this;
                    var options = keditor.options;

                    form.append($compile(
                        '<form class="form-horizontal" style="margin:0px !important;padding:0px !important; ">' +                       
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title ">How to use<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu openmenu howtouse">' +
                        '		  <p>If you double click on the Image element, the Image gallery will pop up, and you will be able to insert your image.</p>' +
                        '         <p>In the right menu you can add link (URL) and alt text to your image and also change its alignment (left, center, right) and size.</p>' +
                        '         <p>If the original width of your image is bigger than 240px, but you resized it to a smaller size in the desktop version, you are able to make it full width on mobile with the Fluid on mobile switch.</p>' +
                        '         <p>Note: Use 600px wide pictures for best reader experience on mobile.</p>' +
                        '		</div>' +
                        '   </div>' +    
						'   <div class="accordian1">' +						
                        '	<p class="accordion-title">Align<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   <div class="panel-align">' +
                        '	   <div class="panel-align-left imgalign" ng-class="{inuse: socialalignleft==true}" ng-click="socialalignmentfn(alignleftmodel)">' +
                        '			<div class="panel-align-box">' +
                        '				<div class="panel-align-box-sign">' +
                        '				</div>' +
                        '			</div>' +
                        '			<span ng-model="alignleftmodel" ng-value="alignleftmodel=socialalignleftvalue">left</span>' +
                        '		</div>' +
                        '		<div class="panel-align-center imgalign" ng-class="{inuse: socialaligncenter==true}" ng-click="socialalignmentfn(aligncentermodel)">' +
                        '			<div class="panel-align-box">' +
                        '				<div class="panel-align-box-sign">' +
                        '				</div>' +
                        '			</div>' +
                        '			<span ng-model="aligncentermodel" ng-value="aligncentermodel=socialaligncentervalue">center</span>' +
                        '		</div>' +
                        '		<div class="panel-align-right imgalign" ng-class="{inuse: socialalignright==true}" ng-click="socialalignmentfn(alignrightmodel)">' +
                        '			<div class="panel-align-box">' +
                        '				<div class="panel-align-box-sign">' +
                        '				</div>' +
                        '			</div>' +
                        '			<span ng-model="alignrightmodel" ng-value="alignrightmodel=socialalignrightvalue">right</span>' +
                        '		</div>' +
                        '		<div class="clearfix"></div>' +
                        '	</div>' +                    
                        '		</div>' +
                        '		</div>' +                                            
                        '</form>'
                    )($scope));
					/* Accordian */
                    $(".openmenu").show();
                    $('.accordian1').find('.submenu.openmenu').parent().find("p span").css("background-image", "url('images/minus.png')");
                    $('.accordian1 p').click(function() {
                        $('.accordian1 .submenu').slideUp();
						$('.accordian1 p').css("background", "#f9f9f9");
                        $('.accordian1 p span').css("background-image", "url('images/plus.png')");
                        if ($(this).parent().find('.submenu').is(':visible')) {
                            $(this).parent().find('.submenu').slideUp();
                            $(this).find('span').css("background-image", "url('images/plus.png')");		
							$(this).css("background", "#f9f9f9");
                        } else {
                            $(this).parent().find('.submenu').slideDown();
                            $(this).find("span").css("background-image", "url('images/minus.png')");
							$(this).css("background", "#ffffff");
                        }
                    });                                                                                            
                },

                showSettingForm: function(form, component, keditor) {
                    flog('showSettingForm "social" component', component);
                }
            };

        })(jQuery);
		/* social sharing settings End*/


        /**
         * KEditor Audio Component
         * @copyright: Kademi (http://kademi.co)
         * @author: Kademi (http://kademi.co)
         * @version: 1.1.3
         * @dependencies: $, $.fn.draggable, $.fn.droppable, $.fn.sortable, Bootstrap, FontAwesome (optional)
         */
		 
		 /* Audio settings start*/
		 
        (function($) {
            var KEditor = $.keditor;
            var flog = KEditor.log;

            KEditor.components['audio'] = {
                getContent: function(component, keditor) {
                    flog('getContent "audio" component, component');

                    var componentContent = component.children('.keditor-component-content');
                    var audio = componentContent.find('audio');
                    audio.unwrap();

                    return componentContent.html();
                },

                settingEnabled: true,

                settingTitle: 'Audio Settings',
				
				/* Audio settings component form start*/
								
                initSettingForm: function(form, keditor) {
                    flog('init "audio" settings', form);

                    form.append(
                        '<form class="form-horizontal">' +
                        '<div class="form-group">' +
                        '<label for="audioFileInput" class="col-sm-12">Audio file</label>' +
                        '<div class="col-sm-12">' +
                        '<div class="audio-toolbar">' +
                        '<a href="#" class="btn-audioFileInput btn btn-sm btn-primary"><i class="fa fa-upload"></i></a>' +
                        '<input id="audioFileInput" type="file" style="display: none">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="audio-autoplay" class="col-sm-12">Autoplay</label>' +
                        '<div class="col-sm-12">' +
                        '<input type="checkbox" id="audio-autoplay" />' +
                        '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="audio-showcontrols" class="col-sm-12">Show Controls</label>' +
                        '<div class="col-sm-12">' +
                        '<input type="checkbox" id="audio-showcontrols" checked />' +
                        '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="audio-width" class="col-sm-12">Width (%)</label>' +
                        '<div class="col-sm-12">' +
                        '<input type="number" id="audio-width" min="20" max="100" class="form-control" value="100" />' +
                        '</div>' +
                        '</div>' +
                        '</form>'
                    );
                },
				
				/* Audio settings component form end*/
				
                showSettingForm: function(form, component, keditor) {
                    flog('showSettingForm "audio" component', form, component);

                    var options = keditor.options;

                    var audio = component.find('audio');
                    var fileInput = form.find('#audioFileInput');
                    var btnAudioFileInput = form.find('.btn-audioFileInput');
                    btnAudioFileInput.off('click').on('click', function(e) {
                        e.preventDefault();

                        fileInput.trigger('click');
                    });
                    fileInput.off('change').on('change', function() {
                        var file = this.files[0];
                        if (/audio/.test(file.type)) {
                            // Todo: Upload to your server :)

                            audio.attr('src', URL.createObjectURL(file));

                            audio.load(function() {
                                keditor.showSettingPanel(component, options);
                            });
                        } else {
                            alert('Your selected file is not an audio file!');
                        }
                    });

                    var autoplayToggle = form.find('#audio-autoplay');
                    autoplayToggle.off('click').on('click', function(e) {
                        if (this.checked) {
                            audio.attr('autoplay', 'autoplay');
                        } else {
                            audio.removeAttr('autoplay');
                        }
                    });

                    var showcontrolsToggle = form.find('#audio-showcontrols');
                    showcontrolsToggle.off('click').on('click', function(e) {
                        if (this.checked) {
                            audio.attr('controls', 'controls');
                        } else {
                            audio.removeAttr('controls');
                        }
                    });

                    var audioWidth = form.find('#audio-width');
                    audioWidth.off('change').on('change', function() {
                        audio.css('width', this.value + '%');
                    });
                }
            };
        })(jQuery);

		/* Audio settings end*/
		
        /**
         * KEditor Google Map Component
         * @copyright: Kademi (http://kademi.co)
         * @author: Kademi (http://kademi.co)
         * @version: 1.1.3
         * @dependencies: $, $.fn.draggable, $.fn.droppable, $.fn.sortable, Bootstrap, FontAwesome (optional)
         */
        (function($) {
            var KEditor = $.keditor;
            var flog = KEditor.log;

            KEditor.components['googlemap'] = {
                getContent: function(component, keditor) {
                    flog('getContent "googlemap" component', component);

                    var componentContent = component.children('.keditor-component-content');
                    componentContent.find('.googlemap-cover').remove();

                    return componentContent.html();
                },

                settingEnabled: true,

                settingTitle: 'Google Map Settings',

                initSettingForm: function(form, keditor) {
                    flog('initSettingForm "googlemap" component');

                    form.append(
                        '<form class="form-horizontal">' +
                        '   <div class="form-group">' +
                        '       <div class="col-sm-12">' +
                        '           <button type="button" class="btn btn-block btn-primary btn-googlemap-edit">Update Map</button>' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label class="col-sm-12">Aspect Ratio</label>' +
                        '       <div class="col-sm-12">' +
                        '           <button type="button" class="btn btn-sm btn-default btn-googlemap-169">16:9</button>' +
                        '           <button type="button" class="btn btn-sm btn-default btn-googlemap-43">4:3</button>' +
                        '       </div>' +
                        '   </div>' +
                        '</form>'
                    );

                    var btnEdit = form.find('.btn-googlemap-edit');
                    btnEdit.on('click', function(e) {
                        e.preventDefault();

                        var inputData = prompt('Please enter Google Map embed code in here:');
                        var iframe = $(inputData);
                        var src = iframe.attr('src');
                        if (iframe.length > 0 && src && src.length > 0) {
                            keditor.getSettingComponent().find('.embed-responsive-item').attr('src', src);
                        } else {
                            alert('Your Google Map embed code is invalid!');
                        }
                    });

                    var btn169 = form.find('.btn-googlemap-169');
                    btn169.on('click', function(e) {
                        e.preventDefault();

                        keditor.getSettingComponent().find('.embed-responsive').removeClass('embed-responsive-4by3').addClass('embed-responsive-16by9');
                    });

                    var btn43 = form.find('.btn-googlemap-43');
                    btn43.on('click', function(e) {
                        e.preventDefault();

                        keditor.getSettingComponent().find('.embed-responsive').removeClass('embed-responsive-16by9').addClass('embed-responsive-4by3');
                    });
                }
            };

        })(jQuery);

        /**
         * KEditor Photo Component
         * @copyright: Kademi (http://kademi.co)
         * @author: Kademi (http://kademi.co)
         * @version: 1.1.3
         * @dependencies: $, $.fn.draggable, $.fn.droppable, $.fn.sortable, Bootstrap, FontAwesome (optional)
         */
		 
		 /* Image settings start*/
		 
        (function($) {
            var KEditor = $.keditor;
            var flog = KEditor.log;

            KEditor.components['photo'] = {
                init: function(contentArea, container, component, keditor) {
                    flog('init "photo" component', component);

                    var componentContent = component.children('.keditor-component-content');
                    var img = componentContent.find('img');
                    img.css('display', 'inline-block');
                },

                settingEnabled: true,

                settingTitle: 'Photo Settings',
				
				/* Image settings component form start*/
				
                initSettingForm: function(form, keditor) {
                    flog('initSettingForm "photo" component');

                    var self = this;
                    var options = keditor.options;

                    form.append($compile(
                        '<form class="form-horizontal" style="margin:0px !important;padding:0px !important; ">' +                       
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title ">How to use<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu openmenu howtouse">' +
                        '		  <p>If you double click on the Image element, the Image gallery will pop up, and you will be able to insert your image.</p>' +
                        '         <p>In the right menu you can add link (URL) and alt text to your image and also change its alignment (left, center, right) and size.</p>' +
                        '         <p>If the original width of your image is bigger than 240px, but you resized it to a smaller size in the desktop version, you are able to make it full width on mobile with the Fluid on mobile switch.</p>' +
                        '         <p>Note: Use 600px wide pictures for best reader experience on mobile.</p>' +
                        '		</div>' +
                        '   </div>' +
						'   <div class="form-group" style="padding:0px !important;">' +
                        '       <div class="col-sm-12">' +
                        '           <button type="button" id="photo-edit">Change Picture</button>' +
                        '           <input type="file" style="display: none" />' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title">Image Setting<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   <div class="form-group">' +
                        '       <label for="photo-crpimg" class="col-sm-12">Cropper Image</label>' +
                        '       <div class="col-sm-12">' +
                        '           <img id="photo-crpimg" class="form-control" />' +						
                        '       </div>' +
						'		<button type="button" class="btn btn-primary" id="photo-rsize">Image Cropping</button>' +
                        '   </div>' +
                        '	<div class="form-group">' +
                        '      		 <label for="photo-backgroundimagewidth" class="col-sm-12">Image Resizing</label>' +
                        '       	<div class="col-sm-12">' +
                        '				<div class="target">' +
                        '					<img id="photo-image" />' +
                        '				</div>' +
                        '			<div id="slider"></div>' +
                        '    </div>' +
                        '   	</div>' +
                        '   <div class="form-group">' +
                        '       <label for="photo-alt" class="col-sm-12 twocolumnoption">Alt</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '           <input type="text" id="photo-alt" class="form-control" />' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label for="photo-link" class="col-sm-12 twocolumnoption">Link</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '           <input type="text" id="photo-link" class="form-control" />' +
                        '       </div>' +
                        '   </div>' +
                        '		</div>' +
                        '  </div>' +
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title">Align<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   <div class="panel-align">' +
                        '	   <div class="panel-align-left imgalign" ng-class="{inuse: alignleft==true}" ng-click="alignmentfn(alignleftmodel)">' +
                        '			<div class="panel-align-box">' +
                        '				<div class="panel-align-box-sign">' +
                        '				</div>' +
                        '			</div>' +
                        '			<span ng-model="alignleftmodel" ng-value="alignleftmodel=alignleftvalue">left</span>' +
                        '		</div>' +
                        '		<div class="panel-align-center imgalign" ng-class="{inuse: aligncenter==true}" ng-click="alignmentfn(aligncentermodel)">' +
                        '			<div class="panel-align-box">' +
                        '				<div class="panel-align-box-sign">' +
                        '				</div>' +
                        '			</div>' +
                        '			<span ng-model="aligncentermodel" ng-value="aligncentermodel=aligncentervalue">center</span>' +
                        '		</div>' +
                        '		<div class="panel-align-right imgalign" ng-class="{inuse: alignright==true}" ng-click="alignmentfn(alignrightmodel)">' +
                        '			<div class="panel-align-box">' +
                        '				<div class="panel-align-box-sign">' +
                        '				</div>' +
                        '			</div>' +
                        '			<span ng-model="alignrightmodel" ng-value="alignrightmodel=alignrightvalue">right</span>' +
                        '		</div>' +
                        '		<div class="clearfix"></div>' +
                        '	</div>' +
                        '   <div class="form-group">' +
                        '       <label for="photo-hspace" class="col-sm-12 twocolumnoption">Hspace</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '           <input type="text" id="photo-hspace" class="form-control twocolumnoption" />' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label for="photo-vspace" class="col-sm-12 twocolumnoption">Vspace</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '           <input type="text" id="photo-vspace" class="form-control" />' +
                        '       </div>' +
                        '   </div>' +
                        '		</div>' +
                        '		</div>' +
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title">Style<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   		<div class="form-group">' +
                        '      		 <label for="photo-style" class="col-sm-12 twocolumnoption">Style</label>' +
                        '      		 <div class="col-sm-12 twocolumnoption">' +
                        '          		 <select id="photo-style" class="form-control">' +
                        '             		  <option value="">None</option>' +
                        '              		 <option value="img-rounded">Rounded</option>' +
                        '              		 <option value="img-circle">Circle</option>' +
                        '              		 <option value="img-thumbnail">Thumbnail</option>' +
                        '          		 </select>' +
                        '      		 </div>' +
                        '  		 	</div>' +
                        '		</div>' +
                        '	</div>' +
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title">Size<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   		<div class="form-group">' +
                        '     			<label for="photo-width" class="col-sm-12 twocolumnoption">Width(in %)</label>' +
                        '           	<div class="col-sm-12 twocolumnoption">' +
                        '         		  <input type="number" id="photo-width" class="form-control" />' +
                        '       		</div>' +
                        '   		</div>' +                           		
                        ' 		</div>' +
                        ' 	</div>' +
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title">Set Image as Responsive<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '  			 <div class="form-group">' +
                        '      			 <div class="col-sm-12 checkboxoption">' +
                        '        		   <input type="checkbox" id="photo-responsive" />' +
                        '     		 	 </div>' +
                        '      		 <label for="photo-responsive" class="col-sm-12 twocolumnoption">Responsive</label>' +
                        '  		 	 </div>' +
                        '		</div>' +
                        '   </div>' +
                        '   </div>' +
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title">Set Image as Background<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   <div class="form-group setimgbg">' +
                        '       <div class="col-sm-12 checkboxoption">' +
                        '           <input type="checkbox" id="photo-background" />' +
                        '       </div>' +
                        '       <label for="photo-background twocolumnoption" class="col-sm-12 twocolumnoption">Set image as background</label>' +
                        '   </div>' +
                        '   <div class="form-group backgroundimagewidth">' +
                        '       <label for="photo-backgroundimagewidth" class="col-sm-12">Background Image width(px)</label>' +
                        '       <div class="col-sm-12">' +
                        '           <input type="number" id="photo-backgroundimagewidth" class="form-control" />' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="form-group backgroundimageheight">' +
                        '       <label for="photo-backgroundimageheight" class="col-sm-12">Background Image height(px)</label>' +
                        '       <div class="col-sm-12">' +
                        '           <input type="number" id="photo-backgroundimageheight" class="form-control" />' +
                        '       </div>' +
                        '   </div>' +
                        ' 		</div>' +
                        ' 		</div>' +
                        '   <div class="accordian1">' +
                        '	<p class="accordion-title">Border<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   <div class="form-group" style="margin:0px !important; padding:0px !important;">' +
                        '       <div class="col-sm-12 sizeproperty sizeborder">' +
                        '       	    <input type="checkbox" id="photo-topm" class="form-control"/>' +
                        '       	    <input type="checkbox" id="photo-leftm" class="form-control"/>' +
                        '       	    <input type="checkbox" id="photo-rightm" class="form-control"/>' +
                        '       	    <input type="checkbox" id="photo-bottomm" class="form-control"/>' +
                        '				<div class="sizepropertyname sizeborder">' +
						'					<input type="checkbox" id="photo-checkm" class="form-control">' +
						'					<label for="photo-checkm"></label>' +
						'				</div>' +
						'       </div>' +
						'	<div class="bordersection">'+
						'   		<div class="form-group">' +
                        '      		 <label for="style1" class="col-sm-12 twocolumnoption">Border type</label>' +
                        '      		 <div class="col-sm-12 twocolumnoption">' +
                        '          		 <select id="style1" class="form-control">' +
                        '             		<option value="">None</option>' +
                        '              		<option value="solid">solid</option>' +
                        '              		<option value="dashed">dashed</option>' +
                        '              		<option value="dotted">dotted</option>' +
						'             	 	<option value="double">double</option>' +
						'             	 	<option value="groove">groove</option>' +
						'              		<option value="ridge">ridge</option>' +
                        '          		 </select>' +
                        '      		 </div>' +
                        '  		 	</div>' + 
						'   		<div class="form-group">' +
                        '      			 <label for="width1" class="col-sm-12 twocolumnoption">Border width</label>' +
                        '       		 <div class="col-sm-12 twocolumnoption">' +
                        '         			  <input type="number" id="width1" value="1" style="width: 100px;">' +
                        '      			 </div>' +
                        '  			 </div>' +  
						'			 <div class="form-group">' +
                        '      			 <label for="color1" class="col-sm-12 twocolumnoption">Border color</label>' +
                        '       		 <div class="col-sm-12 twocolumnoption">' +
                        '         			  <input type="color" id="color1" style="width: 100px; background:none; border:0ps solid transparent">' +
                        '      			 </div>' +
                        '  			 </div>' +                        
                        '       </div>' +
                        '   </div>' +
                        '   </div>' +
                        ' 		</div>' +
                        '</form>'
                    )($scope));

					/* Image settings component form End*/
					
                    var photoEdit = form.find('#photo-edit');
                    var fileInput = photoEdit.next();
                    photoEdit.on('click', function() {
                        $('#changephoto,#mask').show();
                        $('.photo-panel img').removeClass();
                        keditor.getSettingComponent().find('img').addClass('activeeditorimg');
                    });
                    $('#uploadfiles').on('click', function(e) {
                        e.preventDefault();
                        fileInput.trigger('click');
                    });
                    /* $('.keditor-container').on('click',function(e){
                    	var btn = $(this);
                    	var container = btn.closest('.keditor-container');
                    	keditor.showSettingPanel($("#keditor-setting-photo"));
                    }); */
                    var base64Data = [];
                    fileInput.on('change', function() {
                        var file = this.files[0];
                        var reader = new FileReader();

                        reader.readAsDataURL(file);
                        reader.onload = function() {
                            base64Data = reader;
                            imgs.push(base64Data.result);
                            console.log(reader);
                            if (/image/.test(file.type)) {
                                var img = keditor.getSettingComponent().find('img');
                                img.attr('src', base64Data.result);
                                img.css({
                                    width: '',
                                    height: ''
                                });
                                img.load(function() {
                                    /*  keditor.showSettingPanel(keditor.getSettingComponent(), options); */
                                });
                            } else {
                                alert('Your selected file is not photo!');
                            }
                        };
                        reader.onerror = function(error) {
                            console.log('Error: ', error);
                        };
                    });
                    /* var panelimg = keditor.getSettingComponent().find('.photo-panel-background img');
                    panelimg.css('display', 'inline-block');	 */
                    /* Image Lignment start */
                    $(".imgalign").click(function() {
                        var panel = keditor.getSettingComponent().find('.photo-panel-background');
                        var alignmentvalue = $(this).find('span').html();
                        panel.css('text-align', alignmentvalue);
                    });
                    /* Image Lignment End */
                    var inputResponsive = form.find('#photo-responsive');
                    inputResponsive.on('click', function() {
                        keditor.getSettingComponent().find('img')[this.checked ? 'addClass' : 'removeClass']('img-responsive');
                    });
                    $(".openmenu").show();
                    $('.accordian1').find('.submenu.openmenu').parent().find("p span").css("background-image", "url('images/minus.png')");
                    $('.accordian1 p').click(function() {
                        $('.accordian1 .submenu').slideUp();
						$('.accordian1 p').css("background", "#f9f9f9");
                        $('.accordian1 p span').css("background-image", "url('images/plus.png')");
                        if ($(this).parent().find('.submenu').is(':visible')) {
                            $(this).parent().find('.submenu').slideUp();
                            $(this).find('span').css("background-image", "url('images/plus.png')");		
							$(this).css("background", "#f9f9f9");
                        } else {
                            $(this).parent().find('.submenu').slideDown();
                            $(this).find("span").css("background-image", "url('images/minus.png')");
							$(this).css("background", "#ffffff");
                        }
                    });
                    var inputResponsive = form.find('#photo-background');
                    inputResponsive.on('click', function() {
                        keditor.getSettingComponent().find('img').parent()[this.checked ? 'addClass' : 'removeClass']('img-background');
                        keditor.getSettingComponent().find('img').parent().parent().find('.overlaytext')[this.checked ? 'addClass' : 'removeClass']('active');
                        keditor.getSettingComponent().find('img')[this.checked ? 'addClass' : 'removeClass']('active');
                        $('#keditor-setting-photo.active').find('#photo-backgroundimagewidth').parent().parent()[this.checked ? 'addClass' : 'removeClass']('activebackgroundwidthheight');
                        $('#keditor-setting-photo.active').find('#photo-backgroundimageheight').parent().parent()[this.checked ? 'addClass' : 'removeClass']('activebackgroundwidthheight');
                        var selectedimgheight = keditor.getSettingComponent().find('img').naturalHeight;
                        var selectedimgwidth = keditor.getSettingComponent().find('img').naturalWidth;
                        var photopanelbackgroundsrc = keditor.getSettingComponent().find('img').parent();
                        if ($(this).is(':checked')) {
                            photopanelbackgroundsrc.css('background', function() {
                                return 'url(' + $(this).find('img').attr('src') + ') no-repeat'
                            });
                            photopanelbackgroundsrc.css({
                                'height': selectedimgheight + 'px',
                                'width': selectedimgwidth + 'px'
                            });
                        } else {
                            photopanelbackgroundsrc.css({
                                'background': 'none',
                                'height': 'auto',
                                'width': '100%'
                            });
                        }
                    });
                    var inputbackgroundimagewidth = form.find('#photo-backgroundimagewidth');
                    inputbackgroundimagewidth.on('change', function() {
                        var photopanelbackgroundwidth = $(".photo-panel .img-background");
                        var backgroundimagewidth = this.value;
                        photopanelbackgroundwidth.css('width', backgroundimagewidth + 'px');
                    });
                    var inputbackgroundimagewidth = form.find('#photo-backgroundimageheight');
                    inputbackgroundimagewidth.on('change', function() {
                        var photopanelbackgroundwidth = $(".photo-panel .img-background");
                        var backgroundimagewidth = this.value;
                        photopanelbackgroundwidth.css('height', backgroundimagewidth + 'px');
                    });
                    var cbbStyle = form.find('#photo-style');
                    cbbStyle.on('change', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var val = this.value;

                        img.removeClass('img-rounded img-circle img-thumbnail');
                        if (val) {
                            img.addClass(val);
                        }
                    });
                    var inputWidth = form.find('#photo-width');
                    var inputHeight = form.find('#photo-height');
                    inputWidth.on('keyup', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newWidth = +this.value;
                        var newHeight = Math.round(newWidth / self.ratio);
                        if (newWidth <= 0) {
                            newWidth = self.width;
                            newHeight = self.height;
                            /* this.value = newWidth; */
                        }
						if (newWidth <= 100) {
							img.css({
								'width': newWidth + '%',
							});
						}                  
/*                         inputHeight.val(newHeight);
 */                    });
                  /*   inputHeight.on('change', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newHeight = +this.value;
                        var newWidth = Math.round(newHeight * self.ratio);

                        if (newHeight <= 0) {
                            newWidth = self.width;
                            newHeight = self.height;
                            this.value = newHeight;
                        }

                        img.css({
                            'height': newHeight,
                            'width': newWidth
                        });
                        inputWidth.val(newWidth);
                    }); */

                    var inputalt = form.find('#photo-alt');
                    inputalt.on('change', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newalt = this.value;

                        if (newalt == "") {
                            newalt = self.attr("alt");
                            this.value = newalt;
                        }

                        img.attr({
                            'alt': newalt,
                        });
                        inputalt.val(newalt);
                    });

                    var inputcrpimg = form.find('#photo-crpimg');
                    var inputlink = form.find('#photo-link');
                    inputlink.on('change', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newlink = this.value;

                        if (newlink == "") {
                            newlink = this.value;
                            this.value = newlink;
                        }

                        img.attr({
                            'src': newlink,
                        });
                        inputcrpimg.attr({
                            'src': newlink,
                        });

                        $('#photo-crpimg').croppie({
                            url: inpcrpimg,
                            enableZoom: true,
                            showZoomer: true,
                            mouseWheelZoom: true,
                            viewport: {
                                width: 80,
                                height: 80
                            },
                            boundary: {
                                width: 290,
                                height: 140
                            }
                        });

                        inputlink.val(newlink);

                    });
                    var inputhspace = form.find('#photo-hspace');
                    inputhspace.on('keyup', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newhspace = this.value;

                        if (newhspace == "") {
                            newhspace = this.value;
                            this.value = newhspace;
                        }

                        img.attr({
                            'hspace': newhspace,
                        });
                        inputhspace.val(newhspace);

                    });

                    var inputvspace = form.find('#photo-vspace');
                    inputvspace.on('keyup', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newvspace = this.value;

                        if (newvspace == "") {
                            newvspace = this.value;
                            this.value = newvspace;
                        }

                        img.attr({
                            'vspace': newvspace,
                        });

                        inputvspace.val(newvspace);

                    });
					/* Image border start */
                    var inputmnborder = form.find('#photo-checkm');
                    inputmnborder.on('click', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newmnborder = this.checked;
                        $("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").prop('disabled', true);
                        if (this.checked == true) {
							$('.sizeproperty input').css("background","#ffffff");
							$('.sizeproperty.sizeborder').css("background","#99c600 url('images/crossline.png')repeat");
                            $("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm,#photo-checkm").addClass('active');
                            if ($("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm,#photo-checkm").hasClass('active')) {
                                $("#styling").show();
                            }

                        } else {
							$('.sizeproperty input').css("background","#cccccc");
							$('.sizeproperty.sizeborder').css("background","#ccc url('images/crossline.png')repeat");
                            $("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm,#photo-checkm").removeClass('active');
                            $("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").prop('disabled', false);
                            $("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").prop('checked', false);
                            $("#styling").hide();
                        }
                        /* if(this.id == "photo-checkm" && this.checked == true){
                        	img.css('border', '2px solid red');
                        	$("#photo-checkm").css('outline-style','solid');
                        	$("#photo-checkm").css('outline-color','red');
                        	$("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").attr("disabled", true);}
                        else if(this.id == "photo-checkm" && this.checked == false)
                        {
                        	img.css('border', 'none');
                        	$("#photo-checkm").css('outline-style','none');
                        	$("#photo-checkm").css('outline-color','none');
                        	$("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").attr("disabled", false);
                        	$("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").prop("checked", false);
                        } */
                    });

                    var inputtopborder = form.find('#photo-topm');
                    inputtopborder.on('click', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newtopborder = this.checked;
						$('.sizeproperty input').css("background","#ffffff");
						$('.sizeproperty.sizeborder').css("background","#99c600 url('images/crossline.png')repeat");
                        $("#photo-leftm,#photo-rightm,#photo-bottomm").prop('disabled', true);
                        if (this.checked == true) {
                            $("#photo-topm").addClass('active');
                            if ($("#photo-topm").hasClass('active')) {
                                $("#styling").show();
                            }

                        } else if ((this.checked == false) && ($("#photo-leftm").is(':checked') == false) && ($("#photo-rightm").is(':checked') == false) && ($("#photo-bottomm").is(':checked') == false)) {
                            $("#photo-topm").removeClass('active');
                            $("#styling").hide();
                            $("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").prop('disabled', false);
                        } else if (this.checked == false) {
                            $("#photo-topm").removeClass('active');
                        }

                    });

                    var inputleftborder = form.find('#photo-leftm');
                    inputleftborder.on('click', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newleftborder = this.checked;
						$('.sizeproperty input').css("background","#ffffff");
						$('.sizeproperty.sizeborder').css("background","#99c600 url('images/crossline.png')repeat");
                        $("#photo-topm,#photo-rightm,#photo-bottomm").prop('disabled', true);
                        if (this.checked == true) {
                            $("#photo-leftm").addClass('active');
                            if ($("#photo-leftm").hasClass('active')) {
                                $("#styling").show();
                            }

                        } else if ((this.checked == false) && ($("#photo-topm").is(':checked') == false) && ($("#photo-rightm").is(':checked') == false) && ($("#photo-bottomm").is(':checked') == false)) {
                            $("#photo-leftm").removeClass('active');
                            $("#styling").hide();
                            $("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").prop('disabled', false);
                        } else if (this.checked == false) {
                            $("#photo-leftm").removeClass('active');
                        }

                    });

                    var inputrightborder = form.find('#photo-rightm');
                    inputrightborder.on('click', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newrightborder = this.checked;
						$('.sizeproperty input').css("background","#ffffff");
						$('.sizeproperty.sizeborder').css("background","#99c600 url('images/crossline.png')repeat");
                        $("#photo-topm,#photo-leftm,#photo-bottomm").prop('disabled', true);
                        if (this.checked == true) {
                            $("#photo-rightm").addClass('active');
                            if ($("#photo-rightm").hasClass('active')) {
                                $("#styling").show();
                            }

                        } else if ((this.checked == false) && ($("#photo-topm").is(':checked') == false) && ($("#photo-leftm").is(':checked') == false) && ($("#photo-bottomm").is(':checked') == false)) {
                            $("#photo-rightm").removeClass('active');
                            $("#styling").hide();
                            $("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").prop('disabled', false);
                        } else if (this.checked == false) {
                            $("#photo-rightm").removeClass('active');
                        }

                    });

                    var inputbottomborder = form.find('#photo-bottomm');
                    inputbottomborder.on('click', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var newleftborder = this.checked;
						$('.sizeproperty input').css("background","#ffffff");
						$('.sizeproperty.sizeborder').css("background","#99c600 url('images/crossline.png')repeat");
                        $("#photo-topm,#photo-leftm,#photo-rightm").prop('disabled', true);
                        if (this.checked == true) {
                            $("#photo-bottomm").addClass('active');
                            if ($("#photo-bottomm").hasClass('active')) {
                                $("#styling").show();
                            }

                        } else if ((this.checked == false) && ($("#photo-topm").is(':checked') == false) && ($("#photo-rightm").is(':checked') == false) && ($("#photo-leftm").is(':checked') == false)) {
                            $("#photo-bottomm").removeClass('active');
                            $("#styling").hide();
                            $("#photo-topm,#photo-leftm,#photo-rightm,#photo-bottomm").prop('disabled', false);
                        } else if (this.checked == false) {
                            $("#photo-bottomm").removeClass('active');
                        }

                    });
                    $("#style1").on('change', function() {
                        var img = keditor.getSettingComponent().find('img');
						var stylevl = $("#style1").val();
                        var widthl = $("#width1").val();
                        var colorl = $("#color1").val();
                            
                        if ($("#photo-checkm").is(':checked') == true) {
                            img.css('border-style', stylevl);
                            img.css('border-width', widthl + "px");
                            img.css('border-color', colorl);
                        } else if ($("#photo-topm").is(':checked') == true) {
                            img.css('border-top-style', stylevl);
                            img.css('borderTopWidth', widthl + "px");
                            img.css('border-top-color', colorl);
                        } else if ($("#photo-leftm").is(':checked') == true) {
                            img.css('border-left-style', stylevl);
                            img.css('borderLeftWidth', widthl + "px");
                            img.css('border-left-color', colorl);
                        } else if ($("#photo-rightm").is(':checked') == true) {
                            img.css('border-right-style', stylevl);
                            img.css('borderRightWidth', widthl + "px");
                            img.css('border-right-color', colorl);
                        } else if ($("#photo-bottomm").is(':checked') == true) {
                            img.css('border-bottom-style', stylevl);
                            img.css('borderBottomWidth', widthl + "px");
                            img.css('border-bottom-color', colorl);
                        }
                    });

                    $("#width1").on('change', function() {
                        var img = keditor.getSettingComponent().find('img');
                        var stylevl = $("#style1").val();
                        var widthl = $("#width1").val();
                        var colorl = $("#color1").val();
                            
						if ($("#photo-checkm").is(':checked') == true) {
                            img.css('border-style', stylevl);
                            img.css('border-width', widthl + "px");
                            img.css('border-color', colorl);
                        } else if ($("#photo-topm").is(':checked') == true) {
                            img.css('border-top-style', stylevl);
                            img.css('borderTopWidth', widthl + "px");
                            img.css('border-top-color', colorl);
                        } else if ($("#photo-leftm").is(':checked') == true) {
                            img.css('border-left-style', stylevl);
                            img.css('borderLeftWidth', widthl + "px");
                            img.css('border-left-color', colorl);
                        } else if ($("#photo-rightm").is(':checked') == true) {
                            img.css('border-right-style', stylevl);
                            img.css('borderRightWidth', widthl + "px");
                            img.css('border-right-color', colorl);
                        } else if ($("#photo-bottomm").is(':checked') == true) {
                            img.css('border-bottom-style', stylevl);
                            img.css('borderBottomWidth', widthl + "px");
                            img.css('border-bottom-color', colorl);
                        }
                    });

                    $("#color1").on('change', function() {
                        var img = keditor.getSettingComponent().find('img');
						var stylevl = $("#style1").val();
                        var widthl = $("#width1").val();
                        var colorl = $("#color1").val();
                        if ($("#photo-checkm").is(':checked') == true) {
                            img.css('border-style', stylevl);
                            img.css('border-width', widthl + "px");
                            img.css('border-color', colorl);
                        } else if ($("#photo-topm").is(':checked') == true) {
                            img.css('border-top-style', stylevl);
                            img.css('borderTopWidth', widthl + "px");
                            img.css('border-top-color', colorl);
                        } else if ($("#photo-leftm").is(':checked') == true) {
                            img.css('border-left-style', stylevl);
                            img.css('borderLeftWidth', widthl + "px");
                            img.css('border-left-color', colorl);
                        } else if ($("#photo-rightm").is(':checked') == true) {
                            img.css('border-right-style', stylevl);
                            img.css('borderRightWidth', widthl + "px");
                            img.css('border-right-color', colorl);
                        } else if ($("#photo-bottomm").is(':checked') == true) {
                            img.css('border-bottom-style', stylevl);
                            img.css('borderBottomWidth', widthl + "px");
                            img.css('border-bottom-color', colorl);
                        }
                    });

					/* Image border End */
                },

                showSettingForm: function(form, component, keditor) {
                    flog('showSettingForm "photo" component', component);

                    var self = this;
                    var inputAlign = form.find('#photo-align');
                    var inputResponsive = form.find('#photo-responsive');
                   /*  var inputWidth = form.find('#photo-width'); */
                    var inputHeight = form.find('#photo-height');
                    var cbbStyle = form.find('#photo-style');
                    var inputalt = form.find('#photo-alt');
                    var inputlink = form.find('#photo-link');
                    /* var inputhspace = form.find('#photo-hspace'); */
                    var inputvspace = form.find('#photo-vspace');

                    var panel = component.find('.photo-panel');
                    var img = panel.find('img');

                    var algin = panel.css('text-align');
                    if (algin !== 'right' || algin !== 'center') {
                        algin = 'left';
                    }
                    if (img.hasClass('img-rounded')) {
                        cbbStyle.val('img-rounded');
                    } else if (img.hasClass('img-circle')) {
                        cbbStyle.val('img-circle');
                    } else if (img.hasClass('img-thumbnail')) {
                        cbbStyle.val('img-thumbnail');
                    } else {
                        cbbStyle.val('');
                    }

                    var inpalt = img.attr("alt");
                    var inplink = img.attr("src");
                    var inphspace = img.attr("hspace");
                    var inpvspace = img.attr("vspace");
                    var inpcrpimg = img.attr("src");
                    inputAlign.val(algin);
                    inputResponsive.prop('checked', img.hasClass('img-responsive'));
                   /*  inputWidth.val(img.width()); */
                    inputHeight.val(img.height());
                    inputalt.val(inpalt);
                    inputlink.val(inplink);
                   /*  inputhspace.val(inphspace); */
                    inputvspace.val(inpvspace);
                    $(".openmenu").show();
					
					/* Image cropping Start */
					
                    $('#photo-crpimg').croppie('destroy');
                    $('#photo-crpimg').croppie({
                        destroy: true,
                        url: inpcrpimg,
                        enableZoom: true,
                        showZoomer: true,
                        mouseWheelZoom: true,
                        viewport: {
                            width: 80,
                            height: 80
                        },
                        boundary: {
                            width: 100 + '%',
                            height: 140
                        }
                    });
					
					/* Image cropping End */
					
                    var photopoints = $('#photo-crpimg');
                    $('#photo-rsize').on('click', function(ev) {
                        $('#photo-crpimg').croppie('get');
                        photopoints.croppie('result', {
                            type: 'canvas',
                            size: 'original'
                        }).then(function(resp) {
                            img.attr("src", resp);
                        });
                    });
                    $('<img />').attr('src', img.attr('src')).load(function() {
                        self.ratio = this.width / this.height;
                        self.width = this.width;
                        self.height = this.height;
                    });
                    /* Image scaling start */
                    var orginalWidth = keditor.getSettingComponent().find('img').width();
                    $("#infoSlider").text(orginalWidth + ', 100%');
                    $("#photo-image").attr('src', inpcrpimg);
                    $("#slider").slider({
                        value: 10,
                        min: -90,
                        max: 0,
                        step: 1,
                        slide: function(event, ui) {
                            var fraction = (1 + ui.value / 100),
                                imagescalenewWidth = Math.floor(fraction * 100) + '%';
                            newWidth = orginalWidth * fraction;
                            $("#infoSlider").text(newWidth + ', ' + Math.floor(fraction * 100) + '%');
                            keditor.getSettingComponent().find('img').width(newWidth);
                            $("#photo-image").width(imagescalenewWidth);
                        }
                    });
                    /* Image scaling End*/
                }
            };

        })(jQuery);

		/* Image settings component form End*/
		
        /**
         * KEditor Text Component
         * @copyright: Kademi (http://kademi.co)
         * @author: Kademi (http://kademi.co)
         * @version: 1.1.3
         * @dependencies: $, $.fn.draggable, $.fn.droppable, $.fn.sortable, Bootstrap, FontAwesome (optional)
         */
        (function($) {
            var KEditor = $.keditor;
            var flog = KEditor.log;

            CKEDITOR.disableAutoInline = true;

            // Text component
            // ---------------------------------------------------------------------
            KEditor.components['text'] = {
                options: {
                    toolbarGroups: [{
                            name: 'document',
                            groups: ['mode', 'document', 'doctools']
                        },
                        {
                            name: 'editing',
                            groups: ['find', 'selection', 'spellchecker', 'editing']
                        },
                        {
                            name: 'forms',
                            groups: ['forms']
                        },
                        {
                            name: 'basicstyles',
                            groups: ['basicstyles', 'cleanup']
                        },
                        {
                            name: 'paragraph',
                            groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
                        },
                        {
                            name: 'links',
                            groups: ['links']
                        },
                        {
                            name: 'insert',
                            groups: ['insert']
                        },
                        '/',
                        {
                            name: 'clipboard',
                            groups: ['clipboard', 'undo']
                        },
                        {
                            name: 'styles',
                            groups: ['styles']
                        },
                        {
                            name: 'colors',
                            groups: ['colors']
                        },
                        {
                            name: 'tools',
                            groups: ['tools']
                        },
                        {
                            name: 'others',
                            groups: ['others']
                        },
                    ],
                    title: false,
                    allowedContent: true, // DISABLES Advanced Content Filter. This is so templates with classes: allowed through
                    bodyId: 'editor',
                    templates_replaceContent: false,
                    enterMode: 'P',
                    forceEnterMode: true,
                    format_tags: 'p;h1;h2;h3;h4;h5;h6',
                    removePlugins: 'table,magicline,tabletools',
                    removeButtons: 'Save,NewPage,Preview,Print,Templates,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,HiddenField,ImageButton,Button,Select,Textarea,TextField,Radio,Checkbox,Outdent,Indent,Blockquote,CreateDiv,Language,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Styles,BGColor,Maximize,About,ShowBlocks,BidiLtr,BidiRtl,Flash,Image,Subscript,Superscript,Anchor',
                    minimumChangeMilliseconds: 100
                },

                init: function(contentArea, container, component, keditor) {

                    flog('init "text" component', component);

                    var self = this;
                    var options = keditor.options;

                    var componentContent = component.children('.keditor-component-content');
                    componentContent.prop('contenteditable', true);

                    componentContent.on('input', function(e) {
                        if (typeof options.onComponentChanged === 'function') {
                            options.onComponentChanged.call(contentArea, e, component);
                        }

                        if (typeof options.onContainerChanged === 'function') {
                            options.onContainerChanged.call(contentArea, e, container);
                        }

                        if (typeof options.onContentChanged === 'function') {
                            options.onContentChanged.call(contentArea, e);
                        }
                    });

                    var editor = componentContent.ckeditor(self.options).editor;
                    editor.on('instanceReady', function() {
                        flog('CKEditor is ready', component);

                        if (typeof options.onComponentReady === 'function') {
                            options.onComponentReady.call(contentArea, component, editor);
                        }
                    });
                },

                settingEnabled: true,

                settingTitle: 'Text Settings',

                initSettingForm: function(form, keditor) {
                    console.log(form);
                    console.log(keditor);
                    flog('initSettingForm "text" component');


                    var self = this;
                    var options = keditor.options;
                    console.log(self);
                    form.append(
                        '<form class="form-horizontal">' +
                        '   <div class="fontaccordian1">' +
                        '	<p class="accordion-title ">How to use<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu openmenu howtouse">' +
                        '		  <p>If you double click on the Image element, the Image gallery will pop up, and you will be able to insert your image.</p>' +
                        '         <p>In the right menu you can add link (URL) and alt text to your image and also change its alignment (left, center, right) and size.</p>' +
                        '         <p>If the original width of your image is bigger than 240px, but you resized it to a smaller size in the desktop version, you are able to make it full width on mobile with the Fluid on mobile switch.</p>' +
                        '         <p>Note: Use 600px wide pictures for best reader experience on mobile.</p>' +
                        '		</div>' +
                        '   </div>' +
                        '   <div class="fontaccordian1">' +
                        '	<p class="accordion-title">TYPOGRAPHY<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   <div class="form-group">' +
                        '       <label for="text-align" class="col-sm-12 twocolumnoption">Font Family</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '<select id="fontFamily" name="fontFamily" onchange="fontFamilySelect(this.value);" class="form-control">' +
                        '<option value="">Select Font</option>' +
                        '<option value="Arial">Arial</option>' +
                        '<option value="Comic Sans MS">Comic Sans MS</option>' +
                        '<option value="Courier New">Courier New</option>' +
                        '<option value="Georgia">Georgia</option>' +
                        '<option value="Lucida Sans Unicode">Lucida Sans Unicode</option>' +
                        '<option value="Times New Roman">Times New Roman</option>' +
                        '<option value="Trebuchet MS">Trebuchet MS</option>' +
                        '<option value="Verdana">Verdana</option>' +
                        '</select>' +

                        '       </div>' +
                        '   </div>' +

                        '   <div class="form-group">' +
                        '       <label for="text-align" class="col-sm-12 twocolumnoption">Font Size</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '	<input type="number" name="FontSize" id="fsize" onchange="changeFontSize(this.value);" class="form-control"/>' +
                        '   </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label for="Font-Style" class="col-sm-12 twocolumnoption">Font Style</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '           <select id="text-style" class="form-control" onchange="textStyleVal(this.value)">' +
                        '               <option value="">None</option>' +
                        '               <option value="bold">Bold</option>' +
                        '               <option value="italic">Italic</option>' +
                        '               <option value="bolditalic">Bold-Italic</option>' +
                        '               <option value="normal">Normal</option>' +
                        '           </select>' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label for="Line-Height" class="col-sm-12 twocolumnoption">Line Height</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '	<input type="number" name="lineHeight" id="lineHeight" onchange="changelineHeight(this.value);" class="form-control"/>' +
                        '   </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label for="Text-Color" class="col-sm-12 twocolumnoption">Text Color</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '	<input type="color" name="textColor" id="textColor" onchange="changetextColor(this.value);" class="form-control"/>' +
                        '   </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label for="Text-Spacing" class="col-sm-12 twocolumnoption">Text Spacing</label>' +
                        '       <div class="col-sm-12 twocolumnoption">' +
                        '	<input type="number" name="textSpacing" id="textSpacing" onchange="changetextSpacing(this.value);" class="form-control"/>' +
                        '   </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label for="Word-Spacing" class="col-sm-12 twocolumnoption">Word Spacing</label>' +
                        '   <div class="col-sm-12 twocolumnoption">' +
                        '	<input type="number" name="wordSpacing" id="wordSpacing" onchange="changewordSpacing(this.value);" class="form-control"/>' +
                        '   </div>' +
                        '   </div>' +
                        '   </div>' +
                        '   </div>' +
                        '   <div class="fontaccordian1">' +
                        '	<p class="accordion-title">Margin<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   <div class="form-group">       ' +
                        '	<div class="col-sm-12 sizeproperty sizemargin">' +    	    
						'		<input type="number" id="text-topm" class="form-control"  onchange="changeSpacingValue(this.id,this.value);">' +
						'		<input type="number" id="text-leftm" class="form-control"  onchange="changeSpacingValue(this.id,this.value);">' + 
						'		<input type="number" id="text-rightm" class="form-control"  onchange="changeSpacingValue(this.id,this.value);">' +
						'		<input type="number" id="text-bottomm" class="form-control"  onchange="changeSpacingValue(this.id,this.value);">' +
						'		<div class="sizepropertyname">' +
						'			<input type="checkbox" id="checkpara" class="form-control"  onchange="changeSpacingValue(this.id,this.value);">' +
						'			<label for="checkpara"></label>' +
						'		</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
						'</div>' +
                        '   <div class="fontaccordian1">' +
                        '	<p class="accordion-title">Padding<span class="add minus floatright"></span></p>' +
                        '		<div class="submenu">' +
                        '   <div class="form-group">       ' +
                        '	<div class="col-sm-12 sizeproperty sizepadding">' +
						'		<input type="number" id="padding-topm" class="form-control" onchange="changePaddingValue(this.id,this.value);">' +
						'		<input type="number" id="padding-leftm" class="form-control" onchange="changePaddingValue(this.id,this.value);">' +
						'		<input type="number" id="padding-rightm" class="form-control" onchange="changePaddingValue(this.id,this.value);">' +
						'		<input type="number" id="padding-bottomm" class="form-control" onchange="changePaddingValue(this.id,this.value);">' +
						'		<div class="sizepropertyname sizepadding">' +
						'			<input type="checkbox" id="checkparapadding" class="form-control" onchange="changePaddingValue(this.id,this.value);">' +
						'			<label for="checkparapadding"></label>' +
						'		</div>' +
						'	</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</form>'
                    );

                    var base64Data = [];
                    var thisVal, fs, ff, lh, lp, wp;
					window.getfontinfo =function(valu) {
                        thisVal = valu;
                        console.log(thisVal);
                        //alert($(valu).css("font-size"));
                        fs = $('.paratextprop').css("font-size");
                        ff = $('.paratextprop').css("font-family");
                        lh = $('.paratextprop').css("line-height");
                        lp = $('.paratextprop').css("letter-spacing");
                        wp = $('.paratextprop').css("word-spacing");
                        console.log(fs);
                        console.log(ff);
                        $('#fsize').val(parseInt(fs));
                        $('#lineHeight').val(parseInt(lh));
                        $('#textSpacing').val(parseInt(lp));
                        $('#wordSpacing').val(parseInt(wp));
                        $('#text-topm').val(parseInt($('.paratextprop').css('margin-top')));
                        $('#text-leftm').val(parseInt($('.paratextprop').css('margin-left')));
                        $('#text-rightm').val(parseInt($('.paratextprop').css('margin-right')));
                        $('#text-bottomm').val(parseInt($('.paratextprop').css('margin-bottom')));

                        $('#padding-topm').val(parseInt($('.paratextprop').css('padding-top')));
                        $('#padding-rightm').val(parseInt($('.paratextprop').css('padding-right')));
                        $('#padding-bottomm').val(parseInt($('.paratextprop').css('padding-bottom')));
                        $('#padding-leftm').val(parseInt($('.paratextprop').css('padding-left')));

                    }
					window.changeFontSize =function(val) {
                        $('.paratextprop').css("font-size", val + "px");
                    }
					var inputbackgroundimagewidth = form.find('#photo-backgroundimagewidth');
                    inputbackgroundimagewidth.on('change', function() {
                        var photopanelbackgroundwidth = $(".photo-panel .img-background");
                        var backgroundimagewidth = this.value;
                        photopanelbackgroundwidth.css('width', backgroundimagewidth + 'px');
                    });
					window.fontFamilySelect =function(valu) {
                        if (valu != "" && valu != null && valu != undefined) {
                            $('.paratextprop').css("font-family", valu);
                        }
                    }
					window.textStyleVal =function(valu) {
                        if (valu != "" && valu != null && valu != undefined) {
                            switch (valu) {
                                case "bold":
                                    $('.paratextprop').css("font-weight", "bold");
                                    break;
                                case "italic":
                                    $('.paratextprop').css("font-style", "italic");
                                    break;
                                case "bolditalic":
                                    $('.paratextprop').css({
                                        "font-style": "italic",
                                        "font-weight": "strong"
                                    });
                                    break;
                                case "normal":
                                    $('.paratextprop').css({
                                        "font-style": "normal",
                                        "font-weight": "normal"
                                    });
                                    break;
                            }
                        }
                    }
					window.changelineHeight =function(valu) {
                        $('.paratextprop').css("line-height", valu + "px");
                    }

                    window.changetextColor =function(valu) {
                        $('.paratextprop').css("color", valu);
                    }

                    window.changetextSpacing =function(valu) {
                        $('.paratextprop').css("letter-spacing", valu + "px");
                    }
					window.changewordSpacing =function(valu) {
                        $('.paratextprop').css("word-spacing", valu + "px");
                    }

					$('.sizeproperty').find('input').val("0");
                    window.changeSpacingValue =function(el, vl) {
                        if ($('#checkpara').is(":not(:checked)")) {
							$('.sizeproperty input').css("background","#cccccc");
							$('.sizeproperty.sizemargin').css("background","#ccc url('images/crossline.png')repeat");
                            if (el == "text-topm") {
                                $(".paratextprop").css('margin-top', vl + 'px');
                            } else if (el == "text-leftm") {
                                $(".paratextprop").css('margin-left', vl + 'px');
                            } else if (el == "text-rightm") {
                                $(".paratextprop").css('margin-right', vl + 'px');
                            } else if (el == "text-bottomm") {
                                $(".paratextprop").css('margin-bottom', vl + 'px');
                            }
                        }
                        if ($('#checkpara').is(":checked")) {
							$('.sizeproperty input').css("background","#ffffff");
							$('.sizeproperty.sizemargin').css("background","#99c600 url('images/crossline.png')repeat");
                            if (el == "text-topm") {
                                $(".paratextprop").css('margin-top', vl + 'px');
                                $(".paratextprop").css('margin-left', vl + 'px');
                                $(".paratextprop").css('margin-right', vl + 'px');
                                $(".paratextprop").css('margin-bottom', vl + 'px');
                                $('#text-leftm,#text-rightm,#text-bottomm').val(parseInt($('.paratextprop').css('margin-top')));
                            } else if (el == "text-leftm") {
                                $(".paratextprop").css('margin-top', vl + 'px');
                                $(".paratextprop").css('margin-left', vl + 'px');
                                $(".paratextprop").css('margin-right', vl + 'px');
                                $(".paratextprop").css('margin-bottom', vl + 'px');
                                $('#text-topm,#text-rightm,#text-bottomm').val(parseInt($('.paratextprop').css('margin-left')));
                            }
                            if (el == "text-rightm") {
                                $(".paratextprop").css('margin-top', vl + 'px');
                                $(".paratextprop").css('margin-left', vl + 'px');
                                $(".paratextprop").css('margin-right', vl + 'px');
                                $(".paratextprop").css('margin-bottom', vl + 'px');
                                $('#text-leftm,#text-topm,#text-bottomm').val(parseInt($('.paratextprop').css('margin-right')));
                            }
                            if (el == "text-bottomm") {
                                $(".paratextprop").css('margin-top', vl + 'px');
                                $(".paratextprop").css('margin-left', vl + 'px');
                                $(".paratextprop").css('margin-right', vl + 'px');
                                $(".paratextprop").css('margin-bottom', vl + 'px');
                                $('#text-leftm,#text-rightm,#text-topm').val(parseInt($('.paratextprop').css('margin-bottom')));
                            }

                        }
                    }

					window.changePaddingValue =function(el, vl) {
                        console.log(el);
                        if ($('#checkparapadding').is(":not(:checked)")) {
							$('.sizeproperty input').css("background","#cccccc");
							$('.sizeproperty.sizepadding').css("background","#ccc url('images/crossline.png')repeat");
                            if (el == "padding-topm") {
                                $(".paratextprop").css('padding-top', vl + 'px');
                            } else if (el == "padding-leftm") {
                                $(".paratextprop").css('padding-left', vl + 'px');
                            } else if (el == "padding-rightm") {
                                $(".paratextprop").css('padding-right', vl + 'px');
                            } else if (el == "padding-bottomm") {
                                $(".paratextprop").css('padding-bottom', vl + 'px');
                            }
                        }
                        if ($('#checkparapadding').is(":checked")) {
							$('.sizeproperty input').css("background","#ffffff");
							$('.sizeproperty.sizepadding').css("background","#99c600 url('images/crossline.png')repeat");
                            if (el == "padding-topm") {
                                $(".paratextprop").css('padding-top', vl + 'px');
                                $(".paratextprop").css('padding-left', vl + 'px');
                                $(".paratextprop").css('padding-right', vl + 'px');
                                $(".paratextprop").css('padding-bottom', vl + 'px');
                                $('#padding-leftm,#padding-rightm,#padding-bottomm').val(parseInt($('.paratextprop').css('padding-top')));
                            } else if (el == "padding-leftm") {
                                $(".paratextprop").css('padding-top', vl + 'px');
                                $(".paratextprop").css('padding-left', vl + 'px');
                                $(".paratextprop").css('padding-right', vl + 'px');
                                $(".paratextprop").css('padding-bottom', vl + 'px');
                                $('#padding-topm,#padding-rightm,#padding-bottomm').val(parseInt($('.paratextprop').css('padding-left')));
                            }
                            if (el == "padding-rightm") {
                                $(".paratextprop").css('padding-top', vl + 'px');
                                $(".paratextprop").css('padding-left', vl + 'px');
                                $(".paratextprop").css('padding-right', vl + 'px');
                                $(".paratextprop").css('padding-bottom', vl + 'px');
                                $('#padding-leftm,#padding-topm,#padding-bottomm').val(parseInt($('.paratextprop').css('padding-right')));
                            }
                            if (el == "padding-bottomm") {
                                $(".paratextprop").css('padding-top', vl + 'px');
                                $(".paratextprop").css('padding-left', vl + 'px');
                                $(".paratextprop").css('padding-right', vl + 'px');
                                $(".paratextprop").css('padding-bottom', vl + 'px');

                                $('#padding-leftm,#padding-rightm,#padding-topm').val(parseInt($('.paratextprop').css('padding-bottom')));
                            }

                        }
                    }
                    /*fileInput.on('change', function () {
				var file = this.files[0];
		var reader = new FileReader();
		
		reader.readAsDataURL(file);
		reader.onload = function () {
			base64Data=reader;	
			imgs.push(base64Data.result);
			console.log(reader);
			if (/image/.test(file.type)) {
				var img = keditor.getSettingComponent().find('img');
				img.attr('src', base64Data.result);
				img.css({
					width: '',
					height: ''
				});
				img.load(function () {
					keditor.showSettingPanel(keditor.getSettingComponent(), options);
				});
			} else {
				alert('Your selected file is not text!');
			}
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
				
			});*/
                    $(".openmenu").show();
                    $('.fontaccordian1 .openmenu').parent().find("p span").css("background-image", "url('images/minus.png')");
                    $('.fontaccordian1 p').click(function() {
                        $('.fontaccordian1 .submenu').slideUp();
						$('.accordian1 p').css("background", "#f9f9f9");
                        $('.fontaccordian1 p span').css("background-image", "url('images/plus.png')");
                        if ($(this).parent().find('.submenu').is(':visible')) {
                            $(this).parent().find('.submenu').slideUp();
                            $(this).find('span').css("background-image", "url('images/plus.png')");		
							$(this).css("background", "#f9f9f9");
                        } else {
                            $(this).parent().find('.submenu').slideDown();
                            $(this).find("span").css("background-image", "url('images/minus.png')");
							$(this).css("background", "#ffffff");
                        }
                    });
                    var inputAlign = form.find('#text-align');
                    inputAlign.on('change', function() {
                        var panel = keditor.getSettingComponent().find('.text-panel');
                        panel.css('text-align', this.value);
                    });

                    var inputResponsive = form.find('#text-responsive');
                    inputResponsive.on('click', function() {
                        keditor.getSettingComponent().not('img')[this.checked ? 'addClass' : 'removeClass']('img-responsive');
                    });

                    var cbbStyle = form.find('#text-style');
                    cbbStyle.on('change', function() {
                        var img = keditor.getSettingComponent().not('img');
                        var val = this.value;

                        img.removeClass('img-rounded img-circle img-thumbnail');
                        if (val) {
                            img.addClass(val);
                        }
                    });

                    var inputWidth = form.find('#text-width');
                    var inputHeight = form.find('#text-height');
                    inputWidth.on('change', function() {

                        var img = keditor.getSettingComponent().not('img');
                        var newWidth = +this.value;
                        var newHeight = Math.round(newWidth / self.ratio);

                        if (newWidth <= 0) {
                            newWidth = self.width;
                            newHeight = self.height;
                            this.value = newWidth;
                        }

                        img.css({
                            'width': newWidth,
                            'height': newHeight
                        });
                        inputHeight.val(newHeight);
                    });
                    inputHeight.on('change', function() {
                        var img = keditor.getSettingComponent().not('img');
                        var newHeight = +this.value;
                        var newWidth = Math.round(newHeight * self.ratio);

                        if (newHeight <= 0) {
                            newWidth = self.width;
                            newHeight = self.height;
                            this.value = newHeight;
                        }

                        img.css({
                            'height': newHeight,
                            'width': newWidth
                        });
                        inputWidth.val(newWidth);
                    });
                },
                getContent: function(component, keditor) {
                    flog('getContent "text" component', component);

                    var componentContent = component.find('.keditor-component-content');
                    var id = componentContent.attr('id');
                    var editor = CKEDITOR.instances[id];
                    if (editor) {
                        return editor.getData();
                    } else {
                        return componentContent.html();
                    }
                },

                destroy: function(component, keditor) {
                    flog('destroy "text" component', component);

                    var id = component.find('.keditor-component-content').attr('id');
                    var editor = CKEDITOR.instances[id];
                    if (editor) {
                        editor.destroy();
                    }
                }
            };

        })(jQuery);

        /**
         * KEditor Video Component
         * @copyright: Kademi (http://kademi.co)
         * @author: Kademi (http://kademi.co)
         * @version: 1.1.3
         * @dependencies: $, $.fn.draggable, $.fn.droppable, $.fn.sortable, Bootstrap, FontAwesome (optional)
         */
        (function($) {
            var KEditor = $.keditor;
            var flog = KEditor.log;

            KEditor.components['video'] = {
                getContent: function(component, keditor) {
                    flog('getContent "video" component', component);

                    var componentContent = component.children('.keditor-component-content');
                    var video = componentContent.find('video');
                    video.unwrap();

                    return componentContent.html();
                },

                settingEnabled: true,

                settingTitle: 'Video Settings',

                initSettingForm: function(form, keditor) {
                    flog('init "video" settings', form);

                    form.append(
                        '<form class="form-horizontal">' +
                        '<div class="form-group">' +
                        '<label for="videoFileInput" class="col-sm-12">Video file</label>' +
                        '<div class="col-sm-12">' +
                        '<div class="video-toolbar">' +
                        '<a href="#" class="btn-videoFileInput btn btn-sm btn-primary"><i class="fa fa-upload"></i></a>' +
                        '<input id="videoFileInput" type="file" style="display: none">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="video-autoplay" class="col-sm-12">Autoplay</label>' +
                        '<div class="col-sm-12">' +
                        '<input type="checkbox" id="video-autoplay" />' +
                        '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="video-loop" class="col-sm-12">Loop</label>' +
                        '<div class="col-sm-12">' +
                        '<input type="checkbox" id="video-loop" />' +
                        '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="video-showcontrols" class="col-sm-12">Show Controls</label>' +
                        '<div class="col-sm-12">' +
                        '<input type="checkbox" id="video-showcontrols" checked />' +
                        '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="" class="col-sm-12">Ratio</label>' +
                        '<div class="col-sm-12">' +
                        '<input type="radio" name="video-radio" class="video-ratio" value="4/3" checked /> 4:3' +
                        '</div>' +
                        '<div class="col-sm-12">' +
                        '<input type="radio" name="video-radio" class="video-ratio" value="16/9" /> 16:9' +
                        '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="video-width" class="col-sm-12">Width (px)</label>' +
                        '<div class="col-sm-12">' +
                        '<input type="number" id="video-width" min="320" max="1920" class="form-control" value="320" />' +
                        '</div>' +
                        '</div>' +
                        '</form>'
                    );
                },

                showSettingForm: function(form, component, keditor) {
                    flog('showSettingForm "video" settings', form, component);

                    var options = keditor.options;
                    var video = component.find('video');
                    var fileInput = form.find('#videoFileInput');
                    var btnVideoFileInput = form.find('.btn-videoFileInput');
                    btnVideoFileInput.on('click', function(e) {
                        e.preventDefault();

                        fileInput.trigger('click');
                    });
                    fileInput.off('change').on('change', function() {
                        var file = this.files[0];
                        if (/video/.test(file.type)) {
                            // Todo: Upload to your server :)

                            video.attr('src', URL.createObjectURL(file));

                            video.load(function() {
                                keditor.showSettingPanel(component, options);
                            });
                        } else {
                            alert('Your selected file is not an video file!');
                        }
                    });

                    var autoplayToggle = form.find('#video-autoplay');
                    autoplayToggle.off('click').on('click', function(e) {
                        if (this.checked) {
                            video.prop('autoplay', true);
                        } else {
                            video.removeProp('autoplay');
                        }
                    });

                    var loopToggle = form.find('#video-loop');
                    loopToggle.off('click').on('click', function(e) {
                        if (this.checked) {
                            video.prop('loop', true);
                        } else {
                            video.removeProp('loop');
                        }
                    });

                    var ratio = form.find('.video-ratio');
                    ratio.off('click').on('click', function(e) {
                        if (this.checked) {
                            var currentWidth = video.css('width') || video.prop('width');
                            currentWidth = currentWidth.replace('px', '');

                            var currentRatio = this.value === '16/9' ? 16 / 9 : 4 / 3;
                            var height = currentWidth / currentRatio;
                            video.css('width', currentWidth + 'px');
                            video.css('height', height + 'px');
                            video.removeProp('width');
                            video.removeProp('height');
                        }
                    });

                    var showcontrolsToggle = form.find('#video-showcontrols');
                    showcontrolsToggle.off('click').on('click', function(e) {
                        if (this.checked) {
                            video.attr('controls', 'controls');
                        } else {
                            video.removeAttr('controls');
                        }
                    });

                    var videoWidth = form.find('#video-width');
                    videoWidth.off('change').on('change', function() {
                        video.css('width', this.value + 'px');
                        var currentRatio = form.find('.video-ratio:checked').val() === '16/9' ? 16 / 9 : 4 / 3;
                        var height = this.value / currentRatio;
                        video.css('height', height + 'px');
                        video.removeProp('width');
                        video.removeProp('height');
                    });
                }
            };
        })(jQuery);

        /**
         * KEditor Vimeo Component
         * @copyright: Kademi (http://kademi.co)
         * @author: Kademi (http://kademi.co)
         * @version: 1.1.3
         * @dependencies: $, $.fn.draggable, $.fn.droppable, $.fn.sortable, Bootstrap, FontAwesome (optional)
         */
        (function($) {
            var KEditor = $.keditor;
            var flog = KEditor.log;

            KEditor.components['vimeo'] = {
                getContent: function(component, keditor) {
                    flog('getContent "vimeo" component', component);

                    var componentContent = component.children('.keditor-component-content');
                    componentContent.find('.vimeo-cover').remove();

                    return componentContent.html();
                },

                settingEnabled: true,

                settingTitle: 'Vimeo Settings',

                initSettingForm: function(form, keditor) {
                    flog('initSettingForm "vimeo" component');

                    form.append(
                        '<form class="form-horizontal">' +
                        '   <div class="form-group">' +
                        '       <div class="col-sm-12">' +
                        '           <button type="button" class="btn btn-block btn-primary btn-vimeo-edit">Change Video</button>' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label class="col-sm-12">Autoplay</label>' +
                        '       <div class="col-sm-12">' +
                        '           <input type="checkbox" id="vimeo-autoplay" />' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label class="col-sm-12">Aspect Ratio</label>' +
                        '       <div class="col-sm-12">' +
                        '           <button type="button" class="btn btn-sm btn-default btn-vimeo-169">16:9</button>' +
                        '           <button type="button" class="btn btn-sm btn-default btn-vimeo-43">4:3</button>' +
                        '       </div>' +
                        '   </div>' +
                        '</form>'
                    );

                    var btnEdit = form.find('.btn-vimeo-edit');
                    btnEdit.on('click', function(e) {
                        e.preventDefault();

                        var inputData = prompt('Please enter Vimeo URL in here:');
                        var vimeoRegex = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
                        var match = inputData.match(vimeoRegex);
                        if (match && match[1]) {
                            keditor.getSettingComponent().find('.embed-responsive-item').attr('src', 'https://player.vimeo.com/video/' + match[1] + '?byline=0&portrait=0&badge=0');
                        } else {
                            alert('Your Vimeo URL is invalid!');
                        }
                    });

                    var btn169 = form.find('.btn-vimeo-169');
                    btn169.on('click', function(e) {
                        e.preventDefault();

                        keditor.getSettingComponent().find('.embed-responsive').removeClass('embed-responsive-4by3').addClass('embed-responsive-16by9');
                    });

                    var btn43 = form.find('.btn-vimeo-43');
                    btn43.on('click', function(e) {
                        e.preventDefault();

                        keditor.getSettingComponent().find('.embed-responsive').removeClass('embed-responsive-16by9').addClass('embed-responsive-4by3');
                    });

                    var chkAutoplay = form.find('#vimeo-autoplay');
                    chkAutoplay.on('click', function() {
                        var embedItem = keditor.getSettingComponent().find('.embed-responsive-item');
                        var currentUrl = embedItem.attr('src');
                        var newUrl = (currentUrl.replace(/(\?.+)+/, '')) + '?byline=0&portrait=0&badge=0&autoplay=' + (chkAutoplay.is(':checked') ? 1 : 0);

                        flog('Current url: ' + currentUrl, 'New url: ' + newUrl);
                        embedItem.attr('src', newUrl);
                    });
                },

                showSettingForm: function(form, component, keditor) {
                    flog('showSettingForm "vimeo" component', component);

                    var embedItem = component.find('.embed-responsive-item');
                    var chkAutoplay = form.find('#vimeo-autoplay');
                    var src = embedItem.attr('src');

                    chkAutoplay.prop('checked', src.indexOf('autoplay=1') !== -1);
                }
            };

        })(jQuery);

        /**
         * KEditor Youtube Component
         * @copyright: Kademi (http://kademi.co)
         * @author: Kademi (http://kademi.co)
         * @version: 1.1.3
         * @dependencies: $, $.fn.draggable, $.fn.droppable, $.fn.sortable, Bootstrap, FontAwesome (optional)
         */
        (function($) {
            var KEditor = $.keditor;
            var flog = KEditor.log;

            KEditor.components['youtube'] = {
                getContent: function(component, keditor) {
                    flog('getContent "youtube" component', component);

                    var componentContent = component.children('.keditor-component-content');
                    componentContent.find('.youtube-cover').remove();

                    return componentContent.html();
                },

                settingEnabled: true,

                settingTitle: 'Youtube Settings',

                initSettingForm: function(form, keditor) {
                    flog('initSettingForm "youtube" component');

                    form.append(
                        '<form class="form-horizontal">' +
                        '   <div class="form-group">' +
                        '       <div class="col-sm-12">' +
                        '           <button type="button" class="btn btn-block btn-primary btn-youtube-edit">Change Video</button>' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label class="col-sm-12">Autoplay</label>' +
                        '       <div class="col-sm-12">' +
                        '           <input type="checkbox" id="youtube-autoplay" />' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="form-group">' +
                        '       <label class="col-sm-12">Aspect Ratio</label>' +
                        '       <div class="col-sm-12">' +
                        '           <button type="button" class="btn btn-sm btn-default btn-youtube-169">16:9</button>' +
                        '           <button type="button" class="btn btn-sm btn-default btn-youtube-43">4:3</button>' +
                        '       </div>' +
                        '   </div>' +
                        '</form>'
                    );

                    var btnEdit = form.find('.btn-youtube-edit');
                    btnEdit.on('click', function(e) {
                        e.preventDefault();

                        var inputData = prompt('Please enter Youtube URL in here:');
                        var youtubeRegex = /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/;
                        var match = inputData.match(youtubeRegex);
                        if (match && match[1]) {
                            keditor.getSettingComponent().find('.embed-responsive-item').attr('src', 'https://www.youtube.com/embed/' + match[1]);
                        } else {
                            alert('Your Youtube URL is invalid!');
                        }
                    });

                    var btn169 = form.find('.btn-youtube-169');
                    btn169.on('click', function(e) {
                        e.preventDefault();

                        keditor.getSettingComponent().find('.embed-responsive').removeClass('embed-responsive-4by3').addClass('embed-responsive-16by9');
                    });

                    var btn43 = form.find('.btn-youtube-43');
                    btn43.on('click', function(e) {
                        e.preventDefault();

                        keditor.getSettingComponent().find('.embed-responsive').removeClass('embed-responsive-16by9').addClass('embed-responsive-4by3');
                    });

                    var chkAutoplay = form.find('#youtube-autoplay');
                    chkAutoplay.on('click', function() {
                        var embedItem = keditor.getSettingComponent().find('.embed-responsive-item');
                        var currentUrl = embedItem.attr('src');
                        var newUrl = (currentUrl.replace(/(\?.+)+/, '')) + '?autoplay=' + (chkAutoplay.is(':checked') ? 1 : 0);

                        flog('Current url: ' + currentUrl, 'New url: ' + newUrl);
                        embedItem.attr('src', newUrl);
                    });
                },

                showSettingForm: function(form, component, keditor) {
                    flog('showSettingForm "youtube" component', component);

                    var embedItem = component.find('.embed-responsive-item');
                    var chkAutoplay = form.find('#youtube-autoplay');
                    var src = embedItem.attr('src');

                    chkAutoplay.prop('checked', src.indexOf('autoplay=1') !== -1);
                }
            };

        })(jQuery);

		/* Image alignment model  */
		$scope.aligncenter = true;
        $scope.alignleft = false;
        $scope.alignright = false;
        $scope.aligncentervalue = 'center';
        $scope.alignleftvalue = 'left';
        $scope.alignrightvalue = 'right';
        $scope.alignmentfn = function(data) {
            if (data == 'left') {
                $scope.aligncenter = false;
                $scope.alignleft = true;
                $scope.alignright = false;
            } else if (data == 'center') {
                $scope.aligncenter = true;
                $scope.alignleft = false;
                $scope.alignright = false;
            } else if (data == 'right') {
                $scope.aligncenter = false;
                $scope.alignleft = false;
                $scope.alignright = true;
            }
        }
		/* social alignment model */
		$scope.socialaligncenter = true;
        $scope.socialalignleft = false;
        $scope.socialalignright = false;
        $scope.socialaligncentervalue = 'center';
        $scope.socialalignleftvalue = 'left';
        $scope.socialalignrightvalue = 'right';
        $scope.socialalignmentfn = function(data) {
            if (data == 'left') {
                $scope.socialaligncenter = false;
                $scope.socialalignleft = true;
                $scope.socialalignright = false;
            } else if (data == 'center') {
                $scope.socialaligncenter = true;
                $scope.socialalignleft = false;
                $scope.socialalignright = false;
            } else if (data == 'right') {
                $scope.socialaligncenter = false;
                $scope.socialalignleft = false;
                $scope.socialalignright = true;
            }
        }
		




        /**
         * Welcome to Creative Editor Screen
         * @author:Abhijith
         * 
         * /
         
        /** 
         * Variables
         */

        $scope.id = $stateParams.id;
        $scope.iterator = 0;
        $scope.labels = [];
        $scope.dateLabel = [];
        $scope.Conversation_Name = $localStorage.conversationName;
        $scope.Conversation_Description = $localStorage.conversationDescription;

        /**
         * 
         * function definitions
         * 
         */


        //Back Button Functionality
        $scope.backClick = function () {

            $('body').removeClass();
            GetHostUrl.backValue = "new"
            GetHostUrl.iterator = 0;
            $state.go('sdsn', { id: $scope.id, style: $scope.style_id })

        };


        //Load Theme Data (callback function)
        $scope.loadTheme = function (callback) {

            console.log($scope.mailFlag);
            $scope.finalArr = [];
            var reqObj = {};
            var reqObjArr = [];
            $scope.waveRefCode = GetHostUrl.waveChannelRefCodes.campaignwave[$scope.iterator].campaignwaverefCode;
            $scope.firstWaveRefCode = GetHostUrl.waveChannelRefCodes.campaignwave[0].campaignwaverefCode;

            if (GetHostUrl.enableEmail) {
                $scope.showmailer = true;
                var temp = {
                    campaignrefCode: $scope.id,
                    campaignWaverefCode: $scope.waveRefCode,
                    lancher: $scope.wavename,
                    firstcampaignWaverefCode: $scope.firstWaveRefCode,
                    optionpath: GetHostUrl.mailStyle,
                    channel: "email"
                };
                reqObjArr.push(temp);
            }
            if (GetHostUrl.enableDm) {
                if (!GetHostUrl.enableEmail) {
                    $scope.showdirect = true;
                }
                temp = {
                    campaignrefCode: $scope.id,
                    campaignWaverefCode: $scope.waveRefCode,
                    lancher: $scope.wavename,
                    firstcampaignWaverefCode: $scope.firstWaveRefCode,
                    optionpath: GetHostUrl.dmStyle,
                    channel: "directmail"
                };
                reqObjArr.push(temp);
            }
            if (GetHostUrl.enableLanding) {
                if ($scope.showdirect != true && $scope.showmailer != true) {
                    $scope.showlanding = true;
                }
                temp = {
                    campaignrefCode: $scope.id,
                    campaignWaverefCode: $scope.waveRefCode,
                    lancher: $scope.wavename,
                    firstcampaignWaverefCode: $scope.firstWaveRefCode,
                    optionpath: GetHostUrl.landingStyle,
                    channel: "landingpage"
                };
                reqObjArr.push(temp);
            }
            console.log($scope.showmailer + "-" + $scope.showdirect + "-" + $scope.showlanding)
            reqObj.contentRepoRequest = reqObjArr;

            var url = GetHostUrl.repoUrl + '/campaigntemplate/listtemplatethemeNew';
            $http({
                method: 'POST',
                url: url,
                data: reqObj,
                headers: { 'Content-Type': 'application/json' }
            })
                .success(function (data) {
                    callback(data);
                })

        };

        //Callback function of LoadTheme
        $scope.processLoadTheme = function (x) {

            console.log(x);
            $scope.mailFlag = false;
            $scope.landingFlag = true;
            $scope.dmFlag = false;
            for (var xyz = 0; xyz < x.length; xyz++) {

                var data = x[xyz];
                var dataAr = (Object.keys(data));
                $scope.newArray = [];
                $scope.mailArr = [];
                $scope.landingArr = [];
                $scope.dmArr = [];

                for (var i = 0; i < dataAr.length; i++) {

                    $scope.newArray.push(data[dataAr[i]])
                }
                for (var i = 0; i < $scope.newArray.length; i++) {

                    var channelsLen = $scope.newArray[i].length;
                    var channelName = $scope.newArray[i];
                    var mailObj = {};
                    var landingObj = {};
                    var dmObj = {};

                    for (var k = 0; k < channelName.length; k++) {

                        if (channelName[k].channel == 'email') {

                            $scope.mailFlag = true;
                            mailObj["mail_content"] = channelName[k].data[0];
                            mailObj["style_id"] = channelName[k].optionName;
                            $scope.finalArr.push(mailObj);
                        }
                        else if (channelName[k].channel == 'directmail') {

                            $scope.dmFlag = true;
                            if (channelName[k].data.length == 1) {

                                dmObj["direct_mail_content_front"] = channelName[k].data[0];
                            } else {

                                dmObj["direct_mail_content_front"] = channelName[k].data[0];
                                dmObj["direct_mail_content_back"] = channelName[k].data[1];
                                $scope.direct_mail_back = channelName[k].data[1]
                            }
                            dmObj["style_id"] = channelName[k].optionName;
                            $scope.finalArr.push(dmObj);
                        }
                        if (channelName[k].channel == 'landingpage') {

                            $scope.landingFlag = true;
                            landingObj["landing_page_content"] = channelName[k].data[0];
                            landingObj["style_id"] = channelName[k].optionName;
                            $scope.finalArr.push(landingObj);

                        }

                    }

                }
                $scope.arrLength = $scope.mailArr.length;

            }

            console.log(($scope.finalArr));
            console.log("iterator " + $scope.iterator);
            if ($scope.finalArr.length == 3) {
                $scope.mail_html = $scope.finalArr[0].mail_content;
                $scope.landing_html = $scope.finalArr[2].landing_page_content;
                $scope.direct_mail_front = $scope.finalArr[1].direct_mail_content_front;

            } else if ($scope.finalArr.length == 2) {
                $scope.mail_html = $scope.finalArr[0].mail_content;
                $scope.landing_html = $scope.finalArr[1].landing_page_content;

            } else if ($scope.finalArr.length == 1) {
                $scope.landing_html = $scope.finalArr[0].landing_page_content;

            } else {
                console.log("Some Error in Channel Selection");

            }


            $scope.loadText($scope.processLoadText);

        };

        //Load Content (callback function)
        $scope.loadText = function (callback) {

            var url = GetHostUrl.hostUrl + '/campaigntemplate/listtemplatecontent';
            $scope.finalArr1 = [];
            $http(
                {
                    method: 'POST',
                    url: url,
                    data:
                    {
                        campaignrefCode: $scope.id,
                        campaignWaverefCode: $scope.waveRefCode,
                        lancher: $scope.wavename,
                        firstcampaignWaverefCode: $scope.firstWaveRefCode,
                        optionpath: GetHostUrl.msgStyle
                    },
                    headers: { 'Content-Type': 'application/json', 'AUTH_TOKEN': $localStorage.authToken }
                }
            )
                .success(function (data) {
                    callback(data)
                })

        };

        //Callback of LoadTextContent
        $scope.processLoadText = function (data) {

            var dataAr = (Object.keys(data));
            $scope.newArray1 = [];
            templateOptionUrl = 0;
            for (var i = 0; i < dataAr.length; i++) {
                var temp = $scope.style_id;
                $scope.newArray1.push(data[dataAr[i]]);
            }
            for (var i = 0; i < $scope.newArray1.length; i++) {

                var channelsLen = $scope.newArray1[i].length;
                var channelName = $scope.newArray1[i];
                var finalObj = {};
                for (var j = 0; j < channelsLen; j++) {
                    var newObj = {};
                    var channelData = JSON.parse(channelName[j].data);
                    //console.log("channelData.url "+ channelName[j].url )
                    finalObj[channelName[j].channel + "url"] = channelName[j].url;
                    finalObj[channelName[j].channel + "option"] = channelName[j].optionName;
                    //console.log("finalObj[channelName[j].channel+'url']"+finalObj[channelName[j].channel+"url"])
                    //console.log("chanel data:"+channelData)
                    for (var k = 0; k < channelData.fields.length; k++) {
                        var field = channelData.fields[k];
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
                                            var newtitle = bensubtitle + 1
                                            if (field.value[ben].value == "BenefitsSubTitle" + newtitle) {
                                                finalObj[channelName[j].channel + "BenefitsSubTitle" + newtitle] = field.value[ben].value[bensubtitle].value;
                                            } else {
                                                finalObj[channelName[j].channel + "BenefitsDescription" + newtitle] = field.value[ben].value[bensubtitle].value;
                                            }
                                        }
                                    }
                                    else if (field.value[ben].name == "BenefitsCTA") {
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
                                    } else if (field.value[fea].name == "FeaturesCTA") {
                                        finalObj[channelName[j].channel + "FeaturesCTA"] = field.value[fea].value;
                                    }
                                    else if (field.value[fea].name == "FeatureSubTitle") {

                                        if (field.value[fea].value.length != undefined && field.value[fea].value.length > 0) {
                                            for (var BenefitsSubValueList = 0; BenefitsSubValueList < field.value[fea].value.length; BenefitsSubValueList++) {
                                                var newbentitle = BenefitsSubValueList + 1;
                                                if (field.value[fea].value[BenefitsSubValueList].name == "FeaturesSubTitle" + newbentitle) {
                                                    finalObj[channelName[j].channel + "FeaturesSubTitle" + newbentitle] = field.value[fea].value[BenefitsSubValueList].value;
                                                } else {
                                                    finalObj[channelName[j].channel + "FeaturesDescription" + newbentitle] = field.value[fea].value[BenefitsSubValueList].value;
                                                }
                                            }
                                        } else {
                                            finalObj[channelName[j].channel + "FeatureSubValue"] = field.value[fea].value;
                                        }
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
                                    } else if (field.value[dis].name == "DisclaimerMainDescription") {
                                        for (var discli = 0; discli < field.value[dis].value.length; discli++) {
                                            finalObj[channelName[j].channel + "DisclaimerMainDescription" + discli] = field.value[dis].value[discli];
                                        }
                                    }
                                }
                                //finalObj[channelName[j].channel+"Disclaimer"] = field.value;
                            }
                        } else {
                            if (field.name == "Body Copy") {
                                finalObj[channelName[j].channel + "bodycopy"] = field.value;
                            }
                        }
                    }
                }
                $scope.finalArr1.push(finalObj);
            }
            console.log("Final Arr1");
            console.log($scope.finalArr1);
            $scope.loadEditor($scope.processLoadEditor)
        };


        //Load Editor
        $scope.loadEditor = function (callback) {

            if ($scope.mailFlag) {

                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{SubjectLine}}", "g"), $scope.finalArr1[0].emailsubjectline)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{MainHeading}}", "g"), $scope.finalArr1[0].emailmainheading)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{SubHeading}}", "g"), $scope.finalArr1[0].emailsubheading)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BannerCTA}}", "g"), $scope.finalArr1[0].emailbannerctacontent)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{Paragraphs}}", "g"), $scope.finalArr1[0].emailparagraphs0.value)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{IntroCTA}}", "g"), $scope.finalArr1[0].emailparagraphs1.value)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsMainTitle}}", "g"), $scope.finalArr1[0].emailBenefitsMainTitle)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsMainDescription}}", "g"), $scope.finalArr1[0].emailBenefitsMainDescription)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsSubTitle1}}", "g"), $scope.finalArr1[0].emailBenefitsDescription2[0])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsDescription1}}", "g"), $scope.finalArr1[0].emailBenefitsDescription2[1])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsSubTitle2}}", "g"), $scope.finalArr1[0].emailBenefitsDescription4[0])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsDescription2}}", "g"), $scope.finalArr1[0].emailBenefitsDescription4[1])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsSubTitle3}}", "g"), $scope.finalArr1[0].emailBenefitsDescription6[0])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsDescription3}}", "g"), $scope.finalArr1[0].emailBenefitsDescription6[1])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsSubTitle4}}", "g"), $scope.finalArr1[0].emailBenefitsDescription8[0])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsDescription4}}", "g"), $scope.finalArr1[0].emailBenefitsDescription8[1])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsSubTitle5}}", "g"), $scope.finalArr1[0].emailBenefitsDescription10[0])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsDescription5}}", "g"), $scope.finalArr1[0].emailBenefitsDescription10[1])
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{BenefitsCTA}}", "g"), $scope.finalArr1[0].emailBenefitsCTA)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesMainTitle}}", "g"), $scope.finalArr1[0].emailFeaturesMainTitle)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesDescription1}}", "g"), $scope.finalArr1[0].emailFeaturesDescription2)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesDescription2}}", "g"), $scope.finalArr1[0].emailFeaturesDescription4)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesDescription3}}", "g"), $scope.finalArr1[0].emailFeaturesDescription6)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesDescription4}}", "g"), $scope.finalArr1[0].emailFeaturesDescription8)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesDescription5}}", "g"), $scope.finalArr1[0].emailFeaturesDescription10)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesSubTitle1}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle1)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesSubTitle2}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle2)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesSubTitle3}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle3)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesSubTitle4}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle4)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesSubTitle5}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle5)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{FeaturesCTA}}", "g"), $scope.finalArr1[0].emailFeaturesCTA)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{MainDescription}}", "g"), $scope.finalArr1[0].emailMainDescription)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{DisclaimerMainTitle}}", "g"), $scope.finalArr1[0].emailDisclaimerMainTitle)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{DisclaimerMainDescription}}", "g"), $scope.finalArr1[0].emailDisclaimerMainDescription0 + '<br/>' + $scope.finalArr1[0].emailDisclaimerMainDescription1)
                $scope.mail_html = $scope.mail_html.replace(new RegExp("{{ImportantInfoParagraphs}}", "g"), '')
                $scope.mail_html = $scope.mail_html.replace(new RegExp("undefined", "g"), '')

            }
            if ($scope.dmFlag) {
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{SubjectLine}}", "g"), $scope.finalArr1[0].emailsubjectline)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{MainHeading}}", "g"), $scope.finalArr1[0].emailmainheading)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{SubHeading}}", "g"), $scope.finalArr1[0].emailsubheading)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BannerCTA}}", "g"), $scope.finalArr1[0].emailbannerctacontent)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{Paragraphs}}", "g"), $scope.finalArr1[0].emailparagraphs0.value)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{IntroCTA}}", "g"), $scope.finalArr1[0].emailparagraphs1.value)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsMainTitle}}", "g"), $scope.finalArr1[0].emailBenefitsMainTitle)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsMainDescription}}", "g"), $scope.finalArr1[0].emailBenefitsMainDescription)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsSubTitle1}}", "g"), $scope.finalArr1[0].emailBenefitsDescription2[0])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsDescription1}}", "g"), $scope.finalArr1[0].emailBenefitsDescription2[1])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsSubTitle2}}", "g"), $scope.finalArr1[0].emailBenefitsDescription4[0])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsDescription2}}", "g"), $scope.finalArr1[0].emailBenefitsDescription4[1])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsSubTitle3}}", "g"), $scope.finalArr1[0].emailBenefitsDescription6[0])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsDescription3}}", "g"), $scope.finalArr1[0].emailBenefitsDescription6[1])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsSubTitle4}}", "g"), $scope.finalArr1[0].emailBenefitsDescription8[0])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsDescription4}}", "g"), $scope.finalArr1[0].emailBenefitsDescription8[1])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsSubTitle5}}", "g"), $scope.finalArr1[0].emailBenefitsDescription10[0])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsDescription5}}", "g"), $scope.finalArr1[0].emailBenefitsDescription10[1])
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{BenefitsCTA}}", "g"), $scope.finalArr1[0].emailBenefitsCTA)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesMainTitle}}", "g"), $scope.finalArr1[0].emailFeaturesMainTitle)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesDescription1}}", "g"), $scope.finalArr1[0].emailFeaturesDescription2)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesDescription2}}", "g"), $scope.finalArr1[0].emailFeaturesDescription4)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesDescription3}}", "g"), $scope.finalArr1[0].emailFeaturesDescription6)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesDescription4}}", "g"), $scope.finalArr1[0].emailFeaturesDescription8)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesDescription5}}", "g"), $scope.finalArr1[0].emailFeaturesDescription10)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesSubTitle1}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle1)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesSubTitle2}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle2)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesSubTitle3}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle3)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesSubTitle4}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle4)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesSubTitle5}}", "g"), $scope.finalArr1[0].emailFeaturesSubTitle5)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{FeaturesCTA}}", "g"), $scope.finalArr1[0].emailFeaturesCTA)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{MainDescription}}", "g"), $scope.finalArr1[0].emailMainDescription)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{DisclaimerMainTitle}}", "g"), $scope.finalArr1[0].emailDisclaimerMainTitle)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{DisclaimerMainDescription}}", "g"), $scope.finalArr1[0].emailDisclaimerMainDescription0 + '<br/>' + $scope.finalArr1[0].emailDisclaimerMainDescription1)
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("{{ImportantInfoParagraphs}}", "g"), '')
                $scope.direct_mail_front = $scope.direct_mail_front.replace(new RegExp("undefined", "g"), '')
            }

            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{SubjectLine}}", "g"), $scope.finalArr1[0].landingpagesubjectline)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{MainHeading}}", "g"), $scope.finalArr1[0].landingpagemainheading)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{SubHeading}}", "g"), $scope.finalArr1[0].landingpagesubheading)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BannerCTA}}", "g"), $scope.finalArr1[0].landingpagebannerctacontent)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{Paragraphs}}", "g"), $scope.finalArr1[0].landingpageparagraphs0.value)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{IntroCTA}}", "g"), $scope.finalArr1[0].landingpageparagraphs1.value)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsMainTitle}}", "g"), $scope.finalArr1[0].landingpageBenefitsMainTitle)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsMainDescription}}", "g"), $scope.finalArr1[0].landingpageBenefitsMainDescription)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsSubTitle1}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription2[0])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsDescription1}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription2[1])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsSubTitle2}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription4[0])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsDescription2}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription4[1])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsSubTitle3}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription6[0])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsDescription3}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription6[1])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsSubTitle4}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription8[0])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsDescription4}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription8[1])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsSubTitle5}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription10[0])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsDescription5}}", "g"), $scope.finalArr1[0].landingpageBenefitsDescription10[1])
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{BenefitsCTA}}", "g"), $scope.finalArr1[0].landingpageBenefitsCTA)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesMainTitle}}", "g"), $scope.finalArr1[0].landingpageFeaturesMainTitle)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesDescription1}}", "g"), $scope.finalArr1[0].landingpageFeaturesDescription2)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesDescription2}}", "g"), $scope.finalArr1[0].landingpageFeaturesDescription4)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesDescription3}}", "g"), $scope.finalArr1[0].landingpageFeaturesDescription6)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesDescription4}}", "g"), $scope.finalArr1[0].landingpageFeaturesDescription8)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesDescription5}}", "g"), $scope.finalArr1[0].landingpageFeaturesDescription10)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesSubTitle1}}", "g"), $scope.finalArr1[0].landingpageFeaturesSubTitle1)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesSubTitle2}}", "g"), $scope.finalArr1[0].landingpageFeaturesSubTitle2)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesSubTitle3}}", "g"), $scope.finalArr1[0].landingpageFeaturesSubTitle3)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesSubTitle4}}", "g"), $scope.finalArr1[0].landingpageFeaturesSubTitle4)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesSubTitle5}}", "g"), $scope.finalArr1[0].landingpageFeaturesSubTitle5)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesCTA}}", "g"), $scope.finalArr1[0].emailFeaturesCTA)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{FeaturesMainDescription}}", "g"), $scope.finalArr1[0].landingpagFeaturesMainDescription)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{MainDescription}}", "g"), $scope.finalArr1[0].landingpageMainDescription)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{DisclaimerMainTitle}}", "g"), $scope.finalArr1[0].landingpageDisclaimerMainTitle)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{DisclaimerMainDescription}}", "g"), $scope.finalArr1[0].landingpageDisclaimerMainDescription0 + '<br/>' + $scope.finalArr1[0].landingpageDisclaimerMainDescription1)
            $scope.landing_html = $scope.landing_html.replace(new RegExp("{{ImportantInfoParagraphs}}", "g"), '')
            $scope.landing_html = $scope.landing_html.replace(new RegExp("undefined", "g"), '')
            callback(true)
        };

        $scope.processLoadEditor = function (data) {

            mailDiv = angular.element(document.querySelector('#content-area1 #holder1'));
            mailDiv.append($scope.mail_html);

            landingDiv = angular.element(document.querySelector('#content-area1 #holder2'));
            landingDiv.append($scope.landing_html);

            dmDiv = angular.element(document.querySelector('#content-area1 #holder3'));
            dmDiv.append($scope.direct_mail_front);

            if ($scope.mailFlag) {
                $scope.showLandingPage = false;
            } else {
                $scope.showLandingPage = true;
            }

            console.log($scope.mail_html + "-----" + $scope.mailFlag)

            $('#content-area1 #holder1,#content-area1 #holder2,#content-area1 #holder3').keditor();
            $('.ui-helper-hidden-accessible').addClass('noLog');
            $('#keditor-sidebar').addClass('sideBar');

        };

        //Modal close
        $scope.returntofolder = function () {
            $scope.folers = true;
            $scope.gallerylistsection = true;
        }

        $scope.modalClose = function (name, name1) {
            $(name, name1).hide();
            $scope.returntofolder();
        }



        if (GetHostUrl.editFinalizeDesign.campaigndetails.stages == "creative") {

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

        //Set Iterator Count
        if ($scope.iterator == "0") {
            $scope.wavename = "first";
        }
        else {
            $scope.wavename = "next";
        }

        $scope.loadTheme($scope.processLoadTheme);
        $scope.modalClose("#changephoto,#mask");
    })

