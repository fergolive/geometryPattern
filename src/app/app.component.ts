import { CommonModule } from "@angular/common";
import { Component, OnInit, afterRender, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { ButtonComponent } from "./components/button/button.component";
import tinycolor from "tinycolor2";
import html2canvas from "html2canvas";
import { Canvg } from 'canvg';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ButtonComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  itemsSize = 200;
  title = "geopattern";
  color1: string = "#000000";
  colors = ["", "", "", ""];
  items$: any[] = [];

  constructor() {
  
  }

  create(){
      // Crear un elemento SVG
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// Establecer atributos del SVG
svg.setAttribute("width", "400");
svg.setAttribute("height", "200");

// Crear un elemento rectángulo dentro del SVG
const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

// Establecer atributos del rectángulo
rect.setAttribute("x", "50");
rect.setAttribute("y", "50");
rect.setAttribute("width", "300");
rect.setAttribute("height", "100");
rect.setAttribute("fill", "blue");

// Agregar el rectángulo al SVG
svg.appendChild(rect);

// Agregar el SVG al documento HTML
let objcontenede=document.getElementById('svg-obj') as HTMLElement
objcontenede.appendChild(svg);
  }

  

  download(){
    let table = document.getElementById("table") as HTMLElement;
    table.style.width = '1920px';
    table.style.height = '1080px';
    

    html2canvas(table, { scale: 2 }).then(function(canvas) {
      var imagen = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      var enlace = document.createElement('a');
      enlace.href = imagen;
      enlace.download = 'miImagen.png';
      enlace.click();
  });
  }



  ngOnInit(): void {
    let palette = this.generarPaleta();
    this.colors[1] = palette[0];
    this.colors[2] = palette[1];
    this.colors[3] = palette[2];
    this.getItems();
  }

  changeColors() {
    let palette = this.generarPaleta();
    console.log(palette);

    this.colors[1] = palette[0];
    this.colors[2] = palette[1];
    this.colors[3] = palette[2];
  }

  getAorB() {
    var numeroAleatorio = Math.random();
    if (numeroAleatorio < 0.5) {
      return "a";
    } else {
      return "b";
    }
  }

  generatePattern() {
    for (let index = 0; index < this.itemsSize; index++) {
      let boxId = String(index);
      this.setColor(boxId);
      this.rotate(boxId);
    }
  }

  getItems() {
    for (let index = 0; index < this.itemsSize; index++) {
      this.items$.push("box");
    }
  }

  rotate(id: string) {
    // Generar un número aleatorio entre 1 y 3
    var numRandom = Math.floor(Math.random() * 4) + 1;

    // Ejecutar la función correspondiente al número aleatorio generado
    switch (numRandom) {
      case 1:
        this.mirrorVertically(id);
        break;
      case 2:
        this.mirrorHorizontally(id);
        break;
      case 3:
        this.rotate90(id);
        break;
      case 4:
        this.rotate90Horiz(id);
        break;
      default:
        console.log("Error: Número aleatorio fuera de rango");
    }

    //SUBELEMENTOs
    for (let index = 0; index < 2; index++) {
      let randomFunction = Math.floor(Math.random() * 2) + 1;
      let randomLetter = this.getAorB();

      let subId = String(id) + String(randomLetter);

      this.setColor(subId);

      switch (randomFunction) {
        case 1:
          this.mirrorVertically(subId);
          break;
        case 2:
          this.mirrorHorizontally(subId);
          break;
        default:
          console.log("Error: Número aleatorio fuera de rango");
      }
    }
  }

  setColor(id: string) {
    let idColor = Math.floor(Math.random() * 3) + 1;

    let box = document.getElementById(`${id}`) as HTMLElement;
    box.style.background = `${this.colors[idColor]}`;
  }

  mirrorVertically(id: string) {
    let box = document.getElementById(`${id}`) as HTMLElement;
    box.style.transform = "scaleY(-1)";
  }

  mirrorHorizontally(id: string) {
    let box = document.getElementById(`${id}`) as HTMLElement;
    box.style.transform = "scaleX(-1)";
  }

  rotate90(id: string) {
    let box = document.getElementById(`${id}`) as HTMLElement;
    box.style.transform = "rotate(90deg)";
  }

  rotate90Horiz(id: string) {
    let box = document.getElementById(`${id}`) as HTMLElement;
    box.style.transform = "rotate(90deg) scaleY(-1)";
  }

  downloadSVG(){
    this.descargarSVG(this.svgString, "mi_svg");
  }
  generarPaleta() {
    // Generar un color base aleatorio
    let colorBase = tinycolor.random().toHexString();

    // Convertir el color base a HSL
    let colorBaseHSL = tinycolor(colorBase).toHsl();

    // Crear dos colores triádicos
    let colorTriadico1 = tinycolor(colorBase).triad()[1].toHexString();
    let colorTriadico2 = tinycolor(colorBase).triad()[2].toHexString();

    let colorsPallete = [colorBase, colorTriadico1, colorTriadico2];
    // Devolver la paleta de colores

    return colorsPallete;
  }

  descargarSVG(svgString:any, nombreArchivo:any) {
    // Crear un Blob a partir del contenido SVG
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    
    // Crear una URL del Blob
    const url = URL.createObjectURL(blob);
    
    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = nombreArchivo + ".svg";
    
    // Simular un clic en el enlace para iniciar la descarga
    link.click();
    
    // Liberar el recurso URL
    URL.revokeObjectURL(url);
  }

  svgString = `
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="50" width="300" height="100" fill="blue" />
</svg>
`;


}
