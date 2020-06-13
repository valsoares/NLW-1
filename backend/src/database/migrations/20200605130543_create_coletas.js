
//criação da tabela
exports.up = function(knex) {
    return knex.schema.createTable('coletas', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('endereço').notNullable();
      table.string('número').notNullable();
      table.string('estado').notNullable();
      table.string('cidade').notNullable();
      table.string('itens').notNullable();
    });
  };
  
  //se der algum problema: excluir tabela
  exports.down = function(knex) {
    return knex.schema.dropTable('coletas');
  };
  