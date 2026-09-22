document.addEventListener('DOMContentLoaded', () => {
    initBurger();
    initSearch();
    initLikeButtons();
    initRemoveButtons();
    initPlayer();
    initPlayButtons();
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

    // клик по ссылке в sidebar — закрываем на мобильных
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('open');
            }
        });
    });

    // клик вне sidebar — закрываем
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

/* лайк */
function initLikeButtons() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            btn.textContent = btn.classList.contains('active') ? '❤' : '❤';
        });
    });
}

/* удаление трека */
function initRemoveButtons() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const track = btn.closest('.track');
            if (track) {
                track.style.transition = 'opacity .3s, transform .3s';
                track.style.opacity = '0';
                track.style.transform = 'translateX(-20px)';
                setTimeout(() => track.remove(), 300);
            }
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

/* утилиты */
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

/* форма входа */
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(form);
        let ok = true;

        const login = form.loginEmail;
        const pass = form.loginPassword;

        if (!login.value.trim()) {
            setError(login, 'Введите email или логин');
            ok = false;
        }

        if (!pass.value) {
            setError(pass, 'Введите пароль');
            ok = false;
        } else if (pass.value.length < 8) {
            setError(pass, 'Пароль должен содержать не менее 8 символов');
            ok = false;
        }

        if (ok) {
            alert('Вход выполнен успешно!');
            form.reset();
        }
    });

    // сброс ошибки при вводе
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => setError(input, ''));
    });
}

/* форма регистрации */
function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors(form);
        let ok = true;

        const fullName = form.fullName;
        const email = form.email;
        const login = form.login;
        const password = form.password;
        const confirm = form.confirmPassword;

        if (!fullName.value.trim()) {
            setError(fullName, 'Введите ФИО');
            ok = false;
        }

        if (!email.value.trim()) {
            setError(email, 'Введите email');
            ok = false;
        } else if (!isEmail(email.value.trim())) {
            setError(email, 'Некорректный email');
            ok = false;
        }

        if (!login.value.trim()) {
            setError(login, 'Введите логин');
            ok = false;
        }

        if (!password.value) {
            setError(password, 'Введите пароль');
            ok = false;
        } else if (password.value.length < 8) {
            setError(password, 'Пароль должен содержать не менее 8 символов');
            ok = false;
        }

        if (!confirm.value) {
            setError(confirm, 'Повторите пароль');
            ok = false;
        } else if (confirm.value !== password.value) {
            setError(confirm, 'Пароли не совпадают');
            ok = false;
        }

        if (ok) {
            alert('Регистрация прошла успешно!');
            form.reset();
        }
    });

    // сброс ошибки при вводе
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => setError(input, ''));
    });
}