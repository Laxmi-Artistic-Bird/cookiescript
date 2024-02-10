<?php

$host = $_SERVER['HTTP_HOST'];

$url = $host;

// Remove "http://", "https://", and "www." using preg_replace
$host = preg_replace('/^(https?:\/\/)?(www\.)?/', '', $url);

// Trim trailing slashes
$domain = rtrim($host, '/');


// print_r($domain);
// exit;
$consentType = $_POST['consentType'];
$Type = $_POST['Type'];

// Your API endpoint
$apiUrl = "https://app.entraenlared.com/api/storeCookieContent";

// API data
$consentData = array(
    //"domain" => "www.geeksforgeeks.org",
    "domain" => $domain,
    "type" => $Type,
    "data" => $consentType
);

// print_r($consentData);
// exit;

// cURL request to API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($consentData));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "Accept-Language: en",
    "Authorization: Bearer EoWTVPTINckdaFLQ94laYymw9UZVcvLaFj9RklKb" // Add your API key here
));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
// print_r($response);
// Process the API response
$responseArray = json_decode($response, true); // Decode the JSON response

// Check if the response array is not empty
if (!empty($responseArray['data'])) {
  
    // Update data.txt with the API response
    $dataFilePath = "data.txt";
   
    if (file_put_contents($dataFilePath, $responseArray['data']) !== false) {
        echo "Data was successfully written to $dataFilePath.";
    } else {
        echo "Failed to write data to $dataFilePath.";
    }
    
    echo "Data has been updated successfully.";
} else {
    echo "Response array is empty. Data not updated.";
}
?>

