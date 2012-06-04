$(document).ready(function() {
	
	// Handler to upload a creative image
	$('.file-input.async').on('change', function(e) {
		var $p = $(this).closest('.dijitTitlePaneContentOuter');
		var $overlay = $('#TB_overlay');
		var $loading = $("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");
		$("body").append($loading);
		
		$overlay.show();
		$loading.show();

		var $ctx = $(this).closest('.creative').find('.image-inner-container');
		var $file = $(this).siblings('input[type=hidden]');
		
		// grab the uploaded files to post to the server
		var data = new FormData();
		data.append('file', $(this)[0].files[0]);
		
		// post to server asynchronously
		$.ajax({
			cache: false,
			complete: function(jqXHR, textStatus) {
				$loading.remove();
				$overlay.hide();
			},
        	contentType: false,
        	context: $ctx,
        	data: data,
        	dataType: 'json',
        	error: function(jqXHR,textStatus,errorThrown) {
        		alert("An exception occured at the server.");	// TODO: Exception Handling
        	},
        	processData:false,
        	success:function(data, textStatus, jqXHR) {
        		if (data.success && data.image) {
        			// update properties that changed.  
        			// i.e. src, mimeType and name attributes.
        			$(this).find('img')
        				.attr('name', data.image.name)
        					.attr('src', data.image.src)
        		} else {
        			alert("The server responded with an error.")
        			// TODO: Error Handling
        		}
        	},
        	type: 'POST',
        	url: $(this).data('url')
        });
	});

	// Handler for button to browse for creative image to upload
	$('.creative .file-browse.button').on('click', function(e) {
		e.preventDefault();
		var $fileInput = $(this).siblings('input[type="file"]');
		$fileInput.click();
	});
	
	//  Handler for button to remove image from offer
	$('.creative .delete.button').on('click', function(e) {
		e.preventDefault();
		var $creative = $(this).closest('.creative');
		var $ctx = $creative.find('.image-inner-container');
		var type = $creative.find('input[name=type]').val();
		var sel = 'input[name=' + type.toLowerCase() + 'Deleted]';
		$ctx.find(sel).val('true')
		$ctx.find('img')
			.attr('name', '')
				.attr('src', '/creatives?binaryAssetId=&size='+type);
	});
});

