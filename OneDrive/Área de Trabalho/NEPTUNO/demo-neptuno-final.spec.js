/**
 * 🎬 NEPTUNO - DEMO FINAL (Navegação Completa 9 Passos)
 *
 * Duração: ~90 segundos (10s por passo)
 *
 * Fluxo:
 * 1. Aceitar termos → Passo 1
 * 2. Passos 1-8: Rolar (topo→baixo) + Avançar (10s cada)
 * 3. Passo 9: Apenas rolar até o final
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

test('NEPTUNO - Demonstração Completa 9 Passos', async ({ page }) => {

  console.log('🎬 INICIANDO GRAVAÇÃO DEMO NEPTUNO - 90 SEGUNDOS');

  // ============================================
  // ABERTURA: Acessar + Aceitar Termos
  // ============================================
  console.log('📌 Acessando aplicação...');

  await page.goto('http://localhost:8080');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // 2s visualização inicial

  // Aceitar termos de uso
  console.log('✅ Aceitando termos de uso...');
  try {
    await page.click('input[type="checkbox"]', { timeout: 5000 });
    await page.waitForTimeout(500);
    await page.click('button:has-text("continuar")');
    await page.waitForTimeout(2000);
  } catch (e) {
    console.log('⚠️ Termos já aceitos ou modal não encontrado');
  }

  // ============================================
  // FUNÇÃO AUXILIAR: Rolar página
  // ============================================
  async function rolarPagina() {
    // Ir para o topo
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(2000); // 2s no topo

    // Rolar para o meio
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' }));
    await page.waitForTimeout(2500); // 2.5s no meio

    // Rolar até o final
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
    await page.waitForTimeout(2500); // 2.5s no final

    // Voltar pro topo (preparar para próximo passo)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(1500); // 1.5s
  }

  // ============================================
  // PASSO 1: Referência do Projeto
  // ============================================
  console.log('📋 PASSO 1/9: Referência do Projeto');

  await page.waitForTimeout(1000);
  await rolarPagina(); // 10s total

  // Clicar em "Avançar" ou "Próximo"
  try {
    const btnProximo = page.locator('button:has-text("Próximo"), button:has-text("Avançar")').first();
    await btnProximo.click();
    await page.waitForTimeout(1000);
  } catch (e) {
    console.log('⚠️ Botão Avançar não encontrado, tentando navegação por número...');
    await page.click('button:has-text("2")').catch(() => {});
  }

  // ============================================
  // PASSO 2: Identificação
  // ============================================
  console.log('📋 PASSO 2/9: Identificação');

  await page.waitForTimeout(1000);
  await rolarPagina(); // 10s total

  try {
    const btnProximo = page.locator('button:has-text("Próximo"), button:has-text("Avançar")').first();
    await btnProximo.click();
    await page.waitForTimeout(1000);
  } catch (e) {
    await page.click('button:has-text("3")').catch(() => {});
  }

  // ============================================
  // PASSO 3: Inventário
  // ============================================
  console.log('📋 PASSO 3/9: Inventário');

  await page.waitForTimeout(1000);
  await rolarPagina(); // 10s total

  try {
    const btnProximo = page.locator('button:has-text("Próximo"), button:has-text("Avançar")').first();
    await btnProximo.click();
    await page.waitForTimeout(1000);
  } catch (e) {
    await page.click('button:has-text("4")').catch(() => {});
  }

  // ============================================
  // PASSO 4: Alternativas Técnicas
  // ============================================
  console.log('📋 PASSO 4/9: Alternativas Técnicas');

  await page.waitForTimeout(1000);
  await rolarPagina(); // 10s total

  try {
    const btnProximo = page.locator('button:has-text("Próximo"), button:has-text("Avançar")').first();
    await btnProximo.click();
    await page.waitForTimeout(1000);
  } catch (e) {
    await page.click('button:has-text("5")').catch(() => {});
  }

  // ============================================
  // PASSO 5: Avaliação Ambiental
  // ============================================
  console.log('📋 PASSO 5/9: Avaliação Ambiental');

  await page.waitForTimeout(1000);
  await rolarPagina(); // 10s total

  try {
    const btnProximo = page.locator('button:has-text("Próximo"), button:has-text("Avançar")').first();
    await btnProximo.click();
    await page.waitForTimeout(1000);
  } catch (e) {
    await page.click('button:has-text("6")').catch(() => {});
  }

  // ============================================
  // PASSO 6: Segurança
  // ============================================
  console.log('📋 PASSO 6/9: Segurança');

  await page.waitForTimeout(1000);
  await rolarPagina(); // 10s total

  try {
    const btnProximo = page.locator('button:has-text("Próximo"), button:has-text("Avançar")').first();
    await btnProximo.click();
    await page.waitForTimeout(1000);
  } catch (e) {
    await page.click('button:has-text("7")').catch(() => {});
  }

  // ============================================
  // PASSO 7: Cronograma
  // ============================================
  console.log('📋 PASSO 7/9: Cronograma');

  await page.waitForTimeout(1000);
  await rolarPagina(); // 10s total

  try {
    const btnProximo = page.locator('button:has-text("Próximo"), button:has-text("Avançar")').first();
    await btnProximo.click();
    await page.waitForTimeout(1000);
  } catch (e) {
    await page.click('button:has-text("8")').catch(() => {});
  }

  // ============================================
  // PASSO 8: Custos
  // ============================================
  console.log('📋 PASSO 8/9: Custos');

  await page.waitForTimeout(1000);
  await rolarPagina(); // 10s total

  try {
    const btnProximo = page.locator('button:has-text("Próximo"), button:has-text("Avançar"), button:has-text("Finalizar")').first();
    await btnProximo.click();
    await page.waitForTimeout(1000);
  } catch (e) {
    await page.click('button:has-text("9")').catch(() => {});
  }

  // ============================================
  // PASSO 9: Revisão Final (SEM AVANÇAR - APENAS ROLAR)
  // ============================================
  console.log('📋 PASSO 9/9: Revisão Final');

  await page.waitForTimeout(1000);

  // Rolar completo (sem botão avançar)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 3, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  await page.evaluate(() => window.scrollTo({ top: (document.body.scrollHeight / 3) * 2, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
  await page.waitForTimeout(3000); // 3s no final para mostrar tudo

  // Voltar pro topo (finalização elegante)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  console.log('✅ DEMO FINALIZADA - 9 PASSOS COMPLETOS!');
  console.log('📹 Vídeo salvo em: test-results/');
});
