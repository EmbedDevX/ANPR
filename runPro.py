import Anpr
import time
# count =0
camera = Anpr.Anpr_Class("192.168.30.195",8090,"Campus6","10.0.2.19","sa","Soulsvciot01","ANPR")
def f1() :
    count =0
    while True :
        time.sleep(1)

        listen_data = camera.capture_number_plate()
        #print(listen_data)
        captured_data = camera.extract_vehicle_details(listen_data)
        print(captured_data)
        if captured_data == None :
            pass
        else :

            number_plate = captured_data["Number Plate"]
            camera.check_number_plate_length(number_plate)
            corrected_number_plate = camera.number_plate_corr(number_plate)
            print("Corrected Number Plate :",corrected_number_plate)
        # count = count + 1
        # print(count)


if __name__ == '__main__':
    f1()