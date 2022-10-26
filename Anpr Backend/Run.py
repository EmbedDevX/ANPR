
import camera
import time
import configparser
config_obj = configparser.ConfigParser()
config_obj.read("configfile.ini",encoding='utf-8')
listener_param= config_obj["tcp_listener"]
# print(listener_param["tcp_ip"],type(listener_param["tcp_ip"]))
# print(listener_param["tcp_port"],type(listener_param["tcp_port"]))

Socket = camera.Camera(listener_param["tcp_ip"],int(listener_param["tcp_port"]),"campus6")

def f1():
	while True :
		time.sleep(3)
		value = Socket.listen_data()
		if value == None :
			pass
		else :
			filtered_data = Socket.filter_data(value)
			print(filtered_data)
			data1 = Socket.check_number_plate_length(filtered_data)
			#print(data1)
			final_data = Socket.number_plate_corr(data1)
			print("Final data is ",final_data)
			#number_plate = final_data["Number Plate"]
			Verification_data = Socket.check_number_plate(final_data)
			print("Verification Data is ",Verification_data)
			pass_type=Socket.check_pass_Type(Verification_data)
			Socket.insert_into_Activity(pass_type)
			#pass_checked_data= Socket
			#Socket.send_data(final_data)

if __name__ == "__main__":
	f1()

