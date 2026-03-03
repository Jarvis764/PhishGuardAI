class RiskCalculator:
    @staticmethod
    def calculate_risk_score(
        phishing_clicks: int,
        failed_simulations: int,
        suspicious_interactions: int,
        completed_training: int,
    ) -> dict:
        score = (
            phishing_clicks * 20
            + failed_simulations * 15
            + suspicious_interactions * 10
            - completed_training * 10
        )
        score = max(0, min(100, score))

        if score <= 30:
            level = "Low"
            color = "green"
        elif score <= 60:
            level = "Medium"
            color = "yellow"
        else:
            level = "High"
            color = "red"

        return {"score": score, "level": level, "color": color}
