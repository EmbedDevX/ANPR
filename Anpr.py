
import select
import time
import json
import string
#import pyodbc as py
import socket
import logging
import datetime
from pytz import timezone


logger = logging.getLogger("Status")
logging.basicConfig(filename = "Anpr.log",filemode="a",format='%(name)s - %(levelname)s - %(message)s',level = logging.DEBUG)


class Anpr_Class:

    def __init__(self, tcp_ip,tcp_port, camera_location, db_servername, db_username, db_password, db_name,cnxn=0):
        self.tcp_ip = tcp_ip
        self.tcp_port = tcp_port
        self.camera_location = camera_location
        self.db_servername = db_servername
        self.db_username = db_username
        self.db_password = db_password
        self.db_name = db_name
        #Connection for socket :
        # TCP_IP = self.tcp_ip
        # TCP_PORT =self.tcp_port
        self.buffer_size = 4096
        self.server = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        self.server.bind((self.tcp_ip,self.tcp_port))
        self.server.listen()
        self.rxset = [self.server]
        self.txset = []


        while True :
            try :

                #self.cnxn = py.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + db_servername + ';DATABASE=' + db_name + ';UID=' + db_username + ';PWD=' + db_password)
                print("Database is connnected")
                break
            except Exception as e:

                print("something's wrong with data base ")

    def capture_number_plate(self) :
        # TCP_IP = self.tcp_ip
        # TCP_PORT =self.tcp_port
        # buffer_size = 4096
        # server = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        # server.bind((TCP_IP,TCP_PORT))
        # server.listen()
        # rxset = [server]
        # txset = []
        rxfds,txfds,exfds = select.select(self.rxset,self.txset,self.rxset)

        for sock in rxfds:
            if sock is self.server :
                print("sock is ",sock)
                conn,addr = self.server.accept()
                self.rxset.append(conn)
                print("Connection From address : ",addr)
                logging.info("Connectiong From the address {}".format(addr))
            else :
                try :
                    data = b''
                    while True :
                        part = sock.recv(self.buffer_size)
                        
                        data += part
                        if len(part)<self.buffer_size:
                            break
                        print("Recieved data is :",data)
                        print("\n")
                        print("\n")
                    return data
                except :
                    exception_msg = ("Connection Closed by remote site for {}".format(self.tcp_ip))
                    logging.info("exception raised for connection at {}".format(datetime.datetime.now(timezone("Asia/Kolkata")).strftime("%d/%m/%Y %H:%M:%S")))
                    return exception_msg


    def extract_vehicle_details(self,data):
        if data == None :
            pass
        else :

            if len(data)==0:
                pass
            else :
                try :
                    str_data =str(data)
                    first_index= str_data.find("n<licensePlate>")
                    first_index = first_index+15
                    last_index = first_index+10
                    number_plate  = str_data[first_index:last_index]
                    dt = str_data.find('n<dateTime>')
                    dt1 = dt+11
                    dt2 = dt1 +10
                    date = str_data[dt1:dt2]
                    #tm = str_data.find('n<dateTime>')
                    tm1 = dt2+1
                    tm2 = tm1+6
                    time = str_data[tm1:tm2]
                    camera_location = self.camera_location
                    dic = {"Number Plate":number_plate,"Date":date,"Time":time,"Camera Location": camera_location}
                    logging.info("Vehicle details {}".format(dic))
                    # final_data = json.dumps(dic)
                    return dic
                except :
                    msg = ("liscence plate is not found")
                    return msg

    #Check number plate length
    def check_number_plate_length(self,number_plate):
        if number_plate == None:
            pass
        else :
            if len(number_plate)==10:
                pass
            else :
                #SEND SOME ERROR MESSAGE TO UI
                print("Number Plate length is not 10")
    #number plate correction

    def number_plate_corr(self,number_plate):
        #only for odisha number plate
        if str(number_plate)[0] == "0" or str(number_plate)[1] == "O" or str(number_plate)[1] == "0":
            logging.info("Number plate corrected for {}".format(number_plate))
            temp = list(number_plate)
            temp[0] = "O"
            temp[1] = "D"
            number_plate = "".join(temp)
            return number_plate
        else :
            #######Code to be added####################
            return number_plate 

    def insert_into_database(self,data):
        #code to insert data in database
        cursor= self.cnxn.cursor()
        if data == None :
            pass
        else :
            cursor.execute("""INSERT INTO movementDetails(vehivleId,entryLocation,date,time) values(?,?,?,?)""",(data["Number Plate"],self.camera_location,data["Date"],data["Time"]))
            self.cnxn.commit()

    def check_number_plate(self,number_plate):
        if number_plate==None:
            pass
        else :
            cursor = self.cnxn.cursor()
            cursor.execute("""""")##############code to be added#######################
            #check vehicle whether it is kiit vehicle or not (present in vehicle details or not
            row = cursor.fetchone()
            if row == None:
                #######Code to be added############
                #Send vehicle details through api to web app and instruction to register the vehicle
                pass
            else :
                #Send vehicle details through api to web app with vehicle registered status , with time stamp
                pass






################CONTINUEED#############################



