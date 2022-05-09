let newsArray = [];
getNews();
let categoryArray = [];
getCategory();

async function getCategory() {
  const response = await fetch("http://24api.ru/rest-news-category/");
  categoryArray = await response.json();
  let filterSelect = document.querySelector("#selectFilter");
  let createSelect = document.querySelector("#selectCreate");
  for (let i = 0; i < categoryArray.length; i++) {
    let el = document.createElement("option");
    el.textContent = categoryArray[i].name;
    el.value = categoryArray[i].id;
    filterSelect.appendChild(el);
  }
  for (let i = 0; i < categoryArray.length; i++) {
    let el = document.createElement("option");
    el.textContent = categoryArray[i].name;
    el.value = categoryArray[i].id;
    createSelect.appendChild(el);
  }
  return categoryArray;
}

async function getNews() {
  const response = await fetch("http://24api.ru/rest-news/");
  newsArray = await response.json();
  output(newsArray);
  return newsArray;
}

function output(array) {
  document.querySelector(".container").innerHTML = "";
  for (let index = 0; index < array.length; index++) {
    let newsBlock = document.createElement("div");
    document.querySelector(".container").insertAdjacentHTML(
      "afterbegin",
      `
      <div class=news-block>
      <div class="title">${array[index].title}</div>
    <div class="description">${array[index].body}</div>
    </div>
    `
    );
  }
}

document.querySelector("#selectFilter").addEventListener("change", filter);
function filter() {
  let category = document.querySelector("select").value;
  if (!(category == 0)) {
    filterNewsArray = newsArray.filter(
      (element) => element.category_id == category
    );

    output(filterNewsArray);
  } else output(newsArray);
}

async function createNews() {
  const data = {
    title: document.querySelector("#inputTittle").value,
    body: document.querySelector("#inputDescription").value,
    category_id: +document.querySelector("#selectCreate").value,
  };
  console.log(data);
  const response = await fetch("http://24api.ru/rest-news", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  output(newsArray);
  return await response.json();
}

document.querySelector("button").addEventListener("click", createNews);
