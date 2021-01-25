'use strict';

(function() {
    
  try {
    var blockGithub = document.querySelector('.github');
    var nameGithub = blockGithub.querySelector('.github__name');
    var btnGithub = blockGithub.querySelector('.github__button');
    var resultGithub = blockGithub.querySelector('.user');
} catch {
    return;
}

let url = 'https://api.github.com/users/';

async function getUserInfo(evt) {
    resultGithub.innerHTML = '';

    if (nameGithub.value == '') {
        showError();
        return;
    }

    evt.preventDefault();
    let response = await fetch(url + nameGithub.value);

    if (response.ok) { 
        let json = await response.json();
        showResult(json);
    } else {
        showError(response.status);
    }
}

function showError(status) {
    var infoBlock = document.createElement('span');
    infoBlock.textContent = status?`user with name ${nameGithub.value} was not found on GitHub`:'Please, enter the name';
    infoBlock.classList.add('user__text');
    resultGithub.appendChild(infoBlock);
}


async function showResult(info) {
    if (!!info.avatar_url) {
        let loadPhoto = new Promise((resolve) => {
            var img = new Image();
            img.src = info.avatar_url;
            img.onload = () => resolve('loaded');
        });
        await loadPhoto; 
        var avatarImage = document.createElement('img');
        avatarImage.src = info.avatar_url;
        avatarImage.alt = info.login;
        avatarImage.classList.add('user__photo');
        resultGithub.appendChild(avatarImage);
    }
    var infoBlock = document.createElement('div');
    infoBlock.classList.add('user__data');
    resultGithub.appendChild(infoBlock);

    addInfoText(infoBlock,'login',info.login);
    addInfoText(infoBlock,'name',info.name);
    addInfoText(infoBlock,'location',info.location);
    //addInfoText(infoBlock,'email',info.email);
    addInfoText(infoBlock,'repositories',info.public_repos);
    var link = document.createElement('a');
    link.href = 'https://github.com/' + info.login;
    link.setAttribute('target','_blank')
    link.textContent = 'GitHub Profile';
    link.classList.add('user__link');
    infoBlock.appendChild(link);
}

function addInfoText(cnt,title,text) {
    var block = document.createElement('div');
    var titleBlock = document.createElement('span');
    titleBlock.textContent = title + ':';
    titleBlock.classList.add('user__title');
    var textBlock = document.createElement('span');
    textBlock.textContent = !!text?text:'-';
    textBlock.classList.add('user__text');
    block.appendChild(titleBlock);
    block.appendChild(textBlock);
    cnt.appendChild(block);
}
        
if (btnGithub) {
    btnGithub.addEventListener('click', (event) => {
        getUserInfo(event);
    });
}

})();
