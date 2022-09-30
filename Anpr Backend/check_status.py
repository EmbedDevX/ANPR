import camera
import time
import configparser
import log
logger = log.get_logger("Check_status")
config_obj = configparser.ConfigParser()
config_obj.read("configfile.ini",encoding='utf-8')
listener_param= config_obj["tcp_listener"]
# print(listener_param["tcp_ip"],type(listener_param["tcp_ip"]))
# print(listener_param["tcp_port"],type(listener_param["tcp_port"]))

Socket = camera.Camera(listener_param["tcp_ip"],int(listener_param["tcp_port"]),"campus6")
def check_status() :
    while True :
        time.sleep(3) #run in every one hour 
    #we can also do it bu without using in while loop , we can simple write a program and schedule a cronjob which will run the program in every one hour
        try :
            Socket.check_socket_connection()
            Socket.check_db_status()
            #Socket.Check_Redis_Connection()
            #print("Executed")
        except Exception as e:
            logger.error("Unable to Check Connections")

if __name__=="__main__":
    check_status()




