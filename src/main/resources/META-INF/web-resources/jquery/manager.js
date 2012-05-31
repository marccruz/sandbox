$(document).ready(function() {
	$('.file-input.async').on('change', function(e) {
		$ctx = $(this).closest('.creative').find('.image-inner-container');
		$file = $(this).siblings('input[type=hidden]');
		
		// grab the uploaded files to post to the server
		var data = new FormData();
		data.append('file', $(this)[0].files[0]);
		
		// post to server asynchronously
		$.ajax({
			cache: false,
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

	
	$('.creative .file-browse.button').on('click', function(e) {
		var $fileInput = $(this).siblings('input[type="file"]');
		$fileInput.click();
	});
	
	$('.creative .delete.button').on('click', function(e) {
		$ctx = $(this).closest('.creative').find('.image-inner-container');
		var type = $ctx.find('input[name=type]').val();
		var sel = 'input[name=' + type.toLowerCase() + 'Deleted]';
		$ctx.find(sel).val('true')
		$ctx.find('img')
			.attr('name', '')
				.attr('src', '/creatives?binaryAssetId=&size='+type);
	});
});

