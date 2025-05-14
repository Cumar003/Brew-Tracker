#include <WiFiS3.h>
#include <ArduinoHttpClient.h>

const char* ssid = "ACTUAL_WIFI_NAME";  // Replace with your WiFi SSID
const char* pass = "PASSWORD";             // Replace with your WiFi password

const char* server = "ACTUAL_IP"; // Replace with your backend IP or domain
int port = 3000;

WiFiClient wifi;
HttpClient client = HttpClient(wifi, server, port);

void setup() {
    Serial.begin(9600);
    delay(10000);  // Give serial time to connect (especially over USB)
    Serial.println("Booting...");

    Serial.print("Connecting to WiFi");
    while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" Connected!");

    // Message before attempting to connect to the server
    Serial.print("Connecting to API server at ");
    Serial.print(server);
    Serial.print(":");
    Serial.println(port);

    // Make GET request to / endpoint
    client.get("/");

    int statusCode = client.responseStatusCode();
    String response = client.responseBody();

    Serial.print("Status code: ");
    Serial.println(statusCode);
    Serial.print("Response: ");
    Serial.println(response);
}

void loop() {
    // TODO:
}