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


/*####### GALLERY CARD ANIMATION########################################################*/

const beginMobileCardTransition = (e) => {
	e.stopPropagation()
	e.target.classList.add(e.target.classList[0] + '--active')
	window.addEventListener('click', endMobileCardTransition)	
}

const endMobileCardTransition = (e) => {
	const className = 'gallery__card--active'
	if(!e.target.classList.contains(className) || !e.target.parentElement.classList.contains(className)){
		document.querySelector(`.${className}`).classList.remove(className)
	}
}

const beginDeskCardTransition = (e) => {
	e.stopPropagation()
	e.target.classList.add(e.target.classList[0] + '--active')
	e.target.addEventListener('mouseleave', endDeskCardTransition)
}

const endDeskCardTransition = (e) => {
	e.target.classList.remove(e.target.classList[0] + '--active')
	e.target.removeEventListener('mouseleave', endDeskCardTransition)
}

/*##########GALLERY ENLARGE###############################*/

const enlargeImage = (e) => {
	e.preventDefault()
	const image = e.target.parentElement.querySelector('img')
	const figureNode = document.createElement('FIGURE')
	const sectionNode = document.createElement('SECTION')
	const imgNode = document.createElement('IMG')
	const closeNode = document.createElement('SPAN')
	sectionNode.classList.add('fullImage')
	sectionNode.appendChild(figureNode)
	sectionNode.appendChild(closeNode)
	figureNode.appendChild(imgNode)
	closeNode.innerHTML = `<i class="far fa-times-circle"></i>`
	imgNode.outerHTML = `<img src='${image.src}' alt='${image.src}'/>`
	document.querySelector('body').appendChild(sectionNode)
	closeNode.addEventListener('click', () => document.querySelector('body').removeChild(sectionNode) )
}


class GalleryCard{
	constructor(element){
		element.querySelector('a').addEventListener('click', enlargeImage)
		if(window.innerWidth > 1200){
			element.addEventListener('mouseenter', beginDeskCardTransition)
		} else {
			element.addEventListener('click', beginMobileCardTransition)
		}
		
	}
}

Array.from(document.querySelectorAll('.gallery__card')).map(ele => new GalleryCard(ele))