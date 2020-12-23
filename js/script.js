var atq_joueur= 24;														//Vraiment désolé pour toutes les majuscules dans les noms de variables j'espère que ça ne vous piquera pas trop les yeux 
var atq_monstre=12;														// Les messages de l'info-bulle s'actualisent toutes les 2 secondes, pensez bien à attendre l'affichage avant de lancer une nouvelle action sous peine de ne pas comprendre ce qu'il se passe !
var vie_monstre = 175;
var vie_joueur= 100;
var mana_joueur = 100;
var def_joueur = 25;
var cout_mana = 25;
var poison = 0;
var dgt_poison= 13;
var Hp_perso1=document.getElementById("Hp_perso1");
var Mana_perso1=document.getElementById("Mana_perso1");
var Def_perso1=document.getElementById("Def_perso1");
var InfobulleNom=document.getElementById("InfobulleNom");
var InfobulleVie=document.getElementById("InfobulleVie");
var Image_boss=document.getElementById("Image_boss");
var Bouton_attaquer=document.getElementById("atq");
var Bouton_defense=document.getElementById("shield");
var Bouton_special=document.getElementById("spe");
var Boite_dialogue=document.getElementById("Boite_dialogue");
var Action_bouton=document.getElementById("Action_bouton");
var Atq_Disponible=true;													//Variables "bouton grisé (non utilisable) quand utilisé au tour d'avant"
var Def_Disponible=true;
var Spe_Disponible=true;
var Atq_Dispo_Monstre=true;													//Variables "Attaque du monstre ne se déclenche pas si le bouton est grisé"
var Spe_Dispo_Monstre=true;

Hp_perso1.innerHTML=vie_joueur;												//Partie "Affichage dynamique des stats"
Mana_perso1.innerHTML=mana_joueur;
Def_perso1.innerHTML=def_joueur;
InfobulleNom.innerHTML="Reshor l'évadé";
InfobulleVie.innerHTML=vie_monstre + "HP";

Image_boss.onmouseover=function(){
	InfobulleNom.style.opacity="1";
	InfobulleVie.style.opacity="1";
	Image_boss.onmouseout=function(){
		InfobulleNom.style.opacity="0";
		InfobulleVie.style.opacity="0";	
	}
}


function Condition_Victoire(){
	if (vie_monstre <=0){
		Boite_dialogue.innerHTML="Félicitation, vous avez gagné";
		Image_boss.style.backgroundImage= "url()";
		Action_bouton.style.visibility= "hidden";
	}
}

function Condition_Defaite(){
	if (vie_joueur <=0){
	Boite_dialogue.innerHTML="Dommage, c'est perdu !";
	Action_bouton.style.visibility= "hidden";
	}
}

function Atq_Monstre(){
	vie_joueur -= atq_monstre;
	Boite_dialogue.innerHTML="Le monstre vous attaque et vous inflige " + atq_monstre + " points de dégâts";
	Hp_perso1.innerHTML= vie_joueur;
}


function Attaquer(){
	Spe_Dispo_Monstre=true; 
	if (Atq_Disponible==true){
		Atq_Disponible=false;
		Bouton_attaquer.style.backgroundColor="#5B4C49";
		Def_Disponible=true;
		Bouton_defense.style.backgroundColor="#DB3613";
		if (mana_joueur>24){
			Spe_Disponible=true;
			Bouton_special.style.backgroundColor="#DB3613";
		}
		vie_monstre -= atq_joueur;
		InfobulleVie.innerHTML=vie_monstre + "HP";
		Boite_dialogue.innerHTML="Vous infligez " + atq_joueur + " points de dégâts au monstre";
		if (poison>0){
			vie_monstre -= dgt_poison;
		}
	}
	
}

function Defense(){
	Atq_Dispo_Monstre=true;
	Spe_Dispo_Monstre=true; 
	if (Def_Disponible==true){
		Atq_Disponible=true;
		Bouton_attaquer.style.backgroundColor="#DB3613";
		Def_Disponible=false;
		Bouton_defense.style.backgroundColor="#5B4C49";
		if (mana_joueur>24){
			Spe_Disponible=true;
			Bouton_special.style.backgroundColor="#DB3613";
		}
		vie_joueur -= Math.round(atq_monstre*0.75);
		Hp_perso1.innerHTML= vie_joueur;
		Boite_dialogue.innerHTML="Vous réduisez les dégats de 25%, le monstre vous inflige " + Math.round(atq_monstre*0.75) + " points de dégâts";
		setTimeout(Condition_Victoire, 4000);
		setTimeout(Condition_Defaite, 4000);
		if (poison>0){
			vie_monstre -= dgt_poison;
		}
	}
}

function Special(){														//Correspond à du poison sur 3 tours
	Atq_Dispo_Monstre=true; 
	if (Spe_Disponible==true){
		Atq_Disponible=true;
		Bouton_attaquer.style.backgroundColor="#DB3613";
		Def_Disponible=true;
		Bouton_defense.style.backgroundColor="#DB3613";
		Spe_Disponible=false;
		Bouton_special.style.backgroundColor="#5B4C49";
		if (mana_joueur>24){
			poison=3;
			mana_joueur -= cout_mana;
			Mana_perso1.innerHTML=mana_joueur;
		}
	}
}

function Check_Poison(){
	if (poison>0){
		vie_monstre -= dgt_poison;
		InfobulleVie.innerHTML=vie_monstre + "HP";
		poison -=1;
		Boite_dialogue.innerHTML="le monstre est empoisonné, il subit " + dgt_poison + " points de dégâts";
	}
}

function Msg_atq(){
	setTimeout(Attaquer, 0);
	setTimeout(Check_Poison, 4000);
	setTimeout(Condition_Victoire, 4000);
	setTimeout(Condition_Defaite, 4000);
	if (Atq_Dispo_Monstre==true){ 
		setTimeout(Atq_Monstre, 2000);
		Atq_Dispo_Monstre=false; 
	}

}

function Msg_spe(){
	if (mana_joueur>24){
		setTimeout(Special, 0);
		setTimeout(Check_Poison, 2000);
		setTimeout(Condition_Victoire, 4000);
		setTimeout(Condition_Defaite, 4000);
		if (Spe_Dispo_Monstre==true){ 
			setTimeout(Atq_Monstre, 4000);
			Spe_Dispo_Monstre=false;	
		}
	}
}

function Msg_def(){
	setTimeout(Defense, 0);
	setTimeout(Check_Poison, 4000);
	setTimeout(Condition_Victoire, 4000);
	setTimeout(Condition_Defaite, 4000);
}



Bouton_attaquer.addEventListener("click", Msg_atq);
Bouton_defense.addEventListener("click", Msg_def);
Bouton_special.addEventListener("click", Msg_spe);