void setup() {
pinMode(LED_BUILTIN, OUTPUT);
Serial.begin(9600);       //Inicializo el puerto serial a 9600 baudios
Serial.println("Arduino Ready");
}

void loop() {
  if (Serial.available()) {
    char c = Serial.read();
    if (c == 'H') {
        digitalWrite(LED_BUILTIN, HIGH);
        Serial.println("Respuesta de Arduino I'm ON");
      }else if (c == 'L'){
          digitalWrite(LED_BUILTIN, LOW);
          Serial.println("Respuesta de Arduino I'm OFF");
      }
  }
}
