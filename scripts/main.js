document.addEventListener('DOMContentLoaded', () => {
    initBurger();
    initSearch();
    initPasswordToggles();
    initLoginForm();
    initRegisterForm();
});

/* бургер-меню */
function initBurger() {
    const burger = document.getElementById('burgerBtn');
    const sidebar = document.getElementById('sidebar');
    if (!burger || !sidebar) return;

    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
    });

    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('open');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth >= 1024) return;
        if (!sidebar.classList.contains('open')) return;
        if (!sidebar.contains(e.target) && e.target !== burger) {
            sidebar.classList.remove('open');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            sidebar.classList.remove('open');
        }
    });
}

/* поиск */
function initSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.album-card, .track');

        cards.forEach(card => {
            const title = (card.dataset.title || card.textContent).toLowerCase();
            card.style.display = title.includes(query) ? '' : 'none';
        });
    });
}

/* показать/скрыть пароль */
function initPasswordToggles() {
    document.querySelectorAll('.toggle-pass').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            if (!input) return;
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });
}

/* утилиты валидации */
function setError(input, message) {
    const span = document.querySelector(`.error[data-error="${input.id}"]`);
    if (span) span.textContent = message || '';
    input.classList.toggle('invalid', Boolean(message));
}

function clearErrors(form) {
    form.querySelectorAll('.error').forEach(el => (el.textContent = ''));
    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
}

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* Форма входа */
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const login = document.getElementById('loginEmail');
    const pass = document.getElementById('loginPassword');
    const password = document.getElementById('password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(form);
        let isValid = true;

        if (!login.value.trim()) {
            setError(login, 'Заполните поле');
            isValid = false;
        }

        if (!pass.value) {
            setError(pass, 'Заполните поле');
            isValid = false;
        } else if (pass.value.length < 8) {
            setError(pass, 'Пароль должен содержать не менее 8 символов');
            isValid = false;
        }

        if (isValid) {
            alert('Успешный вход!');
            form.reset();
            window.location.href = ' ';
        }
    });

    // Очистка ошибки при повторном вводе
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => setError(input, ''));
    });
}

/* Форма регистрации */
function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(form);
        let isValid = true;

        if (!fullName.value.trim()) {
            setError(fullName, 'Заполните ФИО');
            isValid = false;
        }

        if (!email.value.trim()) {
            setError(email, 'Заполните Email');
            isValid = false;
        } else if (!isEmail(email.value.trim())) {
            setError(email, 'Некорректный формат Email');
            isValid = false;
        }

        if (!login.value.trim()) {
            setError(login, 'Заполните логин');
            isValid = false;
        }

        if (!password.value) {
            setError(password, 'Заполните пароль');
            isValid = false;
        } else if (password.value.length < 8) {
            setError(password, 'Пароль должен содержать не менее 8 символов');
            isValid = false;
        }

        if (!confirm.value) {
            setError(confirm, 'Повторите пароль');
            isValid = false;
        } else if (confirm.value !== password.value) {
            setError(confirm, 'Пароли не совпадают');
            isValid = false;
        }

        if (isValid) {
            alert('Регистрация прошла успешно!');
            form.reset();
            window.location.href = ' ';
        }
    });

    // Снятие ошибок при вводе данных
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => setError(input, ''));
    });
}