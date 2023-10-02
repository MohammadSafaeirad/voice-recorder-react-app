from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="recordings")
CORS(app)

UPLOAD_FOLDER = 'recordings'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if file:
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)
        return jsonify({"message": "Recording saved successfully!"}), 200
    return jsonify({"error": "Failed to save recording."}), 400

@app.route('/recordings/<filename>', methods=['GET'])
def get_recording(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
