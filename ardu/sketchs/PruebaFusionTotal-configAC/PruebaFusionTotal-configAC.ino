
#include <IRremote.h>
#include "DHT.h"
#include <DYIRDaikin.h>

#define BENQPower 0xC40BF // BENQ Power button
#define DHTPIN 4 // data DHT pin 4
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321 
//#define DYIRDAIKIN_SOFT_IR


DYIRDaikin irdaikin;
int isOn;

DHT dht(DHTPIN, DHTTYPE); 

IRsend irsend;

const int RECV_PIN = 2;

IRrecv irrecv (RECV_PIN);
 
decode_results results;

long previousMillis = 0;        // will store last time that temperature and humidity was updated
long interval = 3000;           // interval at which to get data (milliseconds)
 

void setup() {
  // put your setup code here, to run once:
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  irrecv.enableIRIn(); //start the IR receiver
  irrecv.blink13(true); //blink the onboard LED when IR signal received
  dht.begin(); 
  #ifdef DYIRDAIKIN_SOFT_IR
  irdaikin.begin(3);
  #else
  irdaikin.begin();
  irdaikin.decodePin(2);
  #endif 
}  

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    char opt = Serial.read();
    Serial.println(opt); //test order received
    switch (opt){
      case '1':
         digitalWrite(LED_BUILTIN, HIGH);
         // Serial.println("Arduino: I'm ON");
         break;
      case '2':
         digitalWrite(LED_BUILTIN, LOW);
         // Serial.println("Arduino: I'm OFF");
         break;
      case '3':
         irsend.sendNEC(BENQPower, 32); // hex value, 32 bits
         break;
      case '4': 
         irdaikin.on();
         irdaikin.setSwing_off();
         irdaikin.setMode(3);
         irdaikin.setFan(3);//FAN speed to MAX
         irdaikin.setTemp(25);
         //Serial.println("\n\nTurn On\n\n"); 
         irdaikin.sendCommand();     
         break;
       case '5':
         irdaikin.off(); 
         //Serial.println("\n\nTurn Off\n\n");              
         irdaikin.sendCommand(); 
         break;  
    } 
    
  }  
  // check to see if it's time to get data; that is, if the 
  // difference between the current time and last time you received 
  // data is bigger than the interval at which you want to 
  // get data.

   unsigned long currentMillis = millis();
    if(currentMillis - previousMillis > interval) {
      // save the last time you received data 
      previousMillis = currentMillis;   

      float humidity = dht.readHumidity();
      float temperature = dht.readTemperature(); 

      // JSON-formatted:
      String jsonSerial = "{\"temperature\":";
      jsonSerial += temperature;
      jsonSerial +=",\"humidity\":";
      jsonSerial += humidity;
      jsonSerial +="}";

      // send data throw serialport
      Serial.println(jsonSerial);
    }
}
