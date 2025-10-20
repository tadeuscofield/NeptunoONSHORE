# -*- coding: utf-8 -*-
# 🤖 TREINAMENTO DE MODELOS ML PARA NEPTUNO
# Treina todos os 5 modelos de Machine Learning

import pandas as pd
import numpy as np
import pickle
import json
from datetime import datetime
import glob
import os

# Machine Learning
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier, IsolationForest
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score, classification_report, accuracy_score

print("="*60)
print(" NEPTUNO - TREINAMENTO DE MODELOS ML")
print("="*60)

# ==========================================
# 1. CARREGAR DATASET
# ==========================================

print("\n[STEP 1] Carregando dataset...")

# Encontrar arquivo CSV mais recente
csv_files = glob.glob('dataset/dataset_completo_*.csv')
if not csv_files:
    print("[ERRO] Nenhum dataset encontrado! Execute generate_dataset.py primeiro.")
    exit(1)

latest_csv = max(csv_files, key=os.path.getctime)
print(f"   Arquivo: {latest_csv}")

df = pd.read_csv(latest_csv)
print(f"   Shape: {df.shape}")
print(f"   Amostras: {len(df)}")

# ==========================================
# 2. PREPARAR DADOS
# ==========================================

print("\n[STEP 2] Preparando dados...")

# Encoding de variáveis categóricas
le_bacia = LabelEncoder()
le_tipo_inst = LabelEncoder()
le_tecnica = LabelEncoder()

df['bacia_encoded'] = le_bacia.fit_transform(df['bacia'])
df['tipo_instalacao_encoded'] = le_tipo_inst.fit_transform(df['tipo_instalacao'])
df['tecnica_encoded'] = le_tecnica.fit_transform(df['tecnica_selecionada'])

# Salvar encoders para usar na API
encoders = {
    'bacia': le_bacia,
    'tipo_instalacao': le_tipo_inst,
    'tecnica': le_tecnica
}

with open('models/encoders.pkl', 'wb') as f:
    pickle.dump(encoders, f)

print("   Encoders salvos: models/encoders.pkl")

# ==========================================
# MODELO 1: PREVISÃO DE CUSTOS
# ==========================================

print("\n" + "="*60)
print(" MODELO 1: PREVISAO DE CUSTOS (Regressao)")
print("="*60)

# Features e target
features_custo = [
    'num_pocos',
    'profundidade_media',
    'lamina_agua',
    'distancia_costa',
    'bacia_encoded',
    'tipo_instalacao_encoded',
    'tecnica_encoded'
]

X_custo = df[features_custo]
y_custo = df['custo_total_usd']

# Split treino/teste
X_train_custo, X_test_custo, y_train_custo, y_test_custo = train_test_split(
    X_custo, y_custo, test_size=0.2, random_state=42
)

print(f"\nTreino: {X_train_custo.shape[0]} amostras")
print(f"Teste:  {X_test_custo.shape[0]} amostras")

# Treinar Random Forest
print("\nTreinando Random Forest Regressor...")
rf_custo = RandomForestRegressor(
    n_estimators=100,
    max_depth=20,
    min_samples_split=5,
    random_state=42,
    n_jobs=-1
)

rf_custo.fit(X_train_custo, y_train_custo)

# Avaliar
y_pred_custo = rf_custo.predict(X_test_custo)

mae = mean_absolute_error(y_test_custo, y_pred_custo)
r2 = r2_score(y_test_custo, y_pred_custo)

# Calcular erro percentual
erro_pct = (mae / y_test_custo.mean()) * 100

print(f"\n[RESULTADOS]")
print(f"  MAE (Mean Absolute Error): ${mae:.2f}M")
print(f"  R² Score: {r2:.3f}")
print(f"  Erro percentual medio: {erro_pct:.1f}%")

# Feature importance
importances = rf_custo.feature_importances_
feature_importance_df = pd.DataFrame({
    'feature': features_custo,
    'importance': importances
}).sort_values('importance', ascending=False)

print(f"\n[IMPORTANCIA DAS FEATURES]")
for idx, row in feature_importance_df.iterrows():
    print(f"  {row['feature']}: {row['importance']:.3f}")

# Salvar modelo
with open('models/custo_predictor.pkl', 'wb') as f:
    pickle.dump(rf_custo, f)

print(f"\n[SALVO] models/custo_predictor.pkl")

# ==========================================
# MODELO 2: CLASSIFICADOR DE TÉCNICAS
# ==========================================

print("\n" + "="*60)
print(" MODELO 2: SUGESTAO DE TECNICAS (Classificacao)")
print("="*60)

# Features e target
features_tecnica = [
    'num_pocos',
    'profundidade_media',
    'lamina_agua',
    'distancia_costa',
    'bacia_encoded',
    'tipo_instalacao_encoded'
]

X_tecnica = df[features_tecnica]
y_tecnica = df['tecnica_encoded']

# Split
X_train_tec, X_test_tec, y_train_tec, y_test_tec = train_test_split(
    X_tecnica, y_tecnica, test_size=0.2, random_state=42
)

print(f"\nTreino: {X_train_tec.shape[0]} amostras")
print(f"Teste:  {X_test_tec.shape[0]} amostras")

# Treinar Random Forest Classifier
print("\nTreinando Random Forest Classifier...")
rf_tecnica = RandomForestClassifier(
    n_estimators=100,
    max_depth=15,
    random_state=42,
    n_jobs=-1
)

rf_tecnica.fit(X_train_tec, y_train_tec)

# Avaliar
y_pred_tec = rf_tecnica.predict(X_test_tec)
accuracy = accuracy_score(y_test_tec, y_pred_tec)

print(f"\n[RESULTADOS]")
print(f"  Acuracia: {accuracy:.2%}")

# Probabilidades
y_pred_proba = rf_tecnica.predict_proba(X_test_tec)
confianca_media = np.mean(np.max(y_pred_proba, axis=1))
print(f"  Confianca media: {confianca_media:.2%}")

# Salvar modelo
with open('models/tecnica_classifier.pkl', 'wb') as f:
    pickle.dump(rf_tecnica, f)

print(f"\n[SALVO] models/tecnica_classifier.pkl")

# ==========================================
# MODELO 3: DETECTOR DE ANOMALIAS
# ==========================================

print("\n" + "="*60)
print(" MODELO 3: DETECTOR DE ANOMALIAS")
print("="*60)

# Features para detectar anomalias
features_anomaly = [
    'num_pocos',
    'custo_total_usd',
    'duracao_meses',
    'profundidade_media',
    'lamina_agua'
]

X_anomaly = df[features_anomaly]

print(f"\nTreinando Isolation Forest...")
print(f"Amostras: {X_anomaly.shape[0]}")

# Treinar Isolation Forest
iso_forest = IsolationForest(
    contamination=0.05,  # 5% de anomalias esperadas
    random_state=42,
    n_jobs=-1
)

iso_forest.fit(X_anomaly)

# Testar detecção
predictions = iso_forest.predict(X_anomaly)
anomalies = sum(predictions == -1)
normal = sum(predictions == 1)

print(f"\n[RESULTADOS]")
print(f"  Normal: {normal} ({normal/len(predictions)*100:.1f}%)")
print(f"  Anomalias detectadas: {anomalies} ({anomalies/len(predictions)*100:.1f}%)")

# Salvar modelo
with open('models/anomaly_detector.pkl', 'wb') as f:
    pickle.dump(iso_forest, f)

print(f"\n[SALVO] models/anomaly_detector.pkl")

# ==========================================
# MODELO 4: PREVISÃO DE APROVAÇÃO ANP
# ==========================================

print("\n" + "="*60)
print(" MODELO 4: PREVISAO DE APROVACAO ANP")
print("="*60)

# Features
features_aprovacao = [
    'completude_pct',
    'num_riscos_altos',
    'complexidade',
    'custo_total_usd',
    'duracao_meses'
]

X_aprovacao = df[features_aprovacao]
# Simular aprovação (>80% de prob = aprovado)
y_aprovacao = (df['prob_aprovacao_anp'] > 0.80).astype(int)

# Split
X_train_apr, X_test_apr, y_train_apr, y_test_apr = train_test_split(
    X_aprovacao, y_aprovacao, test_size=0.2, random_state=42
)

print(f"\nTreino: {X_train_apr.shape[0]} amostras")
print(f"Teste:  {X_test_apr.shape[0]} amostras")

# Treinar Logistic Regression
print("\nTreinando Logistic Regression...")
lr_aprovacao = LogisticRegression(
    random_state=42,
    max_iter=1000
)

lr_aprovacao.fit(X_train_apr, y_train_apr)

# Avaliar
y_pred_apr = lr_aprovacao.predict(X_test_apr)
accuracy_apr = accuracy_score(y_test_apr, y_pred_apr)

print(f"\n[RESULTADOS]")
print(f"  Acuracia: {accuracy_apr:.2%}")

# Probabilidades
y_pred_proba_apr = lr_aprovacao.predict_proba(X_test_apr)[:, 1]
print(f"  Probabilidade media de aprovacao: {y_pred_proba_apr.mean():.2%}")

# Salvar modelo
with open('models/aprovacao_predictor.pkl', 'wb') as f:
    pickle.dump(lr_aprovacao, f)

print(f"\n[SALVO] models/aprovacao_predictor.pkl")

# ==========================================
# MODELO 5: PREVISÃO DE DURAÇÃO
# ==========================================

print("\n" + "="*60)
print(" MODELO 5: PREVISAO DE DURACAO")
print("="*60)

# Features
features_duracao = [
    'num_pocos',
    'lamina_agua',
    'tecnica_encoded',
    'tipo_instalacao_encoded',
    'distancia_costa'
]

X_duracao = df[features_duracao]
y_duracao = df['duracao_meses']

# Split
X_train_dur, X_test_dur, y_train_dur, y_test_dur = train_test_split(
    X_duracao, y_duracao, test_size=0.2, random_state=42
)

print(f"\nTreino: {X_train_dur.shape[0]} amostras")
print(f"Teste:  {X_test_dur.shape[0]} amostras")

# Treinar Random Forest
print("\nTreinando Random Forest Regressor...")
rf_duracao = RandomForestRegressor(
    n_estimators=100,
    max_depth=15,
    random_state=42,
    n_jobs=-1
)

rf_duracao.fit(X_train_dur, y_train_dur)

# Avaliar
y_pred_dur = rf_duracao.predict(X_test_dur)

mae_dur = mean_absolute_error(y_test_dur, y_pred_dur)
r2_dur = r2_score(y_test_dur, y_pred_dur)

print(f"\n[RESULTADOS]")
print(f"  MAE: {mae_dur:.1f} meses")
print(f"  R² Score: {r2_dur:.3f}")

# Salvar modelo
with open('models/duracao_predictor.pkl', 'wb') as f:
    pickle.dump(rf_duracao, f)

print(f"\n[SALVO] models/duracao_predictor.pkl")

# ==========================================
# RESUMO FINAL
# ==========================================

print("\n" + "="*60)
print(" RESUMO - TODOS OS MODELOS")
print("="*60)

modelos_info = {
    'custo_predictor.pkl': {
        'tipo': 'Regressao',
        'metrica': f'Erro: ±{erro_pct:.1f}%',
        'r2': f'{r2:.3f}'
    },
    'tecnica_classifier.pkl': {
        'tipo': 'Classificacao',
        'metrica': f'Acuracia: {accuracy:.2%}',
        'confianca': f'{confianca_media:.2%}'
    },
    'anomaly_detector.pkl': {
        'tipo': 'Deteccao',
        'metrica': f'Anomalias: {anomalies/len(predictions)*100:.1f}%',
        'normal': f'{normal/len(predictions)*100:.1f}%'
    },
    'aprovacao_predictor.pkl': {
        'tipo': 'Classificacao',
        'metrica': f'Acuracia: {accuracy_apr:.2%}',
        'prob_media': f'{y_pred_proba_apr.mean():.2%}'
    },
    'duracao_predictor.pkl': {
        'tipo': 'Regressao',
        'metrica': f'Erro: ±{mae_dur:.1f} meses',
        'r2': f'{r2_dur:.3f}'
    }
}

print("\nModelos treinados:")
for modelo, info in modelos_info.items():
    print(f"\n  {modelo}")
    for key, value in info.items():
        print(f"    {key}: {value}")

# Salvar metadados
metadata = {
    'timestamp': datetime.now().isoformat(),
    'n_samples': len(df),
    'models': modelos_info
}

with open('models/metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)

print(f"\n[SALVO] models/metadata.json")

print("\n" + "="*60)
print(" TREINAMENTO CONCLUIDO COM SUCESSO!")
print("="*60)
print("\nProximo passo: python ml_api.py (iniciar API)")
