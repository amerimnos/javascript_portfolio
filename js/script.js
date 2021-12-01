/* 애니메이션 기본 셋팅 jquery처럼 간편하게 쓸 수 있게 */
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
        let timeLast = time - this.startTime;
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
        } else if (this.isString == "string") {
            this.selector.style[this.option.prop] = result + "%";
        } else {
            this.selector.style[this.option.prop] = result + "px";
        }
    }
}


/* 헤더 메뉴 기능 */
const gnbItem = document.querySelectorAll(".nav__gnb-title");
const gnbSubitem = document.querySelectorAll(".nav__gnb-depth2-item > a");
for (const el of gnbItem) {
    el.onfocus = e => {
        e.currentTarget.nextElementSibling.classList.add("on");
    }
}
for (const el of gnbSubitem) {
    el.onblur = e => {
        if (e.currentTarget.closest(".nav__gnb-depth2").lastElementChild.querySelector("a") == e.target) {
            e.currentTarget.closest(".nav__gnb-depth2").classList.remove("on");
        }

    }
}

/* 헤더 전체메뉴 기능 */
const totalMenuBtn = document.querySelector(".nav__total-menu");
const totalMenuContents = document.querySelector(".total-menu");
totalMenuBtn.addEventListener("click", e => {
    e.preventDefault();
    totalMenuBtn.classList.add("on");
    totalMenuContents.classList.add("on");

});
totalMenuBtn.addEventListener("focus", () => {
    totalMenuBtn.classList.add("on");
    totalMenuContents.classList.add("on");
});





