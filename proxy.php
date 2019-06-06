<?php
	if (isset($_GET['path'])) {
		$url = $_GET['path'];
		// $redirect_uri = $_POST['redirect_uri'];
		// $TOKENURL = "https://api.xing.com/auth/oauth2/token";
		
		// $params = array(
		// 	"client_id" 	=> "125f2d865de16957c0e1",
		// 	"client_secret" => "39839d0d68f571a18cf87338773d9c2751bb2510",
		// 	"redirect_uri" 	=> $redirect_uri,
		// 	"grant_type" 	=> "authorization_code",
		// 	"code" 			=> $code,
		// );

		$ch = curl_init();
		curl_setopt($ch, constant("CURLOPT_" . "URL"), $url);
		// curl_setopt($ch, constant("CURLOPT_" . "POST"), true);
		// curl_setopt($ch, constant("CURLOPT_" . "POSTFIELDS"), $params);
		curl_setopt($ch, constant("CURLOPT_" . "RETURNTRANSFER"), true);
		$output = curl_exec($ch);
		// $info = curl_getinfo($ch);
		curl_close($ch);
//		if ($info['http_code'] === 200) {
//			header('Content-Type: ' . $info['content_type']);
//			return $output;
//		} else {
//			return 'An error happened';
//		}
		echo $output;
	}
?>