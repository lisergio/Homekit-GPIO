import RPi.GPIO as GPIO
GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BOARD) 

GPIO.setup(12, GPIO.OUT) 

GPIO.output(12, 0)
