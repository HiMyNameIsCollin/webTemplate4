const handleBanner = (e) => {
	const closeBanner = (e) => {
		tl.reverse()
		e.target.removeEventListener('click', closeBanner)
		e.target.addEventListener('click', handleBanner)
		setTimeout(() => {
			gsap.set('.active, .inactive', {clearProps: 'all'})
			Array.from(document.querySelectorAll('div')).forEach(ele => {
				if(e.target === ele){
					ele.classList.toggle('active')
				} else {
					ele.classList.toggle('inactive')
				}			
			})
		},600)

	}
	Array.from(document.querySelectorAll('div')).forEach( ele => {
		if(e.target === ele){
			ele.classList.toggle('active')
		} else {
			ele.classList.toggle('inactive')
		}
	})
	const tl = gsap.timeline()
	const activeBefore = CSSRulePlugin.getRule('.active::before')
	tl.to('.inactive', {height: '0%', opacity: 0, top: '+50%', duration: .75, ease: Circ.easeIn})
	tl.to('.active', {height: '100%', width: '100%', left: '0', top: '0', zIndex: 3 ,duration: .25, ease: Circ.easeIn}, '-=.25')
	tl.fromTo(activeBefore , {opacity: 0}, {opacity: '.7', duration: .5, ease: Circ.easeIn}, '-=.5')
	e.target.addEventListener('click', closeBanner)
	e.target.removeEventListener('click', handleBanner)
}

Array.from(document.querySelectorAll('div')).forEach(ele => ele.addEventListener('click', handleBanner))