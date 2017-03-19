import RPi.GPIO as GPIO
GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BOARD) 

GPIO.setup(18, GPIO.OUT) 

GPIO.output(18, 1)
