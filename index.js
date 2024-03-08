const notesContainer = $('.notes-container');
const createBtn = $('.add-notes');
let notes = $('.input-box');

createBtn.click(function (e) {
    e.preventDefault();
    notesContainer.append('<div class="notes"><p contenteditable="false" draggable="true" class="input-box"></p><button class="edit-notes"><img src="/images/edit.png" alt="edit icon"></button></div>')
})


// removes edit button highlight when clicking on the page
$(document).on('click', function(e) {
    if (!$(e.target).closest('.notes').length) {
        $('.current-edit').children('.input-box').attr({
            'contenteditable' : false ,
            'draggable' : true
        })
        $(".notes").removeClass('current-edit')
    }
});


// allows the user to edit a note puts a highlight on the button to indicate currently editing
$('.notes-container').on('click', '.edit-notes',function (e) {
    e.preventDefault();
    let isDraggable = $(this).siblings('.input-box').attr('draggable') == 'false';
    let isEditable = $(this).siblings('.input-box').attr('contenteditable') == 'true';
    console.log($(this).hasClass('current-edit'))

    if ($('.current-edit').length === 0){
        $(this).parent().toggleClass('current-edit')
        $(this).siblings('.input-box').attr({
            'contenteditable' : !isEditable ,
            'draggable' : isDraggable});
    }
    else{
        // current edit contentediatble = !
        if(!$(this).parent().hasClass('current-edit')){
            $('.current-edit').children('.input-box').attr({
                'contenteditable' : false ,
                'draggable' : true
            })
        }
        $(this).siblings('.input-box').attr({
            'contenteditable' : !isEditable ,
            'draggable' : isDraggable});
        $(this).parent().siblings('.current-edit').toggleClass('current-edit')
        $(this).parent().toggleClass('current-edit')
    }
})

