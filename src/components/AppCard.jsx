const apiUrl = import.meta.env.VITE_API_URL;

const AppCard = ({post , onCancel}) => {

    
    
    return (
        <div className="card">
            <img src={`${apiUrl}/${post.image}`} alt="" />
            <div className="card-body">
                <h4>{post.titolo}</h4>
                <div>{post.tags && post.tags.map((curTags, index) =>
                    <span key={index} className="mx-2">{curTags}</span>
                )}</div>
            </div>
            <button onClick={onCancel} className="btn btn-danger ">cancella</button>
        </div>
    )
}

export default AppCard;