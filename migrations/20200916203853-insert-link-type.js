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
    insert into link_type(name, brief) values 
      ('Маршрут базы', 'BASE_ROUTE');
  `);
};

exports.down = function(db) {
  return db.runSql(`
    delete from link_type
    where brief in ('BASE_ROUTE')
  `);
};

exports._meta = {
  "version": 1
};
