import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true // Can be null for trial users (only access code)
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'operator', 'viewer'),
    defaultValue: 'operator'
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  // TRIAL & ADMIN ACCESS CODES
  permanentAccessCode: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    comment: 'Código de acesso permanente para admin - ex: ADMIN-TADEU-2025'
  },
  isTrial: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'True se for usuário trial (72h)'
  },
  trialExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Data de expiração do trial'
  },
  trialAccessCode: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Código temporário de 6 dígitos para trial'
  },
  projectsCreated: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Contador de projetos (trial limited to 5)'
  }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password') && user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Instance methods
User.prototype.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

User.prototype.isTrialExpired = function() {
  if (!this.isTrial) return false;
  return new Date() > this.trialExpiresAt;
};

User.prototype.hasReachedTrialLimit = function() {
  if (!this.isTrial) return false;
  return this.projectsCreated >= 5;
};

User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  delete values.refreshToken;
  delete values.trialAccessCode; // Don't expose access codes
  delete values.permanentAccessCode;
  return values;
};

export default User;
