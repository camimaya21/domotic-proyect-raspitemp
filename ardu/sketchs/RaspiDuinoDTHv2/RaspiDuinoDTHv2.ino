/*
  Se han usado las librerías de DHT Written by Mark Ruys, mark@paracas.nl.
  encontradas en GitHub en la 
  url=https://github.com/markruys/arduino-DHT
  Nombre de la libreria = DHT
*/

#include "DHT.h",

DHT dht;

void setup()
{
  Serial.begin(9600);
  dht.setup(4); // data pin 4
  Serial.println("Connected with Arduino");
 }
 
void loop() {
 
 // delay(dht.getMinimumSamplingPeriod());

  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();
  
// JSON-formatted:
  String jsonSerial ="{\"temperature\":\"";
  jsonSerial +=temperature;
  jsonSerial +="\",\"humidity\":\"";
  jsonSerial +=humidity;
  jsonSerial +="\"}";

//  String jsonSerial = "{";
//    jsonSerial += "\"humedad\": {";
//    jsonSerial += "\"valido\": true,";
//    jsonSerial += "\"valor\":";
//    jsonSerial += humidity;
//    jsonSerial += ",\"sensor\": \"AM2302\",";
//    jsonSerial += "\"unidad\": \"%\"";  
//    jsonSerial += "},";
//    jsonSerial += "\"temperatura\": {";
//    jsonSerial += "\"valido\": true,";
//    jsonSerial += "\"valor\":";
//    jsonSerial += temperature;
//    jsonSerial += ",\"sensor\": \"DHT22\",";
//    jsonSerial += "\"unidad\": \"°C\"";    
//    jsonSerial += "}";
//    jsonSerial += "}";

//      String jsonSerial = "{";
//      jsonSerial += humidity;
//      jsonSerial += "}";


// enviamos datos por serial:
  Serial.println(jsonSerial);

  delay(10000);
}
