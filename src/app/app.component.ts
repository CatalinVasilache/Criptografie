import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as isaacCSPRNG from '../assets/isaacCSPRNG/isaacCSPRNG-1.1.js';

declare const isaacCSPRNG: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public http;
  public textInput;
  public file = '../assets/output.txt';
  public caesarsDecrypted;
  public caesarsEncrypted;
  public vigenereEncrypted;
  public vigenereDecrypted;
  public step = 1;
  public key = 'CAT';
  public project = 'first';
  public dimension;
  public prng0;
  public numberArray = '';

  constructor(http: HttpClient) {
    this.http = http;
  }


  title = 'icripto';

  switch1() {
    this.project = 'first';
  }

  switch2() {
    this.project = 'second';
  }

  ///////////////////////////Proiect 1/////////////////////////////

  start() {
    this.http.get('../assets/input.txt', {responseType: 'text'}).subscribe(dataInput => {
      this.textInput = dataInput;
      console.log('Input text: ', this.textInput);
    });

    this.step = 2;
  }

  encryptCaesars(textInput) {
    let caesarsEncrypted = '';
    for (let i = 0; i < textInput.length; i++) {
      let asciiNum = textInput.toUpperCase().charCodeAt(i);
      if (asciiNum >= 65 && asciiNum <= 77) {
        caesarsEncrypted += String.fromCharCode(asciiNum + 13);
      } else if (asciiNum >= 78 && asciiNum <= 90) {
        caesarsEncrypted += String.fromCharCode(asciiNum - 13);
      } else {
        caesarsEncrypted += textInput[i];
      }
    }
    this.caesarsEncrypted = caesarsEncrypted;
    console.log('Encrypted text Caesars: ', this.caesarsEncrypted);
    this.step = 3;
  }

  encryptVigenere(caesarsEncrypted, key) {
    let vigenereEncrypted = '';
    for (let i = 0; i < caesarsEncrypted.length - 2; i++) {
      let asciiNum = caesarsEncrypted.charCodeAt(i);
      if (asciiNum < 65 || asciiNum > 90) {
        vigenereEncrypted += caesarsEncrypted[i];
      } else {
        if (asciiNum + this.getShift(key, i) > 90) {
          vigenereEncrypted += String.fromCharCode((asciiNum + this.getShift(key, i)) - 26);
        } else {
          vigenereEncrypted += String.fromCharCode(asciiNum + this.getShift(key, i));
        }
      }
    }
    this.vigenereEncrypted = vigenereEncrypted;
    console.log('Encrypted text Vigenere: ', this.vigenereEncrypted);
    this.step = 4;
  }

  decryptVigenere(vigenereEncrypted, key) {
    let vigenereDecrypted = '';
    for (let i = 0; i < vigenereEncrypted.length; i++) {
      let asciiNum = vigenereEncrypted.charCodeAt(i);
      if (asciiNum < 65 || asciiNum > 90) {
        vigenereDecrypted += vigenereEncrypted[i];
      } else {
        if (asciiNum - this.getShift(key, i) < 65) {
          vigenereDecrypted += String.fromCharCode((asciiNum - this.getShift(key, i)) + 26);
        } else {
          vigenereDecrypted += String.fromCharCode(asciiNum - this.getShift(key, i));
        }
      }
    }
    this.vigenereDecrypted = vigenereDecrypted;
    console.log('Decrypted text Vigenere: ', this.vigenereDecrypted);
    this.step = 5;
  }

  getShift(key, i) {
    return (key.toUpperCase().charCodeAt(i % key.length)) - 65;
  }

  decryptCaesars(vigenereDecrypted) {
    let caesarsDecrypted = '';
    for (let i = 0; i < vigenereDecrypted.length; i++) {
      let asciiNum = vigenereDecrypted.charCodeAt(i);
      if (asciiNum >= 65 && asciiNum <= 77) {
        caesarsDecrypted += String.fromCharCode(asciiNum + 13);
      } else if (asciiNum >= 78 && asciiNum <= 90) {
        caesarsDecrypted += String.fromCharCode(asciiNum - 13);
      } else {
        caesarsDecrypted += vigenereDecrypted[i];
      }
    }
    this.caesarsDecrypted = caesarsDecrypted;
    console.log('Decrypted text Caesars: ', this.caesarsDecrypted);
    this.step = 6;
  }

  download() {
    const FileSaver = require('file-saver');
    const blob = new Blob(['Input:', this.textInput, 'Caesar\'s Encryption: ', this.caesarsEncrypted, 'Vigenere\'s Encryption: ', this.vigenereEncrypted,'Vigenere\'s Decryption: ', this.vigenereDecrypted, 'Caesar\'s Decryption: ', this.caesarsDecrypted], {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(blob, 'output1.txt');
  }

  ///////////////////////////Proiect 2/////////////////////////////

  changeDimension(event) {
    this.dimension = event.target.value;
  }

  generate() {
    this.prng0 = isaacCSPRNG();
    this.numberArray = '';
    for (let i = 0; i < this.dimension; i++) {
      this.numberArray += this.prng0.range(9);
    }
  }

  download2() {
    const FileSaver = require('file-saver');
    const blob = new Blob([this.numberArray], {type: 'application/octet-stream'});
    FileSaver.saveAs(blob, 'output2');
  }
}

