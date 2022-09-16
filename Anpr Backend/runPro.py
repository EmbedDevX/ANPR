import Anpr
import time
import API

# count =0
camera = Anpr.Anpr_Class("192.168.30.195",8090,"Campus6","10.0.2.19","sa","Soulsvciot01","ANPR",#Redis Host,#Redis Port)
def run() :
    #count =0
    while True :
        time.sleep(2)

        listen_data = camera.capture_number_plate()
        #print(listen_data)
        captured_data = camera.extract_vehicle_details(listen_data)
        #print(captured_data)
        if captured_data == None :
            pass
        else :

            number_plate = captured_data["Number Plate"]
            camera.check_number_plate_length(number_plate)
            corrected_number_plate = camera.number_plate_corr(number_plate)
            print("Corrected Number Plate :",corrected_number_plate)
            camera.insert_into_database(captured_data)
            verified_data=camera.check_number_plate(number_plate)
            camera.send_message_to_ui(verified_data)


 #### Continued#######

 
if __name__ == '__main__':
    run()