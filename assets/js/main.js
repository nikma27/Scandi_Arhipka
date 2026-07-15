document.addEventListener('DOMContentLoaded', () => {
    const imageModal = document.getElementById('imageModal');
    const imageClose = document.getElementById('closeModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');

    let currentImages = [];
    let currentImageIndex = 0;
    const galleryImages = document.querySelectorAll('.card img');

    const applyImageFallback = (img) => {
        if (!img) return;
        img.addEventListener('error', () => {
            if (img.getAttribute('src') !== './assets/images/placeholder.svg') {
                img.src = './assets/images/placeholder.svg';
            }
        });
    };

    galleryImages.forEach(applyImageFallback);

    const infoModal = document.getElementById('infoModal');
    const infoClose = document.getElementById('infoClose');
    const infoTitle = document.getElementById('infoTitle');
    const infoContent = document.getElementById('infoContent');
    const photoGrid = document.getElementById('photoGrid');

    imageClose.type = 'button';
    infoClose.type = 'button';

    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const card = img.closest('.card');
            if (card) {
                const key = card.dataset.card;
                openInfoModal(key);
            }
        });
    });

    photoGrid.addEventListener('click', (e) => {
        const frame = e.target.closest('.photo-frame');
        if (frame && frame.querySelector('img')) {
            const img = frame.querySelector('img');
            const cardKey = infoTitle.dataset.cardKey;
            const data = CARD_DATA[cardKey];
            if (data && data.photos) {
                currentImages = data.photos;
                currentImageIndex = currentImages.indexOf(img.src);
                lightboxImg.src = img.src;
                imageModal.classList.remove('hidden');
                imageModal.classList.add('flex');
                setTimeout(() => imageModal.classList.remove('opacity-0'), 10);
                updateLightboxNavigation();
            }
        }
    });

    const updateLightboxNavigation = () => {
        prevImageBtn.classList.toggle('hidden', currentImageIndex === 0);
        nextImageBtn.classList.toggle('hidden', currentImageIndex === currentImages.length - 1);
    };

    const navigateLightbox = (direction) => {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = currentImages.length - 1;
        } else if (currentImageIndex >= currentImages.length) {
            currentImageIndex = 0;
        }
        lightboxImg.src = currentImages[currentImageIndex];
        updateLightboxNavigation();
    };

    prevImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });

    nextImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoveX = 0;
    const TOUCH_THRESHOLD = 50;

    const onTouchStart = (e) => {
        if (!e.touches || e.touches.length === 0) return;
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchMoveX = 0;
    };

    const onTouchMove = (e) => {
        if (!e.touches || e.touches.length === 0) return;
        const t = e.touches[0];
        touchMoveX = t.clientX - touchStartX;
        const dy = Math.abs(t.clientY - touchStartY);
        if (Math.abs(touchMoveX) > Math.abs(dy)) {
            e.preventDefault();
        }
    };

    const onTouchEnd = () => {
        if (Math.abs(touchMoveX) > TOUCH_THRESHOLD) {
            if (touchMoveX < 0) {
                navigateLightbox(1);
            } else {
                navigateLightbox(-1);
            }
        }
        touchStartX = touchStartY = touchMoveX = 0;
    };

    imageModal.addEventListener('touchstart', onTouchStart, { passive: false });
    imageModal.addEventListener('touchmove', onTouchMove, { passive: false });
    imageModal.addEventListener('touchend', onTouchEnd);
    lightboxImg.addEventListener('touchstart', onTouchStart, { passive: false });
    lightboxImg.addEventListener('touchmove', onTouchMove, { passive: false });
    lightboxImg.addEventListener('touchend', onTouchEnd);

    const closeImageModal = (event) => {
        if (event) event.stopPropagation();
        imageModal.classList.add('opacity-0');
        setTimeout(() => {
            imageModal.classList.add('hidden');
            imageModal.classList.remove('flex');
            currentImages = [];
            currentImageIndex = 0;
            updateLightboxNavigation();
        }, 300);
    };

    imageClose.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', (e) => { if (e.target === imageModal) closeImageModal(); });

    const cardLinks = document.querySelectorAll('.card');

    const CARD_DATA = {
        card1: {
            title: 'Номера для четверых +1 гостей',
            html: `
                <h4 class="font-serif text-xl mb-2">Уютный семейный номер</h4>
                <p class="mb-3">Светлое и элегантное пространство, созданное для комфортного отдыха семьи или компании до пяти человек. Мы бережно продумали каждую деталь, чтобы вы могли насладиться атмосферой спокойствия и уюта.</p>
                <h5 class="font-semibold mb-2">К вашим услугам:</h5>
                <ul class="list-disc ml-5 mb-3">
                    <li>Двуспальная кровать, двухъярусная кровать и дополнительное спальное место.</li>
                    <li>Мини-кухня с холодильником и уютной обеденной зоной.</li>
                    <li>Современный кондиционер для идеального микроклимата и Smart-TV.</li>
                    <li>Индивидуальная ванная комната с душевой кабиной.</li>
                </ul>
            `,
            photos: [
                './assets/images/P1370476.jpg',
                './assets/images/P1370477.jpg',
                './assets/images/P1370484.jpg',
                './assets/images/P1370578.jpg',
                './assets/images/P1370582.jpg',
                './assets/images/P1370589.jpg'
            ]
        },
        card2: {
            title: 'Трехместные номера',
            html: `
                <h4 class="font-serif text-xl mb-2">Уютный трехместный номер</h4>
                <p class="mb-3">Светлое и элегантное пространство, созданное для комфортного отдыха семьи или небольшой компании до трех человек. Мы бережно продумали каждую деталь, чтобы вы могли насладиться атмосферой спокойствия и уюта.</p>
                <h5 class="font-semibold mb-2">К вашим услугам:</h5>
                <ul class="list-disc ml-5 mb-3">
                    <li>Двуспальная кровать и комфортное раскладное кресло-кровать.</li>
                    <li>Холодильник для хранения ваших продуктов и напитков.</li>
                    <li>Современный кондиционер для идеального микроклимата и Smart-TV.</li>
                    <li>Индивидуальная ванная комната с душевой кабиной.</li>
                </ul>
            `,
            photos: [
                './assets/images/P1370497.jpg',
                './assets/images/P1370499.jpg',
                './assets/images/P1370502.jpg',
                './assets/images/P1370507.jpg',
                './assets/images/P1370565.jpg',
                './assets/images/P1370572.jpg'
            ]
        },
        card3: {
            title: 'Номера для двоих гостей',
            html: `
                <h4 class="font-serif text-xl mb-2">Уютный двухместный номер</h4>
                <p class="mb-3">Светлое и элегантное пространство, созданное для комфортного отдыха пары или двух гостей. Мы бережно продумали каждую деталь, чтобы вы могли насладиться атмосферой спокойствия и уюта.</p>
                <h5 class="font-semibold mb-2">К вашим услугам:</h5>
                <ul class="list-disc ml-5 mb-3">
                    <li>Удобная двуспальная кровать.</li>
                    <li>Холодильник для хранения ваших продуктов и напитков.</li>
                    <li>Современный кондиционер для идеального микроклимата и Smart-TV.</li>
                    <li>Индивидуальная ванная комната с душевой кабиной.</li>
                </ul>
            `,
            photos: [
                './assets/images/P1370519.jpg',
                './assets/images/P1370521.jpg',
                './assets/images/P1370534.jpg',
                './assets/images/P1370539.jpg',
                './assets/images/P1370554.jpg',
                './assets/images/P1370555.jpg'
            ]
        },
        card4: {
            title: 'Все удобства нашего гостевого дома',
            html: '<p class="mb-3">Перечень основных удобств, доступных всем гостям.</p>',
            photos: [
                './assets/images/Gemini_Generated_Image_9cj59z9cj59z9cj5.png',
                './assets/images/P1370451.jpg',
                './assets/images/photo_2026-05-24_20-58-38.jpg',
                './assets/images/photo_2026-05-24_20-58-57.jpg',
                './assets/images/photo_2026-06-01_00-57-13.jpg',
                './assets/images/photo_2026-06-01_01-14-31.jpg'
            ]
        },
        card5: {
            title: 'Правила размещения',
            html: `
                <p class="mb-3">Добро пожаловать в наш гостевой дом! Мы очень рады каждому гостю и делаем все, чтобы ваш отдых был комфортным и спокойным. Просим вас придерживаться нескольких простых правил, которые помогут сохранить уютную атмосферу для всех.</p>
                <ul class="list-disc ml-5 mb-3 space-y-2">
                    <li>Заезд возможен <strong>с 14:00</strong>, выезд — <strong>до 12:00</strong>.</li>
                    <li>Если вам нужен ранний заезд или поздний выезд, пожалуйста, заранее свяжитесь с нами — мы обязательно постараемся подобрать удобный вариант.</li>
                    <li>Парковка на территории доступна для гостей и составляет <strong>200 рублей в сутки</strong>.</li>
                    <li>В номерах нельзя курить, но на территории есть специально отведенное место для курения.</li>
                    <li>Просим соблюдать тишину в номерах и на территории с <strong>22:00 до 08:00</strong>, чтобы каждый гость мог хорошо отдохнуть.</li>
                    <li>Мы любим животных, но, к сожалению, размещение с домашними питомцами у нас не предусмотрено. Благодарим за понимание.</li>
                    <li>Мы всегда рады маленьким гостям, однако просим родителей внимательно следить за детьми на территории гостевого дома.</li>
                    <li>Проживание с детьми до 2 лет обсуждается индивидуально.</li>
                </ul>
            `,
            photos: []
        }
    };

    const openInfoModal = (cardKey) => {
        const data = CARD_DATA[cardKey];
        if (!data) return;
        infoTitle.textContent = data.title;
        infoTitle.dataset.cardKey = cardKey;
        infoContent.innerHTML = data.html;

        photoGrid.innerHTML = '';
        if (data.photos && data.photos.length > 0) {
            data.photos.forEach((src, index) => {
                const div = document.createElement('div');
                div.className = 'photo-frame w-full aspect-[4/3] cursor-pointer overflow-hidden';
                div.innerHTML = `<img src="${src}" class="w-full h-full object-cover" alt="Фото номера" loading="lazy" decoding="async">`;
                applyImageFallback(div.querySelector('img'));
                div.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentImages = data.photos;
                    currentImageIndex = index;
                    lightboxImg.src = src;
                    imageModal.classList.remove('hidden');
                    imageModal.classList.add('flex');
                    setTimeout(() => imageModal.classList.remove('opacity-0'), 10);
                    updateLightboxNavigation();
                });
                photoGrid.appendChild(div);
            });
        }

        infoModal.classList.remove('hidden');
        infoModal.classList.add('flex');
        setTimeout(() => infoModal.classList.remove('opacity-0'), 10);
    };

    cardLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const key = link.dataset.card;
            openInfoModal(key);
        });
    });

    const closeInfo = (event) => {
        if (event) event.stopPropagation();
        infoModal.classList.add('opacity-0');
        setTimeout(() => { infoModal.classList.add('hidden'); infoModal.classList.remove('flex'); }, 300);
    };

    infoClose.addEventListener('click', closeInfo);
    infoModal.addEventListener('click', (e) => { if (e.target === infoModal) closeInfo(); });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!imageModal.classList.contains('hidden')) closeImageModal();
            if (!infoModal.classList.contains('hidden')) closeInfo();
        }
        if (!imageModal.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });
});
