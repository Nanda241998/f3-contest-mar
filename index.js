// Check if the Geolocation API is supported by the browser
if (navigator.geolocation) {
    // Get the Get Location button element
    const getLocationBtn = document.getElementById("get-location");
    // Get the Remove Location button element
    const removeLocationBtn = document.getElementById("remove-location");
    // Get the map div element
    const mapDiv = document.getElementById("map");
  
    // Check if the lat and long values are already saved in localStorage
    if (localStorage.getItem("lat") && localStorage.getItem("long")) {
      // Disable the Get Location button
      getLocationBtn.disabled = true;
      // Retrieve the lat and long values from localStorage
      const lat = localStorage.getItem("lat");
      const long = localStorage.getItem("long");
      // Create a Google Maps embed code with the lat and long values
      const mapEmbedCode = `<iframe width="100%" height="500" src="https://maps.google.com/maps?q=${lat},${long}&output=embed"></iframe>`;
      // Add the Google Maps embed code to the map div
      mapDiv.innerHTML = mapEmbedCode;
    }
  
    // Define the getLocation function
    function getLocation() {
      // Call the getCurrentPosition method of the Geolocation API
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
  
    // Define the showPosition function
    function showPosition(position) {
      // Retrieve the latitude and longitude values from the position object
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      // Save the latitude and longitude values to localStorage
      localStorage.setItem("lat", lat);
      localStorage.setItem("long", long);
      // Create a Google Maps embed code with the latitude and longitude values
      const mapEmbedCode = `<iframe width="100%" height="500" src="https://maps.google.com/maps?q=${lat},${long}&output=embed"></iframe>`;
      // Add the Google Maps embed code to the map div
      mapDiv.innerHTML = mapEmbedCode;
      // Disable the Get Location button
      getLocationBtn.disabled = true;
    }
  
    // Define the showError function
    function showError(error) {
      // Display an error message to the user
      mapDiv.innerHTML = `<p>${error.message}</p>`;
    }
  
    // Add event listeners to the buttons
    getLocationBtn.addEventListener("click", getLocation);
    removeLocationBtn.addEventListener("click", function() {
      localStorage.removeItem("lat");
      localStorage.removeItem("long");
      getLocationBtn.disabled = false;
      mapDiv.innerHTML = "";
    });
  } else {
    // Display an error message to the user
    document.getElementById("map").innerHTML = "<p>Geolocation is not supported by this browser.</p>";
  }
  