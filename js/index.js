const data = {
    "accounts": [
        {
            "title": "Title 1",
            "img": "https://lh3.googleusercontent.com/proxy/PRYMK32bg8JQyd63CLyxbkPlGziayCGeiasV1_pUWqlv8apyZlooYyfQuLVbEds4ZJeLkdhB0wsxpdC0GhmqbmiWqX5RBpmNyPOiLGUQ"
        },
        {
            "title": "Title 2",
            "img": "https://lh3.googleusercontent.com/proxy/PRYMK32bg8JQyd63CLyxbkPlGziayCGeiasV1_pUWqlv8apyZlooYyfQuLVbEds4ZJeLkdhB0wsxpdC0GhmqbmiWqX5RBpmNyPOiLGUQ"
        },
        {
            "title": "Title 3",
            "img": "https://lh3.googleusercontent.com/proxy/PRYMK32bg8JQyd63CLyxbkPlGziayCGeiasV1_pUWqlv8apyZlooYyfQuLVbEds4ZJeLkdhB0wsxpdC0GhmqbmiWqX5RBpmNyPOiLGUQ"
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
    for (let i = 0; i < list.length; i++) {
        if (list[i].classList.contains('active')) {
            if (i + 1 >= list.length) return 0;
            else return i + 1;
        }
    }
}

function prevLink(list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].classList.contains('active')) {
            if (i - 1 < 0) return list.length - 1;
            else return i - 1;
        }
    }
}

function removeItem(index, list) {
    return list.filter((el, i) => index !== i);
}


window.onload = () => {
    const screen1 = new Screen1();
    screen1.show();
}

class Screen1 {
    constructor() {
        this.list = document.getElementsByClassName('list')[0];
        this.button = document.getElementsByClassName('add')[0];
        this.current = 0;
        this.previous = 0;
        this.onInput = this.onInput.bind(this);
    }

    createItemsList(data) {
        for (let i = 0; i < data.accounts.length; i++) {
            this.list.innerHTML += `<div class="list-item">
                        <i class="fas fa-box"></i>
                        <h3 class="item-title"> ${data.accounts[i].title} </h3>
                    </div>`;
        }
    }

    cleanList() {
        this.list.innerHTML = '';
    }

    onInput(e) {
        switch (e.code) {
            case 'ArrowUp':
                if (this.current !== 'button') {
                    this.previous = this.current;
                    this.current = prevLink(this.list_item);
                    removeClass(this.list_item[this.previous], 'active');
                    addClass(this.list_item[this.current], 'active');
                }
                break;
            case 'ArrowDown':
                if (this.current !== 'button') {
                    this.previous = this.current;
                    this.current = nextLink(this.list_item);
                    removeClass(this.list_item[this.previous], 'active');
                    addClass(this.list_item[this.current], 'active');
                }
                break;
            case 'ArrowLeft':
                if (this.current !== 'button') {
                    data.accounts = removeItem(this.current, data.accounts);
                    this.cleanList();
                    this.createItemsList(data);
                    this.current = this.current === 0 ? this.current : this.current - 1;
                    addClass(this.list_item[this.current], 'active');
                } else {
                    this.current = this.previous;
                    removeClass(this.button, 'active');
                    addClass(this.list_item[this.current], 'active');
                }
                break;
            case 'ArrowRight':
                if (this.current !== 'button') {
                    removeClass(this.list_item[this.current], 'active');
                    this.previous = this.current;
                    this.current = 'button';
                    addClass(this.button, 'active');
                }
                break;
            case 'Enter':
                if (this.current === 'button') {
                    removeClass(this.button, 'active');
                    this.hide();
                }
                break;
        }
    }

    show() {
        const s1 = document.getElementsByClassName('screen-1')[0];
        removeClass(s1, 'hide');
        document.addEventListener('keydown', this.onInput);
        this.cleanList();
        this.createItemsList(data);
        this.list_item = document.getElementsByClassName('list-item');
        addClass(this.list_item[this.previous], 'active');
        this.current = this.previous;
    }

    hide() {
        const s1 = document.getElementsByClassName('screen-1')[0];
        addClass(s1, 'hide');

        document.removeEventListener('keydown', this.onInput);

        const screen2 = new Screen2(this);
        screen2.show();
    }
}

class Screen2 {
    constructor(screen1) {
        this.input = document.getElementsByClassName('inputAdd')[0];
        this.add = document.getElementsByClassName('add')[1];
        this.cancel = document.getElementsByClassName('cancel')[0];
        this.screen1 = screen1;

        this.current = 'input';
        this.previous = 'add';

        addClass(this.input, 'active');
        this.input.focus();

        this.onInput = this.onInput.bind(this);
    }

    onInput(e) {
        switch (e.code) {
            case 'ArrowUp':
                if (this.current !== 'input') {
                    this.input.focus();
                    if (this.current === 'add') removeClass(this.add, 'active');
                    if (this.current === 'cancel') removeClass(this.cancel, 'active');
                    this.previous = this.current;
                    this.current = 'input';
                    addClass(this.input, 'active');
                }
                break;
            case 'ArrowDown':
                this.input.blur();
                this.current = this.previous;
                if (this.current === 'add') addClass(this.add, 'active');
                if (this.current === 'cancel') addClass(this.cancel, 'active');
                removeClass(this.input, 'active');
                break;
            case 'ArrowLeft':
                if (this.current !== 'input' && this.current !== 'add') {
                    this.current = 'add';
                    this.previous = 'cancel';
                    removeClass(this.cancel, 'active');
                    addClass(this.add, 'active');
                }
                break;
            case 'ArrowRight':
                if (this.current !== 'input' && this.current !== 'cancel') {
                    this.current = 'cancel';
                    this.previous = 'add';
                    removeClass(this.add, 'active');
                    addClass(this.cancel, 'active');
                }
                break;
            case 'Enter':
                if (this.current === 'add') {
                    data.accounts.push({
                        'title': this.input.value,
                        'img': 'https://lh3.googleusercontent.com/proxy/PRYMK32bg8JQyd63CLyxbkPlGziayCGeiasV1_pUWqlv8apyZlooYyfQuLVbEds4ZJeLkdhB0wsxpdC0GhmqbmiWqX5RBpmNyPOiLGUQ'
                    });
                    this.input.value = '';
                    removeClass(this.add, 'active');
                    this.hide();
                } else if (this.current === 'cancel') {
                    this.input.value = '';
                    removeClass(this.cancel, 'active');
                    this.hide();
                }
                break;
        }
    }

    show() {
        const s2 = document.getElementsByClassName('screen-2')[0];
        removeClass(s2, 'hide');
        document.addEventListener('keydown', this.onInput);
        this.input.focus();
    }

    hide() {
        const s2 = document.getElementsByClassName('screen-2')[0];
        addClass(s2, 'hide');
        document.removeEventListener('keydown', this.onInput);
        this.screen1.show();
    }
}
