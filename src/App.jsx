import { useEffect, useState } from 'react'
import axios from "axios"
import AppCard from './components/AppCard';
const apiUrl = import.meta.env.VITE_API_URL;

const initialPost = {
  id: Date.now,
  titolo: "",
  contenuto: "",
  immagine: "",
}


function App() {
  const [post, setPost] = useState([])//array di post
  const [formPost, setFormPost] = useState(initialPost) //post singolo


  useEffect(() => {
    
    getPost();

    
  }, []);


  const getPost = () => {

    axios.get(`${apiUrl}/posts`).then((resp) => {
      

      setPost(resp.data.data)
      

    });
  };


  //funzione che parte ogni volta che inseriamo
  const handleInputChange = (event) => {

    const keytochange = event.target.name;        //prende il nome dell'input   
    let newValue = event.target.value   //prende il contenuto dell'input

    const newPost = {
      ...formPost,
      [keytochange]: newValue      //assegno un nuovo valore all'input vuoto 
    };

    //aggiorno il post
    setFormPost(newPost);
  }



  //funzione che parte quando viene premuto il tasto submit
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${apiUrl}/posts`, formPost).then((resp) => {

      console.log(resp);
      const newPost = resp.data;

      //creo l'oggetto del nuovo post
      const newBlog= [
        ...post,
        newPost,
        
      ];

      //aggiorno il post, aggiungendo il nuovo post
      setPost(newBlog);

      //ripulisco i campi
      setFormPost(initialPost);
    })




  }

  // funzione che elimina gli elementi
  const handleDelete = (id) => {

    console.log("delete", id);
    axios.delete(`${apiUrl}/posts/${id}`).then((resp) => {
      console.log(resp);
      const newBlog = post.filter((curPost) => curPost.id != id)
      setPost(newBlog);
    })

  };





  return (
    <>
      <div className='container'>
        {/* sezione inserimento */}
        <form action="" onSubmit={handleSubmit}>
          <h1 className='text-center mt-3'>Blog form</h1>

          {/* creo input per il titolo */}
          <div className="input-group mt-5 ">
            <span className="input-group-text" htmlFor="titolo">titolo</span>
            <input
              value={formPost.titolo}
              onChange={handleInputChange}
              name="titolo"
              type="text"
              className="form-control"
              id='titolo' />
          </div>

          {/* creo input per la descrizione */}
          <div className="input-group mt-3 ">
            <span className="input-group-text" htmlFor="contenuto">descrizione</span>
            <input
              value={formPost.contenuto}
              onChange={handleInputChange}
              name="contenuto"
              type="text"
              className="form-control"
              id='contenuto' />
          </div>

          {/* creo input per l'immagine' */}
          <div className="input-group mt-3 ">
            <span className="input-group-text" htmlFor="immagine">immagine</span>
            <input
              value={formPost.immagine}
              onChange={handleInputChange}
              name="immagine"
              type="text"
              className="form-control"
              id='immagine' />
          </div>



          <button type='submit' className='btn btn-primary mt-5'>invia</button>
        </form>

        <br />

        {/* sezione lista */}
        <section>
          <h2>lista</h2>
          {/* creo la lista con gli elementi inseriti */}

          {post.lenght > 0 ? (
            <div className='d-flex row-gap-4 column-gap-3 flex-wrap'>
              {post.map((curpost) =>

                <div key={curpost.id} className='ms-col '>
                  <AppCard
                  post={curpost}
                  onCancel={() => handleDelete(curpizza.id)}
                  />
                </div>

              )}
            </div>
          ) : (
            <p>nessun post presente</p>
          )
          }
        </section>




      </div>
    </>
  )
}

export default App
