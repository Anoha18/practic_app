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
  return db.createTable('refresh_tokens', {
    refresh_token_id: { type: 'bigserial', primaryKey: true, autoIncrement: true, notNull: true },
    refresh_token: 'text',
    ip: 'text',
    user_id: {
      type: 'int',
      foreignKey: {
        name: 'refresh_tokens_user_id_fkey',
        table: 'users',
        mapping: 'user_id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
      }
    },
    closed: { type: 'boolean', defaultValue: false },
    created_at: { type: 'timestamp', defaultValue: new String('now()') },
    updated_at: { type: 'timestamp' },
    parent_id: { type: 'int' }
  });
};

exports.down = function(db) {
  return db.removeForeignKey('refresh_tokens', 'refresh_tokens_user_id_fkey', () => {
    db.dropTable('refresh_tokens');
  });
};

exports._meta = {
  "version": 1
};
