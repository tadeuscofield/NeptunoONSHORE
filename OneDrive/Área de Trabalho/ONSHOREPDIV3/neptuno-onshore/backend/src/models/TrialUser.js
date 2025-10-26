import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import crypto from 'crypto';

const TrialUser = sequelize.define('TrialUser', {
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
  accessCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  projectsCreated: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastAccess: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'trial_users',
  timestamps: true
});

// Instance methods
TrialUser.prototype.isExpired = function() {
  return new Date() > this.expiresAt;
};

TrialUser.prototype.hasReachedLimit = function() {
  return this.projectsCreated >= 5; // Trial limit: 5 projects
};

// Static method: Generate access code
TrialUser.generateAccessCode = function() {
  // Generate 6-character code (uppercase + numbers)
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

// Static method: Create trial user
TrialUser.createTrial = async function(email) {
  const accessCode = this.generateAccessCode();
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours

  const trialUser = await this.create({
    email,
    accessCode,
    expiresAt,
  });

  return trialUser;
};

export default TrialUser;
