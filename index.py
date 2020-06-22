from flask import Flask, render_template, redirect, g, url_for, request
from flask_socketio import SocketIO, emit
import utils

app = Flask(__name__)
socketio = SocketIO(app, ping_timeout=600, async_mode='eventlet')

@app.route('/', methods=['GET','POST'])
def home():
	return render_template('index.html', title='Equilibrium', async_mode=socketio.async_mode)

@socketio.on('equation')
def result(equation):
    result = utils.balancer(equation , False)
    if result:
        socketio.emit('result', result)
    else:
        socketio.emit('result', "Error: Inserte una ecuación primero")

if __name__ == '__main__':
    try:
        socketio.run(app, host='0.0.0.0', debug=True)
    finally:
        pass