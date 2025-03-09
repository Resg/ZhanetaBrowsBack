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

exports.up = async function(db) {
  await db.createTable('verification_token', {
    identifier: {type: 'text not null', primaryKey: true},
    expires: {type: 'TIMESTAMPTZ NOT NULL'},
    token: {type: 'TEXT NOT NULL', primaryKey: true},
  })
  await db.createTable('accounts', {
    id: { type: "SERIAL", primaryKey: true },
    userId: { type: "INTEGER NOT NULL"},
    type: { type: "VARCHAR(255) NOT NULL"},
    provider: { type: "VARCHAR(255) NOT NULL"},
    providerAccountId: { type: "VARCHAR(255) NOT NULL"},
    refresh_token: { type: "TEXT"},
    access_token: { type: "TEXT"},
    expires_at: { type: "BIGINT"},
    id_token: { type: "TEXT"},
    scope: { type: "TEXT"},
    session_state: { type: "TEXT"},
    token_type: { type: "TEXT"},
  })
  await db.createTable('sessions', {
    id: { type: "SERIAL", primaryKey: true },
    userId: { type: "INTEGER NOT NULL"},
    expires: {type: 'TIMESTAMPTZ NOT NULL'},
    sessionToken: {type: 'VARCHAR(255) NOT NULL'}
  })
  await db.createTable('users', {
    id: { type: "SERIAL", primaryKey: true },
    name: { type: 'VARCHAR(255)' },
    email: { type: 'VARCHAR(255)' },
    emailVerified: { type: 'TIMESTAMPTZ' },
    image: { type: 'TEXT' },
  })
};

exports.down = async function(db) {
  await db.dropTable('verification_token');
  await db.dropTable('accounts');
  await db.dropTable('sessions');
  await db.dropTable('users');
};

exports._meta = {
  "version": 1
};
