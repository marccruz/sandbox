function pleaseWait() {
	var $overlay, $loading=$("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");
	if($overlay = document.getElementById("TB_overlay") === null){
		$overlay = $('<div id="TB_overlay" class="TB_overlayBG"></div>'); 
		$("body").append($overlay);
	}
	$("body").append($loading);
	$loading.show();
}

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
		var file = $(this)[0].files[0];

		dojo.require('dojo.string');
		if (!file || !dojo.string.contains('image',file.type,false)) {
			var $creative = $(this).closest('.creative');
			$creative.find('.delete.button').click();
			alert("The format of the image is not supported. Supported formats are: GIFs, JPEGs and PNGs.");
			$loading.remove();
			$overlay.trigger('unload').unbind().remove();
			return;
		}
		
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
        			// add new image with returned properties
        			$(this).children('img').remove();
        			var $newImg = $('<img />').attr('name', data.image.name).attr('src', data.image.src);
        			$newImg.insertBefore($(this).children('span'));
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
		$creative.children('input[type=hidden]').val('');
		$ctx.children('img').remove();
		var $curInput = $(this).siblings('.upload-button-container').children('input[type=file]');
		var $newInput = $('<input type="file"/>');
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
	var attrs = dojo.attr(dojo.doc.body, 'class');
	dojo.attr(dojo.doc.body, 'class', attrs + ' ready');
	
	$('.mep_globalNav > .tab-item').on('click', function(){
		pleaseWait();
	});
});

