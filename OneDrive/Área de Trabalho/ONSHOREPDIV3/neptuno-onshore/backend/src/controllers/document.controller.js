import { Document, Project } from '../models/index.js';
import { logger } from '../config/logger.js';
import fs from 'fs/promises';
import path from 'path';

// @desc    Upload document
// @route   POST /api/documents/:projectId
// @access  Private
export const uploadDocument = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { category, description } = req.body;

    // Verify project ownership
    const project = await Project.findOne({
      where: { id: projectId, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo foi enviado'
      });
    }

    const document = await Document.create({
      projectId,
      userId: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      category: category || 'other',
      description
    });

    logger.info(`Document uploaded: ${document.id} for project ${projectId}`);

    res.status(201).json({
      success: true,
      message: 'Documento enviado com sucesso',
      data: { document }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get documents for project
// @route   GET /api/documents/:projectId
// @access  Private
export const getDocuments = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { category } = req.query;

    // Verify project ownership
    const project = await Project.findOne({
      where: { id: projectId, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }

    const where = { projectId };
    if (category) where.category = category;

    const documents = await Document.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { documents }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single document
// @route   GET /api/documents/:projectId/:id
// @access  Private
export const getDocument = async (req, res, next) => {
  try {
    const { projectId, id } = req.params;

    const document = await Document.findOne({
      where: { id, projectId, userId: req.user.id },
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Documento não encontrado'
      });
    }

    res.json({
      success: true,
      data: { document }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete document
// @route   DELETE /api/documents/:projectId/:id
// @access  Private
export const deleteDocument = async (req, res, next) => {
  try {
    const { projectId, id } = req.params;

    const document = await Document.findOne({
      where: { id, projectId, userId: req.user.id }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Documento não encontrado'
      });
    }

    // Delete physical file
    try {
      await fs.unlink(document.filePath);
    } catch (err) {
      logger.warn(`Failed to delete file: ${document.filePath}`);
    }

    await document.destroy();

    logger.info(`Document deleted: ${id}`);

    res.json({
      success: true,
      message: 'Documento excluído com sucesso'
    });
  } catch (error) {
    next(error);
  }
};
