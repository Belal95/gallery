jQuery(() => {
  /** The element holding the view for the user */

  const slider = $(".slider");
  /** The element holding all the images in the slider*/

  const container = $(".slider .container");
  /** The element holding the gallery of all images */

  appendImgs(container, 27);
  const gallery = container.clone().addClass("all");

  /** The number of images in the gallery */

  const imgsCount = container.children().length;

  /** Slider current position */

  let sliderPosition = 0;

  /** Starts the gallery functions */
  function start() {
    allStart();
    containerStart();
  }

  /**
   *
   * @param {JQuery<HTMLElement>} parent
   * @param {Number} count
   */
  function appendImgs(parent, count) {
    for (let i = 0; i <= count; i++) {
      const img = $(`<div><img src="./images/${i + 1}.jpg"></div>`);
      parent.append(img);
    }
  }

  /**
   * Set up the gallery view
   * * Add the imgs to the gallery
   * * Add event listener to the imgs
   *
   */
  function allStart() {
    $("body").append(gallery);
    gallery.children().on("click", openImage);
    /**
     * Open the slider view directly to the selected img
     */
    function openImage() {
      const index = $(this).index(gallery.children[0]);
      goToImage(index, 0);
      slider.slideDown();
    }
  }
  /**
   *
   * Set up the slider container
   * * Sets the width depending on the number of images
   * * Add left, right & close click listener
   *
   */

  function containerStart() {
    container.css("width", `${imgsCount}00%`);
    $("#leftArrow").on("click", goLeft);
    $("#rightArrow").on("click", goRight);
    $("#close").on("click", () => {
      slider.slideUp();
    });
  }

  /**
   * Move the slider to the left
   */

  function goLeft() {
    goToImage(--sliderPosition);
  }

  /**
   * Move the slider to the right
   */

  function goRight() {
    goToImage(++sliderPosition);
  }

  /**
   * Move the container to an image
   * @param {Number} position The position in slider to go to
   * @param {Boolean} bool Pass false to go to image without animation
   * @param {Number} count Number of imgs in the slider
   */

  function goToImage(position, bool = true, count = imgsCount) {
    if (position == -1) sliderPosition = position = count - 1;
    if (position === count) sliderPosition = position = 0;
    sliderPosition = position;
    bool
      ? container.animate({ left: `-${position}00%` })
      : container.css({ left: `-${position}00%` });
  }

  start();
});
