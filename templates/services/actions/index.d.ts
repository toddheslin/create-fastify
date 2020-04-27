import { FastifyRequest } from 'fastify';

/**
 * The generic payload from a Hasura action webhook.
 */
interface HasuraRequestBody<Input> {
  /**
   * Name of the action
   */
  action: string;
  /**
   * Input parameters to the GraphQL mutation request (the action)
   */
  input: Input;
  /**
   * Headers passed through from the GraphQL mutation request (the action)
   */
  session_variables: SessionVariables;
}

interface SessionVariables {
  /**
   * The ID of the user making the Hasura request
   */
  ['x-hasura-user-id']?: string;
  /**
   * The role present in the headers of the Hasura request
   */
  ['x-hasura-role']?: string;
}