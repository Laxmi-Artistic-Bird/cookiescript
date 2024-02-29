
document.addEventListener('DOMContentLoaded', function () {

  var fileData;
  var apiUrl = '';

  if (platformtype == 'Laravel') {
    // We're in Laravel, use Laravel's route function to generate the URL
    apiUrl = '/cookiesscript/'; // Define the named route in Laravel
  } else {
    // We're not in Laravel, use a relative path for the URL
    apiUrl = '/vendor/artisticbird/cookiescript/src/public/cookiesscript/';
  }

 

  Customcookies();

  function Customcookies() {
    var cookies = document.cookie.split(';').map(cookie => cookie.trim());
    var consentObject = {};

    cookies.forEach(cookie => {
      if (cookie.startsWith('aeon-consent=')) {
        var consentString = cookie.substring('aeon-consent='.length); // Extract only the JSON string
        try {
          var jsonStringStartIndex = consentString.indexOf('{');
          if (jsonStringStartIndex !== -1) {
            consentString = consentString.substring(jsonStringStartIndex);
          }

          consentObject = JSON.parse(decodeURIComponent(consentString));
        } catch (error) {
          console.error('Error parsing aeon-consent cookie:', error);
        }
      }
    });

    var existingGtmScript = document.querySelector('script[src*="googletagmanager.com/gtm.js"]');
    var gtmId='';
    if (existingGtmScript) {
      gtmId = getGtmIdFromScriptSource(existingGtmScript.src);
    }

    if (consentObject.Rendimiento === true && consentObject.Marketing === true) {
      // console.log('Rendimiento, Marketing, and Necesario consent given. Google Analytics enabled.');

      window['ga-disable-' + gtmId] = false;
      window['ga-disable_XDNJGXBN4C'] = false;
      window['ga-disable_gcl_au'] = false;
      window['ga-disable_ga'] = false;
      window['ga-disable_gat_UA-12959177-5'] = false;
      window['ga-disable_gid'] = false;
      window['ga-disable-UA-12959177-5'] = false;
    } else {
      window['ga-disable-' + gtmId] = true;
      window['ga-disable_gcl_au'] = true;
      window['ga-disable_ga'] = true;
      window['ga-disable_gat_UA-12959177-5'] = true;
      window['ga-disable_gid'] = true;
      window['ga-disable-GTM-5CLDPS7'] = true;
      window['ga-disable-UA-12959177-5'] = true;
      // console.log('Rendimiento, Marketing, or Necesario consent not given. Google Analytics blocked.');
    }
  }


  function getGtmIdFromScriptSource(scriptSource) {
    var match = scriptSource.match(/id=([a-zA-Z0-9\-_]+)/);
    return match ? match[1] : null;
  }

  defaultChecker();

  function defaultChecker() {
    var consentObject = {};
    consentObject = getConsentFromCookie();


    if (consentObject.Rendimiento !== true && consentObject.Marketing !== true) {
      consentType = {
        'Rendimiento': false,
        'Marketing': false,
        'Necesario': true
      };
      setAeon(consentType);
    }
  }


  function checkCookie(cookieName) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName + '=') === 0) {
        // Cookie exists
        return true;
      }
    }
    // Cookie doesn't exist
    return false;
  }

  var cookieName = 'consent';
  if (checkCookie(cookieName)) {
    showbadge();
  }


  fetch(apiUrl + 'data.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {

      var jsonData = JSON.parse(data);

      consentDatas = getConsentFromCookie();
      generateCheckboxes(jsonData, consentDatas);
      categorizeAndDisplayCookies(jsonData);
      fileData = jsonData;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });


  var manageGDscriptbtn = document.getElementById("gdprcript_manage");
  var gdprcript_badgetbtn = document.getElementById("gdprcript_badge");
  var acceptButton = document.getElementById("acceptButton");
  var rejectButton = document.getElementById("rejectButton");
  var saveCookieButton = document.getElementById("saveCookieButton");
  var closebtn = document.getElementById("gdprcript_close");


  manageGDscriptbtn.addEventListener("click", manageGDscript);
  gdprcript_badgetbtn.addEventListener("click", hidebadge);
  closebtn.addEventListener("click", showbadge);
  acceptButton.addEventListener("click", acceptCookies);
  rejectButton.addEventListener("click", rejectCookies);
  saveCookieButton.addEventListener("click", saveCookies);

  // Get all div elements inside '#gdprcript_maintabs'
  const mainTabs = document.querySelectorAll('#gdprcript_maintabs>div');

  // Attach a click event listener to each div element
  mainTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove 'gdprscript_active' class from all div elements inside '#gdprcript_maintabs'
      mainTabs.forEach(tab => {
        tab.classList.remove('gdprscript_active');
      });

      // Add 'gdprscript_active' class to the clicked div element
      this.classList.add('gdprscript_active');

      // Get the 'data-maintab' attribute value from the clicked div element
      const maintab = this.getAttribute('data-maintab');

      // Hide all div elements inside '#gdprcript_tabscontent'
      const tabContents = document.querySelectorAll('#gdprcript_tabscontent>div');
      tabContents.forEach(content => {
        content.style.display = 'none';
      });

      // Show the specific tab content based on the 'data-maintab' attribute value
      const specificTab = document.querySelector(`#gdprcript_tabscontent #gdprcript_${maintab}wrap`);
      specificTab.style.display = 'block';
    });
  });


  function generateCheckboxes(data, consentDatas) {

    let necesarioChecked = false; // Track if the "Necessary" checkbox is checked

    const checkboxContainer = document.getElementById('gdprcript_checkboxs');
    let uniqueCategories = new Set();
    data.forEach((cookie) => {

      const category = cookie.category || 'Uncategorized';

      // Only create checkboxes for unique categories
      if (!uniqueCategories.has(category)) {
        uniqueCategories.add(category);

        // Create a checkbox element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'gdprcript_checkbox_input';
        checkbox.id = `gdprcript_category_${category}`;
        checkbox.name = `category_${category}`;
        checkbox.value = category;

        if (category == 'Necesario') {
          checkbox.checked = true;
          checkbox.disabled = true;
        }

        if (category == 'Necesario') {
          checkbox.checked = true;
        }


        if (consentDatas !== null) {
          if (consentDatas.hasOwnProperty(category) && consentDatas[category]) {
            checkbox.checked = true;
          }
        }


        // console.log('consentDatas', consentDatas);
        // Create a label for the checkbox
        const label = document.createElement('label');
        label.htmlFor = `gdprcript_category_${category}`;
        label.className = 'form-label gdprcript_checkbox_label';
        label.innerText = category;


        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'gdprcript_checkbox';
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        checkboxContainer.appendChild(checkboxDiv);
      }
    });
  }


  function getConsentFromCookie() {

    var cookies = document.cookie.split(';').map(cookie => cookie.trim());
    var consentObject = {};

    cookies.forEach(cookie => {
      if (cookie.startsWith('aeon-consent=')) {
        var consentString = cookie.substring('aeon-consent='.length); // Extract only the JSON string
        try {
          var jsonStringStartIndex = consentString.indexOf('{');
          if (jsonStringStartIndex !== -1) {
            consentString = consentString.substring(jsonStringStartIndex);
          }
          consentObject = JSON.parse(decodeURIComponent(consentString));
        } catch (error) {
          console.error('Error parsing aeon-consent cookie:', error);
        }
      }
    });

    return consentObject;
  }

  function categorizeAndDisplayCookies(data) {
    const categorizedCookies = {};

    data.forEach(cookie => {
      const category = cookie.category || 'Uncategorized';
      if (!categorizedCookies[category]) {
        categorizedCookies[category] = [];
      }
      categorizedCookies[category].push(cookie);
      // setCookie(cookie.name, cookie.value, cookie.expiry);
    });

    const categoryHeadersContainer = document.getElementById('gdprcript_categories');
    categoryHeadersContainer.innerHTML = ''; // Clear previous content

    Object.keys(categorizedCookies).forEach(category => {
      const categoryButton = document.createElement('button');
      categoryButton.className = 'tab-button';
      categoryButton.dataset.tab = category.toLowerCase();
      categoryButton.textContent = category;

      // Add 'active' class to the "Necessary" button by default
      if (category === 'Necesario') {
        categoryButton.classList.add('active');
      }

      categoryHeadersContainer.appendChild(categoryButton);
    });

    $(".tab-button").on("click", function () {
      $(".tab-button").removeClass("active");
      $(this).addClass("active");

      const selectedTab = $(this).data("tab");
      $(".gdprcript_report").hide();
      $(`.gdprcript_report_${selectedTab}`).show();
    });

    const reportContainer = document.getElementById('gdprcript_report_strict');
    reportContainer.innerHTML = ''; // Clear previous content

    Object.keys(categorizedCookies).forEach(category => {
      const cookiesInCategory = categorizedCookies[category];

      const reportDiv = document.createElement('div');
      reportDiv.className = `gdprcript_report gdprcript_report_${category.toLowerCase()}`;
      reportDiv.innerHTML = `
              <div class="gdprcript_category_description"></div>
              <div class="gdprcript_tablewrap">
                  <table class="gdprcript_fullreport table" data-cs-table-report="gdprcript">
                      <caption style="display: none;">Cookie report</caption>
                      <thead>
                          <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Dominio</th>
                              <th scope="col">Vencimiento</th>
                              <th scope="col">Descripción</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${cookiesInCategory.map(cookie => `
                              <tr>
                                  <td>${cookie.name}</td>
                                  <td>${cookie.domain}</td>
                                  <td>${formatDate(cookie.expiry)}</td>
                                  <td>${cookie.description}</td>
                              </tr>
                          `).join('')}
                      </tbody>
                  </table>
              </div>
          `;

      reportContainer.appendChild(reportDiv);

      // Hide reports other than "Necessary" by default
      if (category !== 'Necesario') {
        $(`.gdprcript_report_${category.toLowerCase()}`).hide();
      }
    });

  }



  function deleteAllCookiesExceptRejected() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

      // Exclude the 'cookiesRejected' cookie
      if (name !== 'cookiesRejected') {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." + getDomainFromURL() + "; secure; samesite=strict";
      }
    }
    //location.reload();
  }


  //rejectCookies();
  function rejectCookies() {

    // Additional logic as needed
    var consentType = {
      'Rendimiento': false,
      'Marketing': false,
      'Necesario': true
    };
    setAeon(consentType);
    deleteAllCookiesExceptRejected();
    deleteCookies();
    // showbadge();
  }



  function acceptCookies() {
    var Type = 'accept';
    userPreferences('true', Type);
    showbadge();
  }

  function saveCookies() {
    var Type = 'save';
    userPreferences('', Type)
    storeUserPreferences();
  }

  function getDomainFromURL() {
    var domain = window.location.hostname;
    return domain.startsWith("www.") ? domain.substring(4) : domain;
  }


  function storeUserPreferences() {
    const checkboxes = document.querySelectorAll('.gdprcript_checkbox_input');
    const userPreferences = {};
    //console.log(checkboxes);
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        userPreferences[checkbox.value] = true;
      }
    });



    fileData.forEach(cookie => {
      const category = cookie.category || 'Uncategorized';
      if (userPreferences[category]) {
        // Set the cookie in the browser
        // You can use the document.cookie method to set individual cookies
        // Here, I'm just logging the cookie for demonstration purposes
        // console.log(`Setting cookie for ${category}:`, cookie);
      } else {
        // Block or do not set the cookie for this category
        console.log(`Not setting cookie for ${category}:`, cookie);
      }
    });
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        // Get the category name associated with the checkbox
        const category = checkbox.value;

        // Find cookies in the data.txt file that match the selected category
        const cookiesInCategory = fileData.filter(cookie => cookie.category === category);

        // Set cookies in the browser for each cookie in this category
        cookiesInCategory.forEach(cookie => {
          // Construct the cookie string
          const cookieString = `${cookie.name}=${cookie.value}; path=/; expires=Thu, 31 Dec 2099 23:59:59 UTC`;

          // Set the cookie
          document.cookie = cookieString;


        });
      }
    });
  }



  function deleteCookies() {
    const checkboxes = document.querySelectorAll('.gdprcript_checkbox_input');

    checkboxes.forEach(checkbox => {
      if (checkbox.checked && checkbox.value !== 'Necesario') {
        // Get the category name associated with the checkbox
        const category = checkbox.value;

        // Find cookies in the data.txt file that match the selected category
        const cookiesInCategory = fileData.filter(cookie => cookie.category === category);

        // Delete cookies in the browser for each cookie in this category
        cookiesInCategory.forEach(cookie => {
          // Construct the cookie string with an expired date
          const cookieString = `${cookie.name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;

          // Delete the cookie by setting an expired date
          document.cookie = cookieString;
        });

        // Uncheck the checkbox

        checkbox.checked = false;

        // localStorage.setItem(checkbox.value, 'false');
      }
    });

    // Optionally, you can perform additional actions after deleting cookies if needed.
  }



  function userPreferences(accept = '', Type) {
    var consentType = {};
    const checkboxes = document.querySelectorAll('.gdprcript_checkbox_input');

    checkboxes.forEach(checkbox => {
      if (checkbox.checked && accept == '') {
        consentType[checkbox.value] = true;

      } else if (accept == 'true') {
        consentType[checkbox.value] = true;
        checkbox.checked = true;
      }
    });

    getIpAddressAndUserAgent()
      .then(dataArray => {
        consentType.IP = dataArray[0];
        consentType.userAgent = dataArray[1];
      })
      .catch(error => {
        console.error(error);
      });

    setAeon(consentType);
    // sendConsentDataToServer(consentType);
    saveUserPreferences(consentType, Type);
    showbadge();
  }



  function setAeon(consentType) {

    document.cookie = `aeon-consent=consentid:SFdTT1lNNkdpQ2J5OUE4bXY1WWZOWHo1cDlnbExaSF=${JSON.stringify(consentType)}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;

  }


  function saveUserPreferences(consentType, Type) {

    setTimeout(function () {
      $.ajax({
        type: "POST",
        url: apiUrl + 'processconsent.php',
        data: { consentType: consentType, Type: Type },
        success: function (response) {
          //  console.log(response); // Log the server's response
        },
        error: function (error) {
          console.error("An error occurred:", error);
        }
      });

    }, 5000);
  }




  function showbadge() {
    // Hide elements inside '#gdprcript_injected .wrap'
    const wrapElements = document.querySelectorAll('#gdprcript_injected .wrap');
    wrapElements.forEach(element => {
      element.style.display = 'none';
    });


    // Show the element with id '#gdprcript_badge'
    const badgeElement = document.getElementById('gdprcript_badge');
    badgeElement.style.display = 'flex';
  }
  function hidebadge() {
    // Hide elements inside '#gdprcript_injected .wrap'
    const wrapElements = document.querySelectorAll('#gdprcript_injected .wrap');
    wrapElements.forEach(element => {
      element.style.display = 'block';
    });

    // Show the element with id '#gdprcript_badge'
    const badgeElement = document.getElementById('gdprcript_badge');
    badgeElement.style.display = 'none';
  }


  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString('en-US', options);
  }

  function manageGDscript() {

    // Get elements by their IDs
    const manageButton = document.getElementById('gdprcript_manage');
    const injectedElement = document.getElementById('gdprcript_injected');
    const cookieTableWrap = document.getElementById('gdprcript_cookietablewrap');

    // Toggle visibility of span elements inside '#gdprcript_manage'
    const spanElements = document.querySelectorAll('#gdprcript_manage>span');
    spanElements.forEach(span => {
      span.style.display = (span.style.display === 'none') ? 'inline' : 'none';
    });

    // Toggle 'active' class on '#gdprcript_injected'
    injectedElement.classList.toggle('active');

    // Toggle visibility of '#gdprcript_cookietablewrap'
    cookieTableWrap.style.display = (cookieTableWrap.style.display === 'none' || cookieTableWrap.style.display === '') ? 'block' : 'none';

    // Check if '#gdprcript_injected' has 'active' class and adjust its height and width accordingly
    if (injectedElement.classList.contains('active')) {
      injectedElement.style.height = '420px';
      injectedElement.style.width = '800px';
    } else {
      injectedElement.style.height = '320px';
      injectedElement.style.width = '320px';
    }
  }

  function getIpAddressAndUserAgent() {
    // Returning a Promise to handle asynchronous operations
    return new Promise((resolve, reject) => {
      // Make a GET request to the API endpoint
      fetch('https://api.ipify.org?format=json')
        .then(response => {
          // Check if the response is successful (status code 200)
          if (response.ok) {
            return response.json(); // Parse the JSON response
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          const ipAddress = data.ip; // Extract IP address from the response
          const userAgent = navigator.userAgent; // Get user agent information

          // Return IP address and user agent as an array
          resolve([ipAddress, userAgent]);
        })
        .catch(error => {
          // Reject the Promise with the error message
          reject('Error fetching IP address and user agent: ' + error.message);
        });
    });
  }


});