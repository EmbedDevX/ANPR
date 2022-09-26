
from distutils.command.config import config
import socket
import select
import logging
import time 
import configparser
import database
#import redis

config_obj = configparser.ConfigParser()
config_obj.read("configfile.ini",encoding='utf-8')
db_param = config_obj["sql_server"]

db = database.Database(db_param["host"],"sa","Soulsvciot01",db_param["db"])
#red = redis.Send_data('localhost',6379)

class Camera:
	def __init__(self,tcp_ip,tcp_port,camera_location):
		self.tcp_ip = tcp_ip
		self.tcp_port = tcp_port
		self.camera_location = camera_location
		self.server = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
		self.buffer_size = 4096
		self.readable = [self.server]
		self.writable = []

		while True :
			time.sleep(3)
			try:
				self.server.bind((self.tcp_ip,self.tcp_port))
				self.server.listen(1)
				break
			except Exception as e :
				print("unable to create a socket with Exception"+str(e))
	def listen_data(self):
		read,write,errors = select.select(self.readable,self.writable,self.readable)
		for sock in read:
			if sock is self.server:
				conn,addr = self.server.accept()
				conn.setblocking(0)
				self.readable.append(conn)
				print("connection from address :",addr)
			else :
				try:
					data = b''
					while True :

						part = sock.recv(self.buffer_size)
						data+=part
						if len(part)<self.buffer_size:
							break
					if data:
						print(data)
						print(len(data))
						return data
					else :
						self.readable.remove(sock)
						sock.close()
				except :
					print("connection closed by remote end")
					# self.readable.remove(sock)
					# sock.close()
	def filter_data(self,data):
		if data == None :
			pass
		else :
			if len(data)==0:
				print("No data is Recieved")
			else :
				str_data = str(data)
				first_index = str_data.find("n<licensePlate>")
				first_index=first_index+15
				last_index = first_index+10
				number_plate  = str_data[first_index:last_index]
				dt = str_data.find('n<dateTime>')
				dt1=dt+11
				dt2 = dt1+10
				date = str_data[dt1:dt2]
				tm1 = dt2+1
				tm2=tm1+6
				time = str_data[tm1:tm2]
				camera_location = self.camera_location
				dic ={"Number Plate":number_plate,"Date":date,"Time":time,"Camera_location":camera_location}
				return dic 
	def check_number_plate_length(self,data):
		if data==None:
			pass
		else :
			number_plate=data["Number Plate"]
			if number_plate==None:
				pass
			else :
				if len(number_plate)==10:
					return data
				else :
					print("Number Plate{} length is not 10 ".format(number_plate))

	def number_plate_corr(self,data):
		if data ==None:
			pass
		else :
			number_plate = data["Number Plate"]
			if number_plate ==None:
				pass
			else :
				if str(number_plate)[0]=="0" or str(number_plate)[1]=="O" or str(number_plate)[1]=="0":
					temp=list(number_plate)
					temp[0]="O"
					temp[1]="D"
					number_plate="".join(temp)
					data["Number Plate"]=number_plate
					return data
				else :
					return data
	def check_number_plate(self,data):
		if data==None:
			pass
		else :
			return db.check_vehicle_details(data)
	def check_pass_Type(self,data):
		if data==None :
			pass
		else :
			return db.check_pass_type(data)
	def insert_into_Activity(self,data):
		if data == None :
			pass
		else :
			return db.insert_into_activity(data)
	# def send_data(self,data):
	# 	if data == None :
	# 		pass
	# 	else :
	# 		return red.send_data_to_ui(self.camera_location,data)