import User from './models/User.v2.js'; // Use versão atualizada
import { sendTrialAccessEmail, sendAdminNotification } from '../services/emailService.js';
import { logger } from '../config/logger.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// CÓDIGO ADMIN PERMANENTE DO TADEU
const TADEU_ADMIN_CODE = 'NEPTUNO-ADMIN-TADEU-2025';
const TADEU_EMAIL = 'tadeu@neptunodescom.com';

/**
 * @desc    Request trial access
 * @route   POST /api/trial/request
 * @access  Public
 */
export const requestTrialAccess = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email é obrigatório'
      });
    }

    // Check if user already exists
    let user = await User.findOne({ where: { email } });

    if (user && !user.isTrial) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado como usuário permanente'
      });
    }

    if (user && user.isTrial && !user.isTrialExpired()) {
      // Trial still active - resend code
      await sendTrialAccessEmail(email, user.trialAccessCode, user.trialExpiresAt);

      return res.json({
        success: true,
        message: 'Código de acesso reenviado para seu email',
        expiresAt: user.trialExpiresAt
      });
    }

    // Generate new trial access code (6 digits)
    const trialAccessCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours

    if (user && user.isTrial && user.isTrialExpired()) {
      // Renew expired trial
      await user.update({
        trialAccessCode,
        trialExpiresAt: expiresAt,
        isActive: true,
        projectsCreated: 0 // Reset counter
      });
    } else {
      // Create new trial user
      user = await User.create({
        email,
        name: email.split('@')[0], // Use email prefix as name
        password: null, // No password for trial
        isTrial: true,
        trialAccessCode,
        trialExpiresAt: expiresAt,
        role: 'operator'
      });
    }

    // Send email with access code
    await sendTrialAccessEmail(email, trialAccessCode, expiresAt);

    // Notify admin
    await sendAdminNotification(email);

    logger.info(`Trial access requested: ${email}, expires: ${expiresAt}`);

    res.json({
      success: true,
      message: 'Código de acesso enviado para seu email!',
      expiresAt
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login with access code (trial or permanent)
 * @route   POST /api/trial/login
 * @access  Public
 */
export const loginWithAccessCode = async (req, res, next) => {
  try {
    const { email, accessCode } = req.body;

    if (!email || !accessCode) {
      return res.status(400).json({
        success: false,
        message: 'Email e código de acesso são obrigatórios'
      });
    }

    // Check for TADEU ADMIN CODE first
    if (accessCode === TADEU_ADMIN_CODE) {
      let adminUser = await User.findOne({ where: { email: TADEU_EMAIL } });

      if (!adminUser) {
        // Create admin user on first access
        adminUser = await User.create({
          email: TADEU_EMAIL,
          name: 'Eng. Tadeu Santana',
          company: 'NEPTUNO',
          role: 'admin',
          password: crypto.randomBytes(32).toString('hex'), // Random password (won't be used)
          permanentAccessCode: TADEU_ADMIN_CODE,
          isActive: true,
          isTrial: false
        });

        logger.info('🔐 Admin user created for Tadeu');
      }

      // Generate JWT tokens for admin
      const token = jwt.sign({ id: adminUser.id }, process.env.JWT_SECRET, {
        expiresIn: '30d' // Long expiration for admin
      });

      const refreshToken = jwt.sign({ id: adminUser.id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '90d'
      });

      await adminUser.update({
        lastLogin: new Date(),
        refreshToken
      });

      return res.json({
        success: true,
        message: 'Bem-vindo, Admin!',
        data: {
          user: adminUser.toJSON(),
          token,
          refreshToken
        }
      });
    }

    // Regular trial/user login
    const user = await User.findOne({
      where: {
        email,
        [Op.or]: [
          { trialAccessCode: accessCode },
          { permanentAccessCode: accessCode }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou código de acesso inválidos'
      });
    }

    // Check if trial expired
    if (user.isTrial && user.isTrialExpired()) {
      return res.status(401).json({
        success: false,
        message: 'Seu período trial expirou. Solicite um novo código.'
      });
    }

    // Check if trial user reached project limit
    if (user.isTrial && user.hasReachedTrialLimit()) {
      return res.status(403).json({
        success: false,
        message: 'Você atingiu o limite de 5 projetos no trial. Entre em contato para upgrade.'
      });
    }

    // Generate JWT tokens
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: user.isTrial ? '72h' : '7d'
    });

    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: user.isTrial ? '72h' : '30d'
    });

    await user.update({
      lastLogin: new Date(),
      refreshToken
    });

    logger.info(`User logged in with access code: ${email}`);

    res.json({
      success: true,
      message: user.isTrial
        ? `Bem-vindo! Seu trial expira em ${user.trialExpiresAt.toLocaleString('pt-BR')}`
        : 'Login realizado com sucesso',
      data: {
        user: {
          ...user.toJSON(),
          isTrial: user.isTrial,
          trialExpiresAt: user.trialExpiresAt,
          projectsLimit: user.isTrial ? 5 : null,
          projectsCreated: user.projectsCreated
        },
        token,
        refreshToken
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get trial users (admin only)
 * @route   GET /api/trial/users
 * @access  Private/Admin
 */
export const getTrialUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const where = { isTrial: true };

    if (status === 'active') {
      where.trialExpiresAt = { [Op.gt]: new Date() };
      where.isActive = true;
    } else if (status === 'expired') {
      where.trialExpiresAt = { [Op.lt]: new Date() };
    }

    const users = await User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password', 'refreshToken'] }
    });

    res.json({
      success: true,
      data: {
        users: users.rows,
        pagination: {
          total: users.count,
          page: parseInt(page),
          pages: Math.ceil(users.count / limit)
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

export default {
  requestTrialAccess,
  loginWithAccessCode,
  getTrialUsers
};
