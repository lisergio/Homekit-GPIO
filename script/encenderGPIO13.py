import RPi.GPIO as GPIO
GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BOARD) 

GPIO.setup(13, GPIO.OUT) 

GPIO.output(13, 1)
