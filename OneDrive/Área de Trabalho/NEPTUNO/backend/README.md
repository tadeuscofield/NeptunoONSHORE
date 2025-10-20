# NEPTUNO Backend - Railway

Flask API com PostgreSQL para Machine Learning

## Deploy

Railway detecta automaticamente:
- Python via runtime.txt
- Dependências via requirements.txt
- Start command via Procfile

## Endpoints

- `GET /` - Health check
- `GET /health` - Health check detalhado
- `POST /api/predict` - Predição ML
- `POST /api/pdi` - Salvar PDI
- `GET /api/pdi` - Listar PDIs
- `GET /api/stats` - Estatísticas

## Ambiente Local

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Acesse: http://localhost:5000
