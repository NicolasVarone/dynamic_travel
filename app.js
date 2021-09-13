let controller
let slideScene
let pageScene

function animatedSlides() {
  // Initialize controller
  controller = new ScrollMagic.Controller()

  // Select some things
  const sliders = document.querySelectorAll('.slide')
  const nav = document.querySelector('.nav-header')

  // Loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImage = slide.querySelector('.reveal-image')
    const image = slide.querySelector('img')
    const revealText = slide.querySelector('.reveal-text')

    // GSAP
    const slideTimeLine = gsap.timeline({
      defaults: { duration: 1, ease: 'power2.inOut' },
    })
    slideTimeLine.fromTo(revealImage, { x: '0%' }, { x: '100%' })
    slideTimeLine.fromTo(image, { scale: 2 }, { scale: 1 }, '-=1')
    slideTimeLine.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.75')
    slideTimeLine.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=0.5')

    // Create scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTimeLine)
      .addIndicators({
        colorStart: 'white',
        colorTrigger: 'white',
        name: 'slide',
      })
      .addTo(controller)

    // New animation
    const pageTimeLine = gsap.timeline()
    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1]
    pageTimeLine.fromTo(nextSlide, { y: '0%' }, { y: '50%' })
    pageTimeLine.fromTo(
      slide,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.5 }
    )
    pageTimeLine.fromTo(nextSlide, { y: '50%' }, { y: '0%' }, '-=0.5')

    // Create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: '100%',
      triggerHook: 0,
    })
      .addIndicators({
        colorStart: 'white',
        colorTrigger: 'white',
        name: 'page',
        indent: 200,
      })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTimeLine)
      .addTo(controller)
  })
}

animatedSlides()
