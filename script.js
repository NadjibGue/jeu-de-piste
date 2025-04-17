const steps = [
  {
    text: `<h3>Étape 1 : La magie Rose</h3>
           <p class="timing">À réaliser vendredi - Tu doit etre sur place a 12h00</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Un endroit très girly, souvent croisé mais jamais exploré… le rose te guidera 💅</p>
             <p><strong>Action :</strong> Une fois là-bas, dis ton mot déclencheur : « Bonjour, j'aime la vanille ». Et laisse la magie opérer... À la fin, tu recevras un code qui te fais passer a l'etape suivant.</p>
           </div>`,
    hint: "Un lieu : tout est rose, girly, on passe souvent devant. Loin de moi, près de toi.",
    code: "ONGLES01"
  },
  {
    text: `<h3>Étape 2 : Une Petite Pause qui fait plaisir</h3>
           <p class="timing">À réaliser - MAINTENANT GOOO .. </p>
           <div class="enigme">
             <p><strong>Énigme :</strong> la ou notre histoire s’est ancrée.</p>
             <p><strong>Action :</strong> Une fois là-bas, dis : « C’est ici qu’on a refait le monde ». Ne commande rien, souris juste... 😉</p>

           </div>`,
    hint: "Nos entretien ",
    code: "CAFE02"
  },
  {
    text: `<h3>Étape 3 : Un frisson du passé</h3>
           <p class="timing">A faire samedi - Matin a 10h00 </p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Sous sole c'est bizarre ? c'etait le notre <b>premier frisson partagé</b> </p>
             <p><strong>Action :</strong> T'as pas besoins de prendre le bus pour aller va a celui ou tu viens me recuperer</p>
           </div>`,
    hint: "Barbecue la rammé en suite cugnaux ",
    code: "NINOUILLE"
  },
  {
    text: `<h3>Étape 4 : Rencontre crevette</h3>
           <p class="timing">Prends ton temps, mais file-y !</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> l’appartement où jai fais ma premier rencontre avec soleil .</p>
             <p><strong>Action :</strong>Tu fais ton sac perso et go le plus vite possible et oublie pas les sacs que tu as recuperer</p>
           </div>`,
    hint: " Soleil en arabe, Iftar ramadhan, Police Portugais ",
    button: "Fini",
    code: "CHAMSSI"
  },
  {
    text: `<h3>Étape 5 BONUS hihi: Mot doux du matin</h3>
           <p class="timing">Petite introspection 💭 </p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Reveil, Tout les quatre matin, tu lache tout et tu viens</p>
             <p><strong>Action :</strong> Lis et relis reflichis puis ecrits le nom qui te vient à l'esprit</p>
           </div>`,
    hint: "Indice : on en a parler il y a 4 jrs ✨",
    code: "Béééé"
  },
  {
    text: `<h3>Étape 6 : Etape de aurevoir</h3>
           <p class="timing">Si </p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Une voiture avec la plaque EE-546-EE t’attend. Ne pose aucune question.</p>
             <p><strong>Action :</strong> Le chauffeur te remettra un code à l’arrivée.</p>
           </div>`,
    hint: "C’est plus qu’un trajet… c’est la route vers moi. 🚗",
    code: "TUKIFF"
  },
  {
    text: `<h3>Étape 7 : Le dernier mot</h3>
           <p class="timing">Respire… tu arrives à destination.</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Entre dans le hall de l’hôtel. Approche-toi de l’accueil, regarde dans les yeux la personne derrière le comptoir, et dis calmement : « Vanille ».</p>
             <p><strong>Action :</strong> Tu obtiendras un numéro de chambre. Une fois devant la porte, entre le code ici :</p>
           </div>`,
    hint: "Béééé notre mot secret pour se retrouver 🍨",
    button: "J’y suis",
    code: "BRAVO"
  },
  {
    text: `<h3>Étape 8 : La Finaaaaaaaaal</h3>
           <p class="timing">Dernier instant avant le grand moment</p>
           <div class="enigme">
             <p><strong>Action :</strong> Tu es arrivée… ❤️ Ferme un instant les yeux, respire profondément, et quand tu es prête... clique ici.</p>
           </div>`,
    button: "Je suis prête",
    code: null
  },
  
  {
    text: `<h3>Fin : Merci</h3>
           <div class="enigme">
             <p>💖 Merci d'avoir suivi chaque étape avec ton cœur. Ferme les yeux, je suis juste là. Je t’aime.</p>
           </div>`
  },
];

const dialogues = [
  {
    id: "intuition",
    question: "Attends attends... Pas si vite ! Tu disais que tu savais, mais maintenant tu doutes ? Dis-moi Pinguin, as-tu une idée de ce qui t’attend ? 😊",
    responseField: true,
    reaction: (response) => `Hmm… "${response}" ? C’est mignon ce que tu penses 😌 Mais crois-moi, ce qui t’attend est encore plus fou que tu ne l’imagines... 💥`
  },
  {
    id: "excitement",
    question: "Sur une échelle de 1 à 10, à quel point es-tu excitée de commencer cette aventure ? 💫",
    responseField: true,
    reaction: (response) => {
      const note = parseInt(response);
      if (!isNaN(note) && note >= 9) return `🔥 ${note}/10 ? Wow, tu es en feu ! Garde cette vibe jusqu’au bout ❤️‍🔥`;
      if (!isNaN(note) && note <= 5) return `😅 Ouch, ${note}/10 ? Je prends ça comme un défi… tu verras, je vais faire grimper ce chiffre vite fait 😉`;
      return `${note}/10 ? Parfait. Accroche-toi bien, la suite va te secouer dans le bon sens 😍`;
    }
  },
  {
    id: "pressentiment",
    question: "Et si je te dis que cette journée pourrait changer ta vie… Tu en penses quoi ? 💝",
    responseField: true,
    reaction: (response) => `“${response}”... J’adore cette réponse ! Garde bien ce ressenti en mémoire... On en reparlera ce soir 😉💭`
  },
  {
    id: "impatience",
    question: "Tu as l’air impatiente… 😏",
    responseField: true,
    reaction: (response) => `Ohhh oui, ça se sent ! Et tu sais quoi ? Tu as raison de l’être 🥰 Suis chaque énigme, ouvre ton cœur, et laisse-toi surprendre. Prête ? On démarre ✨`
  }
];

let currentDialogue = 0;
let currentStep = 0;// Nom par défaut, peut être modifié par l'utilisateur
let userResponses = {
  timestamp: new Date().toISOString(),
  answers: [] // Chaque entrée : { id: "excitement", response: "10", reaction: "..." }
};


// Wrap functions in try-catch
function startGame() {
  try {
    const savedResponses = localStorage.getItem('gameResponses');
    const dialoguesShown = localStorage.getItem("dialoguesShown") === "true";
    
    // Masquer l'intro
    document.getElementById("intro").style.display = "none";
    
    // Reset des conteneurs
    document.getElementById("dialogue-container").style.display = "none";
    document.getElementById("step-container").style.display = "none";
    
    if (savedResponses) {
      userResponses = JSON.parse(savedResponses);
      currentDialogue = userResponses.answers.length;
    }
  
    if (currentDialogue < dialogues.length) {
      // Dialogues pas encore terminés
      document.getElementById("dialogue-container").style.display = "block";
      showDialogue();
    } else if (!dialoguesShown) {
      // Montrer le résumé des dialogues
      document.getElementById("dialogue-container").style.display = "block";
      showDialogueSummary();
    } else {
      // Passer aux étapes
      document.getElementById("step-container").style.display = "block";
      document.getElementById("startMessage").style.display = "block";
      renderStep();
      createPetalEffect();
      createFloatingHearts();
      askNotificationPermission();
    }
    updateProgressMap(); // Initialiser la carte
  } catch (error) {
    console.error('Erreur dans startGame:', error);
  }
}



function showDialogue() {
    const dialogue = dialogues[currentDialogue];
    const container = document.getElementById("dialogue-container") || createDialogueContainer();
    container.style.display = "block"; // S'assurer que le conteneur est visible
    container.innerHTML = ''; // vide le contenu précédent

    container.innerHTML = `
        <div class="dialogue-box fade-in">
            <p class="dialogue-text">${dialogue.question}</p>
            ${dialogue.responseField ? 
                `<input type="text" class="dialogue-input" placeholder="Ta réponse..." />` : 
                ''}
            <button onclick="handleDialogueResponse()" class="dialogue-button">Répondre</button>
        </div>
    `;
}

function createDialogueContainer() {
    const container = document.createElement('div');
    container.id = 'dialogue-container';
    document.querySelector('main').appendChild(container);
    return container;
}

function handleDialogueResponse() {
  const input = document.querySelector('.dialogue-input');
  const response = input ? input.value.trim() : '';

  if (response === '') return;

  const dialogue = dialogues[currentDialogue];
  const container = document.getElementById("dialogue-container");

  // Générer la réaction
  const reaction = dialogue.reaction ? dialogue.reaction(response) : '';

  // Sauvegarder la réponse dans l'objet global + localStorage
  userResponses.answers.push({
      question: dialogue.question,
      response: response,
      reaction: reaction,
      timestamp: new Date().toISOString()
  });
  localStorage.setItem('gameResponses', JSON.stringify(userResponses));

  // Envoi Google Sheet (sans blocage même si erreur)
  const formData = new FormData();
  formData.append('type', 'dialogue');
  formData.append('timestamp', new Date().toISOString());
  formData.append('question', dialogue.question);
  formData.append('response', response);

  fetch("https://script.google.com/macros/s/AKfycbxLoxInxXJGcRR5fXRyz3L_RMHxqBzSEGdBtwQqrNbNI1dT1B2Ud5g6ciILdRsob6W2/exec", {
      method: "POST",
      mode: 'no-cors',
      body: formData
  }).catch(error => console.log('Erreur envoi dialogue:', error));

  // Afficher la réaction (s’il y en a)
  if (reaction) {
      container.innerHTML += `
          <div class="dialogue-reaction fade-in">
              ${reaction}
          </div>
      `;
  }

  const nextBtn = document.createElement('button');
  nextBtn.textContent = "Suivant";
  nextBtn.className = "dialogue-next-btn fade-in";
  nextBtn.onclick = () => {
    currentDialogue++;
    if (currentDialogue >= dialogues.length) {
      showDialogueSummary();
    } else {
      showDialogue(); // Pas startGame() ici, car on reste dans les dialogues
    }
  };
  container.appendChild(nextBtn);
  if (currentDialogue >= dialogues.length) {
  localStorage.setItem("dialoguesShown", "true");
}

}


function showDialogueSummary() {
    const container = document.getElementById("dialogue-container");
    let summaryHTML = `
        <div class="summary-box fade-in">
            <h3>💝 Merci pour tes réponses mon amour!</h3>
            <p>J'ai bien reçu tes messages sur mon téléphone à l'instant. 
               Fais une capture d'écran de ce récapitulatif, tu en auras peut-être besoin plus tard... 📸</p>
            <div class="responses-list">
    `;
    
    userResponses.answers.forEach((item, index) => {
        summaryHTML += `
            <div class="response-item">
            
                <p class="question">Q${index + 1}: ${item.question}</p>
                <p class="answer">Ta réponse: ${item.response}</p>
                <p class="reaction">💬 Réaction : ${item.reaction}</p>
            </div>
        `;
    });

    summaryHTML += `
            </div>
            <p class="next-step-hint">🎯 Maintenant, lance-toi dans l'étape 1! Je ne peux plus te contacter, mais je sais que tu vas y arriver! 💪</p>
            <button onclick="startGameAfterSummary()" class="start-adventure-btn">Commencer l'aventure</button>
        </div>
    `;

    container.innerHTML = summaryHTML;
}

function startGameAfterSummary() {
  const container = document.getElementById("dialogue-container");
  container.classList.add("fade-out");

  setTimeout(() => {
      container.style.display = "none";
      document.getElementById("step-container").style.display = "block";
      document.getElementById("startMessage").style.display = "block";
      renderStep();
      createPetalEffect();
      createFloatingHearts();
      askNotificationPermission();
  }, 500);
}


let notificationsEnabled = false;
function askNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        notificationsEnabled = true;

        // ➤ Notification de départ
        new Notification("🥰 Ahaa bébé...", {
          body: "Là y’a plus de marche arrière 😈\nMais je sais que tu vas réussir.\nJe crois en toi mon cœur ❤️",
          icon: "icon-192.png"
        });

        // ➤ Voix robotisée
        const speech = new SpeechSynthesisUtterance(
          "Ahaa bébé... Là y’a plus de marche arrière. Mais je sais que tu vas réussir. Je crois en toi mon cœur."
        );
        speech.lang = 'fr-FR';
        speech.rate = 1;
        speech.pitch = 1.2;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
      }
    });
  }
}
// Modifier la fonction checkCode pour inclure l'animation
function checkCode() {
  const step = steps[currentStep];
  const inputEl = document.getElementById("codeInput");
  const input = inputEl ? inputEl.value.trim().toUpperCase() : null;
  const expected = step.code ? step.code.toUpperCase() : null;
  const container = document.getElementById("step-container");
  const messageEl = document.getElementById("message");

  if (!step.code || input === expected) {
    completeStep();
    // Envoyer le code au Google Sheet
    const formData = new FormData();
    formData.append('type', 'step');
    formData.append('timestamp', new Date().toISOString());
    formData.append('stepNumber', currentStep + 1);
    formData.append('code', input);
    formData.append('secret', 'ishtar-code-secret');

    fetch("https://script.google.com/macros/s/AKfycbwGtB0aq7myxN8f0LaBwpWJCV2Ti80XJUWMXyqwupP9vVJ7gIrBpltsKhmwj67iFLNcDA/exec", {
      method: "POST",
      mode: 'no-cors',
      body: formData
    }).catch(error => console.log('Erreur envoi code:', error));

    currentStep++;
    updateProgressMap(); // Mettre à jour la carte
    if (currentStep < steps.length) {
      container.classList.add('fade-out');
      setTimeout(() => {
        renderStep();
        container.classList.remove('fade-out');
      }, 500);
    } else {
      container.innerHTML = `
  <div class="final-step fade-in">
    <h2 class="heartbeat">Tu es là… ❤️</h2>
    <p class="soft-fade">Ferme les yeux quelques secondes.</p>
    <p class="soft-fade">Respire profondément.</p>
    <p class="soft-fade">Laisse ton cœur faire le reste.</p>
    <button class="big-button zoom-smooth appear-smooth" onclick="triggerFinalMoment()">Je suis prête</button>


  </div>
`;
    }
  } else {
    messageEl.innerHTML = "<div class='hint-box fade-in error'>❌ Code incorrect. Réessaie avec ton cœur.</div>";
  }
}
function renderStep() {
  const container = document.getElementById("step-container");
  const step = steps[currentStep];
  const escapedHint = step.hint ? step.hint.replace(/'/g, "\\'") : "";
  
  // Notifications personnalisées
  if (currentStep === 2 && notificationsEnabled) {
    new Notification("💡 Ah Ouai! t'es deja la ?", {
      body: "Récompence : tu as le droit de me poser une question si tu bloque sur une étape garde la au chaud tu sais pas quand tu aura besoin.",
      icon: "icon-192.png"
    });
  } else if (currentStep === 3 && notificationsEnabled) {
    new Notification("🌟 Étape 4 en approche !", {
      body: "Fais ton sac, et bonus j'aime te voir maquiller prend ton maquillage et fais toi belle mais finis l'etape ne te maquille pas chez toi.",
      icon: "icon-192.png"
    });
  }

  container.innerHTML = `
    <div class="step-box fade-in">
      <div class="step-content">
        <p class="step-text">${step.text}</p>
        ${step.code ? `<input type="text" id="codeInput" class="fade-in" placeholder="Entre le code ici" />` : ""}
        <button onclick="checkCode()">${step.button || "Valider"}</button>
      </div>
      <div id="message" class="message"></div>
      ${step.hint ? `<p><a href="#" class="hint-link" onclick="showHint(\`${escapedHint}\`); return false;">Besoin d'un indice ?</a></p>` : ""}
    </div>
  `;
}

function showHint(hint) {
  console.log('showHint called with:', hint); // Debug
  const messageEl = document.getElementById("message");
  if (!messageEl) return;

  messageEl.innerHTML = `
    <div class="hint-box fade-in">
      💡 ${hint}
    </div>
  `;
}

function triggerFinalMoment() {
  const container = document.getElementById("step-container");
  
  // Démarre une musique douce (optionnel)
  const music = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  music.volume = 0.3;
  music.play().catch(err => console.log('Autoplay prevented'));

  // Séquence finale avec transitions
  container.innerHTML = `
    <div class="ending-sequence">
      <div class="ending-step" id="step1">
        <h2 class="fade-in">Ferme les yeux...</h2>
        <p class="fade-in-delay">Prends une grande respiration...</p>
      </div>
      <div class="ending-step hidden" id="step2">
        <h2>Tout ce chemin parcouru...</h2>
        <p>Chaque étape nous a rapprochés...</p>
      </div>
      <div class="ending-step hidden" id="step3">
        <h2>Et maintenant...</h2>
        <p>Tu y es presque...</p>
      </div>
      <div class="ending-step hidden" id="step4">
        <h2 class="heartbeat">❤️</h2>
        <p class="glow">Ouvre doucement les yeux...</p>
        <button class="final-button shine" onclick="revealFinal()">Je suis prête</button>
      </div>
    </div>
  `;

  // Ajoute les styles pour l'animation
  const style = document.createElement('style');
  style.innerHTML = `
    .ending-sequence { text-align: center; padding: 2em; }
    .ending-step { transition: opacity 1.5s ease-in-out; }
    .hidden { opacity: 0; display: none; }
    .heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
    .glow { animation: glow 2s ease-in-out infinite; }
    .shine { animation: shine 2s infinite; }
    @keyframes heartbeat {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @keyframes glow {
      0% { text-shadow: 0 0 10px #fff; }
      50% { text-shadow: 0 0 20px #ff69b4, 0 0 30px #ff69b4; }
      100% { text-shadow: 0 0 10px #fff; }
    }
    @keyframes shine {
      0% { background-position: -100px; }
      100% { background-position: 200px; }
    }
  `;
  document.head.appendChild(style);

  // Séquence temporelle des transitions
  setTimeout(() => showEndingStep('step2'), 4000);
  setTimeout(() => showEndingStep('step3'), 8000);
  setTimeout(() => showEndingStep('step4'), 12000);
  
  // Lance l'effet confetti progressivement
  startGradualConfetti();
}

function showEndingStep(stepId) {
  const currentStep = document.querySelector('.ending-step:not(.hidden)');
  const nextStep = document.getElementById(stepId);
  
  if (currentStep) {
    currentStep.style.opacity = 0;
    setTimeout(() => {
      currentStep.classList.add('hidden');
      nextStep.classList.remove('hidden');
      setTimeout(() => nextStep.style.opacity = 1, 100);
    }, 1500);
  }
}

function startGradualConfetti() {
  let intensity = 0;
  const maxIntensity = 100;
  const interval = setInterval(() => {
    if (intensity >= maxIntensity) {
      clearInterval(interval);
      return;
    }
    createConfetti(intensity);
    intensity += 5;
  }, 1000);
}

function createConfetti(amount) {
  for (let i = 0; i < amount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 75%)`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

function revealFinal() {
  // Transition douce
  document.body.style.transition = 'opacity 2s ease';
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.innerHTML = `
      <div class="final-reveal" style="height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #ff69b4, #ff1493); color: white; text-align: center; opacity: 0; transition: opacity 2s ease;">
        <div>
          <h1 style="font-size: 3em; margin-bottom: 0.5em; animation: heartbeat 1.5s infinite;">❤️</h1>
          <p style="font-size: 2em; max-width: 600px; margin: 0 auto; text-shadow: 0 0 10px rgba(255,255,255,0.5);">Retourne-toi doucement...</p>
        </div>
      </div>
    `;
    document.body.style.opacity = '1';
    
    // Vibration plus douce et rythmée
    if (navigator.vibrate) {
      navigator.vibrate([100, 100, 100, 100, 200]);
    }
    
    startGradualConfetti();
  }, 2000);
}

function createPetalEffect() {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fall {
      to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    .petal {
      position: fixed;
      top: -10px;
      width: 20px;
      height: 20px;
      background: radial-gradient(#ff7eb9 40%, transparent 41%);
      border-radius: 50%;
      pointer-events: none;
      animation: fall linear infinite;
    }
  `;
  document.head.appendChild(style);

  setInterval(() => {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (3 + Math.random() * 2) + 's';
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 5000);
  }, 300);
}

function createFloatingHearts() {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes floatUp {
       0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-100vh); opacity: 0; }
    }
    .heart {
      position: fixed;
      bottom: 0;
      font-size: 24px;
      animation: floatUp 5s linear infinite;
      color: #ff7096;
    }
  `;
  document.head.appendChild(style);

  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 800);
}

function confettiRain() {
  const style = document.createElement('style');
  style.innerHTML = `
    .confetti {
      position: fixed;
      width: 10px;
      height: 10px;
      background: pink;
      animation: confettiFall 3s linear forwards;
      border-radius: 50%;
    }
    @keyframes confettiFall {
      to { transform: translateY(100vh); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 75%)`;
    confetti.style.animationDelay = `${Math.random()}s`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Code d'accès (à changer selon vos besoins)
const CORRECT_ACCESS_CODE = "CODE2024";

// Modifie la fonction checkAccessCode pour sauvegarder dans localStorage
function checkAccessCode() {
  try {
    const input = document.getElementById('accessCodeInput');
    const error = document.getElementById('accessError');
    const overlay = document.getElementById('accessCodeOverlay');
    const mainContent = document.getElementById('mainContent');
  
    if (input.value === CORRECT_ACCESS_CODE) {
        overlay.style.display = 'none';
        mainContent.style.display = 'block';
        // Sauvegarde permanente du code d'accès
        localStorage.setItem('gameAccessGranted', 'true');
    } else {
        error.textContent = 'Code incorrect';
        input.value = '';
    }
  } catch (error) {
    console.error('Erreur dans checkAccessCode:', error);
  }
}

window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  const accessGranted = localStorage.getItem('gameAccessGranted') === 'true';

  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';

      if (accessGranted) {
        document.getElementById('accessCodeOverlay').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('intro').style.display = 'block';

        // 👇 Ajoute cette ligne
        startGame(); // ← C’est ça qui manquait !
      } else {
        document.getElementById('accessCodeOverlay').style.display = 'flex';
        document.getElementById('mainContent').style.display = 'none';
      }

    }, 1000);
  }, 3000);
});


// Ajouter une fonction pour voir les réponses (utile pour le débogage)
function viewResponses() {
    const responses = localStorage.getItem('gameResponses');
    if (responses) {
        console.log('Réponses sauvegardées:', JSON.parse(responses));
        return JSON.parse(responses);
    }
    return null;
};

const stepIcons = ['💅', '☕', '💋', '🏠', '💝', '🚗', '🏨', '❤️'];
const stepNames = [
    'Etape 1 : Pesahtek les ongles',
    'Pause Café : HAHA ouvre pas le sac',
    'Frisson Secret : Le paaaarkiiing BEBEEE',
    'Nid Douillet',
    'Mots Doux Béééé 4',
    'En Route',
    'Destination',
    'Face à Face'
  ]
;
// Mettre à jour la carte de progression

function updateProgressMap() {
  const container = document.querySelector('.steps-container');
  const progress = Math.round((currentStep / (steps.length - 1)) * 100);
  
  container.innerHTML = `
    <div class="progress-bar">
      <div class="progress-bar-fill" style="width: ${progress}%; background-color: #ff7096;"></div>
    </div>
  `;

  steps.forEach((step, index) => {
    if (!step.text.includes('Fin :')) {
      const stepElement = document.createElement('div');
      const completed = index < currentStep;
      const isCurrent = index === currentStep;
      
      stepElement.className = `map-step ${completed ? 'completed' : ''} ${isCurrent ? 'current' : ''}`;
      stepElement.innerHTML = `
        <div class="step-content">
          <div class="step-icon" style="font-size: 24px;">${stepIcons[index]}</div>
          <div class="step-name" style="font-weight: bold; color: ${isCurrent ? '#ff7096' : '#333'};">${stepNames[index]}</div>
          ${completed ? '<div class="step-badge">✨</div>' : ''}
        </div>
      `;

      if (completed || isCurrent) {
        stepElement.style.cursor = 'pointer';
        stepElement.onclick = () => showStepDetails(index);
      }
      
      container.appendChild(stepElement);
    }
  });
}

// Ajouter animation quand une étape est complétée
function completeStep() {
  const currentStepEl = document.querySelector('.map-step.current');
  if (currentStepEl) {
    currentStepEl.classList.add('completed');
    currentStepEl.style.transition = 'all 0.5s ease';
    currentStepEl.style.filter = 'blur(0)';
    currentStepEl.style.opacity = '1';
  }

  // Ne pas afficher le popup à partir de l'étape 7
  if (currentStep < 6) { // 6 correspond à l'index de l'étape 7 (car on commence à 0)
    const popup = document.createElement('div');
    popup.className = 'popup-congrats fade-in';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '1000';

    popup.innerHTML = `
      <div class="popup-content" style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
        <h2>🎉 Félicitations !</h2>
        <p>T'es forte mdrr c'est bebe bravo ! continue comme ça !</p>
        <button onclick="closePopup()" style="padding: 10px 20px; font-size: 16px; border: none; background: #ff7096; color: white; border-radius: 5px; cursor: pointer;">Continuer</button>
      </div>
    `;
    document.body.appendChild(popup);
  }
}

function closePopup() {
  const popup = document.querySelector('.popup-congrats');
  if (popup) popup.remove();
}

function showStepDetails(index) {
  // Animation flash pour montrer la sélection
  const step = document.querySelectorAll('.map-step')[index];
  step.style.animation = 'flash 0.5s';
  setTimeout(() => step.style.animation = '', 500);
}

function toggleMap() {
  const map = document.getElementById('progressMap');
  map.classList.toggle('visible');
}