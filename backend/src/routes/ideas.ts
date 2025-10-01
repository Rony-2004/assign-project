import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { db, ideas } from '../db';
import { eq, desc, asc, sql } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { 
  createIdeaSchema, 
  getIdeasSchema,
  CreateIdeaRequest,
  GetIdeasQuery
} from '../types/api';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  sanitizeText
} from '../utils/helpers';

export default async function ideaRoutes(fastify: FastifyInstance) {
  // Get all ideas
  fastify.get('/ideas', async (request: FastifyRequest<{ Querystring: GetIdeasQuery }>, reply: FastifyReply) => {
    try {
      const query = getIdeasSchema.parse(request.query);
      
      const orderBy = query.sortBy === 'upvotes' 
        ? (query.order === 'desc' ? desc(ideas.upvotes) : asc(ideas.upvotes))
        : (query.order === 'desc' ? desc(ideas.createdAt) : asc(ideas.createdAt));

      const allIdeas = await db
        .select()
        .from(ideas)
        .orderBy(orderBy)
        .limit(query.limit)
        .offset(query.offset);

      return reply.send(createSuccessResponse(allIdeas, 'Ideas fetched successfully'));
    } catch (error) {
      console.error('Error fetching ideas:', error);
      return reply.status(500).send(createErrorResponse('FETCH_ERROR', 'Failed to fetch ideas'));
    }
  });

  // Get single idea by ID
  fastify.get('/ideas/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      const idea = await db
        .select()
        .from(ideas)
        .where(eq(ideas.id, id))
        .limit(1);
      
      const foundIdea = idea[0];

      if (!foundIdea) {
        return reply.status(404).send(createErrorResponse('NOT_FOUND', 'Idea not found'));
      }

      return reply.send(createSuccessResponse(foundIdea, 'Idea fetched successfully'));
    } catch (error) {
      console.error('Error fetching idea:', error);
      return reply.status(500).send(createErrorResponse('FETCH_ERROR', 'Failed to fetch idea'));
    }
  });

  // Create a new idea
  fastify.post('/ideas', async (request: FastifyRequest<{ Body: CreateIdeaRequest }>, reply: FastifyReply) => {
    try {
      const body = createIdeaSchema.parse(request.body);
      
      const newIdea = {
        id: randomBytes(16).toString('hex'),
        title: sanitizeText(body.title),
        description: sanitizeText(body.description),
        upvotes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const [insertedIdea] = await db
        .insert(ideas)
        .values(newIdea)
        .returning();

      return reply.status(201).send(createSuccessResponse(insertedIdea, 'Idea created successfully'));
    } catch (error) {
      console.error('Error creating idea:', error);
      return reply.status(500).send(createErrorResponse('CREATE_ERROR', 'Failed to create idea'));
    }
  });

  // Upvote an idea
  fastify.patch('/ideas/:id/upvote', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      // Use Drizzle's update to safely increment upvotes
      const updatedIdea = await db
        .update(ideas)
        .set({ 
          upvotes: sql`${ideas.upvotes} + 1`,
          updatedAt: new Date()
        })
        .where(eq(ideas.id, id))
        .returning();

      if (updatedIdea.length === 0) {
        return reply.status(404).send(createErrorResponse('NOT_FOUND', 'Idea not found'));
      }

      return reply.send(createSuccessResponse(updatedIdea[0], 'Idea upvoted successfully'));
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        return reply.status(404).send(createErrorResponse('NOT_FOUND', 'Idea not found'));
      }
      
      console.error('Error upvoting idea:', error);
      return reply.status(500).send(createErrorResponse('UPVOTE_ERROR', 'Failed to upvote idea'));
    }
  });

  // Delete an idea (optional - for admin purposes)
  fastify.delete('/ideas/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;

      const deletedIdea = await db
        .delete(ideas)
        .where(eq(ideas.id, id))
        .returning();

      if (deletedIdea.length === 0) {
        return reply.status(404).send(createErrorResponse('NOT_FOUND', 'Idea not found'));
      }

      return reply.send(createSuccessResponse(null, 'Idea deleted successfully'));
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        return reply.status(404).send(createErrorResponse('NOT_FOUND', 'Idea not found'));
      }
      
      console.error('Error deleting idea:', error);
      return reply.status(500).send(createErrorResponse('DELETE_ERROR', 'Failed to delete idea'));
    }
  });
}