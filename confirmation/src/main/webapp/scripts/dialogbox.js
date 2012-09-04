function confirm(e, opts) {
	e.preventDefault();
	var buttons = {};
	var $dialog = $('<div id="dialogBox"><span class="message" style="float:left; margin:0 7px 20px 0;"></span></div>').appendTo('body');
	if ($.isPlainObject(opts)) {
		$dialog.attr('title', opts.title);
		$dialog.find('span.message').text(opts.message);
		buttons[opts.confirm.label] = function() {
			$(this).dialog('close');
			opts.confirm.action();
		};
	} else if (typeof(opts) == 'string') {
		$dialog.find('span.message').text(opts);
	}
	buttons['Cancel'] = function() {
		$(this).dialog('close');
	};
	
	$dialog.dialog({
			resizable: false,
			modal:true,
			buttons: buttons,
			close: function(e) {
				$(this).dialog('destroy');
				$('#dialogBox').remove();
			}
		});
	return false;
}

function alert(e, opts) {
	var $dialog = $('<div id="dialogBox"><span class="message" style="float:left; margin:0 7px 20px 0;"></span></div>').appendTo('body');
	var buttons = {};
	if ($.isPlainObject(opts)) {
		$dialog.attr('title', opts.title);
		$dialog.find('span.message').text(opts.message);
		buttons[opts.confirm.label] = function() {
			$(this).dialog('close');
			opts.confirm.action();
		};
		
	} else if (typeof(opts) == 'string') {
		$dialog.find('span.message').text(opts);
	}
	
	$dialog.dialog({
		resizable: false,
		modal:true,
		buttons: buttons,
		close: function(e) {
			$(this).dialog('destroy');
			$('#dialogBox').remove();
		}
	});
	
}