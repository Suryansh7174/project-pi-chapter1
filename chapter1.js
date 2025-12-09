/* Chapter 1 interactive JS:
   - Animated particles spawn
   - Riddles + story MCQs (12 total)
   - scoring, reveal fact, progress saved in localStorage
*/

(function(){
  // particle engine (lightweight)
  const pCount = 40;
  const particlesLayer = document.getElementById('particles');
  function spawnParticles(){
    for(let i=0;i<pCount;i++){
      const el = document.createElement('div');
      el.className = 'particle';
      const size = Math.random()*3+1;
      el.style.width = el.style.height = size+'px';
      el.style.left = Math.random()*100+'%';
      el.style.top = Math.random()*100+'%';
      el.style.opacity = (Math.random()*0.6+0.05).toString();
      particlesLayer.appendChild(el);
      // slow float
      const dx = (Math.random()-0.5)*60;
      const dy = (Math.random()-0.5)*60;
      el.animate([{transform:'translate(0,0)'},{transform:`translate(${dx}px,${dy}px)`}],{duration:15000+Math.random()*12000,iterations:Infinity,direction:'alternate'});
    }
  }
  spawnParticles();

  // quiz content (12 Qs: riddles, story, logic)
  const questions = [
    { q:"Riddle 1 — I crack but make no sound. I open with numbers, not hands. What am I?", A:"A secret", B:"A rift", C:"A mirror", D:"A code", correct:"B" },
    { q:"Riddle 2 — I repeat without moving, my next is always sum. Who am I?", A:"Echo", B:"Fibonacci sequence", C:"Shadow", D:"Wave", correct:"B" },
    { q:"Story — Who held the notebook the moment the board split?", A:"Suryansh", B:"Vaishnav", C:"Aarav", D:"Sia", correct:"C" },
    { q:"Story — Which object glowed first?", A:"A pen", B:"The board", C:"A window", D:"A clock", correct:"B" },
    { q:"Story — Mr. William's notebook was described as:", A:"Shiny and new", B:"Old leather with yellowed pages", C:"Metal bound", D:"Empty", correct:"B" },
    { q:"Logic — Sequence starts: 1, 1, 2, 3, 5. Next number?", A:"5", B:"8", C:"7", D:"6", correct:"B" },
    { q:"Observation — When the rift closed briefly, the phone buzzed with a warning. Which time did the message say?", A:"Before midnight", B:"Dawn", C:"Noon", D:"After school", correct:"A" },
    { q:"Inference — The classroom light flickered in a pattern of pulses equaling which number?", A:"7", B:"9", C:"3", D:"5", correct:"B" },
    { q:"Riddle 3 — I am part of a circle but less than whole. You name me with a word that sounds like dessert. What am I?", A:"Slice", B:"Arc", C:"Sector", D:"Pi", correct:"A" },
    { q:"Pattern — Which character first said 'It’s not normal math'?", A:"Aarav", B:"Sia", C:"Suryansh", D:"Vaishnav", correct:"B" },
    { q:"Critical — The note on the last page asked them to 'Solve the sutra before ___.' Fill the blank.", A:"Noon", B:"Midnight", C:"Sunrise", D:"Tomorrow", correct:"B" },
    { q:"Wrap — The very first glitch looked like what visual motif?", A:"A circle split", B:"A lightning bolt", C:"A spiral", D:"A staircase", correct:"A" }
  ];

  // render questions
  const area = document.getElementById('questionArea') || document.getElementById('questionArea');
  function render(){
    const container = document.getElementById('questionArea');
    if(!container)return;
    container.innerHTML = '';
    questions.forEach((it, idx)=>{
      const block = document.createElement('div');
      block.className = 'question';
      let html = `<p>${it.q}</p>`;
      ['A','B','C','D'].forEach(letter=>{
        html += `<label><input type="radio" name="q${idx}" value="${letter}"> ${letter}) ${it[letter]}</label>`;
      });
      block.innerHTML = html;
      container.appendChild(block);
    });
  }

  // initial visibility/actions
  const beginBtn = document.getElementById('beginBtn');
  const quizSection = document.getElementById('quiz');
  const intro = document.getElementById('intro');
  beginBtn && beginBtn.addEventListener('click', ()=>{
    intro.classList.add('hidden');
    quizSection.classList.remove('hidden');
    render();
    window.scrollTo({top:0,behavior:'smooth'});
  });

  // scoring & reveal
  const submitBtn = document.getElementById('submitBtn');
  const resultText = document.getElementById('scoreText');
  function revealFact(){
    const facts = [
      "The number sequence glimpsed in Chapter 1 is Fibonacci — it appears across nature: shells, petals, and galaxies.",
      "Rifts in fiction often symbolize unknown rules entering reality — here, that rule is pattern (math) becoming physical.",
      "Mathematical patterns can be used as memory tools — ancient sutras followed similar 'shortcuts' to speed thinking."
    ];
    const fact = facts[Math.floor(Math.random()*facts.length)];
    document.getElementById('factText').innerText = fact;
    document.getElementById('fact').classList.remove('hidden');
    // mark solved in localStorage
    try{ localStorage.setItem('projectpi_ch1_solved','1'); }catch(e){}
  }

  submitBtn && submitBtn.addEventListener('click', ()=>{
    let score=0;
    questions.forEach((it, idx)=>{
      const sel = document.querySelector(`input[name="q${idx}"]:checked`);
      if(sel && sel.value === it.correct) score++;
    });
    resultText.innerText = `Score: ${score}/${questions.length} (${Math.round((score/questions.length)*100)}%)`;
    if(score >= Math.ceil(questions.length*0.6)){
      revealFact();
      // show next link after small delay & animate
      setTimeout(()=>{ document.getElementById('nextLink').style.display='inline-block'; },600);
    } else {
      // small glitch feedback
      resultText.style.color = '#ffb3b3';
      const g = document.querySelector('.glitch');
      if(g){ g.animate([{filter:'hue-rotate(0deg)'},{filter:'hue-rotate(15deg)'},{filter:'hue-rotate(-10deg)'},{filter:'hue-rotate(0deg)'}],{duration:450,iterations:1}) }
    }
  });

  // reset answers
  const resetBtn = document.getElementById('resetBtn');
  resetBtn && resetBtn.addEventListener('click', ()=>{
    document.querySelectorAll('input[type=radio]').forEach(el=>el.checked=false);
    document.getElementById('scoreText').innerText = '';
  });

  // auto-load if previously solved (optional)
  try{
    if(localStorage.getItem('projectpi_ch1_solved') === '1'){
      // directly reveal fact & next
      render();
      document.getElementById('intro').classList.add('hidden');
      document.getElementById('quiz').classList.remove('hidden');
      revealFact();
      document.getElementById('nextLink').style.display = 'inline-block';
    }
  }catch(e){}
})();
