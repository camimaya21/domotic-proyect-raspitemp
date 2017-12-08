/*
  Se han usado las librerías de Rob Tillaart (rob.tillaart@gmail.com)
  encontradas en GitHub en la 
  url=https://github.com/RobTillaart/Arduino/tree/master/libraries/
  Nombre de la libreria = DHTlib
  version=0.1.24  
*/
#include <dht.h>
#define DHT_PIN 4//Pin de lectura 4
dht DHT;//Objeto del sensor
 
void setup() {
  //Inicializacion del puerto serie.
  Serial.begin(9600);
 
 
}
 
void loop() {
 
 
  int dato = DHT.read22(DHT_PIN);//Lectura del dato.

  Serial.print("{\"temperature\":");
  Serial.print(DHT.temperature);  
  Serial.print(",");
  Serial.print("\"humidity\":");
  Serial.print(DHT.humidity);
  Serial.println("}\n");

  //delay(300000);//esperamos 5 minutos.
 //delay(60000);//esperamos 1 minuto.
 //delay(30000);//esperamos 30 segundos.
 delay(3000);//esperamos 10 segundos.
}
