/*Скрипт для автоматической обратобки всех возможных "висячих предлогов".
 Скрипт находит предлоги (добавленные в спец. массив), и оборачивает в span.no-wr этот предлог и следующее за ним слово, а стили добавляет в тег HEAD.
 Демонстрация работы скрипта
 До:
 http://joxi.ru/MAjqn9Vh4ZpJz2
 После:
 http://joxi.ru/Q2KQkBdH4XZkEr
 Также скрипт, который автоматически ищет все атрибуты, используемые на странице, и позволяет в один клик удалить все ненужные.
 Оба скрипта со временем можно "обучать", добавляя в массивы нужные значения. Также не до конца оптимизировал их объединение, могут быть повторы по сути одной и той же функции.
 Скрипт не требует jquery, надо подключить в HTML-разметку, удалить все лишние атрибуты (смотрите в консоль), расставить переносы "висячих предлогов", затем скопировать html тега body (вот так: http://joxi.ru/v29pbneH3QByvm), и вставить в разметку.
 После того, как убрали висячие предлоги, надо также с тега HEAD забрать стили для класса .no-wr.
 Скрипт после этого отключается и удаляется.*/

let selectorsToChangeText = [document.querySelectorAll("*")]; // Перебираем все существующие виды селекторов без разбора!

let arrOfBedAttributes = ["affiliate-data", "aria-controls", "aria-expanded", "aria-haspopup", "aria-hidden", "aria-label", "aria-labelledby", "aria-multiline", "aria-selected", "background-image-backup", "contenteditable", "data-article-id", "data-disable-with", "data-dismiss", "data-dropdown-menu", "data-event", "data-events", "data-handler", "data-is-click", "data-letter", "data-method", "data-minify", "data-multi-open", "data-mutate", "data-new-adfox-slot-name", "data-news-id", "data-pin-custom", "data-pin-do", "data-pin-no-hover", "data-popap", "data-remote", "data-requires-captcha", "data-responsive-menu", "data-share-descr", "data-share-image", "data-share-tags", "data-share-title", "data-share-type", "data-share-url", "data-submenu", "data-swpconfig", "data-swpengine", "data-swplive", "data-tabs", "data-tabs-content", "data-toggle", "data-toggler", "data-type", "data-whatinput", "data-whatintent", "dir", "http-equiv", "itemprop", "itemscope", "itemtype", "novalidate", "onclick", "prefix", "property", "role", "sl-processed", "tabindex", "target", "title", "tppabs", "typeof", "xmlns", "xmlns:v", "data-analytics-target", "data-authorid", "data-blog-domain", "data-blog-group", "data-blog-id", "data-blogid", "data-change-correlator", "data-chomp-id", "data-dropdown", "data-dropdown-content", "data-ga", "data-id", "data-index", "data-likecount", "data-model", "data-options", "data-override-post-id", "data-paragraph-position", "data-post-id", "data-postid", "data-pp-position", "data-reply-count-approved", "data-reply-count-curated", "data-reply-count-pending", "data-reply-count-total", "data-reveal", "data-reveal-id", "data-sizes", "data-sourceblogid", "data-sourceid", "data-srcset", "data-starterid", "data-tagcanonical", "data-timezone-offset", "data-urlname", "data-width", "data-zone-type"];

let arrOfGoodAttributes = ["action", "alt", "charset", "class", "content", "d", "href", "id", "media", "method", "name", "rel", "src", "title", "type", "value", "placeholder", "viewBox", "x", "xml:space", "xmlns", "y", "data-format", 'data-daysAgo', 'data-monthForm', "style", "lang", "height", "cols", "rows", "datetime", "for", "align", "datetime", "color", "fill", "fill-rule", "xlink:href"]; // Эти аттрибуты никогда не удаляются, сюда можно добавлять все 100% нужные аттрибуты.


let arrOfAllAttributes = [];
let arrOfNewAttributes = [];
let arrOfRemovedAttributes = [];
let deletedAttributesCount = 0;


function findOnClick(arrOfSels) {
    iterateElements(arrOfSels, findAllAttributes);
    console.log('"Плохие" аттрибуты: ');
    console.log(arrOfBedAttributes.sort());
    console.log('"Хорошие" аттрибуты: ');
    console.log(arrOfGoodAttributes.sort());
    console.log('Новые аттрибуты: ');
    console.log(arrOfNewAttributes.length > 0 ? arrOfNewAttributes.sort() : 'No new attributes!');
    console.log('Все аттрибуты, за исключением хороших: ');
    console.log(arrOfAllAttributes.sort());
}

function replaceOnclick(arrOfSels) {
    iterateElements(arrOfSels, removeAttributes);
    arrOfRemovedAttributes.length > 0 ? console.log('Успех! Удалено ' + deletedAttributesCount + ' аттрибутов! Список удаленных аттрибутов: ') : null;
    console.log(arrOfRemovedAttributes.length > 0 ? arrOfRemovedAttributes.sort() : 'Подлежащих удалению аттрибутов нет!');
}

function iterateElements(arrOfSels, func) {
    for (let i = 0; i < arrOfSels.length; i++) {    // Берем массив с селекторами, проходим его циклом
        for (let k = 0; k < arrOfSels[i].length; k++) { // Проходим циклом все экземляры с выбранного селектора
            func(arrOfSels[i][k]);
        }
    }
}

function removeAttributes(elem) {
    for (let j = 0; j < arrOfBedAttributes.length; j++) {
        let attr = arrOfBedAttributes[j];
        if (elem.hasAttribute(attr)) {
            if (find(arrOfRemovedAttributes, attr) === -1) {
                arrOfRemovedAttributes.push(attr);
                deletedAttributesCount++;
            }
            elem.removeAttribute(attr);
        }
    }

}

function find(array, value) {
    if (array.indexOf) { // если метод существует
        return array.indexOf(value);
    }
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return i;
    }
    return -1;
}

function findAllAttributes(array) {
    let arr = array.attributes
    for (let i = 0; i < arr.length; i++) {
        let attr = arr[i].nodeName;
        if (find(arrOfAllAttributes, attr) === -1 && find(arrOfGoodAttributes, attr) === -1 && find(arrOfBedAttributes, attr) === -1) {
            arrOfNewAttributes.push(attr);
        }
        if (find(arrOfAllAttributes, attr) === -1 && find(arrOfGoodAttributes, attr) === -1) {
            arrOfAllAttributes.push(attr);
        }
    }
}

function createButtons() {
    let btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "space-evenly";
    btnContainer.style.width = "100%";
    btnContainer.style.padding = "15px";
    btnContainer.style.position = "fixed";
    btnContainer.style.top = "0";
    btnContainer.style.zIndex = "9999999999999999";
    btnContainer.id = "buttonChangeContainer";
    document.body.insertBefore(btnContainer, document.body.firstChild);
    let btnRemOnclicks = document.createElement("button");
    btnRemOnclicks.id = "btnRemOnclicks";
    btnRemOnclicks.style.width = '150px';
    btnRemOnclicks.style.cursor = 'pointer';
    btnRemOnclicks.innerHTML = 'Удалить все лишние атрибуты'
    btnContainer.insertBefore(btnRemOnclicks, btnContainer.firstChild);
    let btnWhiteSpaces = document.createElement("button");
    btnWhiteSpaces.id = "btnWhiteSpaces";
    btnWhiteSpaces.style.width = '150px';
    btnWhiteSpaces.style.cursor = 'pointer';
    btnWhiteSpaces.innerHTML = 'Убрать все неверные переносы'
    btnContainer.insertBefore(btnWhiteSpaces, btnContainer.firstChild);
}

createButtons();


document.getElementById("btnRemOnclicks").addEventListener('click', function () {
    replaceOnclick(selectorsToChangeText);
}, false);

findOnClick(selectorsToChangeText);


// for wrapping

let wrappingWords = ['и', 'в', 'а', 'я', 'при', 'за', 'с', 'у', 'к', 'от', 'до', 'но', 'на', 'не', 'ну', 'ни', 'по', "для", "что", "как", "или", "он", "их", "из", "без"],
    wrappingWordsUppercase = [],
    wrappingWordsCapitalize = [];

function autoUpperCase() { // Автоматическое включение в базу элементов в Uppercase
    for (let i = 0; i < wrappingWords.length; i++) {
        let upperCase = wrappingWords[i].toUpperCase();
        if (wrappingWords[i].length > 1) {
            let firstUpperCase = wrappingWords[i][0].toUpperCase();
            for (let j = 1; j < wrappingWords[i].length; j++) {
                firstUpperCase += wrappingWords[i][j];
            }
            wrappingWordsCapitalize.push(firstUpperCase);
        }
        wrappingWordsUppercase.push(upperCase);
    }
    wrappingWords = wrappingWords.concat(wrappingWordsUppercase, wrappingWordsCapitalize);
}
autoUpperCase();
console.log('Проверяемые варианты "висячих предлогов":');
console.log(wrappingWords);

function findElement(arrOfSels) {
    for (let i = 0; i < arrOfSels.length; i++) {    // Берем массив с селекторами, проходим его циклом
        for (let k = 0; k < arrOfSels[i].length; k++) { // Проходим циклом все экземляры с выбранного селектора
            findText(arrOfSels[i][k]);
        }
    }
}

let someNode = document.querySelector('.understand-col__item:first-child p');

function createFragment(sel, n) {
    let thisSel = sel.childNodes[n];
    let inneredText = optimizeText(setNoWrap(thisSel));
    // console.log(inneredText);
    let tempDiv = document.createElement('div');
    let fr = document.createDocumentFragment();
    tempDiv.innerHTML = inneredText;
    // console.dir(tempDiv);
    let counter = 1;
    for (let i = 0; i < tempDiv.childNodes.length; i++) {
        fr.appendChild(tempDiv.childNodes[i].cloneNode(true));
    }
    return fr;
}

function addWhiteSpaces(sel) {
    for (let i = 0; i < sel.childNodes.length; i++) {
        if (sel.childNodes[i].nodeType === 3) {
            sel.childNodes[i].data = ' ' + sel.childNodes[i].data + ' ';
        } else {
            let arr = sel.childNodes[i];
            for (let k = 0; k < arr.childNodes.length; k++) {
                if (arr.childNodes[k].nodeType === 3) {
                    arr.childNodes[k].data = arr.childNodes[k].data + ' ';
                }
            }
        }
    }
}

function findText(selector) {
    if (selector.nodeName != 'BUTTON') {
        for (let n = 0; n < selector.childNodes.length; n++) { //Проходим циклом всех детей каждого DOM-элемента
            if (selector.childNodes[n].nodeType == 3) { // Если ребенок является текстовым узлом, работаем с ним
                let fr = createFragment(selector, n);
                selector.replaceChild(fr, selector.childNodes[n]);
            }
        }
        addWhiteSpaces(selector);
    }
}
function optimizeText(wrongText) { // оптимизация текста, удаление линих пробелов, переносов и т. д.
    let string = wrongText.textContent ? wrongText.textContent : wrongText;
    let newLine = string.match(/\n/ig);
    if (newLine) { // Удаление всех переносов на новую строку
        string = string.replace(/\n/g, " ");
    }
    let tab = string.match(/\t/ig);
    if (tab) { // Удаление всех табуляций
        string = string.replace(/\t/g, " ");
    }
    let doubleWhs = string.match(/  /ig);
    while (doubleWhs) { // Удаление всех двойных пробелов
        string = string.replace(/  /g, " ");
        doubleWhs = string.match(/  /ig);
    }
    string = string.trim(); // Обрезка пробелов в начале и конце
    return (string);
}

function setNoWrap(text) {
    string = optimizeText(text);
    let arr = string.split(' ');
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < wrappingWords.length; j++) {
            if (arr[i] === wrappingWords[j] && arr[i + 1]) {
                let replacedFragment = '<span class="no-wr">' + arr[i] + ' ' + arr[i + 1].trim() + '</span>';
                arr.splice(i, 2, replacedFragment);
            }
        }
    }
    let installedText = arr.join(' ');
    return (installedText);
}

function addNowrapStyle() {
    // добавляем стили для неразрывных строк
    var cont = document.createElement('style'),
        head = document.querySelector('head');
    cont.innerHTML = '.no-wr{white-space: nowrap;color: inherit !important;font-size: inherit !important;vertical-align: inherit !important;font-style: inherit !important;font-weight: inherit !important;display: inline !important;position: static !important;float: none !important;padding: 0 !important;background: none !important;margin: 0 !important;}';
    head.appendChild(cont)
}


document.getElementById("btnWhiteSpaces").addEventListener('click', function () {
    addNowrapStyle();
    findElement(selectorsToChangeText);
    // findText(someNode);
}, false);