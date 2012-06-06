$(document).ready(function() {
	
	// Handler to upload a creative image
	$('.upload-button-container').on('change', 'input[type=file]', function(e) {
		var $p = $(this).closest('.dijitTitlePaneContentOuter');
		var $overlay, $loading=$("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");
		if($overlay = document.getElementById("TB_overlay") === null){
			$overlay = $('<div id="TB_overlay" class="TB_overlayBG"></div>'); 
			$("body").append($overlay);
		}
		$("body").append($loading);
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
				$overlay.trigger('unload').unbind().remove();
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
		$creative.find(sel).val('true')
		$ctx.find('img')
			.attr('name', '')
				.attr('src', '/creatives?binaryAssetId=&size='+type);
		var $curInput = $(this).siblings('.upload-button-container').children('input[type=file]');
		$newInput = $('<input type="file"/>');
		$newInput
			.attr('id', $curInput.attr('id'))
				.attr('name', $curInput.attr('name'))
					.attr('class', $curInput.attr('class'))
						.attr('accept', $curInput.attr('accept'))
							.attr('style', $curInput.attr('style'))
								.attr('data-url',$curInput.attr('data-url'));
		$curInput.replaceWith($newInput);
	});
});

dojo.addOnLoad(function() {
	$('.dijitTitlePaneContentInner').removeAttr('tabindex');
});

