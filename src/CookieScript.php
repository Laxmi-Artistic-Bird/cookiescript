<?php

namespace Artisticbird\Cookiescript;

class CookieScript {
    public function render() {
      
         // Check if the Laravel Application class exists
         if (class_exists('\Illuminate\Foundation\Application')) {
            // We're in Laravel, use asset() for asset URLs
            echo '<link rel="stylesheet" href="'.asset('cookiesscript/style.css').'">';
            echo '<script src="'.asset('cookiesscript/jquery.js').'"></script>';
            echo '<script src="'.asset('cookiesscript/cookie.js').'"></script>';
            echo '<script> const platformtype="Laravel"</script>';
        } else {
            // We're not in Laravel, use relative paths for assets
            echo '<link rel="stylesheet" href="/vendor/artisticbird/cookiescript/src/public/cookiesscript/style.css">';
            echo '<script src="/vendor/artisticbird/cookiescript/src/public/cookiesscript/jquery.js"></script>';
            echo '<script src="/vendor/artisticbird/cookiescript/src/public/cookiesscript/cookie.js"></script>';
            echo '<script> const platformtype="PHP"</script>';
            include 'cookie.php';
        }
        
    }
}
?>