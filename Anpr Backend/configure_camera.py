import API
import time
cam = API.API("192.168.30.200","admin","test@1234")

a= cam.set_capability("http://192.168.30.200/ISAPI/Event/notification/httpHosts/capabilities")
print(a)
b = cam.get_param("http://192.168.30.200/ISAPI/Event/notification/httpHosts")
print(b)

data = """<?xml version="1.0" encoding="UTF-8"?>
<HttpHostNotificationList  version="2.0" xmlns="http://www.isapi.org/ver20/XMLSchema">
    <HttpHostNotification version="1.0" xmlns="http://www.hikvision.com/ver10/XMLSchema">
        <id>1</id>
        <url></url>
        <protocolType>HTTP</protocolType>
        <parameterFormatType>XML</parameterFormatType>
        <addressingFormatType>ipaddress</addressingFormatType>
        <ipAddress>192.168.30.195</ipAddress>
        <portNo>8090</portNo>
        <httpAuthenticationMethod>none</httpAuthenticationMethod>
        <ANPR>
            <detectionUpLoadPicturesType>all</detectionUpLoadPicturesType>
        </ANPR>
    </HttpHostNotification>
</HttpHostNotificationList >"""

c = cam.set_param("http://192.168.30.200/ISAPI/Event/notification/httpHosts",data)
print(c)
