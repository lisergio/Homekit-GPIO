import RPi.GPIO as GPIO
GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BOARD) 

GPIO.setup(11, GPIO.OUT) 

GPIO.output(11, 0)
