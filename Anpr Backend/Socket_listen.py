import socket
import select
import logging

import database
import redis


db = database.Database("10.0.2.19","sa","Soulsvciot01","ANPR")
red = redis.Send_data(#redis host and port)

class Camera :

	def __init__(self,tcp_ip,tcp_port,camera_location):
		self.tcp_ip = tcp_ip
		self.tcp_port=tcp_port
		self.camera_location=camera_location

		self.server = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
		self.buffer_size = 1024
		self.readable =[self.server]
		self.writable = []


		while True :
			try :

				self.server.bind((self.tcp_ip,self.tcp_port))
				self.server.listen(1)
				break
			except Exception as e :
				print("Unable to create a socket with Exception"+str(e))

		def listen_data(self):
			read,write,errors = select.select(self.readable,self.writable,self.readable)

			for sock in read :
				if sock is self.server :
					conn,addr = self.server.accept()
					conn.setblocking(0)
					self.readable.append(conn)
					print("connection From address :",add)
				else :
					try :
						data = sock.recv(buffer_size)
						if data ==';':
							self.readable.remove(sock)
							sock.close()
						else :
							return data
					except :
						print("connection Closed by remote end")
						self.readable.remove(sock)
						sock.close


		def filter_data(self,data) :
			if data == None :
				pass
			else :
				if len(data)==0 :
					
					return "No data is Recieved"
				else :
					try :
						tr_data =str(data)
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

        def check_number_plate_length(self,data):
    	if data == None:
    		pass
    	else :
    		number_plate = data["Number Plate"]
		    if number_plate == None:
		        pass
		    else :
		        if len(number_plate)==10:
		             pass
		        else :
		                
		            print("Message From check_number_plate_length : Number Plate length is not 10 for{}".format(number_plate))
		            logging.info("The length of the number plate {} is not 10".format(number_plate))

    	def number_plate_corr(self,data):
    		if data == None :
    		    pass
    		else :
    		    number_plate = data['Number Plate']
    		    if number_plate==None :
    			    pass
    		    else :

        #only for odisha number plate  
        #Exception case : the first index may be 0 , the second index may be O or 0 for that
        		    if str(number_plate)[0] == "0" or str(number_plate)[1] == "O" or str(number_plate)[1] == "0":
            		    logging.info("Number plate corrected for {}".format(number_plate))
            		    temp = list(number_plate)
            		    temp[0] = "O"
            		    temp[1] = "D"
            		    number_plate = "".join(temp)
            		    data["Number Plate"]=number_plate
                        return data   #returning the corrected number plate
                    else :
            #######Code to be added####################
                        return data #if the number plate has no error then simply retunr the number plate
        

        def check_number_plate(self,data) :
        	if data == None :
        		pass
        	else :
        		return db.check_vehicle_details(data)

        def insert_in_db(self,data):
        	if data == None :
        		pass
        	else :
        		return db.insert_into_activity(data)

       	def send_data(self,data):
       		camera_location = self.camera_location
       		if data == None :
       			pass
       		else :
       			red.send_data(camera_location,data)
        

