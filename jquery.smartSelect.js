/**
 * 名称:         jquery.smartSelect.js
 * 作者:         马征
 * 版本:         0.1
 * 最后修改:  2014-09-04
 * 类别:         jQuery plugin
 */
(function($) {
	$.fn.smartSelect = function(options) {
		
		options = jQuery.extend({
			forSelectData: "[]",
			toSelectData: "[]",
			overlayOpacity: 0.5
		}, options);
		
		var thisId = $(this).attr("id");
		
		var forSelectList = eval(options.forSelectData);
		var forSelectListDom = "";
		
		
		var toSelectList = eval(options.toSelectData);
		var toSelectListDom = "";
		
		$(forSelectList).each(function(i, n){
			forSelectListDom += '<li><input name="forSelectItem" type="checkbox" value="' + n.value + '"/> <p>'+ n.label +'</p></li>';
		});
		
		$(toSelectList).each(function(i, n){
			toSelectListDom += '<li><input name="forSelectItem" type="checkbox" value="'+ n.value +'"/> <p>'+ n.label +'</p></li>';
		});

		 var smartSelect_objects ='<div class="smartSelect">' +
													'<div class="forSelect-panel"> ' +
													'	<input id="forSelectSearchInput" class="forSelectSearchInput" type="text">  ' +
													'	<ul id="forSelectList">  ' +
													forSelectListDom +
													'	</ul> ' +
													'</div> ' +
													'<div class="action-panel"> ' +
													'	<div class="buttonGroup"> ' +
													'		<button id="allToRightBtn">&gt;&gt;</button> ' +
													'		<button id="toRightBtn">&gt;</button> ' +
													'		<button id="toLeftBtn">&lt;</button> ' +
													'		<button id="allToLeftBtn">&lt;&lt;</button> ' +
													'	</div> ' +
														
													'</div> ' +
													'<div class="toSelect-panel"> ' +
													'	<ul id="toSelectList"> ' +
													toSelectListDom +
													'	</ul> ' +
													'</div> ' +
												'</div>';
		$(this).append(smartSelect_objects);
		
		$("#" + thisId + " #forSelectSearchInput").keyup(function(e){
			if(e.keyCode == 13){
				var filteredList = new Array();
				var keyword = $(this).val();
				//过滤数组
				if(keyword != ""){
					//filteredList.length = 0;
					$(forSelectList).each(function(i, n){
						if(n.label.indexOf(keyword) >= 0){
							var a = new Object();
							a = n;
							filteredList.push(a);
						}
					});
				} else {
					filteredList = forSelectList;
				}
	
				var forSelectListDom2 = "";
				$(filteredList).each(function(i, n){
					forSelectListDom2 += '<li><input name="forSelectItem" type="checkbox" /> <p>'+ n.label +'</p></li>';
				});
				$("#forSelectList").empty();
				$("#forSelectList").append(forSelectListDom2);
			}
			
		});
		
		$("#" + thisId + " #forSelectList li").bind("click", function(e){
			var checkedStatus = $(this).find(":checkbox").is(':checked');
			if(!checkedStatus){
				$(this).addClass("selected");
				$(this).find(":checkbox").prop('checked','checked');
			} else {
				$(this).removeClass("selected");
				$(this).find(":checkbox").removeAttr('checked');
			}
		});
		
		$("#" + thisId + " #toSelectList li").bind("click", function(e){
			var checkedStatus = $(this).find(":checkbox").is(':checked');
			if(!checkedStatus){
				$(this).addClass("selected");
				$(this).find(":checkbox").prop('checked','checked');
			} else {
				$(this).removeClass("selected");
				$(this).find(":checkbox").removeAttr('checked');
			}
		});
	
		$("#" + thisId + " #toRightBtn").bind("click", function(e){
			var selectedItems = $("#" + thisId + " #forSelectList li[class = selected]");
			$(selectedItems).each(function(i, n){
				$(n).removeClass("selected");
				$(this).find(":checkbox").removeAttr('checked');
			});
			$("#" + thisId + " #toSelectList").append(selectedItems);
		});
		
		$("#" + thisId + " #allToRightBtn").bind("click", function(e){
			var selectedItems = $("#" + thisId + " #forSelectList li");
			$(selectedItems).each(function(i, n){
				$(n).removeClass("selected");
				$(this).find(":checkbox").removeAttr('checked');
			});
			$("#" + thisId + " #toSelectList").append(selectedItems);
		});
		
		$("#" + thisId + " #toLeftBtn").bind("click", function(e){
			var selectedItems = $("#" + thisId + " #toSelectList li[class = selected]");
			$(selectedItems).each(function(i, n){
				$(n).removeClass("selected");
				$(this).find(":checkbox").removeAttr('checked');				
			});
			$("#" + thisId + " #forSelectList").append(selectedItems);
		});
		
		$("#" + thisId + " #allToLeftBtn").bind("click", function(e){
			var selectedItems = $("#" + thisId + " #toSelectList li");
			$(selectedItems).each(function(i, n){
				$(n).removeClass("selected");
				$(this).find(":checkbox").removeAttr('checked');
			});
			$("#" + thisId + " #forSelectList").append(selectedItems);
		}); 
		
		$.fn.smartSelect.getSelected = function() {    
			var result = new Array();
			var selectedItems = $("#" + thisId + " #toSelectList li");
			
			$(selectedItems).each(function(i, n){
				var item = new Object();
				var a = $(n);
				item.value = $(a).children("input").val();
				item.label = $(a).children("p").html();
				
				result.push(item);		
			});
			
			return result;    
		}; 
	};

})(jQuery);
