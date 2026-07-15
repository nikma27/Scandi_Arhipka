document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const honeypot = document.getElementById('website');
    const status = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (honeypot && honeypot.value.trim() !== '') {
            status.textContent = 'Сообщение не отправлено.';
            status.className = 'mt-4 text-sm text-red-700';
            return;
        }

        const data = new FormData(form);
        const payload = Object.fromEntries(data.entries());

        status.textContent = 'Отправка…';
        status.className = 'mt-4 text-sm text-amber-700';
        submitButton.disabled = true;

        fetch(form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: new URLSearchParams(payload).toString()
        }).then(() => {
            form.reset();
            status.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
            status.className = 'mt-4 text-sm text-green-700';
        }).catch(() => {
            status.textContent = 'Не удалось отправить сообщение. Пожалуйста, свяжитесь с нами по телефону.';
            status.className = 'mt-4 text-sm text-red-700';
        }).finally(() => {
            submitButton.disabled = false;
        });
    });
});
