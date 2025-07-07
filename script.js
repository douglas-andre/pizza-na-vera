// Listar as pizzas com .map()
// Adicionar um "data-key" com o valor do index
// Preencher as informações
// Adicionar evento de click para abrir Modal
// Prevenir default
// Usar setTimeOut para abrir Modal
// Preencher informações do Modal
// Click do tamanho das pizzas
// Click nos botões + e -

// Variáveis globais
let cart = []
let modalQt = 1
let modalKey

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
        modalKey = key
        console.log(key)

        query('.pizzaBig img').src = pizzaJson[key].img
        query('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        query('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        query('.pizzaInfo--qt').innerHTML = modalQt
        query('.pizzaInfo--actualPrice').innerHTML = `R$${pizzaJson[key].price[2].toFixed(2)}`
        query('.pizzaInfo--size.selected').classList.remove('selected')
        queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        query('.pizzaWindowArea').style.opacity = 0
        query('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            query('.pizzaWindowArea').style.opacity = 1
        }, 100)
    })


    query('.pizza-area').append(pizzaItem)

})

function closeModal() {
    query('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        query('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

queryAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})

queryAll('.pizzaInfo--size').forEach((sizePizza) => {
    sizePizza.addEventListener('click', () => {
        query('.pizzaInfo--size.selected').classList.remove('selected')
        sizePizza.classList.add('selected')
    })
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