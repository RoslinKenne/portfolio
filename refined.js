const tools={
tls:{name:'HTTPS & TLS',title:'La sécurité commence par la connexion.',desc:'Explorer le certificat, sa validité et la configuration TLS d’un domaine public.',label:'Domaine à examiner',input:'exemple.test',checks:['Certificat','Protocoles','Interprétation'],details:['Émetteur, validité et correspondance du domaine.','Versions TLS et paramètres observés.','Constats, contexte et recommandations.']},
headers:{name:'En-têtes HTTP',title:'Lire ce que le serveur annonce.',desc:'Comprendre le rôle des en-têtes HTTP et repérer les informations à examiner.',label:'Adresse HTTPS à examiner',input:'https://exemple.test',checks:['En-têtes','Contexte','Recommandations'],details:['CSP, HSTS et protections déclarées.','Valeurs observées et limites du contrôle.','Explications des constats techniques.']},
dmarc:{name:'DNS & DMARC',title:'Comprendre l’identité du courriel.',desc:'Examiner les enregistrements publics et comprendre les mécanismes d’authentification du courriel.',label:'Domaine de messagerie',input:'exemple.test',checks:['DMARC','SPF','DKIM'],details:['Politique déclarée et paramètres DNS.','Sources autorisées et structure de la politique.','Sélecteur nécessaire pour vérifier une signature.']},
csp:{name:'Politique CSP',title:'Définir les sources de confiance.',desc:'Lire une politique Content Security Policy et comprendre ses directives.',label:'Politique CSP à examiner',input:"default-src 'self'; object-src 'none'",checks:['Directives','Sources','Points de vigilance'],details:['Organisation de la politique.','Origines et types de ressources autorisés.','Configurations à revoir selon le contexte.']}
};
let active='tls';
document.querySelectorAll('[data-tool]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.tool;const t=tools[active];document.querySelectorAll('[data-tool]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});document.querySelector('#tool-crumb').textContent=t.name;document.querySelector('#tool-title').textContent=t.title;document.querySelector('#tool-desc').textContent=t.desc;document.querySelector('#input-label').textContent=t.label;document.querySelector('#domain').value=t.input;['one','two','three'].forEach((n,i)=>{document.querySelector('#check-'+n).textContent=t.checks[i];document.querySelector('#detail-'+n).textContent=t.details[i]});document.querySelector('#example-note').hidden=true}));
document.querySelector('#show-example').addEventListener('click',()=>{const box=document.querySelector('#example-note');box.hidden=false;box.textContent='Aperçu du module '+tools[active].name+' : ici seront présentées les observations vérifiées, leur source et leur date. Cette maquette ne contacte pas le domaine saisi et ne produit aucun verdict.'});
const replies={stage:'Mon stage de 2026 porte sur les audits de sécurité Web, la validation des scans et les tests fonctionnels et de régression. Réponse d’exemple issue du CV.',projects:'Deux projets cyber récents : attaques réseau en laboratoire isolé et robustesse d’un IDS face à l’empoisonnement des données. Réponse d’exemple issue du CV.',availability:'Disponible dès janvier 2027, basé à Trois-Rivières et mobile partout au Québec. Réponse d’exemple issue du CV.'};
document.querySelectorAll('[data-chat]').forEach(b=>b.addEventListener('click',()=>{const box=document.querySelector('#chat-answer');box.hidden=false;box.textContent=replies[b.dataset.chat]}));
const cases={network:'Objectif : observer les effets d’attaques ARP, DNS et homme-du-milieu dans un environnement virtualisé isolé. Démarche : simulation contrôlée, analyse des captures avec Wireshark et Scapy, journalisation TCP et recommandations de durcissement. Aucun système client ni cible publique n’est présenté.',ml:'Objectif : mesurer la robustesse d’un système de détection d’intrusion. Démarche : pipeline Random Forest sur 10 000 observations NSL-KDD, mesure du rappel, du F1-score et des faux négatifs, puis simulations de label flipping et de portes dérobées. Les performances chiffrées ne sont pas inventées.'};
document.querySelectorAll('[data-case]').forEach(b=>b.addEventListener('click',()=>{const box=document.querySelector('#case-detail');box.hidden=false;box.textContent=cases[b.dataset.case];box.focus()}));

document.querySelectorAll('.brand-symbol').forEach(el=>{el.classList.add('provided-logo');});
const motionToggle=document.querySelector('#motion');const reduced=matchMedia('(prefers-reduced-motion: reduce)');let typingTimer;
const phrases=["Cybersécurité & assurance qualité","Audits Web & tests de sécurité","Réseaux & systèmes"];let phrase=0,index=0,deleting=false;
function typeNext(){if(!motionToggle.checked||reduced.matches)return;const target=document.querySelector('#typing');const text=phrases[phrase];index+=deleting?-1:1;target.textContent=text.slice(0,index);let delay=deleting?45:85;if(index===text.length){deleting=true;delay=1800}else if(index===0){deleting=false;phrase=(phrase+1)%phrases.length;delay=350}typingTimer=setTimeout(typeNext,delay)}
function applyMotion(){clearTimeout(typingTimer);const stopped=!motionToggle.checked||reduced.matches;document.documentElement.classList.toggle('no-motion',stopped);document.querySelector('#typing').textContent=phrases[0];phrase=0;index=phrases[0].length;deleting=true;if(!stopped)typingTimer=setTimeout(typeNext,1800)}
motionToggle.checked=!reduced.matches;motionToggle.addEventListener('change',applyMotion);reduced.addEventListener('change',()=>{motionToggle.checked=!reduced.matches;applyMotion()});applyMotion();
if('IntersectionObserver' in window&&!reduced.matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('shown');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.content-section article,.content-section>div,.section-heading,.lab-shell,.cv-paper').forEach(el=>{el.classList.add('scroll-reveal');observer.observe(el)})}
const launcher=document.querySelector('#agent-launcher'),agentWindow=document.querySelector('#agent-window'),agentInput=document.querySelector('#agent-input');
function openAgent(){agentWindow.hidden=false;launcher.setAttribute('aria-expanded','true');document.querySelector('#agent-hint').hidden=true;agentInput.focus()}
function closeAgent(){agentWindow.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.focus()}
launcher.addEventListener('click',()=>agentWindow.hidden?openAgent():closeAgent());document.querySelector('#agent-close').addEventListener('click',closeAgent);document.querySelector('#open-agent-band').addEventListener('click',openAgent);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!agentWindow.hidden)closeAgent()});
function appendMessage(text,user=false){const e=document.createElement('div');e.className='agent-message'+(user?' user-message':'');e.textContent=text;const box=document.querySelector('#agent-conversation');box.append(e);box.scrollTop=box.scrollHeight}
let assistantModule, chatBusy=false;const questionTimes=[];
async function sendAgentQuestion(value){
 if(chatBusy||!value.trim())return;
 value=value.trim().slice(0,300);const now=Date.now();while(questionTimes.length&&now-questionTimes[0]>60000)questionTimes.shift();
 if(questionTimes.length>=6){appendMessage('Un petit instant : vous pourrez poser une autre question dans une minute.');return;}
 questionTimes.push(now);chatBusy=true;agentInput.value='';appendMessage(value,true);
 const controls=[agentInput,...document.querySelectorAll('[data-agent],#agent-form button')];controls.forEach(el=>el.disabled=true);
 const status=document.createElement('div');status.className='agent-message agent-pending';status.textContent='L’assistant prépare sa réponse…';document.querySelector('#agent-conversation').append(status);
 document.querySelector('#agent-form').setAttribute('aria-busy','true');
 try{assistantModule=assistantModule||import('./assistant.bundle.js');const {ask}=await assistantModule;status.textContent=await ask(value);}
 catch(error){assistantModule=undefined;console.warn('Assistant unavailable:',error.code||error.message);status.textContent=/429|quota|resource.exhausted/i.test(error.message)?'La limite de requêtes est atteinte. Réessayez plus tard ou utilisez le formulaire de contact.':'L’assistant est momentanément indisponible. Réessayez plus tard ou utilisez le formulaire de contact.';status.classList.add('agent-error');}
 finally{status.classList.remove('agent-pending');controls.forEach(el=>el.disabled=false);document.querySelector('#agent-form').removeAttribute('aria-busy');chatBusy=false;const box=document.querySelector('#agent-conversation');box.scrollTop=box.scrollHeight;if(!agentWindow.hidden)agentInput.focus();}
}
document.querySelectorAll('[data-agent]').forEach(b=>b.addEventListener('click',()=>sendAgentQuestion(b.textContent)));
document.querySelector('#agent-form').addEventListener('submit',e=>{e.preventDefault();sendAgentQuestion(agentInput.value)});

// Layout only: source content is kept verbatim.
document.querySelectorAll('.content-section').forEach(section=>{
 const heading=section.querySelector('h2');if(heading)heading.parentElement.classList.add('content-heading');
 section.querySelectorAll('article').forEach((card,i)=>{card.classList.add('content-card');card.style.setProperty('--delay',Math.min(i,3)*80+'ms');const tags=card.querySelector('div>div');if(tags&&tags.children.length&&[...tags.children].every(el=>el.tagName==='SPAN'))tags.classList.add('content-tags');});
 section.querySelectorAll('div').forEach(div=>{if([...div.children].some(el=>el.tagName==='ARTICLE'))div.classList.add('card-grid')});
});
const navLinks=[...document.querySelectorAll('.site-header nav a')];
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('current',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-20% 0px -60% 0px'});
document.querySelectorAll('main>section[id]').forEach(el=>sectionObserver.observe(el));
const progress=document.querySelector('.reading-progress span'),backTop=document.querySelector('.back-top');let frame=0;
function paintProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;backTop.hidden=scrollY<700;frame=0;}
addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(paintProgress)},{passive:true});addEventListener('resize',paintProgress);paintProgress();
backTop.addEventListener('click',()=>document.querySelector('#home').scrollIntoView({behavior:motionToggle.checked?'smooth':'instant'}));
// Single gentle entrance, staggered cards, and bounded hover motion.
const pointerFine=matchMedia('(hover:hover) and (pointer:fine)');
document.querySelectorAll('.content-card').forEach(card=>{
 card.addEventListener('pointermove',e=>{if(!pointerFine.matches||!motionToggle.checked||reduced.matches)return;const r=card.getBoundingClientRect();card.style.setProperty('--rx',((e.clientY-r.top)/r.height-.5)*-3+'deg');card.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*3+'deg');});
 card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');});
});
document.querySelectorAll('.tool').forEach(button=>button.addEventListener('click',()=>{const panel=document.querySelector('.lab-content');if(motionToggle.checked&&!reduced.matches)panel.animate([{opacity:.5,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:250,easing:'ease-out'});}));
try{const saved=localStorage.getItem('portfolio-motion');if(saved==='off'){motionToggle.checked=false;applyMotion();}motionToggle.addEventListener('change',()=>localStorage.setItem('portfolio-motion',motionToggle.checked?'on':'off'));}catch{}
