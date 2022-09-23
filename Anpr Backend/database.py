from sqlite3 import Time
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
                cursor.execute("select count(*) from vehicleDetails where vehicleNumber=(%s)",number_plate)#code to check whether the vehicle number plate is exists on the database or not
                row = cursor.fetchone()
                if row[0] == 0:
                    dict1 = {"Verification Status":"Not Verified"}
                    data.update(dict1)
                    return data
                else :
                    # result = row[0]
                    #print(result)
                    dict1 = {"Verification Status":"Verified"}
                    data.update(dict1)
                    return data

    def insert_into_activity(self,data):
        cursor=self.cnxn.cursor()
        if data == None :
            pass
        else:
            cursor.execute("Insert into activity(vehicleNumber,entryLocation,passType,verificationStatus,date,time)values(%s,%s,%s,%s,%s,%s)",(data["Number Plate"],data["Camera_location"],data["Pass Type"],data["Verification Status"],data["Date"],data["Time"]))
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
                cursor.execute("select passType from gatePass INNER JOIN vehicleDetails ON vehicleDetails.vehicleId=gatePass.vehicleId WHERE vehicleNumber=(%s)",number_plate)#code to check pass type of the vehicle number plate
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


