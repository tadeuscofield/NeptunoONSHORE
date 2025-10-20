/**
 * 🎬 NEPTUNO - SCRIPT DE DEMONSTRAÇÃO AUTOMATIZADA
 *
 * Duração: 60 segundos
 * Qualidade: 1920x1080 (Full HD) @ 30fps
 * Formato: .webm (convertível para .mp4)
 *
 * Executar:
 * npx playwright test demo-neptuno.spec.js --headed --project=chromium
 *
 * Vídeo será salvo em: test-results/
 */

const { test, expect } = require('@playwright/test');

// Configuração de vídeo e viewport
test.use({
  viewport: { width: 1920, height: 1080 },
  video: {
    mode: 'on',
    size: { width: 1920, height: 1080 }
  },
  actionTimeout: 30000, // 30s timeout por ação
});

test.describe('NEPTUNO Demo - 60 segundos', () => {

  test('Demonstração completa do sistema NEPTUNO', async ({ page }) => {

    // ============================================
    // 0-10s: ABERTURA + NAVEGAÇÃO INICIAL
    // ============================================
    console.log('⏱️  0-10s: Abertura e navegação inicial');

    // Acessar aplicação local
    await page.goto('http://localhost:8080');

    // Aguardar carregamento completo
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // 2s para visualização inicial

    // Aceitar termos de uso (se aparecer modal)
    try {
      // Marcar checkbox dos termos
      await page.click('input[type="checkbox"]', { timeout: 5000 });
      await page.waitForTimeout(500);

      // Clicar no botão para continuar
      await page.click('button:has-text("continuar")');
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log('Modal de termos já foi aceito ou não apareceu');
    }

    // Já estamos na tela do PDI (não precisa clicar em aba)
    await page.waitForTimeout(1000);

    // ============================================
    // 10-25s: PREENCHIMENTO STEP 1 (DADOS GERAIS)
    // ============================================
    console.log('⏱️  10-25s: Preenchimento dados gerais');

    // Campo Operador
    await page.fill('input[name="operador"]', 'Petrobras S.A.', { delay: 50 });
    await page.waitForTimeout(500);

    // Campo Campo/Instalação
    await page.fill('input[name="campoInstalacao"]', 'Campo de Marlim', { delay: 50 });
    await page.waitForTimeout(500);

    // Dropdown Tipo PDI
    await page.selectOption('select[name="tipoPDI"]', 'executivo');
    await page.waitForTimeout(500);

    // Dropdown Tipo Instalação
    await page.selectOption('select[name="tipoInstalacao"]', 'maritima');
    await page.waitForTimeout(500);

    // Dropdown Bacia
    await page.selectOption('select[name="bacia"]', 'Bacia de Campos');
    await page.waitForTimeout(500);

    // Profundidade Lâmina (ESSENCIAL para cálculo)
    await page.fill('input[name="profundidadeLamina"]', '1360', { delay: 50 });
    await page.waitForTimeout(500);

    // Distância da Costa (ESSENCIAL)
    await page.fill('input[name="distanciaCosta"]', '120', { delay: 50 });
    await page.waitForTimeout(1500); // Pausa para visualizar Step 1 completo

    // ============================================
    // 25-40s: STEP 3 - INVENTÁRIO (POÇOS + INSTALAÇÕES)
    // ============================================
    console.log('⏱️  25-40s: Adicionar inventário');

    // Navegar para Step 3 - Inventário
    await page.click('button:has-text("3")'); // Botão de navegação rápida
    await page.waitForTimeout(1000);

    // Adicionar Poço 1 (Produtor)
    await page.click('button:has-text("Adicionar Poço")');
    await page.waitForTimeout(800);
    await page.fill('input[placeholder*="Nome"]', 'P-35-001', { delay: 30 });
    await page.selectOption('select:near(input[placeholder*="Nome"])', 'produtor');
    await page.fill('input[type="number"]:near(input[placeholder*="Nome"])', '4200', { delay: 30 });
    await page.waitForTimeout(500);

    // Adicionar Poço 2 (Injetor)
    await page.click('button:has-text("Adicionar Poço")');
    await page.waitForTimeout(800);
    const pocoInputs2 = await page.locator('input[placeholder*="Nome"]').nth(1);
    await pocoInputs2.fill('P-35-002', { delay: 30 });
    await page.selectOption('select:near(input[placeholder*="Nome"])', 'injetor');
    await page.waitForTimeout(500);

    // Adicionar Instalação - FPSO
    await page.click('button:has-text("Adicionar Instalação")');
    await page.waitForTimeout(800);
    await page.fill('input[placeholder*="instalação"]', 'FPSO P-35', { delay: 30 });
    await page.selectOption('select:near(input[placeholder*="instalação"])', 'fpso');
    await page.fill('input[placeholder*="Peso"]', '80000', { delay: 30 });
    await page.waitForTimeout(1500);

    // ============================================
    // 40-50s: STEP 8 - CÁLCULO AUTOMÁTICO
    // ============================================
    console.log('⏱️  40-50s: Cálculo automático de custos');

    // Navegar para Step 8 - Custos
    await page.click('button:has-text("8")');
    await page.waitForTimeout(1000);

    // CLICAR NO BOTÃO MÁGICO: Calcular Automaticamente
    await page.click('button:has-text("Calcular Automaticamente")');
    await page.waitForTimeout(2000); // Aguardar cálculo + animação

    // Scroll suave para visualizar resultados
    await page.evaluate(() => {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);

    // ============================================
    // 50-60s: GERAÇÃO DE PDF + FINALIZAÇÃO
    // ============================================
    console.log('⏱️  50-60s: Geração de PDF e finalização');

    // Scroll para o botão de PDF
    await page.evaluate(() => {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);

    // Clicar em "Gerar PDF"
    await page.click('button:has-text("Gerar PDF")');
    await page.waitForTimeout(2000);

    // Mostrar mensagem final (se houver)
    await page.waitForTimeout(1500);

    // Scroll final para mostrar overview
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(1500);

    console.log('✅ DEMO FINALIZADA - Vídeo salvo!');
  });

});
