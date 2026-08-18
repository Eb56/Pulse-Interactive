const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
const navLinks = [...document.querySelectorAll('.desktop-nav a')];

const closeMenu = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('nav-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('nav-open', !isOpen);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    if (!overlay?.hidden) closeCharacter();
  }
});

document.addEventListener('click', (event) => {
  if (nav?.classList.contains('nav-open') && !nav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

const progress = document.querySelector('.progress-bar span');
const progressBar = document.querySelector('.progress-bar');
if (progress && progressBar && 'IntersectionObserver' in window) {
  progress.style.width = '0%';
  const progressObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    requestAnimationFrame(() => { progress.style.width = '2%'; });
    progressObserver.disconnect();
  }, { threshold: 0.5 });
  progressObserver.observe(progressBar);
}

const characters = {
  techy: {
    name: 'Techy', number: '01 / 07', role: 'Engineering specialist', fileRole: 'Engineer', specialization: 'Technical operations',
    description: [
      "Nobody really knows what Techy is working on half the time. That's probably intentional.",
      "Where others see broken machinery, he sees an unfinished solution. He has an answer for almost every mechanical problem, usually involving something that probably shouldn't be plugged into something else.",
      'Techy keeps his team equipped, his equipment running, and his enemies guessing.'
    ],
    traits: ["He's the engineer.", "He's extremely technically skilled.", "He builds/maintains equipment.", "He's clever and unconventional.", "His abilities revolve around machinery and technology."],
    note: '“Do not allow him near the reactor.”'
  },
  bones: {
    name: 'Bones', number: '02 / 07', role: 'Field medic', fileRole: 'Medic', specialization: 'Field medicine',
    description: [
      'Bones has spent enough time around death to become disturbingly comfortable with it.',
      'He knows how the human body works, how it breaks, and — more importantly — how to keep it moving when it probably shouldn’t be.',
      "To Bones, keeping someone alive isn't a miracle. It's a matter of knowing where to start."
    ],
    traits: ["He's the medic.", "He specializes in keeping teammates alive.", "He's medically knowledgeable.", "He's probably seen some horrific injuries.", "He's calm around things that would horrify most people."],
    note: '“Despite his methods, Bones has saved more lives than anyone can reasonably count.”'
  },
  infiltrator: {
    name: 'Infiltrator', number: '03 / 07', role: 'Reconnaissance specialist', fileRole: 'Scout', specialization: 'Reconnaissance',
    description: [
      "Infiltrator doesn't stay in one place long enough for anyone to keep track of him.",
      'He goes where others can’t, sees what others miss, and is usually gone before anyone realizes he was there.',
      'Information is his weapon. Speed is what keeps him alive.'
    ],
    traits: ["He's the scout.", "He's extremely mobile.", "He's used for reconnaissance.", "He specializes in getting into places and getting back out.", "He's difficult to pin down."],
    note: '“Subject was not present during the interview.”'
  },
  crocket: {
    name: 'Crocket', number: '04 / 07', role: 'Combat specialist', fileRole: 'Soldier', specialization: 'Combat operations',
    description: [
      "Crocket doesn't have much patience for complicated plans.",
      "Point him toward the problem, give him something loud, and he'll usually take care of the rest.",
      "He's been through enough firefights to know that hesitation gets people killed. When the shooting starts, Crocket is already moving."
    ],
    traits: ["He's the straightforward combat class.", "He's experienced in firefights.", "He's aggressive and dependable.", "He's the person you want in the middle of a fight."],
    note: '“Has once again ignored the evacuation order.”'
  },
  ravenger: {
    name: 'Ravenger', number: '05 / 07', role: 'Heavy combat specialist', fileRole: 'Heavy', specialization: 'Heavy combat',
    description: [
      'Ravenger was never built for subtlety.',
      'When he enters a fight, things tend to get louder, slower, and considerably more dangerous.',
      'He carries enough firepower to make an entire squad reconsider its position, and enough armor to keep walking when most people would have stopped.'
    ],
    traits: ["He's the Heavy.", "Heavily armed.", "Heavily protected.", "Powerful, intimidating, and difficult to stop."],
    note: '“Do not ask him to carry anything heavier. He will.”'
  },
  umbra: {
    name: 'Umbra', number: '06 / 07', role: 'Covert operative', fileRole: 'Spy', specialization: 'Covert operations', variant: 'umbra',
    description: [
      "There are people who swear they've seen Umbra.",
      "There are others who insist they haven't.",
      'Records concerning him are incomplete, identities are inconsistent, and surveillance footage has a habit of losing something important whenever he’s nearby.',
      "Umbra doesn't need to overpower an enemy.",
      'He only needs them to look the wrong way.'
    ],
    traits: ["He's the spy.", "He specializes in deception and covert operations.", "He is difficult to verify, track, or contain."],
    knownTraits: 'Surveillance records surrounding this subject frequently contain unexplained gaps.\n\nTechnology capable of bending light around his body has been observed. Exactly how it works remains classified.',
    note: '“FILE CORRUPTED.”'
  },
  breaker: {
    name: 'Breaker', number: '07 / 07', role: 'Long-range specialist', fileRole: 'Sniper', specialization: 'Long-range combat',
    description: [
      'Breaker prefers distance.',
      "Not because he's afraid of getting close. Quite the opposite.",
      'At range, the battlefield becomes simple. Movement becomes predictable. Every sound has a direction, every silhouette has a purpose, and every mistake has consequences.',
      "By the time you realize Breaker is there, he's usually already made his decision."
    ],
    traits: ["He's the sniper.", "He prefers long-range engagements.", "He's patient and observant.", "He's extremely precise.", "Getting caught in his sights is bad news."],
    note: '“Subject requested that this information remain classified.”'
  }
};

const overlay = document.querySelector('#character-overlay');
const characterCards = [...document.querySelectorAll('[data-character]')];
const characterName = document.querySelector('#character-name');
const characterNumber = document.querySelector('#character-number');
const characterRole = document.querySelector('#character-role');
const characterDescription = document.querySelector('#character-description');
const characterTraits = document.querySelector('#character-traits');
const characterKnownTraits = document.querySelector('#character-known-traits');
const knownTraitsCopy = document.querySelector('#known-traits-copy');
const fileDesignation = document.querySelector('#file-designation');
const fileRole = document.querySelector('#file-role');
const fileSpecialization = document.querySelector('#file-specialization');
const fileNote = document.querySelector('#file-note');
let lastFocusedElement = null;

const getCharacterFromHash = () => window.location.hash.replace('#character-', '');

const renderCharacter = (key) => {
  const character = characters[key];
  if (!character || !overlay) return false;

  characterName.textContent = character.name;
  characterNumber.textContent = character.number;
  characterRole.textContent = character.role;
  characterDescription.replaceChildren(...character.description.map((paragraph) => {
    const element = document.createElement('p');
    element.textContent = paragraph;
    return element;
  }));
  characterTraits.replaceChildren(...character.traits.map((trait) => {
    const element = document.createElement('li');
    element.textContent = trait;
    return element;
  }));
  fileDesignation.textContent = character.name.toUpperCase();
  fileRole.textContent = character.fileRole.toUpperCase();
  fileSpecialization.textContent = character.specialization;
  fileNote.textContent = character.note;
  overlay.dataset.variant = character.variant || key;

  if (character.knownTraits) {
    characterKnownTraits.hidden = false;
    knownTraitsCopy.textContent = character.knownTraits;
  } else {
    characterKnownTraits.hidden = true;
    knownTraitsCopy.textContent = '';
  }

  document.title = `${character.name} — Pulse Interactive`;
  return true;
};

const openCharacter = (key, updateHash = true) => {
  if (!renderCharacter(key)) return;
  lastFocusedElement = document.activeElement;
  overlay.hidden = false;
  document.body.classList.add('profile-open');
  if (updateHash) history.pushState({ character: key }, '', `#character-${key}`);
  overlay.querySelector('.character-close')?.focus();
};

const closeCharacter = (updateHash = true) => {
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  document.body.classList.remove('profile-open');
  delete overlay.dataset.variant;
  if (updateHash) history.pushState({}, '', '#team');
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
};

characterCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    openCharacter(card.dataset.character);
  });
});

overlay?.querySelectorAll('[data-character-close]').forEach((element) => {
  element.addEventListener('click', () => closeCharacter());
});

const syncCharacterToHash = () => {
  const key = getCharacterFromHash();
  if (characters[key]) openCharacter(key, false);
  else closeCharacter(false);
};

window.addEventListener('hashchange', syncCharacterToHash);
window.addEventListener('popstate', syncCharacterToHash);
if (characters[getCharacterFromHash()]) openCharacter(getCharacterFromHash(), false);
