$.fn.corner = function(o)
{
	o = o || "";
	var width = parseInt((o.match(/(\d+)px/)||[])[1]) || 10;
	var fx = (o.match(/round|bevel|fold|notch/)||["round"])[0];
	var opts = {
		TL:		/top|tl/i.test(o), 		TR:		/top|tr/i.test(o),
		BL:		/bottom|bl/i.test(o),	BR:		/bottom|br/i.test(o)//,
	};
	if ( !opts.TL && !opts.TR && !opts.BL && !opts.BR )
		opts = { TL:1, TR:1, BL:1, BR:1 };
	var strip = document.createElement("div");
	strip.style.overflow = "hidden";
	strip.style.height = "1px";
	strip.style.backgroundColor = "transparent";
	strip.style.borderStyle = "solid";
	return this.each(function(){
		var pad = {
			T: parseInt($.css(this,"paddingTop"))||0,
			R: parseInt($.css(this,"paddingRight"))||0,
			B: parseInt($.css(this,"paddingBottom"))||0,
			L: parseInt($.css(this,"paddingLeft"))||0
		};
		strip.style.borderColor = "#ffffff";
		if ( opts.TL || opts.TR ) {
			strip.style.borderStyle = "none "+(opts.TR?"solid":"none")+" none "+(opts.TL?"solid":"none");
			var t=document.createElement("div");
			t.style.margin = "-"+pad.T+"px -"+pad.R+"px "+(pad.T-width)+"px -"+pad.L+"px";
			t.style.backgroundColor = "transparent";
			for ( var i=0; i < width; i++ ) {
				var w = fx=="round" ? Math.round(width*(1-Math.cos(Math.asin(i/width)))) : i+1;
				var e = strip.cloneNode(false);
				e.style.borderWidth = "0 "+(opts.TR?w:0)+"px 0 "+(opts.TL?w:0)+"px";
				t.insertBefore(e, t.firstChild);
			}
			this.insertBefore(t, this.firstChild);
		}
		if ( opts.BL || opts.BR ) {
			strip.style.borderStyle = "none "+(opts.BR?"solid":"none")+" none "+(opts.BL?"solid":"none");
			var b=document.createElement("div");
			b.style.margin = (pad.B-width)+"px -"+pad.R+"px -"+pad.B+"px -"+pad.L+"px";
			b.style.backgroundColor = "transparent";
			for ( var i=0; i < width; i++ ) {
				var w = fx=="round" ? Math.round(width*(1-Math.cos(Math.asin(i/width)))) : i+1;
				var e = strip.cloneNode(false);
				e.style.borderWidth = "0 "+(opts.BR?w:0)+"px 0 "+(opts.BL?w:0)+"px";
				b.appendChild(e);
			}
			this.appendChild(b);
		}
	});
};
