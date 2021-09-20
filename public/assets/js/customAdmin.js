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

$('search-key').change(() => {
    const key = $('#search-key').val();
    if (key !== null || key !== '') {
        $('.mail-filter-btn').removeClass('disabled');
    } else {
        $('.mail-filter-btn').addClass('disabled');
    }
});

function filterMail() {
    const key = $('#search-key').val();
    if (key !== null || key !== '') {
        $('#search-key').val('');
        const body = JSON.stringify({ 'key': key });
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/admin/filter-mail');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.addEventListener('loadend', (e) => {
            const response = JSON.parse(xhttp.response);
            renderFilteredMail(response);
        });
        xhttp.send(body);
    }
}

function renderFilteredMail(mails) {
    $('.no-result-alert').hide();
    if (mails.length !== 0) {
        $('#mail-table').empty();
        mails.forEach((item) => {
            $('#mail-table').append(`
        <tr>
            <td>
                <div class="icheck-primary">${item.dateTime.date}<br>${item.dateTime.time}</div>
            </td>
            <td class="mailbox-name">
                <a data-bs-toggle="modal" data-bs-target="#read-message" data-bs-id="${item._id}" data-bs-title="${item.name}" data-bs-message="${item.message}">${item.name}<em>-${item.email}</em><br>
                    <b>${item.subject}</b>
                </a>
            </td>
            <td>
                <a data-bs-toggle="modal" data-bs-target="#delete-popup" data-bs-id="${item._id}" data-bs-title="${item.name}"><i class="fas fa-trash text-danger"></i></a></td>
            </tr>
        `);
        });
    } else {
        $('.mail-card').after(`
        <div class="alert no-result-alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Sorry!</strong> No search results where found.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `);
    }
}