#include <DYIRDaikin.h>

//#define DYIRDAIKIN_SOFT_IR

DYIRDaikin irdaikin;
int isOn;

void setup()
{
  Serial.begin(9600);
  #ifdef DYIRDAIKIN_SOFT_IR
  irdaikin.begin(3);
  #else
  irdaikin.begin();
  irdaikin.decodePin(2);
  #endif  
  /*irdaikin.on();
  irdaikin.setSwing_off();
  irdaikin.setMode(0);
  irdaikin.setFan(1);//FAN speed to MAX
  irdaikin.setTemp(25); 
  //----everything is ok and to execute send command-----
  irdaikin.sendCommand();  
  irdaikin.description(); 
  isOn = 0;*/
 Serial.println("I'm ready");
}

void loop() {
     
     if (Serial.available()) { //Si está disponible
         char state = Serial.read();
         if (state == '1') {
             irdaikin.on();
             irdaikin.setSwing_off();
             irdaikin.setMode(3);
             irdaikin.setFan(4);//FAN speed to MAX
             irdaikin.setTemp(25);
             Serial.println("\n\nTurn On\n\n"); 
             irdaikin.sendCommand();       
             delay(3000);
             //irdaikin.description();
         }
         else if (state == '0'){
             irdaikin.off(); 
             Serial.println("\n\nTurn Off\n\n");              
             irdaikin.sendCommand();   
             delay(3000);    
             //irdaikin.description();
             delay(3000);            
             }
         else {
          Serial.println("\n\nNo se ha recibido un caracter correcto\n\n");
         }
      
     }
  
 /* if (isOn==0){
      irdaikin.off();
      Serial.println("\n\nTurn Off\n\n"); 
      delay(3000);
      irdaikin.sendCommand();       
      irdaikin.description();
      delay(3000);            
      Serial.println("\n\nExecute Command!\n\n");
      isOn=1;
      Serial.print(isOn);
      delay(60000);
      
  }
 else{
   irdaikin.on();
   irdaikin.setSwing_off();
   irdaikin.setMode(0);
   irdaikin.setFan(1);//FAN speed to MAX
   irdaikin.setTemp(25);
   Serial.println("\n\nTurn On\n\n"); 
   delay(3000);
   irdaikin.sendCommand();   
   irdaikin.description();      
   delay(3000);          
   Serial.println("\n\nExecute Command!\n\n");
   isOn = 0;
   Serial.print(isOn);
   delay(60000);
 }*/
  
}
