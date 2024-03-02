import { ZodError, ZodSchema } from 'zod'

import { IDependencies, IUseCaseExecute, IContext } from '@/core/shared/types'
import { DefaultError } from './error'

export const createUseCase =
  <T, P>(Schema: ZodSchema, execute: IUseCaseExecute<T, P>) =>
  (dependencies: IDependencies, context: IContext) =>
  (props: T) => {
    const input = Schema.parse(props)
    return execute(dependencies, context)(input)
  }

  export type PaginationInput = {
    page: number;
    pageSize: number
  }
  
  export type SortInput = {
    order?: 'DESC' | 'ASC'
  }
  
  export const withError = (error: Error) => {
    if (error instanceof ZodError) {
      const err = error as Zod.ZodError
      return {
        error: {
          code: 400,
          error: {
            message: 'validationFailed',
            errors: err
          }
        }
      }
    }
  
    if (error instanceof DefaultError) {
      return {
        error: {
          code: error.code,
          error: {
            message: error.message,
            metadata: error.metadata
          }
        }
      }
    }
  
    return {
      error: {
        code: 500,
        error: {
          message: error.message
        }
      }
    }
  }
