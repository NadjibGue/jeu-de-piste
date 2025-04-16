const steps = [
  {
    text: `<h3>Étape 1 : Test de réactivité</h3>
           <p class="timing">À réaliser vendredi - Objectif : 11h30</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Un endroit très girly, souvent croisé mais jamais exploré… le rose te guidera 💅</p>
             <p><strong>Action :</strong> Une fois là-bas, dis : « Bonjour, j'aime la vanille ». Et laisse la magie opérer... À la fin, tu recevras un code. 💅</p>
           </div>`,
    hint: "Un lieu : tout est rose, girly, on passe souvent devant. Loin de moi, près de toi.",
    code: "ONGLES01"
  },
  {
    text: `<h3>Étape 2 : Une Petite Pause qui fait plaisir</h3>
           <p class="timing">À réaliser vendredi - Maintenant go .. </p>
           <div class="enigme">
             <p><strong>Énigme :</strong> On y a passé des heures à refaire le monde autour d’un café… ☕</p>
             <p><strong>Action :</strong> Une fois là-bas, dis : « C’est ici qu’on a refait le monde ». Ne commande rien, souris juste... 😉</p>

           </div>`,
    hint: "Rends-toi dans le café où notre histoire s’est ancrée.",
    code: "CAFE02"
  },
  {
    text: `<h3>Étape 3 : Un frisson du passé</h3>
           <p class="timing">À faire sans tarder…</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Va à l’endroit le plus proche de toi. Tu y trouveras un petit sac.</p>
             <p><strong>Action :</strong> Saisis ici le mot trouvé dans ce sac secret…</p>
           </div>`,
    hint: "Ce petit coin discret… notre premier frisson partagé 💋",
    code: "BISOU03"
  },
  {
    text: `<h3>Étape 4 : Le repaire complice</h3>
           <p class="timing">Prends ton temps, mais file-y !</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Rends-toi à l’appartement où nous avons dormi ensemble (ni chez toi, ni chez moi).</p>
             <p><strong>Action :</strong> Une personne complice t’y attend. Clique quand tout est terminé.</p>
           </div>`,
    hint: "Un lieu refuge partagé… et une alliée t’attend à l’intérieur 🫶",
    button: "Fini",
    code: "FINI04"
  },
  {
    text: `<h3>Étape 5 : Mot doux du matin</h3>
           <p class="timing">Petite introspection 💭</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Réponds à cette question : comment je t'appelle à chaque réveil ?</p>
             <p><strong>Action :</strong> Tape ici ce petit nom plein d’amour...</p>
           </div>`,
    hint: "Indice : c’est doux, c’est tendre, et tu souris à chaque fois ✨",
    code: "MONANGE"
  },
  {
    text: `<h3>Étape 6 : Le grand départ</h3>
           <p class="timing">Descends dès que tu es prête</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Une voiture avec la plaque EE-546-EE t’attend. Ne pose aucune question.</p>
             <p><strong>Action :</strong> Le chauffeur te remettra un code à l’arrivée.</p>
           </div>`,
    hint: "C’est plus qu’un trajet… c’est la route vers moi. 🚗",
    code: "CHAUFFEUR06"
  },
  {
    text: `<h3>Étape 7 : Le dernier mot</h3>
           <p class="timing">Respire… tu arrives à destination.</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> Entre dans le hall de l’hôtel. Approche-toi de l’accueil, regarde dans les yeux la personne derrière le comptoir, et dis calmement : « Vanille ».</p>
             <p><strong>Action :</strong> Tu obtiendras un numéro de chambre. Une fois devant la porte, entre le code ici :</p>
           </div>`,
    hint: "Vanille… notre mot secret pour se retrouver 🍨",
    button: "J’y suis",
    code: "CHAMBRE07"
  },
  {
    text: `<h3>Étape 8 : Face à moi</h3>
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



function renderStep() {
  const container = document.getElementById("step-container");
  const step = steps[currentStep];
  const escapedHint = step.hint ? step.hint.replace(/'/g, "\\'") : "";
  
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
function triggerFinalMoment() {
  const container = document.getElementById("step-container");
  container.innerHTML = `
    <div class="ending fade-in">
      <h2>💖 Ferme les yeux maintenant.</h2>
      <p>Quelqu’un t’attend juste là.<br><strong>Prête ? Avance doucement…</strong></p>
    </div>
  `;
  confettiRain();

  // Optionnel : vibration mobile (1 seconde)
  if (navigator.vibrate) {
    navigator.vibrate(1000);
  }
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
  'Beauté Rose',
  'Pause Café',
  'Frisson Secret',
  'Nid Douillet',
  'Mots Doux',
  'En Route',
  'Destination',
  'Face à Face'
];

function updateProgressMap() {
  const container = document.querySelector('.steps-container');
  const progress = Math.round((currentStep / (steps.length - 1)) * 100);
  
  container.innerHTML = `
    <div class="progress-bar">
      <div class="progress-bar-fill" style="width: ${progress}%"></div>
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
          <div class="step-icon">${stepIcons[index]}</div>
          <div class="step-name">${stepNames[index]}</div>
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