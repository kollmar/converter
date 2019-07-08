const uploadButton = document.querySelector('.browse-btn');
const fileInfo = document.querySelector('.file-info');
const realInput = document.querySelector('.real-input');

uploadButton.addEventListener('click', (e) => {
  realInput.click();
});

realInput.addEventListener('change', () => {
  const name = realInput.value.split(/\\|\//).pop();
  fileInfo.innerHTML = name;
});

function myFunction() {
  document.getElementById("slider").disabled == true;
});

//  var container = document.getElementById('jsoneditor2');

//  var json = {
//     'array': [1, 2, 3],
//     'boolean': true,
//     'null': null,
//     'number': 123,
//     'object': {'a': 'b', 'c': 'd'},
//     'string': 'Hello World'
//   };

//   var editor = new JSONEditor(container, options, json);

// const list = [
//     "cursor-pointer btn-sm fa fa-folder-open",
//     "bacursor-pointer btn-sm fa fa-floppy-or",
//     "cursor-pointer btn-sm fa fa-check",
//     "cursor-pointer btn-sm fa fa-print",
//     "cursor-pointer btn-sm fa fa-times",
//     "cursor-pointer btn-sm btn-shrink fa fa-files-o",
//     "cursor-pointer btn-sm btn-fullscreen fa fa-arrows-alt",
// ]
// var btnList2 ="";
// for (let i = 0; i < list.length; i++) {
//     btnList2 += '<li class="' + list[i] + '" style="background:none; margin:4px 3px 0 3px; font-family:"Font Awesome 5 Pro";"><\/li>';
// }


// document.getElementById('jsoneditor')
//     .innerHTML += btnList;
// document.getElementsByClassName('jsoneditor-menu')[0]
//     .innerHTML += btnList2;

