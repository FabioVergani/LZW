function _compress(s, l, f){

 const m=[];
 var A=Object.create(null),B=Object.create(null),r,t='',v=0,offset=0,k=2,v=2,j=3;

 for(let p,q,i=0,l=s.length;i<l;++i){
	p=s.charAt(i);
	if(!(p in A)){A[p]=j++;B[p]=true;};
	q=t+p;
	if(q in A){
	 t=q;
	}else{
	 let n=t.charCodeAt(0);
	 if(t in B){
		if(n<256){

		 for(let i=0;i<k;i++){v=v<<1;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++}};//macro#5
		 r=n;
		 for(let i=0;i<8;i++){v=v<<1|r&1;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++};r=r>>1};//macro#4

		}else{

		 r=1;
		 for(let i=0;i<k;i++){v=v<<1|r;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++};r=0};//macro#3
		 r=n;
		 for(let i=0;i<16;i++){v=v<<1|r&1;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++};r=r>>1};//macro#2

		};

		v--;if(v==0){v=Math.pow(2,k++)};
		delete B[t];

	 }else{

		r=A[t];
		for(let i=0;i<k;i++){v=v<<1|r&1;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++};r=r>>1};//macro#1

	 };

	 v--;if(v==0){v=Math.pow(2,k++)};
	 A[q]=j++;
	 t=String(p);
	};
 };
//#
 if(t !==''){
	let n=t.charCodeAt(0);
	if(t in B){
	 if(n< 256){

		for(let i=0;i<k;i++){v=v<<1;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++}};//macro#5
		r=n;
		for(let i=0;i<8;i++){v=v<<1|r&1;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++};r=r>>1};//macro#4

	 }else{

		r=1;
		for(let i=0;i<k;i++){v=v<<1|r;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++};r=0};//macro#3
		r=n;
		for(let i=0;i<16;i++){v=v<<1|r&1;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++};r=r>>1};//macro#2

	 };
	 v--;if(v==0){v=Math.pow(2,k++)};
	 delete B[t];

	}else{

	 r=A[t];
	 for(let i=0;i<k;i++){v=v<<1|r&1;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++};r=r>>1};//macro#1

	};
	v--;if(v==0){v=Math.pow(2,k++)};
 };

 r=2;
 for(let i=0;i<k;i++){v=v<<1|r&1;if(offset==l-1){offset=0;m.push(f(v));v=0}else{offset++};r=r>>1};//macro#1

 while(true){v=v<<1;if(offset==l-1){m.push(f(v));break}else{offset++}};
 return m.join('');
}