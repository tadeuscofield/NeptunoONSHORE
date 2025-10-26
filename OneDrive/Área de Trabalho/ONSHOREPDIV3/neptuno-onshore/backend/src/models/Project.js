import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },

  // Tipo de ativo
  assetType: {
    type: DataTypes.ENUM('well', 'station', 'pipeline', 'tank'),
    allowNull: false,
    comment: 'well=Poço, station=Estação, pipeline=Duto, tank=Tanque'
  },

  // Identificação básica
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nome do projeto/ativo'
  },
  fieldName: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nome do campo'
  },
  basin: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Bacia sedimentar (Recôncavo, Potiguar, etc)'
  },
  operator: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Operadora responsável'
  },
  location: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Localização: {municipality, state, lat, lng}'
  },

  // Dados técnicos (varia por tipo)
  technicalData: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Dados técnicos específicos do tipo de ativo'
  },

  // Dados ambientais
  environmentalData: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Caracterização ambiental'
  },

  // Metodologia e cronograma
  methodology: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Metodologia de descomissionamento'
  },

  // Custos
  estimatedCost: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    comment: 'Custo estimado em R$'
  },

  // Timeline
  estimatedDuration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Duração estimada em meses'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },

  // Status do projeto
  status: {
    type: DataTypes.ENUM('draft', 'in_progress', 'review', 'completed', 'cancelled'),
    defaultValue: 'draft'
  },

  // PDI gerado
  pdiGenerated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  pdiPath: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Caminho do PDF do PDI gerado'
  },

  // Metadata
  completionPercentage: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'projects',
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['assetType'] },
    { fields: ['status'] },
    { fields: ['basin'] },
    { fields: ['operator'] }
  ]
});

export default Project;
