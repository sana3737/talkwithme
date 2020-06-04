<?php
$name = filter_input(INPUT_POST, 'name');
$kana = filter_input(INPUT_POST, 'kana');
$tel = filter_input(INPUT_POST, 'tel');
$email = filter_input(INPUT_POST, 'email');
$free= filter_input(INPUT_POST, 'free');

$host = '********';
$database = '******';
$user = '*****';
$password = '*****';

$link = mysqli_connect($host, $user, $password, $database);
mysqli_set_charset ($link , "utf-8");


$sql = "INSERT INTO reservations (`name`, `kana`,`tel`, `email`, `free`) VALUES (?, ?, ?, ?,?)";
$stmt = mysqli_prepare($link, $sql);
mysqli_stmt_bind_param($stmt, "sssss", $name, $kana, $tel, $email, $free);

if(mysqli_stmt_execute($stmt)==TRUE){
	echo "送信完了しました。\n";

}else{
	echo "データ登録際にエラーが発生しました。\n";
}
mysqli_close($link);

mb_language('ja');
mb_internal_encoding( "utf-8" );
 
//HTMLエンティティ変換
$sendName1 = htmlspecialchars($name, ENT_QUOTES);
$sendKana = htmlspecialchars($kana, ENT_QUOTES);
$sendTel = htmlspecialchars($tel,ENT_QUOTES);
$sendEmail = htmlspecialchars($email, ENT_QUOTES);
$sendFree1 = htmlspecialchars($free, ENT_QUOTES);
 
$sendName = mb_convert_kana($sendName1,"sKV");      //「名前」半角カナ→全角カナ
$sendFree = mb_convert_kana($sendFree1,"sKV");    //「メッセージ」半角カナ→全角カナ
if(funcContactAddress($sendName,$sendKana,$sendTel,$sendEmail,$sendFree)==1){
	echo "自動メールOK";
}else{
	echo "自動メールNO";
}

function funcContactAddress($name,$kana,$tel,$email,$free){  
	echo $email;
    //ヘッダー用変数
    $mailto = $email;       //送信先メールアドレス
    $subject = "talkwithmeへのお問い合わせありがとうございます。";   //メール件名
    //本文
    $content="talkwithmeへのお問い合わせフォームから以下の内容で受け付けました。\n"."【お名前】： ".$name."\n"."【ふりがな】： ".$kana."\n"."【メールアドレス】： ".$email."\n"."【携帯電話番号】： ".$tel."\n"."【メッセージ】： ".$free."\n\nお問い合わせありがとうございました。\n3日以内にご連絡します。あなたに会えることを楽しみにしております。\n\nSAKIより";
    $mailfrom="From:" .mb_encode_mimeheader("talkwithme管理者SAKI");
     
    if(mb_send_mail($mailto,$subject,$content,$mailfrom) == true){
        $contactFlag = 1;
    }else{
        $contactFlag = 0;
    }
    return $contactFlag;
};
?>
