import streamlit as st
import json
from flask import Flask, send_from_directory
from streamlit.server.server import Server

st.title("Real-Time Translator Configuration")
st.write("Use this interface to configure your Real-Time Translator Chrome extension.")

# Input for Google Cloud API key
api_key = st.text_input("Google Cloud API Key", type="password")

# Dropdown for selecting the default target language
target_language = st.selectbox("Default Target Language", ["en", "es", "fr", "de", "zh"])

if st.button("Save Configuration"):
    config = {
        "api_key": api_key,
        "target_language": target_language
    }
    with open("config.json", "w") as config_file:
        json.dump(config, config_file)
    st.write("Configuration saved!")

# Serve the config file
app = Flask(__name__)

@app.route('/config')
def get_config():
    return send_from_directory('.', 'config.json')

def run_flask():
    app.run(port=8502)

import threading
threading.Thread(target=run_flask).start()
