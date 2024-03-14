const notesContainer = $('.notes-container');
const createBtn = $('.add-notes');
let notes = $('.input-box');

createBtn.click(function (e) {
    notesContainer.append(`<div class="notes" id=${generateUID()} draggable="true"><p contenteditable="false" class="input-box"></p><button class="edit-notes"><img src="/images/edit.png" alt="edit icon"></button></div>`)
})

// removes edit button highlight when clicking on the page
$(document).on('click', function(e) {
    if (!$(e.target).closest('.notes').length) {
        $('.current-edit').children('.input-box').attr({'contenteditable' : false})
        $('.current-edit').attr('draggable' , true)
        $(".notes").removeClass('current-edit')
    }
});

// allows the user to edit a note puts a highlight on the button to indicate currently editing
// this uses event delegation delegating an event to .edit-notes whenever a .notes element is created
$('.notes-container').on('click', '.edit-notes',function (e) {
    e.preventDefault();
    let isDraggable = $(this).parent().attr('draggable') == 'false';
    let isEditable = $(this).siblings('.input-box').attr('contenteditable') == 'true';

    if ($('.current-edit').length === 0){
        $(this).parent().toggleClass('current-edit')
        $(this).siblings('.input-box').attr({'contenteditable' : !isEditable});
        $(this).parent().attr('draggable', isDraggable);
    }
    else{
        // current edit contentediatble = !
        if(!$(this).parent().hasClass('current-edit')){
            $('.current-edit').children('.input-box').attr({'contenteditable' : false})
            $('.current-edit').attr('draggable' , true)
        }
        $(this).siblings('.input-box').attr({'contenteditable' : !isEditable ,});
        $(this).parent().attr('draggable',isDraggable);
        $(this).parent().siblings('.current-edit').toggleClass('current-edit')
        $(this).parent().toggleClass('current-edit')
    }
})


$('.notes-container').on('dragstart','.notes', function(e) {
    // e.preventDefault()
    e.originalEvent.dataTransfer.setData("text/plain", e.target.id);
    console.log("dragged")
});

$('.notes-container').on('drag','.notes', function(e) {
    // e.preventDefault()
});

$('.notes-container').on('dragend','.notes', function(e) {
    // e.preventDefault()
    console.log("dragged")
});


$('.clickables').on('dragover','.delete-notes', function(e) {
    e.preventDefault()
    console.log($(this))
});

$('.clickables').on('drop','.delete-notes', function(e) {
    e.preventDefault()
    notes_id =e.originalEvent.dataTransfer.getData("text")
    $(`#${notes_id}`).remove();
});


function generateUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}