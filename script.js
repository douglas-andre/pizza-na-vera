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
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$${item.price[2].toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQt = 1
        
        query('.pizzaBig img').src = pizzaJson[key].img
        query('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        query('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        query('.pizzaInfo--actualPrice').innerHTML = `R$${pizzaJson[key].price[2]}`
        query('.pizzaInfo--size.selected').classList.remove('selected')
        queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 1) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        query('.pizzaInfo--qt').innerHTML = modalQt

        query('.pizzaWindowArea').style.display = 'flex'
        query('.pizzaWindowArea').style.opacity = 0

        setTimeout(() => {
            query('.pizzaWindowArea').style.opacity = 1
        }, 100);
    })

    query('.pizza-area').append(pizzaItem)
})