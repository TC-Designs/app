// auth.js


// CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBUHpYxwb5AEsarbjI1HUARe881CuxXGaE",
  authDomain: "tc-designs-f9ed9.firebaseapp.com",
  projectId: "tc-designs-f9ed9",
  storageBucket: "tc-designs-f9ed9.firebasestorage.app",
  messagingSenderId: "938316691839",
  appId: "1:938316691839:web:db3c90e4fb791a4c6e024a",
  measurementId: "G-V1DM9EDGSV"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// MOSTRAR POPUP 1.5s DESPUÉS SI NO ESTÁ OCULTO
window.addEventListener("load", () => {
  const popup = document.getElementById("login-popup");
  const hideLoginPopup = localStorage.getItem("hideLoginPopup");

  auth.onAuthStateChanged((user) => {
    if (user) {
      document.body.classList.add("logged-in");
    } else {
      document.body.classList.remove("logged-in");
      if (!hideLoginPopup && popup) {
        setTimeout(() => {
          popup.style.display = "flex";
        }, 1500);
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ✅ BOTÓN DE INICIAR SESIÓN
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          alert("Sesión iniciada");
          document.getElementById("login-popup").style.display = "none";
        })
        .catch((error) => {
          alert("Error al iniciar sesión,\n" + "asegúrate de colocar los datos correctos");
        });
    });
  }

  // ✅ TACHITA Y NO VOLVER A MOSTRAR
  const closeBtn = document.getElementById("closeLoginPopup");
  const dontShowCheckbox = document.getElementById("dontShowAgain");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (dontShowCheckbox && dontShowCheckbox.checked) {
        localStorage.setItem("hideLoginPopup", "true");
      }
      document.getElementById("login-popup").style.display = "none";
    });
  }




  // ✅ REGISTRAR NUEVO USUARIO
  const registerBtn = document.getElementById("registerButton");
  if (registerBtn) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const name = document.getElementById("registerName").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const confirm = document.getElementById("confirmPassword").value;

      if (!name || !email || !password || !confirm) {
        alert("Completa todos los campos.");
        return;
      }

      if (password !== confirm) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert("Registro exitoso");
          window.location.href = "login.html";
        })
        .catch((error) => {
          alert("Error al registrar:\n" + error.message);
        });
    });
  }
});


// Verifica el estado de autenticación global
firebase.auth().onAuthStateChanged(user => {
  // Mostrar nombre en el navbar (desktop y móvil)
  if (user) {
    const username = user.displayName || "Usuario";
    const nameSpanDesktop = document.getElementById("navbar-username");
    const nameSpanMobile = document.getElementById("navbar-username-mobile");

    if (nameSpanDesktop) nameSpanDesktop.textContent = username;
    if (nameSpanMobile) nameSpanMobile.textContent = username;

    // Si estamos en cuenta.html, habilita el botón de cerrar sesión
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        firebase.auth().signOut().then(() => {
          window.location.href = "index.html";
        });
      });
    }

  } else {
    // Si el usuario no ha iniciado sesión y está en cuenta.html, lo redirige a registro
    if (window.location.pathname.includes("cuenta.html")) {
      window.location.href = "registro.html";
    }

    // Si está en otra página y le da click al icono de usuario, redirigir a registro
    const userIcons = document.querySelectorAll('.user-icon a, .user-info-mobile a');
    userIcons.forEach(icon => {
      icon.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "registro.html";
      });
    });
  }
});




document.getElementById("precio-total").textContent = "Costo total: $" + total;

document.addEventListener("DOMContentLoaded", () => {
    const openLoginLink = document.getElementById("openLoginFromRegister");
    if (openLoginLink) {
        openLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            // Mostrar el popup de login
            document.getElementById("loginPopup").style.display = "block";

            // Si quieres quitar el checkbox de "No volver a mostrar"
            const checkbox = document.querySelector("#loginPopup #noVolverMostrar");
            if (checkbox) {
                checkbox.parentElement.style.display = "none";
            }
        });
    }
});
