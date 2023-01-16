let newJobsData =  []
let arrayAside = []
let arraySelectedJobs = []

let botaoText = 'Candidatar'
let idBotao = 1000
let lixoBotao = 2000

function traduzirArraySelectedJobs (array) {

    array.forEach((elemento) => {

        elemento.modalities.forEach((modalidade) => {
            idBotao++
            lixoBotao++
            let objeto = {
                id: newJobsData.length,
                title: elemento.title,
                enterprise: elemento.enterprise,
                location: elemento.location,
                description: elemento.description,
                modalities: modalidade,
                buttonID: idBotao,
                buttonText: 'Candidatar',
                buttonClass: lixoBotao,
            }
            
            newJobsData.push(objeto)
            
        })

    })
}

traduzirArraySelectedJobs(jobsData)

function renderizarCards (array) {
    const ulVagas = document.querySelector('.ul-vagas-page')
    ulVagas.innerHTML = ""
   
    array.forEach((elemento) => {


        const liVagas = document.createElement('li')
        liVagas.setAttribute('class', 'li-vagas-page')
        liVagas.id = elemento.id

        const divWhiteSquare = document.createElement('div')
        divWhiteSquare.setAttribute('class', 'white-square-vagas')
        liVagas.appendChild(divWhiteSquare)

        const h2VagasTitle = document.createElement('h2')
        h2VagasTitle.setAttribute('class', 'h2-vagas-title')
        h2VagasTitle.innerText = elemento.title

        const divInstituicaoLocal = document.createElement('div')
        divInstituicaoLocal.setAttribute('class', 'div-instituicao-local')
        const pInstituicao = document.createElement('p')
        pInstituicao.setAttribute('class', 'p-instituicao')
        pInstituicao.innerText = elemento.enterprise
        const pLocal = document.createElement('p')
        pLocal.setAttribute('class', 'p-local')
        pLocal.innerText = elemento.location
        divInstituicaoLocal.append(pInstituicao, pLocal)

        const pText = document.createElement('p')
        pText.setAttribute('class', 'p-text')
        pText.innerText = elemento.description

        const divPBotao = document.createElement('div')
        divPBotao.setAttribute('class', 'p-botao')
        const tagTipoTrabalho = document.createElement('p')
        tagTipoTrabalho.setAttribute('class', 'tag-tipo-trabalho')
        tagTipoTrabalho.innerText = elemento.modalities

        const botaoCandidatar = document.createElement('button')
        botaoCandidatar.setAttribute('class', `botao-candidatar ${elemento.buttonClass}`)
        botaoCandidatar.innerText = elemento.buttonText
        botaoCandidatar.id = elemento.buttonID

        divPBotao.append(tagTipoTrabalho, botaoCandidatar)
        divWhiteSquare.append(h2VagasTitle, divInstituicaoLocal, pText, divPBotao)
        ulVagas.appendChild(liVagas)

    })



}
renderizarCards(newJobsData)



function candidatarEventoClick ( array) {
    let index 
    document.addEventListener('click', function (e) {
        const el = e.target 
        if (el.classList.contains('botao-candidatar')) {
            array.forEach((elemento) => {
                
                if (elemento.buttonID == el.id) {

                    index = array.indexOf(elemento)
                    
                    if (array[index].buttonText  == 'Candidatar' ) { 
                        array[index].buttonText = 'Remover Candidatura'
                        arrayAside.push(elemento) 
                        console.log(arrayAside)
                        renderizarArrayAside(arrayAside)// renderizar cards aside
                        
                    }
                    else {
                        array[index].buttonText = 'Candidatar' 
                        arrayAside = arrayAside.filter((objeto) => {
                            return objeto.buttonID != elemento.buttonID
                        })
                        console.log(arrayAside)
                        renderizarArrayAside(arrayAside)
                        
                    }
                    
                    renderizarCards(array)
                  
                   
                }
            })
        }  
    })
}
candidatarEventoClick(newJobsData)

function renderizarArrayAside (array) {
    console.log(array,'removendo objetos')
    const ulAside = document.querySelector('.ul-vagas-selecionadas')
    ulAside.innerHTML = ""
    
    if (array.length == 0) {

        const h3SemVagas = document.createElement('h3')
        h3SemVagas.setAttribute('class', 'sem-vagas')
        h3SemVagas.innerText = 'Você ainda não aplicou para nenhuma vaga'
        const imgOrnamento = document.createElement('img')
        imgOrnamento.setAttribute('class', 'ornamento')
        imgOrnamento.src = '/assets/img/ornamento.svg'
        ulAside.append(h3SemVagas, imgOrnamento)
    }
    else {
        array.forEach((objeto) => {


            const liVagasSelecionadas = document.createElement('li')
            liVagasSelecionadas.setAttribute('class', 'li-vagas-selecionadas')
            
            const divListaVagas = document.createElement('div')
            divListaVagas.setAttribute('class', 'li-lista-vagas')
            const h3VagasSelecionadas = document.createElement('h3')
            h3VagasSelecionadas.setAttribute('class', 'li-h3-vagas-selecionadas')
            h3VagasSelecionadas.innerText = objeto.title
            const divInstituicaoLocalAside = document.createElement('div')
            divInstituicaoLocalAside.setAttribute('class', 'li-instituicao-local')
            const instituicaoAside = document.createElement('p')
            instituicaoAside.setAttribute('class', 'instituicao')
            instituicaoAside.innerText = objeto.enterprise
            const localAside = document.createElement('p')
            localAside.setAttribute('class', 'local')
            localAside.innerText = objeto.location
    
            const botaoLixo = document.createElement('button')
            botaoLixo.setAttribute('class', `botao-lixo ${objeto.buttonClass}`)
            
            const imgLixo = document.createElement('img')
            imgLixo.setAttribute('class', `img-lixo ${objeto.buttonClass}`)
            imgLixo.src = '/assets/img/lixo.svg'
    
            ulAside.append(liVagasSelecionadas)
            liVagasSelecionadas.append(divListaVagas, botaoLixo)
            divListaVagas.append(h3VagasSelecionadas,divInstituicaoLocalAside)
            divInstituicaoLocalAside.append(instituicaoAside, localAside)
            botaoLixo.appendChild(imgLixo)
        })
    }
}
renderizarArrayAside(arrayAside)


function adicionarEventoBotaoLixo (array, array2) {

    document.addEventListener('click', function (e) {
        const el = e.target
        if (el.classList.contains('botao-lixo') || el.classList.contains('img-lixo')) {
            
            console.log(array)

            array.forEach((elemento) => {
             
                if (el.classList.contains(elemento.buttonClass)) {
                    
                    
                    
                    array = arrayAside.filter((objeto) => {
                        return objeto.buttonClass != elemento.buttonClass
                        
                    })
                    console.log(array)
                    arrayAside = array
                    renderizarArrayAside(arrayAside)  
                    

                    array2.forEach((obj) => {
                        if (el.classList.contains(obj.buttonClass)){
                          /*   console.log(obj)
                            console.log(obj.buttonClass) */
                            obj.buttonText = 'Candidatar'
                            
                            
                        }
                        renderizarCards(array2)
                    })
                } 
            })
        }
    })
}
adicionarEventoBotaoLixo(arrayAside, newJobsData)