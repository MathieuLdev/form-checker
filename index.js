const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
const progressBar = document.getElementById("progress-bar");
let pseudo, email, password, confirmPass;
const form = document.querySelector("form");

// const pseudoChecker = (value) => {
//     const pseudoContainer = document.querySelector('.pseudo-container');
//     const errorDisplay = document.querySelector('.pseudo-container > span');

//     if (value.length > 0 && (value.length < 3 || value.length > 20)) {
//         pseudoContainer.classList.add('error');
//         errorDisplay.textContent = "Le pseudo doit faire entre 3 et 20 caractères";
//     } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
//         pseudoContainer.classList.add('error');
//         errorDisplay.textContent = "Le pseudo ne doit pas contenir de caractères spéciaux";
//     } else {
//         pseudoContainer.classList.remove('error');
//         errorDisplay.textContent = "";
//     }
// };


const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
        container.classList.add('error');
        span.textContent = message ;
    } else {
        container.classList.remove('error');
        span.textContent = message;
    }
}

const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères", false);
        pseudo = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay("pseudo", "Le pseudo ne doit pas contenir de caractères spéciaux", false);
        pseudo = null;
    } else {
        errorDisplay("pseudo", "", true)
        pseudo = value;
    }
};


const emailChecker = (value) => {
    if (!value.match(/^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "Le mail n'est pas valide", false);
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};


const passwordChecker = (value) => {
    progressBar.classList = "";

    if (!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {
        errorDisplay("password", "Minimum de 8 caractères, un chiffre, une majuscule et un caractère spécial");
        progressBar.classList.add('progressRed');
        password = null;
    } else if (value.length < 12) {
        errorDisplay("password", "", true);
        progressBar.classList.add('progressBlue');
        password = value;
    } else {
        errorDisplay("password", "", true);
        progressBar.classList.add('progressGreen');
        password = value;
    }
    if (confirmPass) {
        confirmChecker(confirmPass);
    }
};


const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passe ne correspondent pas", false);
        confirmPass = false;
    } else {
        errorDisplay("confirm", "", true);
        confirmPass = true;
    }
};



inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            case "password":
                passwordChecker(e.target.value);
                break;
            case "confirm":
                confirmChecker(e.target.value);
                break;
            default:
                nul;
        };
    });
});


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (pseudo && email && password && confirmPass) {
        const data = {
            pseudo: pseudo,
            email: email,
            password: password,
        };
        console.log(data);

        inputs.forEach((input) => {
            (input.value = "");
        });
        progressBar.classList = "";
        alert("Inscription validée");
        pseudo = null;
        email = null;
        password = null;
        confirmPass = null;
    } else {
        alert("Veuillez remplir correctement les champs");
    }
})