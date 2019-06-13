const list = [
    "cursor-pointer btn-sm fa fa-folder-open",
    "bacursor-pointer btn-sm fa fa-floppy-or",
    "cursor-pointer btn-sm fa fa-check",
    "cursor-pointer btn-sm fa fa-print",
    "cursor-pointer btn-sm fa fa-times",
    "cursor-pointer btn-sm btn-shrink fa fa-files-o",
    "cursor-pointer btn-sm btn-fullscreen fa fa-arrows-alt",
]
let btnList;
for (let i = 0; i < list.length; i++) {
    btnList += '<li class="' + list[i] + '" style="background:none; font-family: FontAwesome"><\/li>';
}


document.getElementById('jsoneditor')
    .innerHTML += btnList;
document.getElementsByClassName('jsoneditor-menu')[0]
    .innerHTML += btnList;