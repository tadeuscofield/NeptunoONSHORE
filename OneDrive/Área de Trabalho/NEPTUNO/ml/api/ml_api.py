# -*- coding: utf-8 -*-
"""
API FLASK - MACHINE LEARNING NEPTUNO
Endpoints para integração com frontend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import os
import sys

# Adicionar pasta ml ao path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

app = Flask(__name__)
CORS(app)  # Permitir requisições do frontend

# ==========================================
# CARREGAR MODELOS E ENCODERS
# ==========================================

print("="*60)
print(" NEPTUNO ML API - Iniciando...")
print("="*60)

# Paths relativos
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODELS_DIR = os.path.join(BASE_DIR, 'models')

# Carregar modelos
print("\n[LOADING] Carregando modelos...")

try:
    with open(os.path.join(MODELS_DIR, 'custo_predictor.pkl'), 'rb') as f:
        model_custo = pickle.load(f)
    print("  [OK] Modelo de custos carregado")
except Exception as e:
    print(f"  [ERRO] Modelo de custos: {e}")
    model_custo = None

try:
    with open(os.path.join(MODELS_DIR, 'tecnica_classifier.pkl'), 'rb') as f:
        model_tecnica = pickle.load(f)
    print("  [OK] Modelo de tecnicas carregado")
except Exception as e:
    print(f"  [ERRO] Modelo de tecnicas: {e}")
    model_tecnica = None

try:
    with open(os.path.join(MODELS_DIR, 'anomaly_detector.pkl'), 'rb') as f:
        model_anomaly = pickle.load(f)
    print("  [OK] Modelo de anomalias carregado")
except Exception as e:
    print(f"  [ERRO] Modelo de anomalias: {e}")
    model_anomaly = None

try:
    with open(os.path.join(MODELS_DIR, 'aprovacao_predictor.pkl'), 'rb') as f:
        model_aprovacao = pickle.load(f)
    print("  [OK] Modelo de aprovacao carregado")
except Exception as e:
    print(f"  [ERRO] Modelo de aprovacao: {e}")
    model_aprovacao = None

try:
    with open(os.path.join(MODELS_DIR, 'duracao_predictor.pkl'), 'rb') as f:
        model_duracao = pickle.load(f)
    print("  [OK] Modelo de duracao carregado")
except Exception as e:
    print(f"  [ERRO] Modelo de duracao: {e}")
    model_duracao = None

try:
    with open(os.path.join(MODELS_DIR, 'encoders.pkl'), 'rb') as f:
        encoders = pickle.load(f)
    print("  [OK] Encoders carregados")
except Exception as e:
    print(f"  [ERRO] Encoders: {e}")
    encoders = None

print("\n[OK] API pronta para receber requisicoes")
print("="*60)

# ==========================================
# FUNÇÕES AUXILIARES
# ==========================================

def encode_bacia(bacia):
    """Converte nome da bacia em número"""
    if encoders and 'bacia' in encoders:
        try:
            return encoders['bacia'].transform([bacia])[0]
        except:
            return 0  # Default
    return 0

def encode_tipo_instalacao(tipo):
    """Converte tipo de instalação em número"""
    if encoders and 'tipo_instalacao' in encoders:
        try:
            return encoders['tipo_instalacao'].transform([tipo])[0]
        except:
            return 0
    return 0

def encode_tecnica(tecnica):
    """Converte técnica em número"""
    if encoders and 'tecnica' in encoders:
        try:
            return encoders['tecnica'].transform([tecnica])[0]
        except:
            return 0
    return 0

def decode_tecnica(tecnica_encoded):
    """Converte número em nome da técnica"""
    if encoders and 'tecnica' in encoders:
        try:
            return encoders['tecnica'].inverse_transform([int(tecnica_encoded)])[0]
        except:
            return 'remocao_completa'
    return 'remocao_completa'

# ==========================================
# ENDPOINT 1: PREVISÃO DE CUSTOS
# ==========================================

@app.route('/api/ml/predict/custo', methods=['POST'])
def predict_custo():
    """
    Prediz custo total do PDI usando ML

    Input JSON:
    {
        "num_pocos": 8,
        "profundidade_media": 3500,
        "lamina_agua": 2100,
        "distancia_costa": 185,
        "bacia": "Bacia de Santos",
        "tipo_instalacao": "fpso",
        "tecnica": "remocao_completa"
    }
    """
    try:
        data = request.json

        # Validar campos obrigatórios
        required_fields = ['num_pocos', 'profundidade_media', 'lamina_agua',
                          'distancia_costa', 'bacia', 'tipo_instalacao', 'tecnica']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo obrigatorio: {field}'}), 400

        # Preparar features
        features = [
            float(data['num_pocos']),
            float(data['profundidade_media']),
            float(data['lamina_agua']),
            float(data['distancia_costa']),
            encode_bacia(data['bacia']),
            encode_tipo_instalacao(data['tipo_instalacao']),
            encode_tecnica(data['tecnica'])
        ]

        # Prever
        custo_pred = model_custo.predict([features])[0]

        # Calcular margem de erro (22.7% do modelo)
        margem_erro = custo_pred * 0.227

        return jsonify({
            'success': True,
            'custo_total_usd': round(float(custo_pred), 2),
            'custo_min_usd': round(float(custo_pred - margem_erro), 2),
            'custo_max_usd': round(float(custo_pred + margem_erro), 2),
            'margem_erro_pct': 22.7,
            'confianca': 'R2: 0.808',
            'fonte': 'Machine Learning (Random Forest)'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==========================================
# ENDPOINT 2: SUGESTÃO DE TÉCNICAS
# ==========================================

@app.route('/api/ml/suggest/tecnica', methods=['POST'])
def suggest_tecnica():
    """
    Sugere técnicas de desativação mais adequadas

    Input JSON:
    {
        "num_pocos": 8,
        "profundidade_media": 3500,
        "lamina_agua": 2100,
        "distancia_costa": 185,
        "bacia": "Bacia de Santos",
        "tipo_instalacao": "fpso"
    }
    """
    try:
        data = request.json

        # Preparar features
        features = [
            float(data['num_pocos']),
            float(data['profundidade_media']),
            float(data['lamina_agua']),
            float(data['distancia_costa']),
            encode_bacia(data['bacia']),
            encode_tipo_instalacao(data['tipo_instalacao'])
        ]

        # Prever classe
        tecnica_pred = model_tecnica.predict([features])[0]

        # Obter probabilidades
        probabilidades = model_tecnica.predict_proba([features])[0]

        # Ordenar por probabilidade
        indices_ordenados = np.argsort(probabilidades)[::-1]

        # Top 3 técnicas
        sugestoes = []
        for i in range(min(3, len(indices_ordenados))):
            idx = indices_ordenados[i]
            prob = probabilidades[idx]
            tecnica_nome = decode_tecnica(idx)

            sugestoes.append({
                'tecnica': tecnica_nome,
                'confianca': round(float(prob * 100), 1),
                'recomendacao': i + 1
            })

        return jsonify({
            'success': True,
            'tecnica_principal': sugestoes[0]['tecnica'],
            'confianca_principal': sugestoes[0]['confianca'],
            'alternativas': sugestoes,
            'fonte': 'Machine Learning (Random Forest Classifier)'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==========================================
# ENDPOINT 3: DETECÇÃO DE ANOMALIAS
# ==========================================

@app.route('/api/ml/detect/anomaly', methods=['POST'])
def detect_anomaly():
    """
    Detecta se os valores inseridos estão fora do padrão

    Input JSON:
    {
        "num_pocos": 10,
        "custo_total_usd": 5,
        "duracao_meses": 3,
        "profundidade_media": 3500,
        "lamina_agua": 2100
    }
    """
    try:
        data = request.json

        # Preparar features
        features = [
            float(data['num_pocos']),
            float(data['custo_total_usd']),
            float(data['duracao_meses']),
            float(data['profundidade_media']),
            float(data['lamina_agua'])
        ]

        # Detectar anomalia (-1 = anomalia, 1 = normal)
        resultado = model_anomaly.predict([features])[0]

        # Score de anomalia (quanto mais negativo, mais anômalo)
        score = model_anomaly.score_samples([features])[0]

        is_anomaly = (resultado == -1)

        # Gerar alerta se for anomalia
        alertas = []
        if is_anomaly:
            if data['custo_total_usd'] < 50:
                alertas.append({
                    'campo': 'custo_total_usd',
                    'mensagem': 'Custo muito baixo para este projeto',
                    'valor_atual': data['custo_total_usd'],
                    'valor_tipico': '50-500 milhoes USD'
                })

            if data['duracao_meses'] < 6:
                alertas.append({
                    'campo': 'duracao_meses',
                    'mensagem': 'Duracao muito curta',
                    'valor_atual': data['duracao_meses'],
                    'valor_tipico': '12-36 meses'
                })

        return jsonify({
            'success': True,
            'is_anomaly': bool(is_anomaly),
            'confianca': 95.0,  # Modelo tem 95% de precisão
            'score': round(float(score), 3),
            'alertas': alertas,
            'mensagem': 'Valores fora do padrao detectados' if is_anomaly else 'Valores dentro do esperado',
            'fonte': 'Machine Learning (Isolation Forest)'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==========================================
# ENDPOINT 4: PREVISÃO DE APROVAÇÃO ANP
# ==========================================

@app.route('/api/ml/predict/aprovacao', methods=['POST'])
def predict_aprovacao():
    """
    Prediz probabilidade de aprovação pela ANP

    Input JSON:
    {
        "completude_pct": 95,
        "num_riscos_altos": 3,
        "complexidade": 2.5,
        "custo_total_usd": 200,
        "duracao_meses": 24
    }
    """
    try:
        data = request.json

        # Preparar features
        features = [
            float(data['completude_pct']),
            float(data['num_riscos_altos']),
            float(data['complexidade']),
            float(data['custo_total_usd']),
            float(data['duracao_meses'])
        ]

        # Prever probabilidade
        prob_aprovacao = model_aprovacao.predict_proba([features])[0][1]

        # Estimar tempo de análise (baseado em complexidade)
        tempo_analise_min = 45 if prob_aprovacao > 0.8 else 60
        tempo_analise_max = 60 if prob_aprovacao > 0.8 else 90

        # Recomendações
        recomendacoes = []
        if prob_aprovacao < 0.7:
            recomendacoes.append('Aumentar completude do documento (>95%)')
            recomendacoes.append('Revisar e mitigar riscos altos')

        if data['num_riscos_altos'] > 5:
            recomendacoes.append('Reduzir numero de riscos altos (<5)')

        return jsonify({
            'success': True,
            'probabilidade_aprovacao': round(float(prob_aprovacao * 100), 1),
            'status': 'Alta' if prob_aprovacao > 0.8 else 'Media' if prob_aprovacao > 0.6 else 'Baixa',
            'tempo_analise_dias': f'{tempo_analise_min}-{tempo_analise_max}',
            'recomendacoes': recomendacoes,
            'confianca_modelo': 83.0,
            'fonte': 'Machine Learning (Logistic Regression)'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==========================================
# ENDPOINT 5: PREVISÃO DE DURAÇÃO
# ==========================================

@app.route('/api/ml/predict/duracao', methods=['POST'])
def predict_duracao():
    """
    Prediz duração do projeto em meses

    Input JSON:
    {
        "num_pocos": 8,
        "lamina_agua": 2100,
        "tecnica": "remocao_completa",
        "tipo_instalacao": "fpso",
        "distancia_costa": 185
    }
    """
    try:
        data = request.json

        # Preparar features
        features = [
            float(data['num_pocos']),
            float(data['lamina_agua']),
            encode_tecnica(data['tecnica']),
            encode_tipo_instalacao(data['tipo_instalacao']),
            float(data['distancia_costa'])
        ]

        # Prever
        duracao_pred = model_duracao.predict([features])[0]

        # Margem de erro (±1.8 meses)
        margem_erro = 1.8

        return jsonify({
            'success': True,
            'duracao_meses': round(float(duracao_pred)),
            'duracao_min': round(float(duracao_pred - margem_erro)),
            'duracao_max': round(float(duracao_pred + margem_erro)),
            'margem_erro_meses': margem_erro,
            'confianca': 'R2: 0.896',
            'fonte': 'Machine Learning (Random Forest)'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==========================================
# ENDPOINT 6: PREVISÃO COMPLETA (TODOS OS MODELOS)
# ==========================================

@app.route('/api/ml/predict/completo', methods=['POST'])
def predict_completo():
    """
    Executa todos os 5 modelos de uma vez

    Input JSON: Todos os campos necessários
    """
    try:
        data = request.json

        # Chamar todos os endpoints internamente
        resultado = {
            'success': True,
            'timestamp': pd.Timestamp.now().isoformat()
        }

        # 1. Custo
        if all(k in data for k in ['num_pocos', 'profundidade_media', 'lamina_agua',
                                     'distancia_costa', 'bacia', 'tipo_instalacao', 'tecnica']):
            custo_response = predict_custo()
            resultado['custo'] = custo_response.get_json()

        # 2. Técnica
        if all(k in data for k in ['num_pocos', 'profundidade_media', 'lamina_agua',
                                     'distancia_costa', 'bacia', 'tipo_instalacao']):
            tecnica_response = suggest_tecnica()
            resultado['tecnica_sugerida'] = tecnica_response.get_json()

        # 3. Duração
        if all(k in data for k in ['num_pocos', 'lamina_agua', 'tecnica',
                                     'tipo_instalacao', 'distancia_costa']):
            duracao_response = predict_duracao()
            resultado['duracao'] = duracao_response.get_json()

        return jsonify(resultado)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==========================================
# ENDPOINT DE SAÚDE (HEALTH CHECK)
# ==========================================

@app.route('/api/ml/health', methods=['GET'])
def health():
    """Verifica se a API está funcionando"""
    return jsonify({
        'status': 'online',
        'version': '1.0',
        'modelos_carregados': {
            'custo': model_custo is not None,
            'tecnica': model_tecnica is not None,
            'anomaly': model_anomaly is not None,
            'aprovacao': model_aprovacao is not None,
            'duracao': model_duracao is not None
        }
    })

# ==========================================
# EXECUTAR API
# ==========================================

if __name__ == '__main__':
    print("\n" + "="*60)
    print(" API ML INICIADA!")
    print("="*60)
    print("\n Endpoints disponiveis:")
    print("  POST /api/ml/predict/custo")
    print("  POST /api/ml/suggest/tecnica")
    print("  POST /api/ml/detect/anomaly")
    print("  POST /api/ml/predict/aprovacao")
    print("  POST /api/ml/predict/duracao")
    print("  POST /api/ml/predict/completo")
    print("  GET  /api/ml/health")
    print("\n Acesse: http://localhost:5000")
    print("="*60 + "\n")

    # Desenvolvimento local
    app.run(host='0.0.0.0', port=5000, debug=True)
else:
    # Produção (Render/Railway) via Gunicorn
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
