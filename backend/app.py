from flask import Flask
from flask_cors import CORS
from prediction import prediction_bp

from database import db

from routes.auth import auth_bp
from routes.medicine import medicine_bp
from routes.dashboard import dashboard_bp
from routes.prediction import prediction_bp
from routes.reports import reports_bp
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///medicine.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()


app.register_blueprint(auth_bp)
app.register_blueprint(medicine_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(prediction_bp)
app.register_blueprint(reports_bp)

@app.route("/")
def home():
    return "PHC Medicine Stock System API Running"

if __name__ == "__main__":
    app.run(debug=True)