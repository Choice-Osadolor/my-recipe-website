const headerFile = '/header.html';
const footerFile='/footer.html';

const header=document.createElement('header');
const footer=document.createElement('footer');

fetch(headerFile)
    .then(res=>res.text())
    .then(data=>{
        header.innerHTML=data;
        document.body.prepend(header);
    });

fetch(footerFile)
    .then(res=>res.text())
    .then(data=>{
        footer.innerHTML=data;
        document.body.querySelector('main').appendChild(footer);
    });

