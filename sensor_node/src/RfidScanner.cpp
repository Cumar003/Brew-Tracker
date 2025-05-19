#include "RfidScanner.h"
#include <SPI.h>

RfidScanner::RfidScanner(byte ssPin, byte rstPin)
    : ssPin(ssPin), rstPin(rstPin), rfid(ssPin, rstPin) {}

void RfidScanner::begin() {
    SPI.begin();
    rfid.PCD_Init();
}

bool RfidScanner::isCardPresent() {
    return rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial();
}

String RfidScanner::getCardUID() {
    String uid = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
        if (rfid.uid.uidByte[i] < 0x10) uid += "0";
        uid += String(rfid.uid.uidByte[i], HEX);
    }
    uid.toUpperCase();
    return uid;
}

void RfidScanner::halt() {
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
}