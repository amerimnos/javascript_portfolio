const gnbItem = document.querySelectorAll(".nav__gnb-title");
const gnbSubitem = document.querySelectorAll(".nav__gnb-depth2-item > a");
const totalMenuBtn = document.querySelector(".nav__total-menu");
const totalMenuContents = document.querySelector(".total-menu");
const nav__contactUs = document.querySelector(".nav__contactUs");
const contactForm = document.querySelector(".contactForm");
const bm = document.querySelector("#bm");


//애니메이션 기본 셋팅 jquery처럼 간편하게 쓸 수 있게 (value 값은 숫자 형태만 가능)
class Anime {
    constructor(selector, option) {
        this.selector = selector;
        this.option = option;
        this.startTime = performance.now();
        (option.duration == undefined) ? this.speed = 500 : this.speed = option.duration;
        this.currentValue;
        this.timer;

        if (this.option.prop === "scroll") {
            this.currentValue = parseInt(window.scrollY || window.pageYOffset);
        } else if (this.selector.style[this.option.prop]) {
            if (this.option.prop === "opacity") {
                this.currentValue = parseFloat(this.selector.style[this.option.prop]);
            } else {
                this.currentValue = parseInt(this.selector.style[this.option.prop]);
            }
        } else {
            if (this.option.prop === "opacity") {
                this.currentValue = parseFloat(getComputedStyle(this.selector)[this.option.prop]);
            } else {
                this.currentValue = parseInt(getComputedStyle(this.selector)[this.option.prop]);
            }
        }

        this.isString = typeof this.option.value;
        if (this.isString == "string") this.option.value = parseFloat(this.option.value);
        if (this.option.value !== this.currentValue) requestAnimationFrame(time => { this.run(time) });
    }
    run(time) {
        let timeLast = time - this.startTime; // 처음 time과 this.startTime는 동일한 밀리초임. time은 run함수 실행 시작 후 경과하는 밀리초의 진행형, this.startTime은 Anime class 실행된 직후의 밀리초.
        let progress = timeLast / this.speed;

        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        if (progress < 1) {
            this.timer = requestAnimationFrame(time => { this.run(time) });
        } else {
            cancelAnimationFrame(this.timer);
            if (this.option.callback) {
                setTimeout(() => {
                    this.option.callback();
                }, 0);
            }
        }

        let result = this.currentValue + ((this.option.value - this.currentValue) * progress);

        if (this.option.prop === "opacity") {
            this.selector.style[this.option.prop] = result;
        } else if (this.option.prop === "scroll") {
            window.scroll(0, result);
        } else if (this.isString == "string") { //34번째줄에서 이미 변환했는데 굳이 또 할필요가??
            this.selector.style[this.option.prop] = result + "%";
        } else {
            this.selector.style[this.option.prop] = result + "px";
        }
    }
}

// lottie animation
const svgWarp = document.getElementById('bm');
var animation = bodymovin.loadAnimation({
    container: svgWarp,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'img/contactAnime.json'
});

/*  let isComplete = true;
submitWrap.addEventListener('mouseenter', function () {
    if (isComplete) {
        console.log('y');
        animation.goToAndPlay(0);
        animation.setSpeed(0.35);
        lottie.destroy()
        isComplete = false;
    }
})
animation.addEventListener('complete', function () {
    isComplete = true;
}) */


// contact us - Emailjs 활용
(function () {
    emailjs.init('user_ishCOgh8Xg8yrPckRxRDH');
})();
window.onload = function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        this.contact_number.value = Math.random() * 100000 | 0;
        emailjs.sendForm('service_x8h9puo', 'template_6iic09j', this)
            .then(function () {
                //contactForm.display = "none"; // 이건 왜 안되지?? then 구문에서는 안먹히는건가?
                contactForm.classList.remove('on');
                bm.classList.add('on');
                animation.goToAndPlay(0);
                animation.setSpeed(0.5);
                animation.addEventListener('complete', function () {
                    bm.classList.remove('on');
                    alert('Thank you!');
                })

            }, function (error) {
                alert('Please try again.', error);
            });
    });
}
nav__contactUs.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('contact')
    contactForm.classList.add('on');
})


//GNB 기능 - 접근성 포함
for (const el of gnbItem) {
    el.onfocus = e => {
        e.currentTarget.nextElementSibling.classList.add("on");
    }
}
for (const el of gnbSubitem) {
    el.onblur = e => {
        const gnbDepth2 = e.currentTarget.closest(".nav__gnb-depth2").lastElementChild.querySelector("a")
        if (gnbDepth2 == e.target) {
            e.currentTarget.closest(".nav__gnb-depth2").classList.remove("on");
        }
    }
    el.addEventListener('keydown', e => {
        if (e.code == 'Escape') {
            e.currentTarget.closest(".nav__gnb-depth2").classList.remove("on");
        }
    })
}



//헤더 전체메뉴 기능
totalMenuBtn.addEventListener("click", e => {
    e.preventDefault();
    totalMenuBtn.classList.add("on");
    totalMenuContents.classList.add("on");
    new Anime(totalMenuBtn, {
        prop: "padding-left",
        value: 30,
        duration: 1000,
        callback: new Anime(totalMenuBtn, {
            prop: "padding-top",
            value: 50,
            duration: 3500,
        })
    })
});
totalMenuBtn.addEventListener("focus", () => {
    totalMenuBtn.classList.add("on");
    //totalMenuContents.classList.add("on");
});


let ThumSwiper = new Swiper('.ThumSwiper', {
    watchSlidesProgress: true,
    freeMode: true,
    slidesPerView: 'auto',
});

let swiper = new Swiper('.mainSwiper', {
    loop: true,
    slidesPerView: 'auto',
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        prevEl: '.prevBtn',
        nextEl: '.nextBtn',
    },
    thumbs: {
        swiper: ThumSwiper
    },
});







