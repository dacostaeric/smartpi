import sys
import Adafruit_DHT
import RPi.GPIO as GPIO

pin = 27
GPIO.setmode(GPIO.BCM)
GPIO.setup(pin,GPIO.IN)

if GPIO.input(pin) == 0:
  light = 1
else:
  light = 0
humidity, temperature = Adafruit_DHT.read_retry(11, 5)
print(temperature, humidity, light)
