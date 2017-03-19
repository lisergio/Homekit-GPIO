import RPi.GPIO as GPIO
GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BOARD) 

GPIO.setup(22, GPIO.OUT) 

GPIO.output(22, 0)
