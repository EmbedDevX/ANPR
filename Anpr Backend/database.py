import pyodbc as py

# import redis

# red = redis.send_data(#redis host and port)

class Database :
	def __init__(self,db_server_name,db_user_name,db_password,db_name,cnxn) :
		self.db_server_name=db_server_name
		self.db_user_name=db_user_name
		self.db_password=db_password
		self.db_name = db_name
		self.cnxn =cnxn



		while True :
			self.cnxn = py.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + db_servername + ';DATABASE=' + db_name + ';UID=' + db_username + ';PWD=' + db_password)
                
                print("Database is connnected")
                break
            except Exception as e:

                print("something's wrong with database Connection  with exception message" + str(e))
                #logging.info("Unable to connect to database due to the exception"+str(e)+"at {}".format(datetime.datetime.now(timezone("Asia/Kolkata")).strftime("%d/%m/%Y %H:%M:%S")))

    def check_vehicle_details(self,data):       #here the data re
    	cursor = self.cnxn.cursor()
    	if data == None :
    		pass
    	else :
    		number_plate = data["Number Plate"]
    		cursor.execute(#code to be added)
    		row = cursor.fetchone()
    		if row == None :
    			pass
    		else :
    			result = row[0]
    			if result == None :

    				dict1 = {"Verification Status":"Not Verified"}
    				data.update(dict1)
    				return data
    			else :
    				dict1 = {"Verification Status":result}
    				data.update(dict1)
    				return data


    def insert_into_activity(self,data):
    	cursor = self.cnxn.cursor()
    	if data == None :
    		pass
    	else :

    		cursor.execute("""INSERT INTO movementDetails(vehivleId,entryLocation,date,time) values(?,?,?,?)""",(data["Number Plate"],self.camera_location,data["Date"],data["Time"]))
            self.cnxn.commit()

