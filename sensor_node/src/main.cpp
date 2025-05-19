#include <Arduino.h>
#include "HttpManager.h"
#include "RfidScanner.h"
#include "DoorSensor.h"
#include "DistanceSensor.h"

// Replace these with your real credentials
const char* WIFI_SSID = "LAPTOP-VEUJHJMG 6514";
const char* WIFI_PASS = "2=P34s95";
const char* SERVER = "https://www.google.com/";
const int PORT = 3000;

// Global managers
HttpManager http(WIFI_SSID, WIFI_PASS, SERVER, PORT);
RfidScanner rfidScanner(10, 5);  // Use actual SS and RST pins
DoorSensor doorSensor(8);  // e.g., pin 8
DistanceSensor dist1(A0);
DistanceSensor dist2(A1);

void setup() {
  Serial.begin(9600);
  delay(10000);
  http.connectWiFi();
  http.sendTestRequest();

  rfidScanner.begin();
  doorSensor.begin();
  dist1.begin();
  dist2.begin();

  Serial.println("System ready.");
}

void loop() {
  if (rfidScanner.isCardPresent()) {
    String uid = rfidScanner.getCardUID();

    int d1_before = dist1.readDistance();
    int d2_before = dist2.readDistance();

    doorSensor.waitForOpenOrTimeout();

    if (doorSensor.wasOpened()) {
      doorSensor.monitorUntilClosed();

      int d1_after = dist1.readDistance();
      int d2_after = dist2.readDistance();

      int d1_change = d1_after - d1_before;
      int d2_change = d2_after - d2_before;

      Serial.print("UID: ");
      Serial.println(uid);
      Serial.print("Drink 1: ");
      Serial.print(d1_change);
      Serial.print(" cm, Drink 2: ");
      Serial.print(d2_change);
      Serial.println(" cm");

      http.sendDrinkData(uid, d1_change, d2_change);
    }
  }
}