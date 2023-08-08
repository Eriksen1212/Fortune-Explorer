window.onload = function() {
    var images = ['sketch1.jpeg', 'sketch2.jpeg', 'sketch3.jpeg', 'sketch4.jpeg'];
    var randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = 'url(' + randomImage + ')';
}
