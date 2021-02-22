const MobileProfileTab = ({userdata}) =>{
    return(
        <div className="card">
            <div className="card-content text-center">
                <img src={`http://localhost:4500/${userdata.user.profilePic}`} className="mainProfilePic rounded-circle" />
                <div className="row pt-4">
                    <div className="col-4">
                        <p className="profileHeader">Name</p>
                        <p className="profileHeader">Email</p>
                        <p className="profileHeader">City</p>
                        <p className="profileHeader">Blogs</p>
                    </div>
                    <div className="col-8 text-left">
                        <p className="profileName"> {userdata.user.username}</p>
                        <p className="profileName"> {userdata.user.email}</p>
                        <p className="profileName"> {userdata.user.address}</p>
                        <p className="profileName"> 10</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MobileProfileTab