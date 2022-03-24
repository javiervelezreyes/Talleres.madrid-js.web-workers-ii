#Trabajando con Web Workers II


### Keywords

Programación Concurrente · JavaScript · Web Workers · Mecanismos & Técnicas de Programación

### Resumen

La aparición de Web Workers dentro dentro de la Web habilita la posibilidad de crear 
aplicaciones más potentes y eficaces de lo que venia siendo hasta la fecha. Cada
worker se enhebra en un nuevo hilo de programación independiente y ello permite
evolucionar JavaScript desde un entorno de ejecución monohilo a uno de ataque
concurrente donde múltiples actores cooperan y compiten en ejecución.

Pero estas ventajas también conllevan un aumento en la complejidad de soluciones.
Ahora, en escenarios concurrentes no solamente es preciso ocuparse de la lógica del
problema sino también aquella referida a la sincronización de los trabajadores
operando en simultaneidad para garantizar las propiedades de seguridad y vivacidad
necesarias.

A lo largo de esta charla abordaremos estas preocupaciones y discutiremos como se
diseñan adecuadamente programas concurrentes mediante Web Workers. Revisaremos los
principios fundamentales de este paradigma y detallaremos con ejemplos en vivo los
diferentes modelos de programación concurrente. En concreto veremos:

- Modelo Concurrente Basado en Cerrojos
- Modelo Concurrente Basado en Semáforos
- Modelo Concurrente Basado en Monitores
- Modelo Concurrente Basado en Canales

Todos estos temas se abordan en ficheros de ejemplo dentro de la carpeta
`code/`. Para facilitar la realización y autoevaluación, el material de este taller se ha dividido en dos carpetas. En  `code/problems` puede encontrarse una descripción de cada ejercicio planteado junto con una plantilla de código que ayuda a escribir la solución y probarla. En la carpeta `code/solutions` se ofrece una propuesta de solución para cada ejercicio planteado. Se anima al lector a no consultar la solución hasta haber intentando cada ejercicio por si mismo.

### Biografía

Doctor en Informática por la Universidad Nacional de Educación a Distancia desde 2009 actualmente trabajo en Arquitecturas de Canal y Experiencia de Cliente. Mis actividades profesionales las compagino con tareas de mentoring y evengelización tecnológica.

### Tags
- Desarrollado Front/Back
- Evangelización Web
- Arquitectura Software
- Formación & Consultoría IT
- e-learning
- Diseño de Sistemas de Colaboración
- Learning Analytics
- Gamificación Colaborativa


### Contacto

- eMail: javier.velez.reyes@gmail.com
- Twitter: @javiervelezreye
- LinkedIn: inkedin.com/in/javiervelezreyes
- Slideshare: jvelez77
- Github: javiervelezreyes
- Youtube: youtube.com/user/javiervelezreyes
