/**
 * 🎬 CONFIGURAÇÃO PLAYWRIGHT PARA DEMO NEPTUNO
 *
 * Qualidade de vídeo: Full HD 1920x1080 @ 30fps
 * Formato: .webm (conversível para MP4)
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './',

  // Timeout de 2 minutos por teste (demo é de 60s + margem)
  timeout: 120000,

  // Configuração de vídeo
  use: {
    // URL base da aplicação
    baseURL: 'http://localhost:5173',

    // Configuração de vídeo - MÁXIMA QUALIDADE
    video: {
      mode: 'on', // Sempre gravar
      size: { width: 1920, height: 1080 }, // Full HD
    },

    // Screenshot em caso de falha
    screenshot: 'only-on-failure',

    // Trace para debug (caso necessário)
    trace: 'retain-on-failure',
  },

  // Projetos (browsers)
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  // Pasta de saída
  outputDir: 'test-results/',

  // Pasta de vídeos
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }]
  ],
});
