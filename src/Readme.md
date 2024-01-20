Iván De oli

Proyecto de React JS - Coderhouse - 2024

btt-store

Back to the Store es una página que simula un e-commerce como puede ser Mercado Libre, Ebay, Amazon, etc.

La idea original era darle un diseño en referencia a Back to the Future, como usar shadows de color celeste simulando neon o la tipografía.
En cuanto a la funcionalidad, tiene una página principal que agrupa todos los productos y 3 categorias diferente sen la parte del navbar, están listados por un map en el componente ItemList y la información de los productos vienen de un Firestore de Firebase. Luego el componente ItemDetail se encarga de mostrar los detalles del producto junto a un contador para agregar productos al carrito, una vista previa del carrito, una imagen que se puede ampliar y un boton para agregar a la WishList.
El Cart y la WishList funcionan igual, ambos usan un contexto para agregar el item seleccionado al cart o a la wishlist, dentro de ambas se listan los productos que muestran su información y son clickeables para ir al producto en cuestión. En el Cart tiene de adicional 3 botones, uno para eliminar un item en específico del carrito, otro para vaciar todo el carrito y otro para finalizar la compra que te redirecciona al componente Checkout para ingresar datos de la compra. Todas estas funciones las brinda el contexto de Cart.
El componente Checkout tiene un formulario para rellenar con información personal para la entregar el producto, consume una api del gobierno con las provincias y localidades del país, verificación de doble email y te envía al componente Brief cuando se finaliza. Este componente crea un objeto en la colección Orders de Firestore al finalizar el cuestionario. El componente Brief trae esa información de Firestore junto a su Id y la detalla en un resumen de compra, además es posible copiar el código para buscar en la base de datos alguna compra que hayamos realizado, de esto se encarga el componente Orders.
Por último cuenta con 2 componentes similares, Login y SignUp, ambos usan el servicio de autenticación de Firebase para poder crear una cuenta y poder loguearse, ambos componentes te redirigen al componente Profile una vez estés logueado.
En adicional se encuentra linkeado al Footer el componente de la PokeApi, está a modo de relleno.

Dependencias npm extras:

"formik": "^2.4.5", --> Para la construcción de formularios.
"react-responsive-carousel": "^3.2.23", --> Para implementar un carousel que aún no está implementado.
"react-tooltip": "^5.25.2", --> Para proporcionar mensajes de información (Orders.jsx).
"sweetalert2": "^11.6.13" --> Para dar feedback al user.