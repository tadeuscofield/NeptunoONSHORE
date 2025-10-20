# 🤖 GERADOR DE DATASET SINTÉTICO PARA NEPTUNO
# Gera dados realistas para treinar modelos ML

import numpy as np
import pandas as pd
import json
from datetime import datetime, timedelta
import random

# Configurar seed para reprodutibilidade
np.random.seed(42)
random.seed(42)

# ==========================================
# CONFIGURAÇÕES E BENCHMARKS
# ==========================================

BACIAS = [
    'Bacia de Campos',
    'Bacia de Santos',
    'Bacia do Espírito Santo',
    'Bacia de Sergipe-Alagoas',
    'Bacia Potiguar',
    'Bacia do Ceará',
    'Bacia de Camamu-Almada',
    'Bacia do Recôncavo',
    'Bacia do Solimões'
]

TECNICAS = [
    'remocao_completa',
    'rigs_to_reefs',
    'abandono_in_situ',
    'corte_afundamento',
    'leave_in_place',
    'remocao_parcial'
]

TIPOS_INSTALACAO = [
    'plataforma_fixa',
    'fpso',
    'manifold',
    'arvore_natal',
    'dutos'
]

# Fatores de custo por bacia (multiplicadores)
FATORES_BACIA = {
    'Bacia de Campos': 1.0,
    'Bacia de Santos': 1.15,
    'Bacia do Espírito Santo': 1.05,
    'Bacia de Sergipe-Alagoas': 0.95,
    'Bacia Potiguar': 0.90,
    'Bacia do Ceará': 0.95,
    'Bacia de Camamu-Almada': 1.0,
    'Bacia do Recôncavo': 0.85,
    'Bacia do Solimões': 1.1
}

# ==========================================
# FUNÇÕES AUXILIARES
# ==========================================

def gerar_profundidade_realista(bacia):
    """Gera profundidade baseada na bacia"""
    if bacia in ['Bacia de Santos', 'Bacia de Campos']:
        return np.random.normal(3000, 800)  # Águas profundas
    elif bacia in ['Bacia do Recôncavo', 'Bacia do Solimões']:
        return np.random.normal(1500, 500)  # Águas rasas/onshore
    else:
        return np.random.normal(2200, 600)  # Intermediário

def gerar_lamina_dagua(bacia):
    """Gera lâmina d'água baseada na bacia"""
    if bacia in ['Bacia de Santos', 'Bacia de Campos']:
        return np.random.normal(2000, 500)  # Águas profundas
    elif bacia in ['Bacia do Recôncavo', 'Bacia do Solimões']:
        return np.random.normal(100, 50)    # Onshore/raso
    else:
        return np.random.normal(800, 300)   # Intermediário

def calcular_custo_pa_poco(profundidade, lamina_agua):
    """Calcula custo de P&A por poço (USD milhões)"""
    # Custo base por profundidade
    if profundidade < 1500:
        custo_base = np.random.uniform(3, 8)
    elif profundidade < 3000:
        custo_base = np.random.uniform(8, 25)
    elif profundidade < 5000:
        custo_base = np.random.uniform(25, 50)
    else:
        custo_base = np.random.uniform(50, 120)

    # Ajuste por lâmina d'água
    if lamina_agua < 500:
        fator_lamina = 1.0
    elif lamina_agua < 1500:
        fator_lamina = 1.3
    elif lamina_agua < 3000:
        fator_lamina = 1.6
    else:
        fator_lamina = 2.2

    return custo_base * fator_lamina

def calcular_custo_instalacao(tipo, peso_ton=None):
    """Calcula custo de remoção de instalação (USD milhões)"""
    custos = {
        'plataforma_fixa': lambda p: (p * 8000 + 15_000_000) / 1_000_000,
        'fpso': lambda p: (p * 6000 + 8_000_000) / 1_000_000,
        'manifold': lambda p: (p * 15000 + 5_000_000) / 1_000_000,
        'arvore_natal': lambda p: 3 + np.random.uniform(-0.5, 0.5),
        'dutos': lambda p: 0.25 * p  # por km
    }

    if peso_ton is None:
        pesos = {
            'plataforma_fixa': np.random.uniform(5000, 30000),
            'fpso': np.random.uniform(60000, 120000),
            'manifold': np.random.uniform(100, 500),
            'arvore_natal': np.random.uniform(50, 150),
            'dutos': np.random.uniform(10, 100)  # km
        }
        peso_ton = pesos[tipo]

    return custos[tipo](peso_ton)

def selecionar_tecnica_inteligente(lamina_agua, distancia_costa, num_pocos):
    """Seleciona técnica mais provável baseada em características"""
    # Regras heurísticas para escolha realista

    if lamina_agua < 150:
        # Águas rasas: preferência por remoção completa
        return np.random.choice(
            ['remocao_completa', 'rigs_to_reefs', 'remocao_parcial'],
            p=[0.6, 0.3, 0.1]
        )
    elif lamina_agua < 500:
        return np.random.choice(
            ['remocao_completa', 'rigs_to_reefs', 'corte_afundamento'],
            p=[0.5, 0.3, 0.2]
        )
    else:
        # Águas profundas: mais complexo
        return np.random.choice(
            ['remocao_completa', 'leave_in_place', 'remocao_parcial'],
            p=[0.4, 0.35, 0.25]
        )

def gerar_riscos(num_pocos, lamina_agua, distancia_costa):
    """Gera número de riscos altos baseado em complexidade"""
    complexidade = (num_pocos / 10) + (lamina_agua / 2000) + (distancia_costa / 300)
    num_riscos_altos = int(np.random.poisson(complexidade * 2))
    return max(0, min(num_riscos_altos, 15))  # Cap em 15

def calcular_duracao_meses(num_pocos, lamina_agua, tecnica):
    """Calcula duração do projeto em meses"""
    # Base: 2 meses por poço
    duracao_base = num_pocos * 2

    # Ajuste por lâmina d'água (mais profundo = mais lento)
    if lamina_agua > 2000:
        duracao_base *= 1.5
    elif lamina_agua > 1000:
        duracao_base *= 1.2

    # Ajuste por técnica
    fatores_tecnica = {
        'remocao_completa': 1.2,
        'rigs_to_reefs': 0.8,
        'abandono_in_situ': 0.5,
        'corte_afundamento': 0.9,
        'leave_in_place': 0.6,
        'remocao_parcial': 1.0
    }

    duracao = duracao_base * fatores_tecnica.get(tecnica, 1.0)

    # Adicionar variação aleatória (±20%)
    variacao = np.random.uniform(0.8, 1.2)

    return int(duracao * variacao)

# ==========================================
# GERADOR PRINCIPAL
# ==========================================

def gerar_pdi_sintetico():
    """Gera um PDI sintético realista"""

    # Características básicas
    bacia = random.choice(BACIAS)
    num_pocos = np.random.poisson(6) + 1  # 1-20 poços, média 6
    num_pocos = min(num_pocos, 20)

    profundidade_media = gerar_profundidade_realista(bacia)
    lamina_agua = gerar_lamina_dagua(bacia)
    distancia_costa = np.random.uniform(10, 400)

    # Instalações
    tipo_instalacao = random.choice(TIPOS_INSTALACAO)

    # Técnica selecionada (inteligente)
    tecnica = selecionar_tecnica_inteligente(lamina_agua, distancia_costa, num_pocos)

    # Cálculo de custos
    custo_pa_total = sum([
        calcular_custo_pa_poco(
            profundidade_media + np.random.normal(0, 500),
            lamina_agua
        ) for _ in range(num_pocos)
    ])

    custo_remocao = calcular_custo_instalacao(tipo_instalacao)

    # Mobilização e logística (10-15% do total)
    custo_mobilizacao = (custo_pa_total + custo_remocao) * np.random.uniform(0.10, 0.15)

    # Resíduos e licenciamento (5-10% do total)
    custo_residuos = (custo_pa_total + custo_remocao) * np.random.uniform(0.05, 0.10)

    # Contingências (10-20%)
    contingencias = (custo_pa_total + custo_remocao + custo_mobilizacao + custo_residuos) * np.random.uniform(0.10, 0.20)

    custo_total = custo_pa_total + custo_remocao + custo_mobilizacao + custo_residuos + contingencias

    # Aplicar fator de bacia
    custo_total *= FATORES_BACIA[bacia]

    # Adicionar ruído realista (±10%)
    custo_total *= np.random.uniform(0.9, 1.1)

    # Outras métricas
    num_riscos_altos = gerar_riscos(num_pocos, lamina_agua, distancia_costa)
    duracao_meses = calcular_duracao_meses(num_pocos, lamina_agua, tecnica)

    # Probabilidade de aprovação (baseada em completude fictícia)
    completude = np.random.uniform(75, 100)
    if completude > 95:
        prob_aprovacao = np.random.uniform(0.85, 0.98)
    elif completude > 85:
        prob_aprovacao = np.random.uniform(0.70, 0.85)
    else:
        prob_aprovacao = np.random.uniform(0.50, 0.70)

    # Construir PDI
    pdi = {
        'id': f'PDI_{datetime.now().strftime("%Y%m%d")}_{random.randint(1000, 9999)}',
        'timestamp': datetime.now().isoformat(),

        # Features principais
        'bacia': bacia,
        'num_pocos': int(num_pocos),
        'profundidade_media': round(profundidade_media, 2),
        'lamina_agua': round(lamina_agua, 2),
        'distancia_costa': round(distancia_costa, 2),
        'tipo_instalacao': tipo_instalacao,
        'tecnica_selecionada': tecnica,

        # Targets (o que queremos prever)
        'custo_total_usd': round(custo_total, 2),
        'custo_pa_usd': round(custo_pa_total, 2),
        'custo_remocao_usd': round(custo_remocao, 2),
        'custo_mobilizacao_usd': round(custo_mobilizacao, 2),
        'duracao_meses': int(duracao_meses),
        'num_riscos_altos': int(num_riscos_altos),
        'prob_aprovacao_anp': round(prob_aprovacao, 3),

        # Metadados
        'completude_pct': round(completude, 1),
        'complexidade': round((num_pocos/10 + lamina_agua/2000 + distancia_costa/300), 2),

        # Classificações
        'classe_profundidade': 'ultraProfundo' if profundidade_media > 5000 else
                               'profundo' if profundidade_media > 3000 else
                               'intermediario' if profundidade_media > 1500 else 'raso',

        'classe_lamina': 'ultraProfunda' if lamina_agua > 3000 else
                        'profunda' if lamina_agua > 1500 else
                        'media' if lamina_agua > 500 else 'rasa',

        'classe_distancia': 'muitoDistante' if distancia_costa > 300 else
                           'distante' if distancia_costa > 150 else
                           'media' if distancia_costa > 50 else 'proxima'
    }

    return pdi

def gerar_dataset_completo(n_samples=500):
    """Gera dataset completo com n amostras"""
    print(f"[ML] Gerando dataset com {n_samples} PDIs sinteticos...")

    dataset = []
    for i in range(n_samples):
        if (i + 1) % 50 == 0:
            print(f"   Gerados: {i + 1}/{n_samples} PDIs")

        pdi = gerar_pdi_sintetico()
        dataset.append(pdi)

    df = pd.DataFrame(dataset)

    print(f"\n[OK] Dataset gerado com sucesso!")
    print(f"   Shape: {df.shape}")
    print(f"   Colunas: {len(df.columns)}")
    print(f"\n[STATS] Estatisticas:")
    print(df[['num_pocos', 'custo_total_usd', 'duracao_meses']].describe())

    return df

def salvar_dataset(df, formato='json'):
    """Salva dataset em JSON e CSV"""
    import os
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # Criar pasta dataset se não existir
    os.makedirs('dataset', exist_ok=True)

    if formato == 'json' or formato == 'both':
        # Salvar JSON consolidado
        filename_json = f'dataset/dataset_completo_{timestamp}.json'
        df.to_json(filename_json, orient='records', indent=2, force_ascii=False)
        print(f"\n[SAVE] Salvo: {filename_json}")

    if formato == 'csv' or formato == 'both':
        filename_csv = f'dataset/dataset_completo_{timestamp}.csv'
        df.to_csv(filename_csv, index=False, encoding='utf-8')
        print(f"[SAVE] Salvo: {filename_csv}")

    print(f"[OK] Dataset completo salvo com sucesso!")
    return df

# ==========================================
# EXECUÇÃO
# ==========================================

if __name__ == '__main__':
    # Gerar dataset
    df = gerar_dataset_completo(n_samples=500)

    # Salvar
    salvar_dataset(df, formato='both')

    print("\n[OK] Dataset pronto para treinar modelos ML!")
    print("\nProximo passo: python train_models.py")
