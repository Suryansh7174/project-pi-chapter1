// STORY DATA
const storyContent = "The classroom lights pulsed. Mr. William wrote 19 × 11 on the board. The air smelled of ozone. 'Some multiplications are not done,' he whispered. 'They are revealed.'";

// TYPEWRITER EFFECT
window.onload = function() {
    // Ensure the correct CSS link is used (good practice, though not strictly required if saved correctly)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'chapter1.css';
    document.head.appendChild(link);
    
    const textElem = document.getElementById('typewriter-text');
    let i = 0;
    
    function typeWriter() {
        if (i < storyContent.length) {
            textElem.innerHTML += storyContent.charAt(i);
            i++;
            setTimeout(typeWriter, 30); // Typing speed
        } else {
            // Once typing is done, reveal the interface
            setTimeout(() => {
                document.getElementById('sutra-interface').classList.remove('hidden');
                document.getElementById('sutra-interface').classList.add('fade-in');
            }, 1000);
        }
    }
    typeWriter();
};

// SUTRA SIMULATION LOGIC
const btnReveal = document.getElementById('btn-reveal');
const stage1 = document.getElementById('stage-1');
const stage2 = document.getElementById('stage-2');
const stage3 = document.getElementById('stage-3');
const riftLine = document.querySelector('.rift-line');
const explanation = document.getElementById('sutra-explanation');

btnReveal.addEventListener('click', () => {
    // Step 1: Open the Rift
    riftLine.style.width = "100%";
    btnReveal.disabled = true;
    explanation.innerText = "ACTIVATING: Ekādhikena Pūrvena...";
    
    // Step 2: Split the Numbers (1.5s delay)
    setTimeout(() => {
        stage1.classList.add('hidden');
        stage2.classList.remove('hidden');
        stage2.classList.add('fade-in');
        explanation.innerHTML = "LOGIC: Split 1 and 9. <br> Middle is Sum (1+9=10).";
    }, 1500);

    // Step 3: The Carry Over & Final Reveal (3.5s delay)
    setTimeout(() => {
        stage2.classList.add('hidden');
        stage3.classList.remove('hidden');
        stage3.classList.add('fade-in');
        
        explanation.innerHTML = "RESULT: Carry the 1. (1+1) | 0 | 9 <br> ANSWER: 209";
        explanation.style.color = "var(--neon-blue)";
        
        // Reveal the Gate Puzzle
        document.getElementById('the-gate').classList.remove('hidden');
        document.getElementById('the-gate').classList.add('fade-in');
        window.scrollTo(0, document.body.scrollHeight);
    }, 4000);
});

// PUZZLE LOCK LOGIC
function moveFocus(current, nextFieldID) {
    if (current.value.length >= 1) {
        document.getElementById(nextFieldID).focus();
    }
}

function checkCode() {
    const c1 = document.getElementById('code-1').value;
    const c2 = document.getElementById('code-2').value;
    const c3 = document.getElementById('code-3').value;
    const fullCode = c1 + c2 + c3;
    const portalMsg = document.getElementById('portal-msg');

    if (fullCode === "385") {
        // Success Animation
        [document.getElementById('code-1'), document.getElementById('code-2'), document.getElementById('code-3')]
            .forEach(el => el.classList.add('success-border'));
        
        portalMsg.innerHTML = "ACCESS GRANTED. LOADING CHAPTER 2...";
        portalMsg.style.color = "var(--neon-blue)";
        portalMsg.style.textShadow = "0 0 10px var(--neon-blue)";
        
        // In a real application, this is where you would link to chapter2.html
    } else {
        if (fullCode.length === 3) {
            portalMsg.innerText = "INVALID SUTRA.";
            portalMsg.style.color = "var(--neon-red)";
            setTimeout(() => {
                document.getElementById('code-1').value = '';
                document.getElementById('code-2').value = '';
                document.getElementById('code-3').value = '';
                document.getElementById('code-1').focus();
            }, 1000);
        }
    }
}
