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
  return db.createTable('addresses_link', {
    address_link_id: { type: 'bigserial', primaryKey: true, autoIncrement: true, notNull: true },
    address_id: {
      type: 'bigint',
      foreignKey: {
        name: 'addresses_link_address_id_fkey',
        table: 'addresses',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'address_id'
      }
    },
    object_id: 'bigint',
    object_type_id: {
      type: 'int',
      foreignKey: {
        name: 'addresses_link_object_type_id_fkey',
        table: 'object_type',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'object_type_id'
      }
    },
    link_type_id: {
      type: 'int',
      foreignKey: {
        name: 'addresses_link_link_type_id_fkey',
        table: 'link_type',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'link_type_id'
      }
    }
  });
};

exports.down = function(db) {
  return db.removeForeignKey('addresses_link', 'addresses_link_address_id_fkey', () => {
    db.removeForeignKey('addresses_link', 'addresses_link_object_type_id_fkey', () => {
      db.removeForeignKey('addresses_link', 'addresses_link_link_type_id_fkey', () => {
        db.dropTable('addresses_link');
      });
    });
  });
};

exports._meta = {
  "version": 1
};
