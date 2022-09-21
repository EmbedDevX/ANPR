Run server.py to create python publishing with dummy data
run main.py to run web server.

python web server listening on port 8000

command to start restart web server uvicorn  :  
uvicorn main:app --reload

run main.py to get the data sent by python redis subscriber and udpate index.html with jinja templates.


Nodejs
Express server running on port 4000 
the root node is configured to get the data sent by python redis publisher thru nodejs subscriber


