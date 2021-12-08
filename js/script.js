const gnbItem = document.querySelectorAll(".nav__gnb-title");
const gnbSubitem = document.querySelectorAll(".nav__gnb-depth2-item > a");
const totalMenuBtn = document.querySelector(".nav__total-menu");
const totalMenuContents = document.querySelector(".total-menu");


/* 애니메이션 기본 셋팅 jquery처럼 간편하게 쓸 수 있게 (value 값은 숫자 형태만 가능)*/
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


/* 헤더 메뉴 기능 */
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



/* 헤더 전체메뉴 기능 */
//클릭 후 전체버튼에 class on걸어서 애니메이션 진행 진행 끝나면 totalMenuContents에 on 건 후 해당 클래스에 원 배경 애니메이션 걸기
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
            duration: 3000,
        })
    })

});
totalMenuBtn.addEventListener("focus", () => {
    totalMenuBtn.classList.add("on");
    //totalMenuContents.classList.add("on");
});


const swiper = new Swiper('.swiper', {
    //direction: 'vertical',
    loop: true,

    navigation: {
      nextEl: '.custom-swiper-button-prev',
      prevEl: '.custom-swiper-button-next',
    }
  });





