

const profilePage = async ({params}: any) => {
    return (
        <div>
            <h1>Profile</h1>
            <p>User ID: {params.id}</p>
        </div>
    )
}

export default profilePage;