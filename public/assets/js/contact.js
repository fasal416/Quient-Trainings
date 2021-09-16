thisForm = document.getElementById('contact-form');
thisForm.addEventListener('submit', (e) => {
    e.preventDefault();
    thisForm.querySelector('.error-message').classList.remove('d-block');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const currentDate = getCurrentDateTime();

    if (name == '' || name.length < 3) {
        displayError(thisForm, 'Name should contain minimum of three charecters')
        return;
    }
    if (subject == '') {
        displayError(thisForm, 'Enter a valid subject')
        return;
    }
    if (message == '') {
        displayError(thisForm, 'Enter some message to send')
        return;
    }
    document.querySelector('.loading').style.display = 'block';
    const body = JSON.stringify({
        'name': name,
        'email': email,
        'subject': subject,
        'message': message,
        'dateTime': currentDate
    });
    thisForm.reset();
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/contact');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.addEventListener('loadend', (e) => {
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.sent-message').style.display = 'block';
    });
    xhttp.send(body);

});

function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
}

function getCurrentDateTime() {
    var currentdate = new Date();
    var dateObj = {
        date: currentdate.getDate() + "/" +
            (currentdate.getMonth() + 1) + "/" +
            currentdate.getFullYear(),
        time: currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds()
    };
    return dateObj;
}