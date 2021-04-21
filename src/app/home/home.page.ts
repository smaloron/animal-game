import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public animalList = [
    {
      title: 'Vache',
      image: 'img/animals/cow-icon.png',
      desc: 'Meugle',
      file: '/sounds/cow.mp3',
      playing: false
    },
    {
      title: 'Dauphin',
      image: 'img/animals/dolphin-icon.png',
      desc: 'Siffle',
      file: '/sounds/dolphin.mp3',
      playing: false
    },
    {
      title: 'Grenouille',
      image: 'img/animals/frog-icon.png',
      desc: 'Coasse',
      file: '/sounds/frog.mp3',
      playing: false
    },
    {
      title: 'Oiseau',
      image: 'img/animals/bird-icon.png',
      desc: 'Chante',
      file: '/sounds/bird.mp3',
      playing: false
    },
    {
      title: 'Cochon',
      image: 'img/animals/pig-icon.png',
      desc: 'Grogne',
      file: '/sounds/pig.mp3',
      playing: false
    },
    {
      title: 'Chien',
      image: 'img/animals/puppy-icon.png',
      desc: 'Aboie',
      file: '/sounds/dog.mp3',
      playing: false
    },
    {
      title: 'Chat',
      image: 'img/animals/black-cat-icon.png',
      desc: 'Miaule',
      file: '/sounds/cat.mp3',
      playing: false
    },
    {
      title: 'Cheval',
      image: 'img/animals/horse-icon.png',
      desc: 'Hennit',
      file: '/sounds/horse.wav',
      playing: false
    },
    {
      title: 'Ane',
      image: 'img/animals/donkey-icon.png',
      desc: 'Brait',
      file: '/sounds/donkey.wav',
      playing: false
    }
  ];

  // stockage de l'animal choisi
  public chosenAnimal = null;

  // Le temps maxi pour une réponse
  private answerDelayInSecond = 30;

  // Le temps restant pour une réponse
  public secondsLeft = null;

  // Le chrono pour les réponses
  private timer = null;

  // Stockage d'un objet audio HTML
  private audio:HTMLAudioElement = null;

  constructor(private toastCtrl: ToastController) { }
  
  public play() {
    // Choisir un animal au hasard
    let alea = Math.floor(Math.random() * this.animalList.length);
    this.chosenAnimal = this.animalList[alea];

    // Arrêter le son précédent
    if (this.audio && ! this.audio.ended) {
      this.audio.pause();
    }

    // Lancement du chrono
    this.startTimer();

    // Jouer un son
    // Instanciation d'un objet audio avec le son que l'on veut jouer
    this.audio = new Audio('/assets' + this.chosenAnimal.file);
    // Chargement du son
    this.audio.load();
    // lecture du son
    this.audio.play();
  }

  // Choix du joueur
  public async guessAnimal(clickedAnimal) {

    // Si aucun son n'a été joué 
    // chosenAnimal est null
    if (this.chosenAnimal == null) {
      return;
    }

    // Le message à afficher
    let message;
    let toastColor = 'danger';

    // Comparaison des animaux
    // celui sur lequel le joueur a cliqué
    // et celui dont on a joué le son
    if (this.chosenAnimal.title == clickedAnimal.title) {
      message = 'gagné';
      toastColor = 'success';
      this.resetGame();
    } else {
      message = 'essaye encore';
    }

    // Affichage du message
    // dans un toast
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top',
      color: toastColor
    });

    toast.present();
  }

  // Mise à zéro du jeu
  private resetGame() {
    this.chosenAnimal = null;
    this.audio = null;

    this.secondsLeft = 0;
    clearInterval(this.timer);
  }

  private startTimer() {
    this.secondsLeft = this.answerDelayInSecond;

    this.timer = setInterval(
      () => {
        // Décrémente le temps restant
        this.secondsLeft--;
        // S'il ne reste plus de temps
        // on remet le jeu à zéro
        if (this.secondsLeft == 0) {
          this.resetGame();
          // Annulation du chrono
          clearInterval(this.timer);
        }
      },
      1000
    )
  }

}
