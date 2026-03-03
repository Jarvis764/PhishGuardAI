import os
import random


class LLMService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY", "")

    async def analyze_email(self, email_content: str) -> dict:
        """Analyze email for phishing indicators - uses mock data"""
        phishing_indicators = [
            "urgent", "verify", "account", "password", "click here",
            "suspended", "confirm", "bank", "prize", "winner", "lottery"
        ]

        lower_content = email_content.lower()
        found_phrases = [p for p in phishing_indicators if p in lower_content]

        risk_score = min(100, len(found_phrases) * 15 + random.randint(0, 20))

        if risk_score >= 60:
            classification = "Phishing"
            explanation = (
                "This email contains multiple phishing indicators including urgency tactics, "
                "suspicious links, and requests for sensitive information. The sender appears "
                "to be impersonating a legitimate organization."
            )
        elif risk_score >= 30:
            classification = "Suspicious"
            explanation = (
                "This email shows some suspicious characteristics. While not definitively "
                "phishing, it contains elements that warrant caution before clicking any "
                "links or providing information."
            )
        else:
            classification = "Safe"
            explanation = (
                "This email appears to be legitimate. No significant phishing indicators "
                "were detected. However, always remain vigilant about unexpected emails."
            )

        return {
            "classification": classification,
            "risk_score": risk_score,
            "explanation": explanation,
            "highlighted_phrases": found_phrases,
        }

    async def generate_simulation(self, company_name: str, department: str, simulation_type: str) -> dict:
        """Generate phishing simulation email"""
        simulations = {
            "IT Support": {
                "subject": f"[URGENT] Your {company_name} account requires immediate verification",
                "body": f"""Dear {department} Team Member,

Our security systems have detected unusual login activity on your corporate account. To protect your account and prevent unauthorized access, you must verify your credentials within the next 24 hours.

⚠️ FAILURE TO VERIFY WILL RESULT IN ACCOUNT SUSPENSION

Please click the link below to verify your identity:

[Verify My Account Now]

This link expires in 24 hours. If you did not initiate this request, contact IT Support immediately.

Best regards,
IT Security Team
{company_name}""",
                "fake_link": "https://company-secure-verify.phishguard-sim.internal/auth",
            },
            "HR": {
                "subject": f"Important: {company_name} Benefits Enrollment Deadline",
                "body": f"""Hello,

The annual benefits enrollment period ends TOMORROW. If you haven't updated your benefits selection, you will lose coverage.

Action Required:
• Update your health insurance selection
• Confirm your 401k contributions
• Review your beneficiaries

Click here to access the Benefits Portal: [Update Benefits Now]

This is a time-sensitive matter. Please complete by 5:00 PM today.

HR Department
{company_name}""",
                "fake_link": "https://hr-benefits-portal.phishguard-sim.internal/enroll",
            },
            "Finance": {
                "subject": f"Invoice #INV-2024-{random.randint(1000, 9999)} Requires Your Approval",
                "body": f"""Hi,

An invoice requiring your immediate approval has been submitted through our billing system.

Invoice Details:
• Amount: $12,450.00
• Vendor: Tech Solutions Inc.
• Due Date: Tomorrow

Please review and approve this invoice to avoid late payment penalties:

[View & Approve Invoice]

If you have questions, contact the Finance department.

Finance Team
{company_name}""",
                "fake_link": "https://finance-approval.phishguard-sim.internal/invoice",
            },
        }

        sim_type = simulation_type if simulation_type in simulations else "IT Support"
        sim = simulations[sim_type]

        return {
            "subject": sim["subject"],
            "body": sim["body"],
            "fake_link": sim["fake_link"],
            "simulation_id": f"SIM-{random.randint(10000, 99999)}",
        }

    async def generate_training(self, mistake_type: str) -> dict:
        """Generate personalized micro-training content"""
        return {
            "mistake_explanation": (
                "You clicked on a link in a simulated phishing email. This email used urgency "
                "tactics and impersonated a trusted internal system to trick you into clicking."
            ),
            "why_dangerous": (
                "In a real attack, clicking this link could have: (1) Installed malware on your "
                "device, (2) Stolen your login credentials, (3) Compromised your corporate network, "
                "(4) Led to a data breach affecting the entire organization."
            ),
            "prevention_tips": [
                "Always verify the sender's email address — hover over the sender name to see the actual address",
                "Be suspicious of urgency — legitimate systems rarely require 'immediate action within 24 hours'",
                "Before clicking any link, hover over it to preview the actual URL destination",
            ],
            "awareness_summary": (
                "Phishing attacks exploit human psychology using urgency, authority, and fear. "
                "Always pause before clicking links in emails, especially those demanding immediate "
                "action. When in doubt, navigate directly to the website by typing the URL, or "
                "contact the sender through a known phone number. Your cautious behavior is the "
                "strongest defense against cyber attacks."
            ),
        }
