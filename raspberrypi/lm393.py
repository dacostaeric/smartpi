import RPi.GPIO as GPIO

pin = 27
GPIO.setmode(GPIO.BCM)
GPIO.setup(pin,GPIO.IN)

while(True):
    if GPIO.input(pin) == 0:
        print("on")
    else:
        print("off")
##    print(GPIO.input(pin))

