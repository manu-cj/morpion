const h2 = document.querySelector("h2");
let jeuActif = true
let joueurActif = "x";
let etatJeu = ["", "", "", "", "", "", "", "", ""];

const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

//Messages
const gagne = () => `Le joueur ${joueurActif} a gagné`
const egalité = () => "Egalité"
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`

h2.innerHTML = tourJoueur();

document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase));
document.querySelector("#reset").addEventListener("click", reset);


//click case pour recupèrer l'index de la case
function gestionClicCase() {
    const indexCase = parseInt(this.dataset.index);

    if (etatJeu[indexCase] != "" || !jeuActif) {
        return;
    }

    etatJeu[indexCase] = joueurActif;
    this.innerHTML = joueurActif;

    verifGagne()
}

function verifGagne() {
    let tourGagnant = false;

    for(let conditionVictoire of conditionsVictoire) {
        let val1 = etatJeu[conditionVictoire[0]];
        let val2 = etatJeu[conditionVictoire[1]];
        let val3 = etatJeu[conditionVictoire[2]];
        if (val1==="" || val2===""|| val3==="") {
            continue;
        }
        if (val1=== val2 && val2===val3) {
            tourGagnant = true;
            break;
        }
    }
    if (tourGagnant) {
        h2.innerHTML = gagne();
        jeuActif = false;
        return
    }

    if (!etatJeu.includes("")) {
        h2.innerHTML = egalité();
        jeuActif = false;
        return;
    }

    joueurActif = joueurActif==="x" ? "o" : "x";
    h2.innerHTML = tourJoueur();
}

function reset(){
    joueurActif = "x";
    jeuActif = true;
    etatJeu = ["", "", "", "", "", "", "", "", ""];
    h2.innerHTML = tourJoueur();
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
}