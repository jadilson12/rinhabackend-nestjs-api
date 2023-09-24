import { Entity, Column } from "typeorm";


@Entity({ name: "pessoas" })
export class Pessoa {
  @Column({ primary: true })
  id: string;
  
   @Column()
  apelido: string;

   @Column()
  nome: string;

   @Column()
  nascimento: Date;

  @Column({ type: "json"})
  stack: string;

  @Column()
  searchable: string;
}
