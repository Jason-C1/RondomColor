$(function() {
	var game = {
		colors:[],
		//color : {h:0,s:100,l:50,r:0,g:0,b:0,},
		randomColor:function(){
			var color={};
			color.h=Math.floor(Math.random()*361);
			color.s=100;//饱和度
			color.l=50;//亮度
			return color;
		},
		HSLtoRGB:function(h,s,l){
			//h=[0,360],s=[0,100],l=[0,100]
			s/=100;
			l/=100;
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
		/*
			toRGB:function(h,s,l){
			var hk=h/360;
			var q;
			if (l<0.5) {
				q=l*(1+s);
			} else{
				q=l+s-(l*s);
			}
			var p=2*l-q;
			q*=255;
			p*=255;
			var rgb=[];
			var t=[hk+1/3,hk,hk-1/3];
			for(var i=0;i<3;i++){
				console.log(t[i]);
				if(t[i]<0)t[i]+=1.0;
				if(t[i]>1)t[i]-=1.0;
				if(t[i]*6<1){
					rgb[i]=p+((q-p)*6*t[i]);
				}else if(t[i]*6>=1&&t[i]*2<1){
					rgb[i]=q;
				}else if(t[i]*2>=1&&t[i]*3<2){
					rgb[i]=p+((q-p)*6*(t[i]-2/3));
				}else{
					rgb[i]=p;
				}
				rgb[i]=Math.floor(rgb[i]);
			}
			console.log(t);
			return rgb;
		},
		*/
		RGBtoHex:function(rgb){
			//rgb=([0,255],[0,255],[0,255]);
			var hex="";
			for (var i=0;i<3;i++) {
				if(rgb[i]<16){
					hex+="0";
				}
				hex+=rgb[i].toString(16);
			}
			return "#"+hex;
		},
		HSLtoHex:function(h,s,l){
			return this.RGBtoHex(this.HSLtoRGB(h,s,l));
		},
		getColor:function(number=1){
			var hsl = this.randomColor();
			return game.HSLtoHex(hsl.h,hsl.s,hsl.l);
			
		},
//		getColor:function(number=1){
//			for (var i=0;i<number;i++) {
//				var hsl = this.randomColor();
//				game.colors[i]=game.HSLtoHex(hsl.h,hsl.s,hsl.l);
//			}
//		},
	}
//色调CGFloat hue = ( arc4random() % 256 / 256.0 ); // 0.0 to 1.0
//饱和度CGFloat saturation = ( arc4random() % 128 / 256.0 ) + 0.5; // 0.5 to 1.0, away from white
//亮度CGFloat brightness = ( arc4random() % 128 / 256.0 ) + 0.5; // 0.5 to 1.0, away from black
//UIColor *color = [UIColor colorWithHue:hue saturation:saturation brightness:brightness alpha:1.0];
	for (var i=0;i<10;i++) {
		var color = game.getColor();
		console.log(game.getColor());
		$(".box").append($("<div class='colorCard'></div>").css("background-color",color));
	}
	
});