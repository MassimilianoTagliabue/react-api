import { useEffect, useState } from 'react'

const initialPost = {

  titolo: "",
  contenuto: "",
  immagine: "",
  
}


function App() {

  const [post, setPost] = useState([])//array di post

  const [formPost, setFormPost] = useState(initialPost) //post singolo
 




  const handleSubmit = (event) => {
    event.preventDefault();



    //creo l'oggetto del nuovo post
    const newPost = {
      ...formPost,
      id: Date.now(),
    };

    const newArray = [...post, newPost]

    //aggiorno il post, aggiungendo il nuovo post
    setPost(newArray);

    //ripulisco i campi
    setFormPost(initialPost);


  }


  const handleInputChange = (event) => {
    event.preventDefault();

    const keytochange = event.target.name;        //prende il nome dell'input   
    let newValue = event.target.value   //prende il contenuto dell'input

    const newPost = {
      ...formPost,
      [keytochange]: newValue      //assegno un nuovo valore all'input vuoto 
    }

    //aggiorno il post
    setFormPost(newPost)

  }

  // funzione che elimina gli elementi
  const elimina = (cancellaTitolo) => {
    const cancellato = post.filter((curtitle) => curtitle.id !== cancellaTitolo)
    console.log(cancellato);
    setPost(cancellato);
  }




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
              name="title"
              type="text"
              className="form-control"
              id='titolo' />
          </div>

          {/* creo input per la descrizione */}
          <div className="input-group mt-3 ">
            <span className="input-group-text" htmlFor="descrizione">descrizione</span>
            <input
              value={formPost.contenuto}
              onChange={handleInputChange}
              name="description"
              type="text"
              className="form-control"
              id='descrizione' />
          </div>

          {/* creo input per l'immagine' */}
          <div className="input-group mt-3 ">
            <span className="input-group-text" htmlFor="immagine">immagine</span>
            <input
              value={formPost.immagine}
              onChange={handleInputChange}
              name="image"
              type="text"
              className="form-control"
              id='immagine' />
          </div>

          {/* creo select per la categoria ' */}
          <select class="form-select mt-3" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>


          <button type='submit' className='btn btn-primary mt-5'>invia</button>
        </form>

        <br />

        {/* sezione lista */}
        <section>
          <h2>lista</h2>
          {/* creo la lista con gli elementi inseriti */}
          <div className='d-flex row-gap-4 column-gap-3 flex-wrap'>
            {post.map((curpost, index) => {
              return (<div key={index} className='ms-col '>
                <div className="card ms-width" >
                  <img src={curpost.immagine} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{curpost.titolo}</h5>
                    <p className="card-text">{curpost.contenuto}</p>
                  </div>
                  
                  <div className="card-body">
                    <button className='btn btn-danger' onClick={() => elimina(curpost.id)}> Elimina 🗑️</button>
                  </div>
                </div>
              </div>)
            })}

          </div>
        </section>




      </div>
    </>
  )
}

export default App
