// criar variaveis que serão utilizadas no codigo js
var numeroSecreto = parseInt(Math.random()*10)
 var tentativas = 3

function chuteUsuario() {
 
  var chute = document.querySelector("input").value;
  var p = document.querySelector("p"); 
    if (numeroSecreto == chute && tentativas > 0){
       p.textContent = "Você acertou!";      }  else if (chute > numeroSecreto && tentativas > 0){
       p.textContent = "O número secreto é menor!";
      tentativas = tentativas - 1;
    } else if (chute < numeroSecreto && tentativas > 0) {
      p.textContent = "O número secreto é maior!";
      tentativas = tentativas - 1
    }    
    if (chute != numeroSecreto && tentativas == 0)
   p.textContent = "Suas tentativas acabaram! O número secreto era " + numeroSecreto; 
}   document.querySelector("button").addEventListener("click", chuteUsuario);

 


/*while (tentativas > 0){
  var chute = parseInt(prompt("Digite um número entre 0 e 10"))
  if (numeroSecreto == chute){
    alert("Acertou!")
    break
  } else if (chute > numeroSecreto){
    alert("O número secreto é menor!")
    tentativas = tentativas - 1
  } else if (chute < numeroSecreto) {
    alert("O número secreto é maior!")
    tentativas = tentativas - 1
  }  
}
 if (chute != numeroSecreto){
   alert("Suas tentativas acabaram! O número secreto era " + numeroSecreto)
 }*/






// break tem a função de parar