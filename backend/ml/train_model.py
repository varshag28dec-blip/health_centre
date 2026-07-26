import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("ml/dataset.csv")

# Remove invalid rows
df = df[df["Quantity_Out"] <= df["Quantity_In"]]

# Fill missing values
df.fillna("Unknown", inplace=True)

encoder = LabelEncoder()

df["Need_Attention"] = encoder.fit_transform(df["Need_Attention"])

X = df[[
    "Quantity_In",
    "Quantity_Out",
    "Balance",
    "Days_To_Expiry"
]]

y = df["Need_Attention"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)

joblib.dump(model, "ml/model.pkl")

print("Model Saved Successfully")

print("Accuracy:", round(accuracy * 100, 2), "%")