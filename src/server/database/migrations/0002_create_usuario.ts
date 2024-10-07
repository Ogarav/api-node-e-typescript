import {Knex} from 'knex'
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
    .schema
    .createTable(ETableNames.usuario, table =>{
        table.bigIncrements('id').primary().index();
        table.string('nome').notNullable().checkLength('>',3).unique();        
        table.string('senha').notNullable().checkLength('>',12);
        table.string('email').unique().index().notNullable().checkLength('>',5);

        table.comment('Tabela usada para armazenar usuarios no sistema.');
    })
    .then(() => {
        console.log(`# Created table ${ETableNames.usuario}`);
    });
}


export async function down(knex: Knex) {
    return knex
    .schema
    .dropTable(ETableNames.usuario)
    .then(() => {
        console.log(`# Dropped table ${ETableNames.usuario}`);
    });
}

