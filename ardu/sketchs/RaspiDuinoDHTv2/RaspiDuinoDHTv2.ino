/*
  Se han usado las librerías de DHT Written by Mark Ruys, mark@paracas.nl.
  encontradas en GitHub en la
  url=https://github.com/markruys/arduino-DHT
  Nombre de la libreria = DHT
*/

#include "DHT.h"

DHT dht;

void setup()
{
  Serial.begin(9600);
  dht.setup(4); // data pin 4
 }

void loop() {

  //delay(dht.getMinimumSamplingPeriod());
  delay(5000);

  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();

// JSON-formatted:
  String jsonSerial = "{\"temperature\":";
  jsonSerial += temperature;
  jsonSerial +=",\"humidity\":";
  jsonSerial += humidity;
  jsonSerial +="}";

// enviamos datos por serial:
  Serial.println(jsonSerial);

}
