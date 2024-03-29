checkbox = document.querySelector("#modelight")
checkexpand = document.querySelector("#expand")
divtitle = document.querySelector(".title")
img = divtitle.querySelector("img")

function expand(type){
    if (!localStorage.getItem("menu")){localStorage.setItem("menu", "on")}
    if (!type){type = localStorage.getItem("menu")}
    if (type == "on"){
        document.body.classList.remove("expandMenu")
        checkexpand.checked = false
        changeimgTitle(localStorage.getItem("mode"))
    }else if (type == "off"){
        document.body.classList.add("expandMenu")
        checkexpand.checked = true
        expandMenu = document.querySelector(".expandMenu")
        divtitle.querySelector("img")
        if (expandMenu) {
            img.src = "img/fiszpan_Z.png"
        }
    }
    localStorage.setItem("menu", type)
}
function mode(type){
    if (!localStorage.getItem("mode")){localStorage.setItem("mode", "light")}
    if (!type){type = localStorage.getItem("mode")}
    if (type == "light"){
        document.body.classList.remove("darkmode")
        checkbox.checked = false
        changeimgTitle(type)
    }else if (type == "dark"){
        document.body.classList.add("darkmode")
        checkbox.checked = true
        changeimgTitle(type)
    }
    localStorage.setItem("mode", type)
}
mode()
expand()

function changeimgTitle(type) {
    if (checkexpand.checked == false) {
        if (divtitle.querySelector("img")) {
            divtitle.querySelector("img").remove()
            changeimgTitle(type)
        } else {

            if (type == "light") {
                img.src = "img/fiszpanlight.png"

            } else if (type == "dark") {
                img.src = "img/fiszpandark.png"
            }

            divtitle.appendChild(img)
        }
    }
}

checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
        mode("dark")
    } else {
        mode("light")
    }
})
checkexpand.addEventListener("change", function() {
    if (checkexpand.checked) {
        expand("off")
    } else {
        expand("on")
    }
})


function datereturn(dat,hora){
    let data = new Date()
    let text = ""
    if (dat){
        if(data.getDate()<10){dia =  "0"+data.getDate()}else{dia = data.getDate()}
        if((data.getMonth()+1)<10){mes =  "0"+(data.getMonth()+1)}else{mes = (data.getMonth()+1)}
        text += dia
        text += "/"
        text += mes
        text += "/"
        text += data.getFullYear()
    }
    if (dat & hora){ text += " "}
    if (hora){
        if(data.getHours()<10){hour =  "0"+data.getHours()}else{hour = data.getHours()}
        if(data.getMinutes()<10){min =  "0"+data.getMinutes()}else{min = data.getMinutes()}
        if(data.getSeconds()<10){sec =  "0"+data.getSeconds()}else{sec = data.getSeconds()}
        text += hour
        text += ":"
        text += min
        text += ":"
        text += sec
    }
    return text
}
function checkPeriodo(check,time){
    if (time == true){time = new Date()}    
    let time2 =new Date(time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+ " " + check)
    let UTNOW = time.getTime()-time2.getTime()
    UTNOW = Math.floor(UTNOW/(1000*60))
    return UTNOW
}
async function diaGenerator(){
    const refresh = 300
    
    let menuactive = document.querySelector(".menuactive")
    if (menuactive){
        menuactive.classList.remove("menuactive")
    }
    let menuStatus = document.querySelector(".menuDia")
    menuStatus.classList.add("menuactive")
    let grid = document.querySelector(".grid")
    let box = grid.querySelector(".box")
    let dia = document.querySelector(".dia")

    const link = "https://api.fiszpan.com.br/parcial/teste/"
    if (box && !dia){
        box.remove()
        clear = async function(){
            box.remove()
            create = await diaGenerator()
        }
        clearInterval(interval)
        
    }else{
        localStorage.setItem("refreshTime",true)
        if (!dia){
            createbox = document.createElement("div")
            createbox.classList.add("box","shadown","dia")

            h3 = document.createElement("h3")
            h3.textContent = "Parcial Dia"

            h5 = document.createElement("h5")
            h5.textContent = "Ultima Atualização " + datereturn(true,true)
            
            divloading = document.createElement("div")
            divloading.classList.add("divloading")
            
            loading = document.createElement("div")
            loading.classList.add("loading")
            
            
            grid.appendChild(createbox)
            createbox.appendChild(h3)
            createbox.appendChild(h5)
            createbox.appendChild(divloading)
            divloading.appendChild(loading)
        }else{
            document.querySelector("h5").textContent = "Ultima Atualização " + datereturn(true,true)
        }
        fetch(link).then(result => result.json())
        .then((result) => {
            
                for (i=0;i<result.PCL.length;i++){
                    namefilial = result.PCL[i].FIL
                    if (namefilial == "RIO SUL"){namefilial = "RIO_SUL"}
                    checkfilial = document.querySelector("."+namefilial)
                    if (!dia && !checkfilial){
                        let filial = document.createElement("div")
                        let percent = document.createElement("div")
                        let progress = document.createElement("div")
                        let progressbar_loja = document.createElement("div")
                        let progressbar_valor = document.createElement("div")

                        namefilial = result.PCL[i].FIL
                        if (namefilial == "RIO SUL"){namefilial = "RIO_SUL"}
                        filial.classList.add(namefilial)

                        progressbar_loja.classList.add("progressbarloja")
                        progressbar_loja.textContent = result.PCL[i].FIL
                        progressbar_valor.classList.add("progressbarvalor")
                        progressbar_valor.textContent = result.PCL[i].TTL
                        percent.classList.add("percent")
                        progress.classList.add("progress")
                        progress.style.width = result.PCL[i].PRC + "%"
                        
                        if (i == 0){
                            createbox.appendChild(filial)
                        }else{
                            before = result.PCL[(i-1)].FIL
                            if (before == "RIO SUL"){before = "RIO_SUL"}
                            let beforeFilial = document.querySelector("."+before)
                            beforeFilial.parentNode.insertBefore(filial, createbox.beforeFilial)
                        }
                        filial.appendChild(progressbar_loja)
                        filial.appendChild(progressbar_valor)
                        filial.appendChild(percent)
                        percent.appendChild(progress) 

                        filial.appendChild(document.createElement("hr")) 
                        filial.appendChild(document.createElement("br")) 
                    }else if(checkfilial){
                        namefilial = result.PCL[i].FIL
                        if (namefilial == "RIO SUL"){namefilial = "RIO_SUL"}
                        let divFilial = document.querySelector("."+namefilial)
                        divFilial.querySelector(".progressbarvalor").textContent = result.PCL[i].TTL
                        divFilial.querySelector(".progress").style.width = result.PCL[i].PRC+ "%"
                    }
                }
                if (!dia){   
                    let TotalDia = document.createElement("div")
                    let progressbar_loja = document.createElement("div")
                    let progressbar_valor = document.createElement("div")
                    TotalDia.classList.add("TotalDia")
                        progressbar_loja.classList.add("progressbarloja")
                        progressbar_valor.classList.add("progressbarvalor")
    
                        progressbar_loja.textContent = "Total"
                        progressbar_valor.textContent = result.TTL
    
                        progressbar_valor.style.marginBottom = "30px"
                    createbox.appendChild(TotalDia)
                    TotalDia.appendChild(progressbar_loja)
                    TotalDia.appendChild(progressbar_valor)
                }else{
                    document.querySelector(".TotalDia>.progressbarvalor").textContent = result.TTL
                }
            loading.remove()
            interval  = setInterval(diaGenerator,refresh*1000)
        })
    } 
}
function statusGenerator(){
    localStorage.setItem("refreshMod", "status")
    const refresh = 300
    // Horarios de Fechamento das Lojas
    const horarios = []
        horarios["RIO SUL"] = ["22:00:00","22:00:00","21:00:00"]
        horarios["TIJUCA"] = ["18:30:00","16:30:00",null]
        horarios["CENTRO"] = ["18:00:00","14:00:00",null]
        horarios["BARRA"] = ["22:00:00","22:00:00","21:00:00"]
        horarios["COPACABANA"] = ["19:00:00","16:00:00",null]
        horarios["ECOMMERCE"] = ["18:18:00",null,null]
    
    let menuactive = document.querySelector(".menuactive")
    if (menuactive){
    menuactive.classList.remove("menuactive")
    }
    
    menuStatus = document.querySelector(".menuStatus")
    menuStatus.classList.add("menuactive")

    let grid = document.querySelector(".grid")
    let box = grid.querySelector(".box")
    
    const link = "https://api.fiszpan.com.br/parcial/teste/status"
    if (box){
        box.remove()
        statusGenerator()
        clearInterval(interval)
    }else{
        localStorage.setItem("refreshTime",true)
        createbox = document.createElement("div")
        createbox.classList.add("box","shadown","status")

        h3 = document.createElement("h3")
        h3.textContent = "Status Loja"

        h5 = document.createElement("h5")
        h5.textContent = datereturn(true,true)
        
        divloading = document.createElement("div")
        divloading.classList.add("divloading")
        loading = document.createElement("div")
        loading.classList.add("loading")
        
        table = document.createElement("table")
        
        grid.appendChild(createbox)
        createbox.appendChild(h3)
        createbox.appendChild(h5)
        createbox.appendChild(divloading)
        divloading.appendChild(loading)
        createbox.appendChild(table)

        fetch(link).then(result => result.json())
        .then((result) => {
            let array = [["","Loja","*CL*Valor","*CL*Ultimo Ticket","Status","Fechamento"]]
            for (i=0;i< result.length;i++){
                array[i+1]=[]
                array[i+1].push("*AB*"+"Abertura " + result[i].ABERTURA)
                array[i+1].push(result[i].FILIAL)
                array[i+1].push("*CL*R$ " + result[i].TOTAL)
                array[i+1].push("*CL*"+result[i].U_TICKET)
                let UT = 0
                let FC = 0
                let WD = 0
                let weekday = new Date().getDay()
                checkUS = checkPeriodo(result[i].U_STATUS,true)
                if (checkUS < 15){ UT = 1}
                else if(checkUS > 14 && checkUS < 30){UT = 2}
                else if(checkUS > 29){UT = 3}
                array[i+1].push("*US*"+UT+result[i].U_STATUS)
                if (weekday == 6){WD = 1}else if (weekday == 0){WD  = 2}
                checkFC = checkPeriodo(horarios[result[i].FILIAL][0],true)
                if (result[i].FECHAMENTO == null & checkFC > 0){
                    if(checkFC > 15 & checkFC < 30){
                        FC = 2
                    }else if(checkFC > 29){
                        FC = 3
                    }
                }
                if (result[i].FECHAMENTO != null){
                    FC = 1
                }
                array[i+1].push("*FC*"+FC+result[i].FECHAMENTO)
            }
            for (i=0;i< array.length;i++){
                tr = document.createElement("tr")
                table.appendChild(tr)
                for (j=0;j< array[i].length;j++){
                    td = document.createElement("td")
                    if (array[i][j].slice(0,4) == "*AB*"){
                        imgInfo = document.createElement("img")
                        imgInfo.classList.add("infoStatus")
                        imgInfo.src = "img/info.svg"
                        
                        imgInfo.title = array[i][j].slice(4)
                        
                        td.appendChild(imgInfo)
                    }
                    else if (array[i][j].slice(0,4) == "*US*"){
                        if (array[i][1] == "ECOMMERCE"){
                            td.classList.add("green") 
                        }else{
                            if (array[i][j].slice(4,5) == 1){
                                td.classList.add("green")  
                            }else if (array[i][j].slice(4,5) == 2){
                                td.classList.add("yellow")  
                            }else if (array[i][j].slice(4,5) == 3){
                                td.classList.add("red")  
                            }
                        }
                        td.title = array[i][j].slice(5)
                        td.textContent = "\u2B24"
                    }
                    else if (array[i][j].slice(0,4) == "*FC*"){
                       
                            if (array[i][j].slice(4,5) == 1){
                                td.classList.add("green")  
                            }else if (array[i][j].slice(4,5) == 2){
                                td.classList.add("yellow")  
                            }else if (array[i][j].slice(4,5) == 3){
                                td.classList.add("red")  
                            }
                        td.title = array[i][j].slice(5)
                        td.textContent = "\u2B24"
                    }
                    else if (array[i][j].slice(0,4) == "*CL*"){
                        td.textContent = array[i][j].slice(4)
                        td.classList.add("showmobile")
                    }
                    else{
                        td.textContent = array[i][j]
                    }
                    tr.style.columnWidth = "40px"
                    tr.appendChild(td)                    
                }
            }
            loading.remove()
            table.classList.remove("temp")
            interval  = setInterval(statusGenerator,refresh*1000)
        })
        
        createbox.appendChild(document.createElement("br"))       
    }
    
}
diaGenerator()