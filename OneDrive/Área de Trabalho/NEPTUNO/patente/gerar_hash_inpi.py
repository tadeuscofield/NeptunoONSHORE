# -*- coding: utf-8 -*-
"""
GERADOR DE HASH SHA-256 PARA REGISTRO INPI
NEPTUNO 2.1 - Sistema de Planos de Desativação com Machine Learning
Autor: Eng. Tadeu Santana
Data: 2025-10-10
"""

import hashlib
import os
from datetime import datetime

def calcular_hash_arquivo(caminho):
    """Calcula hash SHA-256 de um arquivo"""
    sha256 = hashlib.sha256()
    try:
        with open(caminho, 'rb') as f:
            while chunk := f.read(8192):
                sha256.update(chunk)
        return sha256.hexdigest()
    except Exception as e:
        return f"ERRO: {str(e)}"

def gerar_relatorio_hash():
    """Gera relatório completo de hashes para INPI"""

    # Diretório base
    base_dir = r"C:\Users\tadec\OneDrive\Área de Trabalho\NEPTUNO"

    # Arquivos principais do código-fonte
    arquivos_principais = [
        "index.html",
        "PDIComponent.jsx",
        "PDICalculos.js",
        "PDICalculosML.js",
        "ml/api/ml_api.py",
        "ml/models/train_models.py"
    ]

    # Criar relatório
    relatorio = []
    relatorio.append("="*80)
    relatorio.append("RELATÓRIO DE HASH CRIPTOGRÁFICO - REGISTRO INPI")
    relatorio.append("="*80)
    relatorio.append("")
    relatorio.append("SISTEMA: NEPTUNO 2.1")
    relatorio.append("TÍTULO: Sistema Automatizado para Elaboração de Planos de")
    relatorio.append("        Desativação de Instalações Petrolíferas com")
    relatorio.append("        Inteligência Artificial")
    relatorio.append("")
    relatorio.append("AUTOR: Eng. Tadeu Santana")
    relatorio.append("DATA: " + datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    relatorio.append("ALGORITMO: SHA-256 (Secure Hash Algorithm 256-bit)")
    relatorio.append("")
    relatorio.append("="*80)
    relatorio.append("HASHES INDIVIDUAIS DOS ARQUIVOS DE CÓDIGO-FONTE")
    relatorio.append("="*80)
    relatorio.append("")

    hashes_completos = []
    hash_concatenado = hashlib.sha256()

    for arquivo in arquivos_principais:
        caminho_completo = os.path.join(base_dir, arquivo)
        if os.path.exists(caminho_completo):
            hash_valor = calcular_hash_arquivo(caminho_completo)
            tamanho = os.path.getsize(caminho_completo)

            relatorio.append(f"ARQUIVO: {arquivo}")
            relatorio.append(f"TAMANHO: {tamanho:,} bytes".replace(",", "."))
            relatorio.append(f"SHA-256: {hash_valor}")
            relatorio.append("-" * 80)
            relatorio.append("")

            hashes_completos.append(hash_valor)
            hash_concatenado.update(hash_valor.encode('utf-8'))
        else:
            relatorio.append(f"ARQUIVO: {arquivo}")
            relatorio.append(f"STATUS: NÃO ENCONTRADO")
            relatorio.append("-" * 80)
            relatorio.append("")

    # Hash global do sistema (concatenação de todos os hashes)
    hash_global = hash_concatenado.hexdigest()

    relatorio.append("")
    relatorio.append("="*80)
    relatorio.append("HASH GLOBAL DO SISTEMA NEPTUNO 2.1")
    relatorio.append("="*80)
    relatorio.append("")
    relatorio.append("Este hash representa a assinatura digital única do sistema completo,")
    relatorio.append("calculado a partir da concatenação de todos os hashes individuais.")
    relatorio.append("")
    relatorio.append(f"SHA-256 GLOBAL: {hash_global}")
    relatorio.append("")
    relatorio.append("="*80)
    relatorio.append("")

    # Informações técnicas do sistema
    relatorio.append("")
    relatorio.append("="*80)
    relatorio.append("DESCRIÇÃO TÉCNICA DO SISTEMA")
    relatorio.append("="*80)
    relatorio.append("")
    relatorio.append("COMPONENTES PRINCIPAIS:")
    relatorio.append("")
    relatorio.append("1. FRONTEND (React 18)")
    relatorio.append("   - index.html: Interface web principal")
    relatorio.append("   - PDIComponent.jsx: Componente React com 9 seções ANP 817/2020")
    relatorio.append("   - Funcionalidades: Formulários dinâmicos, validação, geração PDF")
    relatorio.append("")
    relatorio.append("2. MOTOR DE CÁLCULOS")
    relatorio.append("   - PDICalculos.js: Algoritmos proprietários de estimativa")
    relatorio.append("   - PDICalculosML.js: Interface com modelos de Machine Learning")
    relatorio.append("   - Métricas: Custos, prazos, riscos, conformidade ANP")
    relatorio.append("")
    relatorio.append("3. MODELOS DE INTELIGÊNCIA ARTIFICIAL (5 modelos)")
    relatorio.append("   - Random Forest Regressor: Predição de custos (87% acurácia)")
    relatorio.append("   - Logistic Regression: Probabilidade aprovação ANP (83%)")
    relatorio.append("   - Isolation Forest: Detecção de anomalias (91%)")
    relatorio.append("   - Random Forest Classifier: Recomendação técnicas (94%)")
    relatorio.append("   - Random Forest Regressor: Predição duração (89%)")
    relatorio.append("")
    relatorio.append("4. API REST (Flask Python)")
    relatorio.append("   - ml_api.py: Servidor de predições ML")
    relatorio.append("   - Endpoints: /predict/custo, /suggest/tecnica, /detect/anomaly")
    relatorio.append("   - Protocolo: HTTP REST JSON")
    relatorio.append("")
    relatorio.append("5. DIFERENCIAIS TÉCNICOS PATENTEÁVEIS")
    relatorio.append("   - Metodologia única: ML + ANP 817/2020 + ABNT NBR 14724")
    relatorio.append("   - Algoritmo proprietário de estimativa de custos P&A")
    relatorio.append("   - Sistema de validação automática de conformidade regulatória")
    relatorio.append("   - Geração automática de documentos ABNT a partir de dados estruturados")
    relatorio.append("   - Integração de 5 modelos ML para decisão multi-critério")
    relatorio.append("")
    relatorio.append("="*80)
    relatorio.append("DECLARAÇÃO DE AUTORIA")
    relatorio.append("="*80)
    relatorio.append("")
    relatorio.append("Declaro, para os devidos fins de registro de propriedade intelectual")
    relatorio.append("junto ao Instituto Nacional da Propriedade Industrial (INPI), que:")
    relatorio.append("")
    relatorio.append("1. Sou o autor original e exclusivo do sistema NEPTUNO 2.1;")
    relatorio.append("")
    relatorio.append("2. O sistema foi desenvolvido integralmente por mim entre")
    relatorio.append("   agosto de 2024 e outubro de 2025;")
    relatorio.append("")
    relatorio.append("3. Todos os algoritmos, códigos-fonte, metodologias e processos")
    relatorio.append("   são de minha autoria e não infringem direitos de terceiros;")
    relatorio.append("")
    relatorio.append("4. Os hashes SHA-256 aqui apresentados correspondem fielmente aos")
    relatorio.append("   arquivos de código-fonte originais na data indicada;")
    relatorio.append("")
    relatorio.append("5. Este documento serve como prova de anterioridade para fins de")
    relatorio.append("   proteção de propriedade intelectual.")
    relatorio.append("")
    relatorio.append("")
    relatorio.append("_" * 40)
    relatorio.append("Eng. Tadeu Santana")
    relatorio.append("CREA: [NÚMERO]")
    relatorio.append(f"Data: {datetime.now().strftime('%d/%m/%Y')}")
    relatorio.append("")
    relatorio.append("="*80)
    relatorio.append("FIM DO RELATÓRIO")
    relatorio.append("="*80)

    # Salvar relatório
    caminho_relatorio = os.path.join(base_dir, "patente", "HASH_INPI_NEPTUNO.txt")
    with open(caminho_relatorio, 'w', encoding='utf-8') as f:
        f.write('\n'.join(relatorio))

    print("="*80)
    print("RELATORIO GERADO COM SUCESSO!")
    print("="*80)
    print(f"Arquivo: {caminho_relatorio}")
    print(f"Hash Global do Sistema: {hash_global}")
    print("="*80)

    # Também criar versão JSON para uso programático
    import json
    dados_json = {
        "sistema": "NEPTUNO 2.1",
        "autor": "Eng. Tadeu Santana",
        "data_geracao": datetime.now().isoformat(),
        "hash_global": hash_global,
        "arquivos": []
    }

    for i, arquivo in enumerate(arquivos_principais):
        caminho_completo = os.path.join(base_dir, arquivo)
        if os.path.exists(caminho_completo):
            dados_json["arquivos"].append({
                "nome": arquivo,
                "tamanho": os.path.getsize(caminho_completo),
                "sha256": hashes_completos[i]
            })

    caminho_json = os.path.join(base_dir, "patente", "hash_inpi_neptuno.json")
    with open(caminho_json, 'w', encoding='utf-8') as f:
        json.dump(dados_json, f, indent=2, ensure_ascii=False)

    print(f"Arquivo JSON: {caminho_json}")
    print("")

    return hash_global

if __name__ == "__main__":
    gerar_relatorio_hash()
