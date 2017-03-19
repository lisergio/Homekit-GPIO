import RPi.GPIO as GPIO
GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BOARD) 

GPIO.setup(26, GPIO.OUT) 

GPIO.output(26, 1)
