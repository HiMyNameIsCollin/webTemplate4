const handleBanner = (e) => {
	const closeBanner = (e) => {
		tl.reverse()
		e.target.removeEventListener('click', closeBanner)
		e.target.addEventListener('click', handleBanner)
		setTimeout(() => {
			gsap.set(e.target, {clearProps: 'all'})
		},500)
	}
	const tl = gsap.timeline()
	tl.to(e.target, {height: '100%', width: '100%', left: '0', top: '0', zIndex: 2, duration: .5})
	e.target.addEventListener('click', closeBanner)
	e.target.removeEventListener('click', handleBanner)
}

Array.from(document.querySelectorAll('div')).forEach(ele => ele.addEventListener('click', handleBanner))