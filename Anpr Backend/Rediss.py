import redis

import log

logger = log.get_logger("Redis")
class Send_data:

	def __init__(self,redis_host,redis_port,connection=0):
		self.redis_host=redis_host
		self.redis_port=redis_port
		self.connection = connection


		while True :
			try :
				self.connection =redis.StrictRedis(self.redis_host,self.redis_port,db=0)
				logger.info("Redis Server Connected Succesfully")
				break
			except Exception as e :
				print("unable to connect to redis server")
				logger.info("Unable to connect with the redis server")



	def send_data_to_ui(self,camera_location,data) :
		connection1 = self.connection.pubsub()
		connection1.publish(str(camera_location),str(data))
		logger.info("Data has been sent to UI Succesfully")
		return "data sent Succesfully"

	def check_redis_connection(self):
		if self.connection==True:
			logger.info("Redis Server is working properly")
			print("redis is working Properly")
		else :
			logger.info("Redis Server is not working Properly")
			while True :
				try:
					logger.info("Trying to connect the Redis server")
					self.connection=redis.StrictRedis(self.redis_host,self.redis_port,db=0)
					if self.connection.ping:
						logger.info("Redis Server Connected Again Successfully")
						break
					else :
						pass
				except Exception as e:
					logger.info("Unable to Connect Redis Server with exception "+str(e))
					#add log file to write the error message