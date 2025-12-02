document.addEventListener('DOMContentLoaded', () => {
    // Додаємо обробник кліку для кнопки незалежно від JSON
    const arrow = document.querySelector('.arrow');
    const content = document.querySelector('.experience-content');

    if (arrow && content) {
        arrow.addEventListener('click', () => {
            content.classList.toggle('visible');
            arrow.classList.toggle('rotated');
        });
    }

    // Додаємо обробник кліку для блоку PROFILE
    const profileArrow = document.querySelector('.profile-arrow');
    const profileContent = document.querySelector('.profile-content');

    if (profileArrow && profileContent) {
        profileArrow.addEventListener('click', () => {
            profileContent.classList.toggle('visible');
            profileArrow.classList.toggle('rotated');
        });
    }

    // Додаємо обробник кліку для блоку REFERENCE
    const referenceArrow = document.querySelector('.reference-arrow');
    const referenceContent = document.querySelector('.reference-content');

    if (referenceArrow && referenceContent) {
        referenceArrow.addEventListener('click', () => {
            referenceContent.classList.toggle('visible');
            referenceArrow.classList.toggle('rotated');
        });
    }

    // Завантаження JSON і робота з даними
    fetch('json/data.json')
        .then(response => response.json())
        .then(data => {
            const firstNameElement = document.getElementById('firstName');
            const lastNameElement = document.getElementById('lastName');

            if (firstNameElement) firstNameElement.textContent = data.firstName;
            if (lastNameElement) lastNameElement.textContent = data.lastName;

            renderLanguages(data.languages);
            renderSkills(data.skills);
        })
        .catch(err => console.error('Помилка завантаження JSON:', err));
});

function renderLanguages(languages) {
    const container = document.getElementById('languagesContainer');
    if (container) {
        container.innerHTML = `
        <div>
          <h2 class="text-3">LANGUAGE</h2>
          <br>
          <ul class="lang-list">
            ${languages.map(lang => `<li class="text-13">${lang}</li>`).join('')}
          </ul>
        </div>
      `;
    }
}

function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    if (container) {
        container.innerHTML = `
        <div>
          <h2 class="text-3">SKILLS</h2>
          <br>
          <ul class="lang-list">
            ${skills.map(skill => `<li class="text-13">${skill}</li>`).join('')}
          </ul>
        </div>
      `;
    }
}