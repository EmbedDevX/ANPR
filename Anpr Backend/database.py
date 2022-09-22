
import pymssql as py

class Database :
    def __init__(self,db_server_name,db_user_name,db_password,db_name,cnxn=0):
        self.db_server_name = db_server_name
        self.db_user_name= db_user_name
        self.db_password = db_password
        self.db_name=db_name
        self.cnxn = cnxn

        while True :
            try :

                self.cnxn = py.connect(self.db_server_name,self.db_user_name,self.db_password,self.db_name)
                print("Database is Connected")
                break
            except Exception as e :
                print("Database is not connected with exception message"+str(e))
        
    def check_vehicle_details(self,data):
        cursor = self.cnxn.cursor()
        if data == None :
            pass
        else :
            number_plate = data["Number Plate"]
            if number_plate ==None :
                pass
            else :
                cursor.execute("")
                row = cursor.fetchone()
                if row == None:
                    dict1 = {"Verifiecation Status ":"Not Verified"}
                    data.update(dict1)
                    return data
                else :
                    result = row[0]
                    dict1 = {"Verification Status":result}
                    data.update(dict1)
                    return data

    def insert_into_activity(self,data):
        cursor=self.cnxn.cursor()
        if data == None :
            pass
        else:
            vehicle_id = data["Number Plate"]
            entry_location = data["Camera_location"]
            Datee = data["Date"]
            Timee = data["Time"]
            cursor.execute("Insert into movementDetails(vehicleId,entryLocation,date,time)values(vehicle_id,entry_location,Datee,Timee)")
            self.cnxn.commit()

    def check_pass_type(self,data):
        cursor=self.cnxn.cursor()
        if data == None :
            pass
        else :
            number_plate = data["Number Plate"]
            if number_plate == None :
                pass
            else :
                cursor.execute("")
                row = cursor.fetchone()
                if row == None :
                    dict1 = {"Pass Type":"No Pass"}
                    data.update(dict1)
                    return data
                else :
                    result = row[0]
                    dict1 = {"Pass Type":result}
                    data.update(dict1)
                    return data


