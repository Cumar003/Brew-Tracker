#ifndef RFID_SCANNER_H
#define RFID_SCANNER_H

#include <MFRC522.h>

class RfidScanner {
public:
    RfidScanner(byte ssPin, byte rstPin);
    void begin();
    bool isCardPresent();
    String getCardUID();
    void halt();

private:
    byte ssPin, rstPin;
    MFRC522 rfid;
};

#endif