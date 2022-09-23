
import Socket_listen
import time

Socket = Socket_listen.Camera("192.168.30.195",8090,"campus6")

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
			print(data1)
			final_data = Socket.number_plate_corr(data1)
			print("Final data is ",final_data)
			#number_plate = final_data["Number Plate"]
			Verification_data = Socket.check_number_plate(final_data)
			#print(Verification_data)
			pass_type=Socket.check_pass_Type(Verification_data)
			Socket.insert_into_Activity(pass_type)
			#pass_checked_data= Socket
			#Socket.send_data(final_data)

if __name__ == "__main__":
	f1()

