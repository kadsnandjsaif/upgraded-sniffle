'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const tabcontent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');
    const tabheader = document.querySelectorAll('.tabheader__item');

    function show(i = 0) {
        tabcontent[i].classList.add('show');
        tabcontent[i].classList.remove('hide');


        tabheader[i].classList.add('tabheader__item_active');

    }

    function hide() {
        tabcontent.forEach(i => {
            i.classList.add('hide');
            i.classList.remove('show');

            tabheader.forEach(i => {
                i.classList.remove('tabheader__item_active');
            });
        });
    }



    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('tabheader__item')) {
            tabheader.forEach((item, number) => {
                if (item == target) {
                    hide();
                    show(number);

                } else {
                    console.log('eror');
                }
            });
        } else {
            console.log('eror');
        }
    });

    hide();
    show();

    const deadLine = '2022-09-09';




    function getDecrTime(endTime) {
        const t = Date.parse(endTime) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000) % 60;
        if (t <= 0) {
            return {
                'days': 0,
                'hours': 0,
                'minutes': 0,
                'seconds': 0
            };
        } else {
            return {
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

    }

    function showTime(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            int = setInterval(setTimeOnTabs, 1000);
        setTimeOnTabs();

        function setTimeOnTabs() {
            const t = getDecrTime(endTime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
        }

    }

    showTime('.timer', deadLine);


    const modal = document.querySelectorAll('[data-modal]');
    const modalClose = document.querySelector('[data-close]');
    const mp = document.querySelector('.modal');

    function showd() {
        mp.classList.add('show');
        mp.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(t);
    }

    modal.forEach(item => {
        item.addEventListener('click', showd);
    });
    modalClose.addEventListener('click', () => {
        mp.classList.add('hide');
        mp.classList.remove('show');
        document.body.style.overflow = '';
    });

    mp.addEventListener('click', (e) => {
        if (e.target === mp) {
            mp.classList.add('hide');
            mp.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape') {
            mp.classList.add('hide');
            mp.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    const t = setTimeout(showd, 10000);

    function scroll() {
        if (Math.floor(window.pageYOffset + document.documentElement.clientHeight + 1) >= document.documentElement.scrollHeight) {
            showd();
            removeEventListener('scroll', scroll);
        }
    }

    window.addEventListener('scroll', scroll);

    const menuItem = document.querySelectorAll('.menu__item');

    menuItem.forEach((item, number) => {
        item.remove();

    });
    class Card {
        constructor(src, alt, subtitle, decr, price, selector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.decr = decr;
            this.price = price;
            this.selectorP = document.querySelector(selector);
            this.classes = classes;
        }

        adding() {
            const elem = document.createElement('div');
            if(this.classes.length === 0){
                this.classes.push('menu__item');
            }
            this.classes.forEach(i => elem.classList.add(i));
            elem.innerHTML += `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">"${this.subtitle}"</h3>
            <div class="menu__item-descr">${this.decr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`
    ;

            this.selectorP.append(elem);
        }
    }


    new Card('img/tabs/vegy.jpg',
        'vegu',
        'Фитнес',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.' +
        'Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        123,
        '.menu .container').adding();
    new Card('img/tabs/vegy.jpg',
        'vegu',
        'Для веганов',
        'Если ты не любишь мясо, то  ты должен жить только на овощах.',
        123,
        '.menu .container','menu__item').adding();
});
