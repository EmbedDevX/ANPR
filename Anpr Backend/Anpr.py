
import select
import time
import json
import string
import pyodbc as py
import socket
import logging
import datetime
from pytz import timezone
import redis
import smtplib,ssl


logger = logging.getLogger("Status")
logging.basicConfig(filename = "Anpr.log",filemode="a",format='%(name)s - %(levelname)s - %(message)s',level = logging.DEBUG)


class Anpr_Class:

    def __init__(self, tcp_ip,tcp_port, camera_location, db_servername, db_username, db_password, db_name,redis_host,redis_port,cnxn=0,connection=0,server=0):
        self.tcp_ip = tcp_ip
        self.tcp_port = tcp_port
        self.camera_location = camera_location
        self.db_servername = db_servername
        self.db_username = db_username
        self.db_password = db_password
        self.db_name = db_name
        self.redis_host = redis_host
        self.redis_port = redis_port
        #self.connection = connection    
        
        #Connection for socket :
        # TCP_IP = self.tcp_ip
        # TCP_PORT =self.tcp_port
        self.buffer_size = 4096
        self.server = socket.socket(socket.AF_INET,socket.SOCK_STREAM) #creating socket for ipv4 family and for tcp
        #self.server.bind((self.tcp_ip,self.tcp_port))
        #self.server.listen()
        self.rxset = [self.server]  #initially it is the input socket from which we expect to read the data 
        self.txset = []             #socket to which we expect to write the data

        #connections are added and removed  from the lists by the server main loop.


        while True :
            try :
            
                #creating a connection for the database at the starting of the program
                self.cnxn = py.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + db_servername + ';DATABASE=' + db_name + ';UID=' + db_username + ';PWD=' + db_password)
                
                print("Database is connnected")
                break
            except Exception as e:

                print("something's wrong with database Connection  with exception message" + str(e))
                logging.info("Unable to connect to database due to the exception"+str(e)+"at {}".format(datetime.datetime.now(timezone("Asia/Kolkata")).strftime("%d/%m/%Y %H:%M:%S")))


        #Connection to socket
        while True :
            try :
                self.server.bind((self.tcp_ip,self.tcp_port)) #binding to a specific ip and port for listening the incoming requests
                self.server.listen(5) #It will make queue of atleast 5 incoming requests
                break
            except Exception as e :
                print("Unable to create a socket connection with error message" + str(e))
                logging.info("Cannot Create a socket connection due to the the following exception"+str(e))


        #Connect to redis server

        while True :
            try :
                self.connection = redis.StrictRedis(self.redis_host,self.redis_port,db=0) #creating a redis server and selectind db index 0
                self.connection.ping() #pinging to the server that we made
                if self.connection.ping() == True :
                    print("Redis is connected")
                    logging.info("Redis server is connected at {}".format(datetime.datetime.now(timezone("Asia/Kolkata")).strftime("%d/%m/%Y %H:%M:%S")))
                    break
                else :
                    print("Redis is not connected")
            except Exception e :
                print("Redis is unable to connect" + str(e))
                logging.info("redis is unable to connect with error message" + str(e))

                





    def capture_number_plate(self) :
        rxfds,txfds,exfds = select.select(self.rxset,self.txset,self.rxset) #select takes three lists as input
        #rxset (rxfds): list of objects to be checked for incoming data to be read (readable)
        #txset (txfds) : list of object that will recieve the outgoing data (writeable)
        #rxset (exfds): list of objects that may have error (Exceptional)


        #readable socket represents three possible cases. If the socket we created is the main server socket, the one being used to listen for connection.
        
        for sock in rxfds:  #socket present in the readable socket object list
            if sock is self.server :  #if the socket we created is the main socket server socket, the one being used to listen for connections.
                print("sock is ",sock) 
                                                    #then the readable condition means, it ready to accept another incoming connection. 
                conn,addr = self.server.accept()
                conn.setblocking(0)
                self.rxset.append(conn)               #adding the new connection to list of input(rxfds) to monitor
                print("Connection From address : ",addr)
                logging.info("Connectiong From the address {}".format(addr))
            else :
                try :
                    data = b''
                    while True :
                        part = sock.recv(self.buffer_size) #reading the data that the client has sent.
                        
                        data += part
                        if len(part)<self.buffer_size:    #collecting the whole buffer data
                            break
                        #print("Recieved data is :",data)
                        print("\n")
                        print("\n")
                    if data == ";": # A  readable socket without data available is from a client has disconnected and the stream is ready to be closed

                        self.rxset.remove(sock) #removing the unused socket 
                        sock.close
                    else :

                        return data
                except :
                    #if the data is unable to recieve from the socket, then we have to close that socket and remove from readable list objects
                    self.rxset.remove(sock)
                    sock.close()
                    exception_msg = ("Connection Closed by remote site for {}".format(self.tcp_ip))
                    logging.info("exception raised for connection at {}".format(datetime.datetime.now(timezone("Asia/Kolkata")).strftime("%d/%m/%Y %H:%M:%S")))
                    return exception_msg


    def extract_vehicle_details(self,data):
        if data == None :
            
            pass
        else :

            if len(data)==0:
                return "No Data Is Captured"
            else :
                try :
                    str_data =str(data)
                    first_index= str_data.find("n<licensePlate>") #getting the first index of n<license plate>
                    first_index = first_index+15                   
                    last_index = first_index+10
                    number_plate  = str_data[first_index:last_index] #taking only number plate
                    dt = str_data.find('n<dateTime>')
                    dt1 = dt+11
                    dt2 = dt1 +10
                    date = str_data[dt1:dt2]      #taking only date
                    #tm = str_data.find('n<dateTime>')
                    tm1 = dt2+1
                    tm2 = tm1+6
                    time = str_data[tm1:tm2]   #taking only time 
                    camera_location = self.camera_location
                    dic = {"Number Plate":number_plate,"Date":date,"Time":time,"Camera Location": camera_location}
                    logging.info("Vehicle details {}".format(dic))
                    # final_data = json.dumps(dic)
                    return dic  #retunring the dictionart having the imformation
                except :
                    msg = (" Msg from extract_vehicle_detatils Function : liscence plate is not found")
                    logging.info("Number Plate is not found")
                    return msg

    #Check number plate length
    def check_number_plate_length(self,number_plate):
        if number_plate == None:
            pass
        else :
            if len(number_plate)==10:
                pass
            else :
                
                print("Message From check_number_plate_length : Number Plate length is not 10 for{}".format(number_plate))
                logging.info("The length of the number plate {} is not 10".format(number_plate))
    
    #number plate correction

    def number_plate_corr(self,number_plate):
        #only for odisha number plate  
        #Exception case : the first index may be 0 , the second index may be O or 0 for that
        if str(number_plate)[0] == "0" or str(number_plate)[1] == "O" or str(number_plate)[1] == "0":
            logging.info("Number plate corrected for {}".format(number_plate))
            temp = list(number_plate)
            temp[0] = "O"
            temp[1] = "D"
            number_plate = "".join(temp)
            return number_plate   #returning the corrected number plate
        else :
            #######Code to be added####################
            return number_plate #if the number plate has no error then simply retunr the number plate

    def insert_into_database(self,data):
        #code to insert data in database
        cursor= self.cnxn.cursor()
        if data == None :
            pass
        else :
            cursor.execute("""INSERT INTO movementDetails(vehivleId,entryLocation,date,time) values(?,?,?,?)""",(data["Number Plate"],self.camera_location,data["Date"],data["Time"]))
            self.cnxn.commit()

    def check_number_plate(self,data):
        if data==None:
            pass
        else :
            number_plate = data["Number Plate"]
            cursor = self.cnxn.cursor()
            cursor.execute("""""")##############code to be added#######################
            #check vehicle whether it is kiit vehicle or not (present in vehicle details or not
            row = cursor.fetchone()
            if row == None:
                #######Code to be added############
                #return the dictionary of vehicle details with verification status (Not Verified)
                dict1 = {"Verification Status":"Not Verified"}
                data.update(dict1)
                return data
            else :
                #return the dictionary of vehicle details with verification status (Verified)
                result = row[0]
                dict1 = {"Verification Statu": result}
                data.update(dict1)
                return data


    def send_message_to_ui(self,data) :
        connection1 = self.connection.pubsub() #Using the readis connection as pubsub client
        connection1.publish(str(self.camera_location),str(data)) #sending the vehicle details to ui with topic campus name (camera location)
        logging.info("Data that sent to ui is {} and sent at {}".format(data,datetime.datetime.now(timezone("Asia/Kolkata")).strftime("%d/%m/%Y %H:%M:%S")))

        return "Data Sent succesfully"



    def check_database_connection(self) :
        try :
            cursor = self.cnxn.cursor()
            cursor.execute("#Query to be executed")
            result  = cursor.fetchone()
            #may be the query return something , or may not be , but this try block will execute if the db is active
            if result :  #check if anything at all is returned
                
                return True
            else :
                return False
            logging.info("Database is running sucessfully and checked at {}".format(datetime.datetime.now(timezone("Asia/Kolkata")).strftime("%d/%m/%Y %H:%M:%S"))))
        #if the query is not executed that means there is something wrong with the db
        except Exception as e :
            logging.info("Error in connection with error message"+str(e))
            self.send_mail("Database is not Working"+ str(e))  #it will call the send_mail method of the class to send message
            print(str(e))
            while True :
                try :
                    self.cnxn=py.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + self.db_servername + ';DATABASE=' + self.db_name + ';UID=' + self.db_username + ';PWD=' + self.db_password)
                    if self.cnxn :
                        print("Database Connected Succesfully")
                        break
                    else :
                        pass
                except :
                    print("Unable to connect to the database")


        
    def send_mail(self,message):
        mail_server = smtplib.ssl(#smtp server ,#port)
        mail_server.ehol()
        mail_server.starttls()
        mail_server.login(#User Id , #password)
        mail_server.send_mail(#sender mail, #reciever mail,message)
        mail_server.quit()


    def check_socket_connection(self):

        try :
            self.server.send("Sending data For testing")
            #IF the socket is not active , it will throw some error, that means try block will not execute
        except Exception as e :
            logging.info("Socket connection tested ")
            self.send_mail("Socket is not working"+str(e))
            while True :
                try:
                    self.server = socket.socket(socket.AF_INET,socket.SOCK_STREAM) #trying to create a new socket
                    self.rxset = [self.server]
                    self.txset = []
                    self.server.bind((self.tcp_ip,self.tcp_port))
                    self.server.listen(5)
                    print("socket created Succesfully")
                    logging.info("Socket created succesfully with tcp_ip {} and tcp_port{}".format(self.tcp_ip,self.tcp_port))

                    break
                except :
                    print("unable to create a socket")

    def check_redis_server_connection(self) :
        if self.connection.ping == True: #if the redis connection is active it will send True
            logging.info("The redis server is working porperly and checked at {}".format(data,datetime.datetime.now(timezone("Asia/Kolkata")).strftime("%d/%m/%Y %H:%M:%S")))
        else :
            while True :

                try:
                    self.connection = redis.StrictRedis(self.redis_host,self.redis_port,db=0) #try to create a new redis connection
                    if self.connection.ping :
                        break
                    else :
                        pass
                except Exception as e:
                    self.send_mail("Redis server is Not working"+str(e))


################CONTINUEED#############################



