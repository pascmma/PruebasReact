
const fs = require("fs");
const { arch } = require("os");


// 1 Funcion que muestra las consultas del area que ingreso
// Esto debe cargarase despues del login.

function devolverConsultas(area){
    const archivo = require('./prueba2.json');
    if(area === "Administrador"){
        const vector = []
        archivo.map(item =>{
            vector.push(item.name)
        })
        
        console.log("El filtro de las cosnultas por el area ",vector )    
        return vector
        
    }
    const filtro = archivo.filter(item=>{
       return item.area === area
    })

    //console.log("El filtro de las cosnultas por el area ",filtro )
    const vector = []
    filtro.map(item=>{
        vector.push(item.name)
    })
    console.log("El filtro de las cosnultas por el area ",vector )
    return vector;
}






// Devolver los campos para los parametros de la consulta
// Agregar la parte de admisnitrador para que pueda realizar todas las consultas que se requiera

function calcularParametrosNombre(nConsulta){
    const archivo = require('./prueba2.json');
    const filtro = archivo.filter(item=>{
        return item.name === nConsulta
    });
    const vector = []

    vector.push(filtro[0].params.length)
    //console.log("filtro ",filtro[0].params)

    filtro[0].params.map(item=>{
        vector.push(item.text)
    })
    console.log("resultado ", vector)
    return vector;

//    console.log("La consulta consultada ",filtro)
}

//  Consulta con los parametros enviados

function parametrosDeConsulta(consulta){
    const archivo = require('./prueba2.json');
    const filtro = archivo.filter(item =>{
        return item.name === consulta[0]
    })
    const temp = consulta.slice(1)
    
    //console.log("consulta ", consulta.slice(1)[1])
    filtro[0].params.map((item,index)=>{
        item.value = temp[index]
        item.name = "parametro"+ index
    })
    const result = []
    result.push(filtro[0].proce)
    result.push(filtro[0].params)
    
    console.log("resultado ", result)
    // el retorno de esta funcion es un objeto con los parametros de la funcion.

}

// 

// funcion para agregar los parametros en la nueva consulta

function pruebaAgregarParametros(parametros){
    //[ nombre, tipo, valor, texto ]
    let formato1 = {"name":"","type":"","value":"","text":""};
    let result= [];
    const array = Object.keys(formato1)
    for(let i =0;i<parametros.length;i++){
        let formato = {"name":"","type":"","value":"","text":""};
        for(let j=1;j<array.length;j=j+2){
            formato[array[j]] = parametros[i][j]
        }
        result.push(formato)
    }
    //console.log("Resultado final " , result)
    return result;
}


//    id ,area, name, proce, params[]
// Funcion para agregar la consulta pero solo si lo realiza el administrador 

function nuevoAgregarConsulta(consulta){

    let archivo = require('./prueba2.json');
    const iden = archivo.length
    let obj = {"id":"","area":"","name":"","proce":"","params":[]};
    const elarray = Object.keys(obj);
    consulta[0] = iden;
    elarray.map((item, index)=>( 

        obj[item] = consulta[index]
    ))
    obj["param"] = pruebaAgregarParametros(consulta[4])
    //console.log("La consulta en modo JSON ", obj)
    archivo.push(obj);
    const archivoString = JSON.stringify(archivo);
    fs.writeFile('./prueba2.json',archivoString, err=>{
        if(err) {console.log("Error al escribir ", err)}
        else {console.log("Se escribio correctamente ")}
    })
}

// Funciones de DELETE o UPDATE
function eliminarConsulta(nConsulta){
    let archivo = require('./prueba2.json');
    const filtrado  = archivo.filter(item=>{
        return item.name === nConsulta
    })
    const filtro = archivo.filter(item=>{
        return item.name !== nConsulta
    })
    const idEliminar = filtrado[0].id;

    console.log("Consulta para eliminar : ",filtrado )
    console.log("Archivo sin el que se elimina : ",filtro )
    console.log("Numero de queries ", archivo.length)
    if(archivo.length -1 === idEliminar){
      //  console.log("Retorna el archivo sin el ultimo elemento ", filtro)
        const archivoString = JSON.stringify(filtro);
        fs.writeFile('./prueba.json', archivoString,err =>{
            if(err) {console.log("Error al escribir ", err)}
            else{console.log("Se gurado correctamente")}
        })
        return ;
    }
    else if (idEliminar === 0){
        for(let i=0;i<filtro.length;i++){
            filtro[i].id = i;
        }
        //console.log("Retorna el archivo sin el primer elemento ", filtro )
        const archivoString = JSON.stringify(filtro);
        fs.writeFile('./prueba.json', archivoString,err =>{
            if(err) {console.log("Error al escribir ", err)}
            else{console.log("Se gurado correctamente")}
        })
    }
    else{
        for(let i=0;i<filtro.length;i++){
            if(filtro[i].id < idEliminar){

            }
            else{
                filtro[i].id = i
            }
        
        }
        const archivoString = JSON.stringify(filtro);
        fs.writeFile('./prueba.json', archivoString,err =>{
            if(err) {console.log("Error al escribir ", err)}
            else{console.log("Se gurado correctamente")}
        })
       // console.log("Retorna el archivo sin un elemento mediano ", filtro )
    }
}

// Main

// Formato para la creacion de una nueva consulta
const pruebas = [0,"Contabilidad","consulta3","procedimiento3",[
    ["nombre1","tipo1","valor1","texto1"],
    ["nombre2","tipo2","valor2","texto2"],
    ["nombre3","tipo3","valor3","texto3"],
    ["nombre4","tipo4","valor4","texto4"]
]];
const pruebaCons = ["consulta3",12,"AC",13,"MA"]

//console.log("Vuleta a leer del archivo ", archivo)
//nuevoAgregarConsulta(pruebas)
const archivo = require("./prueba2.json");
//console.log("El valor de el archivo modificado", archivo[4])
//devolverConsultas("Administrador")
//calcularParametrosNombre("contab val")
//parametrosDeConsulta(pruebaCons)

eliminarConsulta("Geren val") 

