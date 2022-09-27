All the backend code it attahced here.
--------------------------------------------------------------------------------------------------

1) Python File name : Socket_listen.py

Class : Camera

2) Python File name : database.py

class : Database

3)Python File name : Rediss.py

class : Send_data

4)Python File name : log.py
 
Function : get_logger(name) to create a log description
 
5)Python File name : Run.py

Program that will execute continuously

6)Python File name : API.py

class to configure camera 

7)Python File name : configure_camera.py

Program that call the API.py and execute to configure camera parameter.

8)Anpr_Central : The cental log file
 
---------------------------------------------------------------------------------------------------
UPDATE ON CODE :

Dt :26th sep
1)All code are updated (ips and ports are reading from the configfile.ini file)

Dt :27th sep
1)Code added in class to check DATABASE,REDIS,SOCKET status
2)A central log file is created in which all the functionality of the class objects will be stored with time stamp


---------------------------------------------------------------------------------------------------

In Socket_listen.py file Camera class calling Database Class and Send_data class
Run.py is the program which is calling the Socket Class and execute continuously.

---------------------------------------------------------------------------------------------------



Send_message_api is the tesing program , that sends the data through api.

Created a Socket
Continuously listening to 8090 port
Camera is Sending data to Local address and Port 8090
