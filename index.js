let tabela = document.getElementById("extrato");
let btnadd = document.getElementById("btnadd");

// Navegador lateral
function openNav(){
    document.getElementById("sidenav").style.width = "85%";
    if(window.innerHeight >= 1024){
      document.getElementById("sidenav").style.width = "30%";
    }
  }  
function closeNav(){
  document.getElementById("sidenav").style.width = "0";
} 
//Fim Navegador

// Adição de transação
btnadd.addEventListener("click", function(){
  let tipo;
  let nome = document.getElementById("nome").value;
  let valor = document.getElementById("valor").value;

  switch (document.getElementById("tipo").value){
    case '1': tipo = "+"; break;
    case '2': tipo = "-"; break;
    default: tipo = "/";
  }

  if(tipo == "/" || nome == "" || valor == ""){
    alert("Preencha todos os campos");
    return false;
  }
  tabela.innerHTML += `
  <tr>
    <td class="text-left">${tipo}</td>
    <td class="text-left">${nome}</td>
    <td class="text-right">R$ ${valor}</td>
  </tr>`;


  let transacao = new Array();
  
  if (localStorage.hasOwnProperty("transacao")) {
    transacao = JSON.parse(localStorage.getItem("transacao"));    
  }

  transacao.push({
    type: tipo,
    name: nome,
    value: parseFloat(valor)
  });

  localStorage.setItem("transacao", JSON.stringify(transacao));
  SumTotal();

  tipo.value = 0;
  nome = "";
  valor = "";
});

function SumTotal(){
  let total = 0.0;
  let campoTotal = document.getElementById("total");
  let campoLucro = document.getElementById("lucro");
  transacoes = JSON.parse(localStorage.getItem("transacao"));
  transacoes.forEach(transacao => {
    if(transacao.type == "+"){
      total += transacao.value;
    }else {
      total -= transacao.value;
    }
  });
  campoTotal.innerHTML = total.toFixed(2);

  if(total >= 0){
    campoLucro.innerHTML = "[Lucro]";
  }else{
    campoLucro.innerHTML = "[Prejuízo]";
  }
}

function CarregaTransacoes(){
  if (localStorage.hasOwnProperty("transacao")) {
    transacao = JSON.parse(localStorage.getItem("transacao"));
    transacao.forEach(el => {
      tabela.innerHTML += `
      <tr>
        <td class="text-left">${el.type}</td>
        <td class="text-left">${el.name}</td>
        <td class="text-right">R$ ${el.value}</td>
      </tr>`;
    });

    SumTotal();
  }
}

CarregaTransacoes();