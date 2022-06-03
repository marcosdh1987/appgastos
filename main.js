var nombres = ["Hosteria (Marcos)", "Hotel (Marcos)"];
var montos = [4500, 9000];
var total = 0;

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
    var totalM = document.getElementById("total");
    totalM.innerHTML = `
    <div class="flex-item">
    <p> El total gastado fue: ${total} </p>
    <p>Cada uno debe pagar: ${apagar}</p>
    <p>Dividiendo entre: ${cantidad} personas</p>
    </div>    
    `;

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

