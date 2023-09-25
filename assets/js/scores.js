function scores() {
    document.getElementById("highscores");
    console.log("here: " + localStorage.length);
    for (i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        //get initials
        const value = localStorage.getItem(key);
        //get time assigned to initials

        if (localStorage.key(i) != ("debug")) {
            //exclude debugger from appearing in highscores
            var li = document.createElement("li");
            li.innerHTML = key + ": " + value;
            document.querySelector('#highscores').appendChild(li);
            console.log(key + value);
        }
    }
}

document.getElementById("clear").addEventListener("click", clear);

function clear(){
    console.log("clearing storage");
    localStorage.clear();
    location.reload();
}

scores();