import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import re
import io

app = Flask(__name__)
CORS(app)

def extract_data_from_pdf(pdf_file):
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()

        # Define patterns for all fields
        patterns = {
            'fullName': r'fullName:\s*(.+)',
            'dateOfBirth': r'dateOfBirth:\s*(.+)',
            'gender': r'gender:\s*(.+)',
            'address': r'address:\s*(.+)',
            'aadhaarNumber': r'aadhaarNumber:\s*(.+)',
            'panNumber': r'panNumber:\s*(.+)',
            'mobileNumber': r'mobileNumber:\s*(.+)',
            'email': r'email:\s*(.+)',
            'maritalStatus': r'maritalStatus:\s*(.+)',
            'occupation': r'occupation:\s*(.+)',
            'incomeRange': r'incomeRange:\s*(.+)',
            'bankAccountNumber': r'bankAccountNumber:\s*(.+)',
            'ifscCode': r'ifscCode:\s*(.+)',
            'isSmoker': r'isSmoker:\s*(.+)',
            'alcoholConsumption': r'alcoholConsumption:\s*(.+)',
            'preExistingConditions': r'preExistingConditions:\s*(.+)',
            'conditionsDetails': r'conditionsDetails:\s*(.+)',
            'familyMedicalHistory': r'familyMedicalHistory:\s*(.+)',
            'numberOfDependents': r'numberOfDependents:\s*(.+)',
            'previousInsuranceClaims': r'previousInsuranceClaims:\s*(.+)',
            'height': r'height:\s*(.+)',
            'weight': r'weight:\s*(.+)',
            'bloodGroup': r'bloodGroup:\s*(.+)',
            'nomineeName': r'nomineeName:\s*(.+)',
            'nomineeRelationship': r'nomineeRelationship:\s*(.+)',
            'nomineeDateOfBirth': r'nomineeDateOfBirth:\s*(.+)',
            'nomineeIdentification': r'nomineeIdentification:\s*(.+)',
            'vehicleRegistrationNumber': r'vehicleRegistrationNumber:\s*(.+)',
            'vehicleModelMake': r'vehicleModelMake:\s*(.+)',
            'vehicleManufactureYear': r'vehicleManufactureYear:\s*(.+)',
            'landRegistrationNumber': r'landRegistrationNumber:\s*(.+)',
            'landLocation': r'landLocation:\s*(.+)',
            'landArea': r'landArea:\s*(.+)',
            'kycConsent': r'kycConsent:\s*(.+)',
            'termsConditions': r'termsConditions:\s*(.+)'
        }

        # Extract data for all fields
        extracted_data = {}
        for key, pattern in patterns.items():
            match = re.search(pattern, text, re.IGNORECASE)
            extracted_data[key] = match.group(1).strip() if match else ""

        return extracted_data
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and file.filename.endswith('.pdf'):
        # Create a BytesIO object from the file data
        pdf_file = io.BytesIO(file.read())
        extracted_data = extract_data_from_pdf(pdf_file)
        if extracted_data is not None:
            return jsonify(extracted_data), 200
        else:
            return jsonify({'error': 'Failed to extract data from PDF'}), 500
    else:
        return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True)