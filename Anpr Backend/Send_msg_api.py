from flask import Flask,jsonify,request
from flask_restful import Resource,Api
app = Flask(__name__)
api = Api(app)


class Testing(Resource):
    def get(self):
        data = {"Number Plate": "OD02CB1122","Date":"02/09/2022","Time":"10:45","Gate No":"campus6"}
        return data

api.add_resource(Testing,'/anpr')

if __name__=="__main__":
    app.run(debug=True)