/**
 * 🎬 NEPTUNO - DEMO SIMPLIFICADA (VERSÃO QUE FUNCIONA!)
 *
 * Duração: ~45 segundos
 * Foco: Mostrar interface e navegação pelos steps
 */

const { test } = require('@playwright/test');

test.use({
  viewport: { width: 1920, height: 1080 },
  video: {
    mode: 'on',
    size: { width: 1920, height: 1080 }
  },
  actionTimeout: 30000,
});

test('NEPTUNO - Demonstração Navegação Interface', async ({ page }) => {

  console.log('🎬 Iniciando gravação DEMO...');

  // Acessar aplicação
  await page.goto('http://localhost:8080');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Aceitar termos
  try {
    await page.click('input[type="checkbox"]', { timeout: 5000 });
    await page.waitForTimeout(500);
    await page.click('button:has-text("continuar")');
    await page.waitForTimeout(2000);
  } catch (e) {
    console.log('Termos já aceitos');
  }

  console.log('✅ Tela inicial carregada');

  // PASSO 1: Mostrar formulário Step 1
  await page.waitForTimeout(2000);

  // Scroll suave para baixo
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  // Scroll mais para baixo
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  // Voltar pro topo
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  // PASSO 2: Navegar para Step 2 (se existir botão de navegação)
  try {
    // Procurar botão "Próximo" ou similar
    const proximoBtn = page.locator('button:has-text("Próximo")');
    if (await proximoBtn.count() > 0) {
      await proximoBtn.click();
      await page.waitForTimeout(3000);
      console.log('✅ Navegou para Step 2');
    }
  } catch (e) {
    console.log('Navegação manual de steps não encontrada');
  }

  // PASSO 3: Scroll final
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  // PASSO 4: Procurar botão "Gerar PDF" e mostrar
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(1000);

  // Procurar botão Gerar PDF no cabeçalho
  try {
    const pdfBtn = page.locator('button:has-text("Gerar PDF")');
    if (await pdfBtn.count() > 0) {
      // Apenas highlight, não clicar
      await pdfBtn.hover();
      await page.waitForTimeout(2000);
      console.log('✅ Botão Gerar PDF destacado');
    }
  } catch (e) {
    console.log('Botão PDF não encontrado');
  }

  // Finalizar com panorâmica
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'smooth' }));
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  console.log('✅ DEMO FINALIZADA - Vídeo salvo!');
});
