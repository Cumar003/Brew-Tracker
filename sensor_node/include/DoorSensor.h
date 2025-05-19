#ifndef DOOR_SENSOR_H
#define DOOR_SENSOR_H

class DoorSensor {
public:
    DoorSensor(int pin);
    void begin();
    void waitForOpenOrTimeout();
    bool wasOpened() const;
    void monitorUntilClosed();

private:
    int pin;
    bool opened;
};

#endif