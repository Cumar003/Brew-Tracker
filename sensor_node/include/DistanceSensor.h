#ifndef DISTANCE_SENSOR_H
#define DISTANCE_SENSOR_H

class DistanceSensor {
public:
    DistanceSensor(int pin);
    void begin();  // Optional placeholder
    int readDistance();

private:
    int pin;
};

#endif