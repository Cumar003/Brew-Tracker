#include "HttpManager.h"
#include <Arduino.h>

HttpManager::HttpManager(const char* ssid, const char* pass, const char* server, int port)
    : ssid(ssid), pass(pass), server(server), port(port) {
    client = new HttpClient(wifi, server, port);
}

void HttpManager::connectWiFi() {
    Serial.print("Connecting to WiFi");
    while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" Connected!");
}

void HttpManager::sendTestRequest() {
    client->get("/");
    int statusCode = client->responseStatusCode();
    String response = client->responseBody();
    Serial.print("Status code: ");
    Serial.println(statusCode);
    Serial.print("Response: ");
    Serial.println(response);
}

void HttpManager::sendDrinkData(const String& uid, int drink1Change, int drink2Change) {
    String endpoint = "/drink-data";
    String payload = "{\"uid\":\"" + uid + "\",\"drink1\":" + drink1Change + ",\"drink2\":" + drink2Change + "}";

    client->post(endpoint, "application/json", payload);
    int statusCode = client->responseStatusCode();
    String response = client->responseBody();

    Serial.print("POST Status: ");
    Serial.println(statusCode);
    Serial.print("Response: ");
    Serial.println(response);
}