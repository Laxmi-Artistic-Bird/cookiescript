<?php

$domain = $_SERVER['HTTP_HOST'];
// Set 'cookiesRejected' cookie to false by default if it's not already set
if (!isset($_COOKIE['cookiesRejected'])) {
    setcookie('cookiesRejected', 'false', time() + 3600, '/', '.'.$domain, isset($_SERVER['HTTPS']), true);
    $consent_value = 'consentid:SFdTT1lNNkdpQ2J5OUE4bXY1WWZOWHo1cDlnbExaSFg,necesario:' . 'true' . ',rendimiento:' . ($rendimiento??'') . ',marketing:' . ($marketing??'');
    setcookie('aeon-consent', $consent_value, time() + (86400 * 30), '/', '.'.$domain, isset($_SERVER['HTTPS']), true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo 'Reached before processing JSON data';
    $json_data = file_get_contents('php://input');
    $consent_data = json_decode($json_data, true);
    $necesario = $consent_data['Necesario'] ? 'true' : 'false'; // "true" or "false"
    $rendimiento = $consent_data['Rendimiento'] ? 'true' : 'false'; // "true" or "false"
    $marketing = $consent_data['Marketing'] ? 'true' : 'false'; 


    $consent_value = 'consentid:SFdTT1lNNkdpQ2J5OUE4bXY1WWZOWHo1cDlnbExaSFg,necesario:' . 'true' . ',rendimiento:' . ($rendimiento) . ',marketing:' . ($marketing);
    setcookie('aeon-consent', $consent_value, time() + (86400 * 30), '/', '.'.$domain, isset($_SERVER['HTTPS']), true);
  

    // print_r($consent_data);
    if (isset($_POST['cookiesRejected']) && $_POST['cookiesRejected'] === 'true') {
       
        setcookie('cookiesRejected', 'true', time() + 3600, '/', '.'.$domain, isset($_SERVER['HTTPS']), true);

       // echo 'Cookies Rejected successfully.';
    } else if (isset($_POST['cookiesRejected']) && $_POST['cookiesRejected'] === 'false'){

     
        // Update the 'cookiesRejected' cookie value to true
        setcookie('cookiesRejected', 'false', time() + 3600, '/', '.'.$domain, isset($_SERVER['HTTPS']), true);

    }
    exit;
}

?>