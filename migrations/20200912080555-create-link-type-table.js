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
  return db.createTable('link_type', {
    link_type_id: { type: 'serial', primaryKey: true, autoIncrement: true, notNull: true },
    name: 'text',
    brief: 'text'
  });
};

exports.down = function(db) {
  return db.dropTable('link_type');
};

exports._meta = {
  "version": 1
};
