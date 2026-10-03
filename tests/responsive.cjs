const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch();const base=process.env.TEST_URL||'http://127.0.0.1:8015/';try{
 // Smaller CSS viewports reproduce reflow at 200% and 300% browser zoom.
 for(const [width,height,fontScale] of [[320,700,1],[1280,900,1],[1920,1080,1],[2560,1440,1],[960,540,1],[640,360,1],[960,700,2]]){
  const p=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});await p.goto(base);
  if(fontScale>1)await p.addStyleTag({content:`html{font-size:${fontScale*100}%}`});
  const offsets=[];for(const text of ['','Réseaux & systèmes','Audits Web & tests de sécurité','Cybersécurité & assurance qualité']){
   await p.locator('#typing').evaluate((el,value)=>el.textContent=value,text);
   offsets.push(await p.locator('.original-hero p').last().evaluate(el=>el.getBoundingClientRect().top));
  }
  assert.ok(Math.max(...offsets)-Math.min(...offsets)<1,'Typing must not shift the paragraph');
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
  const belowName=await p.locator('.original-hero h1').evaluate(el=>{const range=document.createRange();range.selectNodeContents(el.firstChild);return el.querySelector('.typing-line').getBoundingClientRect().top>=range.getBoundingClientRect().bottom});assert.ok(belowName,'Subtitle stays below the name');
  const bubble=await p.locator('#agent-launcher').boundingBox();assert.ok(bubble.width>=72,'Readable assistant launcher');
  await p.locator('#agent-launcher').click();await p.waitForTimeout(100);
  const panel=await p.locator('#agent-window').boundingBox();assert.ok(panel.x>=0&&panel.y>=0&&panel.x+panel.width<=width+1&&panel.y+panel.height<=height+1,'Assistant panel fits the viewport');
  await p.locator('#agent-input').click();assert.ok(await p.locator('#agent-window').isVisible(),'Inside click keeps assistant open');
  await p.mouse.click(4,4);assert.ok(!await p.locator('#agent-window').isVisible(),'Outside click closes assistant');
  const contact=await p.locator('#contact>div').evaluate(el=>getComputedStyle(el).borderTopWidth);assert.ok(parseFloat(contact)>0,'Contact is boxed');
  if(width===1920){await p.screenshot({path:process.env.UX_SCREENSHOT||'../ux-desktop.png'});await p.locator('#contact').scrollIntoViewIfNeeded();await p.screenshot({path:'../ux-contact.png'});}
  await p.close();console.log(`Responsive layout: ${width}x${height}, text ${fontScale*100}%`);
 }
}finally{await browser.close()}})().catch(error=>{console.error(error);process.exitCode=1});
