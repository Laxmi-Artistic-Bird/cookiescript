<?php
$apiUrl = 'https://app.entraenlared.com/api/getCookieContent';
$domain = $_GET['domain'];
$bearerToken = 'EoWTVPTINckdaFLQ94laYymw9UZVcvLaFj9RklKb';

// Construct the API URL
$fullUrl = "$apiUrl?domain=$domain";

// Initialize cURL session  
$ch = curl_init($fullUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $bearerToken,
    'Accept-Language: en'
]);

// Execute cURL session
$response = curl_exec($ch);

$resp = json_decode($response);
// Check for cURL errors
if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
}

// Close cURL session
curl_close($ch);
echo json_encode($resp);

?>
