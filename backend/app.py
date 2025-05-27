from flask import Flask, request, jsonify
from flask_cors import CORS
import pyautogui 
import time
import random
import threading
import pyperclip   # to copy the message to clipboard

app = Flask(__name__)
CORS(app)  # To allow frontend to communicate

def start_spam(messages, count, delay):
    time.sleep(5)  # Give user time to click on chat
    for i in range(count):
        msg = random.choice(messages)
        # pyautogui.typewrite(msg) 
        pyperclip.copy(msg)  
        pyautogui.hotkey("ctrl", "v") 
        pyautogui.press("enter") 
        time.sleep(delay)

@app.route("/start", methods=["POST"])
def start():
    data = request.json
    messages = data.get("messages", [])
    count = int(data.get("count", 1))
    delay = float(data.get("delay", 1))

    # Run pyautogui in a separate thread to avoid blocking
    threading.Thread(target=start_spam, args=(messages, count, delay)).start()

    return jsonify({"status": "Started sending messages!"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050, debug=True)


#how to start the app
#python app.py