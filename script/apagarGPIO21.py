import RPi.GPIO as GPIO
GPIO.setwarnings(False) 

GPIO.setmode(GPIO.BOARD) 

GPIO.setup(21, GPIO.OUT) 

GPIO.output(21, 0)
