import knex from 'knex';
import { config } from '../config/config'
import { knexConfig } from './knexConfig'

export default knex(knexConfig[config.mode]);