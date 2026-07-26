import joblib


model = joblib.load("ml/model.pkl")


def predict_medicine(quantity_in, quantity_out, balance, days_to_expiry):

    prediction = model.predict(
        [[
            quantity_in,
            quantity_out,
            balance,
            days_to_expiry
        ]]
    )[0]


    probability = model.predict_proba(
        [[
            quantity_in,
            quantity_out,
            balance,
            days_to_expiry
        ]]
    )[0]


    confidence = round(
        max(probability) * 100,
        2
    )


    return prediction, confidence