<?php
	if (isset($_GET['path'])) {
		$url = $_GET['path'];		
		$ch = curl_init();
		curl_setopt($ch, constant("CURLOPT_" . "URL"), $url);
		// curl_setopt($ch, constant("CURLOPT_" . "POST"), true);
		// curl_setopt($ch, constant("CURLOPT_" . "POSTFIELDS"), $params);
		curl_setopt($ch, constant("CURLOPT_" . "RETURNTRANSFER"), true);
		$output = curl_exec($ch);
		// $info = curl_getinfo($ch);
		curl_close($ch);

		echo $output;
	}
?>