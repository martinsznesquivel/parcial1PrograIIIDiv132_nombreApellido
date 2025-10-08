//array de productos

const frutas = [
  { id: 1, nombre: "arandano", precio: 5000, ruta_img: "img/arandano.jpg" },
  { id: 2, nombre: "banana", precio: 1000, ruta_img: "img/banana.jpg" },
  { id: 3, nombre: "frambuesa", precio: 4000, ruta_img: "img/frambuesa.png" },
  { id: 4, nombre: "frutilla", precio: 3000, ruta_img: "img/frutilla.jpg" },
  { id: 5, nombre: "kiwi", precio: 2000, ruta_img: "img/kiwi.jpg" },
  { id: 6, nombre: "mandarina", precio: 800, ruta_img: "img/mandarina.jpg" },
  { id: 7, nombre: "manzana", precio: 1500, ruta_img: "img/manzana.jpg" },
  { id: 8, nombre: "naranja", precio: 9000, ruta_img: "img/naranja.jpg" },
  { id: 9, nombre: "pera", precio: 2500, ruta_img: "img/pera.jpg" },
  { id: 10, nombre: "anana", precio: 3000, ruta_img: "img/anana.jpg" },
  { id: 11, nombre: "pomelo-amarillo", precio: 2000, ruta_img: "img/pomelo-amarillo.jpg" },
  { id: 12, nombre: "pomelo-rojo", precio: 2000, ruta_img: "img/pomelo-rojo.jpg" },
  { id: 13, nombre: "sandia", precio: 3500, ruta_img: "img/sandia.jpg" }
  
];

//variables
let contenedorFrutas = document.querySelector("#contenedorFrutas");

let contenedorCarrito = document.querySelector("#contenedorCarrito");

let barraBusqueda = document.querySelector("#barraBusqueda");

let carrito = [];

/* Funcion MostrarProductos

- Para mostrar los productos en el html, esta funcion recibe por parametro un array.
Primero se declara un cartaProducto vacio para ir acumulando el html con las frutas del array.
Despues usamos un foreach sobre el array que le pasamos y lo que hace es recorrer y generarle a
cada fruta un bloque de codigo html para mostrar la imagen, nombre y precio que corresponda.
Ademas, a cada fruta le agrega un boton onclick para llamar a agregarCarrito.
Al final, se "sobreescribe", por asi decir, el innerhtml de contenedorFrutas por la cartaProducto actualizada 
*/

function mostrarProductos(array) {
  let cartaProducto = "";
  array.forEach((fruta) => {
    cartaProducto += `
            <div class="card-producto">
                <img src="${fruta.ruta_img}" alt="${fruta.nombre}" />
                <h3>${fruta.nombre}</h3>
                <p>$ ${fruta.precio}</p>
                <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
            </div> `;
  });
  contenedorFrutas.innerHTML = cartaProducto; 
}

barraBusqueda.addEventListener("keyup", () => {
    filtrarProductos();
});

/* Funcion filtrarProductos

- Para ir filtrando productos a medida que se escribe en la barrita de busqueda,
 primero declaro un valorBusqueda que va a leer y almacenar el texto que vamos
 escribiendo en la barra (barraBusqueda). Puse un toLowerCase para que no importe si escribo en
 mayusculas o minusculas.
 despues declaré productosFiltrados para no sobreescribir la lista original y use un
 filter para recorrer cada fruta y comparar su nombre con el valorBusqueda. Si el
 nombre de la fruta contiene el texto, se va a mostrar.

*/

function filtrarProductos(){
    let valorBusqueda = barraBusqueda.value.toLowerCase();

    console.log(valorBusqueda);

    let productosFiltrados = frutas.filter(f => f.nombre.toLowerCase().includes(valorBusqueda));

    mostrarProductos(productosFiltrados);
}

/* Funcion agregarACarrito

- Esta funcion es para agregar frutas al carrito.
  Con find lo que se hace es buscar que fruta coincide con el id que
  pasamos como parametro, osea, sobre la que clickeamos.
  Cuando la encuentre la agrega al carrito con push.
  despues de eso, llama a guardarCarrito() para actualizarlo y muestra
  el carrito con las frutas agregadas.
  Tambien muestra por consola el carrito con los cambios hechos y el
  id del producto que se agregó 
*/

function agregarACarrito(id){

    let frutaSeleccionada = frutas.find(f => f.id === id);

    carrito.push(frutaSeleccionada);

    guardarCarrito();

    console.log(carrito);

    console.log(`id del producto: ${id}`);

    mostrarCarrito();
}

/* Funcion MostrarCarrito 

- En esta funcion se trabaja sobre la parte del carrito para mostrar los productos.
  primero se crea una variable cartaCarrito y ponemos un titulo indicando que
  es el carrito. Tambien creamos la variable total inicializada en 0 que va a servir
  para calcular y mostrar el monto final del carrito.
  Primero hice un if para ver si el carrito está vacio. Si lo está se va a mostrar
  un mensaje que dice que el carrito está vacio, ademas de poner el total del carrito
  y cantidad de productos en 0.
  Si existe un carrito con productos:
  le agrego al carta carrito la apertura de un ul para crear una lista y cada li
  creado es un elemento de esa lista.
  con foreach recorremos cada producto del carrito y a cada uno de ellos
  le va a crear una estructura de codigo con sus datos y ademas un boton para
  eliminar, todo esto se ve en la pagina.
  cada boton tiene un onclick que llama a eliminarProducto y le pasa el indice
  a borrar.
  Luego al cartaCarrito que se definio antes se le agrega un boton para vaciar el
  carrito y se le pasa la funcion que lo hace.
  Tambien se le agrega a la carta el total de dinero que vale el carrito.
  Despues con innerhtml actualizamos el contenedorCarrito original para que
  cartaCarrito lo sobreescriba y puedan verse los cambios. Tambien se muestran por
  consola.
  Por ultimo con queryselector selecciono un elemento del html con id contadorCarrito para
  mostrar cuantos productos hay en el carrito.
*/

function mostrarCarrito(){

    let cartaCarrito = "<h2>Carrito</h2>";
    let total = 0;

    if(carrito.length === 0) {
        cartaCarrito += "<p>El carrito está vacío</p>";
        cartaCarrito += `<div class="total-contenedor">Total: $0</div>`;
        document.querySelector("#contadorCarrito").innerHTML = "Carrito: 0 productos";
        contenedorCarrito.innerHTML = cartaCarrito;
    return;
    }

    cartaCarrito += "<ul>";
    
    carrito.forEach((elemento, indice) => {
        total += elemento.precio;
        cartaCarrito +=
        `<li class="bloque-item">
            <p class="nombre-item">${elemento.nombre} - $ ${elemento.precio}</p>
            <button class="boton-eliminar" onclick="eliminarProducto(${indice})">Eliminar</button>
        </li>`
        
    });

    cartaCarrito += `</ul><button class ="boton-vaciar" onclick='vaciarCarrito()'> Vaciar carrito </button>`;

    cartaCarrito += `<div class="total-contenedor">Total: $${total}</div>`;

    contenedorCarrito.innerHTML = cartaCarrito;

    document.querySelector("#contadorCarrito").innerHTML = `Carrito: ${carrito.length} productos`;

    console.log(cartaCarrito);

    console.table(carrito);
}

/* Funcion eliminarProducto

- para eliminar productos se usa el metodo slice que es llamado por carrito.
  A ese metodo le pasamos un indice y la cantidad de productos a borrar, que
  va a ser una. Despues llamo a guardarCarrito y mostrarCarrito para que los 
  cambios queden registrados. Tambien mostramos por consola en una tabla los
  productos que hay en el carrito  
*/

function eliminarProducto(indice){

    carrito.splice(indice, 1);

    guardarCarrito();

    console.table(carrito);

    mostrarCarrito();
    
}

/* Funcion vaciarCarrito

- Solamente vacia el carrito y lo guarda. Le asigno un array vacio al carrito y elimina todo.
  lo que haya dentro. Despues llamo a guardarCarrito y mostrarCarrito para que se vean los cambios
  incluso despues de recargar la pagina
*/

function vaciarCarrito(){
    carrito = [];

    guardarCarrito();

    mostrarCarrito();
}

/* Funcion guardarCarrito

- Para poder guardar el carrito en el localstorage y no perder nada cuando recargue la pagina,
  cree esta funcion para no tener que repetir codigo en cualquier otro metodo que haga
  alguna modificacion en el carrito. Basicamente declaro una nueva variable carritoActualizado que
  guarda el resultado de usar json.stringify en el carrito. Esto es para transformar el carrito de un array
  a un string para que asi se guarde bien en el local storage (local storage solo acepta strings). 
  Despues lo guardé en el localStorage con setItem y le pasé "carrito", que es donde se va a guardar, y 
  carritoActualizado, que es el valor que quiero guardar
  
*/

function guardarCarrito(){

    let carritoActualizado = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoActualizado);
}

/* Funcion cargarCarrito

- Lo que hace esta funcion basicamente es buscar si hay algun carrito guardado en el localStorage.
Si la hay llama a json.parse para transformar de texto a objeto, basicamente lo que hace cargarcarrito
pero a la inversa, vuelve a su estado original para poder funcionar. Despues llamo a mostrar carrito para
justamente eso. 
*/

function cargarCarrito(){

    const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            mostrarCarrito();
    }
}


/* Funcion imprimirDatosAlumno

- Primero cree el objeto alumno y completé los datos con los mios.
- Para mostrarlo por consola llamé a console.log y dentro de los backticks hice referencia a ellos con ${}
- Para mostrarlo en el html use queryselector para buscar en html algun elemento que tenga de id nombreAlumno,
 despues llame a text content para actualizar el contenido que haya con el nombre y apellido.
*/

function imprimirDatosAlumno(){
    const alumno = {
        nombre : "Martin",
        apellido: "Esquivel",
        dni : 46703881
    }

    console.log(`Nombre: ${alumno.nombre}, apellido: ${alumno.apellido}, dni : ${alumno.dni}`);

    document.querySelector("#nombreAlumno").textContent = `${alumno.nombre} ${alumno.apellido}`;

}

/* Funcion ordenarPorNombre

- Para ordenar las frutas por nombre, primero se crea un array nombresOrdenados usando map, para
extraer solamente los nombres de las frutas. Despues uso sort sobre ese array creado para ordenarlos
de forma alfabetica ascendente.
Despues para que se muestren bien, uso map de nuevo sobre el array que se creo recien, pero en vez de
quedarnos con el nombre solamente, devuelve los objetos completos de frutas que coincidan con el nombre
ordenado.  Osea, find lo que hace acá es buscar en el array original "frutas" que fruta tiene un nombre que coincida 
con algun nombre de la lista nombreOrdenados y lo mete en el array frutasOrdenadas.
Despues se llama a mostrarProductos y le pasamos la nueva lista con las frutas Ordenadas
*/

function ordenarPorNombre(){

    const nombresOrdenados = frutas.map(fruta => fruta.nombre).sort();
    
    const frutasOrdenadas = nombresOrdenados.map(nombre => frutas.find(fruta => fruta.nombre === nombre));

    mostrarProductos(frutasOrdenadas);
}

/* Funcion ordenarPorPrecio 

- Como antes, declaramos frutasOrdenadasPorPrecio para crear un nuevo array para no modificar el original,
  se hace con slice, dejamos vacio los parametros para se copie toda la lista.
  Despues usamos sort en esa lista que creamos y dentro de ella, con una funcion flecha,
  comparamos el precio de una fruta a con el de una fruta b. Dependiendo el resultado es como se va a ordenar.
  Si da negativo, a va antes que b. Si da positivo, b va antes que a, y si da 0, no cambia el orden.
  Finalmente a mostrarProductos le pasamos frutasOrdenadas para verlo en orden.
*/

function ordenarPorPrecio() {
    const frutasOrdenadasPorPrecio = frutas.slice().sort((a, b) => a.precio - b.precio);
    mostrarProductos(frutasOrdenadasPorPrecio);
}


function init(){
    
    mostrarProductos(frutas);
    cargarCarrito();
    imprimirDatosAlumno();

}

init();



