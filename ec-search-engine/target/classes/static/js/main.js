$(document).ready(function () {

    $("#search-form").submit(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        //fire_ajax_submit();
        fire_ajax_submit_card();
        

    });

});

function fire_ajax_submit_card() {

    var search = {}
    var amazonJapanCardHtml;
    var rakutenCardHtml;
    var amazonIndiaCardHtml;
    var flipkartIndiaCardHtml;
    
    search["keyWord"] = $("#username").val();
    search["areaSelector"] = $('#areaSelector input:radio:checked').val();

    $("#btn-search").prop("disabled", true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/search",
        data: JSON.stringify(search),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
        	$.each(data, function(k,v) {
        		if(k=="responseList"){  
	        		$.each(this, function(k,v) {
	            		
		        		if(k=="amazonJapanlist"){
		        			amazonIndiaCardHtml = "";
		        			amazonJapanCardHtml = "<h2>Amazon Japan</h2><div class=\"card-deck\">";
		        			$.each(this, function(k,v) {
		        				
		        				
		        				amazonJapanCardHtml = amazonJapanCardHtml 
		        							 + "<div class=\"card\" style=\"width: 200px;\">"
					   	            		 + "<img class=\"card-img-top\" src=\""+v.image+"\" alt=\"Card image cap\">"
						            		 + "<div class=\"card-block\">"
						            		 + "<h4> <a href=\""+v.url+"\"target=\"_blank\" class=\"card-title\">"+v.name+"</a></h4>"
						            		 + "<p class=\"card-text\">"+v.price+"円</p>"
						            		 + "</div>"
						            		 + "<div class=\"card-footer\">"
						            		 + "<small class=\"text-muted\">"+v.rating+" ratings </small>"
						            	     + "<small class=\"text-muted\" align=\"right\"> by "+v.numberOfRaters+" users</small>"
								             + "</div>"
						            		 + "</div>"
						            		 ;
		        				
		        	            
		        			});
		        		}
		        		if(k=="rakutenJapanlist"){  
		        			rakutenCardHtml = "<h2>Rakuten</h2><div class=\"card-deck\">";
		        			$.each(this, function(k,v) {
		        				
		        				
		        				rakutenCardHtml = rakutenCardHtml 
		        							 + "<div class=\"card\" style=\"width: 200px;\">"
					   	            		 + "<img class=\"card-img-top\" src=\""+v.image+"\" alt=\"Card image cap\">"
						            		 + "<div class=\"card-block\">"
						            		 + "<h4> <a href=\""+v.url+"\"target=\"_blank\" class=\"card-title\">"+v.name+"</a></h4>"
						            		 + "<p class=\"card-text\">"+v.price+"円</p>"
						            		 + "</div>"
						            		 + "<div class=\"card-footer\">"
						            		 + "<small class=\"text-muted\">"+v.rating+" ratings </small>"
						            	     + "<small class=\"text-muted\" align=\"right\"> by "+v.numberOfRaters+" users</small>"
								             + "</div>"
						            		 + "</div>"
						            		 ;
		        				
		        	            
		        			});
		        		}
		        		if(k=="amazonIndialist"){
		        			amazonJapanCardHtml = ""; 
		        			rakutenCardHtml = "";
		        			amazonIndiaCardHtml = "<h2>Amazon India</h2><div class=\"card-deck\">";
		        			$.each(this, function(k,v) {
		        				
		        				
		        				amazonIndiaCardHtml = amazonIndiaCardHtml 
		        							 + "<div class=\"card\" style=\"width: 200px;\">"
					   	            		 + "<img class=\"card-img-top\" src=\""+v.image+"\" alt=\"Card image cap\">"
						            		 + "<div class=\"card-block\">"
						            		 + "<h4> <a href=\""+v.url+"\"target=\"_blank\" class=\"card-title\">"+v.name+"</a></h4>"
						            		 + "<p class=\"card-text\">₹"+v.price+"</p>"
						            		 + "</div>"
						            		 + "<div class=\"card-footer\">"
						            		 + "<small class=\"text-muted\">"+v.rating+" ratings </small>"
						            	     + "<small class=\"text-muted\" align=\"right\"> by "+v.numberOfRaters+" users</small>"
								             + "</div>"
						            		 + "</div>"
						            		 ;
		        				
		        	            
		        			});
		        		}
		        		if(k=="flipkartIndialist"){
		        			
		        			flipkartIndiaCardHtml = "<h2>Flipkart India</h2><div class=\"card-deck\">";
		        			$.each(this, function(k,v) {
		        				
		        				
		        				flipkartIndiaCardHtml = flipkartIndiaCardHtml 
		        							 + "<div class=\"card\" style=\"width: 200px;\">"
					   	            		 + "<img class=\"card-img-top\" src=\""+v.image+"\" alt=\"Card image cap\">"
						            		 + "<div class=\"card-block\">"
						            		 + "<h4> <a href=\""+v.url+"\"target=\"_blank\" class=\"card-title\">"+v.name+"</a></h4>"
						            		 + "<p class=\"card-text\">₹"+v.price+"</p>"
						            		 + "</div>"
						            		 + "<div class=\"card-footer\">"
						            		 + "<small class=\"text-muted\">"+v.rating+" ratings </small>"
						            	     + "<small class=\"text-muted\" align=\"right\"> by "+v.numberOfRaters+" users</small>"
								             + "</div>"
						            		 + "</div>"
						            		 ;
		        				
		        	            
		        			});
		        		}
	        		});	
        		}
        	});
        	$('#amazonJapanCard').html(amazonJapanCardHtml + "</div>");
        	$('#rakutenCard').html(rakutenCardHtml + "</div>");
        	$('#amazonIndiaCard').html(amazonIndiaCardHtml + "</div>");
        	$('#flipkartIndiaCard').html(flipkartIndiaCardHtml + "</div>");
        	
        	var json = "<h4>Ajax Response</h4><pre>"
                + JSON.stringify(data, null, 4) + "</pre>";
            
            //$('#feedback').html(json);

            $("#btn-search").prop("disabled", false);
            
        },
        error: function (e) {

            var json = "<h4>Ajax Response</h4><pre>"
                + e.responseText + "</pre>";
            $('#feedback').html(json);

            console.log("ERROR : ", e);
            $("#btn-search").prop("disabled", false);

        }
    });

}



function fire_ajax_submit() {

    var search = {}
    search["keyWord"] = $("#username").val();

    $("#btn-search").prop("disabled", true);
    document.getElementById("amazonJapan").style.display="none";
    document.getElementById("rakuten").style.display="none";
    if ( $.fn.dataTable.isDataTable( '#amazonJapan' ) ) {
        table = $('#amazonJapan').DataTable();
        table.clear().destroy();
        
    }
    
    if ( $.fn.dataTable.isDataTable( '#rakuten' ) ) {
        table = $('#rakuten').DataTable();
        table.clear().destroy();
    }

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/search",
        data: JSON.stringify(search),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
        	$('#amazonJapan').DataTable( {
        		responsive: true,
        		"data": data.amazonJapanSearchResult,
                "columns": [
               	 {
               		 "data": "image",
               		 "render": function(data, type, row) {
               			 return '<img src="'+data+'" />';
               		 }
               	 },
               	 {
               		 "data": "name",
               		 "render": function(data, type, full, meta) {
               			 return '<a href="'+full.url+'"target="_blank">'+data+'</a>';
               		 }
               	 },
               	 { "data": "price" },
               	 { "data": "discountedPrice" },
               	 { "data": "rating" },
               	 { "data": "numberOfRaters" },
               	 { "data": "bestseller" },
               	 { "data": "maker" },
               	 ]
           });
        	$('#rakuten').DataTable( {
        		responsive: true,
        		"data": data.rakutenJapanSearchResult,
                "columns": [
               	 {
               		 "data": "image",
               		 "render": function(data, type, row) {
               			 return '<img src="'+data+'" />';
               		 }
               	 },
               	 {
               		 "data": "name",
               		 "render": function(data, type, full, meta) {
               			 return '<a href="'+full.url+'"target="_blank">'+data+'</a>';
               		 }
               	 },
               	 { "data": "price" },
               	 { "data": "numberOfRaters" },
               	 {
               		 "data": "maker",
               		 "render": function(data, type, row) {
               			 return '<a target="_blank" href='+data+'</a>';
               		 }
               	 }
               	 ]
           });
           document.getElementById("amazonJapan").style.display="table";
           document.getElementById("rakuten").style.display="table";
            
        	var json = "<h4>Ajax Response</h4><pre>"
                + JSON.stringify(data, null, 4) + "</pre>";
            
       //     $('#feedback').html(json);

            $("#btn-search").prop("disabled", false);
            
        },
        error: function (e) {

            var json = "<h4>Ajax Response</h4><pre>"
                + e.responseText + "</pre>";
            $('#feedback').html(json);

            console.log("ERROR : ", e);
            $("#btn-search").prop("disabled", false);

        }
    });

}