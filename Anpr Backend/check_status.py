import Anpr
import time
# count =0
camera = Anpr.Anpr_Class("192.168.30.195",8090,"Campus6","*******","***","************","*******",#Redis Host,#Redis Port)

def check_status() :
    while True :
    time.sleep(3600) #run in every one hour 
    #we can also do it bu without using in while loop , we can simple write a program and schedule a cronjob which will run the program in every one hour
    try :

        camera.check_database_connection()
        camera.check_socket_connection()
        camera.check_redis_server_connection()
    except :
        #code to be added






