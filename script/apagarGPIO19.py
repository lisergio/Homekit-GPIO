import RPi.GPIO as GPIO
GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BOARD) 

GPIO.setup(19, GPIO.OUT) 

GPIO.output(19, 0)
