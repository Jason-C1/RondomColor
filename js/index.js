$(function() {
	game = {
		colors:[],

		//color : {h:0,s:100,l:50,r:0,g:0,b:0,},
		getRandomColor:function(number){
			number=number||1;
			var hsl = this.randomColor();
			return game.HSLtoHex([hsl.h,hsl.s,hsl.l]);
		},
		randomColor:function(){
			var color={};
			color.h=Math.floor(Math.random()*361);
			color.s=100;//饱和度
			color.l=50;//亮度
			return color;
		},
//		getRandomColor:function(number=1){
//			for (var i=0;i<number;i++) {
//				var hsl = this.randomColor();
//				game.colors[i]=game.HSLtoHex(hsl.h,hsl.s,hsl.l);
//			}
//		},
		//HSLtoRGBtoHex
		HSLtoRGB:function(hsl){
			//h=[0,360],s=[0,100],l=[0,100]
			h=hsl[0],s=hsl[1]/100,l=hsl[2]/100;
			var q;
			if (l<0.5) {
				q=l*(1+s);
			} else{
				q=l+s-(l*s);
			}
			var p=(2*l-q)*255;
			q*=255;
			var rgb=[];
			var t=[h+120,h,h-120];
			
			for(var i=0;i<3;i++){
				if(t[i]<0)t[i]+=360;
				if(t[i]>360)t[i]-=360;
				if(t[i]<60){
					rgb[i]=p+((q-p)*t[i]/60);
				}else if(t[i]>=60&&t[i]<180){
					rgb[i]=q;
				}else if(t[i]>=180&&t[i]<240){
					rgb[i]=p+((q-p)*(240-t[i])/60);
				}else{
					rgb[i]=p;
				}
				rgb[i]=Math.floor(rgb[i]+0.5);
			}
			return rgb;
		},
		RGBtoHSL:function(rgb) {
			r = rgb[0]/255,g = rgb[1]/255,b = rgb[2]/255;
			var max = Math.max(r, g, b), min = Math.min(r, g, b);
			var h, s, l = (max + min) / 2;
			if (max == min){ 
		        h = s = 0; // achromatic
		    } else {
		    	var d = max - min;
		    	s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		    	switch(max) {
		    		case r: h = (g - b) / d + (g < b ? 6 : 0); break;
		    		case g: h = (b - r) / d + 2; break;
		    		case b: h = (r - g) / d + 4; break;
		    	}
		    	h /= 6;
		    }
		    return [parseInt(h*360+0.5), parseInt(s*100+0.5), parseInt(l*100+0.5)];
		},
		RGBtoHex:function(rgb){
			//rgb=([0,255],[0,255],[0,255]);
			var hex="";
			for (var i=0;i<3;i++) {
				rgb[i]=parseInt(rgb[i]);
				if(rgb[i]<16){
					hex+="0";
				}
				hex+=rgb[i].toString(16);
			}
			return hex.toUpperCase();
		},
		HextoRGB:function(hex){
			hex=hex.replace(/#/g,"");
			var rgb=[00,00,00];
			step=(hex.length<6)?1:2;
			for (var i=0;i<3;i++) {
				rgb[i]=parseInt(hex.slice(i*step,i*step+step),16);
				rgb[i]*=(hex.length<6)?17:1;
			}
			return rgb;
		},
		HSLtoHex:function(hsl){
			return this.RGBtoHex(this.HSLtoRGB(hsl));
		},
	}
//色调CGFloat hue = ( arc4random() % 256 / 256.0 ); // 0.0 to 1.0
//饱和度CGFloat saturation = ( arc4random() % 128 / 256.0 ) + 0.5; // 0.5 to 1.0, away from white
//亮度CGFloat brightness = ( arc4random() % 128 / 256.0 ) + 0.5; // 0.5 to 1.0, away from black
//UIColor *color = [UIColor colorWithHue:hue saturation:saturation brightness:brightness alpha:1.0];
for (var i=0;i<10;i++) {

	var color = "#"+game.getRandomColor();
	$(".box").append($("<div class='colorCard'></div>").css("background-color",color));
}
function setColor(color){
	$(".showcolor").css("background-color",color);

}
$("#btn-rgb").on('click',function(){
	r = $("#rgb-r").val()||255;
	g = $("#rgb-g").val()||255;
	b = $("#rgb-b").val()||255;
	hex=game.RGBtoHex([r,g,b]);
	$("#hex").val(hex);
	[h,s,l]=game.RGBtoHSL([r,g,b]);
	$("#hsl-h").val(h);
	$("#hsl-s").val(s);
	$("#hsl-l").val(l);
	setColor("#"+hex);
});  
$("#btn-hex").on('click',function(){
	hex = $("#hex").val()||"FFFFFF";
	[r,g,b]=game.HextoRGB(hex);
	$("#rgb-r").val(r);
	$("#rgb-g").val(g);
	$("#rgb-b").val(b);
	[h,s,l]=game.RGBtoHSL([r,g,b]);
	$("#hsl-h").val(h);
	$("#hsl-s").val(s);
	$("#hsl-l").val(l);
	setColor("#"+hex);
});  
$("#btn-hsl").on('click',function(){
	h = $("#hsl-h").val()||360;
	s = $("#hsl-s").val()||100;
	l = $("#hsl-l").val()||100;
	[r,g,b]=game.HSLtoRGB([h,s,l]);
	$("#rgb-r").val(r);
	$("#rgb-g").val(g);
	$("#rgb-b").val(b);
	hex=game.RGBtoHex([r,g,b]);
	$("#hex").val(hex);
	setColor("#"+hex);
});  

});