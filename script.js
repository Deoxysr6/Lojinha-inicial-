// ===== PRODUTOS COM IMAGENS =====
const produtos = [
  { nome: "Placa de Vídeo RTX 3060", categoria: "Hardware", imagem: "imagens/rtx3060.jpg", preco: 2500 },
  { nome: "Processador Ryzen 5", categoria: "Hardware", imagem: "imagens/ryzen5.jpg", preco: 1200 },
  { nome: "Cadeira Gamer RGB", categoria: "Cadeiras", imagem: "imagens/cadeira.jpg", preco: 800 },
  { nome: "Mouse Gamer", categoria: "Periféricos", imagem: "imagens/mouse.jpg", preco: 150 },
  { nome: "Teclado Mecânico", categoria: "Periféricos", imagem: "imagens/teclado.jpg", preco: 300 },
  { nome: "PC Gamer Completo", categoria: "Computadores", imagem: "imagens/pcgamer.jpg", preco: 5500 }
];

// ===== CARRINHO =====
let carrinho = [];

// ===== RENDERIZA PRODUTOS (SO QUANDO CATEGORIA SELECIONADA) =====
function renderProdutos() {
  const busca = document.getElementById("busca").value.toLowerCase();
  const filtro = document.getElementById("filtro").value;
  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  if (filtro === "") {
    lista.innerHTML = "<p>Selecione uma categoria para ver os produtos</p>";
    return;
  }

  const filtrados = produtos.filter(p =>
    p.categoria === filtro &&
    p.nome.toLowerCase().includes(busca)
  );

  if (filtrados.length === 0) {
    lista.innerHTML = "<p>Nenhum produto encontrado</p>";
    return;
  }

  filtrados.forEach(p => {
    lista.innerHTML += `
      <div class="produto">
        <img src="${p.imagem}">
        <h3>${p.nome}</h3>
        <button onclick="addCarrinho('${p.nome}')">Comprar</button>
      </div>
    `;
  });
}

// ===== ADICIONAR AO CARRINHO =====
function addCarrinho(nome) {
 const item = carrinho.find(p => p.nome === nome);
  if (item) {
    item.quantidade++;
  } else {
    const produto = produtos.find(p => p.nome === nome);
    carrinho.push({ nome: produto.nome, preco: produto.preco, quantidade: 1 });
  }
  atualizarCarrinho();
}

// ===== ATUALIZAR CARRINHO LATERAL =====
function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";

  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    lista.innerHTML += `
      <li>
        ${item.nome} x${item.quantidade} - R$ ${subtotal.toFixed(2)} 
        <span class="remover" onclick="removerItem(${index})">❌</span>
      </li>
    `;
  });

  lista.innerHTML += `<li><strong>Total: R$ ${total.toFixed(2)}</strong></li>`;
  document.getElementById("contadorCarrinho").innerText = carrinho.reduce((sum, i) => sum + i.quantidade, 0);
}

// ===== REMOVER ITEM =====
function removerItem(index) {
  carrinho.splice(index, 1);
  document.getElementById("contadorCarrinho").innerText = carrinho.length;
  atualizarCarrinho();
}

// ===== TOGGLE CARRINHO =====
function toggleCarrinho() {
  document.getElementById("carrinhoBox").classList.toggle("ativo");
}

// ===== LOGIN =====
function login() {
  const user = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  if (user === "admin" && senha === "123") alert("Login realizado!");
  else alert("Usuário ou senha incorretos!");
}

// ===== ABRIR PAGAMENTO =====
function abrirPagamento() {
  if (carrinho.length === 0) { alert("Seu carrinho está vazio!"); return; }
  document.getElementById("pagamentoBox").style.display = "block";
}

// ===== PAGAR =====
function pagar() {
  if (carrinho.length === 0) { alert("Carrinho vazio!"); return; }
  const metodo = document.getElementById("metodo").value;
  const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
  alert(`Pagamento de R$ ${total.toFixed(2)} via ${metodo} realizado!`);
  carrinho = [];
  atualizarCarrinho();
  document.getElementById("pagamentoBox").style.display = "none";
}

// ===== EVENTOS =====
document.getElementById("busca").addEventListener("input", renderProdutos);
document.getElementById("filtro").addEventListener("change", renderProdutos);

// ===== INICIAR =====
renderProdutos();