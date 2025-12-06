import React, { useState } from 'react'
import { NotebookPen, Pen, PlusIcon, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate=useNavigate();

  const [showcreate, setshowcreate] = useState(false);
  const [note, setNotes] = useState([
    { id: 1, title: "kashvi", body: "kashvi is a good girl" },
    { id: 2, title: " kashvi syllabus", body: "my cie syllabus" },
    { id: 3, title: "aanubhav", body: "aanubhav is a handsome man slghrgskrhgishghsr srgso rghoshrgosuhg oshros gosihgosh oghsorghso ghsohgosihroguhs orhgosuhrog shoruhgosu oruhgoshroguhso rg" },
    { id: 4, title: "aanubhav syllabus", body: "aanubhav's cia sylabus" },
  ]);
const [newtitle,setnewtitle]=useState('')
const [newbody,setnewbody]=useState('')
const [showeditpage,setshoweditpage]=useState(false)
const [editid,seteditid]=useState('')

  const deletenote=(idtodelete)=>{
    const updatednote=note.filter((note)=>note.id!=idtodelete)
    setNotes(updatednote)
  }

  const addnote=()=>{
    if(newtitle=='' ||newbody==''){
      alert("feilds can't be left empty")
      return 
    }
    if(confirm("create new note?")){

      const newid=note.length>0?Math.max(...note.map(n=>n.id))+1:1
      const newnote={
        id:newid,
        title:newtitle,
        body:newbody
      }
      setNotes([...note,newnote])

      setnewbody('')
      setnewtitle('')
      setshowcreate(false)

    }
  else{
    return 
  }

  }

  const editnote=()=>{
    if(newtitle==''||newbody==''){
      alert("can't put empty values to notes")
      return 
    }
    setNotes(prevnotes=>{
      return prevnotes.map(note=>{
        if(note.id==editid){
          return {
            ...note,
            title:newtitle,
            body:newbody,
          }
        }
        return note

      })
    })
    setnewbody('')
    setnewtitle('')
    seteditid('')
    setshoweditpage(false)

  }
  return (
    //navbar
    <div className='bg-[#D4BFA8] h-screen w-screen transition-all'>
      <div>
        <div className='min-h-fit min-w-fit bg-[#8C7A6B] pb-1 pt-2 flex'>

          <div className='bg text-4xl font-extrabold text-[#1F1F1F] ml-3 '>
            NOTE TAKER <NotebookPen className='inline font-extrabold ml-2 size-10' />
            <div className='inline ml-9'>
              Welcome {localStorage.getItem("username")}
            </div>
          </div>
          <div className='ml-auto border-2 rounded-xl bg-[#7c6551] mr-4 px-3 flex justify-center items-center
        hover:bg-[#5b4736] 
        transition-all duration-150 ease-in-out
        hover:cursor-default '
            onClick={() => { setshowcreate(true) }}>
            CREATE <PlusIcon className='inline' />
          </div>
          <div className='ml-3 border-2 rounded-xl bg-[#7c6551] mr-4 px-3 flex justify-center items-center
        hover:bg-[#5b4736] 
        transition-all duration-150 ease-in-out
        hover:cursor-default'
        onClick={()=>{localStorage.clear(),navigate('/login')}}>
          Logout

          </div>


         

          {showcreate && (//create page which opens when create button clicked
            <div className='h-screen w-screen flex justify-center items-center absolute backdrop-blur-xl backdrop-saturate-150 transition-all duration-150'>
              <div className='h-150 w-150 bg-[#f2c6aa] 
      border-2 border-black 
     rounded-2xl flex flex-col'>
                <div className='mt-4 ml-4 text-3xl font-extrabold '>

                  Create new note
                </div>
                <div className='ml-4 mt-3 mr-3 '>
                  <div className='ml-3'>
                    
                  Title
                  </div>
                 <input type="text" 
                  value={newtitle}
                  onChange={(e)=>(setnewtitle(e.target.value))}
                 className='border-2 border-black block p-2 rounded-2xl w-full'/>
                </div>
                <div className=' mt-4 ml-4 mr-3'>
                  <div className='ml-3'>

                  Content
                  </div>
                  <textarea type='text'
                  value={newbody}
                  onChange={(e)=>{setnewbody(e.target.value)}}
                  className='border-2 p-3 border-black rounded-2xl w-full max-h-80 align-text-top flex justify-center items-center' />
                </div>

                <div className='mt-auto flex justify-center mb-5 space-x-5'>
                  
                  <div className='text-xl font-bold border-black border-2 rounded-2xl p-2
                  bg-[#7c6551]
                  hover:bg-[#d39d6d] 
                  hover:-translate-y-2
                  hover:scale-105
                  hover:cursor-default
                  hover:shadow-black
                  hover:shadow-2xl
                  transition-all
                  duration-200
                  ease-in-out'
                  onClick={addnote}>

                  CREATE
                  </div>
                  <div className='text-xl font-bold border-black border-2 rounded-2xl p-2
                  bg-red-500
                  hover:bg-red-800 
                  hover:-translate-y-2
                  hover:scale-105
                  hover:cursor-default
                  hover:shadow-black
                  hover:shadow-2xl
                  transition-all
                  duration-200
                  ease-in-out'
                  
                  onClick={()=>{setshowcreate(false), setnewbody(''),setnewtitle('')}}>
                    CANCEL
                  </div>
                </div>
                
              </div>
            </div>
          )}
        </div>
      </div>




      <div className='w-full'>
        {note.length == 0 ? (
          <div className='flex justify-center items-center flex-col'>
            you have made no notes
            <div className='border-2 rounded-2xl px-3 border-black'>
              Create New Note
            </div>
          </div>
        ) : (
            
          <div className='w-screen flex justify-center'>
          

            <div className=' grid lg:grid-cols-3 '>
              {note.map((note, index) => (

                <div className=' h-50 w-70 bg-[#f2c6aa8c] my-4 mx-4 rounded-2xl border-2 border-black 
                flex flex-col

               hover:scale-110
               hover:shadow-2xl 
                transition-all duration-150 ease-in-out
                ' >
                  

                  <div className='mt-2 ml-2'>

                    Note Title: {note.title}
                  </div>

                  <div className='mt-2 ml-2 max-h-50 overflow-auto'>
                    Content: {note.body}
                  </div>
                  <div className='mt-auto ml-auto mb-2 mr-2'>
                    <Pen className='inline mr-3 hover:text-gray-800' 
                    onClick={()=>{setshoweditpage(true),setnewbody(note.body),setnewtitle(note.title),seteditid(note.id)}}/>

                    <Trash2 className='inline ml-auto 
                  hover:text-red-500 '
                  onClick={()=>{
                      if(confirm("are you sure you want to delete the note?")){
                        deletenote(note.id)
                      }
                      else{
                        return 
                      } {

                      }
                  }} />
                  </div>

                </div>
              ))}
            </div>
            {showeditpage&&(
              <div className='h-screen w-screen flex justify-center items-center absolute backdrop-blur-xl backdrop-saturate-150 transition-all duration-150'>
              <div className='h-150 w-150 bg-[#f2c6aa] 
      border-2 border-black 
     rounded-2xl flex flex-col'>
                <div className='mt-4 ml-4 text-3xl font-extrabold '>

                  Edit Note
                </div>
                <div className='ml-4 mt-3 mr-3 '>
                  <div className='ml-3'>
                    
                  Title
                  </div>
                 <input type="text" 
                  value={newtitle}
                  onChange={(e)=>(setnewtitle(e.target.value))}
                 className='border-2 border-black block p-2 rounded-2xl w-full'/>
                </div>
                <div className=' mt-4 ml-4 mr-3'>
                  <div className='ml-3'>

                  Content
                  </div>
                  <textarea type='text'
                  value={newbody}
                  onChange={(e)=>{setnewbody(e.target.value)}}
                  className='border-2 p-3 border-black rounded-2xl w-full max-h-80 min-h-80 align-text-top flex justify-center items-center' />
                </div>

                <div className='mt-auto flex justify-center mb-5 space-x-5'>
                  
                  <div className='text-xl font-bold border-black border-2 rounded-2xl p-2
                  bg-[#7c6551]
                  hover:bg-[#d39d6d] 
                  hover:-translate-y-2
                  hover:scale-105
                  hover:cursor-default
                  hover:shadow-black
                  hover:shadow-2xl
                  transition-all
                  duration-200
                  ease-in-out'
                  onClick={editnote}>

                  EDIT
                  </div>
                  <div className='text-xl font-bold border-black border-2 rounded-2xl p-2
                  bg-red-500
                  hover:bg-red-800 
                  hover:-translate-y-2
                  hover:scale-105
                  hover:cursor-default
                  hover:shadow-black
                  hover:shadow-2xl
                  transition-all
                  duration-200
                  ease-in-out'
                  
                  onClick={()=>{setshoweditpage(false), setnewbody(''),setnewtitle('')}}>
                    CANCEL
                  </div>
                </div>
                
              </div>
            </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
  
}

export default Homepage