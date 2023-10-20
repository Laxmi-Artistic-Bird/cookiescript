
<?php
if (class_exists('\Illuminate\Foundation\Application')) {
    $mainurl = '/cookies/';
 }else{
    $mainurl='/vendor/artisticbird/cookiescript/src/public/cookies/';
 }

$domain = $_SERVER['HTTP_HOST'];
if (!isset($_COOKIE['cookiesRejected'])) {
     setcookie('cookiesRejected', 'false', time() + 3600, '/', '.'.$domain, isset($_SERVER['HTTPS']), true);
     $consent_value = 'consentid:SFdTT1lNNkdpQ2J5OUE4bXY1WWZOWHo1cDlnbExaSFg,necesario:' . 'true' . ',rendimiento:' . ($rendimiento??'') . ',marketing:' . ($marketing??'');
     setcookie('aeon-consent', $consent_value, time() + (86400 * 30), '/', '.'.$domain, isset($_SERVER['HTTPS']), true);
}

?>

<?php if (isset($_COOKIE['cookiesRejected']) && $_COOKIE['cookiesRejected'] === 'false') { ?>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5CLDPS7');</script>
<?php } ?>

<!-- <link rel="stylesheet" href="custom/style.css"> -->
<div id="gdprcript_injected"><a></a>
<div class="wrap" style=""><a>
        <div id="gdprcript_header">Este sitio web utiliza cookies</div>
    </a>
    <div id="gdprcript_description"><a>
            <p class="mb-0"
                data-cs-i18n-read="We use cookies to improve user experience. Choose what cookies you allow us to use. You can read more about our Cookie Policy in our">
                Esta cookie está asociada con Google Analytics y se utiliza para la personalización de anuncios.
                Elige qué cookies nos permites usar. Puedes leer más<b> <u><a 
                            href="/politica-de-privacidad" class="mr-2">Política de Privacidad</a><a
                            href="/politica-de-cookies">Politica-de-Cookies</a>

                        <!-- cookies -->
                    </u></b></p>
        </a><b><u></u></b>
       
    </div>
    <div id="gdprcript_checkboxs">

    </div>
    <div id="gdprcript_buttons">
      
            <button class="btn btn-primary decllinecookies" name="acceptButton" id="acceptButton">Aceptar todo</button>
            <button class="btn btn-primary decllinecookies" name="saveCookieButton" id="saveCookieButton" >Guardar Mis Preferencias</button>
            <button class="btn btn-primary acceptcookies" name="rejectButton" id="rejectButton">Rechazar Cookies</button>
    
    </div>
    <div id="gdprcript_close" tabindex="0" role="button">×</div>
    <div id="gdprcript_manage_wrap" tabindex="0" role="button">
        <div id="gdprcript_manage">
            <span class="show">Mostrar detalles</span><span style="display: none" class="hide">Ocultar detalles
            </span>
        </div>
    </div>
    <div id="gdprcript_cookietablewrap" style="display: none;">
        <div id="gdprcript_maintabs" data-cs-maintabs="gdprcript">
            <div id="gdprcript_declaration" class="gdprscript_active" data-maintab="declaration">Declaración de
                cookies </div>
            <div id="gdprcript_aboutcookies" data-maintab="aboutcookies">Acerca de las cookies </div>
        </div>
        <div id="gdprcript_tabscontent">
            <div id="gdprcript_declarationwrap">
                <div id="gdprcript_categories" data-cs-tabs="gdprcript">
                </div>
                <div class="gdprcript_report_strict" id="gdprcript_report_strict">
                </div>
            </div>
            <div id="gdprcript_aboutcookieswrap" style="display: none;">Las cookies son pequeños archivos de texto
                que los sitios web que visita colocan en su ordenador. Los sitios web utilizan cookies para ayudar a
                los usuarios a navegar de manera eficiente y realizar ciertas funciones. Las cookies que se
                requieren para que el sitio web funcione correctamente se pueden configurar sin su permiso. Todas
                las demás cookies deben aprobarse antes de que se puedan configurar en el navegador. Puede cambiar
                su consentimiento para el uso de cookies en cualquier momento en nuestra <a href="/cookies">Política
                    de cookies</a>. </div>
        </div>
    </div>
    <div style="font-size:9px; text-align:right">Cookie creada por <a href="https://entraenlared.com/"
            target="_blank" style="color:white">Entraenlared</a></div>
</div>
<div id="gdprcript_badge" style="display:none;">

    <div id="gdprcript_badgeimage"><img src="<?= $mainurl.'cookies.svg';?>" alt=" Cookie settings" srcset="" width="30px"
            height="30px" class="img-fluid"></div>
    <div id="gdprcript_badgetext">Configuración de cookies</div>
</div>
</div>

