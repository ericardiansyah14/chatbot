from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

genai.configure(api_key="AIzaSyCzLNHJUlqeD76pXW_mtpBSpZ0iSmIv2bc")

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

chat_session = model.start_chat()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    user_input = request.json.get('message')
    response = chat_session.send_message(user_input)
    return jsonify({'response': response.text})

if __name__ == "__main__":
    app.run(debug=True)
