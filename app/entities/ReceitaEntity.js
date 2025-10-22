// app/entities/ReceitaEntity.js
function normalizeId(raw) {
  if (raw === null || raw === undefined) return null;
  return String(raw);
}
function newId(){ return `r${Date.now()}${Math.floor(Math.random()*1000)}`; }

export default class ReceitaEntity {
  constructor({ id = null, nome = '', ingredientes = [], instrucoes = '' } = {}) {
    this.id = normalizeId(id) ?? newId();
    this.nome = nome ?? '';
    // ingredientes: array de strings (trimados)
    this.ingredientes = Array.isArray(ingredientes)
      ? ingredientes.map(i => String(i).trim()).filter(i => i.length)
      : [];
    // instrucoes: texto
    this.instrucoes = instrucoes ?? '';
  }

  static fromDto(d) { return d ? new ReceitaEntity(d) : null; }

  get key() { return String(this.id); }
}
