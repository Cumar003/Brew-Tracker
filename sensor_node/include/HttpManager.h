#ifndef HTTP_MANAGER_H
#define HTTP_MANAGER_H

#include <ArduinoHttpClient.h>
#include <WiFiS3.h>

class HttpManager {
public:
    HttpManager(const char* ssid, const char* pass, const char* server, int port);
    void connectWiFi();
    void sendTestRequest();
    void sendDrinkData(const String& uid, int drink1Change, int drink2Change);

private:
    const char* ssid;
    const char* pass;
    const char* server;
    int port;
    WiFiClient wifi;
    HttpClient* client;
};

#endif