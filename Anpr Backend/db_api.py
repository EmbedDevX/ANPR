import pymssql as py

class DB:
    def __init__(self,db_server_name,db_user_name,db_password,db_name):
        self.db_server_name = db_server_name
        self.db_user_name = db_user_name
        self.db_password = db_password
        self.db_name = db_name

        while True :
            try :

                self.conn = py.connect(self.db_server_name,self.db_user_name,self.db_password,self.db_name)
                #logger.info("Database Connected Succefully")
                print("Database is Connected")
                break
            except Exception as e :
                #logger.error("Unable to connect with database with exception"+str(e))
                print("Database is not connected with exception message"+str(e)) 

    def schedule_a_visit(self,data):
        try :

            cursor = self.conn.cursor()
            cursor.execute()#code to be added
            self.cnxn.commit()
        except :
            self.conn.rollback()

    def register_your_vehicle(self,data):
        try:
            cursor = self.conn.cursor()
            cursor.execute()#code to be added 
            self.conn.commit()
        except:
            self.conn.rollback()
            


