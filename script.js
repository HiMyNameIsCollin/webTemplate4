const setHeight = () => {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', vh + 'px')
}
setHeight()
window.onresize = setHeight


/*########## MAP #######################################################3*/
const openMap = (e) => {
	const closeMap = () => {
		tl.reverse()
		showInfoNode.removeEventListener('click', closeMap)
		setTimeout(() => {
			document.querySelector('.map').removeChild(showInfoNode)
		},500)
	}
	e.preventDefault()
	const showInfoNode = document.createElement('A')
	showInfoNode.classList.add('map__showInfoBtn')
	showInfoNode.innerHTML = '<i class="fas fa-info-circle"></i> Show info'
	showInfoNode.addEventListener('click', closeMap)
	document.querySelector('.map').appendChild(showInfoNode)
	const tl = gsap.timeline()
	const rule = CSSRulePlugin.getRule('.addressPanel::before')
	tl.to(rule, {opacity: 0, duration: .25})
	.to('.addressPanel__group', {opacity: 0, duration: .25}, '-=.25')
	.to('.map', {zIndex: 3, duration: .25})
	.fromTo('.map__showInfoBtn', { y: '-100%'}, {y: '0%', duration: .5, ease: Circ.easeOut})

}
document.querySelector('.addressPanel__btn').addEventListener('click', openMap)