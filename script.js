const steps = [
  {
    text: `<h3>Étape 1 : Test de réactivité</h3>
           <p class="timing">À réaliser vendredi - Objectif : 10h30</p>
           <div class="enigme">
             <p><strong>Énigme :</strong> C'est un lieu : tout est rose, girly, on passe souvent devant. Loin de moi, près de toi.</p>
             <p><strong>Action :</strong> Une fois là-bas, dis : « Bonjour, j'aime la vanille ». Et laisse la magie opérer... À la fin, tu recevras un code. 💅</p>
           </div>`,
    hint: "Un endroit très girly, souvent croisé mais jamais exploré… le rose te guidera 💅",
    code: "ONGLES01"
  },
  {
    text: "Tu es éclatante ✨ Il est temps de souffler. Rends-toi dans le café où notre histoire s’est ancrée. Tu y trouveras un sac avec un code. Garde-le fermé. Saisis ici le mot qu’on t’a remis.",
    hint: "On y a passé des heures à refaire le monde autour d’un cappuccino… ☕",
    code: "CAFE02"
  },
  {
    text: "Souviens-toi de notre premier baiser. Mais va à l’endroit le plus proche de toi. Tu y trouveras un petit sac. Saisis ici le mot trouvé.",
    hint: "Ce petit coin discret… notre premier frisson partagé 💋",
    code: "BISOU03"
  },
  {
    text: "Rends-toi à l’appartement où nous avons dormi ensemble (ni chez toi, ni chez moi). Une personne complice t’y attend. Clique quand tout est terminé.",
    hint: "Un lieu refuge partagé… et une alliée t’attend à l’intérieur 🫶",
    button: "Fini",
    code: "FINI04"
  },
  
  {
    text: "Réponds à cette question : comment je t'appelle à chaque réveil ?",
    hint: "Indice : c’est doux, c’est tendre, et tu souris à chaque fois ✨",
    code: "MONANGE"
  },
  {
    text: "Descends. Une voiture avec la plaque EE-546-EE t’attend. Ne pose aucune question. Le chauffeur te remettra un code à l’arrivée.",
    hint: "C’est plus qu’un trajet… c’est la route vers moi. 🚗",
    code: "CHAUFFEUR06"
  },
  {
    text: "Tu es presque là... Entre dans le hall de l’hôtel. Approche-toi de l’accueil, regarde dans les yeux la personne derrière le comptoir, et dis calmement : « Vanille ». Tu obtiendras alors un numéro de chambre. Garde ce moment dans ton cœur. 💖 Une fois devant la porte, entre le code ici :",
    hint: "Vanille… notre mot secret pour se retrouver 🍨",
    button: "J’y suis",
    code: "CHAMBRE07"
  },
  {
    text: "Tu es arrivée… ❤️ Reste là. Inspire, expire. C’est maintenant à moi de te parler en face. Quand tu es prête, clique ici :",
    button: "Suivant",
    code: null
  },
  {
    text: "💖 Merci d'avoir suivi chaque étape avec ton cœur. Ferme les yeux, je suis juste là. Je t’aime."
  }
];

const dialogues = [
  {
    question: "Attend attend pas aussi vite tu me disais que tu sais et tu as des doute...? Alors Pinguin, as-tu une idée de ce qui t'attend ? 😊",
    responseField: true,
    reaction: (response) => `Hmm... "${response}" ? C'est mignon ce que tu penses ! Mais crois-moi, c'est encore mieux que ça 😘`
  },
  {
    question: "Sur une échelle de 1 à 10, à quel point es-tu excitée de commencer cette aventure ? 💫",
    responseField: true,
    reaction: (response) => `Waouh ! ${response}/10 ? J'espère que tu garderas cette énergie jusqu'au bout 🥰`
  },
  {
    question: "Et si je te dis que cette journée pourrait changer ta vie... Tu en penses quoi ? 💝",
    responseField: true,
    reaction: (response) => `${response}... J'adore ta réponse ! Garde bien ce message quelque part, on en reparlera à la fin 😉`
  },
  {
    question: "Tu as l'air impatiente... 😏",
    responseField: true,
    reaction: (response) => `Si tu as vraiment hâte de savoir, concentre-toi bien sur chaque énigme... Trouve tous les codes et tu découvriras quelque chose de magique 💫 Tu es prête ? C'est parti ! 🎯`
  }
];

let currentStep = 0;
let currentDialogue = 0;

let userResponses = {
    timestamp: new Date().toISOString(),
    answers: []
};

function startGame() {
    // Charger les réponses précédentes si elles existent
    const savedResponses = localStorage.getItem('gameResponses');
    if (savedResponses) {
        userResponses = JSON.parse(savedResponses);
    }
    
    // Masquer l'intro complètement
    document.getElementById("intro").style.display = "none";
    
    if (currentDialogue < dialogues.length) {
        // Afficher le conteneur de dialogue
        const dialogueContainer = document.getElementById("dialogue-container") || createDialogueContainer();
        dialogueContainer.style.display = "block";
        showDialogue();
    } else {
        // Si tous les dialogues sont terminés, afficher le jeu
        document.getElementById("dialogue-container").style.display = "none";
        document.getElementById("step-container").style.display = "block";
        document.getElementById("startMessage").style.display = "block";
        renderStep();
        createPetalEffect();
        createFloatingHearts();
        askNotificationPermission();
    }
}

function showDialogue() {
    const dialogue = dialogues[currentDialogue];
    const container = document.getElementById("dialogue-container") || createDialogueContainer();
    container.style.display = "block"; // S'assurer que le conteneur est visible
    
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

// Remplacer la fonction handleDialogueResponse existante
function handleDialogueResponse() {
    const input = document.querySelector('.dialogue-input');
    const response = input ? input.value : '';
    
    if (response.trim() === '') {
        return;
    }

    const dialogue = dialogues[currentDialogue];
    const container = document.getElementById("dialogue-container");
    
    // Sauvegarder la réponse
    userResponses.answers.push({
        question: dialogue.question,
        response: response,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('gameResponses', JSON.stringify(userResponses));

    // Envoyer la réponse au Google Sheet
    fetch("https://script.google.com/macros/s/AKfycbzVlJ5KI-ybMjMoahwmwu_EmGGQIq_E63h8C_WjXnZ7pKFvMMOpLEfOuSLbYi_K6UoNLg/exec", {
        method: "POST",
        body: JSON.stringify({
            timestamp: new Date().toISOString(),
            question: dialogue.question,
            response: response
        })
    });

    // Afficher la réaction
    container.innerHTML += `
        <div class="dialogue-reaction fade-in">
            ${dialogue.reaction(response)}
        </div>
    `;

    setTimeout(() => {
        currentDialogue++;
        if (currentDialogue >= dialogues.length) {
            showDialogueSummary();
        } else {
            startGame();
        }
    }, 3000);
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
    document.getElementById("dialogue-container").style.display = "none";
    document.getElementById("step-container").style.display = "block";
    document.getElementById("startMessage").style.display = "block";
    renderStep();
    createPetalEffect();
    createFloatingHearts();
    askNotificationPermission();
}

let notificationsEnabled = false;
function askNotificationPermission() {
  if ("Notification" in window) {
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
  const inputField = step.code ? `<input type="text" id="codeInput" class="fade-in" placeholder="Entre le code ici" />` : "";
  const hintLink = step.hint ? `<p><a href="#" class="hint-link" onclick="showHint('${step.hint}')">Besoin d’un indice ?</a></p>` : "";
  const buttonLabel = step.button || "Valider";
  container.innerHTML = `
    <div class="step-box fade-in">
      <p class="step-text">${step.text}</p>
      ${inputField}
      <button onclick="checkCode()">${buttonLabel}</button>
      <div class="message" id="message"></div>
      ${hintLink}
    </div>
  `;
  if (notificationsEnabled && step.code) {
    let notifMessage = "Nouvelle étape débloquée 💌";
    
    if (step.code === "FINI04") {
      notifMessage = "📸 C’est le bon moment pour prendre une photo. Tu comprendras plus tard…";
    }
  
    new Notification("💖 Étape suivante", {
      body: notifMessage,
      icon: "icon-192.png"
    });
  }
  
}

function showHint(hint) {
  const messageEl = document.getElementById("message");
  messageEl.innerHTML = `<div class='hint-box fade-in'>💡 ${hint}</div>`;
}

function checkCode() {
  const step = steps[currentStep];
  const inputEl = document.getElementById("codeInput");
  const input = inputEl ? inputEl.value.trim().toUpperCase() : null;
  const expected = step.code ? step.code.toUpperCase() : null;
  const container = document.getElementById("step-container");
  const messageEl = document.getElementById("message");

  if (!step.code || input === expected) {
    fetch("https://script.google.com/macros/s/AKfycbwGtB0aq7myxN8f0LaBwpWJCV2Ti80XJUWMXyqwupP9vVJ7gIrBpltsKhmwj67iFLNcDA/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: "ishtar-code-secret",
        step: currentStep + 1,
        code: step.code || "final",
        timestamp: new Date().toISOString()
      })
    });
    
    currentStep++;
    if (currentStep < steps.length) {
      container.classList.add('fade-out');
      setTimeout(() => {
        renderStep();
        container.classList.remove('fade-out');
      }, 500);
    } else {
      container.innerHTML = `<h2 class='success animated'>Tu es là... ❤️<br><em>(Je te regarde... et je vais maintenant te poser la vraie question.)</em></h2>`;
      confettiRain();
    }
  } else {
    messageEl.innerHTML = "<div class='hint-box fade-in error'>❌ Code incorrect. Réessaie avec ton cœur.</div>";
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
}

// Remplace la fonction window.onload existante
window.addEventListener('load', function() {
    // Vérifie si le code a déjà été entré précédemment
    const accessGranted = localStorage.getItem('gameAccessGranted');
    
    if (accessGranted === 'true') {
        // Si le code a déjà été validé, cache directement la popup
        document.getElementById('accessCodeOverlay').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('intro').style.display = 'block';
    } else {
        // Sinon, affiche la popup de code d'accès
        document.getElementById('accessCodeOverlay').style.display = 'flex';
        document.getElementById('mainContent').style.display = 'none';
    }

    // Gestion du loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
            if (accessGranted === 'true') {
                document.getElementById('intro').style.display = 'block';
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
}

// Ajoutez ces styles CSS en haut du fichier pour le nouveau format
const styleEl = document.createElement('style');
styleEl.textContent = `
  .step-text h3 {
    color: #ff4081;
    margin-bottom: 10px;
    font-size: 1.5em;
  }
  .step-text .timing {
    color: #666;
    font-style: italic;
    margin-bottom: 15px;
    padding: 5px 10px;
    background: #fff3f7;
    border-radius: 5px;
    display: inline-block;
  }
  .step-text .enigme {
    margin-top: 15px;
  }
  .step-text .enigme strong {
    color: #ff4081;
  }
`;
document.head.appendChild(styleEl);