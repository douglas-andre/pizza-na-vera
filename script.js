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
let sizeKey

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


        query('.pizzaInfo--qt').innerHTML = modalQt
        query('.pizzaBig img').src = pizzaJson[key].img
        query('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        query('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        query('.pizzaInfo--actualPrice').innerHTML = `R$${pizzaJson[key].price[2].toFixed(2)}`

        query('.pizzaInfo--size.selected').classList.remove('selected')
        queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        query('.pizzaWindowArea').style.display = 'flex'
        query('.pizzaWindowArea').style.opacity = 0

        setTimeout(() => {
            query('.pizzaWindowArea').style.opacity = 1
        }, 200);

    })

    query('.pizza-area').append(pizzaItem)
})

//Fechar Modal
function closeModal() {
    query('.pizzaWindowArea').style.opacity = 0

    setTimeout(() => {
        query('.pizzaWindowArea').style.display = 'none'
    }, 500);
}

queryAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((cancelItem) => {
    cancelItem.addEventListener('click', closeModal)
})

queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        let insideSizeKey = parseInt(e.target.getAttribute('data-key'))
        query('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
        query('.pizzaInfo--actualPrice').innerHTML = `R$${pizzaJson[modalKey].price[sizeIndex]}`
        sizeKey = insideSizeKey
    })
})

//Botões + e -
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


query('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(query('.pizzaInfo--size.selected').getAttribute('data-key'))
    let identifier = pizzaJson[modalKey].id + '@' + size
    let findKey = cart.findIndex((keyItem) => keyItem.identifier == identifier)

    if (findKey > -1) {
        cart[findKey].qt += modalQt
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

function updateCart() {
    if (cart.length > 0) {
        query('aside').classList.add('show')
        query('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        cart.map((mapItem, mapIndex) => {
            pizzaItem2 = pizzaJson.find((item) => item.id == mapItem.id)
            let cartItemNode = query('.models .cart--item').cloneNode(true)
            subtotal += pizzaItem2.price[mapItem.size].toFixed(2) * mapItem.qt
            let pizzaSizeName
            switch (mapItem.size) {
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break
                case 2:
                    pizzaSizeName = 'G'
                    break
            }
            let pizzaName = `${pizzaItem2.name} (${pizzaSizeName})`

            cartItemNode.querySelector('img').src = pizzaItem2.img
            cartItemNode.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItemNode.querySelector('.cart--item--qt').innerHTML = mapItem.qt
            cartItemNode.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (mapItem.qt > 1) {
                    mapItem.qt--
                } else {
                    cart.splice(mapIndex, 1)
                }
                updateCart()
            })
            cartItemNode.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                mapItem.qt++
                updateCart()
            })


            query('.cart').append(cartItemNode)

            desconto = subtotal * 0.1
            total = subtotal - desconto

            query('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
            query('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
            query('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
        })

    } else {
        query('aside').classList.remove('show')
    }
}