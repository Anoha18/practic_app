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
  return db.createTable('addresses_priority', {
    address_priority_id: { type: 'serial', primaryKey: true, autoIncrement: true, notNull: true },
    name: 'text',
    brief: 'text'
  }, () => {
    db.runSql(`
      insert into addresses_priority(name, brief) values 
        ('Высокий', upper(to_brief('Высокий'))),
        ('Обычный', upper(to_brief('Обычный'))),
        ('Низкий', upper(to_brief('Низкий')));
    `);
  });
};

exports.down = function(db) {
  return db.dropTable('addresses_priority');
};

exports._meta = {
  "version": 1
};
