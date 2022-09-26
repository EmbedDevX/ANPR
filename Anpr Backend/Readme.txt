All the backend code it attahced here.
------------------------------------------------------------------------------------------------
Classes :

1) Python File name : Socket_listen.py

Class : Camera

2) Python File name : database.py

class : Database

3)Python File name : redis.py

class : Send_data

---------------------------------------------------------------------------------------------------
UPDATE ON CODE :

1)All code are updated and ips and ports are reading from the configfile.ini file


In Socket_listen.py file Camera class calling Database Class and Send_data class
Run.py is the program which is calling the Socket Class and execute continuously.

------------------------------------------------------------------------------------------------



Send_message_api is the tesing program , that sends the data through api.

Created a Socket
Continuously listening to 8090 port
Camera is Sending data to Local address and Port 8090
