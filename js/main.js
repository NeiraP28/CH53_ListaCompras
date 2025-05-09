//tenemos que validar el que el campo de nombre sea un string y cantidad sea numero 
// en inspeccionar por demos seleccionar el elemento y ver como se llama en el index 
//buscarlo en el index y hacer la variable que obtendra el dato con let txtName =document, getelementebyid ("name"); 
//validad el elemento dela cantidad con Number : let txtNumber = getelementebyid ("name");

let txtName = document.getElementById("Name"); //nombre 
let txtNumber = document.getElementById("Number"); //cantidad
let btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
let tablaListaCompras = document.getElementById("tablaListaCompras");
//tablaListaCompras es el id de la tabla, con el get decimos que queremos obtener de esa etiqueta el tbody
//que es el cuerpo de la tabla para poder agregar elementos en ella, tag Name solo arroja arrays
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //el item 0 es para que agarre la primera tabla por si hubiera mas 

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const totalPrecio = document.getElementById("totalPrecio");

//Numeración de la primera columna de la tabla, 
let cont = 0; 
let costoTotal = 0;
let totalEnProductos = 0; 
let datos = new Array(); //[] almacena los elemtos de la tabla 




//funcion para validar la cantidad 
function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    }//length<=0
    

    //este metodo (NaN no es un numero significa) es para ver si esta ingresando un numero 
if(isNaN(txtNumber.value)){
    return false;
    
    
}//isNaN

//number es un constructor 
if(Number(txtNumber.value)<=0){
    return false;
}// mayor de 0 



return true; 


   
}//validar cantidad

function getPrecio(){
    return Math.round((Math.random()*10000)) / 100;
}//getPrecio

//agregar la oreja 
// btnAgregar es el nombre del boton, el evento es el click , txtName que es donde se almaceno el valor del input 
// hacemos referencia al valor capturado le decimos que a ese mismo valor le quite los espacios con el trim. 
 btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
//Bandera, al ser true permite agregar los datos a la tabla
let isValid = true;// esta variable significa que se pusieron todos los campos correctos
   
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    //validar que el nombre tenga 3 letras, se debe incluir el valor y la longitud
    if(txtName.value.length < 3){ 
        //ponemos borde con style y los pixeles para el grosor del borde 
        txtName.style.border = "solid 3px red";
        //revisar el alert y  ponerlo en block , primero hay que definir la variable arriba pegando el nombre del id 
        //strong es para poner en negritas 
    alertValidacionesTexto.innerHTML = "<strong> El nombre del producto no es valido. </strong>";
    alertValidaciones.style.display = "block"; //esto es para mostrar el contenedor
    isValid = false; //significa que no paso la validacion
}//length>=3

    if(! validarCantidad()){
        txtNumber.style.border = "solid 3px red";
        //se agrega +=por que quiere que aparezcan que la cantidad esta mal y el nombre 
        alertValidacionesTexto.innerHTML += "<br/><strong> La cantidad no es correcta. </strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }//validarCantidad

    if(isValid){//si paso las validaciones
       cont++; //para que repita el ciclo cada que se agrega un producto 
       let precio =getPrecio(); //ultima columna que se saca del index
       //etiqueta tr es para el renglón, td es para columna
       let row = `<tr> 
                   <td>${cont}</td>
                   <td>${txtName.value}</td>
                   <td>${txtNumber.value}</td>
                   <td>${precio}</td>
                   </tr>`;

       let elemento = { //se crea el objeto para enviarlo al localStorage en una variable nueva, o un objeto 
                      "cont"    : cont,
                      "nombre"  : txtName.value,
                      "cantidad": txtNumber,
                      "precio"  : precio
                      };   
      datos.push(elemento);//se mandan los datos al arreglo de la variable datos 

      //se envian al localStorage, con el nombre que seria "datos" y el formato string con JSON y convertido con el método 
      localStorage.setItem("datos", JSON.stringify(datos));
         //al final se llama a la tabla y se le insertan los valores en beforeend que es la posicion           
      
         
     
         
                  cuerpoTabla.insertAdjacentHTML("beforeend", row);
                   costoTotal += precio * Number(txtNumber.value);
                   precioTotal.innerText = "$" + costoTotal.toFixed(2);
                  totalEnProductos += Number(txtNumber.value);
                  productosTotal.innerText = totalEnProductos;
                   contadorProductos.innerText = cont; //reutiliza la variable, hace que se vea el numero de
                   //productos que ha agregado en la tabla 
                   
 
                   let resumen = { //esto se manda a un objeto y la tabla a un arreglo 
                    "cont"  : cont,
         "totalEnProductos" : totalEnProductos,
         " costoTotal"      :  costoTotal
                   };
      localStorage.setItem("resumen", JSON.stringify(resumen));
   
                   txtName.value = "";//limpia los campos 
                   txtNumber.value = "";
                   txtName.focus(); //agrega el foco nuevamente en el input que queremos 
                   
    }//isValid

 });//btnAgregar 

 //////
 //botón para limpiar todo 

 btnClear.addEventListener("click", function(event){
    event.preventDefault();

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";
    cuerpoTabla.innerHTML = "";
    productosTotal.innerText = "";
    contadorProductos.innerText = "";
    precioTotal.innerText = "";
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
 });
/////


 window.addEventListener("load", function(event){
    event.preventDefault();
     if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
     }; // datos != null 

     datos.forEach((d) =>{
        let row = `<tr>
                  <td>${d.cont}</td>
                  <td>${d.nombre}</td>
                  <td>${d.cantidad}</td>
                  <td>${d.getPrecio}</td>
                  </tr>`;
cuerpoTabla.insertAdjacentElement("beforeend", row);
     });


     if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
     costoTotal = resumen.costoTotal;
     totalEnProductos = resumen.totalEnProductos;
     cont = resumen.cont;
     } //resumen != null 
     precioTotal.innerText = "$" + costoTotal.toFixed(2);
     productosTotal.innerText = totalEnProductos;
     contadorProductos.innerText = cont;

 });//window.addEventListener load 


 //Agregar la funcionalidad del botón "Limpiar todo"
 //resumen
 //tabla
 //campos
 //alerta
 //localStorage (resumen y datos)

