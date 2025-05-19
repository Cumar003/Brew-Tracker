#include "DoorSensor.h"
#include <Arduino.h>

DoorSensor::DoorSensor(int pin) : pin(pin), opened(false) {}

void DoorSensor::begin() {
    pinMode(pin, INPUT_PULLUP);
}

void DoorSensor::waitForOpenOrTimeout() {
    int state = digitalRead(pin);
    int counter = 0;
    opened = false;

    while (state == LOW && counter < 50) {
        delay(100);
        counter++;
        state = digitalRead(pin);
    }

    if (state == HIGH) {
        opened = true;
    }
}

bool DoorSensor::wasOpened() const {
    return opened;
}

void DoorSensor::monitorUntilClosed() {
    int state = digitalRead(pin);
    int counter = 0;

    while (state == HIGH && counter < 150) {
        delay(100);
        counter++;
        state = digitalRead(pin);

        if (counter == 150) {
            Serial.println("Warning: Door left open too long!");
            digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));  // Blink or toggle
        }
    }

    digitalWrite(LED_BUILTIN, LOW);  // Lock door
}