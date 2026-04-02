const produtos = [
  { nome: "RTX 3060", categoria: "Hardware", imagem: "imagens/rtx3060.jpg", preco: 2500 },
  { nome: "Ryzen 5", categoria: "Hardware", imagem: "imagens/ryzen5.jpg", preco: 1200 },
  { nome: "Cadeira Gamer", categoria: "Cadeiras", imagem: "imagens/cadeira.jpg", preco: 800 },
  { nome: "Mouse Gamer", categoria: "Periféricos", imagem: "imagens/mouse.jpg", preco: 150 }
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function renderProdutos() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const filtro = document.getElementById("filtro").value;
  const lista = document.getElementById("listaProdutos");

  lista.innerHTML = "";

  if (filtro === "") {
    lista.innerHTML = "<p>Selecione uma categoria</p>";
    return;
  }

  const filtrados = produtos.filter(p =>
    p.categoria === filtro &&
    p.nome.toLowerCase().includes(busca)
  );

  filtrados.forEach(p => {
    lista.innerHTML += `
      <div class="produto">
        <img src="${p.imagem}">
        <h3>${p.nome}</h3>
        <p class="preco">R$ ${p.preco}</p>
        <button onclick="addCarrinho('${p.nome}')">Comprar</button>
      </div>
    `;
  });
}
function addCarrinho(nome) {
  const item = carrinho.find(p => p.nome === nome);

  if (item) item.quantidade++;
  else {
    const produto = produtos.find(p => p.nome === nome);
    carrinho.push({ ...produto, quantidade: 1 });
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const totalElem = document.getElementById("totalCarrinho");

  lista.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    lista.innerHTML = "<li>Carrinho vazio</li>";
    totalElem.innerText = "Total: R$ 0,00";
    document.getElementById("contadorCarrinho").innerText = 0;
    return;
  }

  carrinho.forEach((item, i) => {
    total += item.preco * item.quantidade;

    lista.innerHTML += `
      <li>
        ${item.nome}<br>
        <button onclick="diminuir(${i})">➖</button>
        ${item.quantidade}
        <button onclick="aumentar(${i})">➕</button>
      </li>
    `;
  });

  totalElem.innerText = `Total: R$ ${total}`;
  document.getElementById("contadorCarrinho").innerText =
    carrinho.reduce((s, i) => s + i.quantidade, 0);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function aumentar(i) {
  carrinho[i].quantidade++;
  atualizarCarrinho();
}

function diminuir(i) {
  if (carrinho[i].quantidade > 1) carrinho[i].quantidade--;
  else carrinho.splice(i, 1);
  atualizarCarrinho();
}

function toggleCarrinho() {
  document.getElementById("carrinhoBox").classList.toggle("ativo");
}

function abrirPagamento() {
  document.getElementById("pagamentoBox").style.display = "flex";
}

function pagar() {
  alert("Pagamento realizado!");

  carrinho = [];
  localStorage.removeItem("carrinho");

  atualizarCarrinho();
  document.getElementById("pagamentoBox").style.display = "none";
}

document.getElementById("busca").addEventListener("input", renderProdutos);
document.getElementById("filtro").addEventListener("change", renderProdutos);

renderProdutos();
atualizarCarrinho();