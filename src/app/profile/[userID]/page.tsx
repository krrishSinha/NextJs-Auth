
const profilePage = async ({params}: any) => {

    const {userID} = await params

    return (
        <div>
            <h1>Profile</h1>
            <p>User ID: {userID} </p>
        </div>
    )
}

export default profilePage;