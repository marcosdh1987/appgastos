var nombres = [];
var montos = [];
var total = 0;
var restante = [];

function Calcular(){
    total = 0;
    apagar = 0;
    for(let i=0; i < montos.length; i++){
        total += parseFloat(montos[i]);
    }
    apagar = parseFloat(total/montos.length).toFixed(2);
    var totalM = document.getElementById("total");
    totalM.innerHTML = `
    <div class="flex-item">
    <p> El total gastado fue: ${total} </p>
    </div>    
    `;
    document.getElementById("cantidad").value = 1;

}

function Recalcular(cantidad){
    total = 0;
    apagar = 0;
    for(let i=0; i < montos.length; i++){
        total += parseFloat(montos[i]);
    }
    apagar = parseFloat(total/cantidad).toFixed(2);
    for(let i=0; i < montos.length; i++){
        restante[i] = parseFloat(apagar - montos[i]).toFixed(2);
        console.log(restante[i]);
    }
    var totalM = document.getElementById("total");
    totalM.innerHTML = `
    <div class="flex-item">
    <p> El total gastado fue: ${total} </p>
    <p>Dividiendo entre: ${cantidad} personas</p>
    <p>Cada uno debe pagar: ${apagar}</p>
    </div>    
    `;

    var detalle = document.getElementById("detalle");
    detalle.innerHTML = "";

    for (let i = 0; i < restante.length; i++){
        console.log(restante[i]);
        console.log(nombres[i]);
        detalle.innerHTML += `
        <div class="flex-item">
        <p>${nombres[i]} le queda pagar: ${restante[i]}</p>
        </div>
        `;}
}

function Agregar(nombre, monto){
    //monto = parseFloat(monto);
    console.log(monto);
    if (monto == "" || nombre == "") {
        alert("Ingrese todos los datos");
    }
    else{
        AgregarNuevo(nombre, monto);
    }
}

function AgregarNuevo(nombre, monto){
    nombres.push(nombre);
    montos.push(monto);
    Imprimir();
    Calcular();
    document.getElementById("nombre").value = "";
    document.getElementById("monto").value = "";
}

function BorrarUno(){
    let name = prompt("Ingrese nombre a borrar");
    if (name == ""){
        alert("Ingrese nombre");
    }
    else{
    let indice = nombres.indexOf(name);
    if (indice == -1){
        alert("No hay mas datos para borrar");
    }else{
    nombres.splice(indice, 1);
    montos.splice(indice,1);
    Imprimir();
    Calcular();
    }}
}

function Imprimir(){
    let nuevo = document.getElementById("datos");
    nuevo.innerHTML = "";
    for (let i = 0; i < montos.length; i++){
        nuevo.innerHTML += `
        <div class="flex-item">
        <p>${nombres[i]} gasto: ${montos[i]}</p>
        </div>
    `;
    }
}

function Descargar() {
    let datos = [];
    for (let i = 0; i < montos.length; i++){
        datos.push({"nombre":nombres[i] ,"monto":montos[i]});
    };
    let json = JSON.stringify(datos);
    let blob = new Blob([json], {type: "application/json"});
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = "datos.json";
    link.click();
}

function Leer() {
    //let input = document.getElementById("info");
    fetch("datos.json")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++){
                AgregarNuevo(data[i].nombre, data[i].monto);
            }
            });
}
