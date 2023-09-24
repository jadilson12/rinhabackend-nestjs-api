import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {parse, isDate} from 'date-fns'


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
  
    if (req.route.methods.get && req.path ===  '/pessoas' && !req.query.t ) {
      return res.status(400).end()
    }

  if (req.route.methods.post && !this.validateBody(req.body))
        return res.status(422).end()

    
    if (typeof req.body.stack !== 'string' && !Array.isArray( req.body.stack)) {
       req.body.stack = []
    }


    if (Array.isArray( req.body.stack) &&  req.body.stack.length) {
       req.body.stack = req.body.stack.filter((s) => typeof  s !== 'string' || s === "" || s.length > 32)
    }
    next();
  }

  validateBody(body: any): boolean {
    const { apelido, nome, nascimento, stack } = body

    if(typeof apelido !== 'string' || apelido.length > 32)
        return false

    if(typeof nome !== 'string' || nome.length > 100)
        return false

    if(typeof nascimento !== 'string' || !this.validateDate(nascimento))
      return false
    
    return true
  }

  validateDate(dateString: string) {
    return !isNaN(parse(dateString, 'yyyy-MM-dd', new Date()).getTime())
  } 
}
