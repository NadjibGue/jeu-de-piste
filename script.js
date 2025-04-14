const steps = [
  {
    text: "Bienvenue dans ton aventure magique 🌟. Aujourd’hui, tout commence ici. Tu connais ce lieu : tout est rose, girly, tu passes souvent devant sans y prêter attention. Cette fois, fais le premier pas. Une fois là-bas, dis : « Bonjour, j’aime la vanille ». Et laisse la magie opérer... À la fin, tu recevras un code. 💅",
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

let currentStep = 0;

function startGame() {
  document.getElementById("intro").style.display = "none";
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
    fetch("https://script.google.com/macros/s/AKfycbypBSxbZG3eJNc5OMVH8KaToegw4088a5ieoM_eubXSVUJsKZrJQhDg7NivibWGuCAYPQ/exec", {
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

window.onload = () => {};