$(function(){
  var fileData;
  var url;
  checkDataFileOnServer();
  if (platformtype=='Laravel') {
      // We're in Laravel, use Laravel's route function to generate the URL
      url = '/cookies/'; // Define the named route in Laravel
  } else {
      // We're not in Laravel, use a relative path for the URL
      url = '/vendor/artisticbird/cookiescript/src/public/cookies/';
  }
  
  // window.onload = function () {
    
    $.ajax({
      url: url+'data.txt',
      dataType: 'json',
      success: function(jsonData) {
        consentDatas = getConsentFromCookie();
        generateCheckboxes(jsonData, consentDatas);
        categorizeAndDisplayCookies(jsonData);
        fileData = jsonData;
      },
      error: function(error) {
        console.error('Error fetching data:', error);
      }
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
      tab.addEventListener('click', function() {
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
  
  
  
  
  // };
  
  
  
  
  
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
  
              if(category == 'Necesario'){
                checkbox.checked = true;
                checkbox.disabled = true;
              }
  
              if(category == 'Necesario'){
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
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').map(cookie => cookie.trim());
  
    let consentData = null;
  
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        if (name === 'consent') {
            consentData = JSON.parse(decodeURIComponent(value)); // Parse the JSON consent data
        }
    });
  
    return consentData;
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
  
  
  function getAllCookies() {
    // Your code to retrieve cookies goes here
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var cookies = [];
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        var cookiePair = c.split("=");
        cookies.push({ name: cookiePair[0], value: cookiePair[1] });
        setCookie(cookiePair[0], cookiePair[1], 1);
        console.log(cookiePair[0]);
    }
    return cookies;
   
  }
  
  
  function deleteAllCookiesExceptRejected() {
    var cookies = document.cookie.split(";");
  
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  
        // Exclude the 'cookiesRejected' cookie
        if (name !== 'cookiesRejected') {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=."+getDomainFromURL()+"; secure; samesite=strict";
        }
    }
    //location.reload();
  }
  
  function rejectCookies(){
    //deleteAllCookies();
   //setCookie('cookiesRejected', 'true', 365);
  
  
    var xhr = new XMLHttpRequest();
      
    // Prepare the POST request to send the rejection status
    xhr.open('POST', url+'main.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    // Prepare the data to send (in this case, set cookiesRejected to 'true')
    var data = 'cookiesRejected=true';
    
    // Set up the callback function to handle the response from the server
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            // If the request was successful, you can handle the response here if needed
            console.log(xhr.responseText);
        } else {
            // If there was an error with the request, handle it here
            console.error('Request failed with status:', xhr.status);
        }
    };
    
    // Send the POST request with the data
    xhr.send(data);
    consentType={
      'Rendimiento':false,'Marketing':false,'Necesario':true
    }
       document.cookie = `consent=${JSON.stringify(consentType)}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    deleteAllCookiesExceptRejected();
    deleteCookies();
    // showbadge();
  
  }
  
  
  
  function deleteAllCookie() {
    var cookies = document.cookie.split(";");
  
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  
        // Exclude the 'cookiesRejected' cookie
        if (name !== 'cookiesRejected') {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=."+getDomainFromURL()+"; secure; samesite=strict";
  
            console.log(document.cookie);
        }
    }
  }
  
  
  function acceptCookies(){
   
    var xhr = new XMLHttpRequest();
      
    // Prepare the POST request to send the accept status
    xhr.open('POST', url+'main.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    // Prepare the data to send (in this case, set cookiesRejected to 'false')
    var data = 'cookiesRejected=false';
    
    // Set up the callback function to handle the response from the server
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            // If the request was successful, you can handle the response here if needed
            console.log(xhr.responseText);
        } else {
            // If there was an error with the request, handle it here
            console.error('Request failed with status:', xhr.status);
        }
    };
    
    // Send the POST request with the data
    xhr.send(data);
    //setCookie('cookiesRejected', '', -1);
  
    var Type = 'accept';
    //userPreferences('true')
    // sendConsentDataToServer(consentType);
    userPreferences('true',Type)
   
    showbadge();
   //location.reload();
  }
  
  function saveCookies(){
    var Type = 'save';
    userPreferences('',Type)
    storeUserPreferences();
   // sendConsentDataToServer(consentType);
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
  
  
  function removeGTM() {
    
    // Remove inline GTM script
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      if (script.textContent.includes('gtm.start') &&
          script.textContent.includes('https://www.googletagmanager.com/gtm.js')) {
        script.parentNode.removeChild(script);
      }
    }
    
    // Remove noscript associated with GTM
    const noScripts = document.getElementsByTagName('noscript');
    for (let i = 0; i < noScripts.length; i++) {
      const noScript = noScripts[i];
      if (noScript.innerHTML.includes('https://www.googletagmanager.com/ns.html')) {
        noScript.parentNode.removeChild(noScript);
      }
    }
  
    // Remove gtag.js script
    for (let i = scripts.length - 1; i >= 0; i--) {
      const script = scripts[i];
      if (script.src && script.src.includes('https://www.googletagmanager.com/gtag/js')) {
        script.parentNode.removeChild(script);
      }
    }
  
    
  
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
  
  
  
  function userPreferences(accept='',Type){
    //console.log(accept)
   
    var consentType = {};
    const checkboxes = document.querySelectorAll('.gdprcript_checkbox_input');
          
          checkboxes.forEach(checkbox => {
            if (checkbox.checked && accept=='') {
              consentType[checkbox.value] = true;
              
            }else if(accept=='true'){
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
  
      document.cookie = `consent=${JSON.stringify(consentType)}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
      //const consentType = /* get your consentType value here */;
  
     // document.cookie = `aeon-consent=${JSON.stringify(consentType)}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
  
    
    
     sendConsentDataToServer(consentType);
     saveUserPreferences(consentType,Type);
    
      showbadge();
  }
  
  function saveUserPreferences(consentType,Type){
  
    setTimeout(function() {
    $.ajax({
      type: "POST",
      url: url+'processconsent.php',
      data: { consentType: consentType, Type: Type },
      success: function (response) {
       console.log(response); // Log the server's response
      },
      error: function (error) {
        console.error("An error occurred:", error);
      }
    });
  
  }, 5000); 
  }
  
  function sendConsentDataToServer(consentType) {
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url+'main.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    // Convert the JavaScript object to JSON string
    var jsonData = JSON.stringify(consentType);
  
    console.log(jsonData);
  
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            // Server successfully received the data
            console.log(xhr.responseText);
        } else {
            // Handle errors here
            console.error('Request failed with status:', xhr.status);
        }
    };
   
    // Send the JSON data to the server
    xhr.send(jsonData);
  }
  
  
  // Function to delete a cookie by name
  function deleteCookie(name) {
    document.cookie = name + '=; expires='+ -1 +'; path=/;';
  }
  
  
  
  
  
  function showbadge(){
    // Hide elements inside '#gdprcript_injected .wrap'
    const wrapElements = document.querySelectorAll('#gdprcript_injected .wrap');
    wrapElements.forEach(element => {
      element.style.display = 'none';
    });
  
    // Show the element with id '#gdprcript_badge'
    const badgeElement = document.getElementById('gdprcript_badge');
    badgeElement.style.display = 'flex';  
  }
  function hidebadge(){
      // Hide elements inside '#gdprcript_injected .wrap'
      const wrapElements = document.querySelectorAll('#gdprcript_injected .wrap');
      wrapElements.forEach(element => {
        element.style.display = 'block';
      });
    
      // Show the element with id '#gdprcript_badge'
      const badgeElement = document.getElementById('gdprcript_badge');
      badgeElement.style.display = 'none';  
  }
  
  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
  
  
  // Function to delete all cookies
  function deleteAllCookies() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split('=');
        var cookieName = cookie[0].trim();
        deleteCookie(cookieName);
        //console.log(cookieName + ' cookie deleted.');
    }
  }
  
  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; domain=.'+getDomainFromURL()+'; path=/';
  } 
  
  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString('en-US', options);
  }
  
  function manageGDscript(){
  
    // Get elements by their IDs
    const manageButton = document.getElementById('gdprcript_manage');
    const injectedElement = document.getElementById('gdprcript_injected');
    const cookieTableWrap = document.getElementById('gdprcript_cookietablewrap');
  
    // Toggle visibility of span elements inside '#gdprcript_manage'
    const spanElements = document.querySelectorAll('#gdprcript_manage>span');
    spanElements.forEach(span => {
      span.style.display = (span.style.display === 'none' || span.style.display === '') ? 'inline' : 'none';
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
  
  
  function checkDataFileOnServer() {
    var currentDomain = window.location.hostname; // Get the current domain of the site
  var url='';
  if (platformtype=='Laravel') {
    // We're in Laravel, use Laravel's route function to generate the URL
    url = '/cookies/'; // Define the named route in Laravel
} else {
    // We're not in Laravel, use a relative path for the URL
    url = '/vendor/artisticbird/cookiescript/src/public/cookies/';
}
    var apiEndpoint = 'https://' + currentDomain + '/'+url+'data.txt'; // Construct the API URL
    // console.log(apiEndpoint);
    $.ajax({
      type: "HEAD",
      async: true,
      url: apiEndpoint
  }).done(function(){
      //console.log("found");
  }).fail(function () {
    fetchDataAndSaveToFile();
       console.log("not found");
  })
  }
  
  // Call the function to check the data file and decide whether to run functions
  
  
  var DetailArr = [];
  function fetchDataAndSaveToFile() {
    var currentURL = window.location.hostname;
    var proxyurl = url+'proxy.php';
    var domain = currentURL.replace(/(^\w+:|^)\/\/(www\.)?/, '').replace(/\/$/, '');
  
  
    //var domain = 'www.geeksforgeeks.org';
  
    // Make the API request
    handleApiRequest(proxyurl, domain);
  }
  
  // Define a function to handle the API request
  function handleApiRequest(proxyurl, domain) {
    console.log('Before API Request'); // Debugging: Check if function is being called
    // console.log(domain);
    $.ajax({
      url: proxyurl,
      method: 'GET',
      data: {
        domain: domain
      },
      beforeSend: function() {
        console.log('Sending API request...');
      },
      success: function(data) {
       // console.log(data);
        var detailsArray = JSON.parse(data);
        if (detailsArray && detailsArray.data && detailsArray.data.details) {
          try {
            var parsedDetails = JSON.parse(detailsArray.data.details);
            DetailArr = parsedDetails; // Store the parsed details in the DetailArr array
            
            var dataToSave = []; // Create an array to accumulate data for saving
  
            // Loop through the parsed details and process each item
            parsedDetails.forEach(function(details) {
              console.log(details);
            
              // Access individual properties
              var domain = details.domain;
              var expiry = details.expiry;
              var httpOnly = details.httpOnly;
              var name = details.name;
              var path = details.path;
              var sameSite = details.sameSite;
              var secure = details.secure;
              var value = details.value;
              var category = details.category;
              var description = details.description;
  
              // Push the details into the dataToSave array
              dataToSave.push(details);
            });
  
            // After processing the details and populating the dataToSave array
            // Call the saveDataToServer function to save the data to the server
            saveDataToServer(dataToSave);
           // location.reload();
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        } else {
          console.log('Response structure:', data);
          console.error('Invalid or empty response received.');
        }
      },
      error: function(xhr, status, error) {
        console.error('Error fetching data:', error);
      },
      complete: function() {
        console.log('API request completed.');
      }
    });
  }
  
  function saveDataToServer(dataToSave) {
    $.ajax({
      url: url+'save-data.php',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataToSave),
      
      success: function(response) {
        console.log('Data saved successfully:', response);
      },
      error: function(xhr, status, error) {
        console.error('Error saving data:', error);
      }
    });
  }
  
  function loadGTM() {
    (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-5CLDPS7');
  }
  });