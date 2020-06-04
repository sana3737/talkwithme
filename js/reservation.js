var query = {};
$(function(){
	$("#send").click(reservation);
});
function reservation(){
    $("#send").text('送信中');
    $("#send").attr('disabled', true);
	query["name"] = $("#name").val();
	query["kana"] = $("#kana").val();
	query["tel"] = $("#tel").val();
	query["email"] = $("#email").val();
	query["confirmEmail"] = $("#confirmEmail").val();
	query["free"] = $("#free").val();
	$.each(query, function(index,elem){
		elem=elem.replace(/[ 　/\r/\n/\t]/gim,"");
	});
	if(check(query)){
		$.post("./connect.php",query,function(res){
			$.each(["name","kana","tel","email","confirmEmail","free"],function(){
				$("#"+this).val("");
			});
			$("#send").text('メッセージを送信する');
			$("#status").append("<p style='font-size: 10px; text-align: center;'>"+res+"</p>");
		})
	}
}

function check(obj){
	var error="";
	var errorFlag = 0;
	$.each(obj, function(index,elem){
	  	if(index==="name"){
	  		if(emptyCheck(elem)){
	  			error=error+"名前が空です。\n";
	  			errorFlag=1;
	  		}else if(!elem.match(/^[ぁ-んァ-ヶー一-龠]+$/)){
	  			error=error+"名前にひらがな、カタカナ、漢字以外の文字が入っています。\n";
	  			errorFlag=1;
	  		}	
	  		}
	  	if(index==="kana"){
	  		if(emptyCheck(elem)){
	  			error=error+"ふりがなが空です。\n";
	  			errorFlag=1;
	  		}else if(!elem.match(/^[ぁ-んー一-]+$/)){
	  			error=error+"ふりがなにひらがな以外の文字が入っています。\n";
	  			errorFlag=1;
	  		}	
	  		}
	  	if(index==="tel"){
	  		elem = elem.replace(/[━.*‐.*―.*－.*\–.*ー.*\-]/gi,'');
	  		if(emptyCheck(elem)){
	  			error=error+"携帯電話番号が空です。\n";
	  			errorFlag=1;
	  		}else if(!elem.match(/^[0-9]{11}$/)){
	  			error=error+"携帯電話番号は半角数字のみです。\n";
	  			errorFlag=1;
	  		}	
	  	}
	  	if(index==="email"){
	  		var emailValue=elem;
	  		if(emptyCheck(elem)){
	  			error=error+"メールアドレスが空です。\n";
	  			errorFlag=1;
	  		}else if(!elem.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
	  			error=error+"メールアドレスが正しくありません。\n";
	  			errorFlag=1;
	  		}	
	  	}
	  	if(index==="confirmEmail"){
	  		if(emptyCheck(elem)){
	  			error=error+"確認用メールアドレスが空です。\n";
	  			errorFlag=1;
	  		}else if(obj["email"]!=""){
				if(obj["email"]!==elem){
		  			error=error+"確認用メールアドレスとメールアドレスが同じでありません。\n";
		  			errorFlag=1;
	  			}
	  		}	
	  	}
	  	if(index==="free"){
	  		if(emptyCheck(elem)){
	  			error=error+"希望・問い合わせ欄が空です。\n";
	  			errorFlag=1;
	  		}else if(elem.match(/[<(.*)>.*<\/\1>]/)){
	  			error=error+"HTMLコードが入っています。\n";
	  			errorFlag=1;
	  		}	
	  	}
  	});
	if(errorFlag===1){
	  	alert("入力エラー\n"+error);
	  	return false;
  	}
  	return true;
}
	 

function emptyCheck(e){
	 if(e == ""){	
	 	return true;
  }
  return false;
}