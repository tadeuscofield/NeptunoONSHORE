"""
NEPTUNO ML API - Flask Backend
Deploy: Railway.app
Database: PostgreSQL
Version: 2.1.0
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

# Inicializar Flask
app = Flask(__name__)
CORS(app)

# Configurar PostgreSQL (Railway)
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL and DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL or 'sqlite:///neptuno_local.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ==========================================
# MODELS
# ==========================================

class PDI(db.Model):
    """Modelo de PDI salvo"""
    id = db.Column(db.Integer, primary_key=True)
    nome_operador = db.Column(db.String(200))
    nome_instalacao = db.Column(db.String(200))
    tipo_instalacao = db.Column(db.String(50))
    bacia = db.Column(db.String(100))
    profundidade_lamina = db.Column(db.Float)
    distancia_costa = db.Column(db.Float)
    numero_pocos = db.Column(db.Integer)
    numero_instalacoes = db.Column(db.Integer)
    custo_total = db.Column(db.Float)
    score_confianca = db.Column(db.Float)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'nome_operador': self.nome_operador,
            'nome_instalacao': self.nome_instalacao,
            'bacia': self.bacia,
            'custo_total': self.custo_total,
            'data_criacao': self.data_criacao.isoformat()
        }

class Prediction(db.Model):
    """Histórico de predições ML"""
    id = db.Column(db.Integer, primary_key=True)
    profundidade_lamina = db.Column(db.Float)
    distancia_costa = db.Column(db.Float)
    bacia = db.Column(db.String(100))
    numero_pocos = db.Column(db.Integer)
    numero_instalacoes = db.Column(db.Integer)
    custo_predito = db.Column(db.Float)
    data_predicao = db.Column(db.DateTime, default=datetime.utcnow)

# ==========================================
# ENDPOINTS
# ==========================================

@app.route('/')
def home():
    return jsonify({
        'status': 'online',
        'app': 'NEPTUNO ML API',
        'version': '2.1.0',
        'database': 'connected'
    })

@app.route('/health')
def health():
    try:
        db.session.execute('SELECT 1')
        db_status = 'healthy'
    except:
        db_status = 'unhealthy'

    return jsonify({
        'status': 'healthy',
        'database': db_status,
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Cálculo simplificado
        custo_base_por_poco = 35000000
        custo_pocos = custo_base_por_poco * int(data.get('numero_pocos', 0))
        custo_instalacoes = 50000000 * int(data.get('numero_instalacoes', 0))
        fator_lamina = 1 + (float(data.get('profundidade_lamina', 1000)) / 3000) * 0.5
        custo_predito = (custo_pocos + custo_instalacoes) * fator_lamina

        # Salvar predição
        prediction = Prediction(
            profundidade_lamina=data.get('profundidade_lamina'),
            distancia_costa=data.get('distancia_costa'),
            bacia=data.get('bacia'),
            numero_pocos=data.get('numero_pocos'),
            numero_instalacoes=data.get('numero_instalacoes'),
            custo_predito=custo_predito
        )
        db.session.add(prediction)
        db.session.commit()

        return jsonify({
            'prediction': {
                'custo_total': custo_predito,
                'breakdown': {
                    'pa_pocos': custo_pocos,
                    'remocao': custo_instalacoes
                }
            },
            'confidence': 75.0,
            'prediction_id': prediction.id
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pdi', methods=['POST'])
def save_pdi():
    try:
        data = request.json
        pdi = PDI(
            nome_operador=data.get('nome_operador'),
            nome_instalacao=data.get('nome_instalacao'),
            tipo_instalacao=data.get('tipo_instalacao'),
            bacia=data.get('bacia'),
            profundidade_lamina=data.get('profundidade_lamina'),
            distancia_costa=data.get('distancia_costa'),
            numero_pocos=data.get('numero_pocos'),
            numero_instalacoes=data.get('numero_instalacoes'),
            custo_total=data.get('custo_total'),
            score_confianca=data.get('score_confianca')
        )
        db.session.add(pdi)
        db.session.commit()
        return jsonify({'message': 'PDI salvo', 'pdi_id': pdi.id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pdi', methods=['GET'])
def list_pdis():
    try:
        pdis = PDI.query.order_by(PDI.data_criacao.desc()).limit(100).all()
        return jsonify({'pdis': [pdi.to_dict() for pdi in pdis]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def stats():
    try:
        total_pdis = PDI.query.count()
        total_predictions = Prediction.query.count()
        return jsonify({
            'total_pdis': total_pdis,
            'total_predictions': total_predictions
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Criar tabelas
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
