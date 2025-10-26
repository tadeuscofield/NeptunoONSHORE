import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },

  // Informações do arquivo
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'MIME type'
  },
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Size in bytes'
  },

  // Categorização
  category: {
    type: DataTypes.ENUM(
      'technical',       // Dados técnicos
      'environmental',   // Estudos ambientais
      'licensing',       // Licenças
      'maps',           // Mapas/Plantas
      'photos',         // Fotos
      'reports',        // Relatórios
      'other'
    ),
    defaultValue: 'other'
  },

  // Descrição
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  // URL pública (se S3/Cloud)
  publicUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'documents',
  timestamps: true,
  indexes: [
    { fields: ['projectId'] },
    { fields: ['userId'] },
    { fields: ['category'] }
  ]
});

export default Document;
