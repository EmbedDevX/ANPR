
import Socket_listen
import time

Socket = Socket_listen.Camera("192.168.20.195",8090,"campus6")

def f1():
	while True :
		time.sleep(3)
		data  = Socket.listen_data()
		if data == None :
			pass
		else :
			filtered_data = Socket.filter_data(data)
			data1 = Socket.check_number_plate_length(data)
			final_data = Socket.number_plate_corr(data1)
			number_plate = final_data["Number Plate"]
			Verification_data = Socket.check_number_plate(final_data)
			Socket.insert_in_db(Verification_data)
			Socket.send_data(Verification_data)

if __name__ == "__main__":
	df1()

