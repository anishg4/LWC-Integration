public class ExternalAPIIntegration {
    
    // Method to make a GET request to an external API
    @auraEnabled(cacheable = true)
    public static String callExternalAPI(String searchKey) {
        try {
            // Define the endpoint URL (Replace with your actual endpoint)         
            String endpoint = 'callout:IMDb/imdb/imdbSearchByName?query='+searchKey;

            // Create the HTTP request and set the method to GET
            HttpRequest req = new HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('GET');
            
            // Add headers to the request            
            req.setHeader('Content-Type', 'application/json');

            // Instantiate the HTTP client
            Http http = new Http();

            // Send the request and get the response
            HttpResponse res = http.send(req);

            // Check the status code and return the response body
            if (res.getStatusCode() == 200) {
                return res.getBody();  // Return the response content
            } else {
                // Handle any error response
                System.debug('Error in API call. Status: ' + res.getStatusCode() + ', Body: ' + res.getBody());
                return null;
            }
        } catch (Exception e) {
            // Handle any exceptions during the call
            System.debug('Exception while making API call: ' + e.getMessage());
            return null;
        }
    }
}