//ÁLLAPOTTÉR
let szo;
let tippek;
const betuk=['a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm', 'n', 'o', 'ó', 'ö', 'ő', 'p', 'q','r', 's', 't', 'u', 'ú', 'ü', 'ű', 'v','w','x','y', 'z','-'];
const MAXTIPP = 9;
const szoDiv = document.querySelector('#szo');
const betukDiv = document.querySelector('#betuk');
const szamDiv = document.querySelector('#eredmeny');
const svg = document.querySelector('svg');
const reset_gomb=document.querySelector("#reset");
const feladat=document.querySelector("#feladat");


function tippel(betu) {
    // a tippek tömbbe be kell tenni a betut
    if(!tippek.includes(betu)){
        tippek.push(betu);
    }
}

function nyer() {
    // a szo minden karakterére igaz, hogy a tippek tömb tartalmazza
    // milyen tétel?
    // milyen tömbfüggvény?
    return (Array.from(szo).every(betu => tippek.includes(betu)));
}

function veszit() {
    // a rossz tippek száma eléri a maximális tippek számát
    return MAXTIPP===rosszTippek();

}

function rosszTippek() {
    // a tippek tömbben hány olyan betű van, amit nem tartalmaz a szó
    // milyen tétel ez
    // milyen tömbfüggvény?
    return tippek.filter(tipp => !szo.includes(tipp)).length;
}

function genSzo() {
    // Cél a szó és tippek alapján:
    // <span>a</span>
    // <span>b</span>
    // <span></span>
    // <span class="hianyzo">b</span>
    return Array.from(szo).map(betu => {
        return ((tippek.includes(betu)) ? `<span>${betu}</span>` : ( (veszit()) ? `<span class="hianyzo">${betu}</span>`  : `<span></span>`));
    });
}


function genBetuk() {
    // Cél egy előre meghatározott betűtömb alapján:
    // <button>a</button>
    // <button disabled>b</button>
    // <button>c</button>
    // <button>d</button>
    return betuk.map(betu => {
        return (tippek.includes(betu)) ? `<button disabled>${betu}</button>` : ((veszit()) ? `<button disabled>${betu}</button>` : `<button>${betu}</button>`);
    });
}

function genSzamlalo() {
    // Cél a rossztippek és a maxtippek alapján
    // 3/9
    return `${rosszTippek()}/${MAXTIPP}`;
}


//ESEMÉNYKEZELŐK

document.addEventListener("DOMContentLoaded", init)

function init() {
    szo = 'alma';
    tippek = [];
    szoDiv.classList="";
    betukDiv.hidden=false;
    Szo(genSzo());
    Betuk(genBetuk());
    Szamlalo(genSzamlalo());
    Gallows(rosszTippek());
}

reset_gomb.addEventListener('click', reset);

function reset(){
    if(feladat.value!=""){
        szo = feladat.value.toLowerCase();
        feladat.value="";
        tippek = [];
        szoDiv.classList="";
        betukDiv.hidden=false;
        Szo(genSzo());
        Betuk(genBetuk());
        Szamlalo(genSzamlalo());
        Gallows(rosszTippek());
    }
    
}

betukDiv.addEventListener('click', gombraKattintas);

function gombraKattintas(e) {
  if (e.target.matches('button')) {
    // beolvasás
    // a lenyomott gomb szövege
    let beadott_betu=e.target.innerText;
    

    // feldolgozás
    // tippelés
    tippel(beadott_betu);


    // kiírás
    // szó aktualizálása (genSzo)
    // betűk aktualizálása
    // számláló aktualizálása
    // akasztófarajz aktualizálása
    Szo(genSzo());
    Betuk(genBetuk());
    Szamlalo(genSzamlalo());
    Gallows(rosszTippek());

    // opcionálisan
    // ha nyertünk, akkor tüntessük el a gombokat
    // ha nyertünk, akkor írjuk ki zölden a betűket, nyer stílusosztály
    if(nyer()){
        betukDiv.hidden=true;
        szoDiv.classList.add("nyer");
    }
    
    
    // ha veszítettünk, akkor írjuk ki pirosan a ki nem talált betűket, hianyzo stílusosztály

    //a genSzo csinálja
  }
}

function Szo(e){
    szoDiv.innerHTML="";
    e.map(betu => szoDiv.innerHTML+=betu);
}

function Betuk(e){
    betukDiv.innerHTML="";
    e.map(betu => betukDiv.innerHTML+=betu);
}

function Szamlalo(e){
    szamDiv.innerHTML=e;
}

function Gallows(e){
    let lines=svg.children;
    for (let i =0 ; i<MAXTIPP ; ++i){
        if(i<e){
            lines[i].style.display="flex";
        }
        else{
            lines[i].style.display="";
        }
        
    }
}
