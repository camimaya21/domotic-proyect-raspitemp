/*
  Se han usado las librerías de DHT Written by Mark Ruys, mark@paracas.nl.
  encontradas en GitHub en la
  url=https://github.com/markruys/arduino-DHT
  Nombre de la libreria = DHT
*/

#include "DHT.h"

#define DHTPIN 4 // data DHT pin 4
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321 

DHT dht(DHTPIN, DHTTYPE); 

void setup()
{
  Serial.begin(9600);
  dht.begin(); 
 }

void loop() {

  //delay(dht.getMinimumSamplingPeriod());
  delay(3000);

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

// JSON-formatted:
  String jsonSerial = "{\"temperature\":";
  jsonSerial += temperature;
  jsonSerial +=",\"humidity\":";
  jsonSerial += humidity;
  jsonSerial +="}";

// enviamos datos por serial:
  Serial.println(jsonSerial);

}
