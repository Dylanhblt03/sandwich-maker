// Assignation de l'eventListener sur CHAQUE bouton radio

// // var radios = document.sandwich_maker.pain;
// for (var i = 0; i < radios.length; i++) {
//     radios[i].addEventListener('change', function() {
//         generateRecipe();
//     });
// }

var radios = $('input[name="pain"]');
$(radios).each(function() {
    $(this).change(function() {
        generateRecipe();
    });
});


var radios2 = $('input[name="boissons"]');
$(radios2).each(function() {
    $(this).change(function() {
        generateRecipe();
    });
});

// Assignation de l'eventListener sur CHAQUE bouton chekbox

// var chekboxes = document.getElementsByName('ingredients[]');
// for (var i = 0; i < chekboxes.length; i++) {
//     chekboxes[i].addEventListener('change', function() {
//         generateRecipe();
//     });
// }

var checkboxes = $('input[name="ingredients[]"]');
$(checkboxes).each(function() {
    $(this).change(function() {
        generateRecipe();
    });
});

// Renvoie la valeur du bouton radio "pain" qui a été choisi

// function getValuePain() {
//     var value = '';
//     var radios = document.sandwich_maker.pain;
//     for (var i = 0; i < radios.length; i++) {
//         if (radios[i].checked) {
//             value = radios[i].value;
//         }
//     }
//     return value;
// }

function getValuePain() {
    var value = $('input[name="pain"]:checked').val();
    return value;
}

function getValueBoisson() {
    var value = $('input[name="boissons"]:checked').val();
    return value;
}


// function getValueSauce() {
//     var value =document.getElementById('sauce').value;
//     return value;  
//     }

function getValueSauce() {
    var value = $('#sauce').val();
    var prix = $('#sauce option:selected').data('prix');
    var arrayreturn = [];
    arrayreturn['text'] = value;
    arrayreturn['prix'] = prix;
    return arrayreturn;
}


// function getValueInstruction() {
//     var value =document.getElementById('instruction').value;
//     return value;  
//     }

function getValueInstruction() {
    var value = $('#instruction').val();
    return value;
}


// Renvoie la valeur du bouton chekbox "ingredient" qui a été choisi
// function getValueIngredients() {
//     var values = [];
//     var chekboxes = document.getElementsByName('ingredients[]');
//     for (var i = 0; i < chekboxes.length; i++) {
//         if (chekboxes[i].checked) {
//             values.push (chekboxes[i].value);
//         }
//     }
//     return values;
// }

function getValueIngredients() {
    var values = [];
    var chekboxes = $('input[name="ingredients[]"]:checked');
    $(chekboxes).each(function() {
        values.push($(this));
    });
    return values;
}


// Génération de la recette
function generateRecipe() {
    var total = 0;
    var recette = '';

    // Gestion du pain
    var pain = getValuePain();
    if(pain != undefined) {
        total += +$("input[name='pain']:checked").data('prix');
        recette += "Vous avez choisi le pain : " + pain;
    }
    
    // Gestion des ingredients
    var ingredients = getValueIngredients();
    if(ingredients.length > 0){
        recette += "<br><br> Vos ingrédients sont les suivants : <ul>";
        $(ingredients).each(function() {
            total += +$(this).data('prix');
            recette += "<li>" + $(this).val() + "</li>";
        });
        recette += "</ul>";
    }


    // Gestion de la sauce
    var sauce = getValueSauce();
    if(sauce['text'] != ''){
        total += +sauce['prix'];
        recette += "<br>Vous avez choisi la sauce : " + sauce['text'];
    }
    var boisson = getValueBoisson();
    if(boisson != undefined) {
        total += +$("input[name='boissons']:checked").data('prix');
        recette += "<br><br>Vous avez choisi la boisson : " + boisson;
    }
    // Gestion de l'instruction spéciale

    var instruction = getValueInstruction();
    if(instruction != ''){
     recette += "<br>Vos instruction : " + instruction;
     }

    

    $('#recette').html(recette);
    $('#total').html("<div><p class='text-center'>Votre total : </p><div id='prix'>" + (Math.round(total * 100) / 100).toFixed(2) + "€</div></div>");
    // document.getElementById('recette').innerHTML = recette;
}







function shuffle() {

    // Choix aléatoire d'un bouton radio (un seul)

    // var radios = document.sandwich_maker.pain;
    // var randomRadioIndex = Math.floor(Math.random() * (radios.length - 1));
    // for (var i = 0; i < radios.length; i++) {
    //     if(i == randomRadioIndex) {
    //         radios[i].checked = true;
    //     }
    // }

    // gestion de l'aléatoide sur le select
    select = document.getElementById('sauce');
    var items = select.getElementsByTagName('option');
    var index = Math.floor(Math.random() * (items.length)); // Le "floor" de Math.floor dégage les décimales et garde que l'unité
    select.selectedIndex = index;

    var radios = $('input[name="pain"]');
    var randomRadioIndex = Math.floor(Math.random() * (radios.length - 1));
    $(radios).each(function(index) {
        if(index == randomRadioIndex) {
            $(this).prop('checked', true).trigger('change');
        }
    });

    // Choix aléatoire d'une ou de plusieurs cases à cocher
    var checkboxes = document.getElementsByName('ingredients[]');
    // Ici on décoche toutes les cases pour avoir une base de travail saine
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    // On met les checkboxes dans un tableau
    var arrayCheckboxes = [];
    for(i=0; i < checkboxes.length; i++) {
        arrayCheckboxes.push(checkboxes[i]);
    } 
    // Et on mélange le tableau pour obtenir le coté aléatoire
    melangerTableau(arrayCheckboxes);
    // Puis on prend un nombre au hasard pour trancher le tableau en deux et ne garder qu'une moitié
    var randomCheckboxIndex = Math.floor(Math.random() * (checkboxes.length - 1));
    arrayCheckboxes.splice(0, randomCheckboxIndex);
    // Et enfin on fait une boucle pour passer toutes nos checkboxes restantes à "cochée"

//     for(i = 0; i < arrayCheckboxes.length; i++) {
//         arrayCheckboxes[i].checked = true;
//     }

//     select = document.getElementById('sauce');
//     var items = select.getElementsByTagName('option');
//     var index = Math.floor(Math.random() * items.length);
//     select.selectedIndex = index;

//     generateRecipe();
// }

    $(arrayCheckboxes).each(function() {
        $(this).prop('checked', true).trigger('change');
    });
}


function melangerTableau(array) {
  let currentIndex = array.length;

  // Tant qu'il nous reste des éléments
  while (currentIndex != 0) {

    // On choisit un nombre au hasard entre 0 et la longueur du tableau
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Et on échange la position de l'index en cours avec le chiffre aléatoire 
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}




// function showFormulaire() {
//     var formulaire = document.getElementById('monformulaire');
//     if (formulaire.classList.contains('d-none')) {
//         formulaire.classList.remove('d-none');
//         document.getElementById('showformulaire').innerText = 'Bon appétit !';
//     } else {
//         formulaire.classList.add('d-none');
//         document.getElementById('showformulaire').innerText = 'A vos Sandwich !';
//     }
// }
// }

function showFormulaire() {
    if ($('#monFormulaire').hasClass('d-none')) {
        $('#monFormulaire').removeClass('d-none');
        $('#showformulaire').html('Bon appétit !');
    }
    else {
        $('#monFormulaire').addClass('d-none');
        $('#showformulaire').html('A vos Sandwich !');
    }
}

// function showFormulaire() {
//     $('#monFormulaire').removeClass('d-none');
//     $('#showformulaire').addClass('d-none');
// }









