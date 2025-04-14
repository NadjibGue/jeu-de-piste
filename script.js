const steps = [
  {
    text: "Chaque histoire commence avec des mains prêtes à créer des souvenirs. Aujourd’hui, on prend soin de toi. Laisse-toi guider.",
    code: "MAINS01"
  },
  {
    text: "Tu mérites une pause. Un lieu familier t’attend, là où tant de discussions ont construit 'nous'. Va boire un café. Mais reste sage : ne fouille pas ce que l’on t’offre.",
    code: "CAFÉ02"
  },
  {
    text: "Les bons pas te mèneront à moi. Retourne à l’endroit où un petit être inattendu a croisé ton chemin.",
    code: "LAPINSECRET"
  },
  {
    text: "La personne avec toi connaît la suite. Dis-lui simplement : ‘La vie est belle’.",
    code: "BELLE04"
  },
  {
    text: "Une voiture noire t’attend. Plaque : DF-234-JT. Ne pose pas de questions. Monte.",
    code: "TRAJET05"
  },
  {
    text: "Presque arrivée. Donne ton nom au réceptionniste : Vanille. Ne pose pas de questions. Sois maligne, suis ton instinct.",
    code: "HOTEL06"
  },
  {
    text: "Voici le dernier indice. Le code que tu cherches est sous tes yeux. C’est la porte vers moi. Sois maligne. Trouve le bon numéro.",
    code: "415"
  }
];

let currentStep = 0;

function renderStep() {
  const container = document.getElementById("step-container");
  const step = steps[currentStep];
  container.innerHTML = `
    <p>${step.text}</p>
    <input type="text" id="codeInput" placeholder="Entre le code ici" />
    <button onclick="checkCode()">Valider</button>
    <div class="message" id="message"></div>
  `;
}

function checkCode() {
  const input = document.getElementById("codeInput").value.trim().toUpperCase();
  const expected = steps[currentStep].code.toUpperCase();
  const messageEl = document.getElementById("message");

  if (input === expected) {
    currentStep++;
    if (currentStep < steps.length) {
      renderStep();
    } else {
      document.getElementById("step-container").innerHTML = "<h2 class='success'>Tu m’as trouvé. Entre. J’ai une question à te poser.</h2>";
    }
  } else {
    messageEl.textContent = "Code incorrect. Réessaie.";
  }
}

window.onload = renderStep;
