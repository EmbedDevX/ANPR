import requests
from requests.auth import HTTPBasicAuth, HTTPDigestAuth
from xml.etree import ElementTree
#import xmltodict

class API :
    def __init__(self,host,user_name,password,session=0):
        self.host = host
        self.user_name = user_name
        self.password=password
        self.session = requests.session()
        self.session.auth = HTTPDigestAuth(self.user_name,self.password)
        
        
        
    def set_capability(self,url) :
        session = self.session
        session.auth = self.session.auth
        response = session.get(url,stream=True)
        tree = ElementTree.fromstring(response.content)
        
        status = response.status_code
        #result = xmltodict.parse(response.content)
        
        return status
    def get_param(self,url):
        session = self.session
        session.auth = self.session.auth
        response = session.get(url,stream=True)
        tree = ElementTree.fromstring(response.content)
        status = response.status_code
        #result = xmltodict.parse(response.content)
        
        return status
    
    def set_param(self,url,payload) :
        session = self.session
        session.auth=self.session.auth
        response = session.put(url,payload)
        
        status = response.status_code 
        result = response.content
        
        return status

    