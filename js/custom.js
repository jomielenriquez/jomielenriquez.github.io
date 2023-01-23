function includeHTML(active) {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    // z = document.getElementsByTagName("div");
    z = $("div.render");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        console.log(file);
        if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            var activenew =active+"InsertActive";
            console.log(activenew)
            var reg = new RegExp(activenew, "g");
            if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText.split(activenew).join("active");}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            console.log(this.responseText);
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("include-html");
            includeHTML();
            }
        } 
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
        }
    }
}

