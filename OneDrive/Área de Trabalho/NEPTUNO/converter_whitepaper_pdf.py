#!/usr/bin/env python3
"""
Conversor de WhitePaper Markdown para PDF
PDIDESCOM v2.1.0
"""

import markdown
from weasyprint import HTML, CSS
from pathlib import Path
import re

def markdown_para_html(md_file):
    """Converte Markdown para HTML com estilo profissional"""

    # Ler arquivo markdown
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Converter Markdown para HTML
    html_content = markdown.markdown(
        md_content,
        extensions=[
            'markdown.extensions.tables',
            'markdown.extensions.fenced_code',
            'markdown.extensions.codehilite',
            'markdown.extensions.toc',
        ]
    )

    # Template HTML profissional
    html_template = f"""
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDIDESCOM - WhitePaper LGPD e Privacidade</title>
    <style>
        @page {{
            size: A4;
            margin: 2.5cm 2cm 2.5cm 2cm;

            @top-center {{
                content: "PDIDESCOM v2.1.0 - Capítulo LGPD";
                font-family: 'Arial', sans-serif;
                font-size: 9pt;
                color: #666;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
            }}

            @bottom-right {{
                content: "Página " counter(page) " de " counter(pages);
                font-family: 'Arial', sans-serif;
                font-size: 9pt;
                color: #666;
            }}

            @bottom-left {{
                content: "© 2025 PDIDESCOM";
                font-family: 'Arial', sans-serif;
                font-size: 9pt;
                color: #666;
            }}
        }}

        @page :first {{
            @top-center {{
                content: "";
            }}
        }}

        body {{
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333;
            max-width: 100%;
            margin: 0;
            padding: 0;
        }}

        h1 {{
            font-size: 24pt;
            color: #1e40af;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 10px;
            margin-top: 0;
            margin-bottom: 20px;
            page-break-before: always;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
        }}

        h1:first-of-type {{
            page-break-before: avoid;
            font-size: 32pt;
            text-align: center;
            border: none;
            color: #1e40af;
        }}

        h2 {{
            font-size: 18pt;
            color: #2563eb;
            margin-top: 25px;
            margin-bottom: 15px;
            border-left: 4px solid #3b82f6;
            padding-left: 15px;
            page-break-after: avoid;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
        }}

        h3 {{
            font-size: 14pt;
            color: #3b82f6;
            margin-top: 20px;
            margin-bottom: 12px;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
        }}

        h4 {{
            font-size: 12pt;
            color: #60a5fa;
            margin-top: 15px;
            margin-bottom: 10px;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
        }}

        p {{
            text-align: justify;
            margin-bottom: 12px;
            orphans: 3;
            widows: 3;
        }}

        code {{
            background-color: #f3f4f6;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 9.5pt;
            color: #dc2626;
        }}

        pre {{
            background-color: #1f2937;
            color: #f3f4f6;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 9pt;
            line-height: 1.4;
            page-break-inside: avoid;
            border-left: 4px solid #3b82f6;
        }}

        pre code {{
            background-color: transparent;
            color: #f3f4f6;
            padding: 0;
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            page-break-inside: avoid;
            font-size: 10pt;
        }}

        table thead {{
            background-color: #1e40af;
            color: white;
        }}

        table th {{
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
            font-weight: bold;
        }}

        table td {{
            padding: 8px;
            border: 1px solid #ddd;
        }}

        table tbody tr:nth-child(even) {{
            background-color: #f9fafb;
        }}

        ul, ol {{
            margin-left: 25px;
            margin-bottom: 12px;
        }}

        li {{
            margin-bottom: 6px;
        }}

        blockquote {{
            border-left: 4px solid #60a5fa;
            padding-left: 20px;
            margin-left: 0;
            font-style: italic;
            color: #4b5563;
            background-color: #f0f9ff;
            padding: 15px 20px;
            border-radius: 5px;
        }}

        .toc {{
            background-color: #eff6ff;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #3b82f6;
            margin-bottom: 30px;
            page-break-inside: avoid;
        }}

        .toc h2 {{
            margin-top: 0;
            border: none;
            padding: 0;
        }}

        strong {{
            color: #1e40af;
            font-weight: bold;
        }}

        em {{
            color: #6b7280;
        }}

        a {{
            color: #2563eb;
            text-decoration: none;
            border-bottom: 1px dotted #3b82f6;
        }}

        a:hover {{
            color: #1e40af;
        }}

        .page-break {{
            page-break-before: always;
        }}

        .no-break {{
            page-break-inside: avoid;
        }}

        hr {{
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 25px 0;
        }}

        .cover-page {{
            text-align: center;
            padding-top: 200px;
            page-break-after: always;
        }}

        .cover-page h1 {{
            font-size: 36pt;
            margin-bottom: 20px;
            border: none;
        }}

        .cover-page .subtitle {{
            font-size: 18pt;
            color: #6b7280;
            margin-bottom: 15px;
        }}

        .cover-page .metadata {{
            font-size: 12pt;
            color: #9ca3af;
            margin-top: 50px;
        }}

        .highlight-box {{
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            page-break-inside: avoid;
        }}

        .success-box {{
            background-color: #d1fae5;
            border-left: 4px solid #10b981;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            page-break-inside: avoid;
        }}

        .info-box {{
            background-color: #dbeafe;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
            page-break-inside: avoid;
        }}
    </style>
</head>
<body>
    <div class="cover-page">
        <h1>CAPÍTULO 7: LGPD E PRIVACIDADE DE DADOS</h1>
        <div class="subtitle">Machine Learning para Descomissionamento</div>
        <div class="subtitle">WhitePaper Técnico PDIDESCOM v2.1.0</div>
        <div class="metadata">
            <p><strong>Autor:</strong> Tadeco - Especialista em Descomissionamento ANP 817/2020</p>
            <p><strong>Data:</strong> Janeiro 2025</p>
            <p><strong>Classificação:</strong> Público</p>
            <p><strong>Versão:</strong> 2.1.0</p>
        </div>
    </div>

    {html_content}

    <div class="page-break"></div>
    <div style="text-align: center; padding-top: 250px; color: #6b7280;">
        <h2 style="border: none; color: #1e40af;">© 2025 PDIDESCOM</h2>
        <p>Todos os direitos reservados</p>
        <p style="margin-top: 30px;">
            <strong>Contato:</strong><br>
            Email: dpo@pdidescom.com<br>
            WhatsApp: +55 21 96446-2281
        </p>
    </div>
</body>
</html>
"""

    return html_template

def converter_para_pdf(md_file, pdf_file):
    """Converte arquivo Markdown para PDF"""

    print(f"🔄 Convertendo {md_file} para PDF...")

    # Converter MD para HTML
    html_content = markdown_para_html(md_file)

    # Gerar PDF
    HTML(string=html_content).write_pdf(pdf_file)

    print(f"✅ PDF gerado com sucesso: {pdf_file}")
    print(f"📄 Tamanho: {Path(pdf_file).stat().st_size / 1024:.2f} KB")

if __name__ == "__main__":
    md_file = Path(__file__).parent / "WHITEPAPER_CAPITULO_LGPD.md"
    pdf_file = Path(__file__).parent / "WHITEPAPER_CAPITULO_LGPD.pdf"

    if not md_file.exists():
        print(f"❌ Arquivo não encontrado: {md_file}")
        exit(1)

    try:
        converter_para_pdf(md_file, pdf_file)
        print("\n🎉 Conversão concluída!")
        print(f"🔗 Abra o arquivo: {pdf_file}")
    except Exception as e:
        print(f"❌ Erro na conversão: {e}")
        print("\n📦 Instalando dependências necessárias...")
        print("Execute: pip install markdown weasyprint")
