import redis


class Send_data:

	def __init__(self,redis_host,redis_port):
		self.redis_host=redis_host
		self.redis_port=redis_port
		self.connection = connection


		while True :
			try :
				self.connection =redis.StrictRedis(self.redis_host,self.redis_port,db=0)
				if self.connection.ping()==True:
					print("Redis is Connected Succesfully")
					break
				else :
					print("Redis is not connected Succesfully")

			except Exception as e :
				print("unable to connect to redis server")



	def send_data_to_ui(self,camera_location,data) :
		connection1 = self.connection.pubsub()
		connection1.publish(str(camera_location),str(data))
		return "data sent Succesfully"
