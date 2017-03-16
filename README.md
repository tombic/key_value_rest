# key_value_rest
stupid simple key-value web storage with rest like API

Storage is non persistent for simple use with small things for IoT, that can issue only simple http GET requests.

Usage examples (you can use curl, wget or even web browser to try):

Add record:
http://localhost:3000/put?key=Ander&value=BigBoss

(create JSON structured value - data is not readable by "/get" then)
http://localhost:3000/put?key=Anderko&value[name]=Bogat&value[job]=masterchef

Read value:
http://localhost:3000/get?key=Anderko

Read value not older then 500 seconds:
http://localhost:3000/get?key=Anderko&timeout=500

Read database content:
http://localhost:3000/json

response is http status code (200 for OK, 404 for not found) + raw data.


