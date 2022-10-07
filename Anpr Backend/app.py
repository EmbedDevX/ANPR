
from flask import Flask,request,jsonify
import db_api

db = db_api.DB("10.0.2.19","sa","Soulsvciot01","Anpr")

app = Flask(__name__)

@app.route("/api/schedule_a_visit",methods=["POST"])
def api_schedule_a_visit():
    user_data = request.get_json()
    return jsonify(db.schedule_a_visit(user_data))

@app.route('/api/register_vehicle',methods = ["POST"])
def api_register_a_vehicle():
    user_data = request.get_json()
    return jsonify(db.register_your_vehicle(user_data))