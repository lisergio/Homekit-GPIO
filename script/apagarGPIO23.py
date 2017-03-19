import RPi.GPIO as GPIO
GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BOARD) 

GPIO.setup(23, GPIO.OUT) 

GPIO.output(23, 0)
