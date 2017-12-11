#include <IRremote.h>

#define BENQPower 0xC40BF // BENQ Power button

IRsend irsend;

const int RECV_PIN = 2;

IRrecv irrecv (RECV_PIN);
 
decode_results results;

void setup()

{
  Serial.begin(9600);  
  irrecv.enableIRIn(); //start the IR receiver
  irrecv.blink13(true); //blink the onboard LED when IR signal received
}

void loop() {
  irsend.sendNEC(BENQPower, 32); // hex value, 32 bits
  delay(5000);

  //get values from the IR receiver and output to serial

   if (irrecv.decode(&results)) {
    Serial.println(results.value, HEX);
    irrecv.resume(); // Receive the next value
  }
}

 
