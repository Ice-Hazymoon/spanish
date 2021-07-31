const silabea = require('silabea');

document.querySelector('textarea').addEventListener('input', e => {
    console.log(e.target);
    const r = e.target.value.replace(/([\w\'áéíóúÁÉÍÓÚñÑçÇüÜ]+)/g, e => {
        const silabas = silabea.getSilabas(e);
        const s = silabas.silabas.map(e => e.silaba);
        console.log(silabas);
        if (s.length > 1) {
            return `<ruby title="点击发音">${e}<rt>${s.map((e, i) => {
                if (i + 1 === silabas.tonica) {
                    return `<span style="color: red;">${e}</span>`
                } else {
                    return e;
                }
            }).join('-')}</rt></ruby>`;
        } else {
            return `<ruby title="点击发音">${e}</ruby>`
        }
    }).replace(/\n/g, '<br/>');
    document.getElementById('preview').innerHTML = r;
    document.getElementById('preview').style.whiteSpace = 'pre-wrap'
    Array.from(document.querySelectorAll('ruby')).forEach(e => {
        e.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            const utterThis = new window.SpeechSynthesisUtterance();
            utterThis.text = e.childNodes[0].nodeValue;
            utterThis.lang = 'es';
            utterThis.volume = 1;
            window.speechSynthesis.speak(utterThis);
        })
    })
});