import { initialJSON } from './data.js'

const localStorageKey = "lessons";
const data = localStorage.getItem(localStorageKey);

if (!data) {
    localStorage.setItem(localStorageKey, initialJSON);
}

const lessons = JSON.parse(localStorage.getItem(localStorageKey));
const lessonsHtml = lessons
    .map((lesson) => getLessonHtml(lesson))
    .join('');

const containerEl = document.querySelector('.table-body');
containerEl.innerHTML = lessonsHtml;

containerEl.addEventListener('click', (event) => {
    const lessonEl = event.target.closest('.lesson');
    const lessonId = +lessonEl.dataset.id;
    const lesson = lessons.find((lesson) => lesson.id === lessonId);
    const signUpButton = lessonEl.querySelector('.sign-up');
    const cancelButton = lessonEl.querySelector('.cancel');

    if (event.target === signUpButton) {
        if (lesson.currentParticipants < lesson.maxParticipants) {
            lesson.currentParticipants++;
            lesson.isUserSignedUp = true;
            updateLessonHtml(lesson, lessonEl);
        }
    }

    if (event.target === cancelButton) {
        lesson.currentParticipants--;
        lesson.isUserSignedUp = false;
        updateLessonHtml(lesson, lessonEl);
    }
});

lessons.forEach((lesson) => {
    const lessonEl = document.querySelector(`.lesson[data-id="${lesson.id}"]`);
    const signUpButton = lessonEl.querySelector('.sign-up');
    const cancelButton = lessonEl.querySelector('.cancel');

    signUpButton.disabled = lesson.isUserSignedUp || lesson.currentParticipants >= lesson.maxParticipants;
    cancelButton.disabled = !lesson.isUserSignedUp;
});

function updateLessonHtml(lesson, lessonEl) {
    const maxParticipantsEl = lessonEl.querySelector('.max-participants');
    const currentParticipantsEl = lessonEl.querySelector('.current-participants');
    const signUpButton = lessonEl.querySelector('.sign-up');
    const cancelButton = lessonEl.querySelector('.cancel');

    maxParticipantsEl.textContent = lesson.maxParticipants;
    currentParticipantsEl.textContent = lesson.currentParticipants;
    signUpButton.disabled = lesson.isUserSignedUp || lesson.currentParticipants >= lesson.maxParticipants;
    cancelButton.disabled = !lesson.isUserSignedUp;
    saveToLocalStorage(lessons);
}

function saveToLocalStorage(lessons) {
    localStorage.setItem('lessons', JSON.stringify(lessons));
}

function getLessonHtml(lesson) {
    return `
        <tr class="lesson" data-id="${lesson.id}">
          <th>${lesson.name}</th>
          <th>${lesson.time}</th>
          <th class="max-participants">${lesson.maxParticipants}</th>
          <th class="current-participants">${lesson.currentParticipants}</th>
          <td><button class="sign-up">Записаться</button></td> 
          <td><button class="cancel" disabled>Отменить запись</button></td> 
        </tr>
     `;
}
