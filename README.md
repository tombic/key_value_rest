# key_value_rest
stupid simple key-value web storage with rest like API

Storage is non persistent for simple use with small things for IoT, that can issue only simple http requests.

Usage examples with wget (you can use curl, or even web browser to try):

Add record:
wget -q -O - "http://localhost:3000/put?key=Ander&value=BigBoss"
(create JSON structured value)
wget -q -O - "http://localhost:3000/put?key=Anderko&value[name]=Bogat&value[job]=masterchef"

Read value:
wget -q -O - "http://localhost:3000/get?key=Anderko
Read value not older then 500 seconds:
wget -q -O - "http://localhost:3000/get?key=Anderko&timeout=5

Read database content:
wget -q -O - "http://localhost:3000/json"



