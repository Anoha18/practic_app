'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('users', {
    user_id: { type: 'serial', primaryKey: true, autoIncrement: true, notNull: true },
    name: { type: 'text' },
    lastname: { type: 'text' },
    password: { type: 'text' },
    email: { type: 'text' },
    phone: { type: 'text' },
    deleted: { type: 'boolean', defaultValue: false },
    created_at: { type: 'timestamp', defaultValue: new String('now()') },
    updated_at: { type: 'timestamp' },
    login: { type: 'text', notNull: true }
  }, () => {
    db.runSql(`
      create extension pgcrypto;
      insert into users (name, lastname, login, password) values ('Владислав', 'Анохин', 'anoha', crypt('111111', gen_salt('bf', 8)))
    `)
  });
};

exports.down = function(db) {
  return db.dropTable('users', () => {
    db.runSql(`
      drop extension pgcrypto;
    `);
  });
};

exports._meta = {
  "version": 1
};
