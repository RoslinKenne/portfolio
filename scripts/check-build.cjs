const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
for(const file of ['index.html','archives/2026-10-02/index.html']){
 const html=fs.readFileSync(file,'utf8');
 for(const [,url]of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(/^(?:https?:|mailto:|#|data:)/.test(url))continue;
  const target=path.resolve(path.dirname(file),url.split(/[?#]/)[0]);assert.ok(fs.existsSync(target),'Missing asset: '+target);
 }
}
console.log('Publication files and archived page dependencies verified');
