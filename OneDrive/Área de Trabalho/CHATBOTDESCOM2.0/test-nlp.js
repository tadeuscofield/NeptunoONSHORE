// Teste rápido do NLP
const NLPProcessor = require('./src/utils/nlpProcessor.js').default;
const knowledgeBaseData = require('./src/data/knowledgeBaseData.js').default;

console.log('=== TESTE NLP ===\n');

const nlp = new NLPProcessor(knowledgeBaseData);

const query = "Qual o prazo do PDI marítimo?";
console.log('Query:', query);
console.log('\nTokens:', nlp.tokenize(query));
console.log('\nEntidades:', nlp.extractEntities(query));
console.log('\nIntenção:', nlp.classifyIntent(query));

const results = nlp.semanticSearch(query, 3);
console.log('\n=== RESULTADOS ===');
console.log('Total encontrado:', results.length);

results.forEach((r, i) => {
  console.log(`\n[${i+1}] Score: ${(r.score * 100).toFixed(1)}%`);
  console.log('Pergunta:', r.question.substring(0, 80));
  console.log('Resposta:', r.answer.substring(0, 100) + '...');
  console.log('Categoria:', r.category);
});
