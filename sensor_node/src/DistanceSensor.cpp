#include "DistanceSensor.h"
#include <Arduino.h>
#include <math.h>

DistanceSensor::DistanceSensor(int pin) : pin(pin) {}

void DistanceSensor::begin() {
    // No setup needed for analog read, but placeholder if needed later
}

int DistanceSensor::readDistance() {
    float volts = analogRead(pin) * 0.0048828125;
    if (volts < 0.01) volts = 0.01;
    return 13 * pow(volts, -1);  // Approximation for IR sensor
}