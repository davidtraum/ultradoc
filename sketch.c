#include <Wire.h>

void setup() {
    Wire.begin(42);
}

void reqFrom(int id, String request) {
    Wire.begin(id);
    Wire.write(request);
    Wire.end();
}

void loop() {
    reqFrom(3, "Hallo")
}