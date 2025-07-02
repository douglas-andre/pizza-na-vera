// Variáveis globais
let cart = []
let modalQt = 1
let modalKey = 0

// Atalhos
const query = (el) => document.querySelector(el)
const queryAll = (el) => document.querySelectorAll(el)

// Listagem das pizzas

pizzaJson.map((item, index) => {
    let pizzaItem = query('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[2].toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQt = 1
        modalKey = key

        query('.pizzaBig img').src = pizzaJson[key].img
        query('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        query('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        query('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[2].toFixed(2)}`
        query('.pizzaInfo--size.selected').classList.remove('selected')
        queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })
        
        query('.pizzaInfo--qt').innerHTML = modalQt
        query('.pizzaWindowArea').style.opacity = 0
        query('.pizzaWindowArea').style.display = 'flex'

        setTimeout(() => {
            query('.pizzaWindowArea').style.opacity = 1
        }, 100);
    })

    query('.pizza-area').append(pizzaItem)
})

// Eventos do Modal

function closeModal() {
    query('.pizzaWindowArea').style.opacity = 0
    
    setTimeout(() => {
        query('.pizzaWindowArea').style.display = 'none'
    }, 500);
}

queryAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((cancelItem) => {
    cancelItem.addEventListener('click', closeModal)
})

query('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--
        query('.pizzaInfo--qt').innerHTML = modalQt
    }
})

query('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    query('.pizzaInfo--qt').innerHTML = modalQt
})

queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        query('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
        query('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalKey].price[sizeIndex].toFixed(2)}`
    })
})

// Adicionar ao carrinho
query('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(query('.pizzaInfo--size.selected').getAttribute('data-key'))

    let identifier = pizzaJson[modalKey].id + '@' + size

    let chave = cart.findIndex((item) => item.identifier == identifier)

    if (chave > -1) {
        cart[chave].qt += modalQt
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        })
    }
    updateCart()
    closeModal()
})

// Atualizar carrinho
function updateCart() {
    if (cart.length > 0) {
        query('aside').classList.add('show')
        query('.cart').innerHTML = ''
        for (let i in cart) {
            let pizzaInfo = pizzaJson.find((item) => item.id == cart[i].id)
            let cartItem = query('.models .cart--item').cloneNode(true)
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaInfo.name

            query('.cart').append(cartItem)
        }

    } else {
        query('aside').classList.remove('show')
    }
}