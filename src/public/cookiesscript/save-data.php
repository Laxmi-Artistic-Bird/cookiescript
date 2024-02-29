<?php
$request_url = $_SERVER['REQUEST_URI'];
// echo $request_url;
// exit;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the POST data sent from JavaScript
    $postData = file_get_contents("php://input");
    
    // Decode the JSON data
    $dataToSave = json_decode($postData, true);
    
    if ($dataToSave !== null) {
        // Open the file for writing (append mode)
        $filename = 'data.txt';
        $file = fopen($filename, 'w');
        
        // Loop through the data and write each entry to the file
        // foreach ($dataToSave as $entry) {
            fwrite($file, json_encode($dataToSave) . PHP_EOL);
        // }
        
        // Close the file
        fclose($file);
        
        // Send a success response
        echo json_encode(['success' => true]);
    } else {
        // Send an error response
        echo json_encode(['error' => 'Invalid data']);
    }
} else {
    // Send an error response for unsupported request method
    echo json_encode(['error' => 'Unsupported request method']);
}
?>

