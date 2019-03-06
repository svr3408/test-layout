document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".card__title");
  for (const title of titles) {
    text = title.textContent;

    if (text.length > 65) {
      title.textContent = text.substring(0, 65) + " ...";
    }
    title.addEventListener("click", () => {
      alert("Нажали на заголовок");
    });
  }

  const usernames = document.querySelectorAll(".card__username");
  for (const username of usernames) {
    username.addEventListener("click", () => {
      alert("Нажали на имя пользователя");
    });
  }

  const likes = document.querySelectorAll(".card__like");
  for (const like of likes) {
    like.addEventListener("click", () => {
      alert("Нажали на лайк");
    });
  }

  class Carousel {
    constructor(el) {
      this.loadedSlides = [
        {
          title:
            "title 6 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName6",
          star: "6",
          price: "6"
        },
        {
          title:
            "title 7 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName7",
          star: "7",
          price: "7"
        },
        {
          title:
            "title 8 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName8",
          star: "8",
          price: "8"
        },
        {
          title:
            "title 9 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName9",
          star: "9",
          price: "9"
        },
        {
          title:
            "title 10 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName10",
          star: "10",
          price: "10"
        },
        {
          title:
            "title 11 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName11",
          star: "11",
          price: "11"
        },
        {
          title:
            "title 12 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName12",
          star: "12",
          price: "12"
        },
        {
          title:
            "title 13 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName13",
          star: "13",
          price: "13"
        },
        {
          title:
            "title 14 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName14",
          star: "14",
          price: "14"
        },
        {
          title:
            "title 15 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName15",
          star: "15",
          price: "15"
        },
        {
          title:
            "title 16 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName16",
          star: "16",
          price: "16"
        },
        {
          title:
            "title 17 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName17",
          star: "17",
          price: "17"
        },
        {
          title:
            "title 18 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName18",
          star: "18",
          price: "18"
        },
        {
          title:
            "title 19 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName19",
          star: "19",
          price: "19"
        },
        {
          title:
            "title 20 Lorem ipsum dolor sit amet consectetur. Blanditiis cumque libero inventore",
          image: "images/image2.jpg",
          userName: "userName20",
          star: "20",
          price: "20"
        }
      ];

      this.itemAll = document.querySelectorAll(".carousel__item");
      this.items = document.querySelector(".carousel__items");
      this.prevBtn = document.querySelector(".carousel__prevBtn");
      this.nextBtn = document.querySelector(".carousel__nextBtn");
      this.countSlides = 5;

      this.offsetLeft = 0;
      this.itemWidth = this.itemAll[0].getBoundingClientRect().width;
      this.maxOffsetLeft =
        this.items.offsetWidth - this.itemWidth * this.itemAll.length;
      this.start = {};
      this.mousedown = false;
      this.mousemove = false;

      this.showPrevNext();

      this.events = {
        mousedown: e => {
          if (e.which === 1 || e.which === 0) {
            this.start.x = e.clientX ? e.clientX : e.touches[0].clientX;
            this.start.y = e.clientY ? e.clientY : e.touches[0].clientY;
            this.start.target = e.target;
            this.start.time = new Date().getTime();

            this.mousedown = true;

            window.addEventListener("mouseup", this.events.mouseup);
            window.addEventListener("touchend", this.events.mouseup);

            window.addEventListener("mousemove", this.events.mousemoveOne, {
              once: true
            });
          }
        },

        mousemoveOne: e => {
          let clientX = e.clientX ? e.clientX : e.touches[0].clientX;
          let clientY = e.clientY ? e.clientY : e.touches[0].clientY;

          if (
            Math.abs(clientX - this.start.x) >
              Math.abs(clientY - this.start.y) &&
            this.mousedown
          ) {
            el.classList.add("--drag");

            window.addEventListener("mousemove", this.events.mousemove);
            window.addEventListener("touchmove", this.events.mousemove);
          }
        },

        mousemove: e => {
          this.mousemove = true;
          let clientX = e.clientX ? e.clientX : e.touches[0].clientX;
          let dx = clientX - this.start.x;

          if (this.maxOffsetLeft > 0) {
            dx = Math.sign(dx) * Math.sqrt(Math.abs(dx));
          } else if (-this.offsetLeft < dx) {
            // mouse move right
            dx = -this.offsetLeft + Math.sqrt(Math.abs(-this.offsetLeft - dx));
          } else if (this.maxOffsetLeft > dx + this.offsetLeft) {
            // mouse move left
            if (this.countSlides < 20) {
              this.load5Slides();
            } else {
              dx =
                this.maxOffsetLeft -
                this.offsetLeft -
                Math.sqrt(Math.abs(this.offsetLeft + dx - this.maxOffsetLeft));
            }
          }

          this.items.style.transitionDuration = "0s";
          this.items.style.left = this.offsetLeft + dx + "px";
        },

        mouseup: e => {
          this.mousedown = false;

          if (this.mousemove) {
            this.mousemove = false;

            let clientX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
            let dx = clientX - this.start.x;
            el.classList.remove("--drag");

            this.offsetLeft += dx;

            let roundTranslateX =
              this.itemWidth * Math.floor(this.offsetLeft / this.itemWidth);

            if (this.offsetLeft > 0 || this.maxOffsetLeft > 0) {
              this.offsetLeft = 0;
            } else if (this.offsetLeft < this.maxOffsetLeft) {
              this.offsetLeft = this.maxOffsetLeft;
            } else if (dx > 50 || (dx < 0 && dx > -50)) {
              this.offsetLeft = roundTranslateX + this.itemWidth;
            } else if (dx > 0 || dx < -50) {
              this.offsetLeft = roundTranslateX;
            }

            this.items.style.transitionDuration = "";
            this.items.style.left = this.offsetLeft + "px";

            this.showPrevNext();

            window.removeEventListener("mousemove", this.events.mousemove);
            window.removeEventListener("touchmove", this.events.mousemove);

            window.removeEventListener("mouseup", this.events.mouseup);
            window.removeEventListener("touchend", this.events.mouseup);

            if (
              (Math.abs(dx) > 3 ||
                new Date().getTime() - this.start.time > 300) &&
              e.target === this.start.target
            ) {
              this.start.target.addEventListener(
                "click",
                e => {
                  e.stopPropagation();
                  e.preventDefault();
                },
                {
                  once: true
                }
              );
            }
          }
        }
      };

      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", e => {
          e.preventDefault();

          this.nextSlide();
        });
      }

      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", e => {
          e.preventDefault();
          this.prevSlide();
        });
      }

      this.items.addEventListener("mousedown", this.events.mousedown);
      this.items.addEventListener("touchstart", this.events.mousedown);

      this.items.addEventListener("dragstart", e => {
        e.preventDefault();
      });

      window.addEventListener("resize", () => {
        this.resizeButtons();
        if (this.itemWidth !== this.itemAll[0].getBoundingClientRect().width) {
          this.offsetLeft = 0;
          this.items.style.left = this.offsetLeft + "px";
          this.itemWidth = this.itemAll[0].getBoundingClientRect().width;
          this.maxOffsetLeft =
            this.items.offsetWidth - this.itemWidth * this.itemAll.length;

          this.showPrevNext();
        }
      });
    }

    showPrevNext() {
      if (this.prevBtn && this.nextBtn) {
        if (this.offsetLeft < 0) {
          this.prevBtn.classList.remove("--disabled");
        } else {
          this.prevBtn.classList.add("--disabled");
        }

        if (this.offsetLeft > this.maxOffsetLeft) {
          this.nextBtn.classList.remove("--disabled");
        } else {
          if (this.countSlides === 20) {
            this.nextBtn.classList.add("--disabled");
          }
        }
      }
    }

    prevSlide() {
      this.offsetLeft += this.itemWidth;
      this.items.style.left = this.offsetLeft + "px";

      this.showPrevNext();
    }

    nextSlide() {
      this.offsetLeft -= this.itemWidth;
      this.items.style.left = this.offsetLeft + "px";

      if (this.offsetLeft < this.maxOffsetLeft - 1 && this.countSlides < 20) {
        this.load5Slides();
      }

      this.showPrevNext();
    }

    load5Slides() {
      for (let index = 1; index <= 5; index++) {
        this.createSlide(this.loadedSlides.shift());
        this.countSlides++;
      }

      this.maxOffsetLeft =
        this.items.offsetWidth - this.itemWidth * this.countSlides;
    }

    createSlide(slide) {
      text = slide.title;
      if (text.length > 52) {
        slide.title = text.substring(0, 52) + " ...";
      }

      let div = document.createElement("div");
      div.className = "carousel__item grid__col col-xs-12 col-md-4 col-lg-1/5";
      div.innerHTML =
        '<div class="card"><img class="card__image" src="' +
        slide.image +
        '" alt="Гора" /><div class="card__description"><div class="card__title">' +
        slide.title +
        '</div><span class="card__username">' +
        slide.userName +
        '</span><span class="card__stars"><img src="images/star-solid.svg" alt="star" height="15" width="15" />5.0<span class="card__usercount">(' +
        slide.star +
        ')</span></span><hr /><img src="images/heart-solid.svg" class="card__like" alt="heart" height="15" width="15" /><span class="card__price">от ' +
        slide.price +
        "₽</span></div></div>";

      const title = div.querySelector(".card__title");
      title.addEventListener("click", () => {
        alert("Нажали на заголовок");
      });

      const username = div.querySelector(".card__username");
      username.addEventListener("click", () => {
        alert("Нажали на имя пользователя");
      });

      const like = div.querySelector(".card__like");
      like.addEventListener("click", () => {
        alert("Нажали на лайк");
      });

      this.items.appendChild(div);
    }
  }

  const carousel = document.querySelector(".carousel");
  new Carousel(carousel);
});
