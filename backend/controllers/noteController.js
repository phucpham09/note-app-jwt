import Note from '../models/NoteSchema.js';

export const createNote = async (req, res) =>{
    try {
        
        const {userId} = req.userData;
        console.log(userId);

    // Tạo một note mới
        const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        userId: userId, 
        });

        // Lưu note vào database
        await newNote.save();

        res.status(201).json({ message: 'Note created successfully', note: newNote });
        
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the note.', error });
    }
}


export const getAllNoteByUser = async(req, res) => {
    try {
        const {userId} = req.userData;
  
        // Tìm tất cả các notes có userId tương ứng
        const notes = await Note.find({ userId });
    
        // Kiểm tra nếu không tìm thấy notes nào
        // if (!notes.length) {
        //   return res.status(404).json({ message: 'No notes found for this user.' });
        // }
    
        // Trả về danh sách notes
        res.status(200).json({ notes });
    } catch (error) {
        console.log(error)
    }
}


export const deleteNote = async(req, res) =>{
    try {
       
        const noteId = req.params.noteId;
    
       
        const {userId} = req.userData;
    
        //user chi co the xoa note cua minh nen can userId
        const note = await Note.findOne({ _id: noteId, userId });
    
        if (!note) {
          return res.status(404).json({ message: 'Note not found or not authorized to delete.' });
        }
    
        
        await Note.deleteOne({ _id: noteId });
    
        
        res.status(200).json({ message: 'Note deleted successfully' });
      } catch (error) {
        
        res.status(500).json({ message: 'An error occurred while deleting the note.', error });
      }
}