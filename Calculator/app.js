class data{
    static getData(){
        let arr = []
        if(localStorage.length === 0){
            return arr = []
        }
        else{
            for(let i=0; i<localStorage.length; i++){
                const element = localStorage.getItem(i)
                if(isNaN(element) === true){
                    arr.push(element)
                }
                else{
                    arr.push(parseFloat(element))
                }
            }
            return arr
        }
    }
    static setData(element){
        const values = data.getData()
        if(element === 'X'){
            element = "*"
        }
        values.push(element)
        let arr = [...values]
        for(let i=0; i<arr.length; i++){
            if(i%2 != 0 && typeof(values[i]) === 'number'){
                const num1 = String(arr[i])
                const num2 = String(arr[i-1])
                const num3 = num2 + num1
                arr.splice(i,1)
                arr.splice(i-1,1)
                arr.splice(i,0,parseFloat(num3))
            }
            if(i%2 === 0 && isNaN(arr[i]) === true){
                arr.splice(i,1)
            }
        }
        for(let i=0; i<arr.length; i++){
            localStorage.setItem(i,String(arr[i]))
        }
        UI.displayData()
    }
}

class UI{
    static displayData(){
        const dom = document.querySelector('.display-board')
        dom.innerHTML = null
        const arr = data.getData()
        const display = document.querySelector('.display-board')
            for(let i=0; i<arr.length; i++){
                display.innerHTML += `<h3 id = ${i}> ${arr[i]} </h3>`
        }
    }
    static backButton(){
        const arr = data.getData()
        const index = arr.length - 1
        const element = arr[index].toString()
        const element_array = element.split('')
        const element_index = element_array.length - 1
        element_array.splice(element_index,1)
        let set = 0
        for(let i=0; i<element_array.length; i++){
            set += element_array[i]
        }
        if(element_array.length>0){
            localStorage.setItem(index,set.toString())
        }
        else{
            localStorage.removeItem(index)
        }
        UI.displayData()
    }
    static calculate(){
        const arr = data.getData()
        const result = eval(arr.join(""))
        localStorage.clear()
        if(result != undefined){
            localStorage.setItem(0,String(result))
        }
        UI.displayData()
    }
}


function getClickData(element){
    data.setData(parseFloat(element.innerText))
}

function getAlgorithmicData(element){
    data.setData(element.innerText)
}

document.getElementById('back').addEventListener('click',UI.backButton)

document.addEventListener('DOMContentLoaded',UI.displayData)

const calculate = document.querySelector('.equal-btn').addEventListener('click',UI.calculate)