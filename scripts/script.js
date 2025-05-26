//Поле с модальными окнами
const modal = document.getElementById("authModal");
//Форма входа
const loginForm = document.getElementById("loginForm");
//Форма регистрации
const registerForm = document.getElementById("registerForm");

//Реагирование на кнопку "Вход/Регистрация"
document.querySelector(".auth-container").onclick = () => {
  console.log("Клик по кнопке входа/регистрации");
  modal.style.display = "flex";
  loginForm.style.display = "flex";
  registerForm.style.display = "none";
};

//Смена форма на регистрацию
function switchToRegister() {
  loginForm.style.display = "none";
  registerForm.style.display = "flex";
}

//Смена форма на вход
function switchToLogin() {
  registerForm.style.display = "none";
  loginForm.style.display = "flex";
}

//Проверка на тип открытой формы
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

//Раскрытие навигационного меню
document.querySelector(".nav-button").addEventListener("click", function () {
  document.getElementById("nav-menu").classList.toggle("active");
});

const cityFilter = document.getElementById("city-filter");
const psychologistCards = document.querySelectorAll(".psychologist-card");

//Фильтрация городов
function filterPsychologistsByCity(city) {
  psychologistCards.forEach((card) => {
    const match = city === "all" || card.dataset.city === city;
    if (match) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

//Выбор города
cityFilter?.addEventListener("change", (e) => {
  const selectedCity = e.target.value;
  filterPsychologistsByCity(selectedCity);
  console.log("Выбран город:", selectedCity);
});

//Получаем все заголовки
const namesArray = Array.from(
  document.querySelectorAll(".psychologist-card h3")
).map((el) => el.textContent);

//Выводим массив в консоль
console.log("Список психологов:", namesArray);

//Показ кнопки "Наверх"
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//Контейнер с центрами
const container = document.querySelector(".centers-container");

//Отрисовка
fetch("data.json")
  .then(response => response.json())
  .then(centers => {
    centers.forEach(center => {
      const card = document.createElement("div");
      card.className = "center-card";
      card.innerHTML = `
        <h3>${center.name}</h3>
        <p><strong>Адрес:</strong> ${center.address}</p>
        <p><strong>Контакты:</strong> ${center.phone}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Ошибка загрузки данных:", error);
  });

//Скрытие предзагрузчика
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 1000); // 1 секунда
});

window.addEventListener("DOMContentLoaded", () => {
  new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});

document.querySelector('#registerForm button:not(.switch)').addEventListener('click', () => {
  const name = registerForm.querySelector('input[placeholder="Имя, фамилия"]').value;
  const email = registerForm.querySelector('input[placeholder="Почта"]').value;
  const password = registerForm.querySelector('input[placeholder="Придумайте пароль"]').value;
  
//Сохраняем в LocalStorage
  const user = { name, email, password };
  localStorage.setItem('user', JSON.stringify(user));
  alert('Регистрация успешна! Теперь войдите.');
  switchToLogin();
});

document.querySelector('#loginForm button:not(.switch)').addEventListener('click', () => {
  const email = loginForm.querySelector('input[placeholder="Почта"]').value;
  const password = loginForm.querySelector('input[placeholder="Пароль"]').value;

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    alert(`Добро пожаловать, ${storedUser.name}!`);
    modal.style.display = 'none';
  } else {
    alert('Неверные данные. Проверьте почту и пароль.');
  }
});
