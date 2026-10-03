const fs = require('node:fs');
const { build } = require('esbuild');
const html = fs.readFileSync('index.html', 'utf8');
const sections = ['about','experience','skills','education','certifications','projects'];
const context = sections.map(id => {
  const section = html.match(new RegExp('<section[^>]*id="'+id+'"[^>]*>([\\s\\S]*?)</section>'));
  if (!section) throw new Error('Missing source section: '+id);
  return section[1].replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}).join('\n\n');
build({entryPoints:['assistant.js'],bundle:true,format:'esm',minify:true,outfile:'assistant.bundle.js',define:{PORTFOLIO_CONTEXT:JSON.stringify(context)},legalComments:'eof'}).catch(error=>{console.error(error);process.exitCode=1});
