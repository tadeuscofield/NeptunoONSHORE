import { Project, Document, User } from '../models/index.js';
import { logger } from '../config/logger.js';

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      ...req.body,
      userId: req.user.id,
      completionPercentage: 10 // Started
    });

    logger.info(`Project created: ${project.id} by user ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Projeto criado com sucesso',
      data: { project }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all projects for user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req, res, next) => {
  try {
    const { status, assetType, page = 1, limit = 10, search } = req.query;

    const where = { userId: req.user.id };
    if (status) where.status = status;
    if (assetType) where.assetType = assetType;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { fieldName: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const projects = await Project.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: Document,
          as: 'documents',
          attributes: ['id', 'fileName', 'category', 'createdAt']
        }
      ]
    });

    res.json({
      success: true,
      data: {
        projects: projects.rows,
        pagination: {
          total: projects.count,
          page: parseInt(page),
          pages: Math.ceil(projects.count / limit),
          hasMore: (parseInt(page) * parseInt(limit)) < projects.count
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [
        {
          model: Document,
          as: 'documents',
          order: [['createdAt', 'DESC']]
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'company']
        }
      ]
    });

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
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    // Calculate completion percentage based on filled fields
    const calculateCompletion = (data) => {
      let filled = 0;
      const required = ['name', 'assetType', 'basin', 'operator', 'location', 'technicalData', 'environmentalData', 'methodology'];

      required.forEach(field => {
        if (data[field]) filled++;
      });

      return Math.round((filled / required.length) * 100);
    };

    const updatedData = {
      ...req.body,
      completionPercentage: calculateCompletion({ ...project.toJSON(), ...req.body })
    };

    await project.update(updatedData);

    logger.info(`Project updated: ${project.id}`);

    res.json({
      success: true,
      message: 'Projeto atualizado com sucesso',
      data: { project }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    await project.destroy();

    logger.info(`Project deleted: ${req.params.id}`);

    res.json({
      success: true,
      message: 'Projeto excluído com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project statistics
// @route   GET /api/projects/stats
// @access  Private
export const getProjectStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Status distribution
    const statusStats = await Project.findAll({
      where: { userId },
      attributes: [
        'status',
        [Project.sequelize.fn('COUNT', '*'), 'count']
      ],
      group: ['status'],
      raw: true
    });

    // Asset type distribution
    const assetTypeStats = await Project.findAll({
      where: { userId },
      attributes: [
        'assetType',
        [Project.sequelize.fn('COUNT', '*'), 'count']
      ],
      group: ['assetType'],
      raw: true
    });

    // Total projects
    const total = await Project.count({ where: { userId } });

    // Average completion
    const avgCompletion = await Project.findOne({
      where: { userId },
      attributes: [
        [Project.sequelize.fn('AVG', Project.sequelize.col('completion_percentage')), 'average']
      ],
      raw: true
    });

    // Total estimated cost
    const totalCost = await Project.findOne({
      where: { userId },
      attributes: [
        [Project.sequelize.fn('SUM', Project.sequelize.col('estimated_cost')), 'total']
      ],
      raw: true
    });

    res.json({
      success: true,
      data: {
        total,
        avgCompletion: Math.round(avgCompletion.average || 0),
        totalEstimatedCost: parseFloat(totalCost.total || 0),
        byStatus: statusStats,
        byAssetType: assetTypeStats
      }
    });
  } catch (error) {
    next(error);
  }
};
