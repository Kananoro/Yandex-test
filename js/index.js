const members = [
  {
    name: 'Хозе-Рауль Капабланка',
    role: 'Чемпион мира по шахматам',
    avatar: './img/Content/avatar.png',
    href: '#',
  },
  {
    name: 'Эммануил Ласкер',
    role: 'Чемпион мира по шахматам',
    avatar: './img/Content/avatar.png',
    href: '#',
  },
  {
    name: 'Александр Алехин',
    role: 'Чемпион мира по шахматам',
    avatar: './img/Content/avatar.png',
    href: '#',
  },
  {
    name: 'Арон Нимцович',
    role: 'Чемпион мира по шахматам',
    avatar: './img/Content/avatar.png',
    href: '#',
  },
  {
    name: 'Рихард Рети',
    role: 'Чемпион мира по шахматам',
    avatar: './img/Content/avatar.png',
    href: '#',
  },
  {
    name: 'Остап Бендер',
    role: 'Чемпион мира по шахматам',
    avatar: './img/Content/avatar.png',
    href: '#',
  },
];

const screenWidth = screen.width;

const membersList = document.querySelector('.members__list');

function createMember(name, role, avatar, href, count) {
  const person = document.createElement('div');
  person.classList.add('person');
  person.classList.add(`person--${count}`);

  const img = document.createElement('img');
  img.className = 'person__avatar';
  img.src = avatar;
  img.alt = 'avatar';

  const description = document.createElement('div');
  description.className = 'person__description';

  const descriptionName = document.createElement('div');
  descriptionName.className = 'person__name';
  descriptionName.textContent = name;

  const descriptionRole = document.createElement('div');
  descriptionRole.className = 'person__role';
  descriptionRole.textContent = role;

  description.appendChild(descriptionName);
  description.appendChild(descriptionRole);

  const link = document.createElement('a');
  link.className = 'person__link';
  link.href = href;
  link.target = '_blank';
  link.textContent = 'Подробнее';

  person.appendChild(img);
  person.appendChild(description);
  person.appendChild(link);

  membersList.appendChild(person);
}
let memberCounter = 1;
members.map((member) => {
  createMember(
    member.name,
    member.role,
    member.avatar,
    member.href,
    memberCounter
  );
  memberCounter++;
});

const nextPersonButton = document.querySelector('#person-next');
const backPersonButton = document.querySelector('#person-back');
const currentPage = document.querySelector('#current');
const totalPage = document.querySelector('#total');
let currentNumber = 1;
let personPerPage = 3;
let membersListSteps = 0;
let gap = 20;
if (screenWidth <= 1148) {
  personPerPage = 2;
}
if (screenWidth <= 768) {
  personPerPage = 1;
}
totalPage.textContent = members.length;
currentPage.textContent = personPerPage;

setInterval(() => {
  const allMembers = document.querySelectorAll('.person');
  if (membersListSteps + personPerPage >= allMembers.length) {
    membersListSteps = 0;
    movePersonList();
  } else {
    membersListSteps++;
    movePersonList();
  }
}, 4000);

function movePersonList() {
  const allMembers = document.querySelectorAll('.person');
  const person = document.querySelector('.person');
  const width = person.clientWidth + gap;
  currentPage.textContent = membersListSteps + personPerPage;
  membersList.style.transform =
    'translateX(-' + width * membersListSteps + 'px)';
  if (membersListSteps == 0) {
    backPersonButton.setAttribute('disabled', true);
  } else {
    backPersonButton.removeAttribute('disabled', false);
  }
  if (membersListSteps + personPerPage >= allMembers.length) {
    nextPersonButton.setAttribute('disabled', true);
  } else {
    nextPersonButton.removeAttribute('disabled', false);
  }
}
movePersonList();

nextPersonButton.addEventListener('click', () => {
  membersListSteps++;
  movePersonList();
});
backPersonButton.addEventListener('click', () => {
  membersListSteps--;
  movePersonList();
});

//! grid for mobiles

const pages = [
  [
    document.getElementById('griditem-1'),
    document.getElementById('griditem-2'),
  ],
  [document.getElementById('griditem-3')],
  [
    document.getElementById('griditem-4'),
    document.getElementById('griditem-5'),
  ],
  [document.getElementById('griditem-6')],
  [document.getElementById('griditem-7')],
];
const gridStep = document.querySelector('.gridstep');
const paginationDots = document.querySelector('.pagination__dots');
const nextStepButton = document.getElementById('step-next');
const backStepButton = document.getElementById('step-back');

let pageCounter = 1;
let pageActive = 1;

function setDots() {
  pages.forEach((page) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.classList.add(`dot__${pageCounter}`);
    pageCounter++;
    paginationDots.appendChild(dot);
  });
  pageCounter = 1;
}

function showPages() {
  pages.forEach((page) => {
    const pageParent = document.createElement('div');

    pageParent.classList.add(`gridstep__page`);
    pageParent.classList.add(`gridstep__page--${pageCounter}`);
    pageCounter++;
    gridStep.appendChild(pageParent);
    page.forEach((item) => {
      pageParent.appendChild(item);
    });
  });
  pageCounter = 1;
}

function setActivePage() {
  const activePage = document.querySelector(`.gridstep__page--${pageActive}`);
  const activeDot = document.querySelector(`.dot__${pageActive}`);
  activePage.classList.remove('gridstep__page--prev');
  activePage.classList.remove('gridstep__page--next');
  activeDot.classList.add('dot--active');
  activePage.classList.add('gridstep__page--active');
  checkPagePosition();
}

function checkPagePosition() {
  let counter = 1;
  pages.forEach((page) => {
    const currentDot = document.querySelector(`.dot__${counter}`);
    const currentPage = document.querySelector(`.gridstep__page--${counter}`);
    if (counter != pageActive) {
      resetPositionPageClasses(currentPage, true);
      resetPositionDotClasses(currentDot);
    } else {
      resetPositionPageClasses(currentPage);
    }
    if (counter < pageActive) currentPage.classList.add('gridstep__page--prev');
    if (counter > pageActive) currentPage.classList.add('gridstep__page--next');
    counter++;
  });
  if (pageActive >= pages.length) {
    nextStepButton.setAttribute('disabled', true);
  } else {
    nextStepButton.removeAttribute('disabled', true);
  }
  if (pageActive <= 1) {
    backStepButton.setAttribute('disabled', true);
  } else {
    backStepButton.removeAttribute('disabled', true);
  }
}

function resetPositionPageClasses(page, active = false) {
  if (!active) {
    page.classList.remove('gridstep__page--active');
  }
  page.classList.remove('gridstep__page--prev');
  page.classList.remove('gridstep__page--next');
}

function resetPositionDotClasses(dot, active = false) {
  if (!active) {
    dot.classList.remove('dot--active');
  }
}

nextStepButton.addEventListener('click', () => {
  pageActive++;
  setActivePage();
});

backStepButton.addEventListener('click', () => {
  pageActive--;
  setActivePage();
});

if (screenWidth <= 1024) {
  showPages();
  setDots();
  setActivePage();
}
