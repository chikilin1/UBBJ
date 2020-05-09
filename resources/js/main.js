// Modal Image Gallery
function muestraImagenModal( element ) {
	document.getElementById( "img01" ).src = element.src;
	document.getElementById( "modal01" ).style.display = "block";
	var captionText = document.getElementById( "caption" );
	captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
window.onscroll = function () {
	actualizaNavbar()
};

function actualizaNavbar() {
	var navbar = document.getElementById( "myNavbar" );
	if ( document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ) {
		navbar.classList.add( "w3-bar", "w3-card", "w3-animate-top", "w3-white", "w3-text-gray" );
	}
	else {
		navbar.classList.remove( "w3-card", "w3-animate-top", "w3-white", "w3-text-gray" );
	}
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleMenu() {
	var x = document.getElementById( "navDemo" );
	if ( x.className.indexOf( "w3-show" ) == -1 ) {
		x.className += " w3-show";
	}
	else {
		x.className = x.className.replace( " w3-show", "" );
	}

}

function toggleAccordion( id ) {
	var x = document.getElementById( id );

	if ( x.className.indexOf( "w3-show" ) == -1 ) {
		x.classList.add( 'w3-show' );
	}
	else {
		x.classList.remove( 'w3-show' );
	}
}