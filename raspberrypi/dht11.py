import sys
import Adafruit_DHT


humidity, temperature = Adafruit_DHT.read_retry(11, 5)
print(temperature, humidity)
