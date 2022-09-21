class Game {
  constructor() {}

  getState() {//método que irá ler o gameState do banco de dados
      var gameStateRef = database.ref("gameState");//me referindo a chave gameState criada no bd
      //criando um ouvinte que fica acompanhando a mudança no valor da variável gameState no bd.
      gameStateRef.on("value", function(data) {        
        gameState = data.val();
    });
  }

  update(state) {//método que irá atualizar o gameState no bd para um valor passado para ele como parâmetro
    database.ref("/").update({//se refere ao banco de dados principal dentro do qual gameState é criado
      gameState: state
    });
  }

  start() {//método para obter o gameState e então iniciar o jogo
    //instância de um novo jogador
    player = new Player();
    //inciando a variável playerCount
    playerCount = player.getCount();

    form = new Form();
    form.display();

    //criar sprites dos jogadores
    car1 = createSprite(width/2 -50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width/2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    //atribuindo os objetos ao vetor cars
    cars = [car1, car2];
  }
  
  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffects");
  }

  play() {
    //função para esconder os elementos
    this.handleElements();
    //pegar informação dos players
    Player.getPlayersInfo();
    //condicional que vai checar se os jogadores entraram no jogo e exibir a pista
    if(allPlayers !== undefined) {
      image(track, 0, - height * 5, width, height * 6);//criará parte da pista fora de tela, pois não queremos mostrar tudo de uma vez
      
      var index = 0;
      for(var plr in allPlayers) {//plr vai atravessar o objeto allPlayers para pegar s valores da posição
        var x = allPlayers[plr].positionX;//acessano os dados do objeto
        var y = height - allPlayers[plr].positionY;//subtraindo pos quero manter o carro na parte inferior da tela
        //cars[index-1].position.x = x;
        //cars[index-1].position.y = y;
        cars[index].position.x = x;
        cars[index].position.y = y;
        //adicione 1 ao índice de cada loop
        index = index + 1;
      }

      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();//criaremos o método no Player.js
      }
    }
    //desenhar os sprites
    drawSprites();
  }

}
