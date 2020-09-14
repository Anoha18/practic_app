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
  return db.runSql(`
    insert into object_type(name, brief, table_name) values 
      ('Адреса', 'ADDRESSES', 'addresses'),
      ('Маршруты', 'ROUTES', 'routes'),
      ('Пользователи', 'USERS', 'users')
  `);
};

exports.down = function(db) {
  return db.runSql(`
    delete from object_type
    where brief in ('ADDRESSES', 'ROUTES', 'USERS')
  `);
};

exports._meta = {
  "version": 1
};
