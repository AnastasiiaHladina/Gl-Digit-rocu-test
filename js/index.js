/* window.onload = () => {
    let screen1 = document.getElementsByClassName('screen-1')[0];
    let screen2 = document.getElementsByClassName('screen-2')[0];
    let list_items = document.getElementsByClassName('list-item');
    let activeBlock = 0;
    addClass(list_items[0], 'active');

    document.addEventListener('keydown', (e) => {
        switch(e.code){
            case 'ArrowUp':
                console.log(e.code);
                break;
            case 'ArrowDown':
                removeClass(list_items[0], 'active');
                addClass(list_items[1], 'active');
                console.log(e.code);
                break;
            case 'ArrowLeft':
                console.log(e.code);
                break;
            case 'ArrowRight':
                console.log(e.code);
                break;
            case 'Enter':
                console.log(e.code);
                break;
            default:
                console.log('Nothing');
                break;
        }
    });
}


function isActive(el) {
    for(let i=0; i<el.classList.length; i++) {
        if(el.classList[i] === 'active') return true;
    }
    return false;
}
function whichLinkIsActive() {

}
function nextLink(list) {
   for(let i=0; i<list.length; i++){
       for(let j=0; j<list[i].classList.length; j++){
           if(list[i].classList[j] === 'active'){
               if(i+1 > list.length) return 0;
               else return i+1;
           }
       }
   }
}
function prevLink(list) {
    for(let i=0; i<list.length; i++){
        for(let j=0; j<list[i].classList.length; j++){
            if(list[i].classList[j] === 'active'){
                if(i-1 < list.length) return list.length;
                else return i-1;
            }
        }
    }
}
*/
const data = {
    "accounts" : [
        {
            "title" : "Title 1",
            "img" : "https://lh3.googleusercontent.com/proxy/PRYMK32bg8JQyd63CLyxbkPlGziayCGeiasV1_pUWqlv8apyZlooYyfQuLVbEds4ZJeLkdhB0wsxpdC0GhmqbmiWqX5RBpmNyPOiLGUQ"
        },
        {
            "title" : "Title 2",
            "img" : "константа URL изображения"
        },
        {
            "title" : "Title 3",
            "img" : "константа URL изображения"
        },
    ]
}


function addClass(el, className) {
    el.classList.add(className);
}
function removeClass(el, className) {
    el.classList.remove(className);
}
function nextLink(list) {
    for(let i=0; i<list.length; i++){
        if(list[i].classList.contains('active')){
            if(i+1 >= list.length) return 0;
            else return i+1;
        }
    }
}
function prevLink(list) {
    for(let i=0; i<list.length; i++){
        if(list[i].classList.contains('active')){
            if(i-1 < 0) return list.length-1;
            else return i-1;
        }
    }
}
function removeItem(index, list) {
    console.log(index, list);
    return list.filter((el, i) => index!==i);
}








class Screen1 {
    constructor() {
        this.container = document.getElementsByClassName('list')[0];
        this.button = document.getElementsByClassName('add')[0];
        this.createItemsList(data);
        this.list_item = document.getElementsByClassName('list-item');
        addClass(this.list_item[0], 'active');
        this.current = 0;
        this.previous = 0;
        document.addEventListener('keydown', (e) => {
            switch(e.code){
                case 'ArrowUp':
                    this.previous = this.current;
                    this.current = prevLink(this.list_item);
                    removeClass(this.list_item[this.previous], 'active');
                    addClass(this.list_item[this.current], 'active');
                    break;
                case 'ArrowDown':
                    this.previous = this.current;
                    this.current = nextLink(this.list_item);
                    removeClass(this.list_item[this.previous], 'active');
                    addClass(this.list_item[this.current], 'active');
                    break;
                case 'ArrowLeft':
                    if(this.current !== 'button'){
                        data.accounts = removeItem(this.current, data.accounts);
                        this.cleanContainer();
                        this.createItemsList(data);
                        this.current = this.current === 0 ? this.current : this.current-1;
                        addClass(this.list_item[this.current], 'active');
                    } else {
                        this.current = this.previous;
                        removeClass(this.button, 'active');
                        addClass(this.list_item[this.current], 'active');
                    }
                    break;
                case 'ArrowRight':
                    removeClass(this.list_item[this.current], 'active');
                    this.previous = this.current;
                    this.current = 'button';
                    addClass(this.button, 'active');
                    break;
                case 'Enter':
                    if(this.current === 'button'){
                        console.log('Button Works!');
                    }
                    break;
            }
        });
    }
    createItemsList(data) {
        for(let i=0; i<data.accounts.length; i++) {
            this.container.innerHTML += `<div class="list-item">
                        <i class="fas fa-box"></i>
                        <h3 class="item-title"> ${data.accounts[i].title} </h3>
                    </div>`;
        }
    }
    cleanContainer() {
        this.container.innerHTML = '';
    }
    show(){}
    hide(){}
}
window.onload = () => {
    const screen1 = new Screen1();
}
