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
  return db.createTable('addresses_type', {
    address_type_id: { type: 'serial', primaryKey: true, notNull: true, autoIncrement: true },
    name: 'text',
    brief: 'text'
  }, () => {
    db.runSql(`
      insert into addresses_type(name, brief) values 
        ('База', upper(to_brief('База'))),
        ('Адрес маршрута', upper(to_brief('Адрес маршрута')));
    `);
  });
};

exports.down = function(db) {
  return db.dropTable('addresses_type');
};

exports._meta = {
  "version": 1
};
