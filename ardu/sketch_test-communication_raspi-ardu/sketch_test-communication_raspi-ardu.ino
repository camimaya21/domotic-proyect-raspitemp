void setup() {
pinMode(LET_BUILTIN, OUTPUT);
Serial.begin(9600);       //Inicializo el puerto serial a 9600 baudios
Serial.println("Arduino Ready");
}

void loop() {
  if (Serial.available()) {
    char c = Serial.read();
    if (c == 'H') {
        digitalWrite(ledPin, HIGH);
        Serial.println("Respuesta de Arduino I'm ON");
      }else if (c == 'L'){
          digitalWrite(ledPin, LOW);
          Serial.println("Respuesta de Arduino I'm OFF")
      }
  }
}
