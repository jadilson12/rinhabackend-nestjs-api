import { Controller, Post, Get, Query, Body, Param,BadGatewayException, Res, Logger } from "@nestjs/common";
import { EntityManager, MikroORM } from "@mikro-orm/core";
import { randomUUID } from 'node:crypto'
import {Response} from 'express'
import { Pessoa } from "./entities/pessoas";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Controller("")
export class AppController {
  constructor( @InjectRepository(Pessoa)
  private orm: Repository<Pessoa>) { }
  
 @Post('pessoas')
 async pos(@Body() body, @Res() res: Response): Promise<any> {
   
    try {
      const id = randomUUID()
     await this.orm.createQueryBuilder().insert().into(Pessoa).values({
          id,
          apelido: body.apelido,
          nome: body.nome,
          nascimento: body.nascimento,
          stack: JSON.stringify(body.stack),
        }).execute()
      return res.status(201).location(`/pessoas/${id}`).end();
    } catch (error) {
      Logger.debug(error.message, 'AppController: Error')
      return res.status(422).end()
    }

  }

  @Get("pessoas")
 async getAll(@Query("t") t,  @Res() res: Response) : Promise<any> {
 
    const itens = await  this.orm.createQueryBuilder().andWhere(`searchable like '%${t}%'`).getMany()

    if(!itens.length && !itens) {
      return res.status(404).end()
    }

    return res.status(200).json(itens)
  }

  @Get("pessoas/:id")
 async getById(@Param("id") id: string, @Res() res: Response) {
   
    try {
      const item = await this.orm.createQueryBuilder().andWhere(`id = '${id}'`).getOne();
      
      if (!item) {
        return res.status(404).end()
      }

    return res.status(200).json(item)

    } catch {
      return res.status(404).end()
    }
  }

 
  @Get("contagem-pessoas")
  getContagem() {
    return this.orm.count();
  }


 
}
