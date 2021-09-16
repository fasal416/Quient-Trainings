var readMessageModal = document.getElementById('read-message');
readMessageModal.addEventListener('show.bs.modal', function(event) {
    var button = event.relatedTarget
    var title = button.getAttribute('data-bs-title');
    var id = button.getAttribute('data-bs-id');
    var message = button.getAttribute('data-bs-message');
    readMessageModal.querySelector('.modal-title').innerHTML = `Message From ${title}`;
    var modalBody = readMessageModal.querySelector('.modal-body');
    modalBody.innerHTML = `<p>${message}</p>`;
    readMessageModal.querySelector('.req-delete').setAttribute('data-bs-title', title);
    readMessageModal.querySelector('.req-delete').setAttribute('data-bs-id', id);
});

var deleteMessageModel = document.getElementById('delete-popup');
deleteMessageModel.addEventListener('show.bs.modal', function(event) {
    var button = event.relatedTarget
    var title = button.getAttribute('data-bs-title');
    var id = button.getAttribute('data-bs-id');
    var modalBody = deleteMessageModel.querySelector('.modal-body');
    modalBody.innerHTML = `Are you sure you want to delete this message from: <strong>${title}</strong>`;
    $('.modal-footer .cnf-delete').click(() => { deleteMsg(id); });

});

function deleteMsg(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', `/admin/delete-msg/${id}`);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.addEventListener('loadend', (e) => {
        console.log(xhttp.status);
        location.reload();
    });
    xhttp.send();
}