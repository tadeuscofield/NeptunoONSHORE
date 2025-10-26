import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { pdiGenerator } from './pdfGeneratorFixed.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS configurado para produção
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://frontend-dkxqz1q8d-tadeu-santanas-projects-bff2e2e9.vercel.app',
  /\.vercel\.app$/  // Qualquer domínio Vercel
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return allowed === origin;
      return allowed.test(origin);
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, true); // Em desenvolvimento, permite tudo
    }
  },
  credentials: true
}));
app.use(express.json());

// In-memory storage (mock database)
const users = [];
const projects = [];

// JWT Secret
const JWT_SECRET = 'neptuno_jwt_secret_key_2025';

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'NEPTUNO ONSHORE Mock Server Running',
    mode: 'MOCK (sem PostgreSQL)',
    timestamp: new Date().toISOString()
  });
});

// Trial Routes
app.post('/api/trial/request', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email é obrigatório'
      });
    }

    // Generate 6-digit code
    const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72h

    // Check if user already exists
    let user = users.find(u => u.email === email);

    if (user) {
      // Update existing user
      user.trialAccessCode = accessCode;
      user.trialExpiresAt = expiresAt;
    } else {
      // Create new user
      user = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        company: null,
        role: 'operator',
        isTrial: true,
        trialAccessCode: accessCode,
        trialExpiresAt: expiresAt,
        projectsCreated: 0,
        createdAt: new Date(),
        isActive: true
      };
      users.push(user);
    }

    console.log(`\n✅ Trial code generated: ${accessCode} for ${email}`);
    console.log(`⏰ Expires at: ${expiresAt}\n`);

    res.json({
      success: true,
      message: `Código de acesso enviado para ${email}`,
      data: {
        email,
        expiresAt,
        // In mock mode, we return the code for easy testing
        accessCode // Remove this in production
      }
    });
  } catch (error) {
    console.error('Error in trial request:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao solicitar acesso trial'
    });
  }
});

app.post('/api/trial/login', async (req, res) => {
  try {
    const { email, accessCode } = req.body;

    if (!email || !accessCode) {
      return res.status(400).json({
        success: false,
        message: 'Email e código são obrigatórios'
      });
    }

    // Check for ADMIN code first
    const TADEU_ADMIN_CODE = 'NEPTUNO-ADMIN-TADEU-2025';
    const TADEU_EMAIL = 'tadeu@neptunodescom.com';

    if (accessCode === TADEU_ADMIN_CODE) {
      let adminUser = users.find(u => u.email === TADEU_EMAIL);

      if (!adminUser) {
        adminUser = {
          id: `admin_${Date.now()}`,
          email: TADEU_EMAIL,
          name: 'Eng. Tadeu Santana',
          company: 'NEPTUNO',
          role: 'admin',
          permanentAccessCode: TADEU_ADMIN_CODE,
          isActive: true,
          isTrial: false,
          projectsCreated: 0,
          createdAt: new Date()
        };
        users.push(adminUser);
      }

      const token = jwt.sign({ userId: adminUser.id, role: adminUser.role }, JWT_SECRET, { expiresIn: '24h' });
      const refreshToken = jwt.sign({ userId: adminUser.id }, JWT_SECRET, { expiresIn: '7d' });

      console.log(`\n👑 Admin login: ${adminUser.email}\n`);

      return res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          token,
          refreshToken,
          user: adminUser
        }
      });
    }

    // Check for trial user
    const user = users.find(u =>
      u.email === email &&
      u.trialAccessCode === accessCode.toUpperCase()
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Código inválido ou expirado'
      });
    }

    // Check if trial expired
    if (user.isTrial && new Date() > new Date(user.trialExpiresAt)) {
      return res.status(401).json({
        success: false,
        message: 'Trial expirado. Solicite um novo acesso.'
      });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    console.log(`\n✅ Trial login: ${user.email}\n`);

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        token,
        refreshToken,
        user
      }
    });
  } catch (error) {
    console.error('Error in trial login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer login'
    });
  }
});

// Admin panel - get all trial users
app.get('/api/trial/admin/users', (req, res) => {
  try {
    // In a real app, verify admin token here

    res.json({
      success: true,
      data: {
        users: users,
        stats: {
          total: users.length,
          active: users.filter(u => u.isTrial && new Date() < new Date(u.trialExpiresAt)).length,
          expired: users.filter(u => u.isTrial && new Date() > new Date(u.trialExpiresAt)).length
        }
      }
    });
  } catch (error) {
    console.error('Error getting admin users:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuários'
    });
  }
});

// Projects routes (mock)
app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    data: {
      projects: projects,
      total: projects.length,
      page: 1,
      limit: 50
    }
  });
});

app.post('/api/projects', (req, res) => {
  try {
    const project = {
      id: `project_${Date.now()}`,
      ...req.body,
      status: 'pending',
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    projects.push(project);

    res.json({
      success: true,
      message: 'Projeto criado com sucesso',
      data: { project }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar projeto'
    });
  }
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  try {
    const project = projects.find(p => p.id === req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    res.json({
      success: true,
      data: { project }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar projeto'
    });
  }
});

// Generate PDF (REAL PDF with PDFKit!)
app.post('/api/pdi/generate/:id', async (req, res) => {
  try {
    const project = projects.find(p => p.id === req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    console.log(`\n📄 Gerando PDF PROFISSIONAL para projeto: ${project.name}`);
    console.log(`   Tipo: ${project.assetType}`);
    console.log(`   Operadora: ${project.operator}`);
    console.log(`   ⚙️  Processando 12 seções completas...`);

    // Generate real PDF with PDFKit
    const pdfBuffer = await pdiGenerator.generatePDI(project);

    console.log(`   ✅ PDF gerado com sucesso! Tamanho: ${(pdfBuffer.length / 1024).toFixed(2)} KB\n`);

    const filename = `PDI_${project.technicalData?.wellName || project.name}_${Date.now()}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar PDF',
      error: error.message
    });
  }
});

// Export to ML (mock)
app.post('/api/ml/export/:id', (req, res) => {
  try {
    const project = projects.find(p => p.id === req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    console.log(`\n🤖 Exportando dados ML para projeto: ${project.name}`);

    // Prepare ML-ready data structure
    const mlData = {
      metadata: {
        project_id: project.id,
        project_name: project.name,
        asset_type: project.assetType,
        export_date: new Date().toISOString(),
        version: '2.1.0'
      },
      features: {
        // Numerical features
        total_depth: parseFloat(project.technicalData?.totalDepth) || 0,
        casing_diameter: parseFloat(project.technicalData?.casingDiameter) || 0,
        cumulative_production: parseFloat(project.technicalData?.cumulativeProduction) || 0,
        water_body_proximity: parseFloat(project.technicalData?.waterBodyProximity) || 0,
        estimated_budget: parseFloat(project.technicalData?.estimatedBudget) || 0,
        schedule_days: parseFloat(project.technicalData?.schedule) || 0,

        // Categorical features (encoded)
        operator: project.operator,
        basin: project.technicalData?.basin,
        location: project.location,
        completion_type: project.technicalData?.completionType,
        drilling_fluid: project.technicalData?.drillingFluid,
        area_type: project.technicalData?.areaType,
        decommissioning_method: project.technicalData?.decommissioningMethod
      },
      labels: {
        status: project.status,
        risk_level: 'medium', // Would be calculated by ML
        estimated_duration: project.technicalData?.schedule,
        estimated_cost: project.technicalData?.estimatedBudget
      },
      raw_data: project.technicalData
    };

    res.json({
      success: true,
      message: 'Dados exportados com sucesso',
      data: mlData
    });

  } catch (error) {
    console.error('Error exporting ML data:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao exportar dados'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 NEPTUNO ONSHORE - MOCK SERVER');
  console.log('='.repeat(60));
  console.log(`✅ Server running on: http://localhost:${PORT}`);
  console.log(`🔧 Mode: MOCK (sem PostgreSQL)`);
  console.log(`🌐 CORS: http://localhost:5173`);
  console.log('\n📋 ADMIN LOGIN:');
  console.log(`   Email: tadeu@neptunodescom.com`);
  console.log(`   Código: NEPTUNO-ADMIN-TADEU-2025`);
  console.log('\n💡 Dica: Os códigos trial aparecem no console');
  console.log('='.repeat(60) + '\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down mock server...');
  process.exit(0);
});
