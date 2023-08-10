window.onload = function() {
    var images = ['sketch1.jpeg', 'sketch2.jpeg', 'sketch3.jpeg', 'sketch4.jpeg'];
    var randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = 'url(' + randomImage + ')';
}

window.addEventListener('DOMContentLoaded', (event) => {
    // URL에서 query parameter 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const fortuneIndex = parseInt(urlParams.get('fortune'));
    
    // "Fortune found!" 애니메이션
    setTimeout(() => {
        document.getElementById('fortuneFound').style.opacity = '1';
    }, 1500);

    // 명언 표시
    if (fortuneIndex !== null && fortuneIndex >= 0 && fortuneIndex < fortune_list.length) {
        const quoteData = fortune_list[fortuneIndex].split(" - ");
        const quoteText = quoteData[0];
        const author = quoteData[1];
        
        setTimeout(() => {
            document.getElementById('fortuneResult').innerText = '"' + quoteText + '"';
            document.getElementById('fortuneResult').style.opacity = '1';
        }, 2300); // Speeding up the appearance

        setTimeout(() => {
            document.getElementById('author').innerText = '- ' + author;
            document.getElementById('author').style.opacity = '1';
        }, 3400); // Speeding up the appearance
    } else {
        document.getElementById('fortuneResult').innerText = '무언가 잘못된 것 같아요. 다시 시도해주세요!';
    }
});
