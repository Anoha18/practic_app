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
  return db.createTable('routes', {
    route_id: { type: 'bigserial', primaryKey: true, autoIncrement: true, notNull: true },
    priority_id: {
      type: 'int',
      foreignKey: {
        name: 'routes_priority_id_fkey',
        table: 'routes_priority',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'route_priority_id'
      }
    },
    name: { type: 'text' },
    description: { type: 'text' },
    date: { type: 'date' },
    time_start: { type: 'time' },
    time_end: { type: 'time' },
    created_at: { type: 'timestamp', defaultValue: new String('now()') },
    updated_at: { type: 'timestamp' },
    deleted: { type: 'boolean', defaultValue: false },
    creator_id: {
      type: 'int',
      foreignKey: {
        name: 'routes_creator_id_fkey',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'user_id'
      }
    }
  });
};

exports.down = function(db) {
  return db.removeForeignKey('routes', 'routes_priority_id_fkey', () => {
    db.removeForeignKey('routes', 'routes_creator_id_fkey', () => {
      db.dropTable('routes');
    });
  });
};

exports._meta = {
  "version": 1
};
