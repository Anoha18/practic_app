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
  return db.createTable('addresses', {
    address_id: { type: 'bigserial', primaryKey: true, autoIncrement: true, notNull: true },
    priority_id: {
      type: 'int',
      foreignKey: {
        name: 'addresses_addresses_priority_id_fkey',
        table: 'addresses_priority',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'address_priority_id'
      }
    },
    name: 'text',
    comment: 'text',
    time_start: 'time',
    time_end: 'time',
    address: 'text',
    weight: 'numeric',
    price: 'numeric',
    route_id: {
      type: 'int',
      foreignKey: {
        name: 'addresses_route_id_fkey',
        table: 'routes',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'route_id'
      }
    },
    lat: 'text',
    lng: 'text',
    created_at: { type: 'timestamp', defaultValue: new String('now()') },
    updated_at: { type: 'timestamp' },
    deleted: { type: 'boolean', defaultValue: false },
    creator_id: {
      type: 'int',
      foreignKey: {
        name: 'addresses_creator_id_fkey',
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
  return db.removeForeignKey('addresses', 'addresses_addresses_priority_id_fkey', () => {
    db.removeForeignKey('addresses', 'addresses_route_id_fkey', () => {
      db.removeForeignKey('addresses', 'addresses_creator_id_fkey', () => {
        db.dropTable('addresses');
      });
    });
  });
};

exports._meta = {
  "version": 1
};
