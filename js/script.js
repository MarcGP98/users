const listaUsuarios = document.getElementById("listaUsuarios");

function getRandomAge(min = 18, max = 65) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function cargarUsuarios() {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    const datos = await respuesta.json();

    const usuariosConExtras = datos.map((usuario) => {
      const {
        id,
        name,
        username,
        phone,
        email,
        company,
        address
      } = usuario;

    
      const { street, suite, city } = address;

      const age = getRandomAge();
      const img = `./assets/img/${id}.jpeg`;
      const addressText = `${street}, ${suite}, ${city}`;

      return {
        ...usuario,      
        age,             
        img,             
        addressText     
      };
    });

    pintarUsuarios(usuariosConExtras);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    listaUsuarios.innerHTML = "<li>Hubo un error al cargar los usuarios.</li>";
  }
}

function pintarUsuarios(usuarios) {
  listaUsuarios.innerHTML = "";

  usuarios.forEach((usuario) => {
    const {
      name,
      username,
      age,
      img,
      phone,
      email,
      company,
      addressText
    } = usuario;

    const li = document.createElement("li");
    li.classList.add("usuario-item");

    li.innerHTML = `
      <article class="usuario-card">
        <img src="${img}" alt="Foto de ${name}" class="usuario-img">

        <div class="usuario-info">
          <h2>${name} <span>(${username})</span></h2>
          <p><strong>Edad:</strong> ${age} años</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Empresa:</strong> ${company?.name ?? "—"}</p>
          <p><strong>Dirección:</strong> ${addressText}</p>
        </div>
      </article>
    `;

    listaUsuarios.appendChild(li);
  });
}

cargarUsuarios();