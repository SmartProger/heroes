const select = document.querySelector("select");
let allHeroes = [];

const getHeroes = async () => {
  try {
    const response = await fetch("dbHeroes.json");
    allHeroes = await response.json();

    render(allHeroes);
  } catch (error) {
    alert("Не удалось получить список героев!", error.message);
  }
};

const render = (heroes) => {
  const cardsContainer = document.querySelector(".container");
  cardsContainer.innerHTML = "";

  heroes.forEach((hero) => {
    cardsContainer.innerHTML += `
		<div class="card">
			<img src="${hero.photo}" class="img" alt="Герой">
			<div class="card-content">
				<h2 class="hero-name">${hero.name}</h2>
		${
      hero.realName
        ? `<p class="hero-real-name"><strong>Настоящее имя:</strong> ${hero.realName}</p>`
        : ""
    }
		${
      hero.movies
        ? `<div class="hero-movies">
				<strong>Фильмы:</strong>
				<ul>
					${hero.movies.map((movie) => `<li>${movie}</li>`).join("")}
				</ul>
			</div>`
        : ""
    } 
	  <div class="${hero.status == "alive" ? "status-alive" : "status-dead"}">Статус: ${hero.status == "alive" ? "жив" : "мертв"}</div>
			</div>
		</div>`;
  });
};

getHeroes();

select.addEventListener("change", () => {
  if (select.selectedIndex === 0) {
    render(allHeroes);
  } else if (select.selectedIndex === 1) {
    const females = allHeroes.filter((hero) => hero.gender === "female");
    render(females);
  } else if (select.selectedIndex === 2) {
    const alive = allHeroes.filter((hero) => hero.status === "alive");
    render(alive);
  }
});
